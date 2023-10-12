import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Questionnaire } from './questionnaire.entity';
import { QuestionnaireStepResponse } from './steps/questionnaire-step-response.entity';

@Entity()
export class QuestionnaireResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Questionnaire)
  questionnaire: Questionnaire;

  @OneToMany(() => QuestionnaireStepResponse, (sResp) => sResp.questionnaireResponse)
  stepResponses: QuestionnaireStepResponse[];
}
