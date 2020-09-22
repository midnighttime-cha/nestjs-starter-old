import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user_group_authens')
export class UserGroupAuthens {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'group_id' }) groupId: number;
  @Column({ name: 'menu_id' }) menuId: number;
  @Column({ name: 'access', default: false }) access: boolean;
  @Column({ name: 'view', default: false }) view: boolean;
  @Column({ name: 'create', default: false }) create: boolean;
  @Column({ name: 'modify', default: false }) modify: boolean;
  @Column({ name: 'delete', default: false }) delete: boolean;
  @Column({ name: 'approve', default: false }) approve: boolean;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'create_by' }) createBy: number;
  @Column({ name: 'modify_by' }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at' }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at' }) modifyAt: Date;
}
