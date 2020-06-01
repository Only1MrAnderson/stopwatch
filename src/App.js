import React, { useState, useEffect } from "react";
import moment from "moment";

import "./App.css";

function App() {
  const [timer, setTimer] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const insertLap = () => {
    const lapTime =
      laps.length === 0 ? timer : timer - laps[laps.length - 1].time;
    setLaps([
      ...laps,
      {
        time: timer,
        fromLast: lapTime,
      },
    ]);
  };

  const reset = () => {
    setTimer(0);
    setLaps([]);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((time) => time + 1);
      }, 1000);
    } else {
      setTimer(0);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <div className="container">
      <div className="watch">
        <span className="timer">
          {moment().hour(0).minute(0).second(timer).format("HH : mm : ss")}
        </span>
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onClick={reset}>Reset</button>
        <button onClick={insertLap}>Lap</button>
      </div>
      <div className="laps">
        <span className="title">LAPS</span>
        {laps.length === 0 && (
          <span className="notLapsFound">No Laps Found!</span>
        )}
        <span className="lapsContainer">
          {laps.map((lap, index) => {
            return (
              <span key={index} className="lap">
                <span className="lapNumber">Lap {index + 1} - </span>
                <span>
                  {moment()
                    .hour(0)
                    .minute(0)
                    .second(lap?.fromLast)
                    .format("HH : mm : ss")}
                </span>
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
}

export default App;
