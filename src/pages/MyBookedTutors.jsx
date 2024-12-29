
import React, { useContext, useEffect ,useState} from 'react';
import { AuthContext } from '../context/AuthProviders';
import { toast } from 'react-toastify';
import Spiner from '../components/Spiner';
import { ThemeContext } from '../ThemeProvider';

const MyBookedTutors = () => {
    const { isDarkMode } = useContext(ThemeContext)
    const {user} = useContext(AuthContext);
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
    
   
const handleReview = async(item)=>{
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


if(loading){
    return <Spiner/>
}
    return (
        <>
            {bookedTutors?.length == 0 ? <div
                data-aos="fade-up"
            className='w-full h-screen flex justify-center items-center '>
                <h1 className='text-3xl text-[crimson] font-semibold'>Empty Booked List</h1>
            </div> :<div className="py-10 bg-transparent">
            <div className="max-w-6xl mx-auto bg- shadow-xl rounded-lg p-6">
                <h2 className="text-3xl font-bold text-center text-[gray] mb-6">
                            <span className='text-[crimson]'>{user?.displayName}</span> You Booked <span className='text-[crimson]'>{bookedTutors?.length}</span> Tutors
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookedTutors?.map((tutor) => (
                        <div
                            data-aos="fade-up"
                            key={tutor?.id}
                            className=" p-6 rounded-lg border shadow-lg transition duration-200 hover:shadow-2xl"
                        >
                            <div className="text-center">
                                <img
                                    data-aos="fade-down"
                                    src={tutor?.image}
                                    alt={tutor?.name}
                                    className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                                />
                                <h3 className="text-xl font-semibold text-red-800" data-aos="fade-up">{tutor?.name}</h3>
                                <p className="text-gray-600" data-aos="fade-up">Language: {tutor?.language}</p>
                                <p className="text-gray-600" data-aos="fade-up">Price: {tutor?.price}</p>
                                <p className="text-gray-600" data-aos="fade-up">Rating: {tutor?.review !== undefined && tutor?.review !== null ? tutor?.review : "Not found"} ★</p>

                                <div>

                                
                                </div>
                                <button
                                    className="mt-4 px-6 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition duration-200"
                                    onClick={()=>handleReview(tutor)}
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

