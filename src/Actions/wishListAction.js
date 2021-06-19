import { WISH_ADD_ITEM , WISH_REMOVE_ITEM } from '../Constains/wishListContants';
import axios from 'axios';
export const addToWishList = (id)=> async(dispatch,getState) =>{
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch({
        type: WISH_ADD_ITEM,
        payload:{
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
        }
    })
    localStorage.setItem('wishItem',JSON.stringify(getState().wishList.wishItem))
}

export const removeFromWishList = (id)=> (dispatch,getState)=>{
    dispatch({
        type: WISH_REMOVE_ITEM,
        payload:id
    })
    localStorage.setItem('wishItem',JSON.stringify(getState().wishList.wishItem))
}