import { createStore, combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer , productDetailsReducer,adminProductListReducer,productDeleteReducer,productUpdateReducer,productCreateReducer,productCreateReviewReducer,topProductReducer} from './Reducers/productReducer'
import {cartReducer} from './Reducers/cartReducer'
import {wishReducer} from './Reducers/wishReducer'
import {userLoginReducer,userRegisterReducer,userUpdateReducer,userListReducer,userDeleteReducer} from './Reducers/userReducer'
import {orderCreateReducer,orderDetailsReducer,orderPayReducer,orderMyListReducer,adminOrderListReducer,orderDeliverReducer} from './Reducers/orderReducer'



//getting data from localstorage
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const wishListItemsFromStorage = localStorage.getItem('wishItem') ? JSON.parse(localStorage.getItem('wishItem')) : []
const userinfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

//initial the state
const initialState = {
    cart: {
        cartItems:cartItemsFromStorage,
        shippingAddress:shippingAddressFromStorage
    },
    wishList: {
        wishItem: wishListItemsFromStorage
    },
    userLogin: {userInfo : userinfoFromStorage},
}
//this instance that contain all state reducer just like a container

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete:productDeleteReducer,
    productUpdate:productUpdateReducer,
    productCreate:productCreateReducer,
    productCreateReview : productCreateReviewReducer,
    topProduct:topProductReducer,
    adminProductList:adminProductListReducer,
    cart: cartReducer,
    wishList:wishReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    // userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderMyList : orderMyListReducer,
    adminOrderList: adminOrderListReducer,
    orderDeliver:orderDeliverReducer
})
//it is work as a middleware (thunk)
const middleware = [thunk]

//create the container named store
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;
