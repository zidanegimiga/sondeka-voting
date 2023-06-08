import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Nav from "shared/Nav/Nav";
import styles from "../../styles/adminVotersPanel.module.scss";
import AdminContentWrapper from "shared/AdminContentWrapper/AdminContentWrapper";
import { False, True } from "features/svgIcons/verificationStatus";
import Image from "next/image";

const Voters = () => {
  const [votersData, setVotersData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const accessToken = window.localStorage.getItem("admin-token");
    const categoryId = router.query.categoryId;

    const fetchVotersData = async () => {
      const res = await fetch(`https://sondeka-render-api.onrender.com/admin/voters/allVoters`, {
        headers: {
          authorization: accessToken,
        },
      });

      const data = await res.json();
      if (data && data.message === "Forbiden!") {
        setVotersData([]);
      } else {
        setVotersData(data);
        console.log("Data: ", votersData);
      }
    };

    accessToken ? fetchVotersData() : router.push("/admin/login-admin");
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Nav />
      <div className={styles.pageContent}>
        <div className={styles.contentWrapper}>
          <AdminContentWrapper>
            <div className={styles.header}>
              <h1>Voters</h1>
              <div className={styles.count}>
                <p>Voters Count:</p>
                <span>{votersData.length + 1}</span>
              </div>
            </div>
            <div className={styles.warning}>
              <p>
                For Security purposes, open the admin panel on your desktop
                instead
              </p>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.styledTable}>
                <thead>
                  <tr className={styles.headRow}>
                    <th>#</th>
                    <th>Username</th>
                    <th>E-mail</th>
                    {/* <th>Registration Date</th> */}
                    <th>Verification Status</th>
                  </tr>
                </thead>
                <tbody>
                  {votersData.map((voter, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div>{voter.name}</div>
                      </td>
                      <td>{voter.email}</td>
                      {/* <td>17.03.2023</td> */}
                      <td>
                        <True />
                      </td>
                    </tr>
                  ))}
                  {/* <tr className={styles.activeRow}>
                    <td>1</td>
                    <td>zidane</td>
                    <td>zidane@example.com</td>
                    <td>17.03.2023</td>
                    <td>
                      <False />
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </AdminContentWrapper>
        </div>
      </div>
    </div>
  );
};

export default Voters;
