import styles from "../styles/Home.module.scss";
import Head from "next/head";
import Nav from "shared/Nav";
import Hero from "features/Home/Hero";
import Categories from "features/Home/Categories";
import DownArrow from "features/svgIcons/downArrow";

export default function Index({categories}) {
  return (
    <div className={styles.homeWrapper}>
      <Head>
        <title>Voting - sondeka </title>
      </Head>
      <div className={styles.pageWrapper}>
        <Nav/>
        <Hero />
        <div className={styles.scroller}>
          <div className={styles.iconWrapper}>
            <DownArrow/>
          </div>
          <div className={styles.scrollText}>SCROLL</div>
          <div className={styles.divider}></div>
        </div>
        {/* <Categories /> */}

      </div>
    </div>
    );
}
