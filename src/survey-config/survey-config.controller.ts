import { Controller, Get, Param } from '@nestjs/common';
import { SurveyConfigService } from './survey-config.service';
import { SurveyConfigDto } from './dto/read/survey-config.dto';
import { MapperService } from 'src/share/mapper.service';
import { ListResponseDto } from 'src/share/dto/read/list-response.dto';
import { FindOneParams } from 'src/share/get-one-params';
import { ItemResponseDto } from 'src/share/dto/read/item-response.dto';
import { HttpCache } from 'src/share/http-cache/http-cache.decorator';

const HTTP_CACHE_TIME = 120; // 2 min

@Controller('survey-config')
export class SurveyConfigController {
  constructor(
    private readonly surveysService: SurveyConfigService,
    private readonly mapper: MapperService,
  ) {}

  @HttpCache(HTTP_CACHE_TIME)
  @Get()
  async getSurveys(): Promise<ListResponseDto<SurveyConfigDto>> {
    const entities = await this.surveysService.findAll();
    return {
      total: entities.length,
      data: entities.map(this.mapper.toSurveyConfigDto),
    };
  }

  @HttpCache(HTTP_CACHE_TIME)
  @Get('/:id')
  async getSurvey(@Param() params: FindOneParams): Promise<ItemResponseDto<SurveyConfigDto | null>> {
    const survey = await this.surveysService.findOne(params.id);
    return { data: survey == null ? null : this.mapper.toSurveyConfigDto(survey) };
  }
}
