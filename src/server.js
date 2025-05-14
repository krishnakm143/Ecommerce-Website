const Razorpay = require("razorpay");
const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: 'rzp_test_zuojViwHzMBxTu', // Your Key ID
  key_secret: '62O56osPNEAm5HcJ14EWNUDS' // Your Key Secret
});

app.post('/verify', (req, res) => {
  const secret = '62O56osPNEAm5HcJ14EWNUDS'; // Your Key Secret

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id);
  const digest = shasum.digest("hex");

  if (digest === req.body.razorpay_signature) {
    res.json({ status: "success", message: "Payment verified successfully" });
  } else {
    res.status(400).json({ status: "failure", message: "Payment verification failed" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
