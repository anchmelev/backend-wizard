import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Questionnaire } from '../questionnaire.entity';
import { Field } from '../fields/field.entity';

@Entity()
export class QuestionnaireStep {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => Field)
  field: Field;

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.steps)
  questionnaire: Questionnaire;
}
