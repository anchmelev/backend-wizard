import { Controller, Get, Param } from '@nestjs/common';
import { QuestionnairesService } from './questionnaires.service';
import { ListResponseDto } from 'src/share/dto/read/list-response.dto';
import { QuestionnaireDto } from './dto/read/questionnaire.dto';
import { MapperService } from 'src/share/mapper.service';
import { QuestionnaireStepDto } from './dto/read/steps/questionnaire-step.dto';

@Controller('questionnaires')
export class QuestionnairesController {
  constructor(
    private readonly questionnairesService: QuestionnairesService,
    private readonly mapper: MapperService,
  ) {}

  @Get()
  async getList(): Promise<ListResponseDto<QuestionnaireDto>> {
    const entities = await this.questionnairesService.findAll();
    return {
      total: entities.length,
      data: entities.map(this.mapper.toQuestionnaireDto),
    };
  }

  @Get('/:questionnaireId/steps')
  async getSteps(@Param('questionnaireId') questionnaireId: number): Promise<QuestionnaireStepDto[]> {
    const steps = await this.questionnairesService.findSteps(questionnaireId);
    return steps.map(this.mapper.toQuestionnaireStepDto);
  }
}
