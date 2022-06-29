import React, { useState } from "react";
import { Button } from "react-bootstrap";

export default function CountDownTimer() {
  const [isTimerPaused, setIsTimerPaused] = useState(true);
  function startTimer() {
    setIsTimerPaused(false);
  }
  function stopTimer() {
    setIsTimerPaused(true);
  }
  if (isTimerPaused)
    return (
      <Button
        className="rounded-circle border border-2 border-primary"
        variant="outline-primary"
        style={{ width: "200px", height: "200px" }}
        onClick={startTimer}
      >
        <h1>Start</h1>
      </Button>
    );
  else
    return (
      <Button
        className="rounded-circle border border-2 border-primary"
        variant="outline-primary"
        style={{ width: "200px", height: "200px" }}
        onClick={stopTimer}
      >
        <h1>00:00</h1>
      </Button>
    );
}
