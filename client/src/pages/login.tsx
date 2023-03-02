import { useState } from 'react';
import styles from "../styles/test.module.scss";
import axios from 'axios';

const LogInPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [resMessage, setResMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Create an Axios instance with interceptors
  const axiosInstance = axios.create({
    baseURL: 'https://sondeka-voting-api.cyclic.app',
  });

  axiosInstance.interceptors.request.use((config) => {
    // Set loading state to true when a request is made
    setLoading(true);
    setError(null); // clear any previous errors
    setSuccess(false); // clear any previous success messages
    return config;
  }, (error) => {
    setLoading(false);
    return Promise.reject(error);
  });

  axiosInstance.interceptors.response.use((response) => {
    // Set loading state to false when a response is received
    setLoading(false);
    setSuccess(true); // set success state to true
    return response;
  }, (error) => {
    setLoading(false);
    setError(error.response.data.message); // set the error message
    return Promise.reject(error);
  });

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
      const response = await axiosInstance.post('/auth', formData);
      console.log(response.data);
      setResMessage(response.data.message)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {loading ? (
        <p className={styles.toastMessages}>Loading...</p>
      ) : success ? (
        <p className={styles.toastMessages}>{resMessage}</p>
      ) : error ? (
        <>
            <p className={styles.toastMessagesError}>Error: {error}</p>
            <button onClick={(e)=>{e.preventDefault(); setError(null)}}>Try again</button>
        </>
      ) : (
        <div> LOG IN
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.formLabel}>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
          </label>
          <label className={styles.formLabel}>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
          </label>
          <button type="submit">Log In</button>
        </form>
        </div>
      )}
    </div>
  );
};

export default LogInPage;