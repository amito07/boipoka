import React,{useEffect} from 'react'
import {Row,Col} from 'react-bootstrap'
import Product from '../Screen/Product'
import {useDispatch , useSelector} from 'react-redux'
import {listProducts} from '../Actions/productActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Slider from '../Components/Slider'

function HomeScreen() {
     const dispatch = useDispatch()

     const productList = useSelector(state => state.productList)
     const {loading , error , products} = productList
    useEffect(() => {
        dispatch(listProducts())

    }, [dispatch])

    return (
        <>
            {/* <Slider/> */}
            <h3>Latest Procucts</h3>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>: 
                <Row>
                {products.map(product =>(
                    <Col key={product._id}>
                        <Product product = {product}/>
                    </Col>
                ))}
                </Row> 
            }
        </>
    )
}

export default HomeScreen
