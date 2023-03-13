import styles from "./VotingForm.module.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/dist/client/link";

const VotingForm = ({data}) => {
  return(
    <>
      <div className={styles.votingFormWrapper}>
        <h3>{data?.name}</h3>
        <p>{data?.description}</p>
        <h3>Nominees</h3>
        <p>Wait for voting lines to open to be able to cast your vote</p>
        
        {/* <form>
          {
            data?.nominees?.map((nominee, index)=>{
              <div key={index}>
                <input />
                <label>{nominee}</label>
              </div>
            })
          }
        </form> */}
      </div>    
    </>
  )
};

export default VotingForm;
