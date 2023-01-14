import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect } from "react";
import Card  from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Checkoutstep from "../component/Checkoutstep";
import { Store } from "../store";


export default function PlaceorderScreen(){
    const {state,dispatch}=useContext(Store)
    const {cart,UserInfo}=state
    const navigate=useNavigate()
    const round2 = (num)=> Math.round(num * 100 + Number.EPSILON)/100

    cart.itemsPrice=round2(cart.cartItems.reduce((a,c) => a+c.quantity*c.prices,0)) 
    cart.shippingPrice=cart.itemsPrice>100?round2(0):round2(10)
    cart.taxPrice=round2(0.15*cart.itemsPrice)
    cart.totalPrice=cart.itemsPrice+cart.shippingPrice+cart.taxPrice
    const placeOrderHandler=async()=>{
        
    }
    useEffect(()=>{
        if(!cart.paymentMethod){
            navigate('/paymentmethod')
        }
    },[cart,navigate])
    return (
        <>
         <Checkoutstep step1 step2 step3 step4></Checkoutstep>
         <Helmet>
            <title>Preview Order</title>
         </Helmet>
         <h1 className="my-3 ">Preview Order</h1>
         <Row>
           <Col md={8}>
            <Card className='mb-3'>
                <Card.Body>
                    <Card.Title>Shipping</Card.Title>
                        <Card.Text>
                           <strong>Name : </strong><b>{cart.shippingaddress.fullname} </b><br />
                           <strong>Address : </strong> <b> {cart.shippingaddress.address},
                           {cart.shippingaddress.city},{cart.shippingaddress.postalcode},
                           {cart.shippingaddress.country}</b>
                        </Card.Text>
                        <Link to='/shipping'>Edit</Link>
                </Card.Body>
            </Card>
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Method</Card.Title>
                    <Card.Text>
                        <strong>Method :</strong> <b> {cart.paymentMethod}</b>
                    </Card.Text>
                    <Link to="/paymentmethod">Edit</Link>
                </Card.Body>
            </Card>
            <Card className="'mb-3">
                <Card.Body>
                      <Card.Title>Items</Card.Title>
                      <ListGroup variant='flush'>
                        {cart.cartItems.map((item)=>(
                            <ListGroup.Item key={item._id}>
                              <Row className="align-items-center">
                              <Col md={6}>
                                <img src={item.image} alt={item.name} className='img-fluid rounded img-thumbnail'/>
                              {" "}<Link to={`/product/${item.slug}`}>{item.name}</Link>
                              </Col>
                              <Col md={3}><span>{item.quantity}</span></Col>
                              <Col md={3}>${item.prices}</Col>
                              </Row>
                            </ListGroup.Item>
                        ))}
                      </ListGroup>
                      <Link to='/cart'>Edit</Link>
                </Card.Body>
            </Card>
           </Col>
           <Col md={4}>
            <Card>
                <Card.Body>
                    <Card.Title>Order Summary</Card.Title>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>$ {cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>$ {cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>$ {cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col><strong>Order Total</strong></Col>
                                <Col> <strong>$ {cart.totalPrice}</strong></Col>
                            </Row>
                        </ListGroup.Item>
                        <Box  alignText='center' className='d-grid mt-3'>
                        <Button type='button' onClick={placeOrderHandler} disabled={cart.cartItems.length===0} variant="contained" color='warning'>Place Order</Button>
                        </Box>
                    </ListGroup>
                </Card.Body>
            </Card>
           </Col>
         </Row>
          
        </>
    )
}