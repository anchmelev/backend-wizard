import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyAnswer } from './entities/survey-answer.entity';
import { SurveyStepAnswer } from './entities/survey-step-answer.entity';
import { SurveyAnswerService } from './survey-answer.service';
import { ShareModule } from 'src/share/share.module';
import { SurveyAnswerController } from './survey-answer.controller';
import { SurveyConfigModule } from 'src/survey-config/survey-config.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ShareModule, UserModule, SurveyConfigModule, TypeOrmModule.forFeature([SurveyAnswer, SurveyStepAnswer])],
  providers: [SurveyAnswerService],
  controllers: [SurveyAnswerController],
})
export class SurveyAnswerModule {}
