import React,{useEffect} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import Message from '../Components/Message';
import {Link,useHistory} from 'react-router-dom';
import {addToCart , removeFromCart} from '../Actions/cartAction';
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap';

function Cart({match,location}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    useEffect(() => {
        dispatch(addToCart(productId,qty))
    }, [dispatch,productId,qty])

    const removeFromCartHandler =(id)=>{
        dispatch(removeFromCart(id))
    }

    const checkoutHandle  = ()=>{
        history.push('/login?redirect=shipping')
    }
    return ( 
        <div style={{marginTop:'20px'}}>
        <Row>
            {/* column 1 */}
          <Col md={8}>
              <h1 style={{fontSize:'1.8rem', padding:'1rem 0'}}>Shopping Cart</h1>
            {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>:
            (
                <ListGroup variant='flush'>
                    {cartItems.map(item=>(
                        <ListGroup.Item key={item.product}>
                            <Row>
                                {/* product image */}
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                {/* product name */}
                                <Col md={3}>
                                    {/* item.product contain product id */}
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>
                                </Col>
                                {/* price  */}
                                <Col md={2}> ${item.price}</Col>
                                <Col md={2}>
                                    <Form.Control as='select' value={item.qty} onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value) ))}>
                                        {
                                        [...Array(item.countInStock).keys()].map((x)=>(
                                            <option key={x+1} value={x+1}>
                                                {x+1}
                                            </option>
                                        ))
                                        }
                                    </Form.Control>
                                </Col>
                                <Col md={2}> <Button type='button' variant='light' onClick={()=> removeFromCartHandler(item.product)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                                 </Col>
                            </Row>

                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )
            }
          </Col>  
            {/* column 2 */}
          <Col md={4}>
              <Card>
                  <ListGroup variant='flush'>
                      <ListGroup.Item>
                          {/* reduce function to count total sub item in the cart */}
                          <h2 style={{fontSize:'1.4rem', padding:'0.5rem 0'}}> Subtotal ({cartItems.reduce((acc,item)=> acc + item.qty,0)}) items</h2>
                          <h3 style={{fontSize:'1rem', padding:'0.5rem 0'}}>Subtotal: ${cartItems.reduce((acc,item)=>acc +item.qty*item.price,0).toFixed(2)}</h3>
                      </ListGroup.Item>
                      <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandle} >
                                Proceed To CheckOut
                            </Button>
                      </ListGroup.Item>
                  </ListGroup>
              </Card>
          </Col>
        </Row>
    </div>
    )
}

export default Cart
