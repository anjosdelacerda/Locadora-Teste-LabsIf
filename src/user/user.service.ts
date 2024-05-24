import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/users.entity';
import { Repository } from 'typeorm';
import { UserDto, UserUpdateDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async listUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find({ where: { isActive: true } });
  }

  async create(user: UserDto) {
    const newUser = new UserEntity();
    const emailAlreadyExistis = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (emailAlreadyExistis) {
      throw new HttpException(
        `The email ${user.email} is already registered`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    newUser.id = uuid();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.gender = user.gender;
    newUser.cellphone = user.cellphone;
    newUser.birthday = user.birthday;
    newUser.password = hashSync(user.password, 10);
    newUser.isActive = true;

    const { id, name, email, gender, cellphone, birthday, isActive } =
      await this.userRepository.save(newUser);

    return { id, name, email, gender, cellphone, birthday, isActive };
  }

  async findById(id: string) {
    const findUser = this.userRepository.findOne({ where: { id } });
    if (!findUser) {
      throw new HttpException(
        `User by id ${id} is not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return findUser;
  }

  async updateUser(id: string, user: UserUpdateDto) {
    const findUser = this.userRepository.findOne({ where: { id } });
    if (!findUser) {
      throw new HttpException(
        `User by id ${id} is not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userRepository.update(id, user);
    return HttpStatus.OK;
  }

  async deleteUser(id: string) {
    const findUser = this.userRepository.findOne({ where: { id } });
    if (!findUser) {
      throw new HttpException(
        `User by id ${id} is not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userRepository.update(id, { isActive: false });
    return HttpStatus.NO_CONTENT;
  }

  async findByEmail(email: string) {
    const findUser = this.userRepository.findOne({ where: { email } });
    if (!findUser) {
      throw new HttpException(
        `User by email ${email} is not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return findUser;
  }
}
