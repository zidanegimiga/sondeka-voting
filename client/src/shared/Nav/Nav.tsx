import Logo from "features/svgIcons/logoBlack";
import LogoWhite from "features/svgIcons/LogoWhite";
import Menu from "features/svgIcons/menu";
import styles from "./Nav.module.scss";
import Link from "next/link";
import { useState } from "react";

const Nav = () => {
  const [options, showOptions] = useState(false);
  return (
    <div className={styles.navContainer}>
      <div className={styles.navWrapper}>
        <Link href={"/"}>
          <div>
            <LogoWhite />
          </div>
        </Link>
        <div className={styles.title}>
          50ND3KA <span> | AWARDS 2023</span>
        </div>
        <div className={styles.menuBtn} onClick={()=>{showOptions(!options)}}>
          <Menu />
        </div>
      </div>
      {options && (
        <div className={styles.navOptions}>
          <div className={styles.navLink}>
            <Link href={"/signup"}>Sign Up</Link>
          </div>
          <div className={styles.navLink}>
            <Link href={"/login"}>Log In</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
