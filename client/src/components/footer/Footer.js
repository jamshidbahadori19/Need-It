

import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';
import "./FooterStyle.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_container">
          <div id="row">
              <div className="footer_col">
                  <h4>Online Store</h4>
                  <ul>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/productForm">Add Product</Link></li>
                      <li><Link to="/wishList">Wish-List</Link></li>
                  </ul>
              </div>
              <div className="footer_col" >
                  <h4>Follow us</h4>
                      <div className="social_links">
                          <a href="https://www.linkedin.com/in/jamshid-bahadori/"><LinkedInIcon/></a>
                          <a href="https://github.com/jamshidbahadori19"><GitHubIcon/></a>
                      </div>
              </div>
          </div>
      </div>  
    </footer>
  );
}

export default Footer;