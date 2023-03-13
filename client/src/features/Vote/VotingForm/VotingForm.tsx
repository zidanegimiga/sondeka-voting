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
        <p>Make a choice by selecting the nominee you desire to vote for</p>
      </div>    
    </>
  )
};

export default VotingForm;
