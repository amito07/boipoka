import React,{useState,useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button} from 'react-bootstrap'
import {useDispatch , useSelector} from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {listProducts,deleteProduct} from '../Actions/productActions'
import {useHistory} from 'react-router-dom'
function ProductListScreen() {
    const history = useHistory();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.adminProductList)
    const {loading ,error , products} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {success: successDelete} = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const deleteHandler=(id)=>{
        dispatch(deleteProduct(id))
    }
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listProducts())
        }else{
            history.push('/login')
        }
    }, [dispatch,history,successDelete])
    return (
        <>
        <h1>Products</h1>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:
        (
            <Table striped bordered hover responsive className = 'table-sm'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>CountInStock</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product=>(
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.countInStock}</td>
                            <td>
                                <LinkContainer to={`/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
            
        </>
    )
}

export default ProductListScreen
