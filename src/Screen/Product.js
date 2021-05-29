import React from 'react'
import {Card,Button, Container,Row} from 'react-bootstrap'

function Product({product}) {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <a href={`/product/${product._id}`}>
                    <Card.Img variant="top" src={product.image} />
               </a>   

               <Card.Body>
                 <a href={`/product/${product._id}`} className="text-decoration-none">
                 <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
                </a>
               <Card.Text as="h6">{product.description}</Card.Text>
               <Card.Text as="h5">${product.price}</Card.Text>
               <Card.Text as="div">
                   <div className="my-3">
                        {product.rating} from {product.numReviews} reviews
                   </div>
               </Card.Text>
                    <Container>
                        <Row>
                        <Button variant="primary" className="mb-3"><i class="fas fa-cart-plus"></i>Add to Cart</Button>
                        <Button variant="primary" className="mb-3"><i class="fas fa-heart"></i>WishList</Button>
                        </Row>
                    </Container>
               </Card.Body>
            </Card>
        </div>
    )
}

export default Product
