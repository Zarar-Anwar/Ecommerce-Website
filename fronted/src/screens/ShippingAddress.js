import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect} from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Checkoutstep from "../component/Checkoutstep";
import { Store } from "../store";

export default function ShippingAddress() {
    const {state,dispatch}=useContext(Store)
    const {UserInfo,cart:{shippingaddress}}=state
    // const [fullname,setFullname]=useState("")
    // const [address,setAddress]=useState("")
    // const [city,setCity]=useState("")
    // const [postalcode,setPostalcode]=useState("")
    // const [country,setCountry]=useState("")
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
                <Typography mt={2} textAlign='left'>Full Name</Typography>
                <TextField margin="normal" variant="filled" required  label={shippingaddress?shippingaddress.fullname:"Fullname"} id="fullname" name='fullname'  fullWidth   />
                <Typography textAlign='left'>Address</Typography>
                <TextField margin="normal" variant="filled" required  label={shippingaddress?shippingaddress.address:"Address"} id="address" name='address' fullWidth />
                <Typography textAlign='left'>City</Typography>
                <TextField margin="normal" variant="filled" required  label={shippingaddress?shippingaddress.city:"City"} id="city" name='city' fullWidth  />
                <Typography textAlign='left'>PostalCode</Typography>
                <TextField margin="normal" variant="filled" required  label={shippingaddress?shippingaddress.postalcode:"PostalCode"} id="postalcode" name='postalcode' fullWidth  />
                <Typography textAlign='left'>Country</Typography>
                <TextField margin="normal" variant="filled" required  label={shippingaddress?shippingaddress.country:"Country"} id="country" name='country' fullWidth  />
        <Box textAlign="center" m={4}>
            <Button variant="contained" color="warning" type='submit'>Continue</Button>
        </Box>
        </Box>
       </Grid>
    </>
  )
}
