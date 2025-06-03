import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
// import { UsersService } from '../../modules/users/users.service'; // Optional: for re-fetching user on each request

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    // private usersService: UsersService, // Optional
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // Payload here is the decoded JWT
    // We can add more validation, e.g., check if user still exists or is active
    // const user = await this.usersService.findById(payload.sub, payload.universityId);
    // if (!user) {
    //   throw new UnauthorizedException('User not found or invalid token');
    // }
    return { userId: payload.sub, email: payload.email, universityId: payload.universityId, roles: payload.roles };
  }
}
