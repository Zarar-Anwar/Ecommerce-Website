import { useContext } from "react";
import Card  from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Checkoutstep from "../component/Checkoutstep";
import { Store } from "../store";


export default function PlaceorderScreen(){
    const {state,dispatch}=useContext(Store)
    const {cart,UserInfo}=state
    const navigate=useNavigate()
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
                           <strong>Name :</strong>{cart.shippingaddress.fullname} <br />
                           <strong>Address :</strong>{cart.shippingaddress.address},
                           {cart.shippingaddress.city},{cart.shippingaddress.postalcode},
                           {cart.shippingaddress.country}
                        </Card.Text>
                        <Link to='/shipping'>Edit</Link>
                </Card.Body>
            </Card>
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Method</Card.Title>
                    <Card.Text>
                        <strong>Method :</strong>{cart.paymentMethod}
                    </Card.Text>
                    <Link to="/paymentmethod">Edit</Link>
                </Card.Body>
            </Card>
           </Col>
         </Row>
          
        </>
    )
}