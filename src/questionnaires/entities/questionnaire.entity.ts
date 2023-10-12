import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { QuestionnaireStep } from './steps/questionnaire-step.entity';

@Entity()
export class Questionnaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => QuestionnaireStep, (step) => step.questionnaire)
  steps: QuestionnaireStep[];
}
