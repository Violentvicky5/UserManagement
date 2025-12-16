import React from "react";
import { Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
const Home = () => <h2>Home Content</h2>;


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegistrationPage />}>
          <Route index element={<Home />} />
          <Route path="register" element={<RegistrationForm />} />
          <Route path="login" element={<LoginForm />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
