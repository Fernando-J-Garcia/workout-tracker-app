import React from "react";
import { Container } from "react-bootstrap";
import ConstructionMan from "../components/svgs/ConstructionMan";

export default function Progress() {
  return (
    <div>
      <h1>Work In Progress...</h1>
      <Container>
        <ConstructionMan />
      </Container>
    </div>
  );
}
