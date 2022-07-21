import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionRepoService } from './transaction-repo.service';
import { TransactionEntity } from './transaction.entity';
@Module({
  providers: [TransactionRepoService],
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  exports: [TransactionRepoService]
})
export class TransactionRepoModule {}
