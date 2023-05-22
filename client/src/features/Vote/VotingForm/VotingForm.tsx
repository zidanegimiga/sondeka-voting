import styles from "./VotingForm.module.scss";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/dist/client/link";
import { useSession, getSession } from "next-auth/react";
import { AuthContext } from "admin-auth-context";

const VotingForm = ({ categoryData, openModal }) => {
  const {userId} = useContext(AuthContext)
  const [nominees, setNominees] = useState<any>();
  const [voterName, setVoterName] = useState("");
  const [voterId, setVoterId] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<any>();
  const [nullData, setNullData] = useState(false);
  
  const [formData, setFormData] = useState({
    categoryId: categoryData._id,
    categoryName: categoryData.name,
    voterId: userId,
  });

  const { data: session, status } = useSession();

  useEffect(() => {
    setVoterName(session?.user?.name);
    // console.log("Category: ", categoryData)
    console.log("User ID: ", userId)

    async function getNominees() {
      try {
        const response = await fetch(
          `https://sondeka-voting-api.cyclic.app/admin/categories/${categoryData?._id}/nominees`
        );
        const nomineeData = await response.json();
        // console.log("Nominee Data: ", nomineeData)
        setNominees(nomineeData);
      } catch (error) {
        console.error(error);
      }
    }

    if (categoryData.nominees.length > 0) {
      getNominees();
    } else {
      setNullData(true);
    }
  }, [session]);

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
      const response = await fetch(
        // `http://localhost:3500/vote`,
        `https://sondeka-voting-api.cyclic.app/vote`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            // Authorization: `${jwt}`,
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
    console.log("Form submission: ", formData)
  };

  if (typeof window !== undefined) {
    return (
      <>
        <div className={styles.votingFormWrapper}>
          <h3>{categoryData?.name}</h3>
          <p>{categoryData?.description}</p>
          <h3>Nominees</h3>
          {/* <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              backgroundColor: "#FFCD00",
              marginTop: "32px",
              padding: "10px",
            }}
          >
            Wait for voting lines to open to be able to cast your vote
          </p> */}

          {nullData === false && (
            <form onSubmit={handleSubmit}>
              <p>Click on a nominee&apos;s name and submit your vote:</p>
              {nominees?.map((nominee) => (
                <div key={nominee._id}>
                  <div className={styles.nomineeOption}>
                    <div className={styles.center}>
                      <div className={styles.centerPiece}>
                        <input
                          type="radio"
                          id={nominee._id}
                          name="nomineeId"
                          value={nominee._id}
                          onChange={(event) => handleInputChange(event)}
                          disabled={status === "unauthenticated"}
                          className={styles.radio}
                        />
                        <div className={styles.labelBtnContainer}>
                          <label htmlFor={nominee._id} className={styles.nomineeName} onClick={(event)=>handleInputChange(event)}>{nominee.fullName}</label>
                          <div className={styles.viewProfile} onClick={()=>openModal(nominee)}>
                            View Profile                          
                          </div>
                        </div>
                      </div>
                      <div className={styles.imageContainer}>
                        <img src={nominee.profilePicture.url} className={styles.nomineeImage} alt={nominee.fullName}/>
                      </div>
                    </div>
                </div>
                </div>
              ))}

              <div className={styles.btnContainer}>
                <button
                  className={styles.button}
                  type="submit"
                  disabled={status === "unauthenticated"}
                >
                  {loading ? "Submitting Vote" : "Submit Vote"}
                </button>
              </div>
            </form>
          )}
          {status === "unauthenticated" && (
            <div className={styles.responseMessageE}>
              You need to{" "}
              <Link href={"/oAuthLogin"}>
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
