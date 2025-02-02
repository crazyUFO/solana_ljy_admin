import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator'

export class TransactionUpdateDto {
  @IsString()
  @IsOptional()
  transactionSignature: string

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  type: number // 用于播报类型

  @ValidateIf(o => o.profit === undefined) // profit 未提供时 isSentToExchange 必须传递
  @IsNumber()
  @Type(() => Number)
  isSentToExchange: number

  @ValidateIf(o => o.isSentToExchange === undefined) // isSentToExchange 未提供时 profit 必须传递
  @IsNumber()
  @Type(() => Number)
  profit: number
}
