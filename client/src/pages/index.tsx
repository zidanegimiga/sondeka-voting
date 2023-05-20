import styles from "../styles/Home.module.scss";
import Head from "next/head";
import Nav from "shared/Nav";
import Hero from "features/Home/Hero";
import Categories from "features/Home/Categories";
import DownArrow from "features/svgIcons/downArrow";
import Countdown from "features/Home/Countdown/Countdown";
import Link from "next/link";
import SocialsButton from "../features/Home/SocialsButton";
import Cursor from "shared/Cursor";
import { useState, useEffect } from "react";
import CategoryItem from "features/Home/CategoryItem/CategoryItem";

export default function Index({data}) {
  console.log(data)
  return (
    <div className={styles.homeWrapper}>
      <Head>
        <title>Voting - sondeka </title>
      </Head>
      <div className={styles.pageWrapper}>
        <Nav />
        <Hero />
        <div className={styles.scroller}>
          <div className={styles.iconWrapper}>
            <DownArrow />
          </div>
          <div className={styles.scrollText}>SCROLL</div>
          <div className={styles.divider}></div>
        </div>
        <div className={styles.countdownContainer}>
          <div className={styles.countdownContainerTitle}>VOTING BEGINS IN</div>
          <Countdown />
        </div>
        <div className={styles.categories}>
          <div className={styles.categoriesTitle} id="categories">CATEGORIES</div>
          {data.map((category, index) => {
            return (
              <CategoryItem
                key={index}
                title={category.name}
                description={category.description}
                poster={category.poster}
                link={category._id}
              />
            );
          })}
        </div>
        <div className={styles.subLogo}>
          <div className={styles.sondekaTitle}>
            {" "}
            5OND3KA <span>| AWARDS 2023</span>
          </div>
        </div>
        <div className={styles.footerLayer1}>
          <Link href={"/privacy"}>
            {" "}
            <p>Privacy Policy</p>{" "}
          </Link>
          <Link href={"https://creativesgarage.org"}>
            {" "}
            <p> Creatives Garage </p>{" "}
          </Link>
          <p>
            <a href="mailto: awesome@creativesgarage.org">
              awesome@creativesgarage.org
            </a>
          </p>
        </div>
        <div className={styles.socials}>
          <div className={styles.socialsTitle}>CHECK OUR SOCIALS OUT</div>
          <SocialsButton />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://sondeka-voting-api.cyclic.app/categories/allCategories"
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
