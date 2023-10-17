import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, ManyToMany } from 'typeorm';
import { SurveyConfig } from './survey-config.entity';
import { Field } from './fields/field.entity';

@Entity()
export class SurveyStepConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => Field, { cascade: true })
  field: Field;

  @ManyToMany(() => SurveyConfig, (survey) => survey.stepConfigs)
  surveyConfigs: SurveyConfig[];
}
