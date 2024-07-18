import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import { db } from '../..//Action/firebase'; // Adjust the path as needed
import { collection, query, where, getDocs } from 'firebase/firestore';

const Mens = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMensProducts = async () => {
    try {
      const products = [];
      const q = query(collection(db, 'products'), where('category', '==', 'men'));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching documents.");
        setLoading(false);
        return;
      }

      querySnapshot.forEach((doc) => {
        const product = doc.data();
        console.log("Product fetched: ", product); // Log each fetched product

        // Check if imageUrl is present and valid
        if (!product.imageUrl) {
          console.error(`No imageUrl for product: ${product.name}`);
        }

        products.push({
          id: doc.id,
          ...product
        });
      });

      setProducts(products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products: ", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMensProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Navbar />
      <div id="products">
        {products.map(product => (
          <div key={product.id} className="product">
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} />
            ) : (
              <p>No image available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mens;
