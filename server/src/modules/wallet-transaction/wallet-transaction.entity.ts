import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ExchangeWallet } from '../exchange/exchange-wallet.entity'

@Entity('wallet_transactions')
export class WalletTransaction {
  @PrimaryGeneratedColumn()
  id: number

  // 代币合约地址
  @Column({ type: 'varchar', length: 255, nullable: true })
  ca: string | null // `ca` 为合约地址

  // 钱包地址
  @Column({ type: 'varchar', length: 255 })
  walletAddress: string

  // 购买金额
  @Column({ type: 'decimal', precision: 18, scale: 4 })
  purchaseAmount: number

  // 代币市值
  @Column({ type: 'decimal', precision: 18, scale: 4 })
  tokenMarketValue: number

  // 代币最高市值
  @Column({ type: 'decimal', precision: 18, scale: 4 })
  tokenMarketValueHeight: number

  // 黑盘比例
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  blackMarketRatio: number

  // 类型 1, 2, 3, 4
  @Column({ type: 'int' })
  type: number

  // 交易签名
  @Column({ type: 'varchar', length: 255 })
  transactionSignature: string

  // 代币符号
  @Column({ type: 'varchar', length: 10 })
  tokenSymbol: string

  // 存储所有相关数据的 JSON 字段
  @Column({ type: 'json', nullable: true })
  data: Record<string, any> | null

  @Column({ type: 'int', default: 0 }) // 使用 INT 类型，0 表示 false，1 表示 true
  isSentToExchange: number

  // 盈利金额（只在交易已发送时有效）
  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  profit: number | null

  // 未发送到交易所的原因
  @Column({ type: 'text', nullable: true })
  failureReason: string | null // 使用 TEXT 类型来存储较长的失败原因

  @ManyToOne(() => ExchangeWallet, exchangeWallet => exchangeWallet.walletAddress, { nullable: true, cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'blacklistId' })
  blacklist: ExchangeWallet // 关联的黑名单钱包

  @Column({ type: 'int', nullable: true })
  blacklistId: number | null // 外键字段，关联 `ExchangeWallet` 表

  @CreateDateColumn()
  createdAt: Date // 钱包地址创建时间

  @UpdateDateColumn()
  updatedAt: Date // 钱包地址最后更新时间

  // 代币创建时间
  @Column({ type: 'timestamp', nullable: true, precision: 3 })
  tokenCreatedAt: Date | null // 代币的创建时间

  // 发送到交易所时间
  @Column({ type: 'timestamp', nullable: true, precision: 3 })
  buyOderAt: Date | null // 用户买入该订单的时间

  // 发送到交易所时间
  @Column({ type: 'timestamp', nullable: true, precision: 3 })
  sentToExchangeAt: Date | null // 记录发送到交易所的时间

  // 发送到播报时间
  @Column({ type: 'timestamp', nullable: true, precision: 3 })
  sentToBroadcastAt: Date | null // 记录发送到播报的时间

  // 买入价格（单个代币的价格）
  @Column({ type: 'decimal', precision: 24, scale: 18, nullable: true })
  buyPrice: number | null // 记录购买时的单个代币价格

  @Column({ type: 'int', nullable: true })
  timeToHighMarketValue: number | null // 时间差（单位：秒，整数）
}
