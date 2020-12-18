import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "thirst_parties" })
export class ThirstParties {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'type' }) type: string;
  @Column({ name: "name" }) name: string;
  @Column({ name: "url" }) url: string;
  @Column({ name: "username" }) username: string;
  @Column({ name: "password" }) password: string;
  @Column({ name: "last_token", nullable: true }) lastToken: string;
  @Column({ name: "token_type", nullable: true }) tokenType: string;
  @Column({ name: "expires", nullable: true }) expires: Date;
  @Column({ name: 'is_production', default: false }) isProduction: boolean;
  @Column({ name: 'is_active', default: true, nullable: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false }) isDelete: boolean;
  @Column({ name: 'create_by', nullable: true, default: 2 }) createBy: number;
  @Column({ name: 'modify_by', nullable: true, default: 2 }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at', nullable: true }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', nullable: true }) modifyAt: Date;

  toResponseObject() {
    const { id, type, name, url, username, password, lastToken, tokenType, expires, isProduction, isActive, isDelete, createBy, modifyBy, createAt, modifyAt } = this;
    const responseObject = { id, type, name, url, username, password, lastToken, tokenType, expires, isProduction, isActive, isDelete, createBy, modifyBy, createAt, modifyAt };
    return responseObject;
  }
}