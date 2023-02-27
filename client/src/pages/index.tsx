import styles from "../styles/Home.module.scss";
import Head from "next/head";

export default function Index() {
  return (
    <div className={styles.homeWrapper}>
      <Head>
        <title>Voting</title>
      </Head>
      <div className={styles.marquee}>
          <h1>
            SONDEKA VOTING LINES OPENING SOON
          </h1>
        </div>
    </div>
    );
  }