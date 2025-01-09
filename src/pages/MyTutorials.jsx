import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useFetch from '../data/UseFetch';
import { AuthContext } from '../context/AuthProviders';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Spiner from '../components/Spiner';
import { ThemeContext } from '../ThemeProvider';
import Title from '../components/Title';

const MyTutorials = () => {
    const [tutorials, setTutorials] = useState([]);
    const {user}= useContext(AuthContext)
    const { isDarkMode, toggleTheme } = useContext(ThemeContext)
    const navigate = useNavigate()
    const { data, loading, error } = useFetch(`https://server-wheat-xi.vercel.app/mytutorials/${user?.email}`);

    
    
    // const handleDelete = async (id) => {
    //     try {
    //         const response = await fetch(`https://server-wheat-xi.vercel.app/tutorial/${id}`, {
    //             method: 'DELETE',
    //             credentials: 'include', 
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         const data = await response.json();

    //         if (response.ok) {
    //             setTutorials(tutorials.filter(tutorial => tutorial?._id !== id));
    //             toast.success(data.message || 'Tutorial deleted successfully');
    //         } else {
    //             console.error('Error deleting tutorial:', data.message || 'Unknown error');
    //             toast.error(data.message || 'Failed to delete tutorial');
    //         }
    //     } catch (error) {
    //         console.error('Error deleting tutorial:', error);
    //         toast.error('An error occurred while deleting the tutorial');
    //     }
    // };


    const handleDelete = async (id) => {
        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to undo this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirmation.isConfirmed) {
            try {
                const response = await fetch(`https://server-wheat-xi.vercel.app/tutorial/${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setTutorials(tutorials.filter(tutorial => tutorial?._id !== id));
                    toast.success(data.message || 'Tutorial deleted successfully');
                    Swal.fire('Deleted!', 'The tutorial has been deleted.', 'success');
                } else {
                    console.error('Error deleting tutorial:', data.message || 'Unknown error');
                    toast.error(data.message || 'Failed to delete tutorial');
                }
            } catch (error) {
                console.error('Error deleting tutorial:', error);
                toast.error('An error occurred while deleting the tutorial');
            }
        } else {
            Swal.fire('Cancelled', 'Your tutorial is safe!', 'info');
        }
    };

    const handleRedirect = (item)=>{
        navigate(`/update-tutorial/${item._id}`,{ state: item })
    }

    if(loading){
        return <Spiner/>
    }
    return (
        <>
            {data?.data?.length == 0 ?( <div className='w-full h-screen flex justify-center items-center'><h1 className='text-3xl font-semibold '>Empty data List</h1></div>)
            : <div className="min-h-screen p-3  ">
                    <Title title="My Tutorials"/>
            <div className="w-full md:w-[90%]   m-auto overflow-x-auto">
            <table className="w-full table-auto  rounded-lg shadow-lg">
                        <thead className={`${isDarkMode ? "bg-white text-tc" : "bg-gray-200"}`}>
                    <tr>
                        <th data-aos="fade-down" className="p-3 text-left">Name</th>
                        <th data-aos="fade-down" className="p-3 text-left">Image</th>
                        <th data-aos="fade-down" className="p-3 text-left">Language</th>
                        <th data-aos="fade-down" className="p-3 text-left">Price</th>
                        <th data-aos="fade-down" className="p-3 text-left">Description</th>
                        <th data-aos="fade-down" className="p-3 text-left">Review</th>
                        <th data-aos="fade-down" className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.map(tutorial => (
                        <tr key={tutorial?._id} className="border-b">
                            <td className="p-3">{tutorial?.name}</td>
                            <td className="p-3">
                                <img src={tutorial?.image} alt={tutorial?.name} className="w-16 h-16 object-cover rounded-md" />
                            </td>
                            <td data-aos="fade-up" className="p-3">{tutorial?.language}</td>
                            <td data-aos="fade-up" className="p-3">{tutorial?.price}</td>
                            <td data-aos="fade-up" className="p-3">{tutorial?.description.slice(0,20)}...</td>
                            <td data-aos="fade-up" className="p-3">{tutorial?.review}</td>
                            <td data-aos="fade-up" className="p-3 flex justify-start items-start gap-1 flex-col md:flex-row">
                                <button
                                    className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    onClick={() => handleDelete(tutorial?._id)}
                                >
                                    <i className="fas fa-trash delete-icon" title="Delete"></i>
                                </button>
                                <Link onClick={()=>handleRedirect(tutorial)} >
                                    <button
                                        className=" px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        <i className="fas fa-pen edit-icon" title="Update"></i>
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>}
        </>

    );
};

export default MyTutorials;
