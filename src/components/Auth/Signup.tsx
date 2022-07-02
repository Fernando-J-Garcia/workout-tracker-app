import { AuthErrorCodes } from "firebase/auth";
import React, { FormEvent, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);

    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    await signUp(email, password)
      .then((userCredential) => {
        console.log("Successfully signed up");
        setError("");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });

    setLoading(false);
  }
  return (
    <div
      className="d-flex justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100 mt-4" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center">
              {loading ? "Loading..." : "Sign Up"}
            </h2>
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
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" className="w-100 mt-3">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="text-center">
          <Link to={"/login"}>log in</Link>
        </div>
      </div>
    </div>
  );
}
