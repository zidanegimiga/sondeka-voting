import styles from "./SocialsButton.module.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/dist/client/link";
import {
  Close,
  Facebook,
  Instagram,
  Share,
  Twitter,
} from "features/svgIcons/SocialMediaIcons";
import { ListItemProps } from "types/cssProperty";

const Categories = () => {
  const [activeElement, setActiveElement] = useState<boolean>(false);
  const [instagramElementHover, setInstagramElementHover] = useState<boolean>(false);
  const [twitterElementHover, setTwitterElementHover] = useState<boolean>(false);
  const [facebookElementHover, setFacebookElementHover] = useState<boolean>(false);
  const toggleOptions = () => {
    setActiveElement(!activeElement);
  };
  return (
    <div className={activeElement ? styles.active + ' ' + styles.socialsWrapper : styles.socialsWrapper }>
      <div className={styles.layer1}>
        <div
          onMouseEnter={()=>{setInstagramElementHover(true)}}
          onMouseLeave={()=>{setInstagramElementHover(false)}}
          className={activeElement ? styles.instagramActive : styles.instagram}
        >
          <Instagram hover={instagramElementHover}/>
        </div>
        <div
          className={styles.shareButton}
          onClick={(e) => {
            e.preventDefault();
            toggleOptions();
          }}
        >
          {activeElement ? <Close /> : <Share />}
        </div>
        <div 
        onMouseEnter={()=>{setTwitterElementHover(true)}}
        onMouseLeave={()=>{setTwitterElementHover(false)}}
        className={activeElement ? styles.twitterActive : styles.twitter}>
          <Twitter hover={twitterElementHover}/>
        </div>
      </div>
      <div 
      onMouseEnter={()=>{setFacebookElementHover(true)}}
      onMouseLeave={()=>{setFacebookElementHover(false)}}
      className={activeElement ? styles.facebookActive : styles.facebook}>
        <Facebook hover={facebookElementHover}/>
      </div>
    </div>
  );
};

export default Categories;