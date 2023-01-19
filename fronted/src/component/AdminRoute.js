import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { Store } from "../store"


const AdminRoute=({children})=>{
    const {state}=useContext(Store)
    const {UserInfo}=state

    return   UserInfo && UserInfo.isAdmin ? {children} : <Navigate to='/signin'/> 
}

export default AdminRoute