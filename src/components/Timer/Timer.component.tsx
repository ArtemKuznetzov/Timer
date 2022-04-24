import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./timer.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export const Timer = () => {
  // Application state
  const [hoursState, setHoursState] = useState(0);
  const [minutesState, setMinutesState] = useState(0);
  const [secondsState, setSecondsState] = useState(0);
  const [timerStated, setTimerStarted] = useState(false);
  const [intervalState, setIntervalState] = useState(0);

  const [buttonPlayStopCountState, setButtonPlayStopStart] = useState(0);
  const [buttonPlayStopClicked, setButtonPlayStopClicked] = useState(false);
  const [resetButtonClicked, setResetButtonClicked] = useState(false);

  // Application function logic
  // For seconds count
  function secondsCount() {
    const secondsInterval: any = setInterval(() => {
      setSecondsState((prevTime) => (prevTime === 59 ? 0 : prevTime + 1));
    }, 1000);
    setIntervalState(secondsInterval);

    return secondsInterval;
  }
  // Check if seconds count started
  function afterSecondsStartFunc() {
    const secondsCountStarted = setTimeout(() => {
      setTimerStarted(true);
    }, 1100);
    return secondsCountStarted;
  }

  function resetButton() {
    clearInterval(intervalState);
    setHoursState(0);
    setMinutesState(0);
    setSecondsState(0);
  }

  useEffect(() => {
    setMinutesState((prevTime) =>
      timerStated && !resetButtonClicked
        ? secondsState === 0
          ? prevTime === 59
            ? (prevTime = 0)
            : prevTime + 1
          : prevTime
        : (prevTime = 0)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsState, timerStated]);

  useEffect(() => {
    setHoursState((prevTime) =>
      timerStated && !resetButtonClicked
        ? minutesState === 0
          ? prevTime + 1
          : prevTime
        : (prevTime = 0)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutesState]);

  return (
    <div className={styles["main-container"]}>
      <ul>
        <li>{hoursState < 10 ? `0${hoursState}` : hoursState}</li>
        <li>:</li>
        <li>{minutesState < 10 ? `0${minutesState}` : minutesState}</li>
        <li>:</li>
        <li>{secondsState < 10 ? `0${secondsState}` : secondsState}</li>
      </ul>

      <div className={styles["timer-buttons"]}>
        <Button
          variant="success"
          onClick={() => {
            setButtonPlayStopClicked(true);
            setButtonPlayStopStart((prevCount) => prevCount + 1);
            if (
              !Number.isInteger(buttonPlayStopCountState / 2) &&
              !resetButtonClicked
            ) {
              clearInterval(intervalState);
            } else {
              secondsCount();
              afterSecondsStartFunc();
              setResetButtonClicked(false);
            }
          }}
        >
          Старт/Пауза
        </Button>{" "}
        <Button
          className={styles["reset-button"]}
          variant="danger"
          onClick={() => {
            resetButton();
            setResetButtonClicked(true);
            setButtonPlayStopClicked(false);
            setButtonPlayStopStart(0);
          }}
        >
          Сброс
        </Button>{" "}
      </div>
    </div>
  );
};
