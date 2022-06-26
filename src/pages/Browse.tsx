import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import ExerciseCard from "../components/ExerciseCard";
import { getSvgFromCategory } from "../utilities/utilities";

export default function Browse() {
  const [exercises, setExercises] = useState(null);

  useEffect(() => {
    fetch("https://wger.de/api/v2/exerciseinfo/")
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
        console.log(data);
      });
  }, []);
  return (
    <div>
      <h1>Browse</h1>
      {exercises === null ? (
        <h4>Loading...</h4>
      ) : (
        <Row md={3} xs={2} lg={4} className="g-3">
          {exercises?.results?.map((exercise, index) => (
            <Col key={exercise.uuid}>
              <ExerciseCard
                name={exercise.name}
                imageUrl={exercise.images[0]?.image}
                Svg={getSvgFromCategory(exercise.category.name)}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
