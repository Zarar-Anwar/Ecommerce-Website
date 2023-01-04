import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Rating from './Rating';

function Product(props) {
const {product}=props
  return (
    <>
       <Card   className="product">
          <Link to={`/product/${product.slug}`} >
          <img src={product.image} alt={product.name}/>
          </Link>
          <Card.Body className='product-info'>
          <Link to={`/product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating rating={product.rating} reviews={product.numReviews} />
          <Card.Text>${product.prices}</Card.Text>
          <Button className='cart-btn'>Add to cart</Button>
          </Card.Body>
          </Card>
    </>
  )
}

export default Product
