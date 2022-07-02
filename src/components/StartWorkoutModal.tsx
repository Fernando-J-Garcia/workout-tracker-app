import React, { useState } from "react";
import { Alert, Button, Container, Modal } from "react-bootstrap";
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
  if (workoutExercises.length === 0) return null;
  const [count, setCount] = useState(0);
  const [resetTimerFlag, setResetTimerFlag] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [currrentExercise, setCurrentExercise] = useState(
    workoutExercises[count]
  );
  const [alertMessage, setAlertMessage] = useState("");

  const Svg = getSvgFromCategory(currrentExercise.category);

  function startNextExercise() {
    setCount((prev) => {
      const newCount = prev + 1;

      if (newCount >= workoutExercises.length) {
        setResetTimerFlag(true);
        setCurrentExercise(workoutExercises[0]);
        return 0;
      }
      setCurrentExercise(workoutExercises[newCount]);
      return newCount;
    });
  }
  return (
    <Modal show={isVisible} onHide={handleClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>
          {isBreakTime ? (
            <h1>Break time</h1>
          ) : (
            <h1>Get ready for {currrentExercise.name}</h1>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!!alertMessage && (
          <Alert
            variant="success"
            dismissible
            onClose={() => setAlertMessage("")}
          >
            {alertMessage}
          </Alert>
        )}
        <Container className="w-50">
          {currrentExercise.imageUrl ? (
            <img src={currrentExercise.imageUrl} alt="exercise image" />
          ) : (
            <Svg />
          )}
        </Container>
        <div className="w-100 d-flex justify-content-center">
          <CountDownTimer
            currentExercise={currrentExercise}
            startNextExercise={startNextExercise}
            resetTimerFlag={resetTimerFlag}
            isBreakTime={isBreakTime}
            setIsBreakTime={(value) => setIsBreakTime(value)}
            setResetTimerFlagToDefault={() => setResetTimerFlag(false)}
            setAlertMessage={(message) => setAlertMessage(message)}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}
