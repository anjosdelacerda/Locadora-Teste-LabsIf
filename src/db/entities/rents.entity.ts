import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserEntity } from './users.entity';
import { CarEntity } from './cars.entity';

@Entity({ name: 'rents' })
export class RentEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz' })
  endDate: Date;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  renter: UserEntity;

  @ManyToOne(() => CarEntity, { onDelete: 'CASCADE' })
  car: CarEntity;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
