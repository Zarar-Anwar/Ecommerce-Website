import './App.css'
import {Link,BrowserRouter,Routes,Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar'
import Badge from 'react-bootstrap/Badge'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {LinkContainer} from 'react-router-bootstrap'
import { useContext, useEffect, useState } from 'react';
import { Store } from './store';
import CartScreen from './screens/CartScreen';
import Signin from './screens/Signin';
import ShippingAddress from './screens/ShippingAddress';
import SignupScreen from './screens/SignupScreen';
import Paymentmethod from './screens/Paymentmethod';
import PlaceorderScreen from './screens/PlaceOrderScreen';
import { toast, ToastContainer} from 'react-toastify'
import OrderScreen from './screens/OrderScreen';
import OrderHistory from './screens/OrderHistory';
import UserProfile from './screens/UserProfile';
import SearchBox from './component/SearchBox';
import Button from 'react-bootstrap/esm/Button';
import { getError } from './screens/utilis';
import axios from 'axios';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './component/ProtectedRoute';
import AdminRoute from './component/AdminRoute';
import Dashboard from './admin Compoenents/Dashboard';
import Page404 from './screens/404page';
import ResetPassword from './screens/ResetPassword';
import ResetPasswordUpdate from './screens/ResetPasswordUpdate';
import { AppBar } from '@mui/material';


function App() {
  const {state,dispatch}=useContext(Store)
  const {cart,UserInfo}=state
  const signoutHandler=()=>{
  dispatch({type:"USER_SIGNOUT"})
  localStorage.removeItem("UserInfo")
  localStorage.removeItem("shippingaddress")
  localStorage.removeItem("paymentMethod")
  window.location.href='/signin'
  }
  const [sideBar,setSideBar]=useState(false)
  const [categories,setCategories]=useState([])
  useEffect(()=>{
    const fetchCategories=async()=>{
      try {
        const {data}=await axios.get('/categories')
        setCategories(data)
      } catch (error) {
        toast.error(getError(error))
      }
    }
    fetchCategories()
  })
  return (
    <BrowserRouter>
    <div className= {sideBar ? ( 'd-flex flex-column site-container active-cont'):(
      "d-flex flex-column site-cantainer"
    ) }>
      <ToastContainer  
              position='top-center'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              limit={1}
              pauseOnHover
              />
      <header>
        <AppBar position='fixed'  >
       <Navbar bg="dark" variant="dark" expand='md'>
        <Container>
          <Button variant='dark' onClick={()=> setSideBar(!sideBar)}>
          <i className='fa fa-bars'></i></Button>
          <LinkContainer to="/">
            <Navbar.Brand>Amazona</Navbar.Brand>
          </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <SearchBox/>
          <Nav className="me-auto w-100 justify-content-end">
           
            { UserInfo ? 
            (
              <NavDropdown title={UserInfo.name} id="basic-nav-dropdown">
                <LinkContainer to="/profile">
                <NavDropdown.Item>User Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orderhistory">
                <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider/>
                <Link to="#signout" className="dropdown-item" onClick={signoutHandler}>
                  SignOut
                </Link>
              </NavDropdown>
            ) 
            :(
              <Link to='/signin' className='nav-link'>SignIn</Link>
              )}
               <Link to="/cart" className="nav-link">Cart
           { cart.cartItems.length>0 && (<Badge pill bg="danger">
               {cart.cartItems.reduce((a,c)=> a+c.quantity,0)}
            </Badge>) }
            </Link>
            {
              UserInfo && UserInfo.isAdmin &&(
                <NavDropdown title='admin' id='admin-nav-dropdown'>
                  <LinkContainer to='/admin/dashboard'>
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Product List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>User List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Order List</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )
            }
          </Nav>
          </Navbar.Collapse>
        </Container>
        </Navbar> 
      </AppBar>
      </header>
      <div className={sideBar ? ( 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
      ):(
        "side-navbar d-flex justify-content-between flex-wrap flex-column"
        ) }
      >
        <Nav className='flex-column p-2 w-100 text-white'>
          <Nav.Item>
            <strong><h2>Category</h2></strong>
            {categories.map((category)=>(
              <Nav.Item key={category}>
                <Link to={`/search?category=${category}`}
                onClick={()=> setSideBar(false)}>
                  <Nav.Item><h4>{category}</h4></Nav.Item>
                </Link>
              </Nav.Item>
            ))}
          </Nav.Item>
        </Nav>
      </div>
      <main className='margin'>
        <Container className='mt-3'>
              
      <Routes>
        <Route path='/' element={<HomeScreen/>}/>
        <Route path='/admin/dashboard' element={<AdminRoute><Dashboard/></AdminRoute>}/>
        <Route path='/products/:slug' element={<ProductScreen/>}/>
        <Route path='/products/:id' element={<ProductScreen/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<SignupScreen/>}/>
        <Route path='/profile' element={<ProtectedRoute><UserProfile/></ProtectedRoute>}/>
        <Route path='/orderplace' element={<PlaceorderScreen/>}/>
        <Route path='/paymentmethod' element={<Paymentmethod/>}/>
        <Route path='/shipping' element={<ShippingAddress/>}/>
        <Route path='/cart' element={<CartScreen/>}/>
        <Route path='/search' element={<SearchScreen/>}/>
        <Route path='/reset/:id/:token' element={<ResetPasswordUpdate/>}/>
        <Route path='/resetpassword' element={<ResetPassword/>}/>
        <Route path='/order/:id' element={<ProtectedRoute><OrderScreen/></ProtectedRoute>}/>
        <Route path='/orderhistory' element={<ProtectedRoute><OrderHistory/></ProtectedRoute>}/>
        <Route path='/*' element={<Page404/>}/>
      </Routes>
        </Container>
      </main>
      <footer>
        <div className='text-center allrights'>All rights reserved</div>
      </footer>
    </div>
    </BrowserRouter>
  )
  }

export default App;
