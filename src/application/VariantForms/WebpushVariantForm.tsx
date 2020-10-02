import React, { useEffect, useState } from 'react';

import { Button, ExpandableSection } from '@patternfly/react-core';
import { Variant, WebPushVariant } from '@aerogear/unifiedpush-admin-client';
import { validator } from '../validators';
import { UPSForm, UPSFormField } from '../ApplicationDetail/panels/UPSForm';

interface Props {
  open: boolean;
  variantName: string;
  onSave: (variant: Variant) => void;
  close: () => void;
}

export function WebpushVariantForm({
  open,
  variantName,
  onSave,
  close,
}: Props) {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [alias, setAlias] = useState('');

  useEffect(() => {
    if (!open) {
      setPublicKey('');
      setPrivateKey('');
      setAlias('');
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const save = () => {
    const variant = {
      name: variantName,
      type: 'web_push',
      publicKey: publicKey && publicKey.length > 0 ? publicKey : undefined,
      privateKey: privateKey && privateKey.length > 0 ? privateKey : undefined,
      alias,
    } as WebPushVariant;
    onSave(variant);
  };

  return (
    <UPSForm validator={validator}>
      <UPSFormField
        label={'Push Network'}
        fieldId="alias"
        helperText={'Alias'}
        onChange={value => setAlias(value)}
      />

      <ExpandableSection toggleText={'Advanced'}>
        <UPSFormField
          validator={validator}
          formData={{
            publicKey,
            privateKey,
            alias,
          }}
          fieldId="publicKey"
          helperText={'Vapid Public Key'}
          dependsOn="privateKey"
          onChange={value => setPublicKey(value)}
        />

        <UPSFormField
          validator={validator}
          formData={{
            publicKey,
            privateKey,
            alias,
          }}
          fieldId="privateKey"
          helperText={'Vapid Private Key'}
          dependsOn="publicKey"
          onChange={value => setPrivateKey(value)}
        />
      </ExpandableSection>

      <div className="variantFormButtons">
        <Button
          onClick={save}
          className="dialogBtn"
          isDisabled={
            !variantName ||
            variantName.trim().length === 0 ||
            !validator.validate({
              publicKey,
              privateKey,
              alias,
            }).valid
          }
        >
          Create
        </Button>
        <Button variant="secondary" onClick={() => close()}>
          Cancel
        </Button>
      </div>
    </UPSForm>
  );
}
