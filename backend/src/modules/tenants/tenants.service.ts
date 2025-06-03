import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { User } from '../users/entities/user.entity'; // Assuming User entity
import { UsersService } from '../users/users.service'; // Assuming UsersService
import * as bcrypt from 'bcrypt';


@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private tenantsRepository: Repository<Tenant>,
    @InjectRepository(User) // Direct injection, or use UsersService
    private usersRepository: Repository<User>,
    // private usersService: UsersService, // Alternative
    private dataSource: DataSource, // For transactions
  ) {}

  async createTenant(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const { universityName, subdomain, ownerEmail, ownerPassword, ownerFirstName, ownerLastName } = createTenantDto;

    // Check if subdomain or name already exists (simplified check)
    const existingTenant = await this.tenantsRepository.findOne({
      where: [{ name: universityName }, { subdomain }],
    });
    if (existingTenant) {
      throw new ConflictException('University name or subdomain already exists.');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create Tenant/University
      const newTenant = queryRunner.manager.create(Tenant, {
        name: universityName,
        subdomain: subdomain,
        // owner_id will be set after user creation
      });
      // Save tenant first to get its ID, but without owner_id
      // This is a simplification. Ideally, user creation and tenant linking are more atomic.
      // For now, we'll create user, then tenant, then update tenant with owner_id.

      // Create Owner User
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(ownerPassword, saltRounds);

      const newOwner = queryRunner.manager.create(User, {
          // university_id will be set after tenant is saved
          email: ownerEmail,
          password_hash: hashedPassword,
          first_name: ownerFirstName,
          last_name: ownerLastName,
          // Roles should be assigned here too, e.g. 'university_admin'
      });

      // Save tenant first to get ID
      const savedTenant = await queryRunner.manager.save(newTenant);

      // Now assign tenant ID to user and save user
      newOwner.university_id = savedTenant.id;
      const savedOwner = await queryRunner.manager.save(newOwner);

      // Update tenant with owner ID
      savedTenant.owner_id = savedOwner.id;
      const finalTenant = await queryRunner.manager.save(savedTenant);

      // TODO: Assign 'university_admin' role to this user for this tenant
      // This would involve app_roles and app_user_roles tables

      await queryRunner.commitTransaction();
      return finalTenant;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error.code === '23505') { // Unique constraint violation
        throw new ConflictException('Tenant name or subdomain already exists or owner email conflict.');
      }
      console.error("Error creating tenant:", error);
      throw new InternalServerErrorException('Failed to create university and owner.');
    } finally {
      await queryRunner.release();
    }
  }

  async findById(id: string): Promise<Tenant | null> {
    return this.tenantsRepository.findOneBy({ id });
  }
}
