import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BeforeInsert, getManager, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DatetimeService } from 'src/shared/helper/datetime.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './dto/user.dto';
import fs = require("fs");
import CryptoJS = require('crypto-js');
import { ConfSettings } from './conf-setting.entity';
import { UserGroups } from './user-group.entity';
import { UserTitlenames } from './user-titlename.entity';

@Entity({ name: 'users' })
export class Users {
  constructor(
    private readonly datetime: DatetimeService
  ) { }
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ nullable: true, unique: true, name: 'code' }) code: string;
  @ApiProperty({ required: true }) @Column({ name: 'type' }) type: string;
  @Column({ name: 'level', nullable: true }) level: number;
  @Column({ name: 'group_id', nullable: true, update: true }) groupId: number;
  @Column({ name: 'company_id', nullable: true, update: true }) companyId: number;
  @ApiProperty({ required: true }) @Column({ unique: true, name: 'username' }) username: string;
  @ApiProperty({ required: true }) @Column({ name: 'password', nullable: true }) password: string;
  @ApiProperty({ required: true }) @Column({ name: 'titlename_id', nullable: true }) titlenameId: number;
  @ApiProperty({ required: false }) @Column({ name: 'firstname_th' }) firstnameTH: string;
  @ApiProperty({ required: false }) @Column({ nullable: true, name: 'firstname_en' }) firstnameEN: string;
  @ApiProperty({ required: false }) @Column({ nullable: true, name: 'firstname_cn' }) firstnameCN: string;
  @ApiProperty({ required: false }) @Column({ nullable: true, name: 'lastname_th' }) lastnameTH: string;
  @ApiProperty({ required: false }) @Column({ nullable: true, name: 'lastname_en' }) lastnameEN: string;
  @ApiProperty({ required: false }) @Column({ nullable: true, name: 'lastname_cn' }) lastnameCN: string;
  @Column({ nullable: true, name: 'idcard' }) idCard: string;
  @Column({ nullable: true, name: 'religion' }) religion: string;
  @Column({ nullable: true, name: 'nationality' }) nationality: string;
  @Column({ nullable: true, name: 'race' }) race: string;
  @Column({ nullable: true, name: 'occupation' }) occupation: string;
  @Column({ nullable: true, name: 'birthday', default: null }) birthDay: Date;
  @Column({ nullable: true, name: 'phone_no' }) phoneNo: string;
  @Column({ nullable: true, name: 'phone_ext' }) phoneExt: string;
  @Column({ nullable: true, name: 'fax_no' }) faxNo: string;
  @Column({ nullable: true, name: 'fax_ext' }) faxExt: string;
  @ApiProperty({ required: false }) @Column({ nullable: true, name: 'mobile_no' }) mobileNo: string;
  @ApiProperty({ required: false }) @Column({ unique: true, name: 'email' }) email: string;
  @Column({ nullable: true, name: 'google_id' }) googleId: string;
  @Column({ nullable: true, name: 'wechat_id' }) wechatId: string;
  @Column({ nullable: true, name: 'lineid' }) lineid: string;
  @Column({ nullable: true, name: 'website' }) website: string;
  @ApiProperty({ required: false }) @Column({ nullable: true, name: 'gender' }) gender: string;
  @Column({ nullable: true, name: 'image' }) image: string;
  @Column({ nullable: true, name: 'image_thumb' }) imageThumb: string;
  @Column({ nullable: true, name: 'image_path' }) imagePath: string;
  @Column({ nullable: true, name: 'secret' }) secret: string;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false, select: false }) isDelete: boolean;
  @Column({ name: 'create_by', default: 1, select: false }) createBy: number;
  @Column({ name: 'modify_by', default: 1, select: false }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at', select: false }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', update: false, select: false }) modifyAt: Date;

  @ManyToOne(type => UserGroups, group => group.id, { cascade: true }) @JoinColumn({ name: 'group_id' }) userGroups: UserGroups;
  @ManyToOne(type => UserTitlenames, title => title.id, { cascade: true }) @JoinColumn({ name: 'titlename_id' }) titlenames: UserTitlenames;
  @OneToMany(type => ConfSettings, setting => setting.users) @JoinColumn({ name: 'id' }) settings: ConfSettings;

  @BeforeInsert()
  async hashPassword() {
    const date = this.datetime.format('YYMM');
    const countUser = await getManager().getRepository(Users).count({ type: this.type });
    this.code = `${this.type}${date}${`${(countUser + 1)}`.padStart(4, '0')}`;
    this.password = await bcrypt.hash(this.password.trim(), 10);
  }

  private strEncrypt(text) {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(text), process.env.SECRET).toString();
    return ciphertext;
  }

  private get access_token() {
    // PAYLOAD
    const { id, email, code, username } = this;
    const payload = this.strEncrypt({ id, email, code, username });

    // PRIVATE key
    const privateKEY = fs.readFileSync(`${process.env.PRIVATE_KEY}`, 'utf8');

    return jwt.sign({ payload }, privateKEY, {
      issuer: `${process.env.ISSUER}`,
      subject: `${process.env.SUBJECT}`,
      audience: `${process.env.AUDIENCE}`,
      expiresIn: "7d",
      algorithm: "RS256"
    });
  }

  async totalRow() {
    const total = await getManager().getRepository(Users).count({ isDelete: false });
    return total;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  async toResponseObject(showToken: boolean = true, lang = '', showPassword: boolean = false): Promise<UserRO> {
    const { code, type, level, groupId, companyId, username, password, firstnameTH, firstnameEN, firstnameCN, lastnameTH, lastnameEN, lastnameCN, idCard, birthDay, mobileNo, email, gender, imagePath, image, imageThumb, /* companies, settings, */ access_token } = this;
    let responseObject: any

    if (lang != '') {
      responseObject = { code, type, level, groupId, companyId, username, firstname: this[`firstname${lang}`], lastname: this[`lastname${lang}`], idCard, birthDay, mobileNo, email, gender, /* companies, settings, */ imagePath, image, imageThumb };
    } else {
      responseObject = { code, type, level, groupId, companyId, username, firstnameTH, firstnameEN, firstnameCN, lastnameTH, lastnameEN, lastnameCN, idCard, birthDay, mobileNo, email, gender, /* companies, settings, */ imagePath, image, imageThumb };
    }

    if (showToken) {
      responseObject.access_token = access_token;
    }

    if (showPassword) {
      responseObject.password = password;
    }

    return responseObject;
  }
}