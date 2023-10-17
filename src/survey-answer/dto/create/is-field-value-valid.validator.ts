import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsFieldValueValid implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments): boolean {
    if (typeof value === 'string') {
      return value.length <= Number.MAX_SAFE_INTEGER;
    }

    if (typeof value === 'number') {
      return value >= 0 && value <= Number.MAX_SAFE_INTEGER;
    }

    if (Array.isArray(value) && value.every((item) => typeof item === 'string')) {
      const totalLength = value.reduce((acc, item) => acc + item.length, 0);
      return totalLength <= Number.MAX_SAFE_INTEGER;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'The fieldValue must be a string, a number, or an array of strings.';
  }
}
