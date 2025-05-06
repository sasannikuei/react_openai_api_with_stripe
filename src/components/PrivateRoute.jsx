import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

function PrivateRoute({ children }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setIsAuthorized(false);
      setAuthChecked(true);
      return;
    }

    try {
      const { exp } = jwtDecode(token);
      const isExpired = Date.now() >= exp * 1000;

      setIsAuthorized(!isExpired);
    } catch (err) {
      setIsAuthorized(false);
    }

    setAuthChecked(true);
  }, []);

  if (!authChecked) {

    return null;
  }

  return isAuthorized ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;




// import { Navigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// function PrivateRoute({ children }) {
//   const token = localStorage.getItem("access_token");

//   if (!token) return <Navigate to="/login" replace />;

//   try {
//     const { exp } = jwtDecode(token);
//     const isExpired = Date.now() >= exp * 1000;
//     return isExpired ? <Navigate to="/login" /> : children;
//   } catch (err) {
//     return <Navigate to="/login" replace />;
//   }
// }

// export default PrivateRoute;


