import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../Constains/cartContants';
import axios from 'axios';

export const addToCart = (id,qty) => async(dispatch,getState)=>{
    //getState use to get state information
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    // getState().cart.cartItems get state info from cart(store.js) ===> cartItems(cartReducer)
    //it gives string so we need to convert it into json string formate
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

}

export const removeFromCart = (id)=> (dispatch,getState)=>{
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}