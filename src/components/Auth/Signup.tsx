import React, { FormEvent, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password != passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }
    //Do stuff
  }
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center">Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="email" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" />
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
