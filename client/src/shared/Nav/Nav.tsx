import Logo from "features/svgIcons/logoBlack";
import LogoWhite from "features/svgIcons/LogoWhite";
import Menu from "features/svgIcons/menu";
import styles from "./Nav.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Close from "features/svgIcons/close";

const Nav = () => {
  const [options, showOptions] = useState(false);
  const [token, setToken] = useState<String>();
  const [loading, setLoading] = useState(null)
  const [admin, setAdmin] = useState(true)

  const router = useRouter();

  async function logoutNormalUser() {
    try{
      setLoading(true)
      const response = await fetch("https://sondeka-voting-api.cyclic.app/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

    } catch (err){
      console.error(err)
    }
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("username");
    setToken(null);
    router.push("/");
    showOptions(false);
  }
  
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
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("username");
    setToken(null);
    router.push("/");
    showOptions(false);
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
            <div className={styles.navLogo}>
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
            {options === true ? <Close /> : <Menu />}
          </div>
        </div>
        {options && (
          <div className={styles.navOptions}>
            {!token && (
              <>
                <div className={styles.navLink}>
                  <Link href={"/"}>Home</Link>
                </div>
                <div className={styles.navLink}>
                  <Link href={"/signup"}>Sign Up</Link>
                </div>
                <div className={styles.navLink}>
                  <Link href={"/login"}>Log In</Link>
                </div>
              </>
            )}
            {token && (
              <>
                <div className={styles.navLink}>
                  <Link href={"/"}>Home</Link>
                </div>
                <div className={styles.navLink} onClick={() => logoutNormalUser()}>
                  <div>Log Out</div>
                </div>
              </>
            )}
            {admin && (
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
