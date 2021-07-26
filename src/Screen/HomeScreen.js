import React,{useEffect} from 'react'
import {Row,Col} from 'react-bootstrap'
import Product from '../Screen/Product'
import {useDispatch , useSelector} from 'react-redux'
import {listProducts} from '../Actions/productActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import ProductCarousel from '../Components/ProductCarousel'

function HomeScreen({match}) {

    const keyword = match.params.keyword

     const dispatch = useDispatch()
     const productList = useSelector(state => state.productList)
     const {loading , error , products} = productList
    useEffect(() => {
        dispatch(listProducts(keyword))

    }, [dispatch ,keyword])
 
    return (
        <>
            {!keyword && <ProductCarousel/>}

            <h3>Electronics Products</h3>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>: 
                <Row>   
                {products.map(product =>(
                    product.category === 'Electronics' &&
                    <Col key={product._id}>
                        <Product product = {product}/>
                    </Col>
                ))}
                </Row> 
            }

            <h3>Cloths Product</h3>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>: 
                <Row>   
                {products.map(product =>(
                    product.category === 'cloths' &&
                    <Col key={product._id}>
                        <Product product = {product}/>
                    </Col>
                ))}
                </Row> 
            }

            <h3>Food</h3>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>: 
                <Row>   
                {products.map(product =>(
                    product.category === 'foods' &&
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
