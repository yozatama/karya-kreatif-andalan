import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  private readonly logger = new Logger('AuditLog');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, user } = request;
    const userId = user?.id || 'anonymous';
    const timestamp = new Date().toISOString();

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `[${timestamp}] ${method} ${url} - User: ${userId} - Status: Success`,
        );
      }),
    );
  }
}
