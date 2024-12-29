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
                    alt={tutor?.name}
                    src={tutor?.tutorImage}
                    className="w-full h-64 object-cover rounded-lg"
                    />

                <div className="mt-4">
                    
                    <p className="text-sm font-semibold capitalize text-gray-600 mt-4">Tutor Id :{userInfo?._id}</p>
                    <p className="text-sm font-semibold capitalize text-gray-600 mt-4"><span className="text-bold text-black">Tutorial Id</span> :{tutor?._id}</p>
                   
                    <p className="text-lg font-semibold text-gray-800">Language: {tutor?.language}</p>
                    <p className="text-lg font-semibold text-gray-800">Tutor Name: {tutor?.name}</p>
                    <p className="text-lg font-semibold text-gray-800">Price: ${tutor?.price}</p>
                    <p className="text-lg "><span className="font-semibold ">LogedIn Email</span>: {user?.email}</p>
                    <p className="text-lg font-semibold text-gray-800">Tutor email: {tutor?.email}</p>
                    <p className="text-lg font-semibold text-gray-800">
                        Rating: {tutor?.review !== undefined && tutor?.review !== null ? tutor?.review : "Not found"} ★
                    </p>
                    <p className="text-sm text-gray-600 mt-4"><b>Description</b> :{tutor?.description}</p>
                    <div className="flex justify-start items-center text-gray-800 gap-3 my-5">Tutorial image:
                        <img
                            src={tutor?.image}
                            alt={tutor?.name}
                            className="w-[200px] h-[40px]  object-cover rounded border"
                        />
                    </div>
                </div>

                <button
                    onClick={handleBook}
                    className=""
                >
                    {isBooked ? <button className="bg-[crimson] mt-6 px-6 py-3  text-white rounded-lg " disabled={isBooked}>Booked</button> : <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg">Book Now</button>}
                </button>
            </div>
        </div>
    );
};

export default TutorDetails;
