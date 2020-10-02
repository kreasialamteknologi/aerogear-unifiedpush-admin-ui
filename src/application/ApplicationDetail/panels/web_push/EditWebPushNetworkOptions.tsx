import React, { useEffect, useState } from 'react';
import {
  PushApplication,
  Variant,
  WebPushVariant,
  WebPushVariantDefinition,
} from '@aerogear/unifiedpush-admin-client';
import {
  Button,
  ButtonVariant,
  Divider,
  FormGroup,
  Modal,
  ModalVariant,
  Radio,
} from '@patternfly/react-core';
import { UpsClientFactory } from '../../../../utils/UpsClientFactory';
import { UPSForm, UPSFormField } from '../UPSForm';
import { validator } from '../../../validators';

interface Props {
  visible: boolean;
  app: PushApplication;
  variant: WebPushVariant;
  onCancel: () => void;
  onSaved: (variant: Variant) => void;
}

export function EditWebPushNetworkOptions({
  visible,
  app,
  variant,
  onCancel,
  onSaved,
}: Props) {
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [alias, setAlias] = useState(variant.alias);
  const [vapidUpdate, setVapidUpdate] = useState('none');

  useEffect(() => {
    setPrivateKey('');
    setPublicKey('');
    setAlias(variant.alias);
    setVapidUpdate('none');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const update = async () => {
    const update: WebPushVariantDefinition = {
      privateKey: privateKey || variant.privateKey,
      publicKey: publicKey || variant.publicKey,
      alias: alias || variant.alias,
    };

    await UpsClientFactory.getUpsClient()
      .variants.web_push.update(app.pushApplicationID, variant.variantID)
      .withVariantDefinition(update)
      .execute();

    if (vapidUpdate === 'regenerate') {
      const wpVariant: WebPushVariant = (await UpsClientFactory.getUpsClient()
        .variants.web_push.renewKeys(app.pushApplicationID, variant.variantID)
        .execute()) as WebPushVariant;
      update.publicKey = wpVariant.publicKey;
    }

    variant.publicKey = update.publicKey ?? variant.publicKey;
    variant.privateKey = update.privateKey ?? variant.privateKey;
    variant.alias = update.alias ?? variant.alias;

    onSaved({ ...variant });
  };

  const uploadFields = () => {
    if (vapidUpdate === 'upload') {
      return (
        <>
          <UPSFormField
            fieldId="publicKey"
            dependsOn="privateKey"
            validator={validator}
            formData={{
              publicKey,
              privateKey,
              alias,
            }}
            helperText={'Vapid Public Key'}
            onChange={(value: string) => setPublicKey(value)}
          />

          <UPSFormField
            fieldId="privateKey"
            dependsOn="publicKey"
            validator={validator}
            formData={{
              publicKey,
              privateKey,
              alias,
            }}
            helperText={'Vapid Private Key'}
            onChange={(value: string) => setPrivateKey(value)}
          />
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <Modal
      variant={ModalVariant.small}
      title="Edit Variant"
      isOpen={visible}
      onClose={onCancel}
      actions={[
        <Button
          key="confirm"
          variant={ButtonVariant.primary}
          onClick={() => update()}
          isDisabled={
            !validator.validate({ privateKey, publicKey, alias }).valid
          }
        >
          Save
        </Button>,
        <Button key="cancel" variant="link" onClick={onCancel}>
          Cancel
        </Button>,
      ]}
    >
      <UPSForm validator={validator}>
        <UPSFormField
          label="Alias"
          fieldId="alias"
          helperText={'Mailto or url address'}
          defaultValue={variant.alias}
          onChange={(value: string) => setAlias(value)}
        />

        <Divider />

        <FormGroup fieldId={'editKeys'} label={'Vapid Keys'}>
          <Radio
            label="No changes"
            id="no-changes"
            name="no-changes"
            isChecked={vapidUpdate === 'none'}
            onChange={(checked: boolean) => {
              if (checked) {
                setVapidUpdate('none');
                setPublicKey('');
                setPrivateKey('');
              }
            }}
          />
          <Radio
            label="Regenerate"
            id="regenerate"
            name="regenerate"
            isChecked={vapidUpdate === 'regenerate'}
            onChange={(checked: boolean) => {
              if (checked) {
                setVapidUpdate('regenerate');
                setPublicKey('');
                setPrivateKey('');
              }
            }}
          />
          <Radio
            label="Upload"
            id="upload"
            name="upload"
            isChecked={vapidUpdate === 'upload'}
            onChange={(checked: boolean) => {
              if (checked) {
                setVapidUpdate('upload');
              }
            }}
          />
        </FormGroup>

        {uploadFields()}
      </UPSForm>
    </Modal>
  );
}
