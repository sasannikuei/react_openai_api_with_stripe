import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "./AxiosInstance";


const PaymentHomepage = () => {
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("USD"); // Default currency
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");


  const handlePayClick = async (email, amount) => {
    setLoading(true);

    try {
      const response = await AxiosInstance.post("/create-payment-intent/", {
        amount: amount,
        currency: currency,
        user_email: email,
      });
      const clientSecret = response.data.clientSecret;
      if (clientSecret) {
        navigate("/paymentpage", { state: { clientSecret } });
      } else {
        alert("Error creating payment intent.");
      }
    } catch (error) {
      console.error("Error creating payment intent:", error.response?.data || error.message);
      alert("Error creating payment intent.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>React Stripe Payment</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!email.trim() || !amount || parseFloat(amount) <= 0) {
            alert("Please enter a valid email and amount.");
            return;
          }          

          handlePayClick(email, amount);
        }}
      >
        <p>
          <strong>Amount:</strong>
          <input
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            value={amount}
            name="amount"
            id="amount"
            type="number"
          />
        </p>
        <label htmlFor="email">Enter your email:</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          name="email"
          id="email"
          type="email"
        />
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Pay"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentHomepage;

