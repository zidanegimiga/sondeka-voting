import React from 'react';
import styles from './example.module.scss'
import NewCategories from 'features/Home/NewCategories/NewCategories';
import { MyComponent } from 'features/Home/NewCategories/tatata';

const example = () => {
  const items = [
    { name: "Digital Art", src: "digitalArt"},
    { name: "Digital Art", src: "digitalArt"},
    { name: "Digital Art", src: "digitalArt"},
    { name: "Digital Art", src: "digitalArt"},
    { name: "Digital Art", src: "digitalArt"},
    { name: "Digital Art", src: "digitalArt"},
    { name: "Digital Art", src: "digitalArt"},
    { name: "Digital Art", src: "digitalArt"},
    { name: "Digital Art", src: "digitalArt"},
    { name: "Digital Art", src: "digitalArt"},
    { name: "Digital Art", src: "digitalArt"},
    { name: "Digital Art", src: "digitalArt"},
    { name: "Digital Art", src: "digitalArt"},
  ]
  return (
    <div className={styles.body}>
      <NewCategories items={items}/>
      <MyComponent/>
    </div>
  )
}

export default example