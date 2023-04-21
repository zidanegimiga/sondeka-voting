import styles from "./Categories.module.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/dist/client/link";

const Categories = ({data}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(data)
  }, []);

  return (
    <div className={styles.categoriesWrapper}>
      <h3>CATEGORIES</h3>
      <p>Select a category to cast your vote</p>
      <div className={styles.categories}>
        {categories?.map((category, index) => (
          <div key={index} className={styles.category}>
            <Link href={`/vote/${category._id}`}>
            <Image
              src={`/categories/${category.poster}.png`}
              alt={category.name}
              width={200}
              height={200}
              loading="lazy"
            /></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
