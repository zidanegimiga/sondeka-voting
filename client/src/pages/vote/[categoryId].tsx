import styles from '../../styles/votingform.module.scss'
import Hero from 'features/Home/Hero'
import Head from 'next/dist/shared/lib/head'
import React from 'react'
import Nav from 'shared/Nav'
import VotingForm from 'features/Vote/VotingForm'

const VotingCategory = ({category}) => {
  console.log("Category: ", category)
  return (
    <div className={styles.homeWrapper}>
      <Head>
        <title>Voting - sondeka </title>
      </Head>
      <div className={styles.pageWrapper}>
        <Nav/>
        <Hero>
        </Hero>
        <VotingForm data={category}/>        
      </div>
    </div>
  )
}

export const getStaticProps = async ({ params }) => {
  const { categoryId } = params
  // fetch the data for the category
  const category = await fetch(`http://localhost:3500/admin/categories/${categoryId}`).then(res => res.json())
  // return the data as props
  return { props: { category } }
}

export const getStaticPaths = async () => {
  // fetch the list of all posts
  const categories = await fetch(`http://localhost:3500/admin/categories/allCategories`).then(res => res.json())
  // generate the paths for each category
  const paths = categories.map(category => ({ params: { categoryId: category._id } }))
  // return the paths
  return { paths, fallback: false }
}

export default VotingCategory;