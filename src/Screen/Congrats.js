import React,{useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {ORDER_DETAILS_RESET} from '../Constains/orderConstant'
import {CART_RESET_ITEM} from '../Constains/cartContants'

function Congrats() {
    const history = useHistory();
    const dispatch = useDispatch();
    setTimeout(() => {
        history.push('/')
    }, 3000);
    useEffect(() => {
        dispatch({type: ORDER_DETAILS_RESET})
        dispatch({type: CART_RESET_ITEM})
    }, [dispatch])
    return (
        <div>
            <h1>Congrats To buy Product From us</h1>
            <h3>Stay With Us...................</h3>
        </div>
    )
}

export default Congrats
