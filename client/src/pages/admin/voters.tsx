import React from "react";
import Nav from "shared/Nav/Nav";
import styles from "../../styles/adminVotersPanel.module.scss";
import AdminContentWrapper from "shared/AdminContentWrapper/AdminContentWrapper";
import { False, True } from "features/svgIcons/verificationStatus";

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
                    <th>Username</th>
                    <th>E-mail</th>
                    <th>Registration Date</th>
                    <th>Verification Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>zidane</td>
                    <td>zidane@example.com</td>
                    <td>17.03.2023</td>
                    <td><True/></td>
                  </tr>
                  <tr className={styles.activeRow}>
                    <td>1</td>
                    <td>zidane</td>
                    <td>zidane@example.com</td>
                    <td>17.03.2023</td>
                    <td><False/></td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>zidane</td>
                    <td>zidane@example.com</td>
                    <td>17.03.2023</td>
                    <td><False/></td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>zidane</td>
                    <td>zidane@example.com</td>
                    <td>17.03.2023</td>
                    <td><False/></td>
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
