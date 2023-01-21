import { Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";

export default function ResetPassword(){
    return(
        <>
        <Grid container justifyContent='center'>
        <Box component='form' id='reset-form' textAlign='center'>
          <TextField label='Email' placeholder="Enter Your Email" id="email" name="email" fullWidth />
        </Box>
        </Grid>
        </>
    )
}