import { SetMetadata } from '@nestjs/common';

export const HTTP_CACHE_KEY = 'http_cache';
export const HttpCache = (ttl: number = 60) => SetMetadata(HTTP_CACHE_KEY, ttl);
