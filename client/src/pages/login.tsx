import { useState, useEffect } from "react";
import styles from "../styles/login.module.scss";
import axios from "axios";
import TextField from "shared/InputFields/TextField";
import { Hide, Show } from "features/svgIcons/showHide";
import Logo from "features/svgIcons/logoBlack";
import Button from "shared/Button";
import Link from "next/link";
import { useRouter } from "next/router";

const LogInPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [resMessage, setResMessage] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  useEffect(()=>{
    const tokenState = window.localStorage.getItem('token')
    if(tokenState !== null || undefined){
      router.push('/');
    }
  }, [])

  function cancelError(e) {
    e.preventDefault();
    setError(null);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("https://sondeka-voting-api.cyclic.app/auth", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response: ", response)
      
      if(response.status === 401){
        const res = await response.json()
        setError(res);
        setLoading(false)
      }

      if(response.status === 400){
        const res = await response.json()
        setError(res);
        setLoading(false)
      }

      if(response.status === 201 || 200){
        const { accessToken, userDetails } = await response.json();
        window.localStorage.setItem("token", `${accessToken}`);
        window.localStorage.setItem("username", `${userDetails?.username}`);
        window.localStorage.setItem("id", `${userDetails?.id}`);
        router.push("/");
        setLoading(false)
      }

    } catch (err) {
      console.error(err);
    }
  };

  if (typeof window !== undefined) {
    return (
      <div>
        <div className={styles.loginPageWrapper}>
          <div className={styles.contentContainer}>
            <div className={styles.containerHeader}>
              <Logo />
            </div>
            {error ? (
              <div className={styles.toastMessagesErrorContainer}>
                <div className={styles.toastMessagesError}>
                  <h4>{error.title}</h4>
                  <p>{error.description}</p>
                  {/*<Button
                    color={"grey"}
                    text="Try again"
                    type={""}
                    action={cancelError}
                  /> */}
                  <button className={styles.errorBtn} onClick={cancelError}>
                    Try Again
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.heading}> LOG IN TO CONTINUE </div>
                <div className={styles.form}>
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <TextField
                      onChange={handleInputChange}
                      value={formData.email}
                      name={"email"}
                      type={"text"}
                      placeholder={"E-mail"}
                    />
                    <div className={styles.passwordField}>
                      <TextField
                        onChange={handleInputChange}
                        value={formData.password}
                        name={"password"}
                        type={passwordType}
                        placeholder={"Password"}
                      />
                      {passwordType === "text" ? (
                        <button
                          className={styles.showHidePassword}
                          onClick={(e) => {
                            e.preventDefault();
                            setPasswordType("password");
                          }}
                        >
                          <Hide />
                        </button>
                      ) : (
                        <button
                          className={styles.showHidePassword}
                          onClick={(e) => {
                            e.preventDefault();
                            setPasswordType("text");
                          }}
                        >
                          <Show />
                        </button>
                      )}
                    </div>
                    {/* <div className={styles.forgotPasswordText}>
                      Forgot Password?
                    </div> */}
                    <div className={styles.buttonContainer}>
                      <Button text={loading ? 'Logging In...' : 'LOG IN'} type="submit" color={loading ? "#808080" : "#440A80"} />
                    </div>
                    <div className={styles.signUpLink}>
                      Have an account?{" "}
                      <Link href={"/signup"}>
                        <span>Sign Up</span>
                      </Link>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <>Window not defined</>;
  }
};

export default LogInPage;
