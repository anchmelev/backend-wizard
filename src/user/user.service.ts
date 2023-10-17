import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  findOne(id: number): Promise<UserEntity | null> {
    return this.userRepo.findOne({
      where: { id },
    });
  }

  async createUser(): Promise<UserEntity> {
    const client = await this.userRepo.save({});
    return client;
  }
}
