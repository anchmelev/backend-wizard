import { FiledValue } from 'src/survey-answer/entities/filed-value';
import { SurveyStepConfigDto } from 'src/survey-config/dto/read/survey-step-config.dto';

export interface SurveyStepAnswerDto {
  id: number;
  stepConfig: Pick<SurveyStepConfigDto, 'id' | 'text'>;
  fieldValue: FiledValue;
}
