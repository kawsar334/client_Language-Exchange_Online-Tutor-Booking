


import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeProvider";

const LanguageCategory = ({ categories }) => {

    const { isDarkMode } = useContext(ThemeContext)
    const navigate = useNavigate();
    return (
        <div id="category" data-aos="fade-up" className={`${isDarkMode ? "py-10 text-tc  w-full md:w-[80%] m-auto  my-[100px] " : "py-10  w-full md:w-[80%] m-auto  my-[100px] "}`}>
            <h2 className="text-3xl font-bold text-center mb-8">Language Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3  gap-4 px-4">
                {categories?.map((category,index) => (
                    // <div
                    //     data-aos="fade-down"
                    //     key={category}
                    //     onClick={() => navigate(`/find-tutors/${category}`)}
                    //     className="bg-white border shadow-lg rounded-lg p- cursor-pointer hover:shadow-xl transition duration-300"
                    // >
                    <div
                        key={category}
                        onClick={() => navigate(`/find-tutors/${category}`)}
                        className="bg-white mt-8 border shadow-lg rounded-lg  cursor-pointer hover:shadow-xl transition duration-300 flex items-center justify-between  px-5 py-3" data-aos="fade-down">
                        <i className={`fas fa-globe text-4xl`} />
                        <div>
                        <h3 className="mt- text-xl font-semibold text-gray-800">{category} Tutors</h3>
                            <p className="text-[gray]">{index+ 1}0 Teachers</p>
                        </div>
                        {/* <i className="fas fa-arrow-right text-xl text-gray-500" /> */}
                    
                        <span className="text-4xl ">{">"}</span>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default LanguageCategory;
