import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, getManager } from 'typeorm';

@Entity({ name: 'md_units' })
export class Units {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'code' }) code: string;
  @Column({ name: 'type' }) type: string;
  @Column({ name: 'name_th' }) nameTH: string;
  @Column({ name: 'name_en', nullable: true }) nameEN: string;
  @Column({ name: 'name_cn', nullable: true }) nameCN: string;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false, select: false }) isDelete: boolean;
  @Column({ name: 'create_by', default: 1, select: false }) createBy: number;
  @Column({ name: 'modify_by', default: 1, select: false }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at', select: false }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', update: false, select: false }) modifyAt: Date;

  @BeforeInsert()
  async generateCode() {
    const countData = await getManager().getRepository(Units).count();
    this.code = `${countData + 1}`.padStart(2, '0');
  }
}
