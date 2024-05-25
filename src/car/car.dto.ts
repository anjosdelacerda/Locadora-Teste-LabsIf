import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export enum CarCategoriesEnum {
  ECONOMY = 'ECONOMY',
  COMFORT = 'COMFORT',
  PREMIUM = 'PREMIUM',
}

export class CarDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  model: string;

  @IsString()
  brand: string;

  @IsString()
  description: string;

  @IsInt()
  price: number;

  @IsEnum(CarCategoriesEnum)
  category: string;

  @IsBoolean()
  @IsOptional()
  isRent: boolean;
}

export class CarUpdateDto {
  @IsString()
  @IsOptional()
  model: string;

  @IsString()
  @IsOptional()
  brand: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsOptional()
  price: number;

  @IsEnum(CarCategoriesEnum)
  @IsOptional()
  category: string;

  @IsBoolean()
  @IsOptional()
  isRent: boolean;
}

export class RentDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsUUID()
  isCar: string;
}

export class CarRouteParameters {
  @IsUUID()
  id: string;
}
