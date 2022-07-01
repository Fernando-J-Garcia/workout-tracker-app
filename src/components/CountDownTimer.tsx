import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import useAudio from "../Hooks/useAudio";
import { Exercise } from "../Types/Exercise";

interface CountDownTimerInterface {
  currentExercise: Exercise;
  startNextExercise: () => void;
  resetTimerFlag: boolean;
  isBreakTime: boolean;
  setIsBreakTime: (value: boolean) => void;
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
  isBreakTime,
  setResetTimerFlagToDefault,
  setAlertMessage,
  setIsBreakTime,
}: CountDownTimerInterface) {
  const [isPlaying, setIsPlaying] = useState(false);
  const BREAK_TIME_SECONDS = 60;
  const [timeInSeconds, setTimeInSeconds] = useState<number>(
    parseInt(currentExercise.repLengthInSeconds)
  );
  const [formattedTime, setFormattedTime] = useState<Time>(
    FormatTime(currentExercise.repLengthInSeconds)
  );
  const [timer, setTimer] = useState<NodeJS.Timer>();

  const [playingAudio, toggleAudio] = useAudio(
    "https://cdn.freesound.org/previews/153/153213_2499466-lq.mp3"
  );
  //Handle Exercise Change
  useEffect(() => {
    setTimeInSeconds(parseInt(currentExercise.repLengthInSeconds));
    setFormattedTime(FormatTime(currentExercise.repLengthInSeconds));
  }, [currentExercise]);

  //Handle Timer Reset
  useEffect(() => {
    if (resetTimerFlag) {
      setAlertMessage("Workout finished!");
      setIsPlaying(false);
      setTimeInSeconds(parseInt(currentExercise.repLengthInSeconds));
      setFormattedTime(FormatTime(currentExercise.repLengthInSeconds));
      setResetTimerFlagToDefault();
    }
  }, [resetTimerFlag]);

  //Timer interval
  useEffect(() => {
    if (isPlaying) {
      setTimer(setInterval(countDown, 1000));
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (timeInSeconds === 0) {
      if (!isBreakTime) {
        setTimeInSeconds(BREAK_TIME_SECONDS);
        setIsBreakTime(true);
        console.log("break time!");
      }

      if (isBreakTime) {
        console.log("break time over");
        startNextExercise();
        setIsBreakTime(false);
      }
      if (!playingAudio) toggleAudio();
    }
    setFormattedTime(FormatTime(timeInSeconds.toString()));
  }, [timeInSeconds]);

  function countDown() {
    setTimeInSeconds((prev) => prev - 1);
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
        <h1>{`${formattedTime.minutes}:${formattedTime.seconds}`}</h1>
      </Button>
    );
}
