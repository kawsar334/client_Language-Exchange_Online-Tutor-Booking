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
const Layout = () => {
    const {cartData,} = CartContext()
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div className={isDarkMode ? "bg-mn text-white" : "bg-white text-mn"}>
            <Navbar cartData={cartData}/>
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;
