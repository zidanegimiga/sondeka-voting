import { useState } from "react";
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

  function cancelError(e) {
    e.preventDefault();
    setError(null);
  }

  // Create an Axios instance with interceptors
  const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      // Set loading state to true when a request is made
      setLoading(true);
      setError(null); // clear any previous errors
      setSuccess(false); // clear any previous success messages
      return config;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      // Set loading state to false when a response is received
      setLoading(false);
      setSuccess(true); // set success state to true
      return response;
    },
    (error) => {
      setLoading(false);
      setError(error.response.data); // set the error message
      return Promise.reject(error);
    }
  );

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
      const response = await axiosInstance.post("/auth", formData);
      console.log(response.data);
      window.localStorage.setItem("token", `${response?.data?.accessToken}`);
      window.localStorage.setItem(
        "username",
        `${response?.data?.userDetails?.username}`
      );
      window.localStorage.setItem("id", `${response?.data?.userDetails?.id}`);
      router.push("/");
      setResMessage(response.data.message);
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
            {loading ? (
              <p className={styles.toastMessages} style={{ color: "black" }}>
                Loading...
              </p>
            ) : success ? (
              <p className={styles.toastMessages} style={{ color: "black" }}>
                {resMessage}
              </p>
            ) : error ? (
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
                      <Button text="LOG IN" type="submit" color="#440A80" />
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
