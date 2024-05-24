import {
  IsOptional,
  IsString,
  IsUUID,
  IsEnum,
  IsDateString,
  IsBoolean,
} from 'class-validator';

export enum UserGenderEnum {
  F = 'F',
  M = 'M',
}

export class UserDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsEnum(UserGenderEnum)
  gender: string;

  @IsString()
  cellphone: string;

  @IsDateString()
  birthday: Date;

  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsEnum(UserGenderEnum)
  @IsOptional()
  gender: string;

  @IsString()
  @IsOptional()
  cellphone: string;

  @IsDateString()
  @IsOptional()
  birthday: Date;

  @IsString()
  @IsOptional()
  password: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}

export class UserRouteParameters {
  @IsUUID()
  id: string;
}
