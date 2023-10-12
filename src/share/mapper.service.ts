import { Injectable } from '@nestjs/common';
import { QuestionnaireDto } from 'src/questionnaires/dto/read/questionnaire.dto';
import type { Questionnaire } from 'src/questionnaires/entities/questionnaire.entity';
import { QuestionnaireStep } from 'src/questionnaires/entities/steps/questionnaire-step.entity';
import { QuestionnaireStepDto } from 'src/questionnaires/dto/read/steps/questionnaire-step.dto';
import { InputField } from 'src/questionnaires/entities/fields/input-field.entity';
import { MultiChoiceField } from 'src/questionnaires/entities/fields/multi-choice-field.entity';
import { NumericField } from 'src/questionnaires/entities/fields/numeric-field.entity';
import { SingleChoiceField } from 'src/questionnaires/entities/fields/single-choice-field.entity';
import { MappingError } from './mapping.error';
import { FieldType } from 'src/questionnaires/entities/fields/field.type';

@Injectable()
export class MapperService {
  toQuestionnaireDto = (questionnaire: Questionnaire): QuestionnaireDto => {
    const questionnaireDto: QuestionnaireDto = {
      id: questionnaire.id,
      title: questionnaire.title,
      steps: questionnaire.steps.map((x) => x.id),
    };

    return questionnaireDto;
  };

  toQuestionnaireStepDto = ({ id, text, field }: QuestionnaireStep): QuestionnaireStepDto => {
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
      throw new MappingError('Неизвестный тип поля, необходимо поддержать его мапинг', field);
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
