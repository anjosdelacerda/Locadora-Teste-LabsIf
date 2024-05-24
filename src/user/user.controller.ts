import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/db/entities/users.entity';
import { UserDto, UserRouteParameters, UserUpdateDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async listUsers(): Promise<UserEntity[]> {
    return await this.userService.listUsers();
  }

  @Post()
  async create(@Body() user: UserDto) {
    return await this.userService.create(user);
  }

  @Get('/:id')
  async findById(@Param() params: UserRouteParameters) {
    return await this.userService.findById(params.id);
  }

  @Put('/:id')
  async updateUser(
    @Param() params: UserRouteParameters,
    @Body() user: UserUpdateDto,
  ) {
    return await this.userService.updateUser(params.id, user);
  }

  @Delete('/:id')
  async deleteUser(@Param() params: UserRouteParameters) {
    return await this.userService.deleteUser(params.id);
  }
}
