import { useEffect } from 'react'
import styles from "../styles/Home.module.scss";
import Head from "next/head";
import Nav from "shared/Nav";
import Hero from "features/Home/Hero";
import Categories from "features/Home/Categories";
import { useCookies } from 'react-cookie';

export default function Index({categories}) {
  const [cookies, setCookie, removeCookie] = useCookies(['adminAuth']);

  useEffect(()=>{
    console.log("Cookie exists: ", Boolean(cookies['user']))
  }, [])
  return (
    <div className={styles.homeWrapper}>
      <Head>
        <title>Voting - sondeka </title>
      </Head>
      <div className={styles.pageWrapper}>
        <Nav/>
        <Hero />
        <Categories />

      </div>
    </div>
    );
}
