import { createStore, combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer , productDetailsReducer} from './Reducers/productReducer'
import {cartReducer} from './Reducers/cartReducer'
import {wishReducer} from './Reducers/wishReducer'



const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const wishListItemsFromStorage = localStorage.getItem('wishItem') ? JSON.parse(localStorage.getItem('wishItem')) : []

//initial the state
const initialState = {
    cart: {
        cartItems:cartItemsFromStorage
    },
    wishList: {
        wishItem: wishListItemsFromStorage
    }
}
//this instance that contain all state reducer just like a container

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    wishList:wishReducer
})
//it is work as a middleware (thunk)
const middleware = [thunk]

//create the container named store
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;
