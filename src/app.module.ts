import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SurveyAnswerModule } from './survey-answer/survey-answer.module';
import { SurveyConfigModule } from './survey-config/survey-config.module';

@Module({
  imports: [
    AuthModule,
    SurveyConfigModule,
    SurveyAnswerModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'wizard',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      logging: ['error'],
      synchronize: true,
      // logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
