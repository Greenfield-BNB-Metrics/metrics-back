import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { KpiModel } from './kpi.model';

@Entity('user')
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column({ nullable: true })
  kpiId: number;

  @Column({ nullable: true })
  expiresAt: Date;

  @OneToMany(() => KpiModel, (kpiModel) => kpiModel.user)
  kpi: KpiModel[];
}
