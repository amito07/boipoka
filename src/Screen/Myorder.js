import React,{useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {listMyOrders} from '../Actions/orderAction'
import {useDispatch , useSelector} from 'react-redux'
import {Table,Form,Button,Row,Col, Container} from 'react-bootstrap'
import Message from '../Components/Message'
import Loader from '../Components/Loader'

function Myorder() {
    const dispatch = useDispatch();

    const orderMyList = useSelector(state => state.orderMyList)
    const {loading ,error ,orders} = orderMyList


    useEffect(() => {
        dispatch(listMyOrders())

    }, [dispatch])
    return (
        <Row style={{marginTop:'70px'}}>
            <Col md={9}>
                {loading ? <Loader/> :  error ? <Message variant='danger'>{error}</Message> :(

                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order=>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? (<i class="far fa-check-circle" style={{color:'green'}}></i>) : (<i class="far fa-times-circle" style={{color:'red'}}></i>)}</td>
                                <td>{order.isDelivered ? (<i class="far fa-check-circle" style={{color:'green'}}></i>) : (<i class="far fa-times-circle" style={{color:'red'}}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/orders/${order._id}`}>
                                        <Button className='btn-sm' variant='light'>
                                            Details
                                        </Button>
                                    </LinkContainer>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                )}
            </Col>
        </Row>
    )
}

export default Myorder
