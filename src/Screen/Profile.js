import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch , useSelector} from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {getuserDetails,updateUser} from '../Actions/userAction'
import {listMyOrders} from '../Actions/orderAction'

function Profile({}) {
    const history = useHistory();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch();
    // const userDetails = useSelector(state => state.userDetails)
    // const {loading , error , user} = userDetails


    const userLogin = useSelector(state => state.userLogin)
    const {loading,error,userInfo} = userLogin


    const userUpdate = useSelector(state => state.userUpdate)
    const {success} = userUpdate

    const orderMyList = useSelector(state => state.orderMyList)
    const {loading: loadingOrders ,error:errorOrders ,orders} = orderMyList


    useEffect(() => {
        if(!userInfo){
            history.push('/')
        }else{
            if(!userInfo.name){
                dispatch(getuserDetails('profile'))
            }else{
                dispatch(listMyOrders())
                setName(userInfo.name)
                setEmail(userInfo.email)
                setPhone(userInfo.phone)
                setAddress(userInfo.address)
            }
        }
    }, [dispatch,history,userInfo])  
    const submitHandler = (e)=>{
        e.preventDefault();
        if(password !== cpassword){
            setMessage('Password or Email Invalit not Match !')
        }else{
            //dispatch update profile
            dispatch(updateUser({id:userInfo._id, name ,email,phone,address,password} ))
        }
    }
    return (
        <Row>
            <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                    {/* name field */}
                    <Form.Group controlId='name'>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter full name' value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    {/* email field */}
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
                    </Form.Group>

                    {/* phoneNo field */}
                    <Form.Group controlId='phnNo'>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type='text' placeholder='Phone number' value={phone} onChange={(e)=> setPhone(e.target.value)}></Form.Control>
                    </Form.Group>

                    {/* address field */}
                    <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control type='text' placeholder='Enter your address' value={address} onChange={(e)=> setAddress(e.target.value)}></Form.Control>
                    </Form.Group>


                    {/* password field */}
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=> setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    {/* confirm password field */}
                    <Form.Group controlId='cpassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter confirm password' value={cpassword} onChange={(e)=> setCpassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button className='my-3' type='submit' variant='primary'>
                        Update
                    </Button>
            </Form>
    
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
            </Col>


        </Row>
    )
}

export default Profile
