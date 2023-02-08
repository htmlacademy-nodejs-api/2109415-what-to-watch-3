import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

export const VALID_IMAGE_FORMATS = ['.jpg', '.png'];

@ValidatorConstraint({ name: 'ValidImageFormat' })
export class ValidationFileNameType implements ValidatorConstraintInterface {
  validate(name: string) {
    return VALID_IMAGE_FORMATS.some((format) => name.endsWith(format));
  }

  defaultMessage() {
    return `Image's format is not valid. Allowed formats are: ${VALID_IMAGE_FORMATS}`;
  }
}
