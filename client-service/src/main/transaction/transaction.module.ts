import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { TransactionRepoModule } from 'src/repository/transaction-repo/transaction-repo.module';
import { UserRepoModule } from 'src/repository/user-repo/user-repo.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { AppConfigService } from 'src/core/app-config/app-config.service';
import { AppConfigModule } from './../../core/app-config/app-config.module';
@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [
    HttpModule.registerAsync({
      useFactory: async (config: AppConfigService) => ({
        timeout: config.timeout,
        maxRedirects: config.maxRedirect
      }),
      inject: [AppConfigModule]
    }),
    AuthModule,
    UserRepoModule,
    TransactionRepoModule,
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://localhost:1883'
        }
      }
    ])
  ],
  exports: [TransactionService]
})
export class TransactionModule {}
