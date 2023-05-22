import React, { useEffect, useState } from "react";
import styles from "./createNominee.module.scss";

const CreateNominee = ({ data }) => {
  const [fullName, setFullName] = useState("");
  const [stageName, setStageName] = useState("");
  const [bio, setBio] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [other, setOther] = useState("");
  const [submission, setSubmission] = useState("");
  const [profilePicture, setProfilePicture] = useState<any>([]);
  const [loading, setLoading] = useState<any>();
  const [responseMessage, setResponseMessage] = useState<any>();
  const [jwt, setJWT] = useState("");

  //handle and convert it in base 64
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfilePicture(reader?.result);
    };
  };

  //submit the form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const socialMedia = {instagram, twitter, facebook, other: [other]}
    try {
      setLoading(true);
      const response = await fetch(
      `https://sondeka-voting-api.cyclic.app/admin/nominees/newNominee`,
        {
          method: "POST",
          body: JSON.stringify({fullName, stageName, categoryName, bio, socialMedia, submission, profilePicture}),
          headers: {
            Authorization: `${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`Logged: `, fullName, stageName, categoryName, bio, socialMedia, submission, profilePicture)
      const datares = await response.json();
      setLoading(false);
      setResponseMessage(datares);
      console.log(responseMessage)
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  // const handleSocialMediaInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setSocialMedia({
  //     ...socialMedia,
  //     [name]: value,
  //   });
  // };

  useEffect(() => {
    const token = window.localStorage.getItem("admin-token");
    setJWT(token);
  }, []);

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={handleSubmit} className={styles.formWrapper}>
        <fieldset>
          <input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            placeholder="Stage Name"
            value={stageName}
            onChange={(e) => setStageName(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="form4Example2">Description</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </fieldset>
        <div>
          <label>Select Category:</label>
          <select
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          >
            <option value="">Select a category</option>
            {data.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <fieldset>
          <div>
            <input
              value={submission}
              onChange={(e) => setSubmission(e.target.value)}
              placeholder="link to submission"
            />
          </div>
        </fieldset>
        <fieldset>
          <label>Social Media</label>
          <div>
            <input
              value={instagram}
              onChange={(event) => setInstagram(event.target.value)}
              placeholder="Instagram"
            />
          </div>
          <div>
            <input
              value={twitter}
              onChange={(event) => setTwitter(event.target.value)}
              placeholder="Twitter"
            />
          </div>
          <div>
            <input
              value={facebook}
              onChange={(event) => setFacebook(event.target.value)}
              placeholder="Facebook"
            />
          </div>
          <div>
            <input
              value={other}
              onChange={(event) => setOther(event.target.value)}
              placeholder="Other"
            />
          </div>
        </fieldset>

        <div>
          <input
            onChange={handleImage}
            type="file"
            id="formupload"
            name="image"
          />
          <label htmlFor="form4Example2">Image</label>
        </div>
        <img src={profilePicture} alt="" />
        <button type="submit">
          {loading ? "Creating Nominee" : "Create Nominee"}
        </button>
      </form>
      <div style={{marginTop: "40px"}}>
        {}
      </div>
    </div>
  );
};

export default CreateNominee;

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://sondeka-voting-api.cyclic.app/categories/allCategories"
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
