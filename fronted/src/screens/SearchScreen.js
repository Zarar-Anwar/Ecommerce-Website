import { useEffect, useReducer } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getError } from "./utilis"

function reducer(state,actions){
    switch(actions.type)
    {
        case "FETCH_REQUEST":
            return {...state,loading:true}
        case "FETCH_SUCCESS":
            return {...state,
            products:actions.payload.products,
            page:actions.payload.page,
            pages:actions.payload.pages,
            countProducts:actions.payload.countProducts
            }
        case "FETCH_FAIL":
            return {...state,loading:false,error:actions.payload}
        default:
            return {...state}
    }
}

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
                
            const {data}=await axios.get(`/products/search?page=${page}&query=${query}&category=${category}&prices=${prices}&rating=${rating}&order${order}`)
                
            } catch (error) {
               dispatch({
                type:"FETCH_FAIL",payload:getError(error)
               })
            }
            fetch()
        }
    })
    return (
        <>
        <h1>Serach Screen</h1>
        </>
    )
}