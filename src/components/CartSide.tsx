import React, { useContext, useEffect, useState } from 'react';
import CartItemCard from './CartItemCard';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { CartItem } from '../interfaces/Cart';
import { VIEW_CART } from '../graphql/queries/Cart'; 
import { CREATE_ORDER } from '../graphql/mutations/Order';
import { ContextTypeCart } from '../interfaces/Context';
import { ContextCart } from './Navbar';
import { VIEW_ALL_ORDERS } from '../graphql/queries/Order';
import { CHECK_IF_ADMIN } from '../graphql/queries/User';

const CartSide = () => {
  const navigate = useNavigate();
  const [allCartItems, setAllCartItems] = useState<CartItem[]>([]);
  const { viewCart, setViewCart } = useContext<ContextTypeCart>(ContextCart);
  const token = sessionStorage.getItem('token');
  const [createOrderMutation] = useMutation(CREATE_ORDER);

  const adminData = useQuery(CHECK_IF_ADMIN, {
    variables: { token: sessionStorage.getItem('token') || '' },
  });
  const isAdmin = adminData.data?.checkIfAdmin.role === 'admin';
  
  const { loading, error, data } = useQuery(VIEW_CART, {
    variables: { token: token },
  }); 

  useEffect(() => {
    if (data) {
      setAllCartItems(data.viewCart); 
    }
  }, [data]);

  if(isAdmin){
    return (
      <div className="p-4 text-center">
        <p className="mb-2">Cart is unavailable.</p>
      </div>
    )
  }

  if (!token) {
    // If no token is present, user is not logged in
    return (
      <div className="p-4 text-center">
        <p className="mb-2">Please log in to view your cart</p>
        <button
          className="bg-black text-white py-2 px-4 rounded-md"
          onClick={() => {
            setViewCart(!viewCart)
            navigate('/login')
          }}
        >
          Login
        </button>
      </div>
    );
  }
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching items.</p>;
  }

  const handleCheckout = async () => {
    try {
      const { data } = await createOrderMutation({
        variables: {
          payment_status: 'successful', //set to 'successful' by default for now
          token: token,
        },
        refetchQueries: [
          { query: VIEW_ALL_ORDERS, variables: { token } }, 
          { query: VIEW_CART, variables: { token: token } }
        ]
      });

      const newOrder = data.createOrder;
      // Handle the newly created order as needed

      console.log('New order:', newOrder);
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  if(allCartItems.length === 0) {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
          <p className="text-lg mb-6">Cart is empty.</p>
          <button
            className="bg-black text-white py-2 px-4 rounded-md"
            onClick={() => {
              setViewCart(!viewCart)
              navigate('/')
          }}
          >
            Browse Products
          </button>
        </div>
      
    );
  }

  return (
    <div className="p-4 h-full">
  <div className="mb-4" style={{ maxHeight: 'calc(100vh - 170px)', overflowY: 'auto' }}>
    {allCartItems.map((item) => (
      <CartItemCard key={item.cart_item_id} item={item} />
    ))}
  </div>
  <div className="flex justify-center">
    <button
      className="bg-black text-white py-2 px-4 rounded-md mr-2"
      onClick={handleCheckout}
    >
      Check Out
    </button>
  </div>
</div>
  );
};

export default CartSide;
