

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Spiner from "../components/Spiner";
import { ThemeContext } from "../ThemeProvider";
import Title from "../components/Title";

const Tutors = () => {
    const navigate = useNavigate();
    const [tutors, setTutors] = useState([]);
    const [language, setLanguage] = useState("");
    const [debouncedLanguage, setDebouncedLanguage] = useState("");
    const [loading, setLoading] = useState(false)
    const { isDarkMode } = useContext(ThemeContext)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedLanguage(language);
        }, 600);

        return () => {
            clearTimeout(handler);
        };
    }, [language]);

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                setLoading(true)
                const url = debouncedLanguage
                    ? `https://server-wheat-xi.vercel.app/products?language=${debouncedLanguage}`
                    : `https://server-wheat-xi.vercel.app/products`;

                const response = await fetch(url);
                const data = await response.json();
                setLoading(false)
                console.log(data?.data);
                setTutors(data?.data);
            } catch (error) {
                console.error("Error fetching tutors:", error);
                setLoading(true)
                setTutors([]);
            }
        };
        fetchTutors();
    }, [debouncedLanguage]);

    if (loading) {
        return <Spiner />
    }

    return (
        <>
            <div className="flex justify-center w-full md:w-[80%]  m-auto items-center gap-2 flex-col md:flex-row  my-10">
                <Title title="Find Tutors"/>
                <input
                    type="text"
                    className="border px-4 py-2 mb-6 focus:outline-none  rounded"
                    placeholder="Search by Language"
                    onChange={(e) => setLanguage(e.target.value)}
                />
            </div>
            {tutors?.length === 0 ? (
                <div className="w-full h-screen flex justify-center items-center flex-col gap-3">
                    <h2 className="text-3xl font-bold text-[crimson]">No Tutors Found</h2>
                    <p className="text-sm text-gray-600" >
                        Please check back later or contact support for assistance.
                    </p>
                </div>
            ) : (
                    <div className="py-10  w-full md:w-[80%] mx-auto" >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                        {tutors?.map((tutor, index) => (
                            <div 
                                data-aos={`${index%2 ===0 ?"fade-up":"fade-down"}`}
                            key={tutor?._id} className={`${isDarkMode ? "bg-white text-tc shadow-lg rounded-lg " : "bg-gray-100 border  shadow-lg rounded-lg "}`}>
                                <img
                                    src={tutor?.image}
                                    alt={tutor?.name}
                                    className="w-full h-40 object-cover rounded-t-lg"
                                    
                                />
                               <div className="w-full p-3">
                                    <h3 className="mt-4 text-xl font-semibold text-gray-800" >{tutor?.name}</h3>
                                    <p className="text-sm text-gray-600" >{tutor?.language}</p>
                                    <p className="text-sm text-gray-600"> {tutor?.review || 0} ★★★</p>
                                    <p className="text-sm w-max rounded-full px-3 py-1 border bg-mn text-teal "> ${tutor?.price || "price Not found"}</p>

                                    <button
                                        
                                        onClick={() => navigate(`/tutor/${tutor?.email}`)}
                                        className="mt-4 px-4 py-1 bg-teal  text-white rounded-lg"
                                    >
                                        View Details
                                    </button>
                               </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Tutors;
