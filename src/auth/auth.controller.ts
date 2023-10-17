import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('anonymous')
  anonymousAuth(): Promise<AuthResponseDto> {
    return this.authService.anonymousAuth();
  }
}
