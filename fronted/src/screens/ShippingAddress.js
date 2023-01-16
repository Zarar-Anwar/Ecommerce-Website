import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState} from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Checkoutstep from "../component/Checkoutstep";
import { Store } from "../store";

export default function ShippingAddress() {
    const {state,dispatch}=useContext(Store)
    const {UserInfo,cart:{shippingaddress}}=state
    const [fullname,setFullname]=useState(shippingaddress.fullname)
    const [address,setAddress]=useState(shippingaddress.address)
    const [city,setCity]=useState(shippingaddress.city)
    const [postalcode,setPostalcode]=useState(shippingaddress.postalcode)
    const [country,setCountry]=useState(shippingaddress.country)
    const navigate=useNavigate()
   
    const submithandler=(e)=>{
      e.preventDefault()
      const data=new FormData(e.currentTarget)
      const actualData={
        fullname:data.get("fullname"),
        address:data.get("address"),
        city:data.get("city"),
        postalcode:data.get("postalcode"),
        country:data.get("country"),
      }     
      dispatch({
        type:"ADD_SHIPPING_ADDRESS",payload:actualData})
      localStorage.setItem("shippingaddress",JSON.stringify(actualData))   
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
        <Box sx={{p:3,m:3,maxWidth:'650px',width:'100%'}}  onSubmit={submithandler} textAlign='center' component="form" id="shipping_form">
        <h1>Shipping Address</h1>
                <TextField margin="normal" variant="filled" required  label='FullName' value={fullname} onChange={(e)=> setFullname(e.target.value)} id="fullname" name='fullname'  fullWidth   />
                <TextField margin="normal" variant="filled" required  label="Address" id="address"  value={address} onChange={(e)=> setAddress(e.target.value)} name='address' fullWidth />
                <TextField margin="normal" variant="filled" required  label="City" id="city" name='city' fullWidth  value={city} onChange={(e)=> setCity(e.target.value)} />
                <TextField margin="normal" variant="filled" required  label="PostalCode" id="postalcode" name='postalcode'  value={postalcode} onChange={(e)=> setPostalcode(e.target.value)} fullWidth  />
                <TextField margin="normal" variant="filled" required  label="Country" id="country" name='country' fullWidth   value={country} onChange={(e)=> setCountry(e.target.value)}/>
        <Box textAlign="center" m={4}>
            <Button variant="contained" color="warning" type='submit'>Continue</Button>
        </Box>
        </Box>
       </Grid>
    </>
  )
}
