// src/user/user.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Servers } from './entities/servers.entity' // 引入实体
import { ServersController } from './servers.controller'
import { ServersService } from './servers.service'

@Module({
  imports: [TypeOrmModule.forFeature([Servers])], // 注册实体
  providers: [ServersService],
  controllers: [ServersController],
  exports: [ServersService],
})
export class ServersModule {}
