import styles from "../styles/Home.module.scss";
import Head from "next/head";
import Nav from "shared/Nav";
import Hero from "features/Home/Hero";
import Categories from "features/Home/Categories";

export default function Index({categories}) {
  return (
    <div className={styles.homeWrapper}>
      <Head>
        <title>Voting - sondeka </title>
      </Head>
      <div className={styles.pageWrapper}>
        <Nav/>
        <Hero/>
        <Categories />
      </div>
    </div>
    );
}

// export async function getStaticProps(context){
//   const response = await fetch('https://sondeka-voting-api.cyclic.app/admin/categories/getAllCategories')
//   const categories = response.json()
//   console.log("Log: ", categories)

//   return {
//     props: {
//       categories
//     }
//   }
// }