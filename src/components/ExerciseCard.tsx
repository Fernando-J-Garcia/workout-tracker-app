import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";

export default function ExerciseCard({ name, Svg, imageUrl }) {
  const [showModal, setShowModal] = useState(false);

  function handleClose() {
    setShowModal(false);
  }
  return (
    <>
      <Card className="center">
        {imageUrl ? (
          <img src={imageUrl} alt="exercise image" height={220} />
        ) : (
          <Svg />
        )}
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Button onClick={() => setShowModal(true)}>Add Workout</Button>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Where To Add Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className="me-2">Dummy Workout List</span>
          <Button>Add</Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
