import { useState, useEffect } from "react";
import Logo from "features/svgIcons/logoBlack";
import LogoWhite from "features/svgIcons/LogoWhite";
import Menu from "features/svgIcons/menu";
import styles from "./Hero.module.scss";
import Countdown from "../Countdown";
import { useRouter } from "next/router";
import LogoElement from "features/svgIcons/sondekaElement";
import Layer3Element from "features/svgIcons/layer3Element";
import { motion } from 'framer-motion'

const Hero = () => {
  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();
  const router = useRouter();
  useEffect(() => {
    setWidth(window.outerWidth);
    setHeight(window.outerHeight);
  }, []);

  return (
    <div className={styles.heroWrapper}>
      {/* {
        router.pathname === '/' && <Countdown/>
      }*/}
      <motion.div className={styles.layer1} initial={{x: 250}} animate={{x: 0}} transition={{duration: 2.5}}>
        
        <div className={styles["strokedText"] + " " + styles["layer1Left"]}>
          {" "}
          2023
        </div>
        <div className={styles["layer1Main"]}> SOND3KA</div>
        <div className={styles.layer1Element}>
          <LogoElement />
        </div>
        <div className={styles["strokedText"] + " " + styles["layer1Right"]}>
          {" "}
          2023
        </div>
        <div className={styles.strokedText + " " + styles["layer3Right"]}>
          SOND3KA
        </div>        
      </motion.div>

      <motion.div className={styles.layer2}>
        <div className={styles["strokedText"] + " " + styles.layer2Left}>
          AWARDS
        </div>
        <div className={styles.layer2Description}>
          <mark>
            Dedicated to helping the <br></br>
            creative community gain <br></br>
            recognition for their <br></br>
            artistic work <br></br>
          </mark>
        </div>
        <div className={styles.layer2Main}>AWARDS</div>
        <div className={styles["strokedText"] + " " + styles.layer2Right}>
          SONDEKA
        </div>
      </motion.div>

      <motion.div className={styles.layer3} initial={{x: -250}} animate={{x: 0}} transition={{duration: 2.5}}>
        <div className={styles.strokedText + " " + styles.layer3Left}>
          SOND3KA 2023
        </div>
        <div className={styles.layer3Element}>
          {" "}
          <Layer3Element />{" "}
        </div>
        <div className={styles.layer3Main}>2023</div>
        <div className={styles.strokedText + " " + styles["layer3Right"]}>
          SOND3KA
        </div>
      </motion.div>
      <div className={styles.heroMobile}>
        <h1>Sond3ka</h1>
        <h1>Awards</h1>
        <div className={styles.layer3Mobile}>
        <h1>2023</h1><div className={styles.layer3MobileElement}><Layer3Element/></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
