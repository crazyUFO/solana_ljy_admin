import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ExchangeWallet } from './exchange-wallet.entity'

@Injectable()
export class ExchangeWalletsService {
  constructor(
    @InjectRepository(ExchangeWallet)
    private readonly exchangeWalletRepository: Repository<ExchangeWallet>,
  ) { }

  // 创建钱包并确保钱包地址唯一
  async create(createExchangeWalletDto: Partial<ExchangeWallet>): Promise<ExchangeWallet> {
    // 先检查钱包地址是否已存在
    const existingWallet = await this.exchangeWalletRepository.findOne({
      where: { walletAddress: createExchangeWalletDto.walletAddress },
    })

    // 如果存在，抛出自定义错误
    if (existingWallet) {
      throw new ConflictException('Wallet address already exists.')
    }

    try {
      // 创建钱包对象
      const wallet = this.exchangeWalletRepository.create(createExchangeWalletDto)

      // 保存并返回新创建的钱包
      return await this.exchangeWalletRepository.save(wallet)
    }
    catch (error) {
      // 如果发生数据库错误，抛出内部服务器错误（500）
      throw new InternalServerErrorException('Failed to create wallet. Please try again later.')
    }
  }

  // 获取所有钱包
  async findAll(): Promise<ExchangeWallet[]> {
    return this.exchangeWalletRepository.find()
  }

  // 条件查询
  async getWallets(queryConditions: Record<string, any>): Promise<ExchangeWallet[]> {
    const queryBuilder = this.exchangeWalletRepository.createQueryBuilder('transaction')

    // 处理其他非范围查询字段
    if (queryConditions.type) {
      queryBuilder.andWhere('transaction.type = :type', {
        type: queryConditions.type,
      })
    }
    // 按 updatedAt 字段倒序排序（最新的记录排在前面）
    queryBuilder.orderBy('transaction.updatedAt', 'DESC')

    // 执行查询
    return queryBuilder.getMany()
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
