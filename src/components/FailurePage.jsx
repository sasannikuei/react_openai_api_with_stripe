import React from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import "./FailurePage.css";

const FailurePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!location.state?.fromPayment) {
    return <Navigate to="/PaymentPage" />;
  }
  return (
    <div className="failure-page">
      <h1>Payment Failed</h1>
      <p>Unfortunately, your payment could not be processed.</p>
      <button onClick={() => navigate("/PaymentHomepage")} className="return-button">
        Try Again
      </button>
    </div>
  );
};

export default FailurePage;
