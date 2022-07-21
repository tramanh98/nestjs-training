import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from 'src/core/app-config/app-config.module';
import { AppConfigService } from 'src/core/app-config/app-config.service';
import { UserRepoModule } from 'src/repository/user-repo/user-repo.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfigService: AppConfigService) => ({
        secret: appConfigService.tokenSecret,
        signOptions: appConfigService.signOptions,
        verifyOptions: appConfigService.verifyOptions
      }),
      inject: [AppConfigService]
    }),
    UserRepoModule,
    AppConfigModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard]
})
export class AuthModule {}
