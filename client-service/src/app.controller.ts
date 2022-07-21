import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @UseGuards(AuthGuard('JWT'))
  @ApiBearerAuth('access-token')
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
