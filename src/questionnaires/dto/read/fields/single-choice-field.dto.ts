import { FieldDto } from './field.dto';

export interface SingleChoiceFieldDto extends FieldDto {
  options: string[];
}
