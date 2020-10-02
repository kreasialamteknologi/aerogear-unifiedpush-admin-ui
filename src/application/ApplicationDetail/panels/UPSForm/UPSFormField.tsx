import React, { useEffect, useState } from 'react';
import { FormGroup, TextArea, TextInput } from '@patternfly/react-core';
import { Data, Validator } from 'json-data-validator';
import { MultiEvaluationResult } from 'json-data-validator/build/src/Rule';
import { validatorToPF4Status } from '../../../../utils/ValidatorUtils';

interface Props {
  fieldId: string;
  label?: string;
  helperText?: string;
  helperTextInvalid?: string;
  validated?: 'success' | 'error' | 'default';
  onChange?: (value: string) => void;
  defaultValue?: string;
  component?: 'textarea' | 'textinput';
  validator?: Validator;
  formData?: Data;
  dependsOn?: string;
}

export function UPSFormField({
  fieldId,
  label,
  helperText,
  helperTextInvalid,
  validated,
  onChange,
  defaultValue,
  component: componentType,
  validator,
  formData = {},
  dependsOn,
}: Props) {
  const [
    validationState,
    setValidationState,
  ] = useState<MultiEvaluationResult | null>(null);

  const [value, setValue] = useState<string | undefined>(undefined);
  const field = formData[dependsOn || '__NO_DEPS'];

  useEffect(() => {
    if (validator && value !== undefined) {
      const validation = validator.validate(
        { ...formData, [fieldId]: value || '' },
        true
      ) as MultiEvaluationResult;
      setValidationState(validation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (validator && (field || !!validationState)) {
      const validation = validator.validate(
        { ...formData, [fieldId]: value || '' },
        true
      ) as MultiEvaluationResult;
      setValidationState(validation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field]);

  const onInputChange = (newVal: string) => {
    if (validator) {
      setValue(newVal);
      if (onChange) {
        onChange(newVal);
      }
    }
  };

  const component = () => {
    if (componentType === 'textarea') {
      return (
        <TextArea
          type="text"
          id={`ta-${fieldId}`}
          defaultValue={defaultValue}
          onChange={onInputChange}
          validated={validatorToPF4Status(validationState, fieldId)}
        />
      );
    } else {
      return (
        <TextInput
          type="text"
          id={`ti-${fieldId}`}
          defaultValue={defaultValue}
          onChange={onInputChange}
          validated={validatorToPF4Status(validationState, fieldId)}
        />
      );
    }
  };

  return (
    <FormGroup
      fieldId={fieldId}
      label={label}
      helperText={helperText}
      helperTextInvalid={validationState?.getEvaluationResult(fieldId)?.message}
      validated={validatorToPF4Status(validationState, fieldId)}
    >
      {component()}
    </FormGroup>
  );
}
