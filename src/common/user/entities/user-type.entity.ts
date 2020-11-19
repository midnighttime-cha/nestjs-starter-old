import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('user_types')
export class UserTypes {
  @PrimaryColumn({ name: 'code' }) code: string;
  @Column({ name: 'level' }) level: number;
  @Column({ name: 'title_th' }) titleTH: string;
  @Column({ name: 'title_en', nullable: true }) titleEN: string;
  @Column({ name: 'title_cn', nullable: true }) titleCN: string;
  @Column({ name: 'is_active', default: true, nullable: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false }) isDelete: boolean;
  @Column({ name: 'create_by', nullable: true }) createBy: number;
  @Column({ name: 'modify_by', nullable: true }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at', nullable: true }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', nullable: true }) modifyAt: Date;

  async toResponseObject() {
    const responseObject: any = this;
    return responseObject;
  }
}
