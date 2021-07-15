import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch , useSelector} from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {listProductDetails,updateProduct,createProduct} from '../Actions/productActions'
const axios = require('axios')


function CreateProductScreen() {
    const history = useHistory();
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [countInStock, setCountInStock] = useState(null)
    const [uploading, setUploading] = useState(false)
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    const productDetails = useSelector(state => state.productDetails)
    const {loading, error , product} = productDetails
    // console.log(product)


    const productUpdate = useSelector(state => state.productUpdate)
    const {success} = productUpdate

    const productCreate = useSelector(state => state.productCreate)
    const {
        loading: loadingCreate,
        error:errorCreate,
        success:successCreate
    
    } = productCreate


    // useEffect(() => {
    //     dispatch({type: PRODUCT_CREATE_RESET})
    //     if(userInfo && userInfo.isAdmin){
    //         // dispatch(listProductDetails(match.params.id))
    //     }else{
    //         history.push('/login')
    //     }
        
    // }, [dispatch,history,product.name]) 

    const submitHandler = (e)=>{
        e.preventDefault();
        if(userInfo && userInfo.isAdmin){
            dispatch(createProduct({name,image,description,brand,category,price,countInStock}))
        }
    }

    const uploadFileHandler = async(e)=>{
        e.preventDefault();
        const file = e.target.files[0]
        console.log(file)
        const formData = new FormData();
        formData.append('image',file)
        setUploading(true)
        console.log("Form Data",formData)
        try {
            const config={
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/upload',formData,config)
            console.log(data)
            console.log("Data Type: ",typeof(data))
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error);
            setUploading(false)
        }
    }

    return (
        <Row>
            <Col md={12}>
            <h2>Create Product</h2>
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading && <Loader/>}
            {errorCreate && <Message variant='success'>{errorCreate}</Message>}
            {loadingCreate && <Loader/>}
            <Form onSubmit={submitHandler}>
                    {/* name field */}
                    <Form.Group controlId='product_name'>
                        <Form.Label>Product name</Form.Label>
                        <Form.Control type='text' placeholder='Product name' value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    {/* image field */}
                    <Form.Group controlId='image'>
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control type='text' placeholder='Upload Image url' value={image} ></Form.Control>
                        <Form.File id='image' name='image' type='file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
                        {uploading && <Loader/>}
                    </Form.Group>

                    {/* description field */}
                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' placeholder='Description' value={description} onChange={(e)=> setDescription(e.target.value)}></Form.Control>
                    </Form.Group>

                    {/* brand field */}
                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type='text' placeholder='Brand' value={brand} onChange={(e)=> setBrand(e.target.value)}></Form.Control>
                    </Form.Group>


                    {/* category field */}
                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type='text' placeholder='Category' value={category} onChange={(e)=> setCategory(e.target.value)}></Form.Control>
                    </Form.Group>

                    {/* price  field */}
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
                        Create
                    </Button>
            </Form>
    
            </Col>
        </Row>
    )
}

export default CreateProductScreen
