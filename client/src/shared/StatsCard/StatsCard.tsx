import React from "react";
import Link from "next/link";
import styles from "./StatsCard.module.scss";

const StatsCard = ({ title, number, icon, link }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <Link href={link}>
      <div
        className={styles.cardWrapper}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <h2>{number}</h2>
        <div className={styles.titleWrapper}>
          <div className={styles.iconWrapper}>
            {React.cloneElement(icon, { hover: hover })}
          </div>
          <p>{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default StatsCard;
