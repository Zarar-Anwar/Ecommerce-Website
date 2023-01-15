import { Alert, CircularProgress } from "@mui/material"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { PayPalButtons ,usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios"
import { useContext, useEffect, useReducer } from "react"
import {Link} from 'react-router-dom'
import { Helmet } from "react-helmet-async"
import { useNavigate, useParams } from "react-router-dom"
import MessageBox from "../component/MessageBox"
import { Store } from "../store"
import { getError } from "./utilis"
import ListGroup from "react-bootstrap/ListGroup"
import { toast } from "react-toastify";

const reducer=(state,action)=>{
  switch(action.type){
    case "FETCH_REQUEST":
        return {...state, loading:true, error:''}
    case "FETCH_SUCCESS":
        return {...state, loading:false, order:action.payload, error:''}
    case "FETCH_FAIL":
        return {...state, loading:false, error:action.payload}
    case "PAY_REQUEST":
        return{...state,loadingPay:true}    
    case "PAY_SUCCESS":
        return{...state,loadingPay:false,successPay:true}    
        case "PAY_FAIL":
            return{...state,loadingPay:false}    
        case "PAY_RESET":
            return{...state,loadingPay:false,successPay:false}    
        default:
        return state   
  }

}

export default function OrderScreen() {
    const navigate =useNavigate()
    const {state,dispatch:ctxDispatch}=useContext(Store)
    const {UserInfo}=state
    const [{isPending},paypalDispatch]=usePayPalScriptReducer()
    const params=useParams()
    const {id:orderID}=params
    const [{loading,error,order,loadingPay,successPay},dispatch]=useReducer(reducer,{  
        loading:true,
        order:{},
        error:'',
        loadingPay:false,
        successPay:false,
    })
    const createOrder=(data,actions)=>{
        return actions.order
        .create(
            {
                purchase_units:[
                    {
                        amount:{value:order.totalPrice}
                    },
                ],
            }
        )
        .then((orderID)=>{
            return orderID
        })
    }
    const onApprove=(data,actions)=>{
        return actions.order.capture().then(async function(details){
        try {
            dispatch({type:'PAY_REQUEST'})
            const {data}=await axios.put(`/order/${order._id}/pay`,details,
            {
                headers:{
                authorization:`Bearer ${UserInfo.token}`
                        }
             }
            )
            dispatch({
                type:"PAY_SUCCESS",payload:data
            })
            toast.success("Order is Paid")
        } catch (error) {
            dispatch({type:"PAY_FAIL",payload:getError(error)})
            toast.error(getError(error))          
        }
        })
    }
    const onError=(error)=>{
       toast.error(getError(error))
    }
    useEffect(()=>{
        const fetchOrder=async()=>{
            try {
                dispatch({
                    type:"FETCH_REQUEST"})
               const {data} =await axios.get(`/order/${orderID}`,
               {headers:{authorization: `Bearer ${UserInfo.token}`}})
               dispatch({type:"FETCH_SUCCESS",payload:data})     
            } catch (error) {
                dispatch({type:"FETCH_FAIL",payload:getError(error)})
            }
        }
        if(!UserInfo){
            navigate('/signin')
        }
        if(!order._id || successPay || (order._id && order._id!==orderID)){
           fetchOrder() 
           if(successPay){
            dispatch({type:"PAY_RESET"})
           }
        }else{
            const loadPaypalScript=async()=>{
                const {data:clientId}=await axios.get('/keys/paypal',{
                    headers:{authorization:`Bearer ${UserInfo.token}`}
                })
                paypalDispatch({
                    type:"resetOptions",
                    'client-id':clientId,
                    currency:'USD'
                })
                paypalDispatch({
                    type:'setLoadingStatus',value:'pending'
                })
            }
            loadPaypalScript()
        }
    },[UserInfo,navigate,order,orderID,paypalDispatch,successPay])
  return loading ? (<CircularProgress/> 
    ) : error ? (
    <Alert severity="error">{error}</Alert>
    ):(
     <div>
        <Helmet>
            <title>Order {orderID}</title>
        </Helmet>
        <h1 className="my-3">Order{orderID}</h1>
        <Row>
            <Col md={8}>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Shipping</Card.Title>
                        <Card.Text>
                            <strong>Name : </strong>{order.shippingaddress.fullname} <br />
                            <strong> Address : </strong>{order.shippingaddress.address},{order.shippingaddress.city}
                            ,{order.shippingaddress.postalcode},{order.shippingaddress.country}
                        </Card.Text>
                        {order.isDelivered? (
                            <MessageBox varaint='success'>Delivered At {order.deliveredAt}</MessageBox>
                        ):(
                            <MessageBox variant="danger">Not Delivered</MessageBox>
                        )
                    }
                    </Card.Body>
                </Card>
                <Card className="mb-3">
                    <Card.Body>
                     <Card.Title>Payment</Card.Title>
                     <Card.Text>
                        <strong>Payment Method : </strong>{order.paymentMethod}
                     </Card.Text>
                     {order.isPaid?(
                        <MessageBox varaint='success'>Paid at {order.paidAt}</MessageBox>
                        )
                        :(
                           <MessageBox varaint='danger'>Not Paid</MessageBox>
                        )
                     }
                    </Card.Body>
                </Card>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Item</Card.Title>
                        <ListGroup variant='flush'>
                            {order.orderItems.map((item)=>(
                                <ListGroup.Item key={item._id}>
                                      <Row className="align-items-center">
                                        <Col md={6}>
                                            <img src={item.image} alt={item.name}  className='img-fluid rounded img-thumbnail'/>
                                            <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={3}><span>{item.quantity}</span></Col>
                                        <Col md={3}>${item.price}</Col>
                                      </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body>

                </Card>
            </Col>
            <Col md={4}>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Order Summary</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            <ListGroup.Item></ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            <ListGroup.Item></ListGroup.Item>
                                <Row>
                                    <Col><strong>Total</strong></Col>
                                    <Col><strong>${order.taxPrice}</strong></Col>
                                </Row>
                              {!order.isPaid && (
                            <ListGroup.Item>
                                {isPending?(
                                <CircularProgress/>
                                ):(
                                  <div>
                                    <PayPalButtons
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                    onError={onError}
                                    >
                                    </PayPalButtons>
                                  </div>
                                )}
                                {loadingPay && (<CircularProgress/>)}
                            </ListGroup.Item>
                              )}  
                        </ListGroup>
                    </Card.Body>

                </Card>
            </Col>
        </Row>
     </div>
    )
  
}
