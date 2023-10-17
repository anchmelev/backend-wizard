import { ArrayMaxSize, ArrayMinSize, IsArray, IsInt, IsNotEmpty, Max, Min, Validate } from 'class-validator';
import { IsFieldValueValid } from './is-field-value-valid.validator';
import { FiledValue } from 'src/survey-answer/entities/filed-value';

export class CreateSurveyAnswerDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  surveyConfigId: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(1000) // TODO: from business
  stepAnswers: CreateSurveyStepAnswerDto[];
}

export class CreateSurveyStepAnswerDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  stepConfigId: number;

  @IsNotEmpty()
  @Validate(IsFieldValueValid)
  fieldValue: FiledValue;
}
