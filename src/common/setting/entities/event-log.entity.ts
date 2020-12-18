import { Users } from "src/common/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'event_logs', schema: 'logs' })
export class EventLogs {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @CreateDateColumn({ name: 'timestamp' }) timestamp: Date;
  @Column({ name: 'ip', nullable: true }) ip: string;
  @Column({ name: 'method', nullable: true }) method: string;
  @Column({ name: 'path', nullable: true }) path: string;
  @Column({ name: 'request_payload', nullable: true }) requestPayload: string;
  @Column({ name: 'origin', nullable: true }) origin: string;

  @ManyToOne(type => Users, us => us.id, { cascade: true })
  @JoinColumn({ name: 'user_id' }) users: Users;
  @Column({ name: 'user_id', nullable: true }) userId: number;
}