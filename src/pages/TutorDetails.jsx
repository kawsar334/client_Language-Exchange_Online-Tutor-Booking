import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProviders";
import { toast } from "react-toastify";

const TutorDetails = () => {
    const  email  = useLocation().pathname.split("/")[2];
    const { user } = useContext(AuthContext); 
    const navigate = useNavigate();
    const [tutor, setTutor] = useState(null);
    const [isBooked, setIsBooked] = useState(null);
    const [userInfo, setUserInfo] = useState({})


   
    useEffect(() => {
        const fetchTutorDetails = async () => {
            try {
                const response = await fetch(`https://server-wheat-xi.vercel.app/tutor/${email}`);
                if (!response.ok) {
                   console.log('Failed to fetch tutor details');
                }
                const data = await response.json();
                setUserInfo(data?.data?.user)
                setTutor(data?.data?.tutor);
                console.log(data?.data?.tutor?.tutorImage)
            } catch (err) {
                console.error('Error fetching tutor details:', err);
            }
        };
        fetchTutorDetails();
    }, [email]);

    const handleBook = async () => {
        if (!user) {
            alert("You need to be logged in to book a tutor?.");
            return navigate("/login");
        }

        const bookingData = {
            tutorId: tutor?._id,
            image: tutor?.image,
            language: tutor?.language,
            price: tutor?.price,
            tutorEmail: tutor?.email,
            userEmail: user.email, 
            review: tutor?.review,
            tutorImage: tutor?.tutorImage,
            name:tutor?.name

        };

        try {
            const response = await fetch("https://server-wheat-xi.vercel.app/addbooked", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingData),
            });

            const data = await response.json();
            console.log(data)
            if (data.success) {
                toast.success(data?.message);
                setIsBooked(true); 
            } else {
                toast.warn(data?.message);
            }
        } catch (error) {
            toast.error("An error occurred while booking."); 
        }
    };

    if (!tutor || !userInfo) return <div className="w-full flex justify-center items-center  h-screen"><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div></div>;

    return (
        <div className="py-10 ">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-3xl font-bold text-center mb-4">{tutor?.name}</h2>
                <img
                    alt="Loading..."
                    src={tutor?.image}
                    className="w-full h-64 object-cover rounded-lg"
                    />

                <div className="mt-4">
                    
                    {/* <p className="text-sm font-semibold capitalize text-gray-600 mt-4">{userInfo?._id}</p>
                    <p className="text-sm font-semibold capitalize text-gray-600 mt-4"><span className="text-bold text-black">Tutorial Id</span> :{tutor?._id}</p> */}
                   
                    <p className="text-lg font-semibold text-teal">{tutor?.language}</p>
                    <p className="text-lg font-semibold text-gray-800"> <span className="text-teal">{tutor?.name}</span> a  {tutor?.language} Tutor</p>
                    <p className="text-lg font-semibold text-gray-800 ">${tutor?.price}</p>
                    <p className="text-lg font-semibold text-gray-800">Tutor email: {tutor?.email}</p>
                    <p className="text-lg font-semibold text-red-800">
                        {tutor?.review !== undefined && tutor?.review !== null ? tutor?.review : "Not found"} ★★★
                    </p>
                    <p className="text-sm text-gray-600 mt-4">{tutor?.description}</p>
                  
                </div>

                <button
                    onClick={handleBook}
                    className=""
                >
                    {isBooked ? <button className="bg-[crimson] mt-6 px-6 py-3  text-white rounded-lg " disabled={isBooked}>Booked</button> : <button className="mt-6 px-6 py-3 bg-teal  text-white rounded-lg">Book Now</button>}
                </button>
            </div>
        </div>
    );
};

export default TutorDetails;
