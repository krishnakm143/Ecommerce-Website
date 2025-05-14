// import React from 'react';
// import Navbar from './Navbar';
// import Footer from './footer';
// import '../Navbar/payment.css'
// const Payment = () => {
//   const handlePayment = () => {
//     const options = {
//       key: "rzp_test_zuojViwHzMBxTu", // Replace with your Key ID
//       amount: 50000, // Amount in paise (50000 = ₹500)
//       currency: "INR",
//       name: "Easy Shop",
//       description: "Test Transaction",
//       image: "https://example.com/your_logo", // Optional logo URL
//       handler: function (response) {
//         alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
//         // You can further process the payment confirmation here
//       },
//       prefill: {
//         name: "krishna",
//         email: "krshnac818@gmail.com",
//         contact: "8866226854",
//       },
//       notes: {
//         address: "Ajwa Road Vadodara",
//       },
//       theme: {
//         color: "#F37254",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   return (
// <div><Navbar/>
// <div>
// <h2>Complete Your Payment</h2>
// <button class="btn btn-outline-warning" onClick={handlePayment}>Pay Now</button>
// </div>
//   <Footer/>
//   </div>
 

    
        

//   );
  
// };

// export default Payment;
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation for accessing state
import Navbar from './Navbar';
import Footer from './footer';
import '../Navbar/payment.css';

const Payment = () => {
  const location = useLocation();
  const { totalPrice, productName } = location.state || {}; // Use totalPrice instead of productPrice

  if (!totalPrice) {
    return <h2>Error: No product selected for purchase</h2>;
  }

  const handlePayment = () => {
    const amountInPaise = totalPrice * 100; // Convert product price to paise (₹1 = 100 paise)
    const options = {
      key: "rzp_test_zuojViwHzMBxTu", // Replace with your Razorpay Key ID
      amount: amountInPaise, // Amount in paise
      currency: "INR",
      name: "Easy Shop",
      description: `Purchase of ${productName}`, // Dynamic product name
      image: "https://example.com/your_logo", // Optional logo URL
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        // You can further process the payment confirmation here
      },
      prefill: {
        name: "krishna",
        email: "krshnac818@gmail.com",
        contact: "8866226854",
      },
      notes: {
        address: "Ajwa Road Vadodara",
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <Navbar />
      <div className="payment-container">
        <h2>Complete Your Payment for {productName}</h2>
        <p className='paytext'>Amount to Pay: ₹ {totalPrice}</p> {/* Display the product price */}
        <button className="btn btn-outline-warning" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
