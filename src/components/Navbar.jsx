


import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProviders';
import ThemeProvider, { ThemeContext } from '../ThemeProvider';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOutUser } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    AOS.init();
  }, []);

  const Links = () => (
    <>
      <li className="md:hidden relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-[30px] h-[30px] flex justify-center items-center rounded-full p-2 border border-b-white absolute right-[-5px] bg-[white] text-red-400 rounded-b-[0px] top-[-35px] hover:bg-white"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </li>
      <li className={`rounded-full mx-1 ${isDarkMode ? "text-teal" : "text-teal"}`}>
        <Link to="/">Home</Link>
      </li>
      <li className={`rounded-full mx-1 ${isDarkMode ? "text-teal" : "text-teal"}`}>
        <Link to="/find-tutors">Find Tutors</Link>
      </li>
      {user &&<li className={`rounded-full mx-1 ${isDarkMode ? "text-teal" : "text-teal"}`}>
        <Link to="/add-tutorials">Add Tutorials</Link>
      </li>}
     { user &&<li className={`rounded-full mx-1 ${isDarkMode ? "text-teal" : "text-teal"}`}>
        <Link to="/my-tutorials">My Tutorials</Link>
      </li>}
      {user &&<li className={`rounded-full mx-1 ${isDarkMode ? "text-teal" : "text-teal"}`}>
        <Link to="/my-booked-tutors">My Booked Tutors</Link>
      </li>}
      {user?<li onClick={signOutUser} className={`rounded-full mx-1 ${isDarkMode ? "text-white md:hidden" : "text-teal md:hidden"}`}>
        <Link to="#">Logout</Link>
      </li> : <li  className={`rounded-full mx-1 ${isDarkMode ? "text-white md:hidden" : "text-mn md:hidden"}`}>
        <Link to="/login">Login</Link>
      </li>}
     {user&& <li  className={`rounded-full mx-1 ${isDarkMode ? "text-white md:hidden" : "text-mn md:hidden"}`}>
    <div className='flex justify-start items-start'>
          <img
            src={user?.photoURL || "https://via.placeholder.com/40"}
            alt="Profile"
            className="rounded-full w-[30px] h-7  object-cover"
          />
          <Link to="#">{user?.displayName}</Link>
    </div>
      </li>}
    </>
  );

  return (
    <div className="navbar bg-base-100 sticky top-0 left-0 z-50 shadow-md px-5 " >
      <div className="navbar-start" >
        <Link to="/" className="text-xl font-bold text-teal" >
          <span className='mr-2'> <i className="fa-solid fa-earth-asia text-xl"></i></span>
          Language <span className='text-mn'>Exchange</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex gap-3">
        <ul
          className={`${isDarkMode
              ? "text-white menu menu-horizontal px-1 flex flex-col md:flex-row"
              : "menu menu-horizontal px-1 flex flex-col md:flex-row"
            }`}
        >
          <Links />
        </ul>
      </div>
      <div className="navbar-end relative">
        <button onClick={toggleTheme} className=" text-2xl mr-5  px-4 rounded ">
          {isDarkMode ? <i className="fa-regular fa-sun"></i> : <i className="fa-regular fa-moon"></i>}
          
    </button>
       
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={user?.photoURL || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="rounded-full"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <span className="text-sm font-semibold">{user?.displayName}</span>
              </li>
              <li>
                <button onClick={signOutUser} className="py-1 px-3 rounded-lg">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="mx-1">
            <Link className="py-1 px-4 rounded-lg border" to="/login">
              Login
            </Link>
          </div>
        )}
        <button
          className="text-[gray] lg:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          <i className={`${!open ? "fa-solid fa-list" : "fa-solid fa-xmark"}`}></i>
        </button>
        {open && (
          <div
            className={`${isDarkMode
                ? "navbar-center absolute top-[90px] bg-mn border rounded text-white h-max w-[400px] lg:hidden"
                : "navbar-center absolute top-[90px] bg-white border rounded h-max w-[400px] lg:hidden"
              }`}
          >
            <ul
              className={`${isDarkMode
                  ? "text-white menu menu-horizontal px-1 flex flex-col md:flex-row"
                  : "menu menu-horizontal px-1 flex flex-col md:flex-row"
                }`}
            >
              <Links />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
