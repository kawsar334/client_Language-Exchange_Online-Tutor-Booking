import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from '../../components/Footer';
import { Hero } from '../../components/Hero';
import Products from '../../components/producs/Products';
import CartContext from '../../context/CartStorage';
import { ThemeContext } from '../../ThemeProvider';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Nav2 from '../../components/Nav2';
import { AuthContext } from '../../context/AuthProviders';
const Layout = () => {
    const {cartData,} = CartContext()
      const { user, signOutUser } = useContext(AuthContext);
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    useEffect(() => {
        AOS.init({
            duration: 1500, 
            easing: "ease-in-out", 
            once: true, 
        });
    }, []);
    const path = useLocation().pathname
   
    return (
        <div className={isDarkMode ? "bg-mn text-white" : "bg-white text-mn"}>

            <Navbar cartData={cartData}/>
           {path === "/" && !user &&<Nav2/>}
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;
