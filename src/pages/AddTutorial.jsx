import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProviders';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spiner from '../components/Spiner';
import { ThemeContext } from '../ThemeProvider';
import Title from '../components/Title';

const AddTutorial = () => {
    const { isDarkMode } = useContext(ThemeContext)
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.displayName,
        email: user?.email,
        image: '',
        language: '',
        price: '',
        description: '',
        review: 0, // Default review is 0
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, image, language, price, description, review } = formData

        try {

            setLoading(true)
            const response = await fetch('https://server-wheat-xi.vercel.app/addtutorial', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, tutorImage: user?.photoURL, image, language, price, description, review, createdAt: new Date().toISOString() }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit data');
            }
            const result = await response.json();
            toast.success(result?.message);
            setTimeout(() => {
                setLoading(false)
                navigate("/")
            }, 8000);
        } catch (err) {
            setLoading(true)
            console.error('Error submitting form:', err.message);
        }
    };

    if (loading) {
        return <Spiner />
    }
    return (
        <div className="min-h-screen flex items-center justify-center  py-12 bg-mn "

            style={{
                background: `url("https://i.pinimg.com/736x/d8/fb/71/d8fb71227a1a12446836e88712ad2b80.jpg")`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="max-w-lg w-full bg-white px-5 py-3 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6"></h2>
                <Title title="Add a New Tutorial"/>

                <form onSubmit={handleSubmit} className="space-y-2">
                    {/* Name Field */}


                    <div className='flex  justify-center items-center gap-2 w-full  flex-col md:flex-row '>
                        <div className='w-full md:w-1/2 '>
                            <label className="block text-gray-700">Name</label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border-b border-b-teal bg-transparent text-[gray]  focus:outline-none focus:ring-1 focus:ring-bgcolor"
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* Email Field */}
                        <div className='w-full md:w-1/2 '>
                            <label className="block text-gray-700">Email</label>
                            <input
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border-b border-b-teal bg-transparent text-[gray]  focus:outline-none focus:ring-1 focus:ring-bgcolor"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div className='flex  justify-center items-center gap-2 w-full  flex-col md:flex-row'>

                        <div className='w-full'>
                            <label className="block text-gray-700">Image URL</label>
                            <input
                                required
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full p-3 border-b border-b-teal bg-transparent text-[gray]  focus:outline-none focus:ring-1 focus:ring-bgcolor"
                                placeholder="Enter image URL"
                            />
                        </div>
                        <div className='w-full'>
                            <label className="block text-gray-700">Language</label>
                            <select
                                name="language"
                                value={formData.language}
                                required
                                onChange={handleChange}
                                className="w-full p-3 border-b border-b-teal bg-transparent text-[gray]  focus:outline-none focus:ring-1 focus:ring-bgcolor"
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

                    <div className='flex  justify-center items-center gap-2'>

                        <div>
                            <label className="block text-gray-700">Price</label>
                            <input
                                required
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full p-3 border-b border-b-teal bg-transparent text-[gray]  focus:outline-none focus:ring-1 focus:ring-bgcolor"
                                placeholder="Enter price per hour"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Review</label>
                            <input
                                required
                                type="number"
                                name="review"
                                value={formData.review}
                                readOnly
                                className="w-full p-3 border-b border-b-teal bg-transparent text-[gray]  bg-gray-100"
                                placeholder="Review (0 by default)"
                            />
                        </div>
                    </div>
                    {/* Description Field */}
                    <div>
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-3 border border-teal bg-transparent text-[gray] rounded-lg focus:outline-none focus:ring-1 focus:ring-bgcolor"
                            rows="4"
                            placeholder="Enter tutorial description"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Review</label>
                        <input
                            required
                            type="number"
                            name="review"
                            value={formData.review}
                            readOnly
                            className="w-full p-3 border border-teal bg-transparent text-[gray]  rounded-lg bg-gray-100"
                            placeholder="Review (0 by default)"
                        />
                    </div>
                    <div className="text-center">
                        <button
                            required
                            type="submit"
                            className="px-6 py-3 bg-teal text-white rounded-lg hover:bg-white hover:text-teal hover:border transition duration-200"
                        >
                            Submit Tutorial
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTutorial;


