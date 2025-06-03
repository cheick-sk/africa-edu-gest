import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './core/auth/auth.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { UsersModule } from './modules/users/users.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
      envFilePath: '.env', // Specify your .env file path
    }),
    DatabaseModule,
    AuthModule,
    TenantsModule,
    UsersModule,
    PaymentsModule,
    // TODO: Add other feature modules here (Courses, E-learning, etc.)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
