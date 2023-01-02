import './App.css'
import data from './data';

function App() {
  return (
    <div >
      <header>
      <a href="/">amazona</a>  
      </header>
      <main>

      <h1>Featured Products</h1>
     <div className="products">
      {
        data.product.map(product=>(
          <div key={product.slug}  className="product">
          <a href={`/product/${product.slug}`} >
          <img src={product.image} alt={product.name}/>
          </a>
          <div className='product-info'>
          <a href={`/product/${product.slug}`}><p>{product.name}</p>
          </a>
          <strong><p>${product.prices}</p></strong>
          <button>Add to cart</button>
          </div>
          </div>))
      }
      </div>
      </main>
    </div>
  )
}

export default App;
