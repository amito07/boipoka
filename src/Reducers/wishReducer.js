import {WISH_ADD_ITEM, WISH_REMOVE_ITEM} from '../Constains/wishListContants'
export const wishReducer =(state ={wishItem:[]},action)=>{
    switch(action.type){
        case WISH_ADD_ITEM:
            //get the click item info
            const item = action.payload;

            //x.product and item.product both are item ids
            const existItem = state.wishItem.find(x=> x.product === item.product)

            //same as cart 
            if(existItem){
                return{
                    ...state,
                    wishItem: state.wishItem.map(x => x.product === item.product ? item: x)
                }

            }else{
                return{
                    ...state,
                    wishItem:[...state.wishItem,item]
                }
            }
        case WISH_REMOVE_ITEM:
            return{
                ...state,
                wishItem: state.wishItem.filter((x)=> x.product !== action.payload)
            }    
        default:
            return state
    }
}