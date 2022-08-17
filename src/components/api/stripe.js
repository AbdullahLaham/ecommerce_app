// this code from stripe docs  'https://stripe.com/docs/checkout/quickstart'
const stripe = require('stripe')(process.env.SECRET_KEY);

export default async function handler(req, res) {
    console.log('req?.body?.cartItems', req?.body?.cartItems)
  if (req.method === 'POST') {
    try {
        // parameters
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {shipping_rate: 'shr_1LSfIkAw2oupCOB0nKJFpJI1'},
                {shipping_rate: 'shr_1LSfHHAw2oupCOB0Q5SBp3Uv'},
            ],
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: '{{PRICE_ID}}',
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
          }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}