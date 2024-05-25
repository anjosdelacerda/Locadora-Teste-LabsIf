import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
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
        entities: [__dirname + '/entities/**'],
        migrations: [__dirname + '/migrations/*.ts'],
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
