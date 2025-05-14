import React, { useEffect, useState } from 'react';
import '../Navbar/Navbar.css';
import Nav_logo from '../Assets/shopping.jpg';
import { auth, db } from '../Action/firebase'; // Adjust the path as per your project structure
import { getDoc, doc } from "firebase/firestore";

import '@fortawesome/fontawesome-free/css/all.min.css';


import { searchProductsInDatabase } from '../Action/Search'; // Import the search function
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom'; // Make sure React Router is set up
import { useDispatch } from 'react-redux';
import { addToCart } from '../HomePage/cartslice';


const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

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

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const products = await searchProductsInDatabase(searchQuery); // Perform search
    if (products.length > 0) {
      setSearchResults(products); // Set search results to state
      navigate(`/ProductsList/ProductDetail/${products[0].id}`); // Navigate to the first matching product
    } else {
      alert("No products found");
    }
  };

  const handleNavigation = (productId) => {
    // Navigate to the product detail page with the dynamic product ID
    navigate(`/product/${productId}`);
  };

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
              <a className="nav-link active" aria-current="page" href="/womens">Womens</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/kids">Kids</a>
            </li>
          </ul>

          <form className="d-flex" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search input state
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>

          <button className="btn btn-outline-primary" type="button">
            <Link to="/cart" className="nav-link">
              <i className="fas fa-cart-shopping"></i> Cart
            </Link>
          </button>

          <div>
            {searchResults.map((product) => (
              <div key={product.id} onClick={() => handleNavigation(product.id)}>
                {product.name} {/* Display product name or any property */}
              </div>
            ))}
          </div>

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
