import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { QuestionnaireStep } from './questionnaire-step.entity';
import { FieldValue } from '../field-values/field-value.entity';
import { QuestionnaireResponse } from '../questionnaire-response.entity';

@Entity()
export class QuestionnaireStepResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => QuestionnaireStep)
  step: QuestionnaireStep;

  @ManyToOne(() => FieldValue)
  fieldValue: FieldValue;

  @ManyToOne(() => QuestionnaireResponse, (qResp) => qResp.stepResponses)
  questionnaireResponse: QuestionnaireResponse;
}
