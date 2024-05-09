import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  return (
    <>
      <Header />
      <Router>
        <main className="py-3">
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen />} exact />
              <Route path='/product/:id' element={<ProductScreen />}  />
              <Route path='/cart' element={<CartScreen />}  />
              <Route path='/login' element={<LoginScreen />}  />
              <Route path='/register' element={<RegisterScreen />}  />
              <Route path='/profile' element={<ProfileScreen />}  />
            </Routes>
          </Container>
        </main>
      </Router>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
