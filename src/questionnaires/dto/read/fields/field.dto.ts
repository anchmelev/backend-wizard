import { FieldType } from 'src/questionnaires/entities/fields/field.type';

export interface FieldDto {
  id: number;
  label: string;
  type: FieldType;
}
