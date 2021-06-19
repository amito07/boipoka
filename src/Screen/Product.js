import React from 'react'
import {Card,Button, Container,Row} from 'react-bootstrap'
import Rating from '../Screen/Rating'
import {Link,useHistory} from 'react-router-dom'

function Product({product}) {
    const history = useHistory();
    const addToCartHandler = ()=>{
        history.push(`/cart/${product._id}`)
    }

    const addToWishListHandler = ()=>{
        history.push(`/wishlist/${product._id}`)
    }
    return (
        <div className="main-div">
            <Card className="mb-3" style={{ width: '18rem'}}>
                <Link to={`/product/${product._id}`}>
                    <Card.Img variant="top" src={product.image} />
               </Link>   

               <Card.Body>
                 <Link to={`/product/${product._id}`} className="text-decoration-none">
                 <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
                </Link>
               <Card.Text as="h6">{product.description}</Card.Text>
               <Card.Text as="h5">${product.price}</Card.Text>
               <Card.Text as="div">
                   <Rating rating={product.rating} reviews={`${product.numReviews} reviews`}/>
               </Card.Text>
                    <Container>
                        <Row>
                        <Button variant="primary" className="mb-3" onClick={addToCartHandler}> <i className="fas fa-cart-plus"></i>Add to Cart</Button>
                        <Button variant="primary" className="mb-3" onClick={addToWishListHandler}> <i className="fas fa-heart"></i>WishList</Button>
                        </Row>
                    </Container>
               </Card.Body>
            </Card>
        </div>
    )
}

export default Product
