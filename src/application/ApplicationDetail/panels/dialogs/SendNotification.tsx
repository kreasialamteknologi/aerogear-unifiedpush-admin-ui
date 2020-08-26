import React, { Component } from 'react';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import {
  Button,
  ButtonVariant,
  Modal,
  ModalVariant,
  Text,
  TextVariants,
  TextArea,
  Radio,
  FormGroup,
  List,
  ListVariant,
  ListItem,
  Flex,
  FlexItem,
  Checkbox,
  Form,
  TextInput,
} from '@patternfly/react-core';

import { UpsClientFactory } from '../../../../utils/UpsClientFactory';
import {
  ContextInterface,
  ApplicationListContext,
} from '../../../../context/Context';

interface Props {
  visible: boolean;
  app: PushApplication;
  close: () => void;
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

  readonly render = () => {
    const context = this.context as ContextInterface;

    const updateVariants = (add: boolean, variantId: string) => {
      const variants = this.state.variants;
      if (add) {
        if (!variants.includes(variantId)) {
          variants.push(variantId);
          this.setState({ variants });
        }
      } else {
        if (variants.includes(variantId)) {
          const index = variants.indexOf(variantId, 0);
          this.setState({ variants: variants.filter(id => id !== variantId) });
        }
      }
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
          this.props.close();
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

    return (
      <Modal
        variant={ModalVariant.large}
        title={`Send push to ${this.props.app.name}`}
        isOpen={this.props.visible}
        onClose={this.props.close}
        actions={[
          <Button
            key="send"
            variant={ButtonVariant.control}
            onClick={() => {
              send();
            }}
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
              onChange={text => {
                this.setState({ message: text });
              }}
            />
          </FormGroup>
          <FormGroup label="Priority" fieldId="priority">
            <List variant={ListVariant.inline}>
              <ListItem>
                <Radio
                  className="radioBtn"
                  name="priority"
                  id="normal"
                  label="Normal"
                  isChecked={this.state.priority === 'normal'}
                  onChange={checked => {
                    if (checked) {
                      this.setState({ priority: 'normal' });
                    }
                  }}
                />
              </ListItem>
              <ListItem>
                <Radio
                  className="radioBtn"
                  name="priority"
                  id="high"
                  label="High"
                  isChecked={this.state.priority === 'high'}
                  onChange={checked => {
                    if (checked) {
                      this.setState({ priority: 'high' });
                    }
                  }}
                />
              </ListItem>
            </List>
          </FormGroup>
          <FormGroup
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

          <FormGroup label="alias" fieldId="alias">
            <TextInput
              id="alias"
              onChange={text => this.setState({ alias: text.split(',') })}
            />
          </FormGroup>

          <FormGroup label="Device Types" fieldId="device-type">
            <TextInput
              id="device-type"
              onChange={text => this.setState({ deviceTypes: text.split(',') })}
              label="Device Types"
            />
          </FormGroup>

          <FormGroup label="Categories" fieldId="categories">
            <TextInput
              id="categories"
              onChange={text => this.setState({ categories: text.split(',') })}
              label="Categories"
            />
          </FormGroup>

          <Text component={TextVariants.small}>
            You can provide multiple values at a time by separating them by
            commas.
          </Text>
        </Form>
      </Modal>
    );
  };
}

SendNotifications.contextType = ApplicationListContext;
