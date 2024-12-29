

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Spiner from "../components/Spiner";
import { ThemeContext } from "../ThemeProvider";

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
            <div className="flex justify-center items-center gap-2 flex-col md:flex-row  my-10">
                <h2 className="text-3xl font-bold text-center mb-8 ">Find  Tutors</h2>
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
                    <p className="text-sm text-gray-600" data-aos="fade-up">
                        Please check back later or contact support for assistance.
                    </p>
                </div>
            ) : (
                <div className="py-10" data-aos="fade-up">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                        {tutors?.map((tutor) => (
                            <div key={tutor?._id} className={`${isDarkMode ? "bg-white text-tc shadow-lg rounded-lg p-6" : "bg-gray-100 border  shadow-lg rounded-lg p-6"}`}>
                                <img
                                    src={tutor?.image}
                                    alt={tutor?.name}
                                    className="w-full h-40 object-cover rounded-t-lg"
                                    data-aos="fade-up"
                                />
                                <h3 className="mt-4 text-xl font-semibold text-gray-800" data-aos="fade-up">{tutor?.name}</h3>
                                <p className="text-sm text-gray-600" data-aos="fade-up">Language: {tutor?.language}</p>
                                <p className="text-sm text-gray-600">Rating: {tutor?.review || 0} ★</p>
                                <button
                                    data-aos="fade-up"
                                    onClick={() => navigate(`/tutor/${tutor?.email}`)}
                                    className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Tutors;
