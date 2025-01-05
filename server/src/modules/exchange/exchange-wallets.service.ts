import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ExchangeWallet } from './exchange-wallet.entity'

@Injectable()
export class ExchangeWalletsService {
  constructor(
    @InjectRepository(ExchangeWallet)
    private readonly exchangeWalletRepository: Repository<ExchangeWallet>,
  ) {}

  // 创建钱包
  async create(createExchangeWalletDto: Partial<ExchangeWallet>): Promise<ExchangeWallet> {
    const wallet = this.exchangeWalletRepository.create(createExchangeWalletDto)
    return this.exchangeWalletRepository.save(wallet)
  }

  // 获取所有钱包
  async findAll(): Promise<ExchangeWallet[]> {
    return this.exchangeWalletRepository.find()
  }

  // 获取单个钱包
  async findOne(id: number): Promise<ExchangeWallet> {
    const wallet = await this.exchangeWalletRepository.findOneBy({ id })
    if (!wallet) {
      throw new NotFoundException(`Wallet with ID ${id} not found`)
    }
    return wallet
  }

  // 更新钱包
  async update(id: number, updateExchangeWalletDto: Partial<ExchangeWallet>): Promise<ExchangeWallet> {
    const wallet = await this.exchangeWalletRepository.findOneBy({ id })
    if (!wallet) {
      throw new NotFoundException(`Wallet with ID ${id} not found`)
    }

    Object.assign(wallet, updateExchangeWalletDto) // 合并更新字段
    return this.exchangeWalletRepository.save(wallet)
  }

  // 删除钱包
  async remove(id: number): Promise<void> {
    const wallet = await this.exchangeWalletRepository.findOneBy({ id })
    if (!wallet) {
      throw new NotFoundException(`Wallet with ID ${id} not found`)
    }
    await this.exchangeWalletRepository.remove(wallet)
  }
}
