import {  Alert, Button, Grid, TextField } from "@mui/material"
import { Box } from "@mui/material"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import { Store } from '../store';
import { Helmet } from "react-helmet-async"
import { useContext, useEffect, useState } from "react";


export default function SignupScreen() {
    const [error,setError]=useState({
        status:false,
        msg:"",
        type:""
    })
    const {search}=useLocation()
    const redirectInUrl=new URLSearchParams(search).get('redirect')
    const redirect =redirectInUrl?redirectInUrl:'/'
    const navigate=useNavigate()
    const {state,dispatch}=useContext(Store)
    const {UserInfo}=state
    const signuphandler=async(e)=>{
    e.preventDefault()
const Fdata=new FormData(e.currentTarget)
const actualData={
    name:Fdata.get('name'),
    email:Fdata.get('email'),
    password:Fdata.get('password'),
    confirmpassword:Fdata.get('confirmpassword'),
}
try {
    const {data}=await axios.post("/userReg",actualData)
    dispatch({
        type:"USER_SIGNUP",payload:data
    })
    localStorage.setItem("UserInfo",JSON.stringify(data))
    navigate(redirect || "/")
} catch (error) {
    setError({status:true,msg:error.message,type:'error'})
  }
 }
 useEffect(()=>{
  if(UserInfo){
    navigate(redirect)
  }
 },[navigate,redirect,UserInfo])



  return (
    <>
      <Helmet>
       <title>SignUp</title>
      </Helmet>
      <Grid container justifyContent='center' >
        <Box padding={3} border={1} borderColor='divider' textAlign='center' maxWidth='650px' onSubmit={signuphandler} component="form" id='signup-form'>
            <h1>Registration Form</h1>
           <TextField variant="filled" label='Name' margin='normal' fullWidth id='name' required name='name'/>
           <TextField variant="filled" label='Email' margin='normal' fullWidth id='email' required name='email'/>
           <TextField variant="filled" label='Password' margin='normal' fullWidth id='password' required name='password'type='password'/>
           <TextField variant="filled" label='ConfirmPassword' margin='normal' fullWidth id='confirmpassword' required name='confirmpassword' type='password'/>
           <Box textAlign='center' sx={{m:3}}>
            <Button color='warning' type='submit' variant='contained'>SignUp</Button>
           </Box>
           <Link to='/signin'>Already Have Account</Link>
           {error.status?<Alert severity={error.type}>{error.msg}</Alert>:" "}
        </Box>
      </Grid>
    </>
  )
}
