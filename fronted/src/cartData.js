import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"
import ListGroup from "react-bootstrap/ListGroup"
import { useContext } from "react"
import { Store } from "./store"
import axios from "axios"

function CartData(){
    const {state,dispatch}=useContext(Store)
    const {
        cart:{cartItems},
    }=state
    const updateItem=async(item,quantity)=>{
    const {data}=await axios.get(`/products/${item._id}`)
    if(data.countInStock<0)
    {
      window.alert("Sorry Product Out of Stock")
    }
    dispatch({
        type:"ADD_ITEM_CART",payload:{...item,quantity}
    })
    }
    
    const deleteitem=(item)=>{
        dispatch({
        type:"REMOVE_ITEM",payload:item
     })
    }
    return (
        <>
        <ListGroup>
                 {cartItems.map((item)=>(
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
                                <Button onClick={()=>{
                                    updateItem(item,item.quantity+1)
                                }} variant="light" disabled={item.quantity===item.countInStock}>
                                    <i className="fas fa-plus-circle"></i>
                                </Button>{" "}
                                <span>{item.quantity}</span>{" "}
                                <Button onClick={()=>{
                                    updateItem(item,item.quantity-1)
                                }} variant="light" disabled={item.quantity===1}>
                                    <i className="fas fa-minus-circle"></i>
                                </Button>
                            </Col>
                            <Col md={3}>
                                ${item.prices}
                            </Col>
                            <Col md={2}><Button onClick={()=>deleteitem(item)} 
                            variant="light"><i className="fas fa-trash"></i></Button></Col>
                        </Row>
                    </ListGroup.Item>
                    
                 ))}
                </ListGroup>
        </>
    )
}

export default CartData