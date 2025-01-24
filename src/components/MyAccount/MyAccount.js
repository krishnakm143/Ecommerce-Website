import React, { useEffect, useState } from "react";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/footer";
import userprofile from "../../Assets/dummy-profile.png";
import "./MyAccount.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../../Action/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../Action/UserAction";

const MyAccount = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const uid = user.uid;
          try {
            const userDoc = await getDoc(doc(db, "users", uid));
            if (userDoc.exists()) {
              const data = userDoc.data();
              setUserData(data);
              dispatch(setUser({ ...user, ...data }));
              setLoading(false);
            }
          } catch (error) {
            console.error("Error fetching user data: ", error);
            setLoading(false);
          }
        }
      });
    };

    fetchUserData();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        await setDoc(doc(db, "users", uid), userData);
      console.log("Document successfully written!");
      alert("Save Changes successfully!")
      }
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <img
            src={userprofile}
            alt="Profile Picture"
            className="profile-pic"
          />
          <div className="profile-info">
            {!loading && (
              <>
                <h2>Hi, {userData.name}</h2>
                <p>{userData.email}</p>
              </>
            )}
          </div>
          <button className="edit-button">&#9998;</button>
        </div>
        <div className="profile-details">
          <div className="detail-row">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              id="username"
              name="name"
              value={loading ? "Loading..." : userData.name}
              onChange={handleChange}
            />
            <br />
          </div>
          <div className="detail-row">
            <label htmlFor="email">Email account</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loading ? "Loading..." : userData.email}
              onChange={handleChange}
            />
            <br />
          </div>
          <div className="detail-row">
            <label htmlFor="phone">Mobile number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={loading ? "" : userData.phone}
              placeholder="Add number"
              onChange={handleChange}
            />
            <br />
          </div>
          <div className="detail-row">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={loading ? "" : userData.location}
              placeholder="Add Location"
              onChange={handleChange}
            />
            <br />
          </div>
        </div>
        <button type="button" className="save-button" onClick={saveChanges}>
          Save Change
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default MyAccount;
