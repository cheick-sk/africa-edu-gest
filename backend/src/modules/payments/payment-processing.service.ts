import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IPaymentProvider, PaymentIntentArgs, PaymentIntentResult, ProcessWebhookArgs, WebhookResult } from './payment-provider.interface';
// Assume SubscriptionsService and InvoicesService exist to update statuses
// import { SubscriptionsService } from '../subscriptions/subscriptions.service';
// import { InvoicesService } from '../invoices/invoices.service';

@Injectable()
export class PaymentProcessingService {
  private providers: Map<string, IPaymentProvider> = new Map();

  constructor(
    // Example of injecting specific providers - this needs proper registration in PaymentsModule
    // @Inject('StripePaymentProvider') private stripeProvider: IPaymentProvider,
    // @Inject('OrangeMoneyPaymentProvider') private orangeMoneyProvider: IPaymentProvider,
    // private subscriptionsService: SubscriptionsService,
    // private invoicesService: InvoicesService,
  ) {
    // this.registerProvider('stripe', this.stripeProvider);
    // this.registerProvider('orange_money', this.orangeMoneyProvider);
    // In a real app, providers would be dynamically loaded or configured
  }

  registerProvider(name: string, provider: IPaymentProvider) {
    this.providers.set(name, provider);
  }

  getProvider(name: string): IPaymentProvider {
    const provider = this.providers.get(name);
    if (!provider) {
      throw new NotFoundException(`Payment provider "${name}" not found.`);
    }
    return provider;
  }

  async initiatePayment(providerName: string, args: PaymentIntentArgs): Promise<PaymentIntentResult> {
    const provider = this.getProvider(providerName);
    // Here, you might create a preliminary payment record in your `app_payments` table with 'pending' status
    const result = await provider.createPaymentIntent(args);
    // Update your payment record with providerTransactionId and status
    return result;
  }

  async handleIncomingWebhook(providerName: string, args: ProcessWebhookArgs): Promise<WebhookResult> {
    const provider = this.getProvider(providerName);
    const processingResult = await provider.handleWebhook(args);

    // Based on processingResult, update your app_payments, app_invoices, app_subscriptions tables
    // For example:
    // if (processingResult.success && processingResult.invoiceId && processingResult.paymentStatus === 'succeeded') {
    //   await this.invoicesService.markAsPaid(processingResult.invoiceId);
    // }
    // if (processingResult.success && processingResult.subscriptionId && processingResult.paymentStatus === 'succeeded') {
    //   await this.subscriptionsService.activateSubscription(processingResult.subscriptionId);
    // }
    return processingResult;
  }
}
