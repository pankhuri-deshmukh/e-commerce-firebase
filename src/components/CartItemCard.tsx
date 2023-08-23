import React from 'react';
import { CartItemProps } from '../interfaces/Cart';
import { useMutation } from '@apollo/client';
import { REMOVE_ITEM_FROM_CART } from '../graphql/mutations/Cart';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import { VIEW_CART } from '../graphql/queries/Cart';

const CartItemCard: React.FC<CartItemProps> = ({ item }) => {
  const [removeItemFromCart] = useMutation(REMOVE_ITEM_FROM_CART);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/');
    }

    try {
      const id = Number(item.cart_item_id);
      const { data } = await removeItemFromCart({
        variables: { cart_item_id: id, token },
        refetchQueries: [{ query: VIEW_CART, variables: { token } }],
      });
      if (data) {
        console.log('Successfully removed from cart');
      }
    } catch (error) {
      console.error('Remove from cart error:', error);
    }
  };

  return (
    <div className="border p-4 rounded-lg mb-4 shadow-md relative">
      <div className="absolute top-2 right-2 cursor-pointer text-red-600" onClick={handleDelete}>
        <AiOutlineDelete size={25} />
      </div>
      <div className="flex items-center">
        <div className="w-20 h-20 mr-4">
          <img
            src={item.product.image} 
            alt={item.product.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">{item.product.name}</h2>
          <p className="text-gray-700">Price: Rs. {item.product.price}</p>
          <p className="text-gray-700">Quantity: {item.quantity}</p>
          <p className="text-gray-700">Subtotal: Rs. {item.subtotal}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
