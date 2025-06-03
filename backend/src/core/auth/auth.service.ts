import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../modules/users/users.service'; // Assuming UsersService exists
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string, universityId: string): Promise<any> {
    // In a real app, universityId would be crucial for user lookup
    const user = await this.usersService.findOneByEmail(email, universityId);
    if (user && await bcrypt.compare(pass, user.password_hash)) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, universityId: user.university_id, roles: user.roles /* assuming roles are populated */ };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
