import { Box } from "@mui/system";
import { useContext } from "react"
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom";
import MessageBox from "../component/MessageBox";
import { Store } from '../store';
import CartData from "../cartData";



function CartScreen() {
const {state,dispatch:ctxDispatch}=useContext(Store)
const {
    cart:{cartItems},
}=state
console.log(cartItems.length)
return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <Box sx={{fontSize:'40px',fontWeight:'Bold',m:4}} textAlign='center'>
      Shoping Cart
      </Box> 
      <Row>
        <Col md={8} >
            {cartItems.length===0 ? ( 
            <MessageBox>Cart is Empty <Link to="/">{"    "} Go Shopping</Link></MessageBox>
            )
            :(
              <CartData/>
            )
            
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
