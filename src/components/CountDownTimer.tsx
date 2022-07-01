import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Exercise } from "../Types/Exercise";

interface CountDownTimerInterface {
  currentExercise: Exercise;
  startNextExercise: () => void;
  resetTimerFlag: boolean;
  setResetTimerFlagToDefault: () => void;
  setAlertMessage: (message: string) => void;
}
interface Time {
  seconds: string;
  minutes: string;
  hours: string;
}
function FormatTime(timeInSeconds: string): Time {
  let length = parseInt(timeInSeconds);
  let hours = 0;
  let minutes = 0;
  let seconds = length;

  hours = Math.floor(length / 3600);
  length -= 3600 * hours;
  minutes = Math.floor(length / 60);
  length -= 60 * minutes;
  seconds = length;

  let hoursString = "0";
  let minutesString = "0";
  let secondsString = "0";

  if (hours > 9) hoursString = hours.toString();
  else hoursString += hours;
  if (minutes > 9) minutesString = minutes.toString();
  else minutesString += minutes;
  if (seconds > 9) secondsString = seconds.toString();
  else secondsString += seconds;
  return {
    seconds: secondsString,
    minutes: minutesString,
    hours: hoursString,
  };
}

export default function CountDownTimer({
  currentExercise,
  startNextExercise,
  resetTimerFlag,
  setResetTimerFlagToDefault,
  setAlertMessage,
}: CountDownTimerInterface) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState<number>(
    parseInt(currentExercise.repLengthInSeconds)
  );
  const [time, setTime] = useState<Time>(
    FormatTime(currentExercise.repLengthInSeconds)
  );
  const [timer, setTimer] = useState<NodeJS.Timer>();

  //Handle Timer Reset
  useEffect(() => {
    if (resetTimerFlag) {
      setAlertMessage("Workout finished!");
      setIsPlaying(false);
      setResetTimerFlagToDefault();
    }
  }, [resetTimerFlag]);

  useEffect(() => {
    if (isPlaying) {
      setTimer(setInterval(countDown, 1000));
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  function countDown() {
    setTimeInSeconds((prev) => {
      const newTimeInSeconds = prev - 1;

      if (newTimeInSeconds === 0) {
        startNextExercise();
      }

      setTime(FormatTime(newTimeInSeconds.toString()));
      return newTimeInSeconds;
    });
  }
  function startTimer() {
    setIsPlaying(true);
  }
  function stopTimer() {
    setIsPlaying(false);
  }
  if (!isPlaying)
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
        <h1>{`${time.minutes}:${time.seconds}`}</h1>
      </Button>
    );
}
