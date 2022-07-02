import { useState } from "react";
import "./App.css";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Progress from "./pages/Progress";
import Browse from "./pages/Browse";
import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./components/Auth/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Container>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Navigate to="/dashboard" />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
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
                  <Progress />
                </PrivateRoute>
              }
            />
          </Routes>
        </Container>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
