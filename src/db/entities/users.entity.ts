import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CarEntity } from './cars.entity';
import { RentEntity } from './rents.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 256 })
  name: string;

  @Column({ length: 256, unique: true })
  email: string;

  @Column({ length: 1 })
  gender: string;

  @Column({ length: 11 })
  cellphone: string;

  @Column({ type: 'timestamptz' })
  birthday: Date;

  @Column({ length: 256 })
  password: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => CarEntity, (car) => car.owner_by)
  my_cars: CarEntity[];

  @OneToMany(() => RentEntity, (rent) => rent.renter)
  my_rents: RentEntity[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
