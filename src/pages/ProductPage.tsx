import React, { useState, useEffect } from 'react';
//import { useQuery } from '@apollo/client';
//import { GET_ALL_PRODUCTS } from '../graphql/queries/Product'; 
import ProductCard from '../components/ProductCard';
import { Product } from '../interfaces/Product';
import {db} from "../firebase_config/firebase"
import { getDocs, collection } from 'firebase/firestore'

const ProductPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const productsCollectionRef = collection(db, "products")

  //const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  
  const getProducts = async () => {
    try{
        const data = await getDocs(productsCollectionRef)
        const filteredData : Product[] = data.docs.map((doc) => ({
          name: doc.data().name,
          description: doc.data().desc,
          price: doc.data().price,
          category: doc.data().category,
          product_id: Number(doc.id),
          quantity: Number(doc.data().quantity),
          image: doc.data().image
        }
          ))
        setAllProducts(filteredData)
      }
    catch(err) {
      console.error(err)
    }
  }
  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
      {allProducts.map((product) => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
      
    </>
  );
};

export default ProductPage;
