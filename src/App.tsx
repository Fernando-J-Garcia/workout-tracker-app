import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Progress from "./pages/Progress";
import Browse from "./pages/Browse";
import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./components/Auth/Signup";

function App() {
  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/browse"
          element={
            <PrivateRoute>
              <Browse />
            </PrivateRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <PrivateRoute>
              <Browse />
            </PrivateRoute>
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
