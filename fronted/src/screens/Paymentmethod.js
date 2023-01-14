import { Button,Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Helmet } from "react-helmet-async";
import Form from 'react-bootstrap/Form'
import {  useNavigate } from "react-router-dom";
import Checkoutstep from "../component/Checkoutstep";
import { useContext, useEffect, useState } from "react";
import { Store } from "../store";

export default function Paymentmethod(){
    
    const {state,dispatch}=useContext(Store)
    const {cart:{shippingaddress,paymentMethod}}=state
    const navigate=useNavigate()
    const [paymentmethod,setPaymentmethod]=useState(paymentMethod|| "paypal")
    useEffect(()=>{
        if(!shippingaddress)
        {
            navigate('/shipping')
        }
    },[shippingaddress,navigate])
    
    const paymenthandler=(e)=>{
        e.preventDefault()
        dispatch({
            type:"ADD_PAYMENT_METHOD",payload:paymentmethod
           })
           localStorage.setItem("paymentMethod",paymentmethod)
          navigate('/orderplace')
    }
    return (
        <>
        
        <Helmet><title>Payment Method</title></Helmet>
        <Checkoutstep step1 step2 step3></Checkoutstep>
        <Grid container justifyContent="center">
          <Form onSubmit={paymenthandler}>
            <h1 className="m-5">Payment Method</h1>
            <div className="mb-3">

             <Form.Check 
             type="radio"
             id='paypal'
             label='Paypal'
             value='Paypal'
             checked={paymentmethod==='Paypal'}
             onChange={(e)=> setPaymentmethod(e.target.value)}
             />
            </div>
            <div className="mb-3">
             <Form.Check 
             type="radio"
             id='stripe'
             label='Stripe'
             value='Stripe'
             checked={paymentmethod==='Stripe'}
             onChange={(e)=> setPaymentmethod(e.target.value)}
             />
            </div>
            <Box m={3} textAlign='center'>
                <Button type='submit' color='warning' variant="contained">Continue</Button>
            </Box>
          </Form>
        </Grid>
        </>
    )
}