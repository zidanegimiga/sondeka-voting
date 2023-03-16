import styles from "./VotingForm.module.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/dist/client/link";

const VotingForm = ({ data }) => {
  const [nominees, setNominees] = useState<any>();
  const [categoryId, setCategoryId] = useState("");
  const [selectedNomineeId, setSelectedNomineeId] = useState("");
  const [voterId, setVoterId] = useState("");
  const [jwt, setJWT] = useState("");

  useEffect(() => {
    async function getNominees() {
      try {
        const response = await fetch(
          `https://sondeka-voting-api.cyclic.app/admin/categories/${data?._id}/nominees`
        );
        const nomineeData = await response.json();
        setCategoryId(data._id)
        setNominees(nomineeData);
      } catch (error) {
        console.error(error);
      }
    }
    getNominees();
    const token = window.localStorage.getItem('token');
    setJWT(token)
    const vId = window.localStorage.getItem('id');
    setVoterId(vId)
    console.log("Token: ", token)
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://sondeka-voting-api.cyclic.app/vote`, {
        method: 'POST',
        body: JSON.stringify({
          categoryId: categoryId,
          nomineeId: selectedNomineeId,
          voterId: voterId          
        }),
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
      const datares = await response.json();
      console.log("Message: ", datares)
    } catch (err) {
      console.error(err);
    }
  };

  if (typeof window !== undefined) {
    console.log("Nominees: ", nominees);
    return (
      <>
        <div className={styles.votingFormWrapper}>
          <h3>{data?.name}</h3>
          <p>{data?.description}</p>
          <h3>Nominees</h3>
          <p>Wait for voting lines to open to be able to cast your vote</p>

          <form onSubmit={handleSubmit}>
            <p>Please select a nominee:</p>
            {nominees?.map((nominee) => (
              <div key={nominee._id}>
                <label htmlFor={nominee._id}>{nominee.name}</label>
                <input
                  type="radio"
                  id={nominee._id}
                  name="nominee"
                  value={nominee._id}
                  onChange={(event) => setSelectedNomineeId(event.target.value)}
                />
              </div>
            ))}
            <button type="submit">Submit</button>
          </form>
        </div>
      </>
    );
  } else {
    return <>Window undefined</>;
  }
};

export default VotingForm;
