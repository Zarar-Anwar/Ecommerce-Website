import { createContext, useReducer } from "react"

export const Store=createContext()

const initialState={
    cart:{
        cartItems:[]
    }
}

function reducer(state,action){
    switch(action.type){
        case "ADD_ITEM_CART":
          const newItems=action.payload
          const existItems=state.cart.cartItems.find((x)=> x._id===newItems._id)
          
          const cartItems=existItems?state.cart.cartItems.map((item)=>item._id===existItems._id?newItems:item)
          :[...state.cart.cartItems,newItems]
          return {...state,cart:{...state.cart,cartItems}}
        default :
        return state    
    }
}

export function StoreProvider(props){
  const [state,dispatch]=useReducer(reducer,initialState)
  const value={state,dispatch}
  return <Store.Provider value={value}> {props.children} </Store.Provider>
}