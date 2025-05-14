import React, { useEffect, useState } from 'react';
import '../Header/Navbar.css';
import Nav_logo from '../../Assets/shopping.jpg';
import { auth, db } from '../../Action/firebase'; // Adjust the path as per your project structure
import { getDoc, doc } from "firebase/firestore";
import '@fortawesome/fontawesome-free/css/all.min.css';


const Navbar = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const uid = user.uid;
          try {
            const userDoc = await getDoc(doc(db, "users", uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUserData(userData);
            } else {
              console.log("No such document!");
            }
          } catch (error) {
            console.error("Error fetching user data: ", error);
          }
        }
      });
    };

    fetchUserData();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className='Nav_logo'>
          <img src={Nav_logo} alt="Logo" />
        </div>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/Home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/mens">Mens</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Womens</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Beauty</a>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <ul className="navbar-nav profile-icon">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {userData ? (
                  <>
                     <i className="fas fa-user mx-1"></i>
                    Hi, {userData.name}
                  </>
                ) : (
                  <i className="fas fa-user mx-1"></i>
                )}
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="/MyAccount" id="userAccount">My account</a></li>
                <li><a className="dropdown-item" href="/" id="logoutButton">Log out</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
