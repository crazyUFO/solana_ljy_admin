import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('servers') // 数据库表名为 servers
export class Servers {
  @PrimaryGeneratedColumn()
  id: number // 服务器唯一 ID（主键）

  @Column({ type: 'varchar', length: 100 })
  name: string // 服务器名称

  @Column({ type: 'varchar', length: 45, default: '0.0.0.0' })
  ip: string // 服务器 IP 地址

  @Column({ type: 'varchar', length: 45, default: true })
  password: string // 服务器 password

  @Column({ type: 'varchar', length: 45, default: 22 })
  port: string // 服务器 端口

  @Column({ type: 'boolean', default: true })
  isOnline: boolean // 是否在线（true 表示在线，false 表示离线）

  @Column({ type: 'timestamp', nullable: true })
  lastHeartbeat: Date // 最后一次心跳时间

  @Column({ type: 'text', nullable: true }) // 新增 settings 字段
  settings: string // 存储 JSON 字符串

  @CreateDateColumn()
  createdAt: Date // 记录创建时间

  @UpdateDateColumn()
  updatedAt: Date // 记录最后更新时间
}
