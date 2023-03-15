import {useState, useEffect} from 'react';
import Logo from "features/svgIcons/logoBlack";
import LogoWhite from "features/svgIcons/LogoWhite";
import Menu from "features/svgIcons/menu";
import styles from "./Hero.module.scss";
import Countdown from '../Countdown';
import { useRouter } from 'next/router';

const Hero = () => {
  const router = useRouter()

  return(
    <div className={styles.heroWrapper}>
      {
        router.pathname === '/' && <Countdown/>
      }     
    </div>
  )
};

export default Hero;
