import React, { useEffect, useState } from "react";
import { Button, Card, Col, Pagination, Row, Spinner } from "react-bootstrap";
import ExerciseCard from "../components/ExerciseCard";
import { getSvgFromCategory } from "../utilities/utilities";

export default function Browse() {
  const [exercises, setExercises] = useState(null);
  const [paginationPage, setPaginationPage] = useState(0);
  const [paginationCount, setPaginationCount] = useState(0);
  const [paginationItems, setPaginationItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    fetch("https://wger.de/api/v2/exercise/?language=2")
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);

        const paginationCount = Math.ceil(data.count / data.results.length);
        setPaginationCount(paginationCount);

        const paginationItems = [];
        for (let i = 0; i < paginationCount; i++) {
          const item = (
            <Pagination.Item key={i} active={i === paginationPage}>
              {i + 1}
            </Pagination.Item>
          );
          paginationItems.push(item);
        }
        setPaginationItems(paginationItems);
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
      <Pagination className="mt-2">{paginationItems}</Pagination>
    </div>
  );
}
