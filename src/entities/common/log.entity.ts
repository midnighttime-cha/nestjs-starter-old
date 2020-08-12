import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { LogTypes } from './log-type.entity';
import { Users } from './user.entity';
import { OfficeMenus } from './dev-office-menu.entity';

@Entity({ name: 'logs', schema: 'logs' })
export class Logs {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'type_id' }) typeId: number;
  @CreateDateColumn({ name: 'datetime', nullable: false }) datetime: Date;
  @Column({ name: 'user_id', nullable: false }) userId: number;
  @Column({ name: 'ip', nullable: false }) ip: string;
  @Column({ name: 'menu_id', nullable: false }) menuId: number;
  @Column({ name: 'describe', nullable: false }) describe: string;

  @ManyToOne(type => LogTypes, types => types.id, { cascade: true }) @JoinColumn({ name: 'type_id' }) logTypes: LogTypes;
  @ManyToOne(type => Users, user => user.id, { cascade: true }) @JoinColumn({ name: 'user_id' }) users: Users;
  @ManyToOne(type => OfficeMenus, menu => menu.id, { cascade: true }) @JoinColumn({ name: 'menu_id' }) officeMenus: OfficeMenus;
}