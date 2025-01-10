import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { WalletTransaction } from './wallet-transaction.entity'

@Injectable()
export class WalletTransactionService {
  constructor(
    @InjectRepository(WalletTransaction)
    private walletTransactionRepository: Repository<WalletTransaction>,
  ) {}

  // 创建交易记录
  async createTransaction(transactionData: Partial<WalletTransaction>): Promise<WalletTransaction> {
    const transaction = this.walletTransactionRepository.create(transactionData)
    return await this.walletTransactionRepository.save(transaction)
  }

  // 获取所有交易记录
  async getAllTransactions(): Promise<WalletTransaction[]> {
    const queryBuilder = this.walletTransactionRepository.createQueryBuilder('transaction')

    // 按 createdAt 字段倒序排序（最新的记录排在前面）
    queryBuilder.orderBy('transaction.updatedAt', 'DESC')

    // 执行查询
    return queryBuilder.getMany()
  }

  // 根据交易签名更新字段
  async updateTransaction(transactionSignature: string, fields: Record<string, any>): Promise<string> {
    // 查找对应的交易记录
    const transaction = await this.walletTransactionRepository.findOne({
      where: { transactionSignature },
    })

    if (!transaction) {
      throw new NotFoundException('Transaction not found')
    }

    // 禁止更新某些敏感字段（例如 transactionSignature）
    if ('transactionSignature' in fields) {
      throw new BadRequestException('Cannot update transaction signature')
    }

    // 更新其他字段
    Object.keys(fields).forEach((field) => {
      // 如果字段在 WalletTransaction 实体中，进行更新
      if (field in transaction) {
        transaction[field] = fields[field]
      }
      else {
        throw new BadRequestException(`Invalid field: ${field}`)
      }
    })

    // 保存更新后的交易记录
    await this.walletTransactionRepository.save(transaction)

    return 'Transaction updated successfully'
  }

  // 根据传入的查询条件获取交易记录
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

    if (queryConditions.tokenSymbol) {
      queryBuilder.andWhere('transaction.tokenSymbol = :tokenSymbol', {
        tokenSymbol: queryConditions.tokenSymbol,
      })
    }

    if (queryConditions.purchaseAmount) {
      queryBuilder.andWhere('transaction.purchaseAmount >= :minPurchaseAmount', {
        minPurchaseAmount: queryConditions.purchaseAmount,
      })
    }

    if (queryConditions.tokenMarketValueHeight) {
      queryBuilder.andWhere('transaction.tokenMarketValueHeight >= :minTokenMarketValueHeight', {
        minTokenMarketValueHeight: queryConditions.tokenMarketValueHeight,
      })
    }

    if (queryConditions.tokenMarketValue) {
      queryBuilder.andWhere('transaction.tokenMarketValue >= :minTokenMarketValue', {
        minTokenMarketValue: queryConditions.tokenMarketValue,
      })
    }

    if (queryConditions.type) {
      queryBuilder.andWhere('transaction.type = :type', {
        type: queryConditions.type,
      })
    }

    if (queryConditions.blackMarketRatio) {
      queryBuilder.andWhere('transaction.blackMarketRatio >= :blackMarketRatio', {
        blackMarketRatio: queryConditions.blackMarketRatio,
      })
    }

    if (queryConditions.isSentToExchange !== undefined) {
      queryBuilder.andWhere('transaction.isSentToExchange = :isSentToExchange', {
        isSentToExchange: queryConditions.isSentToExchange,
      })
    }
    if (queryConditions.profit) {
      queryBuilder.andWhere('transaction.profit >= :minProfit', {
        minProfit: queryConditions.profit,
      })
    }
    // 按 createdAt 字段倒序排序（最新的记录排在前面）
    queryBuilder.orderBy('transaction.updatedAt', 'DESC')

    // 执行查询
    return queryBuilder.getMany()
  }
}
