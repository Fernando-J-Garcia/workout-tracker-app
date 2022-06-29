import React, { useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { getSvgFromCategory } from "../utilities/utilities";
import CountDownTimer from "./CountDownTimer";

interface StartWorkoutModalInterface {
  isVisible: boolean;
  handleClose: () => void;
  workoutName: string;
  workoutCategory: string;
  workoutDescription: string;
  workoutExercises: any[];
}
export default function StartWorkoutModal({
  isVisible,
  handleClose,
  workoutName,
  workoutCategory,
  workoutDescription,
  workoutExercises,
}: StartWorkoutModalInterface) {
  const [currrentExercise, setCurrentExercise] = useState(workoutExercises[0]);
  const Svg = getSvgFromCategory(currrentExercise.category);
  return (
    <Modal show={isVisible} onHide={handleClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>
          <h1>{workoutName}</h1>
          Get ready for {currrentExercise.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="w-50">
          {currrentExercise.imageUrl ? (
            <img src={currrentExercise.imageUrl} alt="exercise image" />
          ) : (
            <Svg />
          )}
        </Container>
        <div className="w-100 d-flex justify-content-center">
          <CountDownTimer currentExercise={currrentExercise} />
        </div>
      </Modal.Body>
    </Modal>
  );
}
