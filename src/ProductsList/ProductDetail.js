// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getDatabase, ref, get, child } from 'firebase/database';
// import Navbar from '../components/Navbar/Navbar';
// import Footer from '../components/Navbar/footer';
// import '../ProductsList/ProductDetail.css';


// const ProductDetail = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [similarProducts, setSimilarProducts] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     window.scroll(0, 0);

//     const fetchProduct = async () => {
//       const dbRef = ref(getDatabase());
//       try {
//         // Check in each category for the product
//         const categories = ['kids', 'mens', 'womens'];
//         let productFound = null;
//         let categoryFound = null;

//         for (const category of categories) {
//           const path = `products/${category}/product${productId}`;
//           console.log(`Checking path: ${path}`);
//           const productSnapshot = await get(child(dbRef, path));
//           if (productSnapshot.exists()) {
//             productFound = productSnapshot.val();
//             categoryFound = category;
//             console.log(`Product found in path: ${path}`);
//             break;
//           }
//         }

//         if (productFound) {
//           setProduct(productFound);

//           // Fetch similar products from the same category
//           const similarProductsSnapshot = await get(child(dbRef, `products/${categoryFound}`));
//           if (similarProductsSnapshot.exists()) {
//             const similarProductsArray = Object.keys(similarProductsSnapshot.val()).map(key => ({
//               id: key,
//               ...similarProductsSnapshot.val()[key]
//             })).filter(p => p.id !== `product${productId}`);
//             setSimilarProducts(similarProductsArray);
//             console.log(`Similar products found: ${similarProductsArray.length}`);
//           }
//         } else {
//           console.log("No data available for this product");
//           setError("Product not found");
//         }
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   if (error) {
//     return <h1>{error}</h1>;
//   }

//   if (!product) {
//     return <h1>Loading...</h1>;
//   }

//   const increaseQuantity = () => {
//     const quantity = document.getElementById("quantity");
//     quantity.value = parseInt(quantity.value) + 1;
//   };

//   const decreaseQuantity = () => {
//     const quantity = document.getElementById("quantity");
//     if (quantity.value > 1) {
//       quantity.value = parseInt(quantity.value) - 1;
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="product-detail">
//         <div className="product-image-gallery">
//           <div className="main-image">
//             <img src={product.imageURL} alt={product.title} />
//           </div>
//           <div className="thumbnail-images">
//             <img src={product.imageURL} alt={product.title} />
//             <img src={product.imageURL} alt={product.title} />
//             <img src={product.imageURL} alt={product.title} />
//             <img src={product.imageURL} alt={product.title} />
//           </div>
//         </div>
//         <div className="product-info">
//           <h1>{product.title}</h1>
//           <p className="product-size">Size: {product.size}</p>
//           <p className="product-price">₹ {product.price}</p>
//           <p className="product-description">{product.description}</p>
//           <div className="product-quantity">
//             <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
//             <input type="text" id="quantity" value="1" readOnly />
//             <button className="quantity-btn" onClick={increaseQuantity}>+</button>
//           </div>
//           <button className="buy-now-btn">BUY NOW</button>
//           <button className="add-to-cart-btn">+ ADD TO CART</button>
//           <div className="offers">
//             <p>Offers</p>
//             <ul>
//               <li>Get Flat 400 off on your first order above 1699/-</li>
//               <li>Free Shipping On Orders Above ₹499</li>
//               <li>Get Flat 10% off on orders above 999/-</li>
//             </ul>
//           </div>
//           <div className="product-additional-info">
//             <p>Country Of Origin: {product.origin}</p>
           
//           </div>
//         </div>
//       </div>
//       <div className="similar-products">
//         <h2>Similar Products</h2>
//         <div className="similar-products-list">
//           {similarProducts.map(similarProduct => (
//             <div key={similarProduct.id} className="similar-product-item">
//               <img src={similarProduct.imageURL} alt={similarProduct.title} />
//               <h3>{similarProduct.title}</h3>
//               <p>₹ {similarProduct.price}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ProductDetail;
// src/components/ProductDetail/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, get, child } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { addToCart } from '../components/HomePage/cartslice'; // Import the action
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Navbar/footer';
import '../ProductsList/ProductDetail.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate



const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    window.scroll(0, 0);
    const fetchProduct = async () => {
      const dbRef = ref(getDatabase());
      try {
        const categories = ['kids', 'mens', 'womens'];
        let productFound = null;
        let categoryFound = null;

        for (const category of categories) {
          const path = `products/${category}/product${productId}`;
          const productSnapshot = await get(child(dbRef, path));
          if (productSnapshot.exists()) {
            productFound = productSnapshot.val();
            categoryFound = category;
            break;
          }
        }

        if (productFound) {
          setProduct(productFound);
          // Fetch similar products
          const similarProductsSnapshot = await get(child(dbRef, `products/${categoryFound}`));
          if (similarProductsSnapshot.exists()) {
            const similarProductsArray = Object.keys(similarProductsSnapshot.val()).map(key => ({
              id: key,
              ...similarProductsSnapshot.val()[key],
            })).filter(p => p.id !== `product${productId}`);
            setSimilarProducts(similarProductsArray);
          }
        } else {
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
  const handleSimilarProductClick = (similarProductId) => {
    navigate(`/product/${similarProductId}`); // Navigate to the selected product's detail page
  };
  const handleBuyNow = () => {
    navigate('/payment', { state: { productPrice: product.price, productName: product.title } });
  };
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

  const handleAddToCart = () => {
    const quantity = parseInt(document.getElementById("quantity").value);
    dispatch(
      addToCart({
        id: productId,
        title: product.title,
        price: product.price,
        imageURL: product.imageURL,
        quantity: quantity,
       
      })
    );
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
          <button className="buy-now-btn" onClick={handleBuyNow}>BUY NOW</button>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>+ ADD TO CART</button>
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
      {/* <div className="similar-products">
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
      </div> */}
      <div className="similar-products">
        <h2>Similar Products</h2>
        <div className="similar-products-list">
          {similarProducts.map(similarProduct => (
            <div 
              key={similarProduct.id} 
              className="similar-product-item" 
              onClick={() => handleSimilarProductClick(similarProduct.id)} // Add onClick handler
            >
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
