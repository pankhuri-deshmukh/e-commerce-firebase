import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Routes, Route } from "react-router-dom"
import ProductPage from './pages/ProductPage';
import AddProduct from './pages/AddProduct';
import ViewProduct from './pages/ViewProduct';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AllOrders from './pages/AllOrders';
import Hero from './components/Hero';
import Footer from './components/Footer';
import UpdateProduct from './pages/UpdateProduct';
import DeleteProduct from './pages/DeleteProduct';



function App() {

  const client = new ApolloClient({
    uri: "http://localhost:4001/graphql",
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
    <div>
      <Navbar/>
    <Routes>
      <Route path='/' element={<><Hero/> <ProductPage /></>} />
      <Route path='/products/add' element={<AddProduct />} />
      <Route path='/products/update' element={<UpdateProduct/>} />
      <Route path='/products/delete' element={<DeleteProduct/>} />
      <Route path='/products/:id' element={<ViewProduct />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/myorders' element={<AllOrders/>} />
      
    </Routes>
    <Footer />
    </div>
  </ApolloProvider>
  )
  
}

export default App;
