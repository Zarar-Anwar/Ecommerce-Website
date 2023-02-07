import { Grid, TextField } from "@mui/material"
import { Box } from "@mui/system"
import {Button} from "@mui/material"
import { toast } from "react-toastify"
import { getError } from "./utilis"
import axios from "axios"

function Uploading (){
    const submithandler=async(e)=>{
        e.preventDefault()
        const data=new FormData(e.currentTarget)
        const actualData={
            name:data.get("name"),
            slug:data.get("slug"),
            image:data.get("image"),
            category:data.get("category"),
            description:data.get("description"),
            prices:data.get("prices"),
            countInStock:data.get("countInStock"),
            rating:data.get("rating"),
            numReviews:data.get("numReviews"),
        }
        try {
            await axios.post(`/uploading`,actualData)
            toast.success("File Uploaded Successfully")
        } catch (error) {
            toast.error(getError(error))
        }

    }
    return (
        <>
        <Grid container justifyContent='center'>
        <Box  onSubmit={submithandler} component='form' sx={{m:3}} maxWidth='500px' justifyContent='center'>
            <h1>Uploading Product</h1> 
            <TextField margin='normal' variant='filled' fullWidth required label='Name' name="name" id="name"/>
            <TextField margin='normal' variant='filled' fullWidth required label='Slug' name="slug" id="slug"/>
            <TextField margin='normal' variant='filled' fullWidth required  name="image" id="name" type='file'/>
            <TextField margin='normal' variant='filled' fullWidth required label='Brand' name="brand" id="brand"/>
            <TextField margin='normal' variant='filled' fullWidth required label='Category' name="category" id="category"/>
            <TextField margin='normal' variant='filled' fullWidth required label='Description' name="slug" id="description"/>
            <TextField margin='normal' variant='filled' fullWidth required label='$ Prices' name="prices" id="prices" type='number'/>
            <TextField margin='normal' variant='filled' fullWidth required label='CountInStock' name="countInStock" id="countInStock" type='number'/>
            <TextField margin='normal' variant='filled' fullWidth required label='Rating Out of Five' name="rating" id="rating" type='number'/>
            <TextField margin='normal' variant='filled' fullWidth required label='NumReviews' name="numReviews" id="numReviews" type='number'/>
        <Box sx={{m:3}} textAlign='center'>
         <Button variant='contained' color='warning' type='submit'>Upload</Button>
        </Box>
        </Box>
        </Grid>
        </>
    )
}
export default Uploading