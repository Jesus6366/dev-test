import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [randomPicture, setRandomPicture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    // Manually removing user data from localStorage and navigating away
    localStorage.removeItem("user");
    navigate("/"); // Redirect to login page after logout
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Convert to number if the input type is "number"
    const formattedValue = type === "number" ? parseInt(value, 10) : value;
    // If the field is nested, split it into an array of keys
    const keys = name.split(".");
    if (keys.length > 1) {
      setUpdatedUser((prevUser) => ({
        ...prevUser,
        [keys[0]]: {
          ...prevUser[keys[0]],
          [keys[1]]: formattedValue,
        },
      }));
    } else {
      setUpdatedUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    console.log("Saving user:", updatedUser);
    try {
      // api call to update user
      const response = await fetch(
        `http://localhost:5000/api/users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
      if (response.ok) {
        const updatedUser = await response.json();
        // Update state
        setUser(updatedUser);
        // setUpdatedUser(updatedUser);

        // Update localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Exit editing mode
        setIsEditing(false);
      } else {
        console.log("Error updating user data ");
      }
    } catch (error) {
      console.log("Error saving user data", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedUser(user);
  };

  // Show a loading until user is set
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src={randomPicture || user.picture}
          alt="User Avatar"
          className={styles.picture}
        />
        <div className={styles.balanceContainer}>
          <p className={styles.balance}>Balance {user.balance}</p>
          {!isEditing && (
            <button className={styles.btn} onClick={handleEdit}>
              Edit
            </button>
          )}
        </div>
      </div>

      <div className={styles.profileContainer}>
        {isEditing ? (
          <>
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
                <button className={styles.btn} onClick={handleSave}>
                  Save
                </button>
                <button className={styles.btn} onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.profileDetails}>
              <ul className={styles.profileList}>
                <li>Name: {user.name.first + " " + user.name.last}</li>
                <li>Email: {user.email}</li>
                <li>Phone: {user.phone}</li>
                <li>Address: {user.address}</li>
                <li>Age: {user.age}</li>
                <li>Eye Color: {user.eyeColor}</li>
                <li>Company: {user.company}</li>
              </ul>
            </div>
          </>
        )}
      </div>

      <div className={styles.logoutButtonContainer}>
        <button className={styles.btn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
