import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../graphql/mutations/Product';
import { Link, useNavigate } from 'react-router-dom';
import { GET_ALL_PRODUCTS } from '../graphql/queries/Product';

const AddProduct: React.FC = () => {
  
  const [name, setName] = useState("")
  const [description, setDesc] = useState("")
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const navigate = useNavigate()

  const [addProduct] = useMutation(ADD_PRODUCT);
  //error handling needed here

  const resetForm = () => {
    setName("");
    setDesc("");
    setPrice(0);
    setQuantity(0);
    setCategory("");
    setImage("");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Add a New Product</h1>
      <label className="block mb-2">
          Product Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="Enter product name"
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          Description:
          <input
            name="description"
            value={description}
            onChange={(event) => {
              setDesc(event.target.value);
            }}
            placeholder="Describe product here..."
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          Price per unit:
          <input
            type="number"
            name="price"
            value={price}
            onChange={(event) => {
              setPrice(parseFloat(event.target.value));
            }}
            placeholder=""
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          Product Category:
          <input
            type="text"
            name="category"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
            }}
            placeholder=""
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          Quantity:
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={(event) => {
              setQuantity(parseInt(event.target.value));
            }}
            placeholder=""
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          Image URL:
          <input
            type="text"
            name="image"
            value={image}
            onChange={(event) => {
              setImage(event.target.value);
            }}
            placeholder=""
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <button
        onClick={() => {
          addProduct({
            variables: {
              name: name,
              description: description,
              price: price,
              quantity: quantity,
              category: category,
              image: image,
              token: sessionStorage.getItem('token') || ''
            },
            refetchQueries: [{query:GET_ALL_PRODUCTS}]
          }).then(() => {
            resetForm();
            navigate('/')
          });
        }}
          type="submit"
          className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 mt-4 m-1"
        >
          Add Product
        </button>
        <Link to="/">
        <button className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 mt-4 m-1">
          Back to All Products
        </button>
        </Link>
    </div>
  );
};

export default AddProduct;
