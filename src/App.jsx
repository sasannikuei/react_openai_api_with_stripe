import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GenerateTablePage from "./components/GenerateTablePage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import PaymentHomepage from "./components/PaymentHomepage";
import PaymentPage from "./components/PaymentPage";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<GenerateTablePage />} />
        <Route path="/PaymentHomepage" element={<PaymentHomepage />} />
        <Route path="/PaymentPage" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
