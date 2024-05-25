import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CarEntity } from './entities/cars.entity';
import { RentEntity } from './entities/rents.entity';
import { UserEntity } from './entities/users.entity';

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host:
    configService.get<string>('NODE_ENV') === 'local'
      ? configService.get<string>('DB_HOST')
      : configService.get<string>('POSTGRES_DEPLOY_HOST'),
  port:
    configService.get<string>('NODE_ENV') === 'local'
      ? +configService.get<number>('DB_PORT')
      : +configService.get<string>('POSTGRES_DEPLOY_PORT'),
  username:
    configService.get<string>('NODE_ENV') === 'local'
      ? configService.get<string>('DB_USERNAME')
      : configService.get<string>('POSTGRES_DEPLOY_USER'),
  password:
    configService.get<string>('NODE_ENV') === 'local'
      ? configService.get<string>('DB_PASSWORD')
      : configService.get<string>('POSTGRES_DEPLOY_PASSWORD'),
  database:
    configService.get<string>('NODE_ENV') === 'local'
      ? configService.get<string>('DB_NAME')
      : configService.get<string>('POSTGRES_DEPLOY_DB'),
  entities: [UserEntity, CarEntity, RentEntity],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
