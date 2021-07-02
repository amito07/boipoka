import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'
import {useDispatch , useSelector} from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {register} from '../Actions/userAction'


function RegisterScreen({location}) {
    const history = useHistory();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister)
    const {loading , error , userInfo} = userRegister
    const redirect = location.search ? location.search.split('=')[1]: '/'
    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history , userInfo , redirect])
    const submitHandler = (e)=>{
        e.preventDefault();
        if(password !== cpassword){
            setMessage('Password or Email Invalit not Match !')
        }else{
            dispatch(register(name,email,phone,address,password))
        }
    }
    return (
        <FormContainer>
        <h1>Registration</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
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
                Register
            </Button>

            <Row className='py-3'>
                <Col>
                    Already Have Account ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign up</Link>
                </Col>
            </Row>
        </Form>
        
    </FormContainer>
    )
}

export default RegisterScreen
