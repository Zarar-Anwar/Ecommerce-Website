import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Rating from './Rating';
import { Store } from '../store';
import { useContext } from 'react';
import axios from 'axios';

function Product(props) {
const {product}=props
const {state,dispatch}=useContext(Store)
const {cart: {cartItems}}=state

const addcarthandler=async(product)=>{
 const existItems=cartItems.find((x)=>x._id===product._id)
 const quantity=existItems? existItems.quantity+1:1
 const {data}=await axios.get(`/products/${product._id}`)
 if(data.countInStock<quantity){
  window.alert("Sorry Product SoldOut")
  return
 }
  dispatch({
  type:"ADD_ITEM_CART",payload:{...product,quantity}
 
})
}
  return (
    <>
       <Card   className="product">
          <Link to={`/products/${product.slug}`} >
          <img src={product.image} alt={product.name}/>
          </Link>
          <Card.Body className='product-info'>
          <Link to={`/products/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating rating={product.rating} reviews={product.numReviews} />
          <Card.Text>${product.prices}</Card.Text>
          {
          (product.countInStock < product.quantity ? ( 
            <Button variant='light' disabled>Out of Stock</Button>
            ):(
              <Button onClick={()=> addcarthandler(product)} className='cart-btn'>Add to cart</Button>
              ))}
          </Card.Body>
          </Card>
    </>
  )
}

export default Product
