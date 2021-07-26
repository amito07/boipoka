import {USER_LOGIN_REQUEST , USER_LOGIN_SUCCESS ,
    USER_LOGIN_FAIL ,USER_LOGOUT,USER_REG_REQUEST,USER_REG_SUCCESS,USER_REG_FAIL,
    USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,USER_DETAILS_FAIL,USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,USER_UPDATE_FAIL,USER_LIST_REQUEST,USER_LIST_SUCCESS,
    USER_LIST_FAIL,USER_LIST_RESET,USER_DELETE_REQUEST,USER_DELETE_SUCCESS,
    USER_DELETE_FAIL
   } from '../Constains/signupConstants'


//user login reducer   
export const userLoginReducer = (state = {},action)=>{
    switch( action.type ){
        case USER_LOGIN_REQUEST:
            return {loading: true }
        case USER_LOGIN_SUCCESS:
            return {loading: false , userInfo: action.payload}
        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}
        case USER_LOGOUT:
            return{}
        default:
            return state        
    }
}


//user register reducer
export const userRegisterReducer = (state = {},action)=>{
    switch( action.type ){
        case USER_REG_REQUEST:
            return {loading: true }
        case USER_REG_SUCCESS:
            return {loading: false , userInfo: action.payload}
        case USER_REG_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state        
    }
}


//user details reducer
export const userDetailsReducer = (state = {user:{}},action)=>{
    switch( action.type ){
        case USER_DETAILS_REQUEST:
            return {...state,loading: true }
        case USER_DETAILS_SUCCESS:
            return {loading: false , user: action.payload}
        case USER_DETAILS_FAIL:
            return {loading: false, error: action.payload}   
        default:
            return state        
    }
}


//Update user info reducer
export const userUpdateReducer = (state = {},action)=>{
    switch( action.type ){
        case USER_UPDATE_REQUEST:
            return {loading: true }
        case USER_UPDATE_SUCCESS:
            return {loading: false ,success:true, userInfo: action.payload}
        case USER_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state        
    }
}

//GET ALL user info reducer
export const userListReducer = (state = {users:[]},action)=>{
    switch( action.type ){
        case USER_LIST_REQUEST:
            return {loading: true }
        case USER_LIST_SUCCESS:
            return {loading: false ,users: action.payload}
        case USER_LIST_FAIL:
            return {loading: false, error: action.payload}
        case USER_LIST_RESET:
            return {users:[]}    
        default:
            return state        
    }
}

//DELETE user info reducer
export const userDeleteReducer = (state = {},action)=>{
    switch( action.type ){
        case USER_DELETE_REQUEST:
            return {loading: true }
        case USER_DELETE_SUCCESS:
            return {loading: false ,success:true}
        case USER_DELETE_FAIL:
            return {loading: false, error: action.payload}   
        default:
            return state        
    }
}