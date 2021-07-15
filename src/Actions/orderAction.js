import {ORDER_CREATE_REQUEST , ORDER_CREATE_SUCCESS ,ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL} from '../Constains/orderConstant'
import axios from 'axios'
//update user value
export const createOrder = (order)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })

        //get the user info
        const {userLogin:{userInfo}} = getState()
        //set the header for the post method
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //getting user data including tokens and so..........
        const {data} = await axios.post('/api/orders', order,config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
        //convert data in string formate...web receive string formate only
        localStorage.setItem('userInfo',JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }
}


//GET THE ORDERED ITEMS DETAILS
export const getOrderDetails = (id)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })

        //get the user info
        const {userLogin:{userInfo}} = getState()
        //set the header for the post method
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //getting user data including tokens and so..........
        const {data} = await axios.get(`/api/orders/${id}`,config)
        console.log("DATA",data)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
        //convert data in string formate...web receive string formate only
        // localStorage.setItem('userInfo',JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }
}

//SET THE ORDER TO PAID
export const payOrder = (id)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })

        //get the user info
        const {userLogin:{userInfo}} = getState()
        //set the header for the post method
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //getting user data including tokens and so..........
        const {data} = await axios.get(`/api/orders/${id}`,config)
        console.log("DATA",data)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
        //convert data in string formate...web receive string formate only
        // localStorage.setItem('userInfo',JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }
}