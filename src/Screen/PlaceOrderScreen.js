import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap'
import {useDispatch , useSelector} from 'react-redux'
import CheckoutSteps from '../Components/CheckoutSteps'
import Message from '../Components/Message'
import {createOrder} from '../Actions/orderAction'

function PlaceOrderScreen() {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const history = useHistory();

    //calculate prices
    cart.itemsPrice = Number(cart.cartItems.reduce((acc,item)=> acc + item.price * item.qty,0).toFixed(2))
    cart.shippingPrice = cart.itemsPrice > 0 ? 0:100
    cart.taxPrice = Number((0.15*cart.itemsPrice).toFixed(2))
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice
    console.log("Cart",cart)
    const orderCreate = useSelector(state => state.orderCreate)
    const{order,success,error} = orderCreate

    useEffect(() => {
        if(success){
            history.push(`/orders/${order._id}`)
        }
    }, [history,success])


    //submit handler
    const placeOrderHandler = ()=>{
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            shippingPrice : cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            <p>
                                <strong>Address:  </strong>
                                {cart.shippingAddress.address},  {cart.shippingAddress.city},  {cart.shippingAddress.postalCode},  {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Order Items</h3>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message>:
                            (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item,index)=>(
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
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message> }
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cart.cartItems ===0 } onClick={placeOrderHandler} >
                                            Place Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </>
    )
}

export default PlaceOrderScreen
