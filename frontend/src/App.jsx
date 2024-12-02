import React, { useState, useEffect } from "react";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Components/Layout/RootLayout";
import Home from "./Pages/Home";
import NewArrivals from "./Pages/NewArrivals";
import Mens from "./Pages/Mens";
import Womens from "./Pages/Womens";
import Kids from "./Pages/Kids";
import Sale from "./Pages/Sale";
import Brands from "./Pages/Brands";
import Adidas from "./Components/Common/Adidas";
import Converse from "./Components/Common/Converse";
import Newbalance from "./Components/Common/Newbalance";
import Nike from "./Components/Common/Nike";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import ProductDetail from "./Pages/ProductDetail";

import ShoppingBag from "./Components/ShoppingBag";
import LoginModal from "./Components/Modals/LoginModal"
import UserLogIn from "./Components/Common/UserLogIn";
import UserSignIn from "./Components/Common/UserSignIn";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserLogInOpen, setIsUserLogInOpen] = useState(false);
  const [isUserSignInOpen, setIsUserSignInOpen] = useState(false);
  

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleRequestClose = () => {
    setIsModalOpen(false);
  };

  const handleOpenUserLogIn = () => {
  setIsUserLogInOpen(true); // Function to open UserLogIn
};

const handleOpenUserSignIn = () => {
  setIsUserSignInOpen(true); // Function to open UserSignIn
}

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="newArrivals" element={<NewArrivals />} />
        <Route path="newArrivals/:id" element={<ProductDetail />} />
        <Route path="mens" element={<Mens />} />
        <Route path="mens/:id" element={<ProductDetail />} />
        <Route path="womens" element={<Womens />} />
        <Route path="womens/:id" element={<ProductDetail />} />
        <Route path="kids" element={<Kids />} />
        <Route path="kids/:id" element={<ProductDetail />} />
        <Route path="brands" element={<Brands />} />
        <Route path="brands/:id" element={<ProductDetail />} />
        <Route path="brands/adidas" element={<Adidas />} />
        <Route path="brands/adidas/:id" element={<ProductDetail />} />
        <Route path="brands/converse" element={<Converse />} />
        <Route path="brands/converse/:id" element={<ProductDetail />} />
        <Route path="brands/newbalance" element={<Newbalance />} />
        <Route path="brands/newbalance/:id" element={<ProductDetail />} />
        <Route path="brands/nike" element={<Nike />} />
        <Route path="brands/nike/:id" element={<ProductDetail />} />
        <Route path="sale" element={<Sale />} />
        <Route path="sale/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    )
  );

  return (
    <div className=" w-full">
      <RouterProvider router={router} />
      <LoginModal
        isOpen={isModalOpen}
        onRequestClose={handleRequestClose}
        handleOpenUserLogIn={handleOpenUserLogIn}
        handleOpenUserSignIn={handleOpenUserSignIn}
      />
      <UserLogIn
        isOpen={isUserLogInOpen}
        onRequestClose={() => setIsUserLogInOpen(false)}
      />
      <UserSignIn
        isOpen={isUserSignInOpen}
        onRequestClose={() => setIsUserSignInOpen(false)}
      />
    </div>
  );
};

export default App;
