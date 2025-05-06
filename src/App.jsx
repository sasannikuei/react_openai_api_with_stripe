import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GenerateTablePage from "./components/GenerateTablePage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import PaymentHomepage from "./components/PaymentHomepage";
import PaymentPage from "./components/PaymentPage";
import SuccessPage from "./components/SuccessPage";
import FailurePage from "./components/FailurePage";


function App() {
  const privateRoutes = [
    { path: "/", element: <GenerateTablePage /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/paymenthomepage", element: <PaymentHomepage /> },
    { path: "/paymentpage", element: <PaymentPage /> },
    { path: "/paymentsuccess", element: <SuccessPage /> },
    { path: "/paymentfailure", element: <FailurePage /> },
  ];
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        {privateRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<PrivateRoute>{element}</PrivateRoute>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;





{/* <Route
path="/profile" element={
  <PrivateRoute>
    <ProfilePage />
  </PrivateRoute>}/>
<Route
path="/" element={
  <PrivateRoute>
    <GenerateTablePage />
  </PrivateRoute>} />
<Route
path="/paymenthomepage" element={
  <PrivateRoute>
    <PaymentHomepage />
  </PrivateRoute>} />
<Route
path="/paymentpage" element={
  <PrivateRoute>
    <PaymentPage />
  </PrivateRoute>} />
<Route
path="/paymentsuccess" element={
  <PrivateRoute>
    <SuccessPage />
  </PrivateRoute>} />
<Route
path="/paymentfailure" element={
  <PrivateRoute>
    <FailurePage />
  </PrivateRoute>} /> */}