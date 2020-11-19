import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';

@Entity({ name: 'user_authens' })
export class UserAuthens {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'user_id' }) userId: number;
  @Column({ name: 'menu_id' }) menuId: number;
  @Column({ name: 'access', default: false }) access: boolean;
  @Column({ name: 'view', default: false }) view: boolean;
  @Column({ name: 'create', default: false }) create: boolean;
  @Column({ name: 'modify', default: false }) modify: boolean;
  @Column({ name: 'delete', default: false }) delete: boolean;
  @Column({ name: 'approve', default: false }) approve: boolean;
}