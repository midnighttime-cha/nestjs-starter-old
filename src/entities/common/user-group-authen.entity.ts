import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { UserGroups } from './user-group.entity';
import { OfficeMenus } from './dev-office-menu.entity';

@Entity({ name: 'user_group_authens' })
export class UserGroupAuthen {
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
  @Column({ name: 'is_delete', default: false, select: false }) isDelete: boolean;
  @Column({ name: 'create_by', default: 1, select: false }) createBy: number;
  @Column({ name: 'modify_by', default: 1, select: false }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at', select: false }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', update: false, select: false }) modifyAt: Date;

  @ManyToOne(type => UserGroups, group => group.id, { cascade: true }) @JoinColumn({ name: 'group_id' }) userGroups: UserGroups;
  @ManyToOne(type => OfficeMenus, menu => menu.id, { cascade: true }) @JoinColumn({ name: 'menu_id' }) officeMenus: OfficeMenus;
}
