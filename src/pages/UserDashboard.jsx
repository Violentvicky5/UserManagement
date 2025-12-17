import React from "react";
import { Container, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      // Remove access token
      sessionStorage.removeItem("accessToken");

      // Redirect to login
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <Container className="mt-5">
      <Alert variant="success">
        <h4>Welcome 🎉</h4>
        <p>You have successfully logged in.</p>
      </Alert>

      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default UserDashboard;
