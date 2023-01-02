import './App.css'
import {BrowserRouter,Routes,Route, Link} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <div >
      <BrowserRouter>
      <header>
      <Link to="/">Amazona</Link>  
      </header>
      <main>
      <Routes>
        <Route path='/product/:slug' element={<ProductScreen/>}/>
        <Route path='/' element={<HomeScreen/>}/>
      </Routes>
      </main>
      </BrowserRouter>
    </div>
  )
}

export default App;
