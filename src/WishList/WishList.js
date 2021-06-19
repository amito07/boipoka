import React,{useEffect} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import Message from '../Components/Message';
import {Link,useHistory} from 'react-router-dom';
import {addToWishList , removeFromWishList} from '../Actions/wishListAction';
import {Row,Col,ListGroup,Image,Button} from 'react-bootstrap';

function WishList({match}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const productId = match.params.id;
    // console.log(productId)
    const wishList = useSelector(state => state.wishList);
    const {wishItem} = wishList;
    console.log(wishItem)
    useEffect(() => {
        dispatch(addToWishList(productId))
    }, [dispatch,productId])
    const addToCartHandlerFromWish = (itemId)=>{
        dispatch(removeFromWishList(itemId))
        history.push(`/cart/${itemId}`)
    }
    return ( 
        <div style={{marginTop:'20px'}}>
        <Row>
            {/* column 1 */}
          <Col md={8}>
              <h1 style={{fontSize:'1.8rem', padding:'1rem 0'}}>Wish List</h1>
            {wishItem.length === 0 ? <Message>Your Wish List is empty <Link to='/'>Go Back</Link></Message>:
            (
                <ListGroup variant='flush'>
                    {wishItem.map(item=>(
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
                                    
                                </Col>
                                <Col md={2}> <Button type='button' variant='light' onClick={()=> addToCartHandlerFromWish(item.product)}>
                                    <i class="fas fa-cart-plus"></i>
                                </Button>
                                 </Col>
                            </Row>

                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )
            }
          </Col>  
        </Row>
    </div>
    )
}

export default WishList
