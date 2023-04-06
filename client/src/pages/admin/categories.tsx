/* eslint-disable @next/next/no-img-element */
import React from "react";
import Nav from "shared/Nav/Nav";
import styles from "../../styles/adminVotersPanel.module.scss";
import Image from "next/image";
import AdminContentWrapper from "shared/AdminContentWrapper/AdminContentWrapper";

const Dashboard = () => {
  return (
    <div className={styles.pageWrapper}>
      <Nav />
      <div className={styles.pageContent}>
        <div className={styles.contentWrapper}>
          <AdminContentWrapper>
            <div className={styles.header}>
              <h1>Categories</h1>
              <div className={styles.count}>
                <p>Voters Count:</p>
                <span>115k</span>
              </div>
            </div>
            <div className={styles.categoriesGrid}>
              <div className={styles.categoryCard}>
                <img
                  src={"/image 3.png"}
                  className={styles.nomineeImage}
                  alt="nominee"
                />
                <h3>Poetry</h3>
              </div>
              <div className={styles.categoryCard}>
                <img
                  src={"/image 3.png"}
                  className={styles.nomineeImage}
                  alt="nominee"
                />
                <h3>Poetry</h3>
              </div>
              <div className={styles.categoryCard}>
                <img
                  src={"/image 3.png"}
                  className={styles.nomineeImage}
                  alt="nominee"
                />
                <h3>Poetry</h3>
              </div>
              <div className={styles.categoryCard}>
                <img
                  src={"/image 3.png"}
                  className={styles.nomineeImage}
                  alt="nominee"
                />
                <h3>Poetry</h3>
              </div>
              <div className={styles.categoryCard}>
                <img
                  src={"/image 3.png"}
                  className={styles.nomineeImage}
                  alt="nominee"
                />
                <h3>Poetry</h3>
              </div>
              <div className={styles.categoryCard}>
                <img
                  src={"/image 3.png"}
                  className={styles.nomineeImage}
                  alt="nominee"
                />
                <h3>Poetry</h3>
              </div>
              <div className={styles.categoryCard}>
                <img
                  src={"/image 3.png"}
                  className={styles.nomineeImage}
                  alt="nominee"
                />
                <h3>Poetry</h3>
              </div>
            </div>
          </AdminContentWrapper>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
