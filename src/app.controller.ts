import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health')
  getHello() {
    return HttpStatus.OK;
  }
}
