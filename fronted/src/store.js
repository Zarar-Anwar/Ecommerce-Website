import { createContext, useReducer } from "react"

export const Store=createContext()

const initialState={
    cart:{
        cartItems:localStorage.getItem('cartItems')?
        JSON.parse(localStorage.getItem("cartItems")):
        []
    }
}

function reducer(state,action){
    switch(action.type){
        case "ADD_ITEM_CART":
          const newItems=action.payload
          const existItems=state.cart.cartItems.find((x)=> x._id===newItems._id)
          const cartItems=existItems?state.cart.cartItems.map((item)=>item._id===existItems._id?newItems:item)
          :[...state.cart.cartItems,newItems]
          localStorage.setItem("cartItems",JSON.stringify(cartItems))
          return {...state,cart:{...state.cart,cartItems}}
          case "REMOVE_ITEM":{
            const cartItems=state.cart.cartItems.filter(
              (item)=> item._id!==action.payload._id
              )
          localStorage.setItem("cartitems",JSON.stringify(cartItems))
           return {...state,cart:{...state.cart,cartItems}}
            }
        default :
        return state    
    }
}

export function StoreProvider(props){
  const [state,dispatch]=useReducer(reducer,initialState)
  const value={state,dispatch}
  return <Store.Provider value={value}> {props.children} </Store.Provider>
}