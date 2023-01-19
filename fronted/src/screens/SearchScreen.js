import {Box} from '@mui/material'
import {  CircularProgress } from "@mui/material"
import Button from 'react-bootstrap/Button'
import axios from "axios"
import { useEffect, useReducer, useState } from "react"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { Helmet } from "react-helmet-async"
import { LinkContainer } from "react-router-bootstrap"
import { useLocation, useNavigate,Link } from "react-router-dom"
import { toast } from "react-toastify"
import MessageBox from "../component/MessageBox"
import Product from "../component/Product"
import Rating from "../component/Rating"
import { getError } from "./utilis"

function reducer(state,actions){
    switch(actions.type)
    {
        case "FETCH_REQUEST":
            return {...state,loading:true}
        case "FETCH_SUCCESS":
            return {...state,
                products:actions.payload.product,
                page:actions.payload.page,
                pages:actions.payload.pages,
                countProducts:actions.payload.countProducts,
                loading:false,
            }
        case "FETCH_FAIL":
            return {...state,loading:false,error:actions.payload}
        default:
            return state
    }
}

const price=[
    {
        name:'$1 to $50',
        value:'1-50'
    },
    {
        name:"$51 to $200",
        value:"51-200"
    },
    {
        name:"$201 to $1000",
        value:'201-1000'
    }
 ]

  export const ratings=[
    {
        name:'4stars & up',
        rating:4
    },
    {
        name:"3stars & up",
        rating:3
    },
    {
        name:"2stars & up",
        rating:2
    },
    {
        name:"1stars & up",
        rating:1
    }
 ]

export default function SearchScreen(){


    const navigate=useNavigate()
    const {search} = useLocation()
    const sp=new URLSearchParams(search)  // /search?category=shirts
    const category=sp.get('category') || 'all'
    const query=sp.get('query') || 'all'
    const prices=sp.get('prices') || 'all'
    const rating=sp.get('rating') || 'all'
    const order =sp.get("order") || 'newest'
    const page =sp.get("page") || 1
    const [{loading,error,products,pages,countProducts},dispatch]=useReducer(reducer,{
        loading:true,
        error:''
    })
    useEffect(()=>{
        const fetch=async()=>{
            try {
            const {data}=await axios.get(`/search?category=${category}&query=${query}&rating=${rating}&prices=${prices}&page=${page}`
            )
            console.log(data)
            dispatch({
                type:"FETCH_SUCCESS",payload:data
            })    
            } catch (error) {
               dispatch({
                type:"FETCH_FAIL",payload:getError(error)
               })
            }
            fetch()
        }
    },[page,query,rating,category,error,order,prices])
    const [categories,setCategories]=useState([])
     useEffect(()=>{
        const fetchCategories=async()=>{
            try {
            const {data}=await axios.get(`/categories`)
            setCategories(data)
            } catch (error) {
                toast.error(getError(error))
            }
        }
        fetchCategories()
     },[dispatch])
     const getFilterUrl=(filter)=>{
        const filterPage=filter.page || page
        const filterCategory=filter.category || category
        const filterQuery=filter.query || query
        const filterRating=filter.rating || rating
        const filterPrices=filter.prices || prices
        const sortOrder=filter.order || order
        return `/search?category=${filterCategory}&query=${filterQuery}&rating=${filterRating}&prices=${filterPrices}&page=${filterPage}`
     }

    
     

    return (
        <>
        <Helmet>
            <title>Search Products</title>
        </Helmet>
         <Row>
            <Col md={3}>
                <h3>Department</h3>
            <div>
                <ul>
                    <li>
                        <Link className={category==='all'?"text-bold":" "} 
                        to={getFilterUrl({category:'all'})}>
                        Any</Link>
                    </li>
                    {categories.map((c)=>(
                        <li key={c}>
                            <Link className={category===c ?"text-bold" :""}
                            to={getFilterUrl({category:c})}
                            >{c}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Prices</h3>
                <ul>
                    <li>
                       <Link className={prices==='all'?"text-bold":""}
                        to={getFilterUrl({prices:"all"})}
                        >Any</Link>
                    </li>
                    {price.map((p)=>(
                        <li key={p.value}>
                            <Link className={p.value===prices?"text-bold":" "}
                             to={getFilterUrl({prices:p.value})}>
                            {p.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Avg. Cutomer Review</h3>
                <ul>
                    {ratings.map((r)=>(
                     <li key={r.name}>
                        <Link className={`${r.rating}`===`${rating}`?"text-bold":''}
                        to={getFilterUrl({rating:r.rating})}
                        >
                        <Rating caption={'& up'} rating={r.rating}></Rating>
                        </Link>
                     </li>
                    ))}
                    <li>
                       <Link className={rating==='all'?'text-bold':" "}
                       to={getFilterUrl({rating:'all'})}
                       >
                       </Link> 
                    </li>
                </ul>
            </div>
            </Col>
            <Col md={9}>
                {
                    loading ?(<Box textAlign='center'><CircularProgress/></Box>):(
                        error?<MessageBox variant='error'>{error}</MessageBox>:(
                            <>
                            <Row className="justify-content-between mb-3">
                                <Col md={6}>
                                <div>
                                    {countProducts===0 ? 'No' : countProducts} Results
                                    {query!=='all' && ":"+query}
                                    {category!=='all' && ":"+category}
                                    {prices!=='all' && " Prices "+prices}
                                    {rating!=='all' && " Rating "+rating}
                                    {query!=='all'|| category!=='all'|| rating!=='all'
                                    || price!=='all'?(
                                        <Button variant='light'
                                        onClick={()=>navigate('/search')}
                                        ><i className="fas fa-times-circle"></i>
                                        </Button>
                                    ):null
                                    }
                                </div>
                                </Col>
                                <Col className="text-end">
                                Sort By{" "}
                                <select value={order}
                                onChange={(e)=> e.target.value}>
                                    <option value="newest">Newest Arrivals</option>
                                    <option value="lowest">Price :Low to High</option>
                                    <option value="highest">Price :High to low</option>
                                    <option value="toprated">Avg. Cutomer Reviews</option>
                                </select>
                                </Col>
                            </Row>
                            {products.length===0 && (
                                <MessageBox>No Products Found</MessageBox>
                            )}
                            <Row>
                                {products.map((p)=>(
                                    <Col sm={6} lg={4} className='mb-3' key={p._id}>
                                    <Product product={p}></Product>
                                    </Col>
                                ))}
                            </Row>
                            <div>
                                {
                                    [...Array(pages).key()].map((x)=>(
                                        <LinkContainer key={x+1}
                                        className='mx-1'
                                        to={getFilterUrl({page:x+1})}
                                        ><Button
                                        variant="light"
                                        className={Number(page)===x+1?'text-bold':""}
                                        >{x+1}
                                        </Button> 
                                        </LinkContainer>
                                    ))
                                }
                            </div>
                            </>
                        )
                    )
                }
            </Col>
         </Row>


        </>
    )
}