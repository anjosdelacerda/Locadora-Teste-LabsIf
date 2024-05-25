import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from 'src/db/entities/cars.entity';
import { UserEntity } from 'src/db/entities/users.entity';
import { RentEntity } from 'src/db/entities/rents.entity';

@Module({
  controllers: [CarController],
  imports: [TypeOrmModule.forFeature([CarEntity, UserEntity, RentEntity])],
  providers: [CarService],
})
export class CarModule {}
