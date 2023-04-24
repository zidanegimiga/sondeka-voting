import styles from "./VotingForm.module.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/dist/client/link";

const VotingForm = ({ data }) => {
  const [nominees, setNominees] = useState<any>();
  const [selectedNomineeId, setSelectedNomineeId] = useState("");
  const [voteId, setVoterId] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<any>();
  const [jwt, setJWT] = useState("");
  const [formData, setFormData] = useState({
    categoryId: data._id,
    nomineeId: "",
    voterId: "",
  });
  const [notloggedIn, setNotLoggedIn] = useState(false);
  const [nullData, setNullData] = useState(false);

  useEffect(() => {
    async function getNominees() {
      try {
        const response = await fetch(
          `https://sondeka-voting-api.cyclic.app/admin/categories/${data?._id}/nominees`
        );
        const nomineeData = await response.json();
        setNominees(nomineeData);
      } catch (error) {
        console.error(error);
      }
    }

    if (data.length > 0) {
      getNominees();
      const token = window.localStorage.getItem("token");
      if (token === null || undefined) {
        setNotLoggedIn(true);
      }
      setJWT(token);
      const vId = window.localStorage.getItem("id");
      setFormData({
        ...formData,
        voterId: vId,
      });
    } else {
      setNullData(true);
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("Form: ", formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `https://sondeka-voting-api.cyclic.app/vote`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            Authorization: `${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      const datares = await response.json();
      setLoading(false);
      setResponseMessage(datares);
    } catch (err) {
      console.error(err);
    }
  };

  if (typeof window !== undefined) {
    return (
      <>
        <div className={styles.votingFormWrapper}>
          <h3>{data?.name}</h3>
          <p>{data?.description}</p>
          <h3>Nominees</h3>
          <p style={{textAlign: "center", fontWeight: "bold", backgroundColor: "#FFCD00", marginTop: "32px", padding: "10px"}}>Wait for voting lines to open to be able to cast your vote</p>

          {nullData === false && (
            <form onSubmit={handleSubmit}>
              <p>Please select a nominee:</p>
              {nominees?.map((nominee) => (
                <div key={nominee._id} className={styles.nomineeOption}>
                  <input
                    type="radio"
                    id={nominee._id}
                    name="nomineeId"
                    value={nominee._id}
                    onChange={(event) => handleInputChange(event)}
                    disabled={notloggedIn}
                    className={styles.radio}
                  />
                  <label htmlFor={nominee._id}>{nominee.name}</label>
                </div>
              ))}

              <div className={styles.btnContainer}>
                <button className={styles.button} type="submit">
                  {loading ? "Submitting" : "Submit"}
                </button>
              </div>
            </form>
          )}
          {notloggedIn && (
            <div className={styles.responseMessageE}>
              You need to{" "}
              <Link href={"/login"}>
                <span>log in</span>
              </Link>{" "}
              to vote
            </div>
          )}
          {responseMessage && (
            <div className={styles.responseMessage}>
              {responseMessage?.message}
            </div>
          )}
        </div>
      </>
    );
  } else {
    return <>Window undefined</>;
  }
};

export default VotingForm;
