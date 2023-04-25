import styles from "./SocialsButton.module.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/dist/client/link";
import { Facebook, Instagram, Share, Twitter } from "features/svgIcons/SocialMediaIcons";
import { ListItemProps } from "types/cssProperty";

const Categories = () => {
  const [activeElement, setActiveElement] = useState<boolean>(false)
  const toggleOptions = () =>{
    setActiveElement(!activeElement)
  }
  return (
    <div className={activeElement === true ? styles.socialsWrapper + ' ' + styles.active : styles.socialsWrapper }>
      <button className={styles.button}>
        <Share />
      </button>
      <ul className={styles.list}>
        <li className={styles.item}>
          <a href="#" className={styles.link + " " + styles.instagram}>
            <Instagram />
          </a>
        </li>
        <li className={styles.item} style={{}}>
          <a href="#" className={styles.link + " " + styles.twitter}>
            <Twitter />
          </a>
        </li>
        <li className={styles.item} style={{}}>
          <a href="#" className={styles.link + " " + styles.facebook}>
            <Facebook />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Categories;
