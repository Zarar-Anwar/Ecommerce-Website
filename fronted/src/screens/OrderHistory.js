import { CircularProgress } from "@mui/material";
import {Button} from '@mui/material'
import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MessageBox from "../component/MessageBox";
import { Store } from "../store";
import { getError } from "./utilis";

function reducer(state,actions)
{
    switch(actions.type){
        case "FETCH_REQUEST":
            return{...state,loading:true}
        case "FETCH_SUCCESS":
            return{...state,loading:false,orders:actions.payload}
        case "FETCH_FAIL":
            return{...state,error:actions.payload,loading:false}
        default :
        return state    
    }
}

export default function OrderHistory() {
   const navigate =useNavigate()
    const {state}=useContext(Store)
   const {UserInfo}=state
   const [{loading,error,orders},dispatch]=useReducer(reducer,{
    loading:false,
    error:""
   })
   useEffect(()=>{
    const fetch=async()=>{
      dispatch({type:"FETCH_REQUEST"})
      try {
        const {data}=await axios.get('/order/mine',{headers:{
            authorization:`Bearer ${UserInfo.token}`
        }})
        dispatch({type:"FETCH_SUCCESS",payload:data})
      } catch (error) {
        dispatch({type:"FETCH_FAIL",payload:getError(error)})
        toast.error(getError(error))
      }
    }
    fetch()
   },[dispatch])
    return (
    <div>
        <Helmet>
            <title>Order History</title>
        </Helmet>
        <h1>Order History</h1>
        {
         loading?(
            <CircularProgress/>
         ):(
            error?(
                <MessageBox variant='danger'>{error}</MessageBox>
            ):(
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                            </tr> 
                    </thead>
                    <tbody>
                     { orders ? (
                        orders.map((order)=>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid? order.paidAt.substring(0,10):'No'}</td>
                            <td>{order.isDelivered?order.deliveredAt.substring(0,10):"No"}</td>
                            <td><Button type="button" variant='contained' color='warning'
                             onClick={()=>{
                                navigate(`/order/${order._id}`)
                             }}>Details</Button></td>
                        </tr>
                        ))):(
                            <tr>
                                <td>No Orders Found</td>
                            </tr>
                            )
                     }
                    </tbody>
                </table>
            )
         )
        }
      
    </div>
  )
}
