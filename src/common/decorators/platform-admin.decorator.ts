// src/common/decorators/platform-admin.decorator.ts
import { applyDecorators, UseGuards } from '@nestjs/common';
import { PlatformAdminGuard } from '../guards/platform-admin.guard';

/**
 * Decorator to restrict access to Platform Admin (SUPER_ADMIN role) only.
 * Must be used after JWT authentication.
 */
export function PlatformAdmin() {
  return applyDecorators(UseGuards(PlatformAdminGuard));
}
