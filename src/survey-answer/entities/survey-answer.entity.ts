import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { SurveyStepAnswer } from './survey-step-answer.entity';
import { SurveyConfig } from 'src/survey-config/entities/survey-config.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity()
export class SurveyAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.surveyAnswers)
  user: UserEntity;

  @ManyToOne(() => SurveyConfig)
  surveyConfig: SurveyConfig;

  @OneToMany(() => SurveyStepAnswer, (sResp) => sResp.surveyAnswer, { cascade: true })
  stepAnswers: SurveyStepAnswer[];
}
