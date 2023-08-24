import React from 'react';
import { OrderItemProps } from '../interfaces/Order';

const OrderItemCard: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <div className="flex border p-4 mb-4 rounded-md shadow-md" key={item.order_item_id}>
      <div className="flex-shrink-0 w-16 h-16 mr-4">
        <img
          src={item.image}
          alt={item.itemName}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold">{item.itemName}</h4>
          <p className="text-gray-700">Quantity: {item.quantity}</p>
        </div>
        <div className="mt-2">
          <p className="text-gray-700">Subtotal: {item.subtotal}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
