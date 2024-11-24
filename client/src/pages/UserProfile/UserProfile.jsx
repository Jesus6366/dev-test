import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [randomPicture, setRandomPicture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState();
  const navigate = useNavigate({
    name: { first: "", last: "" },
    email: "",
    phone: "",
    address: "",
    age: "",
    eyeColor: "",
    company: "",
  });

  useEffect(() => {
    // retriving the user data saved in localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser) {
      navigate("/");
    } else {
      setUser(loggedInUser);
      setUpdatedUser(loggedInUser);
    }
  }, [navigate]);

  useEffect(() => {
    // fetching random picture from RandomUser APi

    const fetchRandomPicture = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?gender=male");
        const data = await response.json();
        console.log(data);

        setRandomPicture(data.results[0].picture.large);
      } catch (err) {
        console.log("Error fetching data", err);
      }
    };
    fetchRandomPicture();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  // Show a loading until user is set
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img
        src={randomPicture || user.picture}
        alt="User Avatar"
        className={styles.picture}
      />
      {isEditing ? (
        <div>
          <div className={styles.editForm}>
            <div className={styles.inputGroup}>
              <label>First Name:</label>
              <input
                type="text"
                name="name.first"
                value={updatedUser.name.first}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Last Name:</label>
              <input
                type="text"
                name="name.last"
                value={updatedUser.name.last}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={updatedUser.phone}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={updatedUser.address}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={updatedUser.age}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Eye Color:</label>
              <input
                type="text"
                name="eyeColor"
                value={updatedUser.eyeColor}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Company:</label>
              <input
                type="text"
                name="company"
                value={updatedUser.company}
                onChange={handleChange}
              />
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div>{user.balance}</div>
            <button onClick={handleEdit}>Edit</button>
          </div>
          <div className={styles.profileContainer}>
            <p>Name: {user.name.first + " " + user.name.last}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {user.address}</p>
            <p>Age: {user.age}</p>
            <p>Eye Color: {user.eyeColor}</p>
            <p>Company: {user.company}</p>
            {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
