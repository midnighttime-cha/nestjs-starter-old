import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BeforeInsert, getManager, OneToOne, JoinColumn, ManyToOne, OneToMany, BeforeRemove, BeforeUpdate, AfterInsert, AfterUpdate } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import fs = require("fs");
import CryptoJS = require('crypto-js');
import { DatetimeService } from 'src/shared/helper/datetime.service';
import { UserRO } from '../dto/user.dto';

@Entity({ name: 'users' })
export class Users extends DatetimeService {
  constructor() {
    super();
  }
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ nullable: true, unique: true, name: 'code' }) code: string;
  @Column({ name: 'type' }) type: string;
  @Column({ name: 'level', default: 4 }) level: number;
  @Column({ name: 'company_id', nullable: true }) companyId: number;
  @Column({ unique: true, name: 'username' }) username: string;
  @Column({ name: 'password' }) password: string;
  @Column({ name: 'titlename', nullable: true }) titlename: number;
  @Column({ nullable: true, name: 'firstname_th' }) firstnameTH: string;
  @Column({ nullable: true, name: 'firstname_en' }) firstnameEN: string;
  @Column({ nullable: true, name: 'firstname_cn' }) firstnameCN: string;
  @Column({ nullable: true, name: 'lastname_th' }) lastnameTH: string;
  @Column({ nullable: true, name: 'lastname_en' }) lastnameEN: string;
  @Column({ nullable: true, name: 'lastname_cn' }) lastnameCN: string;
  @Column({ type: 'date', nullable: true, name: 'birthday', default: null }) birthDay: Date;
  @Column({ nullable: true, name: 'phone_no' }) mobileNo: string;
  @Column({ unique: true, name: 'email' }) email: string;
  @Column({ nullable: true, name: 'gender', default: 'M' }) gender: string;
  @Column({ name: 'imageUrl', nullable: true }) imageUrl: string;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false, select: false }) isDelete: boolean;
  @Column({ name: 'create_by', default: 1, select: false }) createBy: number;
  @Column({ name: 'modify_by', default: 1, select: false }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at', select: false }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', update: false, select: false }) modifyAt: Date;

  @BeforeInsert()
  async hashPassword() {
    const date = this.format('YYMM');
    const countUser = await getManager().getRepository(Users).find({ type: this.type });
    this.code = `${this.type}${date}${`${(countUser.length + 1)}`.padStart(4, '0')}`;
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
    const { id, code, type, level, companyId, username, password, firstnameTH, firstnameEN, firstnameCN, lastnameTH, lastnameEN, lastnameCN, birthDay, mobileNo, email, gender, imageUrl, access_token } = this;
    let responseObject: any

    if (lang != '') {
      responseObject = {
        id,
        code,
        type,
        level,
        companyId,
        username,
        firstname: this[`firstname${lang}`],
        lastname: this[`lastname${lang}`],
        birthDay,
        mobileNo,
        email,
        gender,
        imageUrl,
        access_token
      };
    } else {
      responseObject = {
        id,
        code,
        type,
        imageUrl,
        level,
        companyId,
        username,
        firstnameTH,
        firstnameEN,
        firstnameCN,
        lastnameTH,
        lastnameEN,
        lastnameCN,
        birthDay,
        mobileNo,
        email,
        gender,
        access_token
      };
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