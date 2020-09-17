import { MultiEvaluationResult } from 'json-data-validator/build/src/Rule';

export const validatorToPF4Status: (
  status: MultiEvaluationResult | undefined | null,
  field: string
) => 'success' | 'error' | 'default' = (
  status: MultiEvaluationResult | undefined | null,
  field: string
) => (status ? (status.isValid(field) ? 'success' : 'error') : 'default');

export const formIsValid: (
  status: MultiEvaluationResult | undefined | null
) => boolean = (status: MultiEvaluationResult | undefined | null) =>
  !!(status?.valid && status.valid);
