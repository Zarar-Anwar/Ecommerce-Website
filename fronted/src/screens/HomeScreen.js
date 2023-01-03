import { Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from 'react';

function HomeScreen() {
    const [products,setProduct]=useState([])
    useEffect(()=>{
     const fetchData=async()=>{
        const result=await axios.get('/api/products')
        setProduct(result.data.product)
     }
     fetchData()
    },[])
  return (
    <div>
      <h1>Featured Products</h1>
     <div className="products">
      {
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
          </div>))
      }
      </div>
    </div>
  )
}

export default HomeScreen
