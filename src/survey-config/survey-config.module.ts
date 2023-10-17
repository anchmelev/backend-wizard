import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from './entities/fields/field.entity';
import { InputField } from './entities/fields/input-field.entity';
import { MultiChoiceField } from './entities/fields/multi-choice-field.entity';
import { NumericField } from './entities/fields/numeric-field.entity';
import { SingleChoiceField } from './entities/fields/single-choice-field.entity';
import { SurveyConfig } from './entities/survey-config.entity';
import { SurveyStepConfig } from './entities/survey-step-config.entity';
import { SurveyConfigService } from './survey-config.service';
import { ShareModule } from 'src/share/share.module';
import { SurveyConfigController } from './survey-config.controller';

@Module({
  imports: [
    ShareModule,
    TypeOrmModule.forFeature([
      Field,
      InputField,
      MultiChoiceField,
      NumericField,
      SingleChoiceField,

      SurveyConfig,
      SurveyStepConfig,
    ]),
  ],
  providers: [SurveyConfigService],
  controllers: [SurveyConfigController],
  exports: [SurveyConfigService],
})
export class SurveyConfigModule {}
