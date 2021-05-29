import Header from "./Components/Header"
import {Container} from 'react-bootstrap'
import Footer from "./Components/Footer"
import HomeScreen from './Screen/HomeScreen'
function App() {
  return (
    <>
      <Header/>
      <main>
        <Container>
          <HomeScreen/>
        </Container>
      </main>
      <Footer/>
    </>
  );
}

export default App;
