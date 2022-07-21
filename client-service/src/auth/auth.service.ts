import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  SignInRequestDto,
  SignInResponseDto,
  SignUpRequestDto,
  SignUpResponseDto
} from 'src/dtos';
import { UserRepoService } from 'src/repository/user-repo/user-repo.service';
import { UserEntity } from 'src/repository/user-repo/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserRepoService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(dto: SignInRequestDto): Promise<SignInResponseDto> {
    const { email, password } = dto;

    const user = await this.userService.getUserWithEmail(email);
    if (!user) {
      throw new HttpException(
        {
          message: 'Username not exist',
          statusCode: 401
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        {
          message: 'Wrong username or password',
          statusCode: 401
        },
        HttpStatus.BAD_REQUEST
      );
    }

    return this.loginWithUser(user);
  }

  async hashPassword(pass: string): Promise<string> {
    return bcrypt.hash(pass, 12);
  }

  async signUp(dto: SignUpRequestDto): Promise<SignInResponseDto> {
    const { email, password } = dto;

    const user = await this.userService.getUserWithEmail(email);
    if (user) {
      throw new HttpException(
        {
          message: 'Email existed',
          statusCode: 401
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const pass = await this.hashPassword(password);

    const us = await this.userService.createUser({
      fullName: dto.fullName,
      email: dto.email,
      password: pass
    });

    return this.loginWithUser(us);
  }

  async loginWithUser(user: UserEntity): Promise<SignUpResponseDto> {
    const accessToken = this.jwtService.sign(
      {
        userId: user.id
      },
      {
        expiresIn: '30d'
      }
    );

    return {
      accessToken,
      fullName: user.fullName,
      email: user.email,
      id: user.id
    };
  }
}
