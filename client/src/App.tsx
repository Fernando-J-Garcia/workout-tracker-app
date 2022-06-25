import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Progress from "./pages/Progress";
import Browse from "./pages/Browse";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </Container>
  );
}

export default App;
