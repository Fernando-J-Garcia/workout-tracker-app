import {
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { FormEvent, useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import exerciseCategories from "../data/exerciseCategories.json";
import { database } from "../firebase";

interface EditWorkoutModalInterface {
  isVisible: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  workoutName: string;
  workoutId: string;
  workoutDescription: string;
  workoutCategory: string;
  workoutExercises: any[];
}
function getRepLengths(workoutExercises: any[]): any[] {
  const result: any = [];
  for (const exercise of workoutExercises) {
    if (exercise.repLengthInSeconds === undefined) {
      result.push("");
      continue;
    }
    result.push(exercise.repLengthInSeconds);
  }
  return result;
}
function getRepitionsList(workoutExercises: any[]): any[] {
  const result = [];
  for (const exercise of workoutExercises) {
    if (exercise.repetitions === undefined) {
      result.push("0");
      continue;
    }
    result.push(exercise.repetitions);
  }
  return result;
}
export default function EditWorkoutModal({
  isVisible,
  handleClose,
  handleOpen,
  workoutName,
  workoutId,
  workoutDescription,
  workoutCategory,
  workoutExercises,
}: EditWorkoutModalInterface) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(workoutName);
  const [description, setDescription] = useState(workoutDescription);
  const [category, setCategory] = useState(workoutCategory);
  const [repLengths, setRepLengths] = useState<Array<any>>(
    getRepLengths(workoutExercises)
  );
  const [repitionsList, setRepitionsList] = useState<Array<any>>(
    getRepitionsList(workoutExercises)
  );
  const [error, setError] = useState("");
  const [showWarningModal, setShowWarningModal] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const exercises: any = [];
    workoutExercises.forEach((exercise, index) => {
      exercise.repLengthInSeconds = repLengths[index] || "";
      exercise.repetitions = repitionsList[index];
      exercises.push(exercise);
    });
    try {
      await updateDoc(doc(database, "workouts", workoutId), {
        name: name,
        description: description,
        category: category,
        exercises: exercises,
        updatedAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      setError(error as string);
    }
    setLoading(false);
    handleClose();
  }

  function handleFormReset() {
    setName(workoutName);
    setDescription(workoutDescription);
    setCategory(workoutCategory);
    setRepLengths(getRepLengths(workoutExercises));
    setRepitionsList(getRepitionsList(workoutExercises));
  }
  function handleCloseMainModal() {
    handleClose();
    handleFormReset();
  }
  //Close the main modal and show the warning modal
  function handleShowWarningModal() {
    setShowWarningModal(true);
    handleClose();
  }
  //Close the warning modal and open the main modal
  function handleCloseWarningModal() {
    setShowWarningModal(false);
    handleOpen();
  }
  async function handleDelete() {
    console.log("deleted card");
    setLoading(true);
    try {
      await deleteDoc(doc(database, "workouts", workoutId));
    } catch (error) {
      setError(error as string);
    }
    setLoading(false);
  }

  return (
    <>
      <Modal show={isVisible} onHide={handleCloseMainModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Edit Workout</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!error && <Alert>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" selected disabled hidden>
                  Select a category
                </option>
                {exerciseCategories.map((category, idx) => {
                  return (
                    <option key={idx} value={category}>
                      {category}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            {workoutExercises.map((exercise, index) => (
              <Form.Group key={exercise.uuid}>
                <h5 className="mt-2">{exercise.name}</h5>
                <Form.Label>Time in seconds</Form.Label>
                <Form.Control
                  type="number"
                  step={30}
                  placeholder="exercise time in seconds"
                  value={repLengths[index]}
                  onChange={(e) =>
                    setRepLengths((prev) => {
                      const result = prev;
                      result.splice(index, 1, e.target.value);
                      return [...result];
                    })
                  }
                />
                <Form.Label>Repetitions</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="repitions"
                  value={repitionsList[index]}
                  onChange={(e) =>
                    setRepitionsList((prev) => {
                      const result = prev;
                      result.splice(index, 1, e.target.value);
                      return [...result];
                    })
                  }
                />
              </Form.Group>
            ))}
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
              <div className="mt-4 d-flex flex-row gap-1 w-50">
                <Button type="submit" variant="primary" className="flex-fill">
                  {loading ? "Saving..." : "Save"}
                </Button>
                <Button
                  variant="danger"
                  className="flex-fill"
                  onClick={handleShowWarningModal}
                >
                  Delete!
                </Button>
              </div>
            )}
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showWarningModal} onHide={handleCloseWarningModal}>
        <Modal.Header closeButton>
          <Modal.Title>Are You sure want to delete this workout?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!error && <Alert>{error}</Alert>}
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
              <Button variant="success" onClick={handleDelete}>
                Yes
              </Button>
              <Button
                variant="danger"
                onClick={handleCloseWarningModal}
                className="ms-2"
              >
                No
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
