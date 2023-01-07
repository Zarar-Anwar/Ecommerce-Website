import { Button, Grid, TextField } from "@mui/material"
import { Box } from "@mui/material"
import { Link, useLocation } from "react-router-dom"

function Signin() {
    const {search}=useLocation()
    const redirectInUrl=new URLSearchParams(search).get('redirect')
    const redirect =redirectInUrl?redirectInUrl:'/'
  return (
    <>
    <Box sx={{ml:43,mt:6}} >
      <Grid sx={{width:"600px"}} justifyContent='center'>
        <Grid item >
          <Box border={1} borderColor='divider' sx={{p:3}} textAlign='center' component='form' id='signin_form'>
            <h1>Sign-in</h1>
            <TextField margin="normal" label="Email" required id="email" name="email" fullWidth />
            <TextField margin="normal" label="password" required id="password" name="password" fullWidth />
          <Box sx={{m:3}} textAlign='center'>
            <Button type="submit" variant="contained" color='warning'>Sign In</Button>
          </Box>
           New User ?<Link to={`/signup=redirect=${redirect}`}> Create Your Account</Link>
          </Box>
        </Grid>
      </Grid>
    </Box>

    </>
  )
}

export default Signin
