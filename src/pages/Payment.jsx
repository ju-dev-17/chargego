import React from "react";

function Payment() {
  return (
    <div className="view" id="payments">
      <h1 style={{ textAlign: "center", fontWeight: 600 }}>Payment Methods</h1>
      <img src="/img/google-pay.png" alt="Google Pay" />
      <img src="/img/apple-pay.png" alt="Apple Pay" />
      <img src="/img/paypal.png" alt="Paypal" />
    </div>
  );
}

export default Payment;
