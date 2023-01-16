import { useContext, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../store";
import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { toast } from "react-toastify";
import { getError } from "./utilis";
import axios from "axios";

function reducer(state,actions){
    switch(actions.type){
        case "FETCH_REQUEST":
            return{...state,loadingUpdate:true}
        case "FETCH_SUCCESS":
            return{...state,loadingUpdate:false}
        case "FETCH_FAIL":
            return{...state,loadingUpdate:false}
        default :
        return state
    }
}

export default function UserProfile() {
    const {state,dispatch:ctxDispatch}=useContext(Store)
    const {UserInfo}=state
    const [name,setName]=useState(UserInfo.name)
    const [email,setEmail]=useState(UserInfo.email)
    const [password,setPassword]=useState('')
    const [password_confirm,setPasswordconfirm]=useState('')
    const [{loadingUpdate},dispatch]=useReducer(reducer,{
        loadingUpdate:false
    })
    const submithandler=async(e)=>{
    e.preventDefault()
    try {
        const {data}=await axios.put('/user/profile',{
            name,email,password
        },{
            headers:{authorization:`Bearer ${UserInfo.token}`}
        })
        dispatch({type:"FETCH_SUCCESS"})
        ctxDispatch({type:"USER_SIGNIN",payload:data})
        localStorage.setItem('UserInfo',JSON.stringify(data))
        toast.success("User  Updated Successfully")
    } catch (error) {
        dispatch({type:"FETCH_FAIL"})
        toast.error(getError(error))
    }
    }
  return (
    <>
      <Helmet>
        <title>UserProfile</title>
      </Helmet>
       <Grid container justifyContent='center'>
        <Box textAlign='center' maxWidth='600px' onSubmit={submithandler} component='form' p={3}>
      <h1 className="my-3">User Profile</h1>
           <TextField required variant="filled" margin="normal" label='Name' id='name' name="name" fullWidth value={name} onChange={(e)=> setName(e.target.value)} />
           <TextField required variant="filled" margin="normal" label='Email' id='email' name="email" fullWidth value={email} onChange={(e)=> setEmail(e.target.value)} />
           <TextField required variant="filled" margin="normal" type='password' label='Password' id='password' name="password" fullWidth value={password} onChange={(e)=> setPassword(e.target.value)} />
           <TextField required variant="filled" margin="normal" type='password' label='Password-Confirm' id='password-confirm' name="password-confirm" fullWidth value={password_confirm} onChange={(e)=> setPasswordconfirm(e.target.value)} />
           <Box textAlign='center' m={4}>
            <Button variant="contained" color='warning' type='submit'>Update</Button>
           </Box>
        </Box>
       </Grid>
    </>
  )
}
