import React, { useEffect } from "react";
import { ButtonIcon, DownCircle } from "features/svgIcons/CategoryIcons";
import styles from "./CategoryItem.module.scss";
import Link from "next/link";
import Image from "next/image";
import { VoterContext } from "global/VoterContext";
import { AuthContext } from "admin-auth-context";
import { useSession } from "next-auth/react";

const CategoryItem = ({
  title,
  description,
  poster,
  link,
  color,
  openModal,
}) => {
  const { userId } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [loadNominees, setLoadNominees] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState<any>();
  const [nominee, setNominee] = React.useState<any>();
  const [formData, setFormData] = React.useState({
    categoryName: title,
    nomineeId: "",
    voterId: userId,
  });
  const { data: session, status } = useSession();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const votingData = {nomineeId: formData?.nomineeId, voterId: userId, categoryName: title}
      const response = await fetch(
        `https://sondeka-render-api.onrender.com/vote`,
        {
          method: "POST",
          body: JSON.stringify(votingData),
          headers: {
            // Authorization: `${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );

      const datares = await response.json();
      setLoading(false);
      setResponseMessage(datares);
    } catch (err) {
      console.error(err);
    }
    // console.log("Form Data: ", {nomineeId: formData?.nomineeId, voterId: userId, categoryName: title})
  };

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

    setTimeout(getNominees, 6000);
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
        <div className={styles.categoryTitleContainer} onClick={() => setExpanded(!expanded)}>
          <h1 >{title?.toUpperCase()}</h1>
          <div className={styles.arrowContainer}>
            <div className={styles.downIconWrapper}>
              <DownCircle hover={hover} />
            </div>
          </div>
        </div>
        {expanded ? (
          <form>
            {/* {loadNominees && <div> Loading....</div>} */}
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
                      name="nomineeId"
                      value={nom._id}
                      onChange={(event) => handleInputChange(event)}
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

            <div className={styles.votebuttonContainer}>
              <button
                className={styles.voteButton}
                type="submit"
                disabled={status === "unauthenticated"}
                onClick={(e)=>handleSubmit(e)}
              >
                {" "}
                {loading ? "SUBMITING VOTE" : "SUBMIT VOTE"}
              </button>
              {responseMessage && (
                <div className={styles.responseMessage}>
                  {responseMessage?.message}
                </div>
              )}
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default CategoryItem;
