import { doc, Timestamp, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, Button, Card, Modal, Spinner } from "react-bootstrap";
import { useUser } from "../contexts/UserContext";
import { database } from "../firebase";

interface ExerciseCardInterface {
  name: string;
  description: string;
  uuid: string;
  Svg: ({ width, height }: { width?: any; height?: any }) => JSX.Element;
  imageUrl: string;
}
export default function ExerciseCard({
  name,
  description,
  uuid,
  Svg,
  imageUrl,
}: ExerciseCardInterface) {
  const [showModal, setShowModal] = useState(false);
  const { userWorkouts } = useUser();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleClose() {
    setShowModal(false);
  }
  async function handleAdd(workout: any) {
    setLoading(true);
    const newExercise = {
      name: name,
      description: description,
      uuid: uuid,
      imageUrl: imageUrl || null,
    };

    const exercises: any[] = workout.exercises || [];
    exercises.push(newExercise);
    console.log(exercises);

    try {
      await updateDoc(doc(database, "workouts", workout.id), {
        exercises: exercises,
        updatedAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      setError(error as string);
    }

    setLoading(false);
    handleClose();
  }
  function workoutContainsExercise(workout: any): boolean {
    if (workout.exercises === undefined) return false;
    for (const exercise of workout.exercises) {
      if (exercise.uuid === uuid) return true;
    }
    return false;
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
          {loading ? (
            <div className="mt-2">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="ms-2">Loading...</span>
            </div>
          ) : (
            <>
              {!!error && <Alert>{error}</Alert>}
              {userWorkouts?.map((workout) => (
                <div key={workout.id}>
                  {workoutContainsExercise(workout) ? (
                    <Button
                      variant="outline-secondary"
                      disabled
                      className="mt-2 w-100"
                    >
                      <strong>{workout.name}</strong> already contains exercise
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleAdd(workout)}
                      variant="outline-primary"
                      className="mt-2 w-100"
                    >
                      {workout.name}
                    </Button>
                  )}
                </div>
              ))}
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
