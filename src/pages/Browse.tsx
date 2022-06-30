import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import ExerciseCard from "../components/ExerciseCard";
import PaginationComponent from "../components/Pagination";
import { getSvgFromCategory } from "../utilities/utilities";

export default function Browse() {
  const [exercises, setExercises] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const POST_PER_PAGE = 20;

  useEffect(() => {
    setLoading(true);
    const offset = currentPage * POST_PER_PAGE;
    fetch(
      `https://wger.de/api/v2/exercise/?language=2&limit=${POST_PER_PAGE}&offset=${offset}`
    )
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
        console.log(data);
        setLoading(false);
      });
  }, []);

  function paginate(pageNumber: number) {
    setCurrentPage(pageNumber);
    setLoading(true);
    const offset = pageNumber * POST_PER_PAGE;

    const nextPageUrl = `https://wger.de/api/v2/exercise/?language=2&limit=${POST_PER_PAGE}&offset=${offset}`;
    fetch(nextPageUrl)
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
        setLoading(false);
        console.log(data);
      });
  }
  return (
    <div>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <h1>Browse</h1>
        <Form.Control
          type="text"
          placeholder="Search..."
          className="w-50 h-50"
        />
      </div>
      {loading ? (
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
        <>
          <Row md={3} xs={2} lg={4} className="g-3">
            {exercises?.results?.map((exercise, index) => (
              <Col key={exercise.uuid}>
                <ExerciseCard
                  name={exercise.name}
                  description={exercise.description}
                  imageUrl={
                    (exercise.images && exercise.images[0]?.image) || ""
                  }
                  uuid={exercise.uuid}
                  Svg={getSvgFromCategory(
                    exercise.category.name || exercise.category
                  )}
                />
              </Col>
            ))}
          </Row>
          <PaginationComponent
            postsPerPage={exercises?.results.length}
            totalPosts={exercises?.count}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}
