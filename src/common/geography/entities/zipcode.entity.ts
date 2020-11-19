import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, JoinTable, JoinColumn } from 'typeorm';

@Entity({ name: 'zipcodes' })
export class Zipcodes {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'sd_id' }) sdId: number;
  @Column({ name: 'zipcode' }) zipcode: number;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: true }) isDelete: boolean;
  @Column({ name: 'create_by' }) createBy: number;
  @Column({ name: 'modify_by' }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at' }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at' }) modifyAt: Date;

  async toResponseObject() {
    const { id, createBy } = this;
    const responseObject: any = { id, createBy };
    return responseObject;
  }
}
