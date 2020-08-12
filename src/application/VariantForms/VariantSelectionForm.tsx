import React, { Component, ReactNode } from 'react';

import {
  TextInput,
  Modal,
  Form,
  FormGroup,
  Radio,
  List,
} from '@patternfly/react-core';
import {
  PushApplication,
  Variant,
  VariantType,
} from '@aerogear/unifiedpush-admin-client';
import { AndroidVariantForm } from './AndroidVariantForm';
import { UpsClientFactory } from '../../utils/UpsClientFactory';
import { WebpushVariantForm } from './WebpushVariantForm';
import { IOSTokenVariantForm } from './IOSTokenVariantForm';
import { IOSCertificateVariantForm } from './IOSCertificateForm';
import {
  ApplicationListContext,
  ContextInterface,
} from '../../context/Context';
import { VariantDefinition } from '@aerogear/unifiedpush-admin-client/dist/src/commands/variants/Variant';
import { UpsError } from '@aerogear/unifiedpush-admin-client/dist/src/errors/UpsError';

interface State {
  variantName: string;
  androidVariantForm: boolean;
  webpushVariantForm: boolean;
  iosTokenVariantForm: boolean;
  iosCertificateVariantForm: boolean;
  variantType: string;
  variant?: Variant;
  errorState?: UpsError;
}

interface Props {
  app?: PushApplication;
  open: boolean;
  close: () => void;
  onFinished: (variant: Variant | undefined) => void;
}

export class VariantSelectionForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      variantName: '',
      androidVariantForm: false,
      webpushVariantForm: false,
      iosTokenVariantForm: false,
      iosCertificateVariantForm: false,
      variantType: 'android',
    };
  }

  render(): React.ReactNode {
    const context = this.context as ContextInterface;
    return (
      <>
        <Modal
          width={'50%'}
          title="Add Variant"
          isOpen={this.props.open}
          onClose={this.props.close}
        >
          <Form>
            <FormGroup label="Name" fieldId="variant selection">
              <TextInput
                id="variant-name"
                className="variantForm"
                isRequired
                onChange={value => this.setState({ variantName: value })}
              />
              <List className="radioList">
                <Radio
                  className="radioBtn"
                  name={'Android Radio'}
                  id="android"
                  label="android"
                  description="using Firebase Cloud Messaging"
                  isChecked={this.state.variantType === 'android'}
                  onChange={checked => {
                    if (checked) this.setState({ variantType: 'android' });
                  }}
                />

                <Radio
                  className="radioBtn"
                  name="WebPush Radio"
                  id="web_push"
                  label="webpush"
                  description="using web browsers"
                  checked={this.state.variantType === 'web_push'}
                  onChange={checked => {
                    if (checked) this.setState({ variantType: 'web_push' });
                  }}
                />

                <Radio
                  className="radioBtn"
                  name="iOS APNS Radio"
                  id="ios_token"
                  label="iOS(APNS Token)"
                  description="using Apple Push Network with Tokens"
                  isChecked={this.state.variantType === 'ios_token'}
                  onChange={checked => {
                    if (checked) this.setState({ variantType: 'ios_token' });
                  }}
                />

                <Radio
                  className="radioBtn"
                  name="iOS Certificate Radio"
                  id="ios"
                  label="iOS(Certificate)"
                  description="using Apple Push Network with certificates"
                  isChecked={this.state.variantType === 'ios'}
                  onChange={checked => {
                    if (checked) {
                      this.setState({ variantType: 'ios' });
                    }
                  }}
                />
              </List>

              <ApplicationListContext.Consumer>
                {({ selectVariant }: ContextInterface): ReactNode => {
                  const createVariant = async (
                    variant: VariantDefinition,
                    variantType: VariantType
                  ) => {
                    console.log('Creating Variant');
                    try {
                      const newVariant = await UpsClientFactory.getUpsClient()
                        .variants[variantType].create(
                          this.props.app!.pushApplicationID!
                        ) // tslint:disable-next-line:no-any
                        .withDefinition(variant as any)
                        .execute();

                      this.setState({ variant: newVariant });
                      await selectVariant(newVariant);
                      this.props.onFinished(newVariant);
                      this.props.close();
                    } catch (error) {
                      console.log('details', error.details());
                      console.log('message', error.message);

                      context.alert(error);
                    }
                  };

                  return (
                    <>
                      <AndroidVariantForm
                        open={this.state.variantType === 'android'}
                        onSave={async variant => {
                          await createVariant(variant, 'android');
                        }}
                        variantName={this.state.variantName}
                        close={() => {
                          this.setState({ androidVariantForm: false });
                          this.props.close();
                        }}
                      />
                      <WebpushVariantForm
                        open={this.state.variantType === 'web_push'}
                        onSave={async variant => {
                          console.log('variant selection form onSave');
                          await createVariant(variant, 'web_push');
                        }}
                        variantName={this.state.variantName}
                        close={() => {
                          this.setState({ webpushVariantForm: false });
                          this.props.close();
                        }}
                      />
                      <IOSTokenVariantForm
                        open={this.state.variantType === 'ios_token'}
                        onSave={async variant => {
                          await createVariant(variant, 'ios_token');
                        }}
                        variantName={this.state.variantName}
                        close={() => {
                          this.setState({ iosTokenVariantForm: false });
                          this.props.close();
                        }}
                      />
                      <IOSCertificateVariantForm
                        open={this.state.variantType === 'ios'}
                        onSave={async variant => {
                          await createVariant(variant, 'ios');
                        }}
                        variantName={this.state.variantName}
                        close={() => {
                          this.setState({ iosCertificateVariantForm: false });
                          this.props.close();
                        }}
                      />
                    </>
                  );
                }}
              </ApplicationListContext.Consumer>
            </FormGroup>
          </Form>
        </Modal>
      </>
    );
  }
}
VariantSelectionForm.contextType = ApplicationListContext;
