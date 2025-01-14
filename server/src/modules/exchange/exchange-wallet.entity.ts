import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('exchange_wallets')
export class ExchangeWallet {
  @PrimaryGeneratedColumn()
  id: number // 唯一标识符，主键

  @Column({ type: 'varchar', length: 255, unique: true })
  walletAddress: string // 钱包地址，唯一

  @Column({ type: 'varchar', length: 100, nullable: true })
  label: string // 可选字段，钱包的标签或备注（例如：交易所的名称或用途）

  @Column({
    type: 'int',
    default: 1,
  })
  type: number // 地址类型，1: 交易所地址，2: 钱包地址

  @CreateDateColumn()
  createdAt: Date // 钱包地址创建时间

  @UpdateDateColumn()
  updatedAt: Date // 钱包地址最后更新时间
}
