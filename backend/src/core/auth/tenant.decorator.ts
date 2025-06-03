import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TenantId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    // Assuming tenantId is part of the JWT payload or determined by a middleware
    // For JWT, it would be request.user.universityId (after JwtAuthGuard)
    if (request.user && request.user.universityId) {
      return request.user.universityId;
    }
    // Fallback or error if tenantId cannot be determined
    // This needs robust implementation (e.g., from subdomain, header)
    // For now, we rely on it being in the JWT user object.
    return null;
  },
);
