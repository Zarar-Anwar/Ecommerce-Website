import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import { Button } from "@mui/material";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'


export default function SearchBox() {
    const navigate=useNavigate()
    const [query,setQuery]=useState("")
    const submithandler=(e)=>{
        e.preventDefault()
        navigate(query? `/search/?query=${query}`:'/search')
    }
  return (
    <>
        <Form className="d-flex me-auto" onSubmit={submithandler}>
          <InputGroup>
          <FormControl
         type='text' 
         name='q'
         id='q' 
         onChange={(e)=> setQuery(e.target.value)}
         placeholder='search products...'
         aria-label="Search Product"
         aria-describedby='button-search'
        ></FormControl>
        <Button variant='contained' color='warning' type="submit" id='button-search'><i className="fa fa-search"></i></Button>
          </InputGroup>
        </Form>
    </>
  )
}
