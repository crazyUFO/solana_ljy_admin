import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common'
import { SkipThrottle } from '@nestjs/throttler'
import { ApiResult } from '~/common/decorators/api-result.decorator'
import { Public } from '../auth/decorators/public.decorator'
import { WalletTransaction } from './wallet-transaction.entity'
import { WalletTransactionService } from './wallet-transaction.service'
import { TransactionQueryDto } from './wallet-transaction-query.dto'
import { TransactionUpdateDto } from './wallet-transaction-update.dto'

@Controller('wallet-transactions')
@Public()
export class WalletTransactionController {
  constructor(private readonly walletTransactionService: WalletTransactionService) { }

  // 创建交易记录
  @Post()
  async create(@Body() transactionData: any): Promise<WalletTransaction> {
    return this.walletTransactionService.createTransaction(transactionData)
  }

  @Get()
  @ApiResult({ type: [WalletTransaction], isPage: true })
  async findAll(
    @Query() dto: TransactionQueryDto,
  ) {
    return this.walletTransactionService.getAllTransactions(dto)
  }

  @Post('update')
  async updateTransaction(
    @Body() dio: TransactionUpdateDto,
  ) {
    // // 参数验证
    // if (!transactionSignature) {
    //   throw new BadRequestException('Missing required transactionSignature')
    // }
    // // 参数验证
    // if (!type) {
    //   throw new BadRequestException('Missing required type')
    // }
    // // 参数验证
    // if (!profit) {
    //   throw new BadRequestException('Missing required profit')
    // }

    // 调用服务处理回调
    return this.walletTransactionService.updateTransaction(dio)
    // try {
    //   const result = await this.walletTransactionService.updateTransaction(
    //     dio
    //   )
    //   return result
    // }
    // catch (error) {
    //   throw new BadRequestException('Failed to update transaction')
    // }
  }

  @Post('updateTokenMarketValueHeight')
  @SkipThrottle() // 跳过限流
  async updateTransactionMarketValue(
    @Body() body: {
      ca: string
      tokenMarketValueHeight: number
      timeToHighMarketValue: number
    },
  ) {
    const { ca, tokenMarketValueHeight, timeToHighMarketValue } = body

    // 参数验证
    if (!ca) {
      throw new BadRequestException('Missing required ca')
    }
    // 参数验证
    if (!tokenMarketValueHeight) {
      throw new BadRequestException('Missing required tokenMarketValueHeight')
    }
    // 参数验证
    if (!timeToHighMarketValue) {
      throw new BadRequestException('Missing required timeToHighMarketValue')
    }

    // 调用服务处理回调
    try {
      const result = await this.walletTransactionService.updateTransactionMarketValue(
        ca,
        tokenMarketValueHeight,
        timeToHighMarketValue,
      )
      return result
    }
    catch (error) {
      throw new BadRequestException(error)
    }
  }

  // 查询指定时间范围内的入库条数
  @Get('countByTimestampRange')
  @ApiResult({ type: Object }) // 返回一个数字
  async getTransactionCountByTimestampRange(
    @Query('startTimestamp') startTimestamp: number,
    @Query('endTimestamp') endTimestamp: number,
  ) {
    // 参数验证
    if (!startTimestamp || !endTimestamp) {
      throw new BadRequestException('Missing required startTimestamp or endTimestamp')
    }
    if (Number.isNaN(startTimestamp) || Number.isNaN(endTimestamp)) {
      throw new BadRequestException('Invalid timestamp')
    }
    if (startTimestamp > endTimestamp) {
      throw new BadRequestException('startTimestamp must be less than endTimestamp')
    }

    return this.walletTransactionService.getTransactionCountByTimestampRange(
      startTimestamp,
      endTimestamp,
    )
  }
}
