import { useState } from "react";
import styles from "../styles/login.module.scss";
import axios from "axios";
import TextField from "shared/InputFields/TextField";
import { Hide, Show } from "features/svgIcons/showHide";
import Logo from "features/svgIcons/logoBlack";
import Button from "shared/Button";
import Link from "next/link";
import { useRouter } from "next/router";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successResp, setSuccessResp] = useState<any>();
  const [resMessage, setResMessage] = useState<any>();
  const [passwordType, setPasswordType] = useState("password");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

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
      const response = await fetch("https://sondeka-voting-api.cyclic.app/signup", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if(response.ok === false){
        setError(true);
        const err = await response.json()
        setResMessage(err)
        setLoading(false)
      }

      const successRes = await response.json();
      setSuccessResp(successRes)
      setSuccess(true)
      console.log("Recieved: ", successRes)
      setLoading(false)
    } catch (error) {
      console.error(error);
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
                  <h4>{resMessage?.title}</h4>
                  <p>{resMessage?.description}</p>
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
            ) : 
            success ? (
              <div className={styles.toastMessagesContainer}>
                <div className={styles.toastMessagesSuccess}>
                  {/* <h4>{res.title}</h4> */}
                  <p>{successResp.message}</p>
                </div>
              </div>
            ) :            
            (
              <>
                <div className={styles.heading}> SIGN UP </div>
                <div className={styles.form}>
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <TextField
                      onChange={handleInputChange}
                      value={formData.username}
                      name={"username"}
                      type={"text"}
                      placeholder={"Username"}
                    />
                    <TextField
                      onChange={handleInputChange}
                      value={formData.email}
                      name={"email"}
                      type={"email"}
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
                      <Button text={loading ? 'Signing up...' : 'SIGN UP'} type="submit" color={loading ? "#808080" : "#440A80"} />
                    </div>
                    <div className={styles.signUpLink}>
                      Have an account?{" "}
                      <Link href={"/login"}>
                        <span>Log in</span>
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

export default SignUpPage;
