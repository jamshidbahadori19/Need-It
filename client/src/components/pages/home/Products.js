
/* import Carousel from 'react-bootstrap/Carousel' */
import "./style.css"
function Product() {
  return (
    <div>
       <section class="container">
            <div class="slider-wrapper">
                <div class="slider">
                    <img alt="sliderphoto" id="slide-1" src="https://www.ukmodels.co.uk/wp-content/uploads/2015/08/shutterstock_266498825.jpg" />
                    <img alt="sliderphoto" id="slide-2" src="https://www.looklet.com/hubfs/models-2%20copy.jpg" />
                    <img alt="sliderphoto" id="slide-3" src="https://img.freepik.com/free-photo/portrait-handsome-confident-stylish-hipster-lambersexual-modelman-dressed-black-jacket-jeans-fashion-male-posing-studio-near-grey-wall_158538-24002.jpg" />
                </div>
                <div class="slider-nav">
                    <a href="#slide-1"></a>
                    <a href="#slide-2"></a>
                    <a href="#slide-3"></a>
                </div>
            </div>
    </section>
    </div> 
  );
}

export default Product;