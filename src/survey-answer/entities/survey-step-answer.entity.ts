import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { SurveyAnswer } from './survey-answer.entity';
import { SurveyStepConfig } from 'src/survey-config/entities/survey-step-config.entity';
import { FiledValue } from './filed-value';

@Entity()
export class SurveyStepAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SurveyStepConfig)
  stepConfig: SurveyStepConfig;

  @Column('text', {
    transformer: {
      to: (value) => JSON.stringify(value),
      from: (value: string) => JSON.parse(value),
    },
  })
  fieldValue: FiledValue;

  @ManyToOne(() => SurveyAnswer, (qResp) => qResp.stepAnswers)
  surveyAnswer: SurveyAnswer;
}
