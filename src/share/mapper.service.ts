import { Injectable } from '@nestjs/common';
import { SurveyConfigDto } from 'src/survey-config/dto/read/survey-config.dto';
import { SurveyStepConfigDto } from 'src/survey-config/dto/read/survey-step-config.dto';
import { FieldType } from 'src/survey-config/entities/fields/field.type';
import { InputField } from 'src/survey-config/entities/fields/input-field.entity';
import { MultiChoiceField } from 'src/survey-config/entities/fields/multi-choice-field.entity';
import { NumericField } from 'src/survey-config/entities/fields/numeric-field.entity';
import { SingleChoiceField } from 'src/survey-config/entities/fields/single-choice-field.entity';
import { SurveyConfig } from 'src/survey-config/entities/survey-config.entity';
import { SurveyStepConfig } from 'src/survey-config/entities/survey-step-config.entity';
import { MappingError } from './mapping.error';
import { SurveyAnswer } from 'src/survey-answer/entities/survey-answer.entity';
import { SurveyAnswerDto } from 'src/survey-answer/dto/read/survey-answer.dto';
import { SurveyStepAnswerDto } from 'src/survey-answer/dto/read/survey-step-answer.dto';
import { SurveyStepAnswer } from 'src/survey-answer/entities/survey-step-answer.entity';

@Injectable()
export class MapperService {
  toSurveyConfigDto = (survey: SurveyConfig): SurveyConfigDto => {
    const surveyDto: SurveyConfigDto = {
      id: survey.id,
      title: survey.title,
      stepConfigs: survey.stepConfigs.map(this.toSurveyStepConfigDto),
    };

    return surveyDto;
  };

  toSurveyAnswerDto = (survey: SurveyAnswer): SurveyAnswerDto => {
    const surveyDto: SurveyAnswerDto = {
      id: survey.id,
      surveyConfig: { id: survey.surveyConfig.id, title: survey.surveyConfig.title },
      stepAnswers: survey.stepAnswers.map(this.toSurveyStepAnswerDto),
    };

    return surveyDto;
  };

  toSurveyStepAnswerDto = ({ id, stepConfig, fieldValue }: SurveyStepAnswer): SurveyStepAnswerDto => {
    return {
      id,
      stepConfig: { id: stepConfig.id, text: stepConfig.text },
      fieldValue,
    };
  };

  toSurveyStepConfigDto = ({ id, text, field }: SurveyStepConfig): SurveyStepConfigDto => {
    let fieldType: FieldType;
    let options: string[] | undefined;
    if (field instanceof InputField) {
      fieldType = FieldType.input;
    } else if (field instanceof MultiChoiceField) {
      fieldType = FieldType.multiChoiceStep;
      options = field.options;
    } else if (field instanceof NumericField) {
      fieldType = FieldType.numeric;
    } else if (field instanceof SingleChoiceField) {
      fieldType = FieldType.singleChoice;
      options = field.options;
    } else {
      throw new MappingError('Unknown field type, must be supported to display it', field);
    }

    return {
      id,
      text,
      field: {
        id: field.id,
        label: field.label,
        type: fieldType,
        options,
      },
    };
  };
}
