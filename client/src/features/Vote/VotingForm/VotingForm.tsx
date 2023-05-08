import styles from "./VotingForm.module.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/dist/client/link";
import { useSession, getSession } from "next-auth/react";

const VotingForm = ({ categoryData }) => {
  const [nominees, setNominees] = useState<any>();
  const [selectedNomineeId, setSelectedNomineeId] = useState("");
  const [voterId, setVoterId] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<any>();
  const [jwt, setJWT] = useState("");
  const [formData, setFormData] = useState({
    categoryId: categoryData._id,
    nomineeId: "",
    voterId: "",
  });

  const { data: session, status } = useSession();
  const [nullData, setNullData] = useState(false);

  useEffect(() => {
    async function getUserId(name){
      try{
        const response = await fetch(`https://sondeka-voting-api.cyclic.app/getUserId/${encodeURIComponent(name)}`);
        const userId = await response.json();
        if(response.ok){
          setVoterId(userId);
          window.localStorage.setItem('userId', userId)          
        }else {
          console.error(userId.message);
        }       
      } catch(err){
        console.error(err)
      }
    }

    getUserId(session?.user?.name)
    async function getNominees() {
      try {
        const response = await fetch(
          `https://sondeka-voting-api.cyclic.app/admin/categories/${categoryData?._id}/nominees`
        );
        const nomineeData = await response.json();
        setNominees(nomineeData);
      } catch (error) {
        console.error(error);
      }
    }

    if (categoryData.length > 0) {
      getNominees();
      const token = window.localStorage.getItem("token");

      setJWT(token);
      const vId = window.localStorage.getItem("userId");
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
          <h3>{categoryData?.name}</h3>
          <p>{categoryData?.description}</p>
          <h3>Nominees</h3>
          {voterId && <p>User ID: {voterId}</p>}
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
                    disabled={status === "unauthenticated"}
                    className={styles.radio}
                  />
                  <label htmlFor={nominee._id}>{nominee.name}</label>
                </div>
              ))}

              <div className={styles.btnContainer}>
                <button className={styles.button} type="submit" disabled={status==="unauthenticated"}>
                  {loading ? "Submitting" : "Submit"}
                </button>
              </div>
            </form>
          )}
          {status === "unauthenticated" && (
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
