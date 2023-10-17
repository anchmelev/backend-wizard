import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { HTTP_CACHE_KEY } from './http-cache.decorator';

@Injectable()
export class HttpCacheInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ttl = this.reflector.get<number>(HTTP_CACHE_KEY, context.getHandler());
    if (!ttl) {
      return next.handle();
    }

    return next.handle().pipe(
      tap(() => {
        const http = context.switchToHttp();
        const response = http.getResponse();
        response.header('Cache-Control', `public, max-age=${ttl}`);
      }),
    );
  }
}
