import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class SendMoneyDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  to: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty()
  amount: number;
}

export class DetailTransactionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  isSuccess: boolean;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  tradingDate: Date;

  @ApiProperty()
  userFrom: string;

  @ApiProperty()
  userTo: string;
}
