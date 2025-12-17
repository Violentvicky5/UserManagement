import { Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
const Home = () => <h2>Home Content</h2>;

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RegistrationPage />}>
        <Route index element={<Home />} />
        <Route path="register" element={<RegistrationForm />} />
        <Route path="login" element={<LoginForm />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>
      </Route>
<Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />


    </Routes>
  );
};

export default App;
