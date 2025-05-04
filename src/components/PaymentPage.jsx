import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51Qh58AA7yRXjz5gFjtJGYM3GcVGiCFdVx4Dxmiz8NdM85LPgiw4A5KIr7codSzOyMK6soVQH1U7pBelNv51BxTd4005F6qZeE6"
); // Replace with your Stripe publishable key

const PaymentPage = () => {
  const location = useLocation();
  const { clientSecret } = location.state || {};
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (clientSecret) {
      setOptions({
        clientSecret,
        appearance: {
          theme: "stripe",
        },
      });
    }
  }, [clientSecret]);

  return (
    <div className="container">
      <h1>Complete Your Payment</h1>
      {options ? (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm />
        </Elements>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
};

export default PaymentPage;
