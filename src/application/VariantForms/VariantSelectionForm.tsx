import React, { Component, ReactNode } from 'react';

import {
  TextInput,
  Modal,
  Form,
  FormGroup,
  Radio,
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
import { getEnabledVariants } from '../../utils/DocLinksUtils';

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

interface VariantData {
  name: string;
  label: string;
  description: string;
  checked?: boolean;
}

export class VariantSelectionForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  componentDidMount() {
    const context = this.context as ContextInterface;
    this.setState({
      variantType:
        getEnabledVariants(context.upsConfig).find(
          variantData => variantData.checked
        )?.name || '',
    });
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
                {getEnabledVariants(context.upsConfig).map(variantData => (
                  <Radio
                    defaultChecked={variantData.checked}
                    className="radioBtn"
                    name={'variant-type'}
                    id={variantData.name}
                    label={variantData.label}
                    description={variantData.description}
                    onChange={checked => {
                      if (checked) {
                        this.setState({ variantType: variantData.name });
                      }
                    }}
                  />
                ))}
              </>
            </FormGroup>
          </Form>
          <ApplicationListContext.Consumer>
            {({ selectVariant }: ContextInterface): ReactNode => {
              const createVariant = async (
                variant: VariantDefinition,
                variantType: VariantType
              ) => {
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
