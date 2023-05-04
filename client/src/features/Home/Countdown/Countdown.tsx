import styles from "./Countdown.module.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/dist/client/link";

const Countdown = () => {
  const [votingTime, setVotingTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date("5/29/2023 23:59:59");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setVotingTime(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {votingTime ? (
        <>
          <h1>Voting Lines Open!</h1>
        </>
      ) : (
        <>
          <div className={styles.timerWrapper}>
            <div className={styles.timeBox}>
              <div className={styles.time}>{days}</div>
              <div className={styles.timeTitle}>DAYS</div>
            </div>                        
            <div className={styles.timeBox}>
              <div className={styles.time}>{hours}</div>
              <div className={styles.timeTitle}>HOURS</div>
            </div>                        
            <div className={styles.timeBox}>
              <div className={styles.time}>{minutes}</div>
              <div className={styles.timeTitle}>MINUTES</div>
            </div>                        
            <div className={styles.timeBox}>
              <div className={styles.time}>{seconds}</div>
              <div className={styles.timeTitle}>SECONDS</div>
            </div>                        
          </div>
        </>
      )}
    </>
  );
};

export default Countdown;
