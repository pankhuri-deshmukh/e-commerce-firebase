import React, { useState } from 'react';
import { OrderProps } from '../interfaces/Order';
import OrderItemCard from './OrderItemCard'; 
import { useMutation, useQuery } from '@apollo/client'; 
import { VIEW_ALL_ORDERS, VIEW_ORDER_DETAILS } from '../graphql/queries/Order'; 
import { useNavigate } from 'react-router-dom';
import { CANCEL_ORDER } from '../graphql/mutations/Order';
import { FcExpand } from 'react-icons/fc';
import { MdOutlineMinimize } from 'react-icons/md';

const OrderCard: React.FC<OrderProps> = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate()

  const [cancelOrder] = useMutation(CANCEL_ORDER);

  const { loading, error, data } = useQuery(VIEW_ORDER_DETAILS, {
    variables: { order_id: Number(order.order_id), token: sessionStorage.getItem('token') || ''},
  });

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (error) {
    return <p>Error fetching order details.</p>;
  }

  const handleCancel = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate("/login")  
    }
  
    try {
      const id = Number(order.order_id)
      const { data } = await cancelOrder({
        variables: { order_id: id, token },
        refetchQueries: [{ query: VIEW_ALL_ORDERS, variables: { token: sessionStorage.getItem('token') || '' }, }]
      });
      if (data) {
        console.log("Successfully cancelled")
      }
    } 
    catch (error) {
      console.error("Order cancellation error:", error);
    }
  }

  return (
    <div className={`border p-4 rounded-md shadow-md`}>
      <div className="flex justify-between items-center mb-2">
        
        <h3 className={`text-lg font-semibold ${order.order_status === 'cancelled' ? 'text-red-600' : ''}`}>
          Order ID: {order.order_id}
        </h3>
        <div className="flex justify-between items-center mb-2">
        {order.order_status === 'cancelled' && <span className="text-s text-red-600 mr-2">Cancelled</span>}
        
        <button
          onClick={toggleDetails}
          className="text-blue-500 hover:underline focus:outline-none"
        >
          {!showDetails ? <FcExpand size={20}/> : <MdOutlineMinimize size={25}/>}
        </button>
        </div>
      </div>
      <p>Total Amount: {order.total_amount}</p>
      {showDetails && (
        <div className="mt-2">
          <h4 className="text-md font-semibold">Order Items:</h4>
          <ul className="list-disc ml-6">
            {data.viewOrderDetails.map((item: any) => (
              <OrderItemCard key={item.item_id} item={item} />
            ))}
          </ul>
        </div>
      )}
      {!(order.order_status === 'cancelled') && (
        <div className="flex justify-end mt-2">
          <button
            onClick={handleCancel}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
          >
            Cancel Order
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
