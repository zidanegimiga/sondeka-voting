import styles from "../styles/Home.module.scss";
import Head from "next/head";
import Nav from "shared/Nav";
import Hero from "features/Home/Hero";
import Categories from "features/Home/Categories";

export default function Index({data}) {
  return (
    <div className={styles.homeWrapper}>
      <Head>
        <title>Voting - sondeka </title>
      </Head>
      <div className={styles.pageWrapper}>
        <Nav/>
        <Hero />
        <Categories data={data}/>

      </div>
    </div>
    );
}

export const getServerSideProps = async () => {
  const res = await fetch("https://sondeka-voting-api.cyclic.app/categories/allCategories")
  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}