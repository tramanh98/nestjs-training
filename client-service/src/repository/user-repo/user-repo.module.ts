import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepoService } from './user-repo.service';
import { UserEntity } from 'src/repository/user-repo/user.entity';

@Module({
  providers: [UserRepoService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UserRepoService]
})
export class UserRepoModule {}
