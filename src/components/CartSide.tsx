import React, { useContext, useEffect, useState } from 'react';
import CartItemCard from './CartItemCard';
import { useNavigate } from 'react-router-dom';
//import { useQuery, useMutation } from '@apollo/client';
import { CartItem } from '../interfaces/Cart';
// import { VIEW_CART } from '../graphql/queries/Cart'; 
// import { CREATE_ORDER } from '../graphql/mutations/Order';
import { ContextTypeCart } from '../interfaces/Context';
import { ContextCart } from './Navbar';
// import { VIEW_ALL_ORDERS } from '../graphql/queries/Order';
// import { CHECK_IF_ADMIN } from '../graphql/queries/User';
import { auth, db } from '../firebase_config/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

const CartSide = () => {
  const navigate = useNavigate();
  const [allCartItems, setAllCartItems] = useState<CartItem[]>([]);
  const { viewCart, setViewCart } = useContext<ContextTypeCart>(ContextCart);

  const [totalAmt, setTotalAmt] = useState(0);
  //const token = sessionStorage.getItem('token');
  //const [createOrderMutation] = useMutation(CREATE_ORDER);

  //const adminData = useQuery(CHECK_IF_ADMIN, {
  //  variables: { token: sessionStorage.getItem('token') || '' },
  //});
  const user = auth.currentUser; 
  // let email = user?.email
  // console.log(email)
  const cartCollectionRef = collection(db, "cart")

  const getItems = async () => {
    try{
      if(user){
        const data = await query(cartCollectionRef, where('userEmail', '==', user.email))
        const dataSnap = await getDocs(data)
        const filteredData : CartItem[] = dataSnap.docs.map((doc) => (
        {
          userEmail: doc.data().userEmail,
          itemName: doc.data().itemName,
          price: doc.data().price,
          cart_id: doc.id,
          quantity: Number(doc.data().quantity),
          subtotal: Number(doc.data().subtotal),
          image: doc.data().image,
          product_id: doc.data().product_id,
        }
          ))

          const totalSum = filteredData.reduce((sum, item) => sum + item.subtotal, 0);
          setTotalAmt(totalSum)
          // console.log(filteredData)
        setAllCartItems(filteredData)
      }
        
        
      }
    catch(err) {
      console.error(err)
    }
    //getItems()
  }
  useEffect(() => {
    getItems()
  }, [user])

    
    
    const isAdmin = user?.email === 'administrator@gmail.com'; //check if user is the administrator
    if(isAdmin){
      return (
        <div className="p-4 text-center">
          <p className="mb-2">Cart is unavailable.</p>
        </div>
      )
    }

  
  //const { loading, error, data } = useQuery(VIEW_CART, {
  //  variables: { token: token },
  //});   

  if (!user) {
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

  const ordersRef = collection(db, "orders")
  const orderItemRef = collection(db, "order_items")

  const handleCheckout = async () => {

    const addedItem = await addDoc(ordersRef, {
      total_amount : totalAmt,
      userEmail : user.email,
      payment_status: "paid",
      order_status: "confirmed"
    })

    allCartItems.map( async (item) => {
      await addDoc(orderItemRef, {
        itemName: item.itemName,
        price:item.price,
        order_id: addedItem.id,
        quantity: Number(item.quantity),
        subtotal: Number(item.subtotal),
        image: item.image
      })
    })

    await Promise.all(allCartItems.map(async (item) => {
      await deleteDoc(doc(cartCollectionRef, item.cart_id));
    }))

    setAllCartItems([]);
    setTotalAmt(0);

    alert('Your order has been placed!')


    // try {
    //   const { data } = await createOrderMutation({
    //     variables: {
    //       payment_status: 'successful', //set to 'successful' by default for now
    //       token: token,
    //     },
    //     refetchQueries: [
    //       { query: VIEW_ALL_ORDERS, variables: { token } }, 
    //       { query: VIEW_CART, variables: { token: token } }
    //     ]
    //   });

    //   const newOrder = data.createOrder;
    //   // Handle the newly created order as needed

    //   console.log('New order:', newOrder);
    // } catch (error) {
    //   console.error('Checkout error:', error);
    // }
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
          <button
            className="bg-black text-white py-2 px-4 rounded-md mt-4"
            onClick={() => {
              setViewCart(!viewCart)
              navigate('/myorders')
          }}
          >
            View All Orders
          </button>
        </div>
      
    );
  }

  return (
    <div className="p-4 h-full">
  <div className="mb-4" style={{ maxHeight: 'calc(100vh - 170px)', overflowY: 'auto' }}>
    {allCartItems.map((item, index) => (
      <CartItemCard key={index} item={item} />
    ))}
    <h1>{totalAmt}</h1>
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
