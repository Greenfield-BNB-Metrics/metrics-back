import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('storePrice')
export class StorePriceModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  spAddress: string;

  @Column({ nullable: false })
  storePrice: number;

  @Column({ nullable: false })
  timeStamp: number;

  @Column({ nullable: false, default: true })
  isActive: boolean;
}
