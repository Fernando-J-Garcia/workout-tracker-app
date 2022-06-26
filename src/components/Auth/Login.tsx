import React, { FormEvent, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    setLoading(true);
    e.preventDefault();
    await login(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setError("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });

    setLoading(false);
  }
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center">{loading ? "Loading..." : "Log in"}</h2>
            {!!error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" className="w-100 mt-3">
                Log in
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="text-center">
          <Link to={"/signup"}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}
