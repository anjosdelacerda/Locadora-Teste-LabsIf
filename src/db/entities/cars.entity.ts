import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserEntity } from './users.entity';
import { RentEntity } from './rents.entity';

@Entity({ name: 'cars' })
export class CarEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 256 })
  model: string;

  @Column({ length: 256 })
  brand: string;

  @Column({ length: 512 })
  description: string;

  @Column({ type: 'bigint' })
  price: number;

  @Column({ length: 256 })
  category: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  owner_by: UserEntity;

  @OneToMany(() => RentEntity, (rent) => rent.car)
  rentals: RentEntity[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
