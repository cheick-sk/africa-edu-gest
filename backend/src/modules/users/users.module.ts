import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity'; // To be created

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register User entity
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Export service for AuthModule
})
export class UsersModule {}
