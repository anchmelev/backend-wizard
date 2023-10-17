import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyAnswer } from './entities/survey-answer.entity';
import { CreateSurveyAnswerDto } from './dto/create/create-survey-answer.dto';
import { SurveyStepAnswer } from './entities/survey-step-answer.entity';
import { SurveyConfigService } from 'src/survey-config/survey-config.service';
import { UpdateSurveyStepAnswerDto } from './dto/update/update-survey-answer-steps.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SurveyAnswerService {
  constructor(
    private readonly surveyConfigService: SurveyConfigService,
    private readonly userService: UserService,

    @InjectRepository(SurveyAnswer)
    private readonly surveyAnswerRepo: Repository<SurveyAnswer>,
  ) {}

  findAll(userId: number): Promise<SurveyAnswer[]> {
    return this.surveyAnswerRepo.find({
      where: { user: { id: userId } },
      relations: {
        surveyConfig: true,
        stepAnswers: {
          stepConfig: true,
        },
      },
    });
  }

  findOne(id: number, userId: number): Promise<SurveyAnswer | null> {
    return this.surveyAnswerRepo.findOne({
      where: { id, user: { id: userId } },
      relations: {
        surveyConfig: true,
        stepAnswers: {
          stepConfig: true,
        },
      },
    });
  }

  async updateSteps(surveyAnswerId: number, userId: number, changedSteps: UpdateSurveyStepAnswerDto[]): Promise<any> {
    const survey = await this.findOne(surveyAnswerId, userId);

    if (!survey) {
      throw new NotFoundException(`Survey with ID ${surveyAnswerId} not found`);
    }

    const changedStepsMap = new Map(changedSteps.map((step) => [step.id, step]));

    survey.stepAnswers.forEach((stepAnswer) => {
      const changedStep = changedStepsMap.get(stepAnswer.id);
      if (changedStep) {
        stepAnswer.fieldValue = changedStep.fieldValue;
      }
    });

    return await this.surveyAnswerRepo.save(survey);
  }

  async create(userId: number, dto: CreateSurveyAnswerDto): Promise<SurveyAnswer> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const answer = new SurveyAnswer();
    answer.stepAnswers = [];
    answer.user = user;

    const config = await this.surveyConfigService.findOne(dto.surveyConfigId);
    if (!config) {
      throw new NotFoundException('Survey config not found');
    }

    answer.surveyConfig = config;

    const stepConfigIds = dto.stepAnswers.map((x) => x.stepConfigId);
    const stepConfigs = await this.surveyConfigService.findStepConfigs(stepConfigIds);
    const stepConfigsMap = new Map(stepConfigs.map((stepConfig) => [stepConfig.id, stepConfig]));

    for (const stepRespDto of dto.stepAnswers) {
      const stepConfig = stepConfigsMap.get(stepRespDto.stepConfigId);

      if (!stepConfig) {
        throw new NotFoundException(`Step config with ID ${stepRespDto.stepConfigId} not found`);
      }

      const stepAnswer = new SurveyStepAnswer();
      stepAnswer.stepConfig = stepConfig;
      stepAnswer.fieldValue = stepRespDto.fieldValue;

      answer.stepAnswers.push(stepAnswer);
    }

    const createdAnswer = await this.surveyAnswerRepo.save(answer);

    return createdAnswer;
  }
}
