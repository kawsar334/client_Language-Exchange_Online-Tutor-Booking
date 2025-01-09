
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProviders';
import { toast } from 'react-toastify';
import Spiner from '../components/Spiner';
import { ThemeContext } from '../ThemeProvider';
import Title from '../components/Title';

const MyBookedTutors = () => {
    const { isDarkMode } = useContext(ThemeContext)
    const { user } = useContext(AuthContext);
    const email = user?.email
    const [loading, setLoading] = useState(true)

    const [bookedTutors, setBookedTutors] = useState([])
    useEffect(() => {
        const fetchTutorDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://server-wheat-xi.vercel.app/mybooked/${email}`);

                const data = await response.json();
                setLoading(false)
                setBookedTutors(data?.data)
            } catch (err) {
                console.error('Error fetching tutor details:', err);
                setLoading(true)
            }
        };

        fetchTutorDetails();
    }, [email]);


    const handleReview = async (item) => {
        console.log(item?.tutorId)

        try {
            const response = await fetch(`https://server-wheat-xi.vercel.app/updatedReview/${item?.tutorId}`, {
                method: "PATCH",
            });

            const data = await response.json();

            if (data.success) {
                toast.success(data?.message);
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error updating review:", error);
        }

    }


    if (loading) {
        return <Spiner />
    }
    return (
        <>
            {bookedTutors?.length == 0 ? <div
                data-aos="fade-up"
                className='w-full h-screen flex justify-center items-center '>
                <h1 className='text-3xl text-[crimson] font-semibold'>Empty Booked List</h1>
            </div> : <div className="py-10 bg-transparent">
                <div className="max-w-6xl mx-auto  rounded-lg p-6">
                    <h2 className="text-3xl font-bold text-center text-[gray] mb-6">

                        <Title title={`You Booked ( ${bookedTutors?.length} )  Tutors`} />
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookedTutors?.map((tutor, index) => (
                            <div
                                data-aos={`${index % 2 === 0 ? "fade-up" : "fade-down"}`}
                                key={tutor?.id}
                                className="  rounded-lg border  transition duration-200 hover:shadow-2xl"
                            >
                                <div className="">
                                    <img

                                        src={tutor?.image}
                                        alt={tutor?.name}
                                        className="w-full h-[200px] object-cover mx-auto mb-4"
                                    />
                                    <div className=' p-6'>

                                        <h3 className="text-xl font-semibold first-letter:text-red-800 " data-aos="fade-up">{tutor?.name}</h3>
                                        <p className="text-gray-600" data-aos="fade-up"><span className='text-teal'>{tutor?.language}</span></p>
                                        <p className="text-gray-600 border w-max px-3  my-2  rounded-full " >${tutor?.price}</p>
                                        <p className="text-red-800" >{tutor?.review !== undefined && tutor?.review !== null ? tutor?.review : "Not found"} ★</p>
                                    </div>

                                    <div>


                                    </div>
                                    <button
                                        className="my-4  ml-6 px-6 py-2 rounded-full text-mn bg-teal hover:bg-bgcolor hover:text-teal transition duration-500"
                                        onClick={() => handleReview(tutor)}
                                    >
                                        Review
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>}
        </>
    );
};

export default MyBookedTutors;

