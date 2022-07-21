import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

//constants
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  PORT,
  SECRET_KEY
} from './constant';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get databaseHost(): string {
    return this.configService.get<string>('DB_HOST');
  }

  get databasePort(): number {
    return this.configService.get<number>(DB_PORT);
  }

  get databaseUsername(): string {
    return this.configService.get<string>(DB_USERNAME);
  }

  get databasePassword(): string {
    return this.configService.get<string>(DB_PASSWORD);
  }

  get databaseName(): string {
    return this.configService.get<string>(DB_NAME);
  }

  get tokenSecret(): string {
    return this.configService.get<string>(SECRET_KEY);
  }

  get timeout(): number {
    return this.configService.get<number>('HTTP_TIMEOUT');
  }

  get maxRedirect(): number {
    return this.configService.get<number>('DEFAULT_MAX_REDIRECT');
  }

  get verifyOptions(): jwt.VerifyOptions {
    return {
      algorithms: ['HS256']
    };
  }

  get signOptions(): jwt.SignOptions {
    return {
      expiresIn: '30d'
    };
  }
}
