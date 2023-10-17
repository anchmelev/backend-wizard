import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from 'typeorm';
import { SurveyStepConfig } from './survey-step-config.entity';

@Entity()
export class SurveyConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => SurveyStepConfig, (step) => step.surveyConfigs, { cascade: true })
  @JoinTable()
  stepConfigs: SurveyStepConfig[];
}
