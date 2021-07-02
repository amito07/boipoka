import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Form,Button,Col} from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'
import {useDispatch , useSelector} from 'react-redux'
import {paymentMethodAdd} from '../Actions/cartAction'
import CheckoutSteps from '../Components/CheckoutSteps'


function PaymentScreen() {
    const history = useHistory();
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    //if shipping address is empty
    if(!shippingAddress){
        history.push('/shipping')
    }
    //default payment method is paypal
    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(paymentMethodAdd(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check type='radio' label='Paypal or Credit Card'
                    id='PayPal' name='paymentMethod' value='PayPal' checked
                    onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>

                    <Form.Check type='radio' label='Bkash'
                    id='Bkash' name='paymentMethod' value='Bkash' checked
                    onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>

                    <Form.Check type='radio' label='Nagad'
                    id='Nagad' name='paymentMethod' value='Nagad' checked
                    onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                </Col>
            </Form.Group>

            

            <Button className='my-3' type='submit' variant='primary'>
                Continue
            </Button>
        </Form>  
    </FormContainer>
    )
}

export default PaymentScreen
