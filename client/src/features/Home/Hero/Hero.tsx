import {useState, useEffect} from 'react';
import Logo from "features/svgIcons/logoBlack";
import LogoWhite from "features/svgIcons/LogoWhite";
import Menu from "features/svgIcons/menu";
import styles from "./Hero.module.scss";
import Countdown from '../Countdown';

const Hero = ({children}) => {

  return(
    <div className={styles.heroWrapper}>
      {children}      
    </div>
  )
};

export default Hero;
