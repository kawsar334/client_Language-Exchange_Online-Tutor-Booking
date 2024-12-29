import React, { useContext, useEffect, useState } from "react";
import useFetch from "../data/UseFetch";
import { ThemeContext } from "../ThemeProvider";

const Stats = ({ LanguagesOffered }) => {

    const [rev, setRev] = useState(0)
    const { data, loading, error } = useFetch(`https://server-wheat-xi.vercel.app/stats`);

    const {isDarkMode}= useContext(ThemeContext)

    const statsData = [
        { id: 1, label: "Total Tutors", value: data?.data?.tutor?.length },
        { id: 2, label: "Languages Offered", value: LanguagesOffered },
        { id: 3, label: "Total Users", value: data?.data?.user?.length },
        { id: 4, label: "Total Reviews ★", value: rev },
    ];

    useEffect(() => {
        if (data?.data?.tutor) {
            const totalReviews = data.data.tutor.reduce((acc, item) => {
                return acc + (item.review || 0); 
            }, 0);
            setRev(totalReviews); 
        }
    }, [data?.data?.tutor]);

    return (
        <div className={`${isDarkMode ? "bg-transparent py-12" : " py-12"}`}>
            <div className="container mx-auto text-center ">
                <h2 className="text-3xl font-bold mb-8">Our Statistics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-[90%] md:w-full mx-auto">
                    {statsData.map((stat) => (
                        <div
                            data-aos="fade-up"
                            key={stat?.id}
                            className=" border shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                        >
                            <h3 className="text-4xl font-extrabold text-textcolor cursor-pointer" data-aos="fade-down">
                                {stat?.value} <i className="fa-solid fa-plus"></i>
                            </h3>
                            <p className="text-lg font-medium text-gray-600 mt-2" data-aos="fade-up">
                                {stat?.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stats;
