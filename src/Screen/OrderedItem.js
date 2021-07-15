import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {Row,Col,ListGroup,Image,Card,Container} from 'react-bootstrap'
import {useDispatch , useSelector} from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import {getOrderDetails} from '../Actions/orderAction'
import {Elements,CardElement,ElementsConsumer} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {Button} from '@material-ui/core'
const dotenv = require("dotenv")

dotenv.config()

const stripePromise = loadStripe('pk_test_51J839LGS3UwNqyCmYTkxhH9VPtQrGhAw5vW80lBWwSjJdeSxgCEueAd7su05VTD7tO66tBKjuHcm10gQq4vcGSfI00DLhG6yU6')

function OrderedItem({match}) {
    const handleSubmit = async(event,elements,stripe)=>{
        event.preventDefault();

        if(!stripe || !elements) return;
        const cardElement = elements.getElement(CardElement)
        const {error , paymentMethod} = await stripe.createPaymentMethod({type:'card',card: cardElement})

        if(error){
            console.log(error)
        }else{

        }
        

    }
    const orderId = match.params.id
    const dispatch = useDispatch()
    const history = useHistory();

    const orderDetails = useSelector(state => state.orderDetails)
    const{order,loading,error} = orderDetails
    
    if(!loading){
     // //calculate prices
     console.log("Amit Order", order)
     const addDecimals = (num)=>{
         return (Math.round(num*100)/100).toFixed(2)
     }
     order.itemsPrice = addDecimals(order.orderItems.reduce((acc,item)=> acc + item.price * item.qty,0))

    }



    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [dispatch])

    return loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : 
    <>
    <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            <p><strong>Name:</strong> {order.user.name}</p>
                            <p><strong>Email:</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Address:  </strong>
                                {order.shippingAddress.address},  {order.shippingAddress.city},  {order.shippingAddress.postalCode},  {order.shippingAddress.country}
                                {order.isDelivered ? <Message variant='success'> Delivered on {order.deliveredAt}</Message> :
                                <Message variant='danger'>Not Delivered</Message>}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                            {order.isPaid ? <Message variant='success'> Paid on {order.paidAt}</Message> :
                            <Message variant='danger'>Not Paid</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Order Items</h3>
                            {order.orderItems.length === 0 ? <Message>Your cart is empty</Message>:
                            (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item,index)=>(
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    {item.name}
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${Number((item.price * item.qty).toFixed(2))} 
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <h4>Order Summary</h4>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Elements stripe={stripePromise}>
                                        <ElementsConsumer>
                                            {({elements,stripe})=>(
                                                <form onSubmit={(e)=>handleSubmit(e,elements,stripe)}>
                                                    <CardElement/>
                                                    <br/><br/>
                                                    <Container style={{display:'flex', justifyContent:'space-between'}}>
                                                        <Button type='submit' variant='contained' disabled={!stripe} color='primary'>
                                                                Pay{order.totalPrice}
                                                        </Button>
                                                    </Container>
                                                </form>
                                            )}
                                        </ElementsConsumer>
                                </Elements>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </>
}

export default OrderedItem
