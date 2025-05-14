import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, child } from 'firebase/database';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Navbar/footer";
import "../../HomePage/HomePage.css";

const Kids = () => {
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


            <div className="container mt-4">
                <h1>Kids' Section</h1>
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

            <Footer />
        </div>
    );
};

export default Kids;
