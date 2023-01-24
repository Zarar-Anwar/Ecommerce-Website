import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { Store } from "../store"


const ProtectedRoute=({children})=>{
    const {state}=useContext(Store)
    const {UserInfo}=state

    return   UserInfo ? children : <Navigate to='/signin'/> 
}

export default ProtectedRoute