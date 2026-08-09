import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
});

async function registerWebhook() {
  const appUrl = process.argv[2];
  
  if (!appUrl) {
    console.error('Please provide your app URL as an argument');
    console.error('Usage: npx tsx scripts/register-webhook.ts https://your-app-url.com');
    process.exit(1);
  }

  const webhookUrl = `${appUrl}/api/stripe/webhook`;
  
  console.log(`Registering webhook at: ${webhookUrl}`);

  try {
    const existingWebhooks = await stripe.webhookEndpoints.list({ limit: 100 });
    const existing = existingWebhooks.data.find(w => w.url === webhookUrl);
    
    if (existing) {
      console.log('Webhook already exists:', existing.id);
      console.log('Webhook secret:', existing.secret || '(hidden - use dashboard to view)');
      return;
    }

    const webhook = await stripe.webhookEndpoints.create({
      url: webhookUrl,
      enabled_events: [
        'checkout.session.completed',
        'customer.subscription.created',
        'customer.subscription.updated',
        'customer.subscription.deleted',
        'invoice.payment_failed',
      ],
    });

    console.log('\n=== Webhook Created Successfully ===');
    console.log('Webhook ID:', webhook.id);
    console.log('Webhook URL:', webhook.url);
    console.log('Webhook Secret:', webhook.secret);
    console.log('\nAdd this to your .env file:');
    console.log(`STRIPE_WEBHOOK_SECRET=${webhook.secret}`);
  } catch (error) {
    console.error('Failed to register webhook:', error);
    process.exit(1);
  }
}

registerWebhook();
