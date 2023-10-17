import { SurveyStepConfigDto } from './survey-step-config.dto';

export interface SurveyConfigDto {
  id: number;
  title: string;
  stepConfigs: SurveyStepConfigDto[];
}
