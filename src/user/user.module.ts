import { Module } from '@nestjs/common';
import { UserService as UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ShareModule } from 'src/share/share.module';

@Module({
  imports: [ShareModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  controllers: [],
  exports: [UserService],
})
export class UserModule {}
