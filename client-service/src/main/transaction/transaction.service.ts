import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { DetailTransactionDto, SendMoneyDto } from 'src/dtos';
import { TransactionRepoService } from 'src/repository/transaction-repo/transaction-repo.service';
import { UserRepoService } from 'src/repository/user-repo/user-repo.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserRepoService,
    private readonly transactionService: TransactionRepoService,
    @Inject('MATH_SERVICE') private client: ClientProxy
  ) {}

  async transaction(
    from: string,
    to: SendMoneyDto
  ): Promise<DetailTransactionDto> {
    const user = await this.userService.getUserWithEmail(to.to);
    if (!user) {
      throw new HttpException(
        {
          message: 'Email not exist',
          statusCode: HttpStatus.NOT_FOUND
        },
        HttpStatus.NOT_FOUND
      );
    }
    // npm install
    const t = await this.httpService.axiosRef
      .post<{
        orderId: string;
        isSuccess: boolean;
        amount: number;
      }>('http://localhost:6012/process', {
        order: {
          from: from,
          to: user.id,
          amount: to.amount
        }
      })
      .then((x) => x.data)
      .catch(() => {
        throw new HttpException(
          {
            message: 'Something went wrong',
            statusCode: HttpStatus.BAD_REQUEST
          },
          HttpStatus.BAD_REQUEST
        );
      });
    return this.transactionService
      .addTransaction({
        ...t,
        userIdFrom: from,
        userIdTo: user.id
      })
      .then((res) => {
        this.client.emit('notify', 'Transaction are made successfully');
        return {
          id: res.id,
          orderId: res.orderId,
          isSuccess: res.isSuccess,
          amount: res.amount,
          tradingDate: res.tradingDate,
          userFrom: res.userIdFrom,
          userTo: res.userIdTo
        };
      });
  }

  async getDetailTransaction(
    transaction_id: string
  ): Promise<DetailTransactionDto> {
    return this.transactionService
      .getDetailTransaction(transaction_id)
      .then((res) => ({
        id: res.id,
        orderId: res.orderId,
        isSuccess: res.isSuccess,
        amount: res.amount,
        tradingDate: res.tradingDate,
        userFrom: res.userFrom.email,
        userTo: res.userTo.email
      }));
  }

  async getHistoryTransaction(userId: string): Promise<DetailTransactionDto[]> {
    return this.transactionService.getHistoryTransaction(userId).then((res) =>
      res.map((r) => ({
        id: r.id,
        orderId: r.orderId,
        isSuccess: r.isSuccess,
        amount: r.amount,
        tradingDate: r.tradingDate,
        userFrom: r.userFrom.email,
        userTo: r.userTo.email
      }))
    );
  }
}
