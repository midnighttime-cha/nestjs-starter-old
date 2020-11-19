import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, getManager, } from 'typeorm';

@Entity({ name: 'office_menus' })
export class OfficeMenus {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'code', nullable: true }) code: string;
  @Column({ name: 'title_th' }) titleTH: string;
  @Column({ name: 'title_en', nullable: true }) titleEN: string;
  @Column({ name: 'title_cn', nullable: true }) titleCN: string;
  @Column({ name: 'icon', nullable: true }) icon: string;
  @Column({ name: 'type', nullable: true }) type: number;
  @Column({ name: 'url', nullable: true }) url: string;
  @Column({ name: 'sort', nullable: true }) sort: number;
  @Column({ name: 'mode', nullable: true }) mode: string;
  @Column({ name: 'route', nullable: true }) route: number;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false }) isDelete: boolean;
  @Column({ name: 'create_by', default: 1 }) createBy: number;
  @Column({ name: 'modify_by', default: 1 }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at' }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', update: false }) modifyAt: Date;

  @BeforeInsert()
  async generateCode() {
    const count = await this.countData();
    const _code = `${count}`.padStart(2, '0');
    if (this.type == 1) {
      this.code = `${_code}00`;
      console.log('1 ' + this.code);
    } else {
      const mainCode = `${this.code}`.substr(0, 2);
      this.code = `${mainCode}${_code}`;
      console.log('2 ' + this.code);
    }
  }

  private async countData() {
    let items = [];
    const conditions = await getManager()
      .getRepository(OfficeMenus)
      .createQueryBuilder("A")
      .where("A.isDelete = :isDelete", { isDelete: false });
    if (this.type == 2) {
      let mainCode = `${this.code}`.substr(0, 2);
      await conditions.andWhere(`A.code LIKE '${mainCode}%'`);
    }
    items = await conditions.getMany();

    return items.length;
  }
}
