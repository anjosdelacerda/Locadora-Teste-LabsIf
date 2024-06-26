import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CarDto, CarUpdateDto, RentDto } from './car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CarEntity } from 'src/db/entities/cars.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/db/entities/users.entity';
import { RentEntity } from 'src/db/entities/rents.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RentEntity)
    private readonly rentRepository: Repository<RentEntity>,
  ) {}

  async listCars() {
    return await this.carRepository.find();
  }

  async createCar(userId: string, car: CarDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException(
        `to registar a car, you need to be logged in`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newCar = new CarEntity();
    newCar.id = uuid();
    newCar.model = car.model;
    newCar.brand = car.brand;
    newCar.description = car.description;
    newCar.price = car.price;
    newCar.category = car.category;
    newCar.isRent = false;
    newCar.owner_by = user;

    const createCar = await this.carRepository.save(newCar);
    return createCar;
  }

  async findById(id: string) {
    const foundCar = await this.carRepository.findOne({ where: { id } });
    if (!foundCar) {
      throw new NotFoundException(`This car by id ${id} is not found`);
    }
    return foundCar;
  }

  async updateCar(id: string, userId: string, car: CarUpdateDto) {
    const foundCar = await this.carRepository.findOne({ where: { id } });

    if (!foundCar) {
      throw new NotFoundException(`This car by id ${id} is not found`);
    }

    if (foundCar.owner_by.id !== userId) {
      throw new HttpException(
        `You are not the orner of this car`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.carRepository.update(foundCar.id, car);
    return HttpStatus.OK;
  }

  async removeCar(id: string) {
    const foundCar = await this.carRepository.findOne({ where: { id } });

    if (!foundCar) {
      throw new NotFoundException(`This car by id ${id} is not found`);
    }

    const res = await this.carRepository.delete(id);
    if (!res.affected) {
      throw new HttpException(
        `Task with id ${id} is not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return HttpStatus.NO_CONTENT;
  }

  async rentCar(userId: string, rent: RentDto) {
    const findUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!findUser) {
      throw new NotFoundException(`to rent a car, you need to be logged in`);
    }

    const findCar = await this.carRepository.findOne({
      where: { id: rent.isCar },
    });

    if (!findCar) {
      throw new NotFoundException(`Car by id ${rent.isCar} is not found`);
    }

    if (findCar.isRent === true) {
      throw new HttpException(
        `This car is not available`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.carRepository.update(findCar.id, { isRent: true });

    const newRent = new RentEntity();

    newRent.startDate = rent.startDate;
    newRent.endDate = rent.endDate;
    newRent.car = findCar;
    newRent.renter = findUser;

    await this.rentRepository.save(newRent);
    return HttpStatus.OK;
  }

  async availableCars() {
    return await this.carRepository.find({ where: { isRent: false } });
  }

  async noAvailableCars() {
    return await this.carRepository.find({ where: { isRent: true } });
  }
}
