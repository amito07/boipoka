import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch , useSelector} from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {listProductDetails,updateProduct} from '../Actions/productActions'


function EditProducts({match}) {
    console.log("IDS: ",match.params.id)
    const history = useHistory();
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [countInStock, setCountInStock] = useState(null)
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    const productDetails = useSelector(state => state.productDetails)
    const {loading, error , product} = productDetails
    console.log(product)


    const productUpdate = useSelector(state => state.productUpdate)
    const {success} = productUpdate


    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listProductDetails(match.params.id))
            setName(product.name)
            setImage(product.image)
            setDescription(product.description)
            setBrand(product.brand)
            setCategory(product.category)
            setPrice(product.price)
            setCountInStock(product.countInStock)
        }else{
            history.push('/login')
        }
        
    }, [dispatch,history,product.name]) 

    const submitHandler = (e)=>{
        e.preventDefault();
        console.log("Submitted")
        if(userInfo && userInfo.isAdmin){
            dispatch(updateProduct(match.params.id,{id:product._id, name ,description,brand,category,price,countInStock}))
        }
    }
    return (
        <Row>
            <Col md={12}>
            <h2>Update Product information</h2>
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                    {/* name field */}
                    <Form.Group controlId='product_name'>
                        <Form.Label>Product name</Form.Label>
                        <Form.Control type='text' placeholder='Product name' value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    {/* email field */}
                    {/* <Form.Group controlId='image'>
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control type='tesxt' placeholder='Upload Image' value={image} onChange={(e)=> setImage(e.target.value)}></Form.Control>
                    </Form.Group> */}

                    {/* phoneNo field */}
                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' placeholder='Phone number' value={description} onChange={(e)=> setDescription(e.target.value)}></Form.Control>
                    </Form.Group>

                    {/* address field */}
                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type='text' placeholder='Brand' value={brand} onChange={(e)=> setBrand(e.target.value)}></Form.Control>
                    </Form.Group>


                    {/* password field */}
                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type='text' placeholder='Category' value={category} onChange={(e)=> setCategory(e.target.value)}></Form.Control>
                    </Form.Group>

                    {/* confirm password field */}
                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='text' placeholder='price' value={price} onChange={(e)=> setPrice(e.target.value)}></Form.Control>
                    </Form.Group>

                    {/* stock */}
                    <Form.Group controlId='countInStock'>
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control type='text' placeholder='Count In Stock' value={countInStock} onChange={(e)=> setCountInStock(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button className='my-3' type='submit' variant='primary'>
                        Update
                    </Button>
            </Form>
    
            </Col>
        </Row>
    )
}

export default EditProducts
