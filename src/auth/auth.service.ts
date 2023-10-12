import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class AuthService {
  generateAnonymousToken(): string {
    return uuidV4();
  }
}
