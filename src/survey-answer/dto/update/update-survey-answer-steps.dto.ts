import { IsNotEmpty, IsInt, Min, Max, IsArray, ArrayMaxSize, ArrayMinSize, Validate } from 'class-validator';
import { IsFieldValueValid } from '../create/is-field-value-valid.validator';

export class UpdateSurveyAnswerStepsDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(1000) // TODO: from business
  changedStepAnswers: UpdateSurveyStepAnswerDto[];
}

export class UpdateSurveyStepAnswerDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  id: number;

  @IsNotEmpty()
  @Validate(IsFieldValueValid)
  fieldValue: string | string[] | number;
}
