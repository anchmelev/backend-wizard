import { InputFieldDto } from '../fields/input-field.dto';
import { MultiChoiceFieldDto } from '../fields/multi-choice-field.dto';
import { NumericFieldDto } from '../fields/numeric-field.dto';
import { SingleChoiceFieldDto } from '../fields/single-choice-field.dto';

export type FieldsDto = InputFieldDto | MultiChoiceFieldDto | NumericFieldDto | SingleChoiceFieldDto;

export interface QuestionnaireStepDto {
  id: number;
  text: string;
  field: FieldsDto;
}
