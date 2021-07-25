import {ORDER_CREATE_REQUEST , ORDER_CREATE_SUCCESS ,ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,ORDER_PAY_SUCCESS,ORDER_PAY_FAIL,
    ORDER_MYORDERS_REQUEST,ORDER_MYORDERS_SUCCESS,ORDER_MYORDERS_FAIL,
    ORDER_ADMINORDERLIST_REQUEST,ORDER_ADMINORDERLIST_SUCCESS,ORDER_ADMINORDERLIST_FAIL,
    ORDER_DELIVERY_REQUEST,ORDER_DELIVERY_SUCCESS,ORDER_DELIVERY_FAIL} from '../Constains/orderConstant'
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
export const payOrder = (orderId,paymentMethod)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
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
        const {data} = await axios.put(`/api/orders/${orderId}/pay`,paymentMethod,config)
        console.log("DATA Returned",data)

        dispatch({
            type: ORDER_PAY_SUCCESS,
        })
        //convert data in string formate...web receive string formate only
        // localStorage.setItem('userInfo',JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }
}

//SET THE ORDER TO PAID
export const listMyOrders = ()=>async(dispatch,getState)=>{
    console.log("ListMyOrders Action");
    try {
        dispatch({
            type: ORDER_MYORDERS_REQUEST,
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
        const {data} = await axios.get(`/api/orders/myorder`,config)
        console.log("Orders Data",data)

        dispatch({
            type: ORDER_MYORDERS_SUCCESS,
            payload: data,
        })
        //convert data in string formate...web receive string formate only
        // localStorage.setItem('userInfo',JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: ORDER_MYORDERS_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }
}

//SET THE ORDER TO PAID
export const adminOrderShow = ()=>async(dispatch,getState)=>{
    console.log("Admin ListMyOrders Action");
    try {
        dispatch({
            type: ORDER_ADMINORDERLIST_REQUEST,
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
        const {data} = await axios.get(`/api/orders/admin/order`,config)
        console.log("Admin Orders Data",data)

        dispatch({
            type: ORDER_ADMINORDERLIST_SUCCESS,
            payload: data,
        })
        //convert data in string formate...web receive string formate only
        // localStorage.setItem('userInfo',JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: ORDER_ADMINORDERLIST_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }
}

//SET THE ORDER TO PAID
export const orderDelivery = (id)=>async(dispatch,getState)=>{
    console.log("Admin Delivery Action");
    try {
        dispatch({
            type: ORDER_DELIVERY_REQUEST,
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
        const {data} = await axios.get(`/api/orders/admin/deliver/${id}`,config)
        console.log("Admin Deliver Data",data)

        dispatch({
            type: ORDER_DELIVERY_SUCCESS,
        })
        //convert data in string formate...web receive string formate only
        // localStorage.setItem('userInfo',JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: ORDER_DELIVERY_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }
}