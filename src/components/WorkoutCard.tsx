import React, { useState } from "react";
import { Button, Card, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ThreeDots } from "react-bootstrap-icons";
import EditWorkoutModal from "./EditWorkoutModal";
import StartWorkoutModal from "./StartWorkoutModal";

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

  function handleStartWorkoutModalClose() {
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
          <div className="d-flex flex-row w-100 dashboard-workout-card">
            {exercises.length === 0 ? (
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">
                    workout contains no exercises! Go add one from the browse
                    menu.
                  </Tooltip>
                }
              >
                <span className="d-inline-block">
                  <Button disabled style={{ pointerEvents: "none" }}>
                    Start Workout
                  </Button>
                </span>
              </OverlayTrigger>
            ) : (
              <Button onClick={() => setShowStartWorkoutModal(true)}>
                Start Workout!
              </Button>
            )}
            <Button
              variant="outline-primary"
              onClick={() => setShowEditWorkoutModal(true)}
            >
              <ThreeDots />
            </Button>
          </div>
        </Card.Body>
      </Card>
      <StartWorkoutModal
        isVisible={showStartWorkoutModal}
        handleClose={handleStartWorkoutModalClose}
        workoutName={name}
        workoutCategory={category}
        workoutDescription={description}
        workoutExercises={exercises}
      />
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
