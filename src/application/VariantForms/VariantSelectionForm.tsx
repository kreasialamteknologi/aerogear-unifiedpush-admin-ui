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
import { UpsClientFactory } from '../../utils/UpsClientFactory';
import {
  ApplicationListContext,
  ContextInterface,
} from '../../context/Context';
import { VariantDefinition } from '@aerogear/unifiedpush-admin-client/dist/src/commands/variants/Variant';
import { UpsError } from '@aerogear/unifiedpush-admin-client/dist/src/errors/UpsError';
import { VariantEditForm } from './VariantEditForm';

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

const initialState: State = {
  variantName: '',
  androidVariantForm: false,
  webpushVariantForm: false,
  iosTokenVariantForm: false,
  iosCertificateVariantForm: false,
  variantType: 'android',
};

export class VariantSelectionForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { ...initialState };
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    if (prevProps.open && !this.props.open) {
      this.setState(initialState);
    }
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
                style={{ marginBottom: 15 }}
                id="variant-name"
                className="variantForm"
                isRequired
                onChange={value => this.setState({ variantName: value })}
              />
              <>
                <Radio
                  defaultChecked
                  className="radioBtn"
                  name={'variant-type'}
                  id="android"
                  label="android"
                  description="using Firebase Cloud Messaging"
                  onChange={checked => {
                    if (checked) this.setState({ variantType: 'android' });
                  }}
                />

                <Radio
                  className="radioBtn"
                  name={'variant-type'}
                  id="web_push"
                  label="webpush"
                  description="using web browsers"
                  onChange={checked => {
                    if (checked) this.setState({ variantType: 'web_push' });
                  }}
                />

                <Radio
                  className="radioBtn"
                  name={'variant-type'}
                  id="ios_token"
                  label="iOS(APNS Token)"
                  description="using Apple Push Network with Tokens"
                  onChange={checked => {
                    if (checked) this.setState({ variantType: 'ios_token' });
                  }}
                />

                <Radio
                  className="radioBtn"
                  name={'variant-type'}
                  id="ios"
                  label="iOS(Certificate)"
                  description="using Apple Push Network with certificates"
                  onChange={checked => {
                    if (checked) {
                      this.setState({ variantType: 'ios' });
                    }
                  }}
                />
              </>
            </FormGroup>
          </Form>
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
                  context.alert(error);
                }
              };

              return (
                <VariantEditForm
                  type={this.state.variantType}
                  name={this.state.variantName}
                  onCancel={() => {
                    this.setState({ androidVariantForm: false });
                    this.props.close();
                  }}
                  onSave={async variant => {
                    await createVariant(
                      variant,
                      this.state.variantType as VariantType
                    );
                  }}
                />
              );
            }}
          </ApplicationListContext.Consumer>
        </Modal>
      </>
    );
  }
}
VariantSelectionForm.contextType = ApplicationListContext;
