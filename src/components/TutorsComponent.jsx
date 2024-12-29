
import React from "react";
import { useNavigate, useParams } from "react-router-dom";


const TutorComponent = ({ uniqueTutor }) => {
    console.log(uniqueTutor)

    const navigate = useNavigate();

    const handleRedirect=(item)=>{
        navigate(`/find-tutors/${item?.language}`)
    }

    return (
        <div className="p-6 my-[100px]">
            <h1 className="text-2xl font-bold mb-6 text-center">Our Tutors category</h1>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 w-full  mx-auto ">
                    
                {uniqueTutor?.map((tutor) => (<div className="border rounded-lg p-2 shadow-lg flex justify-between items-center">
                            <img
                                src={tutor.image}
                                alt={tutor.name}
                                className="w-32 h-[100px] object-cover rounded-md mb-4"
                        data-aos="fade-up"
                            />
                           <div className="">
                        <h2 className="text-xl font-semibold">{tutor?.name}</h2>
                        {tutor?.review >5 &&<p className="text-pink-300">Senior </p>}
                        <p data-aos="fade-down" className="text-gray-600">Language: {tutor?.language}</p>
                        <p data-aos="fade-up" className="text-gray-600">Price:{tutor?.price}</p>
                        <p data-aos="fade-down" className="text-gray-600">Reviews: {tutor?.review}★</p>
                        <button className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-lg" onClick={() => handleRedirect(tutor)}>
                            Book Trial Lesson
                        </button>
                           </div>
                        </div>
                ))
                }
                </div>
            
        </div>
    );
};

export default TutorComponent;