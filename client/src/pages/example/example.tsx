import React from 'react';
import styles from './example.module.scss'
import CategoryItem from 'features/Home/CategoryItem/CategoryItem';

const data = [
  {
    title: "POETRY",
    backgroundImage: "poetry.png",
    color: "#FFCD00",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "PODCAST",
    backgroundImage: "podcasts.png",
    color: "#FFA800",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },  
]

const Example = () => {
  return (
    <div className={styles.body}>
      {
        data.map((category, index) =>{
          return(
            <CategoryItem 
              key={index}
              title={category.title}
              description={category.description}
              backgroundImage={category.backgroundImage}
              color={category.color}
            />
          )
        })
      }
    </div>
  )
}

export default Example