import { FieldDto } from './field.dto';

export interface MultiChoiceFieldDto extends FieldDto {
  options: string[];
}
