import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionnairesModule } from './questionnaires/questionnaires.module';

@Module({
  imports: [
    QuestionnairesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'wizard',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      logging: ['error'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
