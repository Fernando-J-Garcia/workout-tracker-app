import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";

export default function WorkoutCard({ name, Svg }) {
  const [showModal, setShowModal] = useState(false);

  function handleClose() {
    setShowModal(false);
  }
  return (
    <>
      <Card className="center">
        {<Svg />}
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Button onClick={() => setShowModal(true)}>Start Workout!</Button>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleClose}></Modal>
    </>
  );
}
