import React from 'react'
import product from '../products'
import {Row,Col} from 'react-bootstrap'
import Product from '../Screen/Product'
function HomeScreen() {
    return (
        <div>
            <h3>Latest Procucts</h3>
            <Row>
                {product.map(product =>(
                    <Col>
                        <Product product = {product}/>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen
