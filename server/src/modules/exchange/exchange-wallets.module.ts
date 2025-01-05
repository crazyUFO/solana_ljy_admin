import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExchangeWallet } from './exchange-wallet.entity'
import { ExchangeWalletsController } from './exchange-wallets.controller'
import { ExchangeWalletsService } from './exchange-wallets.service'

@Module({
  imports: [TypeOrmModule.forFeature([ExchangeWallet])],
  controllers: [ExchangeWalletsController],
  providers: [ExchangeWalletsService],
})
export class ExchangeWalletsModule {}
