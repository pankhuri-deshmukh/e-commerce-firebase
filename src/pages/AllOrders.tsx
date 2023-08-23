import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Order } from '../interfaces/Order';
import OrderCard from '../components/OrderCard';
import { VIEW_ALL_ORDERS } from '../graphql/queries/Order';
import { useNavigate } from 'react-router-dom';

const AllOrders: React.FC = () => {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const navigate = useNavigate()

  const { loading, error, data } = useQuery(VIEW_ALL_ORDERS, {
    variables: { token: sessionStorage.getItem('token') || '' },
  });

  useEffect(() => {
    if (data) {
      setAllOrders(data.viewOrders); 
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching orders.</p>;
  }

  if (allOrders.length === 0) {
    return (
      <div className='h-screen w-full flex justify-center items-center flex-col'>
        <p className='text-xl mb-4'>Oops! You don't have any orders yet.</p>
        <button
          className='bg-black text-white py-2 px-4 rounded-md'
          onClick={() => navigate('/')}
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-6 pl-6 pr-6 mb-6">
        {allOrders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
