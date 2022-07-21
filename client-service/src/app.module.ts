import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './core/app-config/app-config.module';
import { AppConfigService } from './core/app-config/app-config.service';
import { TransactionModule } from './main/transaction/transaction.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule, // all controller
    TransactionModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfigService: AppConfigService) => ({
        type: 'mysql',
        host: appConfigService.databaseHost,
        port: appConfigService.databasePort,
        username: appConfigService.databaseUsername,
        password: appConfigService.databasePassword,
        database: appConfigService.databaseName,
        entities: ['src/entities'],
        synchronize: false,
        migrations: ['']
      }),
      inject: [AppConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
