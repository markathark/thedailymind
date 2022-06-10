import React, { useEffect, useState } from "react";
import "./clock.css";

const Clock = () => {
  const [clockState, setClockState] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 1000);
  }, []);

  return <div className="clock-div">{clockState}</div>;
};

export default Clock;
