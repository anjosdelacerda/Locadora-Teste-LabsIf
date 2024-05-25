import {
  IsOptional,
  IsString,
  IsUUID,
  IsEnum,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum UserGenderEnum {
  F = 'F',
  M = 'M',
}

export class UserDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  email: string;

  @ApiProperty({ enum: UserGenderEnum })
  @IsEnum(UserGenderEnum)
  gender: string;

  @ApiProperty({ type: String })
  @IsString()
  cellphone: string;

  @ApiProperty({ type: String, format: 'date-time' })
  @IsDateString()
  birthday: Date;

  @ApiProperty({ type: String })
  @IsString()
  password: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}

export class UserUpdateDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  email: string;

  @ApiPropertyOptional({ enum: UserGenderEnum })
  @IsEnum(UserGenderEnum)
  @IsOptional()
  gender: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  cellphone: string;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @IsDateString()
  @IsOptional()
  birthday: Date;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  password: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}

export class UserRouteParameters {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID()
  id: string;
}
