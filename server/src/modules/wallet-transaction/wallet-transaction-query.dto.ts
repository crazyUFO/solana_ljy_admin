import { IsNumber, IsOptional, IsString } from 'class-validator'
import { PagerDto } from '~/common/dto/pager.dto'

export class TransactionQueryDto extends PagerDto {
  @IsString()
  @IsOptional()
  transactionSignature: string

  @IsString()
  @IsOptional()
  walletAddress: string

  @IsString()
  @IsOptional()
  ca: string

  @IsString()
  @IsOptional()
  tokenSymbol: string

  @IsString()
  @IsOptional()
  purchaseAmount: string // 使用 "-" 表示范围

  @IsString()
  @IsOptional()
  tokenMarketValueHeight: string // 使用 "-" 表示范围

  @IsString()
  @IsOptional()
  tokenMarketValue: string // 使用 "-" 表示范围

  @IsNumber()
  @IsOptional()
  type: number // 用于播报类型

  @IsString()
  @IsOptional()
  blackMarketRatio: string // 使用 "-" 表示范围

  @IsNumber()
  @IsOptional()
  isSentToExchange: number

  @IsString()
  @IsOptional()
  profit: string // 使用 "-" 表示范围
}
