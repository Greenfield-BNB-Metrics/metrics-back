import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('kpi')
export class KpiModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  spAddress: string;

  @Column({ nullable: true })
  storePriceLimit: number;

  @Column({ nullable: false })
  webHook: string;

  @Column()
  userId: number;

  @Column({ nullable: false, default: true })
  isActive: boolean;

  @Column({ nullable: true })
  expiresAt: number;
}
