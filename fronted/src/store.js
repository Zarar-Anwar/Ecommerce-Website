import { createContext, useReducer } from "react"

export const Store=createContext()

const initialState={
    cart:{
        cart:[]
    }
}

function reducer(state,action){
    switch(action.type){
        case "ADD_ITEM_CART":
            return{...state,cart:{...state.cart,cartItems:[...state.cart.cartItems,action.payload]}}
        default :
        return state    
    }
}

export function StoreProvider(props){
  const [state,dispatch]=useReducer(reducer,initialState)
  const value={state,dispatch}
  return <StoreProvider store={value}>{props.children}</StoreProvider>

}