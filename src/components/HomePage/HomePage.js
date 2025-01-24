import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, child } from 'firebase/database';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import Footer from "../Navbar/footer";
import Mens_banner from "../Assets/banner_mens.png";
import Womens_banner from "../Assets/banner_women.png";
import kids_banner from "../Assets/banner_kids.png";
import "./HomePage.css"

const HomePage = () => {
  const [womenProducts, setWomenProducts] = useState([]);
  const [menProducts, setMenProducts] = useState([]);
  const [kidProducts, setKidProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const dbRef = ref(getDatabase());
      try {
        const [womenSnapshot, menSnapshot, kidsSnapshot] = await Promise.all([
          get(child(dbRef, 'products/womens')),
          get(child(dbRef, 'products/mens')),
          get(child(dbRef, 'products/kids'))
        ]);

        if (womenSnapshot.exists()) {
          const data = womenSnapshot.val();
          const productsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setWomenProducts(productsArray);
        } else {
          console.log("No data available for women's products");
        }

        if (menSnapshot.exists()) {
          const data = menSnapshot.val();
          const productsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setMenProducts(productsArray);
        } else {
          console.log("No data available for men's products");
        }

        if (kidsSnapshot.exists()) {
          const data = kidsSnapshot.val();
          const productsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setKidProducts(productsArray);
        } else {
          console.log("No data available for kid's products");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  const scroll = (containerId, direction) => {
    const container = document.getElementById(containerId);
    const scrollDistance = direction === 'left' ? -200 : 200;
    container.scrollBy({ left: scrollDistance, behavior: 'smooth' });
  };

  return (
    <div>
      <Navbar />
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={Mens_banner} className="d-block w-100" alt="Mens Banner" />
          </div>
          <div className="carousel-item">
            <img src={Womens_banner} className="d-block w-100" alt="Womens Banner" />
          </div>
          <div className="carousel-item">
            <img src={kids_banner} className="d-block w-100" alt="Kids Banner" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container mt-4">
        <h1 className='women'  >Women's Section</h1>
        <div className="scroll-section position-relative">
          <button onClick={() => scroll("product-scroll-womens", 'left')} className="scroll-btn left">←</button>
          <div id="product-scroll-womens" className="product-scroll-container d-flex flex-nowrap overflow-hidden">
            {error && <div className="alert alert-danger">{error}</div>}
            {womenProducts.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card">
                  <img src={product.imageURL} className="card-img-top" alt={product.title} />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <Link to={`/product/${product.id}`} className="btn btn-primary">View Product</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => scroll("product-scroll-womens", 'right')} className="scroll-btn right">→</button>
        </div>
      </div>

      <div className="container mt-4">
        <h1>Men's Section</h1>
        <div className="scroll-section position-relative">
          <button onClick={() => scroll("product-scroll-mens", 'left')} className="scroll-btn left">←</button>
          <div id="product-scroll-mens" className="product-scroll-container d-flex flex-nowrap overflow-hidden">
            {error && <div className="alert alert-danger">{error}</div>}
            {menProducts.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card">
                  <img src={product.imageURL} className="card-img-top" alt={product.title} />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <Link to={`/product/${product.id}`} className="btn btn-primary">View Product</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => scroll("product-scroll-mens", 'right')} className="scroll-btn right">→</button>
        </div>
      </div>

      <div className="container mt-4">
        <h1>Kids' Section</h1>
        <div className="scroll-section position-relative">
          <button onClick={() => scroll("product-scroll-kids", 'left')} className="scroll-btn left">←</button>
          <div id="product-scroll-kids" className="product-scroll-container d-flex flex-nowrap overflow-hidden">
            {error && <div className="alert alert-danger">{error}</div>}
            {kidProducts.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card">
                  <img src={product.imageURL} className="card-img-top" alt={product.title} />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <Link to={`/product/${product.id}`} className="btn btn-primary">View Product</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => scroll("product-scroll-kids", 'right')} className="scroll-btn right">→</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
