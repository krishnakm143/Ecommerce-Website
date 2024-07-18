import React from 'react';
import insta from '../Assets/Instagram_logo_2022.svg.webp';
import youtube from '../Assets/download.jpeg';
import arrow from '../Assets/arrow.png';
import Nav_logo from '../Assets/shopping.jpg';
import '../Navbar/footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footerWrap footer-bg">
        <div className="footer-content">
          <div className="row">
            <div className="col-md-3 ftr-about">
              <div className="ftr-site-logo">
                <figure>
                  <a href="#"><img src={Nav_logo} alt="Footer Logo" /></a>
                </figure>
              </div>
              <div className="ftr-contact">
                <div className="social">
                  <h5>CONNECT WITH US</h5>
                  <ul>
                    <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><img src={insta} alt="Instagram" /></a></li>
                    <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><img src={youtube} alt="YouTube" /></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-8 ftr-links">
              <div className="row">
                <div className="col-6">
                  <div className="links-blk">
                    <h4 className="l-title">about us</h4>
                    <ul>
                      <li><a href="our-story">our story</a></li>
                      <li><a href="career">careers</a></li>
                      <li><a href="terms-of-service">terms & conditions</a></li>
                      <li><a href="privacy-policy">privacy policy</a></li>
                      <li><a href="blog">blogs</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-6">
                  <div className="links-blk">
                    <h4 className="l-title">customer care</h4>
                    <ul>
                      <li><a href="faq">faq</a></li>
                      <li><a href="shipping-policy">shipping</a></li>
                      <li><a href="returns-and-refund">return & exchange</a></li>
                      <li><a href="contact-us">contact us</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 ftr-newsletter">
              <div className="form-blk">
                <h4>You’ve Got Mail…</h4>
                <div className="input01">
                  <input type="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder="Email Address" className="ng-untouched ng-pristine ng-invalid" />
                  <div className="submit-btn">
                    <img src={arrow} alt="Submit" />
                  </div>
                </div>
                <div className="mail-desc">Only if you want it, though! Subscribe to get early-bird access to new launches, promotions, and all things Fashion Brands.</div>
              </div>
            </div>
          </div>
          <div className="copy-right">
            <span>© 2024 shopping. All Rights Reserved.</span><br />
            
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
