import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateTutorial = () => {
    const tutorialId = useLocation().pathname.split("/")[2]
    const navigate = useNavigate();
    const  state  = useLocation();

    console.log(state.state)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        image: '',
        language: '',
        price: '',
        description: '',
        review: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch the current tutorial data when the component loads
    useEffect(() => {
        const fetchTutorialData = async () => {
            try {
                const response = await fetch(`https://server-wheat-xi.vercel.app/tutorial/${tutorialId}`);
                const data = await response.json();
                setFormData(data?.data); 
                console.log(data?.data)
            } catch (err) {
                console.error('Error fetching tutorial data:', err.message);
            }
        };

        fetchTutorialData();
    }, [tutorialId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { image, language, price, description,  } = formData;

        try {
            const response = await fetch(`https://server-wheat-xi.vercel.app/updateTutorial/${tutorialId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image, language, price, description, createdAt: new Date().toISOString() }),
            });

            if (!response.ok) {
                toast.error('Failed to update tutorial');
            }

            const result = await response.json();
            toast.success(result.message);
            setIsModalOpen(false); 
            navigate('/'); 
        } catch (err) {
            console.error('Error updating tutorial:', err.message);
        }
    };

    return (
        <div className="h-max  flex items-center justify-center   ">
         
                <div className="my-[100px]  flex  items-center justify-center  w-full">
                    <div className=" p-5 md:p-7 rounded-lg  shadow-lg w-full md:w-[600px] ">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Tutorial</h2>

                        <form onSubmit={handleSubmit} className=" ] w-full">
                           <div className='flex flex-col md:flex-row gap-2 '>
                            <div>
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    readOnly
                                    className="w-full p-3 border bg-white text-[gray] rounded-lg "
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    readOnly
                                    className="w-full p-3 border bg-white text-[gray] rounded-lg "
                                />
                            </div>

                           </div>


                        <div className='flex flex-col md:flex-row gap-2 '>

                            <div className='w-full md:w-[50%]'>
                                <label className="block text-gray-700">Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    required
                                    onChange={handleChange}
                                    className="w-full p-3 border bg-white text-[gray] rounded-lg"
                                />
                            </div>
                            <div className='w-full md:w-[50%]'>
                                <label className="block text-gray-700">Language</label>
                                <select
                                    name="language"
                                    value={formData.language}
                                    required
                                    onChange={handleChange}
                                    className="w-full p-3 border bg-white text-[gray] rounded-lg"
                                >
                                    <option value="">Select Language</option>
                                    <option value="English">English</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="French">French</option>
                                    <option value="Bengali">Bengali</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Arabic">Arabic</option>
                                    <option value="Urdu">Urdu</option>
                                    <option value="Tamil">Tamil</option>
                                    <option value="China">China</option>
                                </select>
                            </div>
                        </div>
                            <div>
                                <label className="block text-gray-700">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    required
                                    onChange={handleChange}
                                    className="w-full p-3 border bg-white text-[gray] rounded-lg"
                                    placeholder="Enter price"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    required
                                    onChange={handleChange}
                                    className="w-full p-3 border bg-white text-[gray] rounded-lg"
                                    rows="4"
                                    placeholder="Enter description"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700">Review</label>
                                <input
                                    type="number"
                                    name="review"
                                    value={formData.review}
                                    readOnly
                                    className="w-full p-3 border bg-white text-[gray] rounded-lg "
                                />
                            </div>

                            <div className="flex justify-end space-x-4 my-5">
                                <button
                                    type="button"
                                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
           
        </div>
    );
};

export default UpdateTutorial;
