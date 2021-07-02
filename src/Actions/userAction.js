import axios from 'axios'
import {USER_LOGIN_REQUEST , USER_LOGIN_SUCCESS ,
    USER_LOGIN_FAIL ,USER_LOGOUT,USER_REG_REQUEST,USER_REG_SUCCESS,USER_REG_FAIL,
    USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,USER_DETAILS_FAIL,USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,USER_UPDATE_FAIL,USER_UPDATE_RESET,USER_LIST_REQUEST,
    USER_LIST_SUCCESS,USER_LIST_FAIL,USER_LIST_RESET,USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,USER_DELETE_FAIL
   } from '../Constains/signupConstants'

import {CART_RESET_ITEM} from '../Constains/cartContants' 
import {PRODUCT_LIST_RESET} from '../Constains/productConstants'


//Log in Action   
export const login = (email,password)=>async(dispatch)=>{
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })


        //set the header for the post method
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        //getting user data including tokens and so..........
        const {data} = await axios.post('/api/users/login',{email , password} ,config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        //convert data in string formate...web receive string formate only
        localStorage.setItem('userInfo',JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }
}


//Log out Action
export const logout = ()=> (dispatch)=>{
    localStorage.removeItem('userInfo')
    // localStorage.removeItem('user')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_LIST_RESET})
    dispatch({type: CART_RESET_ITEM})
    dispatch({type: PRODUCT_LIST_RESET})
}


//Registration Action
export const register = (name,email,phone,address,password)=>async(dispatch)=>{
    try {
        dispatch({
            type: USER_REG_REQUEST,
        })


        //set the header for the post method
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        //getting user data including tokens and so..........
        const {data} = await axios.post('/api/users/register',{name,email,phone,address,password} ,config)

        dispatch({
            type: USER_REG_SUCCESS,
            payload: data
        })
        //convert data in string formate...web receive string formate only
        localStorage.setItem('userInfo',JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: USER_REG_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }
}

//Get User Info Action
export const getuserDetails = (id)=>async(dispatch,getState)=>{
    console.log(id)
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        })

        const {userLogin:{userInfo}} = getState()


        //set the header for the get method
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        //getting user data including tokens and so..........
        const {data} = await axios.get(`/api/users/${id}`,config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }
}

//update user value
export const updateUser = (user)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
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
        const {data} = await axios.put('/api/users/profile', user,config)

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })
        //convert data in string formate...web receive string formate only
        localStorage.setItem('userInfo',JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }
}

//Get User Info Action
export const listUsers = ()=>async(dispatch,getState)=>{
    try {
        dispatch({
            type: USER_LIST_REQUEST,
        })

        const {userLogin:{userInfo}} = getState()


        //set the header for the get method
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        //getting user data including tokens and so..........
        const {data} = await axios.get(`/api/users/getalluser`,config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }
}

//delete User Info Action
export const DeleteUser = (id)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
        })

        const {userLogin:{userInfo}} = getState()


        //set the header for the get method
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        //getting user data including tokens and so..........
        const {data} = await axios.delete(`/api/users/deleteUser/${id}`,config)

        dispatch({type: USER_DELETE_SUCCESS})
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }
}