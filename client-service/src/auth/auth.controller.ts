import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  SignInRequestDto,
  SignInResponseDto,
  SignUpRequestDto,
  SignUpResponseDto
} from 'src/dtos';
import { AuthService } from './auth.service';
@ApiTags('Authen')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Sign in with email'
  })
  @ApiCreatedResponse({
    type: SignInResponseDto,
    description: 'Sign in successfully'
  })
  async signIn(@Body() body: SignInRequestDto): Promise<SignInResponseDto> {
    return this.authService.signIn(body);
  }

  @Post('sign-up')
  @ApiOperation({
    summary: 'Sign up with email'
  })
  @ApiCreatedResponse({
    type: SignInResponseDto,
    description: 'Sign up successfully'
  })
  async signUp(@Body() body: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(body);
  }
}
