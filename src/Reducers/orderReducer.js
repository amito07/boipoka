import {ORDER_CREATE_REQUEST , ORDER_CREATE_SUCCESS ,ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,ORDER_PAY_SUCCESS,ORDER_PAY_FAIL,ORDER_PAY_RESET,ORDER_CREATE_RESET,ORDER_DETAILS_RESET,
    ORDER_MYORDERS_REQUEST,ORDER_MYORDERS_SUCCESS,ORDER_MYORDERS_FAIL,
    ORDER_ADMINORDERLIST_REQUEST,ORDER_ADMINORDERLIST_SUCCESS,ORDER_ADMINORDERLIST_FAIL,
    ORDER_DELIVERY_REQUEST,ORDER_DELIVERY_SUCCESS,ORDER_DELIVERY_FAIL} from '../Constains/orderConstant'


//user login reducer   
export const orderCreateReducer = (state = {},action)=>{
    switch( action.type ){
        case ORDER_CREATE_REQUEST:
            return {loading: true }
        case ORDER_CREATE_SUCCESS:
            return {loading: false , success:true ,  order: action.payload}
        case ORDER_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case ORDER_CREATE_RESET:
            return {}
        default:
            return state        
    }
}

export const orderDetailsReducer = (state = {loading:true, orderItems:[],shippingAddress:{}},action)=>{
    switch( action.type ){
        case ORDER_DETAILS_REQUEST:
            return {...state, loading: true }
        case ORDER_DETAILS_SUCCESS:
            return {loading: false , order: action.payload}
        case ORDER_DETAILS_FAIL:
            return {loading: false, error: action.payload}  
        case ORDER_DETAILS_RESET:  
            return {loading: true , orderItems:[], shippingAddress:{}}

        default:
            return state        
    }
}

export const orderPayReducer = (state = {},action)=>{
    switch( action.type ){
        case ORDER_PAY_REQUEST:
            return {loading: true }
        case ORDER_PAY_SUCCESS:
            return {loading: false , success: true}
        case ORDER_PAY_FAIL:
            return {loading: false, error: action.payload}  
        case ORDER_PAY_RESET: 
        return {}    
        default:
            return state        
    }
}

export const orderMyListReducer = (state = {orders:[]},action)=>{
    switch( action.type ){
        case ORDER_MYORDERS_REQUEST:
            return {loading: true }
        case ORDER_MYORDERS_SUCCESS:
            return {loading: false , orders: action.payload}
        case ORDER_MYORDERS_FAIL:
            return {loading: false, error: action.payload}  
        default:
            return state        
    }
}

export const adminOrderListReducer = (state = {orders:[]},action)=>{
    switch( action.type ){
        case ORDER_ADMINORDERLIST_REQUEST:
            return {loading: true }
        case ORDER_ADMINORDERLIST_SUCCESS:
            return {loading: false , orders: action.payload}
        case ORDER_ADMINORDERLIST_FAIL:
            return {loading: false, error: action.payload}  
        default:
            return state        
    }
}

export const orderDeliverReducer = (state = {},action)=>{
    switch( action.type ){
        case ORDER_DELIVERY_REQUEST:
            return {loading: true }
        case ORDER_DELIVERY_SUCCESS:
            return {loading: false , success: true}
        case ORDER_DELIVERY_FAIL:
            return {loading: false, error: action.payload}   
        default:
            return state        
    }
}
