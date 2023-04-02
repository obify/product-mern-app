import './App.css';
import Navbar from './componenets/Navbar';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Products from './componenets/Products';
import Home from './componenets/Home';
import Footer from './componenets/Footer';

function App() {
  return (
    <div className="App">
    <Router>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>} ></Route>
    <Route path='/products' element={<Products/>} ></Route>
    
    </Routes>
    <Footer/>
    </Router>
    </div>
  );
}

export default App;
