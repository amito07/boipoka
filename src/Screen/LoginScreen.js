import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch , useSelector} from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {login} from '../Actions/userAction'
import FormContainer from '../Components/FormContainer'

function LoginScreen({location}) {
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const {loading , error , userInfo} = userLogin 
    //location.search that contain like 
    //Assume that the current URL is https://www.w3schools.com/submit.htm?email=someone@example.com
    //then location.search will contain ?email=someone@example.com
    const redirect = location.search ? location.search.split('=')[1]: '/'
    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history , userInfo , redirect])
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(login(email, password))
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>


                {/* email field */}
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
                </Form.Group>


                {/* password field */}
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=> setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button className='my-3' type='submit' variant='primary'>
                    Sign In
                </Button>

                <Row className='py-3'>
                    <Col>
                        New User? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                    </Col>
                </Row>
            </Form>
            
        </FormContainer>
    )
}

export default LoginScreen
