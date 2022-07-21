import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
@Injectable()
export class UserRepoService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async getUserWithEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'fullName', 'password']
    });
  }

  async comparePassword(userId: string, password: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: {
        id: userId,
        password
      }
    });
  }

  async createUser(user: {
    email: string;
    password: string;
    fullName: string;
  }): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }
}
