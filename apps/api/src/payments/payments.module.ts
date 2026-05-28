import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { XenditService } from './xendit.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, XenditService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
