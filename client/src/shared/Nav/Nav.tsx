import Logo from "features/svgIcons/logoBlack";
import LogoWhite from "features/svgIcons/LogoWhite";
import Menu from "features/svgIcons/menu";
import styles from "./Nav.module.scss";

const Nav = () => {
  return(
    <div className={styles.navWrapper}>
      <div><LogoWhite /></div>
      <div className={styles.title}>50ND3KA <span> | AWARDS 2023</span></div>
      <div className={styles.menuBtn}><Menu/></div>
    </div>
  )
};

export default Nav;
