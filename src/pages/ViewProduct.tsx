import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '../graphql/queries/Product';
import { ADD_ITEM_TO_CART } from '../graphql/mutations/Cart';
import { Product } from '../interfaces/Product';
import { VIEW_CART } from '../graphql/queries/Cart';

type IDParams = {
  id: string;
};

function invariant(value: unknown): asserts value {
  if (value) return;
  throw new Error("Invariant violation");
}

const ViewProduct: React.FC = () => {
  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART);

  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams<IDParams>();
  invariant(id);

  const parsedId = parseInt(id);

  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: parsedId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const product: Product = data.getProductById;
  const product_id = Number(product.product_id);

  const handleAddToCart = async () => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const { data } = await addItemToCart({
        variables: { product_id, quantity, token },
        refetchQueries: [{ query: VIEW_CART, variables: { token } }, 
          {query: GET_PRODUCT_BY_ID, variables: { id: parsedId }}],
      });

      //error handling required
      console.log(data)

      // if (data && data.addItemToCart.product !== null) {
      //   console.log('Successfully added to cart');
      // } else {
      //   alert("Selected quantity exceeds available quantity")
      // }
    } catch (error) {
      console.error('Add to cart error:', error);
    }
  };

  return (
    <div className="flex p-4 rounded-lg h-screen">
      <div className="w-1/3 pr-4">
        <img
          src={product.image}
          alt={product.name}
          className=" p-10"
        />
      </div>
      <div className="w-2/3 p-10">
        <h1 className="text-xl font-bold text-blue-700">{product.name}</h1>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-gray-900 font-semibold">Price: Rs. {product.price}</p>
        <p className="text-gray-900">Category: {product.category}</p>
        {product.quantity === 0 && (<p className="text-red-400">Out of Stock</p>)}
        {product.quantity !== 0 && (
          <div>
          <label className="block mb-2">
            Quantity:
            <input
              type="number"
              name="quantity"
              value={quantity}
              onChange={(event) => {
                const newQuantity = parseInt(event.target.value);
                if (newQuantity >= 1 && newQuantity <= product.quantity) {
                  setQuantity(newQuantity);
                } else if (newQuantity > product.quantity) {
                  setQuantity(product.quantity);
                } }}
              placeholder=""
              min="1"
              max={product.quantity}
              className="block mt-1 p-2 border rounded-md"
            />
          </label>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Add to Cart
          </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProduct;
