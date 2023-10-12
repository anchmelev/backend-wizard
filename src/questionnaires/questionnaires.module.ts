import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldValue } from './entities/field-values/field-value.entity';
import { InputValue } from './entities/field-values/input-value.entity';
import { MultiChoiceValue } from './entities/field-values/multi-choice-value.entity';
import { NumericValue } from './entities/field-values/numeric-value.entity';
import { SingleChoiceValue } from './entities/field-values/single-choice-value.entity';
import { Field } from './entities/fields/field.entity';
import { InputField } from './entities/fields/input-field.entity';
import { MultiChoiceField } from './entities/fields/multi-choice-field.entity';
import { NumericField } from './entities/fields/numeric-field.entity';
import { SingleChoiceField } from './entities/fields/single-choice-field.entity';
import { QuestionnaireResponse } from './entities/questionnaire-response.entity';
import { Questionnaire } from './entities/questionnaire.entity';
import { QuestionnaireStepResponse } from './entities/steps/questionnaire-step-response.entity';
import { QuestionnaireStep } from './entities/steps/questionnaire-step.entity';
import { QuestionnairesService } from './questionnaires.service';
import { ShareModule } from 'src/share/share.module';
import { QuestionnairesController } from './questionnaires.controller';

@Module({
  imports: [
    ShareModule,
    TypeOrmModule.forFeature([
      Questionnaire,
      QuestionnaireResponse,
      QuestionnaireStep,
      QuestionnaireStepResponse,
      Field,
      InputField,
      MultiChoiceField,
      NumericField,
      SingleChoiceField,
      FieldValue,
      InputValue,
      MultiChoiceValue,
      NumericValue,
      SingleChoiceValue,
    ]),
  ],
  providers: [QuestionnairesService],
  controllers: [QuestionnairesController],
})
export class QuestionnairesModule {}
