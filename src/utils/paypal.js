const { PayPalClient, OrdersCreateRequest, OrdersCaptureRequest } = require('@paypal/checkout-server-sdk');
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

// Setting up and Returns PayPal HTTP client instance with environment which has access
// credentials context. This can be used invoke PayPal API's provided the credentials are valid
function payPalClient() {
  const environment = new paypal.core.SandboxEnvironment(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET);
  return new PayPalClient(environment);
}

// function to create order
async function createOrder(debug=false) {
  const request = new OrdersCreateRequest();
  request.prefer("return=representation");
  // request body parameters
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: '10.00'
      }
    }]
  });
  
  let response = await payPalClient().execute(request);
  
  if (debug){
    console.log("Status Code: " + response.statusCode);
    console.log("Status: " + response.result.status);
    console.log("Order ID: " + response.result.id);
    console.log("Intent: " + response.result.intent);
    console.log("Links:");
    response.result.links.forEach((item, index) => {
      let rel = item.rel;
      let href = item.href;
      let method = item.method;
      console.log("\t" + rel + ": " + href + "\tCall Type: " + method);
    });
    console.log("Total Amount: " + response.result.purchase_units[0].amount.currency_code + " " + response.result.purchase_units[0].amount.value);
  }

  // return the order ID
  return response.result.id;
}

// function to capture order
async function captureOrder(orderId, debug=false) {
  const request = new OrdersCaptureRequest(orderId);
  request.requestBody({});
  
  let response = await payPalClient().execute(request);
  
  if (debug){
    console.log("Status Code: " + response.statusCode);
    console.log("Status: " + response.result.status);
    console.log("Capture ID: " + response.result.purchase_units[0].payments.captures[0].id);
    console.log("Transaction Fee: " + response.result.purchase_units[0].payments.captures[0].seller_receivable_breakdown.paypal_fee.value + " " + response.result.purchase_units[0].payments.captures[0].seller_receivable_breakdown.paypal_fee.currency_code);
    console.log("Net Amount: " + response.result.purchase_units[0].payments.captures[0].seller_receivable_breakdown.net_amount.value + " " + response.result.purchase_units[0].payments.captures[0].seller_receivable_breakdown.net_amount.currency_code);
  }

  // return the capture ID
  return response.result.purchase_units[0].payments.captures[0].id;
}

module.exports = {
  createOrder,
  captureOrder
}