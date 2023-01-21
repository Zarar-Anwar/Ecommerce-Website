import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "./utilis";

export default function ResetPasswordUpdate() {
    const submithandler=async(e)=>{
        e.preventDefault()
        const data=new FormData(e.currentTarget)
        const actualData={
            password:data.get("password"),
            confirm_password:data.get("confirm_password")
        }
        if(actualData.password && actualData.confirm_password){
            if(actualData.password==actualData.confirm_password)
            {
                try {
                    
                    const {data}=await axios.post(`/reset/:id/:token`)

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
            <TextField label='Password' id="password" name="password" fullWidth required variant="filled"/>
            <TextField label='Confirm_Password' id="confirm_password" name="confirm_password" fullWidth required variant="filled"/>
            <Box mt={3} textAlign='center'>
                <Button variant="contained" color='warning' type="submit">Update</Button>

            </Box>
        </Box>
      </Grid>
    </>
  )
}
