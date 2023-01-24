import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "./utilis";

export default function ResetPassword(){
    const submithandler=async(e)=>{
        e.preventDefault()
      const data=new FormData(e.currentTarget)
      const actualdata={
        email:data.get('email')
      }
      if(actualdata.email){
        try {
            await axios.post('/resetpassword',actualdata)
            toast.success("Reset Mail send to Your Email please check it in inbox or Spum Box")
        } catch (error) {
            toast.error(getError(error))
        }    
      }else{
        toast.error("All Fields are required")
      }


    }
    return(
        <>
        <Grid container  justifyContent='center'>
        <Box component='form' sx={{width:'800px'}} onSubmit={submithandler} id='reset-form' textAlign='center'>
            <h2>Reset Password</h2>
          <TextField label='Email' variant="filled" required placeholder="Enter Your Email" id="email" name="email" fullWidth />
          <Box sx={{mt:3}} textAlign='center'>
           <Button variant="contained" type="submit">Send Email</Button>
          </Box>
        </Box>
        </Grid>
        </>
    )
}