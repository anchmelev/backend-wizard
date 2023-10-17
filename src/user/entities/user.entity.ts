import { SurveyAnswer } from 'src/survey-answer/entities/survey-answer.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => SurveyAnswer, (surveyAnswer) => surveyAnswer.user)
  surveyAnswers: SurveyAnswer[];
}
