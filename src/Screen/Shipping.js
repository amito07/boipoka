import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'
import {useDispatch , useSelector} from 'react-redux'
import {shippingAdressAdd} from '../Actions/cartAction'
import CheckoutSteps from '../Components/CheckoutSteps'


function Shipping() {
    const history = useHistory();
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    console.log(shippingAddress)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(shippingAdressAdd({address,city,postalCode,country}))
        history.push('/payment')
    }
    return (
        <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            {/* address field */}
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' placeholder='Enter address' value={address} onChange={(e)=> setAddress(e.target.value)}></Form.Control>
            </Form.Group>

            {/* city field */}
            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' placeholder='Enter city' value={city} onChange={(e)=> setCity(e.target.value)}></Form.Control>
            </Form.Group>

            {/* PostalCode field */}
            <Form.Group controlId='postalCode'>
                <Form.Label>PostalCode</Form.Label>
                <Form.Control type='text' placeholder='postalCode' value={postalCode} onChange={(e)=> setPostalCode(e.target.value)}></Form.Control>
            </Form.Group>

            {/* country field */}
            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' placeholder='Enter your country' value={country} onChange={(e)=> setCountry(e.target.value)}></Form.Control>
            </Form.Group>

            <Button className='my-3' type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
        
    </FormContainer>
    )
}

export default Shipping
