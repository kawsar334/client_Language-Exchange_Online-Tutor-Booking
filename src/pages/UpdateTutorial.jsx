import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const updatedTutoriall = () => {
    const { id } = useParams();
    const { state } = useLocation()
    const [tutorial, setTutorial] = useState(null);
    const [formData, setFormData] = useState({
        image: '',
        language: '',
        price: '',
        description: '',
    });

    // Fetch the tutorial data for editing
    useEffect(() => {
        axios.get(`/api/tutorials/${id}`)
            .then(response => {
                setTutorial(response.data);
                setFormData({
                    image: response.data.image,
                    language: response.data.language,
                    price: response.data.price,
                    description: response.data.description,
                });
            })
            .catch(error => console.error('Error fetching tutorial:', error));
    }, [id]);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submit to update tutorial
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/api/tutorials/${id}`, formData)
            .then(response => {
                toast.success('Tutorial updated successfully!');
            })
            .catch(error => console.error('Error updating tutorial:', error));
    };

    if (!tutorial) return <div>Loading...</div>;

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Update Tutorial</h2>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                {/* Tutorial Name (Non-editable) */}
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={tutorial.name}
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                    />
                </div>

                {/* Email (Non-editable) */}
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={tutorial.email}
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                    />
                </div>

                {/* Image URL */}
                <div className="mb-4">
                    <label className="block text-gray-700">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        
                        value={formData.image}
                        required
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                {/* Language */}
                <div className="mb-4">
                    <label className="block text-gray-700">Language</label>
                    <input
                        type="text"
                        name="language"
                        value={formData.language}
                        required
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        required
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        required
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        rows="4"
                    />
                </div>

                {/* Update Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Update Tutorial
                    </button>
                </div>
            </form>
        </div>
    );
};

export default updatedTutoriall;
