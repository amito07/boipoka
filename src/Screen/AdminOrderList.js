import React,{useEffect} from 'react'
import {adminOrderShow} from '../Actions/orderAction'
import {useDispatch , useSelector} from 'react-redux'
import {Table,Button,Row,Col} from 'react-bootstrap'
import Message from '../Components/Message'
import {orderDelivery} from '../Actions/orderAction'
import Loader from '../Components/Loader'

function AdminOrderList() {
    const dispatch = useDispatch();

    const adminOrderList = useSelector(state => state.adminOrderList)
    const {loading ,error ,orders} = adminOrderList

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {success} = orderDeliver

    const deliveryHandler = (id) =>{
        dispatch(orderDelivery(id))
    }
    useEffect(() => {
        dispatch(adminOrderShow())

    }, [dispatch,success])
    return (
        <Row style={{marginTop:'70px'}}>
            <Col md={12}>
                {loading ? <Loader/> :  error ? <Message variant='danger'>{error}</Message> :(

                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER NAME</th>
                            <th>EMAIL</th>
                            <th>PHONE</th>
                            <th>ADDRESS</th>
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
                                <td>{order.user.name}</td>
                                <td>{order.user.email}</td>
                                <td>{order.user.phone}</td>
                                <td>{order.user.address}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? (<i class="far fa-check-circle" style={{color:'green'}}></i>) : (<i class="far fa-times-circle" style={{color:'red'}}></i>)}</td>
                                <td>{order.isDelivered ? (<i class="far fa-check-circle" style={{color:'green'}}></i>) : (<i class="far fa-times-circle" style={{color:'red'}}></i>)}</td>
                                <td>
                                        <Button className='btn-sm' variant='light' onClick={()=>deliveryHandler(order._id)}>
                                            Details
                                        </Button>
                                    
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

export default AdminOrderList
