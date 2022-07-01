import React, { useEffect, useRef, useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import ExerciseCard from "../components/ExerciseCard";
import PaginationComponent from "../components/Pagination";
import { getSvgFromCategory } from "../utilities/utilities";

export default function Browse() {
  const [exercises, setExercises] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const timeSinceLastSearch = useRef<Date>(new Date());
  const [loading, setLoading] = useState(true);
  const POST_PER_PAGE = 20;

  //API CALLS --------------------------
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

  function fetchFirstPage() {
    fetch(
      `https://wger.de/api/v2/exercise/?language=2&limit=${POST_PER_PAGE}&offset=0`
    )
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
        setLoading(false);
      });
  }
  async function fetchSearchResults() {
    setLoading(true);
    const searchUrl = `https://wger.de/api/v2/exercise/search/?term=${search}&limit=${POST_PER_PAGE}`;
    await fetch(searchUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let exercises = { results: [...data.suggestions] };
        exercises.results = exercises.results.map((d) => d.data);
        console.log(exercises);
        setExercises(exercises);
      });
    setLoading(false);
  }
  //END API CALLS --------------------------

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    console.log(e.key);
    if (e.key === "Enter") {
      //If the search is empty then just fetch the first page.
      console.log(search);
      if (search === "") {
        fetchFirstPage();
        return;
      }
      fetchSearchResults();
    }
  }
  return (
    <div>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <h1>Browse</h1>
        {/*Search Bar */}
        <Form.Control
          type="text"
          placeholder="Search..."
          className="w-50 h-50"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onKeyDown={handleKeyDown}
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
          {exercises.results.length === 0 && (
            <h2>No results found for "{search}"</h2>
          )}
          <Row md={3} xs={2} lg={4} className="g-3">
            {exercises?.results?.map((exercise: any, index: number) => (
              <Col key={exercise.uuid || exercise.id}>
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
