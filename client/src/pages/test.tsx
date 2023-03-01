import React, { useEffect, useState} from 'react';
import styles  from '../styles/test.module.scss';
import axios from "axios";
import { type } from 'os';

const Test = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successRes, setSucessRes] = useState({})
  const [error, setError] = useState()



  const handleSubmit = (event) =>{
    event.preventDefault();

    const formData = {
      username : username,
      email: email,
      password: password
    }

    axios.post('https://sondeka-voting-api.cyclic.app/signup', formData)
    .then(function (response) {
      console.log(response);
      if(response){
      }
    })
    .catch(function (error) {
      console.log(error);
    });

    console.log("RESULT: ", formData)
  }

  return (
    <div>
      <form 
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <input 
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <input 
          className={styles.input}
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className={styles.formBtnWrapper}>
          <button className={styles.formBtn} type={"submit"}>Sign Up</button>
        </div>

      </form>
    </div>
  )
}

export default Test