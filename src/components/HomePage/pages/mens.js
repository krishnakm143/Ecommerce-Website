import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, child } from 'firebase/database';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from 'react-router-dom';
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Navbar/footer";
import Mens_banner from "../../Assets/banner_mens.png";
import "./mens.css"

const MensPage = () => {
  const [menProducts, setMenProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenProducts = async () => {
      const dbRef = ref(getDatabase());
      try {
        const menSnapshot = await get(child(dbRef, 'products/mens'));

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
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMenProducts();
  }, []);



  return (
    <div>
      <Navbar />
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={Mens_banner} className="d-block w-100" alt="Mens Banner" />
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
        <h1>Men's Section</h1>
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

      <Footer />
    </div>
  );
};

export default MensPage;
