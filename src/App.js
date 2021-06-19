import Header from "./Components/Header"
import {Container} from 'react-bootstrap'
import Footer from "./Components/Footer"
import HomeScreen from './Screen/HomeScreen'
import Cart from './Cart/Cart'
import WishList from './WishList/WishList'
import Items from './ProductItem/Items'
import {BrowserRouter as Router , Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header/>
      <main>
        <Container>
          <Route exact path="/" component={HomeScreen}/>
          <Route exact path="/cart/:id?" component={Cart}/>
          <Route exact path="/product/:id" component={Items}/>
          <Route exact path="/wishlist/:id?" component={WishList}/>
        </Container>
      </main>
      <Footer/>

    </Router>
  );
}

export default App;
