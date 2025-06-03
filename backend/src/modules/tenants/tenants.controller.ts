import { Controller, Post, Body, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { Tenant } from './entities/tenant.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Tenants (Universities)')
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post('onboarding')
  @ApiOperation({ summary: 'Onboard a new university and create its admin owner' })
  @ApiResponse({ status: 201, description: 'University created successfully.', type: Tenant })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 409, description: 'University name or subdomain already exists.' })
  async onboardTenant(@Body() createTenantDto: CreateTenantDto): Promise<Tenant> {
    return this.tenantsService.createTenant(createTenantDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get university details by ID' })
  @ApiResponse({ status: 200, description: 'University details.', type: Tenant })
  @ApiResponse({ status: 404, description: 'University not found.' })
  // TODO: Add AuthGuard and ensure user has rights to view this tenant
  async getTenantById(@Param('id', ParseUUIDPipe) id: string): Promise<Tenant | null> {
    return this.tenantsService.findById(id);
  }
}
