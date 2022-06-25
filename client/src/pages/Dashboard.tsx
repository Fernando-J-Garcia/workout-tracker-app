import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import WorkoutCard from "../components/WorkoutCard";
import workouts from "../data/workouts.json";
import { getSvgFromCategory } from "../utilities/utilities";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Row md={3} xs={2} lg={4} className="g-3">
        {workouts.map((exercise, index) => (
          <Col key={exercise}>
            <WorkoutCard
              name={exercise.name}
              Svg={getSvgFromCategory(exercise.category)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
