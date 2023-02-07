import { Grid, TextField } from "@mui/material"
import { Box } from "@mui/system"

function Uploading (){
    const handleClick=async(req,res)=>{
        e.PreventDefault()
        const data=new FormData(e.currentTarget)
        const actualData={
            name:data.get("name"),
            slug:data.get("slug"),
            category:data.get("category"),
            description:data.get("description"),
            prices:data.get("prices"),
            countInStock:data.get("countInStock"),
            rating:data.get("rating"),
            numReviews:data.get("numReviews"),

        }
    }
    return (
        <>
        <Grid container justifyContent='center'>
        <Box  component='form' sx={{m:3}} maxWidth='500px' justifyContent='center'>
            <h1>Uploading Product</h1> 
            <TextField margin='normal' fullWidth required label='Name' name="name" id="name"/>
            <TextField margin='normal' fullWidth required label='Slug' name="slug" id="slug"/>
            <TextField margin='normal' fullWidth required  name="image" id="name" type='file'/>
            <TextField margin='normal' fullWidth required label='Brand' name="brand" id="brand"/>
            <TextField margin='normal' fullWidth required label='Category' name="category" id="category"/>
            <TextField margin='normal' fullWidth required label='Description' name="slug" id="description"/>
            <TextField margin='normal' fullWidth required label='$ Prices' name="prices" id="prices" type='number'/>
            <TextField margin='normal' fullWidth required label='CountInStock' name="countInStock" id="countInStock" type='number'/>
            <TextField margin='normal' fullWidth required label='Rating Out of Five' name="rating" id="rating" type='number'/>
            <TextField margin='normal' fullWidth required label='NumReviews' name="numReviews" id="numReviews" type='number'/>
        </Box>
        <Box justifyContent='center'>
         <Button variant='contained' color='warning' onClick={handleClick}>Upload</Button>
        </Box>
        </Grid>
        </>
    )
}
export default Uploading