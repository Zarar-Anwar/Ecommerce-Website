import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Checkoutstep from "../component/Checkoutstep";
import { Store } from "../store";

export default function ShippingAddress() {
    const {state,dispatch}=useContext(Store)
    const {UserInfo,cart:{shippingaddress}}=state
    const [fullname,setFullname]=useState("")
    const [address,setAddress]=useState("")
    const [city,setCity]=useState("")
    const [postalcode,setPostalcode]=useState("")
    const [country,setCountry]=useState("")
    const navigate=useNavigate()
    const submithandler=(e)=>{
      e.preventDefault()
      const data=new FormData(e.currentTarget)
      const actualData={
        setFullname:data.get('fullname'),
        setAddress:data.get('address'),
        setCity:data.get('city'),
      setPostalcode:data.get('postalcode'),
      setCountry:data.get('country')
      }
      console.log(fullname,address,city,postalcode,country)
       dispatch({
        type:"ADD_SHIPPING_ADDRESS",payload:{
            fullname,
            address,
            city,
            postalcode,
            country
        }
       })
       console.log()
       localStorage.setItem("shippingaddress",JSON.stringify({
        fullname,
        address,
        city,
        postalcode,
        country
    }))
       navigate('/paymentmethod')
    }   
    useEffect(()=>{
        if(!UserInfo)
        {
            navigate('/signin?redirect=/shipping')
        }
    },[UserInfo,navigate])
  return (
    <>
      <Helmet><title>Shipping Address</title></Helmet>
      <Checkoutstep step1 step2></Checkoutstep>
       <Grid container justifyContent="center" sx={{width:"100"}}>
        <Box sx={{p:3,m:3,maxWidth:'650px'}}  onSubmit={submithandler} textAlign='center' component="form" id="shipping_form">
        <h1>Shipping Address</h1>
                <TextField margin="normal" variant="filled" required  label="Fullname" id="fullname" name='fullname' value={shippingaddress?shippingaddress.fullname:" "} fullWidth   />
                <TextField margin="normal" variant="filled" required  label="Address" id="address" name='address' fullWidth value={shippingaddress?shippingaddress.address:" "}  />
                <TextField margin="normal" variant="filled" required  label="City" id="city" name='city' fullWidth  value={shippingaddress?shippingaddress.city:" "}/>
                <TextField margin="normal" variant="filled" required  label="Postal Code" id="postalcode" name='postalcode' fullWidth  value={shippingaddress?shippingaddress.postalcode:" "}/>
                <TextField margin="normal" variant="filled" required  label="Country" id="country" name='country' fullWidth  value={shippingaddress?shippingaddress.country:" "}/>
        <Box textAlign="center" m={4}>
            <Button variant="contained" color="warning" type='submit'>Continue</Button>
        </Box>
        </Box>
       </Grid>
    </>
  )
}
