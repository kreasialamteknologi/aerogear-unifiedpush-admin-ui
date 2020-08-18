import { MultiEvaluationResult } from 'json-data-validator/build/src/Rule';

export const validatorToPF4Status: (
  status: MultiEvaluationResult | undefined,
  field: string
) => 'success' | 'error' | 'default' = (
  status: MultiEvaluationResult | undefined,
  field: string
) => (status ? (status.isValid(field) ? 'success' : 'error') : 'default');

export const formIsValid: (
  status: MultiEvaluationResult | undefined
) => boolean = (status: MultiEvaluationResult | undefined) =>
  !!(status?.valid && status.valid);
