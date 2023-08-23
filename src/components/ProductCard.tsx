import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCardProps } from '../interfaces/Product';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className=" m-2 cursor-pointer border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
      onClick={() => {
        navigate(`/products/${product.product_id}`);
      }}
    >
      <img
        src={product.image as string} 
        alt={product.name}
        className="w-full h-64 object-cover mb-2 rounded-md"
      />
      <h1 className="text-xl font-bold text-blue-700">{product.name}</h1>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-gray-900 font-semibold">Price: Rs. {product.price}</p>
    </div>
  );
};

export default ProductCard;
