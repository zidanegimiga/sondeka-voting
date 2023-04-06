import React from "react";
import Nav from "shared/Nav/Nav";
import styles from "../../styles/adminVotersPanel.module.scss";
import Image from 'next/image'
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
            <div className={styles.warning}>
                <p>For Security purposes, open the admin panel on your desktop instead</p>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.styledTable}>
                <thead>
                  <tr className={styles.headRow}>
                    <th>#</th>
                    <th>Details</th>
                    <th>Category</th>
                    <th>Votes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                        <div className={styles.nomineePictureWrapper} style={{display: "flex"}}>
                            <Image src={'/nominee.png'} width={60} height={72} alt="nominee"/>
                            <div className={styles.nomineeDetails} style={{marginLeft: "16px"}}>
                                <p className={styles.nomineeName}  style={{fontWeight: "700", color: "white"}}>Kaskazini</p>
                                <p className={styles.nomineeEmail}>Kaskazini@example.com</p>
                            </div>
                        </div>
                    </td>
                    <td>Poetry</td>
                    <td>95</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AdminContentWrapper>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
