// src/user/user.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'
// import { InjectRedis } from '~/common/decorators/inject-redis.decorator'
import { Public } from '../auth/decorators/public.decorator'
import { Servers } from './entities/servers.entity'
import { ServersService } from './servers.service' // 引入 ConfigService

@Controller('nodes') // API 路径: /nodes
@Public()
export class ServersController {
  private redis: Redis
  constructor(
    private readonly ServersService: ServersService,
    private configService: ConfigService, // 注入 ConfigService
  ) {
    // 通过 ConfigService 获取 Redis 配置信息
    const redisHost = this.configService.get<string>('REDIS_HOST2')
    const redisPort = this.configService.get<number>('REDIS_PORT2')
    const redisPassword = this.configService.get<string>('REDIS_PASSWORD2')
    const redisDb = this.configService.get<number>('REDIS_DB2')
    console.log(redisHost, redisPort, redisPassword, redisDb)
    // 连接到外部 Redis 服务器
    this.redis = new Redis({
      host: redisHost, // 外部 Redis 服务器的 IP 地址
      port: redisPort, // Redis 端口
      password: redisPassword, // Redis 密码（如果有的话）
      db: redisDb, // 默认 Redis 数据库
    })
  }

  // 获取所有
  @Get()
  async findAll(): Promise<Servers[]> {
    return await this.ServersService.findAll()
  }

  // 根据 ID 获取
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Servers> {
    return await this.ServersService.findOne(id)
  }

  // 创建
  @Post()
  async create(@Body() server: Partial<Servers>): Promise<Servers> {
    // 确保 settings 是 JSON 字符串
    if (server.settings && typeof server.settings === 'object') {
      server.settings = JSON.stringify(server.settings)
    }
    return await this.ServersService.create(server)
  }

  // 重启服务器
  @Post('restart')
  async restartServer(@Body() server: Partial<Servers>): Promise<any> {
    const { id } = server
    const current = await this.ServersService.findOne(id)
    // let server = await this.ServersService.findOne(id);
    // const sshConfig = {
    //   host: current.ip,
    //   port: current.port,
    //   username: 'root',
    //   password: current.password, // 或 privateKey
    // }
    const num = this.redis.publish('settings', JSON.stringify(current))
    return num
  }

  // 删除
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.ServersService.delete(id)
  }

  // 更新服务器字段
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateServerData,
  ): Promise<Servers> {
    console.log(updateServerData)
    return await this.ServersService.updateServer(id, updateServerData)
  }
}
