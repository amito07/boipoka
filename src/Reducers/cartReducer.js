import { CART_ADD_ITEM,CART_REMOVE_ITEM,SHIPPING_ADDRESS_SAVE,PAYMENT_METHOD_SAVE,CART_RESET_ITEM } from '../Constains/cartContants'

export const cartReducer = (state = {cartItems:[],shippingAddress:{}},action) =>{ 
    switch(action.type){
        case CART_ADD_ITEM :
            //make sure item already exist checking

            //item contain info of click item
            const item = action.payload;

            //exisItem check this click item in the cart or not 
            const existItem = state.cartItems.find(x=> x.product === item.product)

            //if the click item already exist in the cart
            if(existItem){
                //x.product and existItem.product are an id 
                return{
                    ...state,
                    cartItems: state.cartItems.map(x=> x.product === existItem.product ? item : x)
                }

            }

            //if the click item not exist in the cart means it is new item that not included in the cart
            else{
                return {
                   ...state,
                   cartItems: [...state.cartItems,item]  
                }
            }
        case CART_REMOVE_ITEM:
                return{
                    ...state,
                    cartItems: state.cartItems.filter((x)=> x.product !== action.payload)
                }
        case SHIPPING_ADDRESS_SAVE:
            return{
                ...state,
                shippingAddress: action.payload
            } 
            
        case PAYMENT_METHOD_SAVE:
            return{
                ...state,
                paymentMethod: action.payload
            }  
            
        case CART_RESET_ITEM:
            return{cartItems:[] , shippingAddress:{}}    
        default:
            return state
    }
}