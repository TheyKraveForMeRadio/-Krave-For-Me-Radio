const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async function(event, context) {
  try {
    const { priceId } = JSON.parse(event.body || '{}');
    if (!priceId) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing priceId' }) };
    }
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: process.env.NEXT_PUBLIC_SITE_URL + '/success.html',
      cancel_url: process.env.NEXT_PUBLIC_SITE_URL + '/cancel.html',
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id, url: session.url }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
