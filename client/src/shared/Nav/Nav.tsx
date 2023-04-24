import Logo from "features/svgIcons/logoBlack";
import LogoWhite from "features/svgIcons/LogoWhite";
import Menu from "features/svgIcons/menu";
import styles from "./Nav.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import Close from "features/svgIcons/close";
import { AuthContext } from "admin-auth-context";
import { useSession, getSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import type { UserData } from "types/userData";

const Nav = () => {
  const [options, showOptions] = useState(false);
  const [loading, setLoading] = useState(null)
  const [admin, setAdmin] = useState(true);
  const { token, logout, isAdminAuthenticated } = useContext(AuthContext);

  const { data: session, status } = useSession()

  const router = useRouter();
  
  async function logoutAdmin() {
    try{
      setLoading(true)
      const response = await fetch("http://localhost:3500/admin/authentication/logout", {
        method: "GET"
      });
      console.log("Logout Admin: ", response)

    } catch (err){
      console.error(err)
    }
    logout()
    router.push("/");
    showOptions(false);
  }

  if (typeof window !== undefined) {
    return (
      <div className={styles.navContainer}>
        <div className={styles.navWrapper}>
          <Link href={"/"}>
            <div className={styles.navLogo}>
              <LogoWhite />
            </div>
          </Link>
          {/* <div className={styles.title}>
            50ND3KA <span> | AWARDS 2023</span>
          </div> */}
          <div className={styles.centerItems}>
            <div className={styles.centerItem}><Link href={'dd'}>  HOME </Link></div>
            <div className={styles.centerItem}><Link href={'dd'}>  NOMINEES </Link></div>
            <div className={styles.centerItem}><Link href={'dd'}>  CATEGORIES </Link></div>
            <div className={styles.centerItem}><Link href={'dd'}>  SONDEKA.ORG </Link></div>
          </div>
          {/* <>{session.user.name}</> */}
          <div
            className={styles.menuBtn}
            onClick={() => {
              showOptions(!options);
            }}
          >
            {options === true ? <Close /> : <Menu />}
          </div>
        </div>

        {options && (
          <div className={styles.navOptions}>
            {status === "unauthenticated" && (
              <>
                <div className={styles.navLink}>
                  <Link href={"/"}>Home</Link>
                </div>
                <div className={styles.navLink}>
                  <Link href={"/signup"}>Sign Up</Link>
                </div>
                <div className={styles.navLink}>
                  <Link href={"/oAuthLogin"}>Log In</Link>
                </div>
              </>
            )}
            {status === "authenticated" && (
              <>
                <div className={styles.navLink}>
                  <Link href={"/"}>Home</Link>
                </div>
                <div className={styles.navLink} onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}>
                  <div>Log Out</div>
                </div>
              </>
            )}
            {isAdminAuthenticated && (
              <>
                <hr/>
                <p style={{textAlign: "center", fontFamily: "GraphiK LCG", color: "#FFCD00"}}> Admin Actions</p>
                <div className={styles.navLink}>
                  <Link href={"/admin/dashboard"}>Dashboard</Link>
                </div>
                <div className={styles.navLink}>
                  <Link href={"/admin/categories"}>Categories</Link>
                </div>
                <div className={styles.navLink}>
                  <Link href={"/admin/voters"}>Voters</Link>
                </div>
                <div className={styles.navLink}>
                  <Link href={"/admin/voters"}>Nominees</Link>
                </div>
                <div className={styles.navLink} onClick={() => {logoutAdmin(); showOptions(false)}}>
                  <div>Log Out</div>
                </div>
              </>
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
