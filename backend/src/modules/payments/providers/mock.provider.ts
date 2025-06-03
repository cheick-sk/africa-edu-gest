import { IPaymentProvider, PaymentIntentArgs, PaymentIntentResult, ProcessWebhookArgs, WebhookResult } from '../payment-provider.interface';
import { Injectable } from '@nestjs/common';

@Injectable() // Make sure it's injectable if it's going to be a provider in NestJS DI
export class MockPaymentProvider implements IPaymentProvider {
  async createPaymentIntent(args: PaymentIntentArgs): Promise<PaymentIntentResult> {
    console.log('MockPaymentProvider: createPaymentIntent called with', args);
    const mockPaymentId = `mock_pi_${Date.now()}`;
    // Simulate a redirect for some payment methods or direct success for others
    if (args.metadata?.simulateRedirect) {
      return {
        paymentId: mockPaymentId,
        status: 'requires_action',
        nextActionUrl: `https://example.com/mock_payment_redirect/${mockPaymentId}`,
      };
    }
    return {
      paymentId: mockPaymentId,
      providerTransactionId: `mock_txn_${Date.now()}`,
      status: 'succeeded',
    };
  }

  async handleWebhook(args: ProcessWebhookArgs): Promise<WebhookResult> {
    console.log('MockPaymentProvider: handleWebhook called with payload', args.payload);
    // Simulate webhook processing
    const eventType = args.payload.event_type;
    if (eventType === 'payment_succeeded') {
      return {
        success: true,
        message: 'Webhook processed successfully (mock).',
        invoiceId: args.payload.data?.invoice_id,
        subscriptionId: args.payload.data?.subscription_id,
        paymentStatus: 'succeeded',
      };
    }
    return { success: false, message: 'Unhandled event type (mock).' };
  }
}
