import React, { useEffect, useState } from 'react';
import { OrderItem, OrderProps } from '../interfaces/Order';
import OrderItemCard from './OrderItemCard'; 
//import { useMutation, useQuery } from '@apollo/client'; 
//import { VIEW_ALL_ORDERS, VIEW_ORDER_DETAILS } from '../graphql/queries/Order'; 
//import { useNavigate } from 'react-router-dom';
//import { CANCEL_ORDER } from '../graphql/mutations/Order';
import { FcExpand } from 'react-icons/fc';
import { MdOutlineMinimize } from 'react-icons/md';
import { auth, db } from '../firebase_config/firebase';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

const OrderCard: React.FC<OrderProps> = ({ order }) => {

  const [allOrderItems, setAllOrderItems] = useState<OrderItem[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  let can = order.order_status === "cancelled"
  const [cancel, setCancel] = useState(can);
  
  //const navigate = useNavigate()

  // const [cancelOrder] = useMutation(CANCEL_ORDER);

  // const { loading, error, data } = useQuery(VIEW_ORDER_DETAILS, {
  //   variables: { order_id: Number(order.order_id), token: sessionStorage.getItem('token') || ''},
  // });

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const user = auth.currentUser; 

  const OrderCollectionRef = collection(db, "order_items")
  let id = order.order_id

  const getItems = async () => {
    try{
      if(user){
        const data = await query(OrderCollectionRef, where('order_id', '==', id))
        const dataSnap = await getDocs(data)
        const filteredData : OrderItem[] = dataSnap.docs.map((doc) => (
        {
          quantity: doc.data().quantity,
          subtotal: doc.data().subtotal,
          price: Number(doc.data().price),
          itemName: doc.data().itemName,
          order_item_id: doc.id,
          order_id: doc.data().order_id,
          image: doc.data().image,
        }
          ))
          // console.log(filteredData)
          setAllOrderItems(filteredData)
      }
        
        
      }
    catch(err) {
      console.error(err)
    }

    getItems()
  }

  const handleCancel = async () => {
    const orderDoc = doc(db, "orders", order.order_id)
    await updateDoc(orderDoc, {order_status : "cancelled"})
    setCancel(true)
  }

  useEffect(() => {
    getItems()
  }, [])


  // if (loading) {
  //   return <p>Loading order details...</p>;
  // }

  // if (error) {
  //   return <p>Error fetching order details.</p>;
  // }


  return (
    <div className={`border p-4 rounded-md shadow-md`}>
      <div className="flex justify-between items-center mb-2">
        
        <h3 className={`text-lg font-semibold ${cancel ? 'text-red-600' : ''}`}>
          Order ID: {order.order_id}
        </h3>
        <div className="flex justify-between items-center mb-2">
        {cancel && <span className="text-s text-red-600 mr-2">Cancelled</span>}
        
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
            {allOrderItems.map((item: OrderItem) => (
              <OrderItemCard key={item.order_item_id} item={item} />
            ))}
          </ul>
        </div>
      )}
      {!(cancel) && (
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
