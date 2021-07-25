import React,{useEffect} from 'react'
import Itemz from './Itemz'
import {useDispatch , useSelector} from 'react-redux'
import {listProductDetails} from '../Actions/productActions'


function Items({match}) {
    // const product = products.find(item => item._id === match.params.id)
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading , error , product} = productDetails

    console.log("Loading",loading)
    console.log("Error",error)
    console.log("Products",product)
    useEffect(() => {
        dispatch(listProductDetails(match.params.id))

    }, [dispatch,match])
    return (
        <>
        <Itemz product = {product} error ={error} loading = {loading} match={match} />  
        </>
    )
}

export default Items
