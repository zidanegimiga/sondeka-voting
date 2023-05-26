import React, { useEffect } from "react";
import { ButtonIcon, DownCircle } from "features/svgIcons/CategoryIcons";
import styles from "./CategoryItem.module.scss";
import Link from "next/link";
import Image from "next/image";

const CategoryItem = ({ title, description, poster, link, color, openModal }) => {
  const [hover, setHover] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [loadNominees, setLoadNominees] = React.useState(false);
  const [nominee, setNominee] = React.useState<any>();

  useEffect(() => {
    async function getNominees() {
      try {
        setLoadNominees(true);
        const response = await fetch(
          `https://sondeka-voting-api.cyclic.app/admin/categories/${link}/nominees`
        );
        const nomineeData = await response.json();
        console.log(`${title}: `, nomineeData);
        setNominee(nomineeData);
        setLoadNominees(false);
      } catch (err) {
        console.error(err);
      }
    }

    setTimeout(getNominees, 3000)
  }, []);

  return (
    <div>
      <div
        className={
          expanded
            ? styles.accordionItem + " " + styles.accordionActive
            : styles.accordionItem
        }
        onClick={() => setExpanded(!expanded)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* <div className={styles.titleContainer}>
          <h2>{title}</h2>
          <div className={expanded ? styles.active : styles.content}>
            <div className={styles.categoryDescription}>
              {description}
            </div>
            <Link href={`/vote/${link}`}>
              <div
                className={styles.voteCTA}
                onMouseEnter={() => {
                  setHover(true);
                }}
                onMouseLeave={() => setHover(false)}
              >
                <div className={styles.iconWrapper}>
                  <div className={styles.iconContainer}>
                    <ButtonIcon hover={hover} />
                  </div>
                </div>
                <div className={styles.textContainer}>VOTE NOW</div>
              </div>
            </Link>
          </div>
              </div>*/}
        <div className={styles.categoryTitleContainer}>
          <h1>{title?.toUpperCase()}</h1>
          <div className={styles.arrowContainer}>
            <div className={styles.downIconWrapper}>
              <DownCircle hover={hover} />
            </div>
          </div>
        </div>
        {expanded ? (
          <div className={styles.categoriesContainer}>
            {loadNominees && <div> Loading....</div>}
            {nominee?.map((nom: any, index: number) => (
              <div key={index} className={styles.category}>
                <Image alt={nom?.fullName} width={320} height={320} src={nom?.profilePicture?.secure_url}/>
                <div className={styles.buttonContainer} style={{background: `linear-gradient(180deg, ${color}00, ${color}99)`}}>
                  <div className={styles.nomineeButton} onClick={()=> openModal(nom, color)}> VIEW PROFILE </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CategoryItem;
