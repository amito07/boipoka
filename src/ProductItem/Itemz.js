import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Card,Button , Form} from 'react-bootstrap'
import Rating from '../Screen/Rating'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { useHistory } from "react-router-dom";


function Itemz({product ,error , loading, match}) {

    const history = useHistory();
    const [qty, setQty] = useState(1)

    const addToCartHandler = ()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    return (
        <>
        {/* Go back button Link */}
    <Link className="btn btn-light my-3" to="/">
        Go Back
    </Link> 

    {loading ? <Loader/> : error ? <Message/> : 
    <Row>
    {/* image part */}
     <Col md={6}>
        <Image src={product.image} alt={product.name} fluid/>
     </Col>
    {/* Price and description part */}
     <Col md={3}>
        <ListGroup>
            <ListGroup.Item>
                <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
                <Rating
                rating = {product.rating}
                reviews = {`${product.numReviews} reviews`}
                />
            </ListGroup.Item>
            <ListGroup.Item>
                Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
                <h6>{product.description}</h6>
            </ListGroup.Item>

        </ListGroup>
     </Col>

    {/* Add to cart part */}
     <Col md={3} >
        <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Row>
                        <Col>
                            Price: 
                        </Col>
                        <Col>
                        <strong>${product.price}</strong>
                        </Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>
                            Status : 
                        </Col>
                        <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                        </Col>
                    </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                    <ListGroup.Item>
                    <Row>
                        <Col>
                            Qty : 
                        </Col>
                        <Col>
                        <Form.Control as='select' value={qty} onChange={(e)=> setQty(e.target.value)}>
                            {
                               [...Array(product.countInStock).keys()].map((x)=>(
                                   <option key={x+1} value={x+1}>
                                       {x+1}
                                   </option>
                               ))
                            }
                        </Form.Control>
                        </Col>
                    </Row>
                    </ListGroup.Item>

                )}
                <ListGroup.Item>
                    <Button className="btn-block" type="button" disabled = {product.countInStock === 0} onClick={addToCartHandler}>
                        Add To Cart
                    </Button>
                </ListGroup.Item>
            </ListGroup>
        </Card>
     </Col>
    </Row>
    
    
    }     
        </>
    )
}

export default Itemz
