import React, { Component } from 'react';
import {
  AndroidVariant,
  PushApplication,
  Variant,
} from '@aerogear/unifiedpush-admin-client';
import {
  Button,
  ButtonVariant,
  Form,
  Modal,
  ModalVariant,
} from '@patternfly/react-core';
import { UpsClientFactory } from '../../../../utils/UpsClientFactory';
import {
  ApplicationListContext,
  ContextInterface,
} from '../../../../context/Context';
import { FormField } from '../FormField';
import {
  Data,
  RuleBuilder,
  Validator,
  validatorBuilder,
} from 'json-data-validator';
import { MultiEvaluationResult } from 'json-data-validator/build/src/Rule';

interface Props {
  visible: boolean;
  app: PushApplication;
  variant: AndroidVariant;
  onCancel: () => void;
  onSaved: (variant: Variant) => void;
}

interface State {
  updating: boolean;
  googleKey?: string;
  projectNumber?: string;
  formValidation?: MultiEvaluationResult;
}

export class EditAndroidNetworkOptions extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      updating: false,
      googleKey: this.props.variant.googleKey,
      projectNumber: this.props.variant.projectNumber,
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    if (this.props.visible && prevProps.visible !== this.props.visible) {
      this.setState({
        updating: false,
        googleKey: this.props.variant.googleKey,
        projectNumber: this.props.variant.projectNumber,
        formValidation: undefined,
      });
    }
  }

  readonly render = () => {
    const context = this.context as ContextInterface;

    const update = async () => {
      await this.setState({ updating: true });

      // make the call
      try {
        await UpsClientFactory.getUpsClient()
          .variants.android.update(
            this.props.app.pushApplicationID!,
            this.props.variant.variantID
          )
          .withGoogleKey(this.state.googleKey || this.props.variant.googleKey)
          .withProjectNumber(
            this.state.projectNumber || this.props.variant.projectNumber
          )
          .execute();

        this.props.variant.projectNumber =
          this.state.projectNumber || this.props.variant.projectNumber;
        this.props.variant.googleKey =
          this.state.googleKey || this.props.variant.googleKey;
        await this.setState({ updating: false });
      } catch (err) {
        context.alert(err);
      }
      this.props.onSaved(this.props.variant);
    };

    const validator: Validator = validatorBuilder()
      .newRule()
      .withField('googleKey')
      .validate(
        RuleBuilder.matches(
          '^.{1,255}$',
          "Field 'Server Key' must be between 1 and 255 characters"
        )
      )
      .validate(
        RuleBuilder.required()
          .withErrorMessage("Field 'Server Key' is mandatory")
          .build()
      )
      .withField('projectNumber')
      .validate(
        RuleBuilder.matches(
          '^.{1,255}$',
          "Field 'Sender ID' must be between 1 and 255 characters"
        )
      )
      .validate(
        RuleBuilder.required()
          .withErrorMessage("Field 'Sender ID' is mandatory")
          .build()
      )
      .build();

    const updateField = (name: string, value: string) => {
      this.setState(({
        [name]: value,
        formValidation: validator.validate(
          ({ ...this.state, [name]: value } as unknown) as Data,
          true
        ),
      } as unknown) as State);
    };

    return (
      <Modal
        variant={ModalVariant.small}
        title="Edit Variant"
        isOpen={this.props.visible}
        onClose={this.props.onCancel}
        actions={[
          <Button
            key="confirm"
            variant={ButtonVariant.primary}
            onClick={update}
            isDisabled={!this.state.formValidation?.valid}
          >
            Save
          </Button>,
          <Button key="cancel" variant="link" onClick={this.props.onCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form isHorizontal>
          <FormField
            fieldId={'variant-server-key'}
            label={'Push Network'}
            helperText={'Server Key'}
            helperTextInvalid={
              this.state.formValidation?.getEvaluationResult('googleKey')
                ?.message
            }
            validated={
              !this.state.formValidation ||
              this.state.formValidation.isValid('googleKey')
                ? 'success'
                : 'error'
            }
            defaultValue={this.props.variant.googleKey}
            onChange={(value: string) => updateField('googleKey', value)}
          />
          <FormField
            fieldId={'variant-project-number'}
            label={'Push Network'}
            helperText={'Sender ID'}
            helperTextInvalid={
              this.state.formValidation?.getEvaluationResult('projectNumber')
                ?.message
            }
            validated={
              !this.state.formValidation ||
              this.state.formValidation.isValid('projectNumber')
                ? 'success'
                : 'error'
            }
            defaultValue={this.props.variant.projectNumber}
            onChange={(value: string) => updateField('projectNumber', value)}
          />
        </Form>
      </Modal>
    );
  };
}
EditAndroidNetworkOptions.contextType = ApplicationListContext;
