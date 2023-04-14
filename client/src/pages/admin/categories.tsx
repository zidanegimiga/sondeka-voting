/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "admin-auth-context";
import Nav from "shared/Nav/Nav";
import styles from "../../styles/adminVotersPanel.module.scss";
import Image from "next/image";
import AdminContentWrapper from "shared/AdminContentWrapper/AdminContentWrapper";
import Link from "next/link";
import { useRouter } from "next/router";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const { token, login, isAdminAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const accessToken = window.localStorage.getItem("admin-token");

    const fetchAllCategories = async () => {
      console.log("Is Authenticated: ", isAdminAuthenticated);
      try {
        const res = await fetch(
          `${process.env.API_URL}/admin/categories/allCategories`,
          {
            headers: {
              authorization: accessToken,
            },
          }
        );
        const data = await res.json();
        if (data && data.message === "Forbiden!") {
          setCategories([]);
        } else {
          setCategories(data);
        }
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };

    accessToken ? fetchAllCategories() : router.push("/admin/login-admin")

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
              {!error ? (
                <>
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
                </>
              ) : (
                <div> Categories data fetching failed, check your internet connection </div>
              )}
            </div>
          </AdminContentWrapper>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
