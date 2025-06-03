import { Module } from '@nestjs/common';
// import { StripePaymentProvider } from './providers/stripe.provider';
// import { OrangeMoneyPaymentProvider } from './providers/orangemoney.provider';
import { PaymentProcessingService } from './payment-processing.service';

@Module({
  providers: [
    PaymentProcessingService,
    // { provide: 'StripePaymentProvider', useClass: StripePaymentProvider },
    // { provide: 'OrangeMoneyPaymentProvider', useClass: OrangeMoneyPaymentProvider },
    // Add other providers
  ],
  exports: [PaymentProcessingService],
})
export class PaymentsModule {}
