import { Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('anonymous')
  anonymousAuth(@Res() res: Response): void {
    const token = this.authService.generateAnonymousToken();

    // Устанавливаем cookie с атрибутом httpOnly
    res.cookie('ANON_TOKEN', token, { httpOnly: true, maxAge: 86400000 });
    res.status(200).send({ message: 'Anonymous auth successful' });
  }
}
