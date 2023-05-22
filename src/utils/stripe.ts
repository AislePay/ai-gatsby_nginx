// services/stripe.js

const axios = require('axios'); // axios for making HTTP requests
const { STRIPE_SECRET_KEY } = process.env; // Stripe secret key from environment variables

const stripeBaseURL = 'https://api.stripe.com/v1/';

// axios instance for stripe API
const stripeAxiosInstance = axios.create({
  baseURL: stripeBaseURL,
  headers: {
    'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

// functions to interact with stripe API

// function to create payment intent
async function createPaymentIntent(amount, currency) {
  const response = await stripeAxiosInstance.post('payment_intents', `amount=${amount}&currency=${currency}`);
  return response.data;
}

// function to retrieve payment intent
async function retrievePaymentIntent(paymentIntentId) {
  const response = await stripeAxiosInstance.get(`payment_intents/${paymentIntentId}`);
  return response.data;
}

// function to confirm payment intent
async function confirmPaymentIntent(paymentIntentId, paymentMethodId) {
  const response = await stripeAxiosInstance.post(`payment_intents/${paymentIntentId}/confirm`, `payment_method=${paymentMethodId}`);
  return response.data;
}

module.exports = {
  createPaymentIntent,
  retrievePaymentIntent,
  confirmPaymentIntent
}
