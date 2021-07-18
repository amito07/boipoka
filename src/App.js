import Header from "./Components/Header"
import {Container} from 'react-bootstrap'
import Footer from "./Components/Footer"
import HomeScreen from './Screen/HomeScreen'
import Cart from './Cart/Cart'
import WishList from './WishList/WishList'
import Items from './ProductItem/Items'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import LoginScreen from './Screen/LoginScreen'
import RegisterScreen from './Screen/RegisterScreen'
import Profile from './Screen/Profile'
import Shipping from './Screen/Shipping'
import PaymentScreen from './Screen/PaymentScreen'
import PlaceOrderScreen from './Screen/PlaceOrderScreen'
import OrderedItem from './Screen/OrderedItem'
import UserListScreen from './Screen/UserListScreen'
import ProductListScreen from './Screen/ProductListScreen'
import EditProducts from './Screen/EditProducts'
import CreateProductScreen from './Screen/CreateProductScreen'
import Congrats from './Screen/Congrats'

function App() {
  return (
    <Router>
      <Header/>
      <main>
        <Container>
          <Route exact path="/orders/:id" component={OrderedItem}/>
          <Route exact path="/placeorder" component={PlaceOrderScreen}/>
          <Route exact path="/payment" component={PaymentScreen}/>
          <Route exact path="/shipping" component={Shipping}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/register" component={RegisterScreen}/>
          <Route exact path="/login" component={LoginScreen}/>
          <Route exact path="/" component={HomeScreen}/>
          <Route exact path="/cart/:id?" component={Cart}/>
          <Route exact path="/product/:id" component={Items}/>
          <Route exact path="/wishlist/:id?" component={WishList}/>
          <Route exact path="/getalluser" component={UserListScreen}/>
          <Route exact path="/productlist" component={ProductListScreen}/>
          <Route exact path="/products/edit/:id" component={EditProducts}/>
          <Route exact path="/productCreate" component={CreateProductScreen}/>
          <Route exact path="/congrats" component={Congrats}/>
        </Container>
      </main>
      <Footer/>

    </Router>
  );
}

export default App;
