import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Equal, Like, Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { ExchangeWallet } from '../exchange/exchange-wallet.entity'
import { WalletTransaction } from './wallet-transaction.entity'
import { TransactionQueryDto } from './wallet-transaction-query.dto'

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
  async getAllTransactions(
    query: TransactionQueryDto,
  ) {
    const {
      page,
      pageSize,
      transactionSignature,
      walletAddress,
      ca,
      tokenSymbol,
      purchaseAmount,
      tokenMarketValueHeight,
      tokenMarketValue,
      type,
      blackMarketRatio,
      isSentToExchange,
      profit,
      field,
      order,
    } = query
    console.log(query)

    const queryBuilder = await this.walletTransactionRepository.createQueryBuilder('transaction')
      .orderBy('transaction.createdAt', 'DESC')

    queryBuilder.where({
      ...(transactionSignature && { transactionSignature: Like(`%${transactionSignature}%`) }),
      ...(walletAddress && { walletAddress: Like(`%${walletAddress}%`) }),
      ...(ca && { ca: Like(`%${ca}%`) }),
      ...(tokenSymbol && { tokenSymbol: Like(`%${tokenSymbol}%`) }),
      ...(type && { type: Equal(type) }),
      ...(isSentToExchange && { isSentToExchange: Equal(isSentToExchange) }),
    })
    if (purchaseAmount) {
      const { min, max } = this.parseRange(purchaseAmount)
      queryBuilder.andWhere('transaction.purchaseAmount BETWEEN :min AND :max', {
        min,
        max,
      })
    }
    if (tokenMarketValueHeight) {
      const { min, max } = this.parseRange(tokenMarketValueHeight)
      queryBuilder.andWhere('transaction.tokenMarketValueHeight BETWEEN :min AND :max', {
        min,
        max,
      })
    }
    if (tokenMarketValue) {
      const { min, max } = this.parseRange(tokenMarketValue)
      queryBuilder.andWhere('transaction.tokenMarketValue BETWEEN :min AND :max', {
        min,
        max,
      })
    }
    if (blackMarketRatio) {
      const { min, max } = this.parseRange(blackMarketRatio)
      queryBuilder.andWhere('transaction.blackMarketRatio BETWEEN :min AND :max', {
        min,
        max,
      })
    }
    if (profit) {
      const { min, max } = this.parseRange(profit)
      queryBuilder.andWhere('transaction.profit BETWEEN :min AND :max', {
        min,
        max,
      })
    }
    if (field && order) {
      queryBuilder.orderBy(`transaction.${field}`, order)
    }

    // 使用 paginateRaw 函数进行分页
    const paginationResult = paginate<WalletTransaction>(queryBuilder, { page, pageSize })

    return paginationResult // 返回分页后的结果
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
  async updateTransactionMarketValue(ca: string, tokenMarketValueHeight: number, timeToHighMarketValue: number): Promise<number> {
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
      transaction.timeToHighMarketValue = timeToHighMarketValue
      // 保存更新后的交易记录
      updatedCount++
      await this.walletTransactionRepository.save(transaction)
    }

    return updatedCount
  }

  // 解析范围值的函数，支持 "-" 表示范围
  parseRange = (value: string): { min: number, max: number } | undefined => {
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
}
