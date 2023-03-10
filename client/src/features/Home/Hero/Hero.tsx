import Logo from "features/svgIcons/logoBlack";
import LogoWhite from "features/svgIcons/LogoWhite";
import Menu from "features/svgIcons/menu";
import styles from "./Hero.module.scss";

const Nav = () => {
  return(
    <div className={styles.heroWrapper}>
      <div className={styles.title}>VOTING BEGINS IN</div>
      <div className={styles.countdownBody}>

      </div>
      
    </div>
  )
};

export default Nav;
