import React, { FormEvent, useState } from "react";
import { Alert, Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import WorkoutCard from "../components/WorkoutCard";
import workouts from "../data/workouts.json";
import { getSvgFromCategory } from "../utilities/utilities";
import exerciseCategories from "../data/exerciseCategories.json";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { database } from "../firebase";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();
  const { userWorkouts } = useUser();

  function handleClose() {
    setShowModal(false);
    setName("");
    setDescription("");
    setCategory("");
  }
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = await addDoc(collection(database, "workouts"), {
        name: name,
        description: description,
        category: category,
        userId: currentUser?.uid,
        exercises: [],
        createdAt: Timestamp.fromDate(new Date()),
        updateAt: Timestamp.fromDate(new Date()),
      });
      setError("");
    } catch (error) {
      setError(error as string);
    }
    setLoading(false);
    handleClose();
  }
  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <Row md={3} xs={2} lg={5} className="g-3">
          {userWorkouts?.map((workout, index) => (
            <Col key={workout.id}>
              <WorkoutCard
                name={workout.name}
                Svg={getSvgFromCategory(workout.category)}
                id={workout.id}
                description={workout.description}
                category={workout.category}
                exercises={workout.exercises}
              />
            </Col>
          ))}
          <Col>
            <Button
              variant="outline-primary"
              onClick={() => setShowModal(true)}
              className="w-100 h-100"
            >
              +Create Workout
            </Button>
          </Col>
        </Row>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Workout Information</Modal.Title>
          {!!error && <Alert variant="danger">{error}</Alert>}
        </Modal.Header>
        <Modal.Body>
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
            <Button type="submit" className="mt-4 w-100">
              {loading ? "Loading..." : "Add"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
