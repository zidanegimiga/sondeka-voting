import React, { useEffect, useState } from "react";
import Nav from "shared/Nav/Nav";
import styles from "../../styles/adminVotersPanel.module.scss";
import Image from "next/image";
import AdminContentWrapper from "shared/AdminContentWrapper/AdminContentWrapper";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [nomineesData, setNomineesData] = useState([]);
  const [message, setMessage] = useState("")
  const router = useRouter();

  useEffect(() => {
    const accessToken = window.localStorage.getItem("admin-token");
    const categoryId = router.query.categoryId;

    const fetchNomineesData = async () => {
      const res = await fetch(
        `https://sondeka-render-api.onrender.com/admin/nominees/allNominees`,
        {
          headers: {
            authorization: accessToken,
          },
        }
      );

      const data = await res.json();
      console.log("Nominee Data: ", data);

      if (data && data.message === "Forbiden!") {
        setNomineesData([]);
      } else if (data && data.message === "No nominees found"){
        setNomineesData([])
        setMessage(data?.message)
      }
    };

    accessToken ? fetchNomineesData() : router.push("/admin/login-admin");
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Nav />
      <div className={styles.pageContent}>
        <div className={styles.contentWrapper}>
          <AdminContentWrapper>
            <div className={styles.header}>
              <h1>Nominees</h1>
              <div className={styles.count}>
                <p>Voters Count:</p>
                <span>{nomineesData?.length + 1}</span>
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
                    <th>Details</th>
                    <th>Category</th>
                    <th>Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {message ? 
                    <p style={{color: 'white'}}>{message}</p> : (
                      nomineesData?.map((nominee, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <div
                              className={styles.nomineePictureWrapper}
                              style={{ display: "flex" }}
                            >
                              <Image
                                src={"/nominee.png"}
                                width={60}
                                height={72}
                                alt="nominee"
                              />
                              <div
                                className={styles.nomineeDetails}
                                style={{ marginLeft: "16px" }}
                              >
                                <p
                                  className={styles.nomineeName}
                                  style={{ fontWeight: "700", color: "white" }}
                                >
                                  {nominee.name}
                                </p>
                                <p className={styles.nomineeEmail}>
                                  {nominee.description.slice(0, 20)}...
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>{nominee.categoryName}</td>
                          <td>{nominee.votes}</td>
                        </tr>
                      ))
                    )}
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
