import React, { Component } from 'react';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import {
  Button,
  ButtonVariant,
  Modal,
  ModalVariant,
  TextArea,
  FormGroup,
  Flex,
  FlexItem,
  Checkbox,
  Form,
  TextInput,
  Popover,
  Switch,
} from '@patternfly/react-core';

import { UpsClientFactory } from '../../../../utils/UpsClientFactory';
import {
  ContextInterface,
  ApplicationListContext,
} from '../../../../context/Context';
import { HelpIcon } from '@patternfly/react-icons';
import { NoVariantsPanel } from '../NoVariantsPanel';

interface Props {
  visible: boolean;
  app: PushApplication;
  close: () => void;
  createNewVariant: () => void;
}

interface State {
  message: string;
  categories: string[];
  deviceTypes: string[];
  alias: string[];
  variants: string[];
  priority: 'normal' | 'high';
  formValidation: Record<string, boolean>;
}

const agSender = require('unifiedpush-node-sender');

export class SendNotifications extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      message: '',
      categories: [],
      deviceTypes: [],
      alias: [],
      variants: props.app.variants?.map(variant => variant.id) || [],
      priority: 'normal',
      formValidation: {
        message: true,
        variants: true,
      },
    };
  }

  readonly closeAndReset = () => {
    this.setState({
      message: '',
      categories: [],
      deviceTypes: [],
      alias: [],
      variants: this.props.app.variants?.map(variant => variant.id) || [],
      priority: 'normal',
      formValidation: {
        message: true,
        variants: true,
      },
    });
    this.props.close();
  };

  readonly render = () => {
    const context = this.context as ContextInterface;

    const updateVariants = async (add: boolean, variantId: string) => {
      const variants = this.state.variants;
      if (add) {
        if (!variants.includes(variantId)) {
          variants.push(variantId);
          await this.setState({ variants });
        }
      } else {
        if (variants.includes(variantId)) {
          console.log(this.state);
          await this.setState({
            variants: variants.filter(id => id !== variantId),
          });
        }
      }

      this.setState({
        formValidation: {
          ...this.state.formValidation,
          variants: this.state.variants.length > 0,
        },
      });
    };

    const send = async () => {
      const messageIsValid = this.state.message.length > 0;
      const variantsAreValid = this.state.variants.length > 0;

      if (messageIsValid && variantsAreValid) {
        //sendPush
        await this.setState({
          formValidation: {
            message: messageIsValid,
            variants: variantsAreValid,
          },
        });
        const criteria = {
          ...(this.state.alias.length > 0 && { alias: this.state.alias }),
          ...(this.state.deviceTypes.length > 0 && {
            deviceType: this.state.deviceTypes,
          }),
          ...(this.state.categories.length > 0 && {
            categories: this.state.categories,
          }),
          variants: this.state.variants,
        };

        try {
          const client = await agSender({
            url: UpsClientFactory.getUPSServerURL(),
            applicationId: this.props.app.pushApplicationID,
            masterSecret: this.props.app.masterSecret,
          });

          await client.sender.send(
            {
              alert: this.state.message,
              priority: this.state.priority,
            },
            { criteria }
          );
          context.refresh();
          this.closeAndReset();
        } catch (err) {
          context.alert(err);
        }
      } else {
        //showErrors
        this.setState({
          formValidation: {
            message: messageIsValid,
            variants: variantsAreValid,
          },
        });
      }
    };

    if (this.props.app.variants?.length === 0) {
      return (
        <Modal
          variant={ModalVariant.large}
          title={`Send push to ${this.props.app.name}`}
          isOpen={this.props.visible}
          onClose={this.closeAndReset}
        >
          <NoVariantsPanel
            onCreateNew={() => {
              this.closeAndReset();
              this.props.createNewVariant();
            }}
          />
          ;
        </Modal>
      );
    }

    return (
      <Modal
        variant={ModalVariant.large}
        title={`Send push to ${this.props.app.name}`}
        isOpen={this.props.visible}
        onClose={this.closeAndReset}
        actions={[
          <Button
            key="send"
            variant={ButtonVariant.control}
            onClick={() => {
              send();
            }}
            isDisabled={this.state.variants?.length === 0}
            isAriaDisabled={this.state.variants?.length === 0}
          >
            Send Message
          </Button>,
        ]}
      >
        <Form isHorizontal>
          <FormGroup
            fieldId="message"
            label="Message"
            validated={
              this.state.formValidation['message'] ? 'default' : 'error'
            }
            helperText="Write the notification"
            helperTextInvalid="Message is required"
          >
            <TextArea
              aria-label="Message Text Area"
              onChange={async text => {
                await this.setState({ message: text });
                this.setState({
                  formValidation: {
                    ...this.state.formValidation,
                    message: this.state.message.length > 0,
                  },
                });
              }}
            />
          </FormGroup>
          <FormGroup fieldId="priority" hasNoPaddingTop>
            <Switch
              label="High Priority"
              aria-label="High Priority"
              labelOff="Normal Priority"
              isChecked={this.state.priority === 'high'}
              onChange={(checked: boolean) =>
                this.setState({ priority: checked ? 'high' : 'normal' })
              }
            />
          </FormGroup>
          <FormGroup
            hasNoPaddingTop
            label="Variants"
            fieldId="variants"
            helperTextInvalid="You must select at least one variant."
            validated={
              this.state.formValidation['variants'] ? 'default' : 'error'
            }
          >
            <Flex>
              {this.props.app.variants?.map(variant => {
                return (
                  <FlexItem key={variant.id}>
                    <Checkbox
                      id={variant.id}
                      name="variants"
                      label={variant.name}
                      isChecked={this.state.variants.indexOf(variant.id) > -1}
                      onChange={checked => updateVariants(checked, variant.id)}
                    />
                  </FlexItem>
                );
              })}
            </Flex>
          </FormGroup>

          <FormGroup
            label="Criteria"
            labelIcon={
              <Popover
                headerContent={
                  <div>Criteria used to filter the list of targets</div>
                }
                bodyContent={
                  'You can provide multiple values at a time by separating them by commas.'
                }
              >
                <button
                  aria-label="More info for name field"
                  onClick={e => e.preventDefault()}
                  aria-describedby="simple-form-name"
                  className="pf-c-form__group-label-help"
                >
                  <HelpIcon noVerticalAlign />
                </button>
              </Popover>
            }
            fieldId="alias"
            helperText="Alias"
          >
            <TextInput
              id="alias"
              onChange={text =>
                this.setState({
                  alias: text.split(',').map(alias => alias.trim()),
                })
              }
            />
          </FormGroup>

          <FormGroup fieldId="device-type" helperText="Device Types">
            <TextInput
              id="device-type"
              onChange={text =>
                this.setState({
                  deviceTypes: text.split(',').map(type => type.trim()),
                })
              }
              label="Device Types"
            />
          </FormGroup>

          <FormGroup helperText="Categories" fieldId="categories">
            <TextInput
              id="categories"
              onChange={text =>
                this.setState({
                  categories: text.split(',').map(category => category.trim()),
                })
              }
              label="Categories"
            />
          </FormGroup>
        </Form>
      </Modal>
    );
  };
}

SendNotifications.contextType = ApplicationListContext;
