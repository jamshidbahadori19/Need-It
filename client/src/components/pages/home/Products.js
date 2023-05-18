
import Carousel from 'react-bootstrap/Carousel'
import "./style.css"
function Product() {
  return (
    <div className='main' style={{padding:20, justifyContent:"space-evenly"}}>
      <Carousel className='h-50 carousel' style={{width:1000}}>
      <Carousel.Item >
        <img
          className="d-block w-100"
          src="https://www.ukmodels.co.uk/wp-content/uploads/2015/08/shutterstock_266498825.jpg"
          alt="First slide"
          /* style={{height:500, objectFit:"cover"}} */
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.looklet.com/hubfs/models-2%20copy.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://img.freepik.com/free-photo/portrait-handsome-confident-stylish-hipster-lambersexual-modelman-dressed-black-jacket-jeans-fashion-male-posing-studio-near-grey-wall_158538-24002.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    
  );
}

export default Product;