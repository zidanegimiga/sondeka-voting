import styles from "../styles/Home.module.scss";
import Head from "next/head";
import Nav from "shared/Nav";
import Hero from "features/Home/Hero";
import Categories from "features/Home/Categories";
import DownArrow from "features/svgIcons/downArrow";
import Countdown from "features/Home/Countdown/Countdown";
import Link from "next/link";
import SocialsButton from "../features/Home/SocialsButton";
import Cursor from "shared/Cursor";
import { useState, useEffect, useContext } from "react";
import { VoterContext } from "global/VoterContext";
import CategoryItem from "features/Home/CategoryItem/CategoryItem";
import { useSession } from "next-auth/react";
import Close from "../features/svgIcons/close";
import { Twitter, Instagram, Facebook, Other } from "../shared/ModalIcons";
import { motion } from "framer-motion";
import { AuthContext } from "admin-auth-context";

const Modal = ({ isOpen, onClose, categoryColor, children }) => {
  if (!isOpen) return null;
  return <div className={styles.modal}>{children}</div>;
};

export default function Index({ data }) {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = useContext(AuthContext);
  // @ts-ignore
  const { nomineeModalData, setNomineeModalData } = useContext(VoterContext);
  const [categoryColor, setCategoryColor] = useState("");
  const [responseMessage, setResponseMessage] = useState<any>();
  // const [formData, setFormData] = useState({});
  const { data: session, status } = useSession();

  const handleVote = () => {
    console.log("UserId: ", userId);
    console.log("categoryName: ", nomineeModalData?.categoryName);
    console.log("nomineeId: ", nomineeModalData?._id);

    const formData = {
      categoryName: nomineeModalData?.categoryName,
      voterId: userId,
      nomineeId: nomineeModalData?._id,
    };
    const userVote = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          // `http://localhost:3500/vote`,
          `https://sondeka-render-api.onrender.com/vote`,
          // `http://localhost:3500/vote`,
          {
            method: "POST",
            body: JSON.stringify(formData),
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
    };
    userVote();
    console.log("Form Data: ", formData);
  };

  const openModal = (nominee: any, categoryColor: string) => {
    setNomineeModalData(nominee);
    console.log("Nominee: ", nomineeModalData);
    setCategoryColor(categoryColor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(data);
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
              VOTING BEGINS IN
            </div>
            <Countdown />
          </div>
          <div className={styles.categories} id="categories">
            <div className={styles.categoriesTitle}>CATEGORIES</div>
            <div>
              {data?.map((category, index) => {
                return (
                  <CategoryItem
                    key={index}
                    title={category.name}
                    description={category.description}
                    poster={category.poster}
                    link={category._id}
                    color={category.color}
                    openModal={openModal}
                  />
                );
              })}
            </div>
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
                  <a href={nomineeModalData?.socialMedia?.twitter}>
                    <Twitter />
                  </a>
                )}
                {nomineeModalData?.socialMedia?.instagram !== "" && (
                  <a href={nomineeModalData?.socialMedia?.instagram}>
                    {" "}
                    <Instagram />{" "}
                  </a>
                )}
                {nomineeModalData?.socialMedia?.facebook !== "" && (
                  <a href={nomineeModalData?.socialMedia?.facebook}>
                    <Facebook />{" "}
                  </a>
                )}
                {nomineeModalData?.socialMedia?.other[0] !== "" && (
                  <a href={nomineeModalData?.socialMedia?.other[0]}>
                    <Other />{" "}
                  </a>
                )}
                {/* { nomineeModalData.socialMedia.twitter !== "" && <Other/> } */}
              </div>
              <div className={styles.modalButtonsContainer}>
                {
                  nomineeModalData?.categoryName !== "Digital Art" || "Traditional/Contemporary Art" ? (
                    <a
                    href={nomineeModalData?.submission}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.checkOutMyWork}
                  >
                    <div>CHECK OUT MY WORK</div>
                  </a>
                  ) : null
                }
                {/* {responseMessage && (
                  <div className={styles.responseMessage}>
                    {responseMessage?.message}
                  </div>
                )} */}
              </div>
            </div>
          </div>
          <div className={styles.closeModal} onClick={closeModal}>
            <Close />
          </div>
        </motion.div>
      </Modal>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://sondeka-render-api.onrender.com/categories/allCategories"
  );
  const data = await res.json();
  console.log("Categories generated, ", data);

  return {
    props: {
      data,
    },
  };
};
