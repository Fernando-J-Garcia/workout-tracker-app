import React from "react";
import { Button, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { currentUser, logout } = useAuth();
  function handleLogOut(e: React.MouseEvent<HTMLButtonElement>) {
    logout()
      .then((res) => {
        //
      })
      .catch((error) => {
        //
      });
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h1>Profile</h1>
          <strong>email: </strong> {currentUser?.email}
        </Card.Body>
      </Card>
      <div className="text-center mt-2">
        <Button variant="warning" onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
    </>
  );
}
