import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { SingObj } from './sing-obj/sing-obj';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async anonymousAuth(): Promise<AuthResponseDto> {
    const newUser = await this.userService.createUser();

    const objForSing: SingObj = {
      userId: newUser.id,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(objForSing),
      this.jwtService.signAsync(objForSing, {
        secret: this.configService.get<string>('REFRESH_SECRET'),
        expiresIn: '180d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
