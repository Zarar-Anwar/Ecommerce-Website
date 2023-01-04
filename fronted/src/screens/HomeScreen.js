import { Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useReducer, useState } from 'react';

const reducer=(state,action)=>{
   switch(action.type){
    case "FETCH_REQUEST":
      return{...state,loading:true}
     case "FETCH_SUCCES":
      return{...state,loading:false,products:action.payload}
      case "FETCH_FAILED":
        return{...state,loading:false,error:action.payload}   
    }
}

initialState={
  products:[],
  loading:true,
  error:''
}
function HomeScreen() {
  const [{loading,error,products},dispatch]=useReducer(state,initialState)  
  // const [products,setProduct]=useState([])
    useEffect(()=>{
     const fetchData=async()=>{
      dispatch({type:"FETCH_REQUEST"})
      try {
        const result=await axios.get('/api/products')
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
      <h1>Featured Products</h1>
     <div className="products">
      {
        loading?<div>...loading</div>:error?<div>{error}</div>:(
        products.map((product)=>(
          <div key={product.slug}  className="product">
          <Link to={`/product/${product.slug}`} >
          <img src={product.image} alt={product.name}/>
          </Link>
          <div className='product-info'>
          <Link to={`/product/${product.slug}`}><p>{product.name}</p>
          </Link>
          <strong><p>${product.prices}</p></strong>
          <button>Add to cart</button>
          </div>
          </div>)))
      }
      </div>
    </div>
  )
}

export default HomeScreen
