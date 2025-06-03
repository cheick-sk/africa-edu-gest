export interface PaymentIntentArgs {
  amount: number;
  currency: string;
  universityId: string;
  userId: string;
  metadata?: Record<string, any>;
}

export interface PaymentIntentResult {
  clientSecret?: string; // For client-side confirmation (e.g., Stripe)
  paymentId: string; // Our internal payment ID
  providerTransactionId?: string;
  status: 'requires_action' | 'succeeded' | 'failed' | 'pending';
  nextActionUrl?: string; // For redirection (e.g., Mobile Money)
}

export interface ProcessWebhookArgs {
  payload: any; // Raw webhook payload
  signature?: string; // For verifying webhook signature (e.g., Stripe)
}

export interface WebhookResult {
  success: boolean;
  message?: string;
  invoiceId?: string; // If an invoice was updated
  subscriptionId?: string; // If a subscription was updated
  paymentStatus?: string;
}

export interface IPaymentProvider {
  createPaymentIntent(args: PaymentIntentArgs): Promise<PaymentIntentResult>;
  handleWebhook(args: ProcessWebhookArgs): Promise<WebhookResult>;
  // Add other common methods: refund, getTransactionStatus, etc.
}
