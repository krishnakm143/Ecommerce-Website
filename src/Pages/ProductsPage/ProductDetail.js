import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, get, child } from 'firebase/database';
import Navbar from '../../components/Header/Navbar';
import Footer from '../../components/Footer/footer';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scroll(0, 0);

    const fetchProduct = async () => {
      const dbRef = ref(getDatabase());
      try {
        // Check in each category for the product
        const categories = ['kids', 'mens', 'womens'];
        let productFound = null;
        let categoryFound = null;

        for (const category of categories) {
          const path = `products/${category}/product${productId}`;
          console.log(`Checking path: ${path}`);
          const productSnapshot = await get(child(dbRef, path));
          if (productSnapshot.exists()) {
            productFound = productSnapshot.val();
            categoryFound = category;
            console.log(`Product found in path: ${path}`);
            break;
          }
        }

        if (productFound) {
          setProduct(productFound);

          // Fetch similar products from the same category
          const similarProductsSnapshot = await get(child(dbRef, `products/${categoryFound}`));
          if (similarProductsSnapshot.exists()) {
            const similarProductsArray = Object.keys(similarProductsSnapshot.val()).map(key => ({
              id: key,
              ...similarProductsSnapshot.val()[key]
            })).filter(p => p.id !== `product${productId}`);
            setSimilarProducts(similarProductsArray);
            console.log(`Similar products found: ${similarProductsArray.length}`);
          }
        } else {
          console.log("No data available for this product");
          setError("Product not found");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [productId]);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!product) {
    return <h1>Loading...</h1>;
  }

  const increaseQuantity = () => {
    const quantity = document.getElementById("quantity");
    quantity.value = parseInt(quantity.value) + 1;
  };

  const decreaseQuantity = () => {
    const quantity = document.getElementById("quantity");
    if (quantity.value > 1) {
      quantity.value = parseInt(quantity.value) - 1;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="product-detail">
        <div className="product-image-gallery">
          <div className="main-image">
            <img src={product.imageURL} alt={product.title} />
          </div>
          <div className="thumbnail-images">
            <img src={product.imageURL} alt={product.title} />
            <img src={product.imageURL} alt={product.title} />
            <img src={product.imageURL} alt={product.title} />
            <img src={product.imageURL} alt={product.title} />
          </div>
        </div>
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="product-size">Size: {product.size}</p>
          <p className="product-price">₹ {product.price}</p>
          <p className="product-description">{product.description}</p>
          <div className="product-quantity">
            <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
            <input type="text" id="quantity" value="1" readOnly />
            <button className="quantity-btn" onClick={increaseQuantity}>+</button>
          </div>
          <button className="buy-now-btn">BUY NOW</button>
          <button className="add-to-cart-btn">+ ADD TO CART</button>
          <div className="offers">
            <p>Offers</p>
            <ul>
              <li>Get Flat 400 off on your first order above 1699/-</li>
              <li>Free Shipping On Orders Above ₹499</li>
              <li>Get Flat 10% off on orders above 999/-</li>
            </ul>
          </div>
          <div className="product-additional-info">
            <p>Country Of Origin: {product.origin}</p>
           
          </div>
        </div>
      </div>
      <div className="similar-products">
        <h2>Similar Products</h2>
        <div className="similar-products-list">
          {similarProducts.map(similarProduct => (
            <div key={similarProduct.id} className="similar-product-item">
              <img src={similarProduct.imageURL} alt={similarProduct.title} />
              <h3>{similarProduct.title}</h3>
              <p>₹ {similarProduct.price}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
