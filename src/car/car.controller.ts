import {
  Controller,
  Get,
  UseGuards,
  Post,
  Req,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CarService } from './car.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CarDto, CarRouteParameters, CarUpdateDto, RentDto } from './car.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cars')
@UseGuards(AuthGuard)
@Controller('carros')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  async listCars() {
    return await this.carService.listCars();
  }

  @Get('/disponiveis')
  async availableCars() {
    return await this.carService.availableCars();
  }

  @Get('/alugados')
  async noAvailableCars() {
    return await this.carService.noAvailableCars();
  }

  @Post()
  async createCar(@Req() req, @Body() car: CarDto) {
    const userId = req.user.sub;
    return await this.carService.createCar(userId, car);
  }

  @Get('/:id')
  async findById(@Param() params: CarRouteParameters) {
    return await this.carService.findById(params.id);
  }

  @Put('/:id')
  async updateCar(
    @Param() params: CarRouteParameters,
    @Req() req,
    @Body() car: CarUpdateDto,
  ) {
    const userId = req.user.sub;
    return await this.carService.updateCar(params.id, userId, car);
  }

  @Delete('/:id')
  async removeCar(@Param() params: CarRouteParameters) {
    await this.carService.removeCar(params.id);
  }

  @Post('/alugar')
  async rentCar(@Body() rent: RentDto, @Req() req) {
    const userId = req.user.sub;
    return await this.carService.rentCar(userId, rent);
  }
}
