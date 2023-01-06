import { Box } from "@mui/system";
import { useContext } from "react"
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Card from "react-bootstrap/esm/Card";
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom";
import MessageBox from "../component/MessageBox";
import { Store } from '../store';



function CartScreen() {
const {state,dispatch:ctxDispatch}=useContext(Store)
const {
    cart:{cartItems},
}=state
console.log(cartItems)
return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <Box sx={{fontSize:'40px',fontWeight:'Bold'}} textAlign='center'>
      Shoping Cart
      </Box> 
      <Row>
        <Col md={8}>
            {cartItems.length===0 ?(<MessageBox>Cart is Empty <Link to="/">{" "}Go Shopping</Link></MessageBox>):
                (<ListGroup>
                 {cartItems.map((item)=>{
                    <ListGroup.Item key={item._id}>
                        <Row className="align-items-center">
                            <Col md={4}>
                                <img  
                                src={item.image}
                                alt={item.name} 
                                className=' rounded img-thumbnail'> 
                                </img>{" "}
                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                            </Col>
                            <Col md={3}>
                                <Button variant="light" disabled={item.quantity===item.countInStock}>
                                    <i className="fas fa-minus-circle"></i>
                                </Button>{" "}
                                <span>{item.quantity}</span>{" "}
                                <Button variant="light" disabled={item.quantity===item.countInStock}>
                                    <i className="fas fa-plus-circle"></i>
                                </Button>
                            </Col>
                            <Col md={3}>
                                ${item.prices}
                            </Col>
                            <Col md={2}><Button variant="light"><i className="fas fa-trash"></i></Button></Col>
                        </Row>
                    </ListGroup.Item>
                    
                 })}
                </ListGroup>)
              }
        </Col>
        <Col md={4}>
            <Card>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                          <h4>
                            Subtotal({cartItems.reduce((a,c)=> a+c.quantity,0)})
                            items${cartItems.reduce((a,c)=> a+c.prices*c.quantity,0)}
                          </h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" variant="warning" disabled={cartItems.length===0}>
                            Proceed to CheckOut 
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
      </Row>


       
    </>
  )
}

export default CartScreen
