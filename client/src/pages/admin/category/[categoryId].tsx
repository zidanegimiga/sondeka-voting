import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../../../styles/adminVotersPanel.module.scss";
import { useRouter } from "next/router";
import { AuthContext } from "admin-auth-context";
import AdminContentWrapper from "shared/AdminContentWrapper/AdminContentWrapper";
import Nav from "shared/Nav";

interface NomineeData {
  _id: string;
  name: string;
  category: string;
  categoryName: string;
  description: string;
  poster: string;
  votes: number;
}

interface CategoryData {
  _id: string;
  name: string;
  description: string;
  nominees: Array<string>;
  poster: string;
}

const CategoryId = () => {
  const [categoryData, setCategoryData] = useState<CategoryData | any>([]);
  const [nomineeData, setNomineeData] = useState<NomineeData | any>([]);
  const { token, login, isAdminAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const accessToken = window.localStorage.getItem("admin-token");
    const categoryId = router.query.categoryId;

    const fetchCategoryData = async () => {
      console.log("Category ID: ", categoryId);
      console.log("Category ID Type: ", typeof categoryId);

      const res = await fetch(
        `${process.env.API_URL}/admin/categories/${categoryId}`,
        {
          headers: {
            authorization: accessToken,
          },
        }
      );

      const data = await res.json();
      if (data && data.message === "Forbiden!") {
        setCategoryData([]);
      } else {
        setCategoryData(data);
        console.log("Data: ", categoryData);
      }
    };

    const fetchNomineeData = async () => {
      const res = await fetch(
        `${process.env.API_URL}/admin/categories/${categoryId}/nominees`,
        {
          headers: {
            authorization: accessToken,
          },
        }
      );

      const data = await res.json();
      console.log("Nominee Data: ", data);
      if (data && data.message === "Forbiden!") {
        setNomineeData([]);
      } else {
        setNomineeData(data);
      }
    };

    async function fetchAllData() {
      fetchCategoryData();
      fetchNomineeData();
    }

    accessToken ? fetchAllData() : router.push("/admin/login-admin");
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Nav />
      <div className={styles.pageContent}>
        <div className={styles.contentWrapper}>
          <AdminContentWrapper>
            <div className={styles.header}>
              <h1>{categoryData.name}</h1>
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
                  {nomineeData.map((nominee, index) => (
                    <tr key={index}>
                      <td>{nomineeData.length + 1}</td>
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
                              {nominee.description.slice(0, 10)}...
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>{nominee.categoryName}</td>
                      <td>{nominee.votes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AdminContentWrapper>
        </div>
      </div>
    </div>
  );
};

export default CategoryId;
