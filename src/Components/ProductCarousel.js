import React,{useEffect} from 'react'
import {Carousel} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import {listTopProducts} from '../Actions/productActions'
import {useDispatch , useSelector} from 'react-redux'


function ProductCarousel() {
    const dispatch = useDispatch() 
    // const topRatedProduct = useSelector(state => state.topProduct)
    // const {loading , error , products} = topRatedProduct

    const productList = useSelector(state => state.productList)
     const {loading , error , products} = productList

    console.log("Type Check",typeof(products))

    useEffect(() => {
        dispatch(listTopProducts())

    }, [dispatch])
    return loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>

        :(

        <Carousel style={{marginTop: '50px'}}>
            {products.map(product=>(
                <Carousel.Item>

                    <img
                    className="carousel-img"
                    src={product.image}
                    alt={product.name}
                    />
                    <Carousel.Caption className='carousel-caption'>
                    <h2>{product.name}</h2>
                    <p>${product.price}</p>
                    </Carousel.Caption>
                </Carousel.Item>

            ))}
        </Carousel>

        )
    
}

export default ProductCarousel
