import React, { useEffect, CSSProperties } from "react";
import { ButtonIcon, DownCircle } from "features/svgIcons/CategoryIcons";
import styles from "./CategoryItem.module.scss";
import Link from "next/link";
import Image from "next/image";
import { VoterContext } from "global/VoterContext";
import { AuthContext } from "admin-auth-context";
import { useSession } from "next-auth/react";
import BeatLoader from "react-spinners/BeatLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const CategoryItem = ({
  title,
  link,
  color,
  openModal,
  categoryData,
  handleChoiceChange
}) => {
  const [hover, setHover] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [loadNominees, setLoadNominees] = React.useState(false);
  const [nominee, setNominee] = React.useState<any>();
  const { data: session, status } = useSession();

  useEffect(() => {
    async function getNominees() {
      try {
        setLoadNominees(true);
        const response = await fetch(
          `https://sondeka-render-api.onrender.com/admin/categories/${link}/nominees`
        );
        const nomineeData = await response.json();
        console.log(`${title}: `, nomineeData);
        setNominee(nomineeData);
        setLoadNominees(false);
      } catch (err) {
        console.error(err);
      }
    }

    setTimeout(getNominees, 1000);
  }, []);

  return (
    <div>
      <div
        className={
          expanded
            ? styles.accordionItem + " " + styles.accordionActive
            : styles.accordionItem
        }
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className={styles.categoryTitleContainer}
          onClick={() => setExpanded(!expanded)}
        >
          <h1>{title?.toUpperCase()}</h1>
          <div className={styles.arrowContainer}>
            <div className={styles.downIconWrapper}>
              <DownCircle hover={hover} />
            </div>
          </div>
        </div>
        {expanded ? (
          loadNominees ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingTop: "24px",
                paddingBottom: "24px",
              }}
            >
              <BeatLoader
                loading={loadNominees}
                color="#ffcd00"
                size={25}
                aria-label="Loading Nominees"
                cssOverride={override}
              />
            </div>
          ) : (
            <div>
              {status === "unauthenticated" && (
                <div className={styles.responseMessageE}>
                  You need to{" "}
                  <Link href={"/oAuthLogin"}>
                    <span>log in</span>
                  </Link>{" "}
                  to vote
                </div>
              )}
              <div className={styles.categoriesContainer}>
                {nominee?.map((nom: any, index: number) => (
                  <div key={index} className={styles.categoryWrapper}>
                    <div className={styles.category}>
                      <Image
                        alt={nom?.fullName}
                        width={320}
                        height={320}
                        src={nom?.profilePicture?.secure_url}
                      />
                      <div
                        className={styles.buttonContainer}
                        style={{
                          background: `linear-gradient(180deg, ${color}00, ${color}99)`,
                        }}
                      >
                        <div
                          className={styles.nomineeButton}
                          onClick={() => openModal(nom, color)}
                        >
                          {" "}
                          VIEW PROFILE{" "}
                        </div>
                      </div>
                    </div>
                    <div className={styles.inputGroup}>
                      <input
                        disabled={status === "unauthenticated"}
                        type="radio"
                        name={nom.categoryName}
                        value={nom._id}
                        required
                        onChange={() => handleChoiceChange(categoryData, nom)}
                        className={styles.radio}
                      />
                      <label htmlFor={nom._id} className={styles.voteformLabel}>
                        {" "}
                        Vote for me{" "}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default CategoryItem;
