import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SurveyConfig } from './entities/survey-config.entity';
import { getMockSurveys } from './get-mock-surveys';
import { SurveyStepConfig } from './entities/survey-step-config.entity';

@Injectable()
export class SurveyConfigService implements OnModuleInit {
  constructor(
    @InjectRepository(SurveyConfig)
    private readonly surveyConfigRepo: Repository<SurveyConfig>,

    @InjectRepository(SurveyStepConfig)
    private readonly stepConfigRepo: Repository<SurveyStepConfig>,
  ) {}

  findAll(): Promise<SurveyConfig[]> {
    return this.surveyConfigRepo.find({
      relations: {
        stepConfigs: {
          field: true,
        },
      },
    });
  }

  findOne(id: number): Promise<SurveyConfig | null> {
    return this.surveyConfigRepo.findOne({
      where: { id },
      relations: {
        stepConfigs: {
          field: true,
        },
      },
    });
  }

  findStepConfigs(stepIds: number[]): Promise<SurveyStepConfig[]> {
    return this.stepConfigRepo.find({ where: { id: In(stepIds) } });
  }

  async onModuleInit() {
    const exists = await this.surveyConfigRepo.count();
    if (exists) return;

    const mockSurveys = getMockSurveys();
    await this.surveyConfigRepo.save(mockSurveys);
  }
}
