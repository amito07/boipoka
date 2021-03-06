import {PRODUCT_LIST_REQUEST , PRODUCT_LIST_SUCCESS ,
    PRODUCT_LIST_FAIL ,PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_SUCCESS,PRODUCT_DELETE_FAIL,
    PRODUCT_UPDATE_REQUEST,PRODUCT_UPDATE_SUCCESS,PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REQUEST,PRODUCT_CREATE_SUCCESS,PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,PRODUCT_PRODUCT_TOP_REQUEST,
    PRODUCT_PRODUCT_TOP_SUCCESS,PRODUCT_PRODUCT_TOP_FAIL
   } from '../Constains/productConstants'
import axios from 'axios'

export const listProducts = (keyword = '') => async(dispatch)=>{
    console.log(keyword)
   try {
       dispatch({type: PRODUCT_LIST_REQUEST})

       const {data} = await axios.get(`/api/products?keyword=${keyword}`)

       dispatch({
           type: PRODUCT_LIST_SUCCESS,
           payload: data
       })
       
   } catch (error) {
       dispatch({
           type: PRODUCT_LIST_FAIL,
           payload: error.response && error.response.data.message ?
           error.response.data.message : error.message,
       })
       
   }

}


export const listProductDetails = (id) => async(dispatch)=>{
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})
 
        const {data} = await axios.get(`/api/products/${id}`)
        console.log(data)
 
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }
 
 }

 export const deleteProduct = (id) => async(dispatch,getState)=>{
    try {
        dispatch({type: PRODUCT_DELETE_REQUEST})

        const {userLogin:{userInfo}} = getState()

        //set the header for the get method
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}` 
            }
        }
 
        await axios.delete(`/api/products/deleteProduct/${id}`,config)
 
        dispatch({type: PRODUCT_DELETE_SUCCESS})
        
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }
 
 }

 //update user value
export const updateProduct = (id,product)=>async(dispatch,getState)=>{
    // console.log("Amit id",product)
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        })

        const {userLogin:{userInfo}} = getState()
        //set the header for the post method
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //getting user data including tokens and so..........
        const {data} = await axios.put(`/api/products/edit/${id}`, product,config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
        //convert data in string formate...web receive string formate only
        // localStorage.setItem('userInfo',JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }
}

export const createProduct = (product) => async(dispatch,getState)=>{
    try {
        dispatch({type: PRODUCT_CREATE_REQUEST})

        const {userLogin:{userInfo}} = getState()

        //set the header for the get method
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}` 
            }
        }
 
        const {data} = await axios.post(`/api/products`,product,config)
 
        dispatch({  type: PRODUCT_CREATE_SUCCESS,
                    payload:data
                 })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }
 
 }

 export const createProductReview = (productID,review) => async(dispatch,getState)=>{
    try {
        dispatch({type: PRODUCT_CREATE_REVIEW_REQUEST})

        const {userLogin:{userInfo}} = getState()

        //set the header for the get method
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}` 
            }
        }
 
        await axios.post(`/api/products/${productID}/reviews`,review,config)
 
        dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS})
        
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }
 
 }

 export const listTopProducts = () => async(dispatch,getState)=>{
    try {
        dispatch({type: PRODUCT_PRODUCT_TOP_REQUEST})

        const {userLogin:{userInfo}} = getState()

        //set the header for the get method
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}` 
            }
        }
 
        const {data} = await axios.get(`/api/products/top`,config)
 
        dispatch({ type: PRODUCT_PRODUCT_TOP_SUCCESS,payload: data})
        
    } catch (error) {
        dispatch({
            type: PRODUCT_PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
        
    }
 
 }


