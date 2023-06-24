

import React from 'react';
import "./FooterStyle.css"

function Footer() {
  return (
    <footer class="footer">
      <div class="footer-container">
          <div class="row">
              <div class="footer-col">
                  <h4>Company</h4>
                  <ul>
                      <li><a href="#">About us</a></li>
                      <li><a href="#">our services</a></li>
                      <li><a href="#">privacy policy</a></li>
                      <li><a href="#">affiliate program</a></li>
                  </ul>
              </div>
              <div class="footer-col">
                  <h4>get Help</h4>
                  <ul>
                      <li><a href="#">FAQ</a></li>
                      <li><a href="#">shipping</a></li>
                      <li><a href="#">returns</a></li>
                      <li><a href="#">order status</a></li>
                      <li><a href="#">payment options</a></li>
                  </ul>
              </div>
              <div class="footer-col">
                  <h4>Online Store</h4>
                  <ul>
                      <li><a href="#">Watch</a></li>
                      <li><a href="#">Bag</a></li>
                      <li><a href="#">Shoes</a></li>
                      <li><a href="#">Dress</a></li>
                  </ul>
              </div>
              <div class="footer-col">
                  <h4>Follow us</h4>
                      <div class="social-links">
                          {/* <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                          <a href="#"><i class="fa-brands fa-twitter"></i></a>
                          <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                          <a href="#"><i class="fa-brands fa-instagram"></i></a> */}

                      </div>
              </div>
          </div>
      </div>  
    </footer>
  );
}

export default Footer;