import React from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import "./SuccessPage.css";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!location.state?.fromPayment) {
    return <Navigate to="/paymentpage" />;
  }
  return (
    <div className="success-page">
      <h1>Payment Successful</h1>
      <p>Thank you for your payment. Your transaction was successful.</p>
      <button onClick={() => navigate("/profile")} className="return-button">
        Return to Home
      </button>
    </div>
  );
};

export default SuccessPage;
