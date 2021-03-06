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
  const [currentSet, setCurrentSet] = useState(0);
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
  const isStartingNewExercise =
    count + 1 !== workoutExercises.length &&
    currentSet + 1 === parseInt(currrentExercise.repetitions);
  return (
    <Modal show={isVisible} onHide={handleClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>
          {isBreakTime ? (
            <h1>
              Break time!
              {isStartingNewExercise &&
                ` Up Next - ${workoutExercises[count + 1].name}`}
            </h1>
          ) : (
            <h1>{`${currrentExercise.name} [${currentSet + 1}/${parseInt(
              currrentExercise.repetitions
            )}]`}</h1>
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
        <Container className="w-100 d-flex justify-content-center start-workout-modal-image">
          {currrentExercise.imageUrl ? (
            <img src={currrentExercise.imageUrl} alt="exercise image" />
          ) : (
            <Svg width="45%" />
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
            updateCurrentSet={(value) => setCurrentSet(value)}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}
