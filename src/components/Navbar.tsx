import React, { createContext, useState } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { RiHome2Line} from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import CartSide from './CartSide';
import UserSide from './UserSide';
import { ContextTypeCart, ContextTypeUser } from '../interfaces/Context';

export const ContextCart = createContext<ContextTypeCart>({
  viewCart: false,
  setViewCart: () => {},
});
export const ContextUser = createContext<ContextTypeUser>({
  viewUser: false,
  setViewUser: () => {},
});

const Navbar = () => {
  const [viewCart, setViewCart] = useState(false);
  const [viewUser, setViewUser] = useState(false);

  const handleClick = () => {
    setViewCart(!viewCart);
    if(viewUser === true){
      setViewUser(!viewUser)
    }
  };

  const handleClickUser = () => {
    setViewUser(!viewUser);
    if(viewCart === true){
      setViewCart(!viewCart)
    }
  };

  return (
    <div className='h-16 w-full bg-black'>
    
    <div className="fixed h-16 w-full bg-black p-4 flex justify-between items-center ">
      <Link to="/" className="text-white text-2xl font-bold">
        The Store.
      </Link>

      <div className="flex items-center space-x-4">
        <Link to="/" className="text-white">
          <RiHome2Line size={20} />
        </Link>

        <div onClick={handleClick} className="text-white cursor-pointer">
          <FaShoppingCart size={20} />
        </div>

        <div onClick={handleClickUser} className="text-white cursor-pointer">
          <FaUser size={20} />
        </div>

      </div>
    </div>
    <div className={`bg-gray-100 w-[30%] h-full fixed top-16 right-0 transform transition-transform duration-500 shadow-xl ${viewCart ? 'translate-x-0' : 'translate-x-full'}`}>
        <div onClick={handleClick} className="flex ">
          <AiOutlineClose size={25} className="mr-2 text-black font-bold" />
        </div> 
        <ContextCart.Provider value={{ viewCart, setViewCart }}>
        <CartSide />
        </ContextCart.Provider>
    </div>
      <div className={`bg-gray-100 w-[30%] h-full fixed top-16 right-0 transform transition-transform duration-500 shadow-xl ${viewUser ? 'translate-x-0' : 'translate-x-full'}`}>
        <div onClick={handleClickUser} className="flex ">
          <AiOutlineClose size={25} className="mr-2 text-black font-bold" />
        </div>
        <ContextUser.Provider value={{ viewUser, setViewUser }}>
        <UserSide />
        </ContextUser.Provider>
      </div>
    </div>
  );
};

export default Navbar;
