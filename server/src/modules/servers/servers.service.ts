// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servers } from './entities/servers.entity';
import { NotFoundException } from '@nestjs/common'

@Injectable()
export class ServersService {
  constructor(
    @InjectRepository(Servers)
    private serversRepository: Repository<Servers>, // 注入 User 的 Repository
  ) { }

  // 获取所有
  async findAll(): Promise<Servers[]> {
    return await this.serversRepository.find();
  }

  // 根据 ID 
  async findOne(id: number): Promise<Servers | null> {
    return await this.serversRepository.findOneBy({ id });
  }

  // 创建
  async create(server: Partial<Servers>): Promise<Servers> {
    const newServer = this.serversRepository.create(server);
    return await this.serversRepository.save(newServer);
  }

  // 删除
  async delete(id: number): Promise<void> {
    await this.serversRepository.delete(id);
  }

  // 更新服务器记录
  async updateServer(id: number, updateServerData: Servers): Promise<Servers> {
    const server = await this.serversRepository.findOne({ where: { id } });

    if (!server) {
      throw new NotFoundException(`Server with ID ${id} not found`);
    }

    // // 如果有 settings 字段，需将其序列化为字符串
    // if (updateServerData.settings) {
    //   updateServerData.settings = JSON.stringify(updateServerData.settings);
    // }

    // 使用 TypeORM 的 merge 方法更新字段
    const updatedServer = this.serversRepository.merge(server, updateServerData);
    return await this.serversRepository.save(updatedServer);
  }
}
