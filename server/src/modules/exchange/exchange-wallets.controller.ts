import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { Public } from '../auth/decorators/public.decorator'
import { ExchangeWallet } from './exchange-wallet.entity'
import { ExchangeWalletsService } from './exchange-wallets.service'

@Controller('exchange-wallets')
@Public()
export class ExchangeWalletsController {
  constructor(private readonly exchangeWalletService: ExchangeWalletsService) { }

  // 创建钱包
  @Post()
  async create(@Body() createExchangeWalletDto: Partial<ExchangeWallet>): Promise<ExchangeWallet> {
    return await this.exchangeWalletService.create(createExchangeWalletDto)
  }

  // 获取所有钱包
  @Get()
  async findAll(
    @Query('type') type: number, // 用于播报类型
  ): Promise<ExchangeWallet[]> {
    // 构造查询条件
    const queryConditions = {
      type,
    }
    // 检查是否有有效的查询条件
    const isEmptyQuery = Object.values(queryConditions).every(value => value === undefined)

    if (isEmptyQuery) {
      return this.exchangeWalletService.findAll() // 如果没有查询条件，返回所有记录
    }
    else {
      return this.exchangeWalletService.getWallets(queryConditions) // 根据条件查询
    }
  }

  // 获取单个钱包
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ExchangeWallet> {
    return this.exchangeWalletService.findOne(id)
  }

  // 更新钱包
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateExchangeWalletDto: Partial<ExchangeWallet>,
  ): Promise<ExchangeWallet> {
    return this.exchangeWalletService.update(id, updateExchangeWalletDto)
  }

  // 删除钱包
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.exchangeWalletService.remove(id)
  }
}
