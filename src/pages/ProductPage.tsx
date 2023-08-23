import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../graphql/queries/Product'; 
import ProductCard from '../components/ProductCard';
import { Product } from '../interfaces/Product';

const ProductPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS); 
  useEffect(() => {
    if (data) {
      setAllProducts(data.getAllProducts); 
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching products.</p>;
  }

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
