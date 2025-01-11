import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

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

  @CreateDateColumn()
  createdAt: Date // 钱包地址创建时间

  @UpdateDateColumn()
  updatedAt: Date // 钱包地址最后更新时间
}
