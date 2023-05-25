

import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

function Footer() {
  return (
    <div style={{"box-shadow": "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"}}>
    <MDBFooter /* bgColor='light' */ className='text-center text-lg-start text-muted' style={{"marginTop":"30vh"}}>
      <section className='d-flex p-4 border-bottom'>

      </section>

      <section >
        <MDBContainer className='text-center text-md-start mt-2' style={{"box-shadow":" rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"}}>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                NEEDIT
              </h6>
              <p>
                In this website you are allowed to purchase, sell, exchange and even do marketing for your products.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Jeans
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Shirts
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  T-shirt
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Hoodies
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                Sweden, Stockholm
              </p>
              <p>
                jamshidbahadoriasd@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 4676757097
              </p>
              <a href='https://www.linkedin.com/in/jamshid-bahadori/' className='me-4 text-reset'>
              linkedin
              </a>
              <br/>
              <a href='https://github.com/jamshidbahadori19' className='me-4 text-reset'>
                github
              </a>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </MDBFooter>
    </div>
  );
}

export default Footer;