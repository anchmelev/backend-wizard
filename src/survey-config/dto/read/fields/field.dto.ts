import { FieldType } from 'src/survey-config/entities/fields/field.type';

export interface FieldDto {
  id: number;
  label: string;
  type: FieldType;
}
