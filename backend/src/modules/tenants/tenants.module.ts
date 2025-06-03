import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { Tenant } from './entities/tenant.entity';
import { User } from '../users/entities/user.entity'; // Import User entity
import { UsersModule } from '../users/users.module'; // Import UsersModule for UsersService

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant, User]), // Register Tenant and User entities
    UsersModule, // Make UsersService available if needed directly
  ],
  controllers: [TenantsController],
  providers: [TenantsService],
  exports: [TenantsService],
})
export class TenantsModule {}
