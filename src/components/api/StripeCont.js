import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
const PUBLIC_KEY = 'pk_test_51LMHmvAw2oupCOB0ratOnIwxkVfiSrXcoIgacKLEABWow4zf9DYZyvOCIRCGe1kIfRV5cxFIlnBFuXyeBuB0nUbR00uyKu279V';
const stripeToPromise = loadStripe(PUBLIC_KEY);

export default function StripeCont() {  
  return (
    <Elements stripe={stripeToPromise}>
        <PaymentForm />
    </Elements>
  )
}

