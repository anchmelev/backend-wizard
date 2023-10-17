import { Body, Controller, Get, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SurveyAnswerService } from './survey-answer.service';
import { SurveyAnswerDto } from './dto/read/survey-answer.dto';
import { CreateSurveyAnswerDto } from './dto/create/create-survey-answer.dto';
import { ListResponseDto } from 'src/share/dto/read/list-response.dto';
import { ItemResponseDto } from 'src/share/dto/read/item-response.dto';
import { MapperService } from 'src/share/mapper.service';
import { UpdateSurveyAnswerStepsDto } from './dto/update/update-survey-answer-steps.dto';
import { FindOneParams } from 'src/share/get-one-params';
import { HttpCache } from 'src/share/http-cache/http-cache.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetSingObj } from 'src/auth/sing-obj/get-sing-obj';
import { SingObj } from 'src/auth/sing-obj/sing-obj';

const HTTP_CACHE_TIME = 120; // 2 min

@Controller('survey-answer')
@UseGuards(JwtAuthGuard)
export class SurveyAnswerController {
  constructor(
    private readonly surveysService: SurveyAnswerService,
    private readonly mapper: MapperService,
  ) {}

  @HttpCache(HTTP_CACHE_TIME)
  @Get()
  async getSurveys(@GetSingObj() obj: SingObj): Promise<ListResponseDto<SurveyAnswerDto>> {
    const items = await this.surveysService.findAll(obj.userId);
    return {
      total: items.length,
      data: items.map(this.mapper.toSurveyAnswerDto),
    };
  }

  @HttpCache(HTTP_CACHE_TIME)
  @Get('/:id')
  async getSurvey(
    @Param() params: FindOneParams,
    @GetSingObj() obj: SingObj,
  ): Promise<ItemResponseDto<SurveyAnswerDto | null>> {
    const survey = await this.surveysService.findOne(params.id, obj.userId);

    if (survey == null) {
      return { data: null };
    }

    return {
      data: this.mapper.toSurveyAnswerDto(survey),
    };
  }

  @Patch('/:id')
  async updateSurveySteps(
    @Param() params: FindOneParams,
    @GetSingObj() obj: SingObj,
    @Body() updateDto: UpdateSurveyAnswerStepsDto,
  ) {
    await this.surveysService.updateSteps(params.id, obj.userId, updateDto.changedStepAnswers);
    return HttpStatus.OK;
  }

  @Post()
  async createSurveyAnswer(
    @GetSingObj() obj: SingObj,
    @Body() createDto: CreateSurveyAnswerDto,
  ): Promise<SurveyAnswerDto> {
    const newSurvey = await this.surveysService.create(obj.userId, createDto);
    return this.mapper.toSurveyAnswerDto(newSurvey);
  }
}
