import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common'
import { Public } from '../auth/decorators/public.decorator'
import { WalletTransaction } from './wallet-transaction.entity'
import { WalletTransactionService } from './wallet-transaction.service'

@Controller('wallet-transactions')
@Public()
export class WalletTransactionController {
  constructor(private readonly walletTransactionService: WalletTransactionService) {}

  // 创建交易记录
  @Post()
  async create(@Body() transactionData: any): Promise<WalletTransaction> {
    return this.walletTransactionService.createTransaction(transactionData)
  }

  @Get()
  async findAll(
    @Query('transactionSignature') transactionSignature: string,
    @Query('walletAddress') walletAddress: string,
    @Query('ca') ca: string,
    @Query('tokenSymbol') tokenSymbol: string,
    @Query('purchaseAmount') purchaseAmount: string, // 使用 "-" 表示范围
    @Query('tokenMarketValueHeight') tokenMarketValueHeight: string, // 使用 "-" 表示范围
    @Query('tokenMarketValue') tokenMarketValue: string, // 使用 "-" 表示范围
    @Query('type') type: number, // 用于播报类型
    @Query('blackMarketRatio') blackMarketRatio: string, // 使用 "-" 表示范围
    @Query('isSentToExchange') isSentToExchange: string,
    @Query('profit') profit: string, // 使用 "-" 表示范围
  ): Promise<WalletTransaction[]> {
    // 解析范围值的函数，支持 "-" 表示范围
    const parseRange = (value: string): { min: number, max: number } | undefined => {
      if (!value)
        return undefined
      const values = value.split('-').map(val => Number.parseFloat(val.trim())).filter(val => !Number.isNaN(val))
      if (values.length === 1) {
        return { min: values[0], max: 9999999 } // 单个值，表示最小值查询
      }
      else if (values.length === 2) {
        return { min: values[0], max: values[1] } // 范围查询
      }
      return undefined // 如果无法解析为范围，返回 undefined
    }

    // 解析范围
    const purchaseAmountRange = parseRange(purchaseAmount)
    const marketValueHeightRange = parseRange(tokenMarketValueHeight)
    const marketValueRange = parseRange(tokenMarketValue)
    const blackMarketRatioRange = parseRange(blackMarketRatio)
    const profitRange = parseRange(profit)

    // 构造查询条件
    const queryConditions = {
      transactionSignature,
      walletAddress,
      ca,
      tokenSymbol,
      purchaseAmount: purchaseAmountRange ? { min: purchaseAmountRange.min, max: purchaseAmountRange.max } : undefined,
      tokenMarketValueHeight: marketValueHeightRange ? { min: marketValueHeightRange.min, max: marketValueHeightRange.max } : undefined,
      tokenMarketValue: marketValueRange ? { min: marketValueRange.min, max: marketValueRange.max } : undefined,
      type,
      blackMarketRatio: blackMarketRatioRange ? { min: blackMarketRatioRange.min, max: blackMarketRatioRange.max } : undefined,
      isSentToExchange: isSentToExchange === '0' || isSentToExchange === '1' ? Number(isSentToExchange) : undefined,
      profit: profitRange ? { min: profitRange.min, max: profitRange.max } : undefined,
    }

    // 检查是否有有效的查询条件
    const isEmptyQuery = Object.values(queryConditions).every(value => value === undefined)

    if (isEmptyQuery) {
      return this.walletTransactionService.getAllTransactions() // 如果没有查询条件，返回所有记录
    }
    else {
      return this.walletTransactionService.getTransactions(queryConditions) // 根据条件查询
    }
  }

  @Post('update')
  async updateTransaction(
    @Body() body: {
      transactionSignature: string
      type: number
      tokenMarketValueHeight?: number
      blackMarketRatio?: number
      profit?: number
    },
  ) {
    const { transactionSignature, type, tokenMarketValueHeight, blackMarketRatio, profit } = body

    // 参数验证
    if (!transactionSignature) {
      throw new BadRequestException('Missing required transactionSignature')
    }
    // 参数验证
    if (!type) {
      throw new BadRequestException('Missing required type')
    }

    // 调用服务处理回调
    try {
      const result = await this.walletTransactionService.updateTransaction(
        transactionSignature,
        type,
        { tokenMarketValueHeight, blackMarketRatio, profit },
      )
      return { message: result }
    }
    catch (error) {
      throw new BadRequestException('Failed to update transaction')
    }
  }
}
