import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, Index } from 'typeorm';

@Entity({ name: 'file_baskets' })
export class FileBaskets {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Index() @Column({ name: 'module' }) module: string;
  @Index() @Column({ name: 'module_id' }) moduleId: number;
  @Column({ name: 'type', nullable: true }) type: string;
  @Column({ name: 'type_desc', nullable: true }) typeDesc: string;
  @Column({ name: 'orgname', nullable: true }) orgname: string;
  @Column({ name: 'filename' }) filename: string;
  @Column({ name: 'thumb_filename', nullable: true }) thumbName: string;
  @Column({ name: 'filemodule', nullable: true }) fileModule: string;
  @Column({ name: 'filepath', nullable: true }) filePath: string;
  @Column({ name: 'thumbpath', nullable: true }) thumbPath: string;
  @Column({ name: 'filetype', nullable: true }) fileType: string;
  @Column({ name: 'width', nullable: true }) width: number;
  @Column({ name: 'height', nullable: true }) height: number;
  @Column({ name: 'playtime', nullable: true }) palyTime: string;
  @Column({ name: 'caption_th', nullable: true }) captionTH: string;
  @Column({ name: 'caption_en', nullable: true }) captionEN: string;
  @Column({ name: 'caption_cn', nullable: true }) captionCN: string;
  @Column({ name: 'describe_th', type: 'text', nullable: true }) describeTH: string;
  @Column({ name: 'describe_en', type: 'text', nullable: true }) describeEN: string;
  @Column({ name: 'describe_cn', type: 'text', nullable: true }) describeCN: string;
  @Column({ name: 'isthumb', default: false }) isThumb: boolean;
}
