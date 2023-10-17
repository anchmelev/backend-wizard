import { Module } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpCacheInterceptor } from './http-cache/http-cache.interceptor';

@Module({
  imports: [],
  providers: [
    MapperService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
  ],
  exports: [MapperService],
})
export class ShareModule {}
