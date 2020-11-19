import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user_groups')
export class UserGroups {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'title_th' }) titleTH: string;
  @Column({ name: 'title_en' }) titleEN: string;
  @Column({ name: 'title_cn' }) titleCN: string;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false }) isDelete: boolean;
  @Column({ name: 'create_by' }) createBy: number;
  @Column({ name: 'modify_by' }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at' }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at' }) modifyAt: Date;

  async toResponseObject() {
    const responseObject: any = this;
    return responseObject;
  }
}
