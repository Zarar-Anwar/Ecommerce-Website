import { Alert, Card, CircularProgress } from "@mui/material"
import axios from "axios"
import { useContext, useEffect, useReducer } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate, useParams } from "react-router-dom"
import CartData from "../cartData"
import MessageBox from "../component/MessageBox"
import { Store } from "../store"
import { getError } from "./utilis"

const reducer=(state,action)=>{
  switch(action.type){
    case "FETCH_REQUEST":
        return {...state, loading:true, error:''}
    case "FETCH_SUCCESS":
        return {...state, loading:false, order:action.payload, error:''}
    case "FETCH_FAIL":
        return {...state, loading:false, error:action.payload}
     default:
        return state   
  }

}

export default function OrderScreen() {
    const navigate =useNavigate()
    const {state,dispatch:ctxDispatch}=useContext(Store)
    const {UserInfo}=state
    const params=useParams()
    const {id:orderID}=params
    const [{loading,error,order},dispatch]=useReducer(reducer,{  
        loading:true,
        order:{},
        error:''
    })
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
        if(!order._id || (order._id && order._id!==orderID)){
           fetchOrder() 
        }
    },[UserInfo,navigate,order,orderID])
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
                        <Cart.Text>
                            <strong>Name : </strong>{order.shippingaddress.fullname} <br />
                            <strong> Address : </strong>{order.shippingaddress.address},{order.shippingaddress.city}
                            ,{order.shippingaddress.postalcode},{order.shippingaddress.country}
                        </Cart.Text>
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
            </Col>
        </Row>
     </div>
    )
  
}
