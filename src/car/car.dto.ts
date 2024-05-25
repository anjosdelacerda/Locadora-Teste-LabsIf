import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum CarCategoriesEnum {
  ECONOMY = 'ECONOMY',
  COMFORT = 'COMFORT',
  PREMIUM = 'PREMIUM',
}

export class CarDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty({ type: String })
  @IsString()
  model: string;

  @ApiProperty({ type: String })
  @IsString()
  brand: string;

  @ApiProperty({ type: String })
  @IsString()
  description: string;

  @ApiProperty({ type: Number })
  @IsInt()
  price: number;

  @ApiProperty({ enum: CarCategoriesEnum })
  @IsEnum(CarCategoriesEnum)
  category: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  isRent: boolean;
}

export class CarUpdateDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  model: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  brand: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ type: Number })
  @IsInt()
  @IsOptional()
  price: number;

  @ApiPropertyOptional({ enum: CarCategoriesEnum })
  @IsEnum(CarCategoriesEnum)
  @IsOptional()
  category: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  isRent: boolean;
}

export class RentDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty({ type: String, format: 'date-time' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  @IsDateString()
  endDate: Date;

  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID()
  isCar: string;
}

export class CarRouteParameters {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID()
  id: string;
}
