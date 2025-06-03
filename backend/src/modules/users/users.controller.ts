import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { TenantId } from '../../core/auth/tenant.decorator';


@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile(@Req() req, @TenantId() tenantId: string) {
    // req.user is populated by JwtStrategy
    // tenantId is populated by our custom decorator
    // console.log('Current Tenant ID:', tenantId);
    return this.usersService.findById(req.user.userId, tenantId);
  }
}
