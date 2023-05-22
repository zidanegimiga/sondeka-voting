import styles from "../../styles/votingform.module.scss";
import Hero from "features/Home/Hero";
import Head from "next/dist/shared/lib/head";
import React, { useContext, useEffect, useState } from "react";
import Nav from "shared/Nav";
import VotingForm from "features/Vote/VotingForm";
import { VoterContext } from "../../global/VoterContext";
import { useSession } from "next-auth/react";
import Close from "features/svgIcons/close";
import { Twitter, Instagram, Facebook, Other } from "shared/ModalIcons";

const Modal = ({ isOpen, onClose, categoryColor, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      {children}
    </div>
  );
};

const VotingCategory = ({ category }) => {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // @ts-ignore
  const { nomineeModalData, setNomineeModalData } = useContext(VoterContext);
  const [categoryColor, setCategoryColor] = useState("");

  const openModal = (nominee) => {
    setNomineeModalData(nominee);
    console.log("Nominee: ", nomineeModalData);
    setCategoryColor(category.color);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className={styles.homeWrapper}>
        <Head>
          <title>Voting - sondeka </title>
        </Head>
        <div className={styles.pageWrapper}>
          <Nav />
          {/* <Hero /> */}
          <VotingForm categoryData={category} openModal={openModal} />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        categoryColor={categoryColor}
      >
        <div
          className={styles.modalContent}
          style={{
            backgroundColor: categoryColor,
          }}
        >
          <div className={styles.contentContainer}>
            <div className={styles.imageContainer}>
              <img src={nomineeModalData?.profilePicture?.url} alt={nomineeModalData.fullName} className={styles.modalImage}/>
            </div>
            <div className={styles.nomineeContent}>
              <h2>{nomineeModalData.fullName}</h2>
              <p>{nomineeModalData.bio}</p>
              <div className={styles.socialMedia}>
                { nomineeModalData.socialMedia.twitter !== "" && <a  href={nomineeModalData.socialMedia.twitter}><Twitter/></a>}
                { nomineeModalData.socialMedia.instagram!== "" && <a  href={nomineeModalData.socialMedia.instagram}> <Instagram/> </a>}
                { nomineeModalData.socialMedia.facebook !== "" && <a  href={nomineeModalData.socialMedia.facebook}><Facebook/> </a>}
                {/* { nomineeModalData.socialMedia.twitter !== "" && <Other/> } */}
              </div>
              <div className={styles.checkOutMyWork}>
                CHECK OUT MY WORK
              </div>
              <div className={styles.voteForMe} onClick={closeModal}>
                VOTE FOR ME
              </div>
            </div>
          </div>
          <div className={styles.closeModal} onClick={closeModal}>
            <Close />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const { categoryId } = params;
  // fetch the data for the category
  const category = await fetch(
    `https://sondeka-voting-api.cyclic.app/categories/${categoryId}`,
    { cache: "force-cache" }
  ).then((res) => res.json());
  // return the data as props
  return { props: { category } };
};

export const getStaticPaths = async () => {
  // fetch the list of all posts
  const categories = await fetch(
    `https://sondeka-voting-api.cyclic.app/categories/allCategories`,
    { cache: "force-cache" }
  ).then((res) => res.json());
  // generate the paths for each category
  const paths = categories.map((category) => ({
    params: { categoryId: category._id },
  }));
  // return the paths
  return { paths, fallback: false };
};

export default VotingCategory;
