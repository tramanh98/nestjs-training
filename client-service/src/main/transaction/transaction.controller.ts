import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DetailTransactionDto, SendMoneyDto } from 'src/dtos';
import { TransactionService } from './transaction.service';
@Controller('transaction')
@ApiTags('Transaction')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
// @Controller('main')
export class TransactionController {
  constructor(private readonly appService: TransactionService) {}

  @Post('send-money')
  @ApiCreatedResponse({
    type: DetailTransactionDto,
    description: 'Success'
  })
  async makeTransaction(
    @Body() body: SendMoneyDto,
    @Request() req
  ): Promise<any> {
    return this.appService.transaction(req.user.userId, body);
  }

  @Get('detail-transaction/:transaction_id')
  @ApiOkResponse({
    type: DetailTransactionDto,
    description: 'Success'
  })
  async detailTransaction(
    @Param('transaction_id') transaction_id: string
  ): Promise<DetailTransactionDto> {
    return this.appService.getDetailTransaction(transaction_id);
  }

  @Get('history')
  @ApiOkResponse({
    type: DetailTransactionDto,
    isArray: true,
    description: 'Success'
  })
  async getHistory(@Request() req): Promise<DetailTransactionDto[]> {
    return this.appService.getHistoryTransaction(req.user.userId);
  }

  @Get('get-list-transaction')
  @ApiOkResponse({
    type: DetailTransactionDto,
    isArray: true,
    description: 'Success'
  })
  async getListTransactionForAccount(
    @Param('account_id') account_id: string
  ): Promise<DetailTransactionDto[]> {
    return this.appService.getHistoryTransaction(account_id);
  }
}
