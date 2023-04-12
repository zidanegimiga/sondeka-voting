/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Nav from "shared/Nav/Nav";
import styles from "../../styles/adminVotersPanel.module.scss";
import Image from "next/image";
import AdminContentWrapper from "shared/AdminContentWrapper/AdminContentWrapper";
import Link from "next/link";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch(
        "http://localhost:3500/admin/categories/allCategories"
      );
      const data = await res.json();
      if (data && data.message === "Forbiden!") {
        setIsAdmin(false);
        setCategories([]);
      } else {
        setCategories(data);
        console.log("Type: ", typeof data[0]._id);
      }
    };
    fetchAllCategories();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Nav />
      <div className={styles.pageContent}>
        <div className={styles.contentWrapper}>
          <AdminContentWrapper>
            <div className={styles.header}>
              <h1>Categories</h1>
              <div className={styles.count}>
                <p>Categories Count:</p>
                <span>{categories.length}</span>
              </div>
            </div>
            <div className={styles.categoriesGrid}>
              {categories?.map((category, index) => (
                <Link
                  key={category._id}
                  href={`/admin/category/${category._id}`}
                  passHref
                >
                  <div className={styles.categoryCard} key={index}>
                    <img
                      src={`/categories/${category.poster}.png`}
                      className={styles.nomineeImage}
                      alt="nominee"
                    />
                    {/* <h3>{category?.name}</h3> */}
                  </div>
                </Link>
              ))}
            </div>
          </AdminContentWrapper>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
