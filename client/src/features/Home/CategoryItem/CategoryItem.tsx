import React, { useEffect } from "react";
import { ButtonIcon, DownCircle } from "features/svgIcons/CategoryIcons";
import styles from "./CategoryItem.module.scss";
import Link from "next/link";

const CategoryItem = ({ title, description, poster, color, link}) => {
  const [hover, setHover] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [backgroundPhoto, setBackgroundPhoto] = React.useState(`url(/categories/${poster}.png)`);

  useEffect(()=>{
    if(window.innerWidth < 769){
      setBackgroundPhoto("none")
    } else{
      setBackgroundPhoto(poster)
    }
  }, [])

  return (
    <div>
      <div
        className={
          expanded
            ? styles.accordionItem + " " + styles.accordionActive
            : styles.accordionItem
        }
        style={{ backgroundColor: `${color}`, backgroundImage: backgroundPhoto }}
        onClick={() => setExpanded(!expanded)}
      >
        <div className={styles.titleContainer}>
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
        </div>
        <div className={styles.arrowContainer}>
          <div className={styles.downIconWrapper}>
            <DownCircle />
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
