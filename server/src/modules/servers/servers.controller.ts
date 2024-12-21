// src/user/user.controller.ts
import { Controller, Get, Post, Param, Body, Delete, Patch } from '@nestjs/common';
import { ServersService } from './servers.service';
import { Servers } from './entities/servers.entity';
import { Public } from '../auth/decorators/public.decorator'
import { executeCommand } from './servers.ssh'

@Controller('nodes') // API 路径: /nodes
@Public()
export class ServersController {
  constructor(private readonly ServersService: ServersService) { }

  // 获取所有
  @Get()
  async findAll(): Promise<Servers[]> {
    console.log(333333)
    return await this.ServersService.findAll();
  }

  // 根据 ID 获取
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Servers> {
    console.log(1111111)
    return await this.ServersService.findOne(id);
  }

  // 创建
  @Post()
  async create(@Body() server: Partial<Servers>): Promise<Servers> {
    // 确保 settings 是 JSON 字符串
    if (server.settings && typeof server.settings === 'object') {
      server.settings = JSON.stringify(server.settings);
    }
    return await this.ServersService.create(server);
  }

  // 重启服务器
  @Post('restart')
  async restartServer(@Body() server: Partial<Servers>): Promise<any> {
    const { id } = server
    let current = await this.ServersService.findOne(id);
    // let server = await this.ServersService.findOne(id);
    let sshConfig = {
      host: current.ip,
      port: current.port,
      username: 'root',
      password: current.password, // 或 privateKey
    }
    console.log(current.ip)
    return await executeCommand('/root/solanaBot/restart.sh', sshConfig);
  }

  // 删除
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.ServersService.delete(id);
  }

  // 更新服务器字段
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateServerData,
  ): Promise<Servers> {
    console.log(updateServerData)
    return await this.ServersService.updateServer(id, updateServerData);
  }
}
