import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WalletTransactionController } from './wallet-transaction.controller'
import { WalletTransaction } from './wallet-transaction.entity'
import { WalletTransactionService } from './wallet-transaction.service'

@Module({
  imports: [TypeOrmModule.forFeature([WalletTransaction])], // 引入实体
  controllers: [WalletTransactionController],
  providers: [WalletTransactionService],
})
export class WalletTransactionModule {}
