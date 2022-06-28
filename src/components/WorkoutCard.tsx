import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { ThreeDots } from "react-bootstrap-icons";
import EditWorkoutModal from "./EditWorkoutModal";

interface WorkoutCardInterface {
  Svg: ({ width, height }: { width?: any; height?: any }) => JSX.Element;
  name: string;
  id: string;
  description: string;
  category: string;
  exercises: any[];
}
export default function WorkoutCard({
  Svg,
  name,
  id,
  description,
  category,
  exercises,
}: WorkoutCardInterface) {
  const [showStartWorkoutModal, setShowStartWorkoutModal] = useState(false);
  const [showEditWorkoutModal, setShowEditWorkoutModal] = useState(false);

  function handleClose() {
    setShowStartWorkoutModal(false);
  }
  function handleEditWorkoutModalClose() {
    setShowEditWorkoutModal(false);
  }
  return (
    <>
      <Card className="center">
        {<Svg />}
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Button onClick={() => setShowStartWorkoutModal(true)}>
            Start Workout!
          </Button>
          <Button
            variant="outline-primary"
            className="ms-3"
            onClick={() => setShowEditWorkoutModal(true)}
          >
            <ThreeDots />
          </Button>
        </Card.Body>
      </Card>
      <Modal show={showStartWorkoutModal} onHide={handleClose}></Modal>
      <EditWorkoutModal
        isVisible={showEditWorkoutModal}
        handleOpen={() => setShowEditWorkoutModal(true)}
        handleClose={handleEditWorkoutModalClose}
        workoutName={name}
        workoutId={id}
        workoutCategory={category}
        workoutDescription={description}
        workoutExercises={exercises}
      />
    </>
  );
}
