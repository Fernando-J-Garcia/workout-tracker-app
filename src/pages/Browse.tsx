import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import ExerciseCard from "../components/ExerciseCard";
import { getSvgFromCategory } from "../utilities/utilities";

export default function Browse() {
  const [exercises, setExercises] = useState(null);

  useEffect(() => {
    fetch("https://wger.de/api/v2/exercise/?language=2")
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
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="ms-2">Loading...</span>
        </>
      ) : (
        <Row md={3} xs={2} lg={4} className="g-3">
          {exercises?.results?.map((exercise, index) => (
            <Col key={exercise.uuid}>
              <ExerciseCard
                name={exercise.name}
                description={exercise.description}
                imageUrl={(exercise.images && exercise.images[0]?.image) || ""}
                uuid={exercise.uuid}
                Svg={getSvgFromCategory(
                  exercise.category.name || exercise.category
                )}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
