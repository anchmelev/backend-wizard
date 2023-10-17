import { FieldDto } from 'src/survey-config/dto/read/fields/field.dto';

export interface FieldValue extends Pick<FieldDto, 'id' | 'label' | 'type'> {
  value: string | string[] | number;
}
