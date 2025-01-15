import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ExchangeWallet } from '../exchange/exchange-wallet.entity'
import { WalletTransaction } from './wallet-transaction.entity'

@Injectable()
export class WalletTransactionService {
  constructor(
    @InjectRepository(WalletTransaction)
    private walletTransactionRepository: Repository<WalletTransaction>, // WalletTransaction 的 Repository

    @InjectRepository(ExchangeWallet)
    private exchangeWalletRepository: Repository<ExchangeWallet>, // ExchangeWallet 的 Repository
  ) { }

  // 创建交易记录
  async createTransaction(transactionData: Partial<WalletTransaction>): Promise<WalletTransaction> {
    // 查找 walletAddress 是否在黑名单中
    const blacklistRecord = await this.exchangeWalletRepository.findOne({
      where: { walletAddress: transactionData.walletAddress },
    })

    if (blacklistRecord) {
      // 如果找到了黑名单记录，关联 blacklist
      transactionData.blacklist = blacklistRecord
    }
    else {
      // 如果没有找到，设置 blacklist 为 null
      transactionData.blacklist = null
    }

    // 创建并保存交易记录
    const newTransaction = this.walletTransactionRepository.create(transactionData)

    // 保存交易记录
    return this.walletTransactionRepository.save(newTransaction)
  }

  // 获取所有交易记录
  async getAllTransactions(): Promise<WalletTransaction[]> {
    const queryBuilder = this.walletTransactionRepository.createQueryBuilder('transaction')

    // 按 createdAt 字段倒序排序（最新的记录排在前面）
    queryBuilder.orderBy('transaction.updatedAt', 'DESC')

    // 执行查询
    return queryBuilder.getMany()
  }

  // 根据交易签名更新盈利金额
  async updateTransaction(transactionSignature: string, type: number, profit: number): Promise<string> {
    // 查找对应的交易记录
    const transaction = await this.walletTransactionRepository.findOne({
      where: { transactionSignature, type },
    })

    if (!transaction) {
      throw new NotFoundException('Transaction not found')
    }

    // 更新字段值
    transaction.profit = profit

    // 保存更新后的交易记录
    await this.walletTransactionRepository.save(transaction)

    return 'Transaction updated successfully'
  }

  // 根据交易签名更新最高市值
  async updateTransactionMarketValue(ca: string, tokenMarketValueHeight: number): Promise<number> {
    // 查找对应的交易记录
    const transactions = await this.walletTransactionRepository.find({
      where: { ca },
    })
    if (!transactions.length) {
      throw new NotFoundException('ca not found')
    }
    let updatedCount = 0 // 用来记录更新的交易数量
    // 遍历每一条交易记录，更新市场价值相关字段
    for (const transaction of transactions) {
      // 更新交易记录的字段
      transaction.tokenMarketValueHeight = tokenMarketValueHeight
      // 保存更新后的交易记录
      updatedCount++
      await this.walletTransactionRepository.save(transaction)
    }

    return updatedCount
  }

  async getTransactions(queryConditions: Record<string, any>): Promise<WalletTransaction[]> {
    const queryBuilder = this.walletTransactionRepository.createQueryBuilder('transaction')

    // 动态构建查询条件
    if (queryConditions.transactionSignature) {
      queryBuilder.andWhere('transaction.transactionSignature = :transactionSignature', {
        transactionSignature: queryConditions.transactionSignature,
      })
    }

    if (queryConditions.walletAddress) {
      queryBuilder.andWhere('transaction.walletAddress = :walletAddress', {
        walletAddress: queryConditions.walletAddress,
      })
    }

    if (queryConditions.ca) {
      queryBuilder.andWhere('transaction.ca = :ca', {
        ca: queryConditions.ca,
      })
    }

    if (queryConditions.tokenSymbol) {
      queryBuilder.andWhere('transaction.tokenSymbol = :tokenSymbol', {
        tokenSymbol: queryConditions.tokenSymbol,
      })
    }

    // 处理范围查询字段
    if (queryConditions.purchaseAmount) {
      const { min, max } = queryConditions.purchaseAmount
      queryBuilder.andWhere('transaction.purchaseAmount >= :minPurchaseAmount AND transaction.purchaseAmount <= :maxPurchaseAmount', {
        minPurchaseAmount: min,
        maxPurchaseAmount: max,
      })
    }

    if (queryConditions.tokenMarketValueHeight) {
      const { min, max } = queryConditions.tokenMarketValueHeight
      queryBuilder.andWhere('transaction.tokenMarketValueHeight >= :minTokenMarketValueHeight AND transaction.tokenMarketValueHeight <= :maxTokenMarketValueHeight', {
        minTokenMarketValueHeight: min,
        maxTokenMarketValueHeight: max,
      })
    }

    if (queryConditions.tokenMarketValue) {
      const { min, max } = queryConditions.tokenMarketValue
      queryBuilder.andWhere('transaction.tokenMarketValue >= :minTokenMarketValue AND transaction.tokenMarketValue <= :maxTokenMarketValue', {
        minTokenMarketValue: min,
        maxTokenMarketValue: max,
      })
    }

    if (queryConditions.blackMarketRatio) {
      const { min, max } = queryConditions.blackMarketRatio
      queryBuilder.andWhere('transaction.blackMarketRatio >= :minBlackMarketRatio AND transaction.blackMarketRatio <= :maxBlackMarketRatio', {
        minBlackMarketRatio: min,
        maxBlackMarketRatio: max,
      })
    }

    if (queryConditions.profit) {
      const { min, max } = queryConditions.profit
      queryBuilder.andWhere('transaction.profit >= :minProfit AND transaction.profit <= :maxProfit', {
        minProfit: min,
        maxProfit: max,
      })
    }

    // 处理其他非范围查询字段
    if (queryConditions.type) {
      queryBuilder.andWhere('transaction.type = :type', {
        type: queryConditions.type,
      })
    }

    if (queryConditions.isSentToExchange !== undefined) {
      queryBuilder.andWhere('transaction.isSentToExchange = :isSentToExchange', {
        isSentToExchange: queryConditions.isSentToExchange,
      })
    }

    // 按 updatedAt 字段倒序排序（最新的记录排在前面）
    queryBuilder.orderBy('transaction.updatedAt', 'DESC')

    // 执行查询
    return queryBuilder.getMany()
  }
}
