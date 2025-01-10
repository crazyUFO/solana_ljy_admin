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

  // 获取所有交易记录，根据字段进行多选项搜索
  @Get()
  async findAll(
    @Query('transactionSignature') transactionSignature: string,
    @Query('walletAddress') walletAddress: string,
    @Query('tokenSymbol') tokenSymbol: string,
    @Query('minPurchaseAmount') minPurchaseAmount: number,
    @Query('minTokenMarketValueHeight') minTokenMarketValueHeight: number,
    @Query('minTokenMarketValue') minTokenMarketValue: number,
    @Query('type') type: number, // 修改为 type，用于播报类型
    @Query('blackMarketRatio') blackMarketRatio: number,
    @Query('isSentToExchange') isSentToExchange: string,
    @Query('minProfit') minProfit: number, // 新增盈利金额查询
  ): Promise<WalletTransaction[]> {
    // 如果没有传递任何查询条件，返回所有交易记录
    const queryConditions = {
      transactionSignature,
      walletAddress,
      tokenSymbol,
      purchaseAmount: minPurchaseAmount || undefined,
      tokenMarketValueHeight: minTokenMarketValueHeight || undefined,
      tokenMarketValue: minTokenMarketValue || undefined,
      type, // 播报类型
      blackMarketRatio,
      isSentToExchange: isSentToExchange === '0' || isSentToExchange === '1' ? Number(isSentToExchange) : undefined, // 转换成数字 0 或 1
      profit: minProfit || undefined, // 添加盈利金额查询条件
    }

    // 如果没有任何有效的查询条件（即所有条件都是 undefined），则返回所有记录
    const isEmptyQuery = Object.values(queryConditions).every(value => value === undefined)

    if (isEmptyQuery) {
      return this.walletTransactionService.getAllTransactions() // 查询所有记录
    }
    else {
      return this.walletTransactionService.getTransactions(queryConditions) // 根据条件查询
    }
  }

  @Post('update')
  async updateTransaction(
    @Body() body: {
      transactionSignature: string
      tokenMarketValueHeight?: number
      blackMarketRatio?: number
      profit?: number
    },
  ) {
    const { transactionSignature, tokenMarketValueHeight, blackMarketRatio, profit } = body

    // 参数验证
    if (!transactionSignature) {
      throw new BadRequestException('Missing required transactionSignature')
    }

    // 调用服务处理回调
    try {
      const result = await this.walletTransactionService.updateTransaction(
        transactionSignature,
        { tokenMarketValueHeight, blackMarketRatio, profit },
      )
      return { message: result }
    }
    catch (error) {
      throw new BadRequestException('Failed to update transaction')
    }
  }
}
