import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Add custom authentication logic here if needed
    // For example, check if the route is public
    // const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    // if (isPublic) {
    //   return true;
    // }
    return super.canActivate(context);
  }
}
