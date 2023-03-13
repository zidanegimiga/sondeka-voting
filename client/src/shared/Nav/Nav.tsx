import Logo from "features/svgIcons/logoBlack";
import LogoWhite from "features/svgIcons/LogoWhite";
import Menu from "features/svgIcons/menu";
import styles from "./Nav.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Nav = () => {
  const [options, showOptions] = useState(false);
  const [token, setToken] = useState<String>();
  const router = useRouter()
  function logout() {
    window.localStorage.removeItem("token");
    setToken(null)
    router.push('/')
    showOptions(false)    
  }
  useEffect(() => {
    const getToken = window.localStorage.getItem("token");
    setToken(getToken);
  }, []);

  if (typeof window !== undefined) {
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
          <div
            className={styles.menuBtn}
            onClick={() => {
              showOptions(!options);
            }}
          >
            <Menu />
          </div>
        </div>
        {options && (
          <div className={styles.navOptions}>
            {!token && (
              <>
                <div className={styles.navLink}>
                  <Link href={"/signup"}>Sign Up</Link>
                </div>
                <div className={styles.navLink}>
                  <Link href={"/login"}>Log In</Link>
                </div>
              </>
            )}
            {token && (
              <div className={styles.navLink} onClick={() => logout()}>
                <div>Log Out</div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  } else {
    return <div>Window not defined</div>;
  }
};

export default Nav;
