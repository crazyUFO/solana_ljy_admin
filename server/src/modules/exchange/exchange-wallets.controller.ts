import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
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
  async findAll(): Promise<ExchangeWallet[]> {
    return this.exchangeWalletService.findAll()
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
