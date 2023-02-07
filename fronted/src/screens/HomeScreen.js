import axios from 'axios'
import { useEffect, useReducer } from 'react';
import Product from '../component/Product';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Helmet } from 'react-helmet-async';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const reducer=(state,action)=>{
   switch(action.type){
    case "FETCH_REQUEST":
      return{...state,loading:true}
     case "FETCH_SUCCES":
      return{...state,loading:false,products:action.payload}
      case "FETCH_FAILED":
        return{...state,loading:false,error:action.payload} 
        default:
          return " "  
    }
}

const initialState={
  products:[],
  loading:true,
  error:''
}
function HomeScreen() {
  const navigate =useNavigate()
  const [{loading,error,products},dispatch]=useReducer(reducer,initialState)  
    useEffect(()=>{
     const fetchData=async()=>{
      dispatch({type:"FETCH_REQUEST"})
      try {
        const result=await axios.get('/product')
        dispatch({type:"FETCH_SUCCES",payload:result.data})
      } catch (error) {
        dispatch({type:"FETCH_FAILED",payload:error.message})
      }
        // setProduct(result.data.product)
     }
     fetchData()
    },[])
  return (
    <div>
      <Helmet>
        <title>Amazona</title>
      </Helmet>
      <Row>
      <Col lg={6} sm={6} md={4}>
      <h1>Featured Products</h1>
      </Col>
      <Col lg={6} sm={6} md={4}>
      <Button variant="contained" onClick={()=>{
        navigate('/uploading')
      }} color="warning">Upload Product</Button>
      </Col>
      </Row>
     <div className="products">
      {
        loading?<div className='text-center'><CircularProgress/></div>:error?<div>{error}</div>:(
          <Row>
          {products.map((product)=>(
            <Col sm={6} md={4} lg={3} key={product.slug}><Product product={product}/></Col>
          ))}
      </Row>)
      }
      </div>
    </div>
  )
}

export default HomeScreen
