import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from './transaction.entity';

@Injectable()
export class TransactionRepoService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepo: Repository<TransactionEntity>
  ) {}

  async addTransaction(transaction: {
    orderId: string;
    isSuccess: boolean;
    amount: number;
    userIdFrom: string;
    userIdTo: string;
  }): Promise<TransactionEntity> {
    return await this.transactionRepo.save(transaction);
  }

  async getDetailTransaction(
    transaction_id: string
  ): Promise<TransactionEntity> {
    return this.transactionRepo.findOne({
      where: { id: transaction_id }
    });
  }

  async getHistoryTransaction(userId: string): Promise<TransactionEntity[]> {
    return this.transactionRepo.find({
      where: { userFrom: { id: userId } }
    });
  }
}
