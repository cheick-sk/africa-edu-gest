import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        // entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'], // Adjust path as needed
        autoLoadEntities: true, // Recommended for simplicity
        synchronize: configService.get<string>('NODE_ENV') !== 'production', // true for dev, false for prod
        logging: configService.get<string>('NODE_ENV') !== 'production',
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
  ],
})
export class DatabaseModule {}
