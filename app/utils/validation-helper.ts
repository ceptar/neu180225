import type { ValidationErrorResponseData } from 'remix-validated-form';
import type { ErrorResult } from '~/app/generated/graphql';

export function isErrorResult(input: any): input is ErrorResult {
  return (
    input &&
    (input as ErrorResult).message !== undefined &&
    (input as ErrorResult).errorCode !== undefined
  );
}

export function isValidationErrorResponseData(
  input: any,
): input is ValidationErrorResponseData {
  return (
    input && (input as ValidationErrorResponseData).fieldErrors !== undefined
  );
}
