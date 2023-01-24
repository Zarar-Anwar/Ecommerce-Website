import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "./utilis";
import {useParams} from 'react-router-dom'

export default function ResetPasswordUpdate() {
    const {id,token}=useParams()
    const submithandler=async(e)=>{
        e.preventDefault()
        const data=new FormData(e.currentTarget)
        const actualData={
            password:data.get("password"),
            confirm_password:data.get("confirm_password")
        }
        if(actualData.password && actualData.confirm_password){
            if(actualData.password===actualData.confirm_password)
            {
                try {
                    
                    await axios.post(`/reset/:${id}/:${token}`,actualData)
                    toast.success("Password Update Successfully :")
                } catch (error) {
                    toast.error(getError(error))
                }
            }else{
                toast.error("Password and Confirm Password do not Match")
            }

        }else{
            toast.error("All Fields Are Required")
        }
    }
  return (
    <>
      <Grid container justifyContent='center'>
        <Box component='form' id='resetpasswordupdate-Id' onSubmit={submithandler} width="800px" textAlign='center'>
            <h1>Update Password</h1>
            <TextField label='Password' type='password' margin="normal" id="password" name="password" fullWidth required variant="filled"/>
            <TextField label='Confirm_Password' type='password' margin="normal" id="confirm_password" name="confirm_password" fullWidth required variant="filled"/>
            <Box mt={3} textAlign='center'>
                <Button variant="contained" color='warning' type="submit">Update</Button>

            </Box>
        </Box>
      </Grid>
    </>
  )
}
