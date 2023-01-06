import axios from "axios"
import { useContext, useEffect, useReducer } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Rating from "../component/Rating"
import Button from "react-bootstrap/esm/Button"
import { Helmet } from "react-helmet-async"
import { CircularProgress} from "@mui/material"
import MessageBox from "../component/MessageBox"
import { getError } from "./utilis"
import { Store } from '../store';



const reducer=(state,action)=>{
  switch(action.type){
     case "FETCH_REQUEST":
     return{...state,loading:true}
     case "FETCH_SUCCES":
     return{...state,loading:false,product:action.payload}
     case "FETCH_FAILED":
     return{...state,loading:false,error:action.payload} 
     default:
     return " "  
   }
}
const initialState={
  product:[],
  loading:true,
  error:''
}

function ProductScreen() {
  const navigate=useNavigate()
  const params=useParams()
  const {slug}=params
  const [{loading,error,product},dispatch]=useReducer(reducer,initialState)  
  useEffect(()=>{
    const fetchData=async()=>{
      dispatch({type:"FETCH_REQUEST"})
      try {
        const result=await axios.get(`/product/${slug}`)
        dispatch({type:"FETCH_SUCCES",payload:result.data})
      } catch (error) {
        dispatch({type:"FETCH_FAILED",payload:getError(error)})
      }
    }
    fetchData()
  },[slug])
 
  const {state,dispatch:ctxDispatch}=useContext(Store)
  const {cart}=state
  const addcarthandler=async()=>{
     
     const existItem=cart.cartItems.find((x)=> x._id===product._id)
     const quantity=existItem?existItem.quantity+1:1
     try {
       const data=await axios.get(`/product/${product._id}`)
       if(data.countInStock<quantity)
       {
        window.alert("Sorry Product is out of Stock")
       }
     } catch (error) {
      console.log(error)
     }
     ctxDispatch({type:"ADD_ITEM_CART",payload:{...product,quantity}})
     navigate('/cart')
  }
  return (
    loading?<div className="text-center"><CircularProgress/></div>:
    error?<MessageBox variant='error' children={error}></MessageBox>:
    <div className="row-margin">
      <Row>
        <Col md={6} >
        <img  className="img" src={product.image} alt={product.name} ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet><title>{product.name}</title></Helmet>
              <h1>{product.name}</h1> </ListGroup.Item>
            <ListGroup.Item> <Rating rating={product.rating} reviews={product.numReviews}/></ListGroup.Item>
            <ListGroup.Item>Prices $ <strong>{product.prices}</strong></ListGroup.Item>
            <ListGroup.Item>Description <p>{product.description}</p></ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
              <Row>
                <Col>Price :</Col>
                <Col> <strong>{product.prices}</strong></Col>
              </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status :</Col>
                    <Col>{product.countInStock>0?<Badge bg="success">In Stock</Badge>:<Badge bg="danger">UnAvailable</Badge>}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {product.countInStock>0 && (<div className="d-grid">
                 <Button onClick={addcarthandler} variant="warning">Add to cart</Button>
                  </div>)}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </div>
    )
}
export default ProductScreen
