/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Home.module.scss";
import Head from "next/head";
import Nav from "shared/Nav";
import Hero from "features/Home/Hero";
import DownArrow from "features/svgIcons/downArrow";
import Countdown from "features/Home/Countdown/Countdown";
import Link from "next/link";
import SocialsButton from "../features/Home/SocialsButton";
import { useState, useEffect, useContext, CSSProperties } from "react";
import { VoterContext } from "global/VoterContext";
import CategoryItem from "features/Home/CategoryItem/CategoryItem";
import { useSession } from "next-auth/react";
import Close from "../features/svgIcons/close";
import { Twitter, Instagram, Facebook, Other } from "../shared/ModalIcons";
import { motion } from "framer-motion";
import { AuthContext } from "admin-auth-context";
import BeatLoader from "react-spinners/BeatLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FrankNjugi from "shared/Nominee/FrankNjugi";
import MartinMururu from "shared/Nominee/MartinMururu";
import LutiviniMajanja from "shared/Nominee/LutiviniMajanja";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Modal = ({ isOpen, onClose, categoryColor, children }) => {
  if (!isOpen) return null;
  return <div className={styles.modal}>{children}</div>;
};

export default function Index() {
  const [choices, setChoices] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryColor, setCategoryColor] = useState("");
  const [responseMessage, setResponseMessage] = useState<any>();

  // @ts-ignore
  const { nomineeModalData, setNomineeModalData } = useContext(VoterContext);
  const { userId } = useContext(AuthContext);

  const { data: session, status } = useSession();

  const openModal = (nominee: any, categoryColor: string) => {
    setNomineeModalData(nominee);
    console.log("Nominee: ", nomineeModalData);
    setCategoryColor(categoryColor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function getCategories() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://sondeka-render-api.onrender.com/categories/allCategories"
        );
        const data = await res.json();
        setCategoryData(data);
        setLoading(false);
      } catch (err) {
        console.error("Category Data Error: ", err);
      }
    }
    setTimeout(getCategories, 1000);
  }, []);

  const handleChoiceChange = (category: any, nominee: any) => {
    const updatedChoices = [...choices];
    const existingChoiceIndex = updatedChoices.findIndex(
      (choice) => choice.categoryName === category?.name
    );

    if (existingChoiceIndex !== -1) {
      updatedChoices[existingChoiceIndex] = {
        ...updatedChoices[existingChoiceIndex],
        nomineeId: nominee._id,
      };
    } else {
      updatedChoices.push({
        categoryName: category.name,
        nomineeId: nominee._id,
        voterId: userId,
      });
    }

    setChoices(updatedChoices);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `https://sondeka-render-api.onrender.com/vote`,
        {
          method: "POST",
          body: JSON.stringify(choices),
          headers: {
            // Authorization: `${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );

      const datares = await response.json();
      setLoading(false);
      setResponseMessage(datares);
      setChoices([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className={styles.homeWrapper}>
        <Head>
          <title>Voting - sondeka </title>
        </Head>
        <div className={styles.pageWrapper}>
          <Nav />
          <Hero />
          <div className={styles.scroller}>
            <div className={styles.iconWrapper}>
              <DownArrow />
            </div>
            <div className={styles.scrollText}>SCROLL</div>
            <div className={styles.divider}></div>
          </div>
          <div className={styles.countdownContainer}>
            <div className={styles.countdownContainerTitle}>
              VOTING STOPS IN
            </div>
            <Countdown />
          </div>
          <div className={styles.categories} id="categories">
            <div className={styles.categoriesTitle}>CATEGORIES</div>
            {loading ? (
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
                  loading={loading}
                  color="#ffcd00"
                  size={25}
                  aria-label="Loading Nominees"
                  cssOverride={override}
                />
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {status === "unauthenticated" && (
                  <div className={styles.responseMessageE}>
                    You need to{" "}
                    <Link href={"/oAuthLogin"}>
                      <span>log in</span>
                    </Link>{" "}
                    to vote
                  </div>
                )}
                {categoryData?.map((category, index) => {
                  return (
                    <CategoryItem
                      key={category.name}
                      categoryData={category}
                      title={category.name}
                      link={category._id}
                      color={category.color}
                      openModal={openModal}
                      handleChoiceChange={handleChoiceChange}
                    />
                  );
                })}

                <div className={styles.votebuttonContainer}>
                  <button
                    className={styles.voteButton}
                    type="submit"
                    disabled={status === "unauthenticated"}
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
            )}
          </div>
          <div className={styles.subLogo}>
            <div className={styles.sondekaTitle}>
              {" "}
              5OND3KA <span>| AWARDS 2023</span>
            </div>
          </div>
          <div className={styles.footerLayer1}>
            <Link href={"/privacy"}>
              {" "}
              <p>Privacy Policy</p>{" "}
            </Link>
            <Link href={"https://creativesgarage.org"}>
              {" "}
              <p> Creatives Garage </p>{" "}
            </Link>
            <p>
              <a href="mailto: community@creativesgarage.org">
                community@creativesgarage.org
              </a>
            </p>
          </div>
          <div className={styles.socials}>
            <div className={styles.socialsTitle}>CHECK OUR SOCIALS OUT</div>
            <SocialsButton />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        categoryColor={categoryColor}
      >
        <motion.div
          className={styles.modalContent}
          style={{
            backgroundColor: categoryColor,
          }}
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className={styles.contentContainer}>
            {
              nomineeModalData?.stageName === "Frank Njugi" && (
                <FrankNjugi/>
              )                        
            }
            {
              nomineeModalData?.stageName === "Martin Mururu" && (
                <MartinMururu/>
              )                        
            }
            {
              nomineeModalData?.stageName === "Lutivini Majanja" && (
                <LutiviniMajanja/>
              )                        
            }
            {nomineeModalData?.categoryName ===
              "Traditional/Contemporary Art" && (
              <div className={styles.imageContainer}>
                <img
                  src={`/nomineeAssets/${nomineeModalData?.fullName}.jpg`}
                  alt={nomineeModalData.fullName}
                  className={styles.modalImage}
                />
              </div>
            )}

            {nomineeModalData?.categoryName == "Digital Art" && (
              <div className={styles.imageContainer}>
                <img
                  src={`/nomineeAssets/${nomineeModalData?.fullName}.jpg`}
                  alt={nomineeModalData.fullName}
                  className={styles.modalImage}
                />
              </div>
            )}

            <div className={styles.nomineeContent}>
              <h2>{nomineeModalData?.fullName}</h2>
              <p>{nomineeModalData?.bio}</p>
              <div className={styles.socialMedia}>
                {nomineeModalData?.socialMedia?.twitter !== "" && (
                  <a
                    href={nomineeModalData?.socialMedia?.twitter}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Twitter />
                  </a>
                )}
                {nomineeModalData?.socialMedia?.instagram !== "" && (
                  <a
                    href={nomineeModalData?.socialMedia?.instagram}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {" "}
                    <Instagram />{" "}
                  </a>
                )}
                {nomineeModalData?.socialMedia?.facebook !== "" && (
                  <a
                    href={nomineeModalData?.socialMedia?.facebook}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Facebook />{" "}
                  </a>
                )}
                {nomineeModalData?.socialMedia?.other[0] !== "" && (
                  <a
                    href={nomineeModalData?.socialMedia?.other[0]}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Other />{" "}
                  </a>
                )}
              </div>
              <div className={styles.modalButtonsContainer}>
                {nomineeModalData?.categoryName !== "Digital Art" &&
                // nomineeModalData?.categoryName !==
                // "Short Stories" &&
                nomineeModalData?.categoryName !==
                  "Traditional/Contemporary Art" ? (
                  <a
                    href={nomineeModalData?.submission}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.checkOutMyWork}
                  >
                    <div> CHECK OUT MY WORK</div>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
          <div className={styles.closeModal} onClick={closeModal}>
            <Close />
          </div>
        </motion.div>
      </Modal>
      <ToastContainer />
    </div>
  );
}
