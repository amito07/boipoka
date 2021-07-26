import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Carousel , Image} from 'react-bootstrap'
import {Row,Col} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import {listTopProducts} from '../Actions/productActions'
import {useDispatch , useSelector} from 'react-redux'
import {listProducts} from '../Actions/productActions'


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
        //  <Carousel pause='hover' className='bd-dark'>
        //      {products.map(product=>(
        //          <Carousel.Item key={product._id}>
        //              <Row>
        //                  <Col md={7}>
        //                     <Link to ={`/product/${product._id}`}>
        //                         <Image src={product.image} alt={product.name} fluid/>
        //                     </Link>
        //                  </Col>

        //                  <Col md={5}>
        //                     <Carousel.Caption className='carousel-caption'>
        //                         <h2>{product.name} ({product.price})</h2>
        //                     </Carousel.Caption>
        //                  </Col>
        //              </Row>
                     
        //          </Carousel.Item>
        //      ))}
        //  </Carousel>
        <Carousel>
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
