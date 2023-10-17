import { InputFieldDto } from './fields/input-field.dto';
import { MultiChoiceFieldDto } from './fields/multi-choice-field.dto';
import { NumericFieldDto } from './fields/numeric-field.dto';
import { SingleChoiceFieldDto } from './fields/single-choice-field.dto';

export type ConfigFieldsDto = InputFieldDto | MultiChoiceFieldDto | NumericFieldDto | SingleChoiceFieldDto;

export interface SurveyStepConfigDto {
  id: number;
  text: string;
  field: ConfigFieldsDto;
}
