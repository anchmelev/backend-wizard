import { SurveyConfigDto } from 'src/survey-config/dto/read/survey-config.dto';
import { SurveyStepAnswerDto } from './survey-step-answer.dto';

export interface SurveyAnswerDto {
  id: number;
  surveyConfig: Pick<SurveyConfigDto, 'id' | 'title'>;
  stepAnswers: SurveyStepAnswerDto[];
}
