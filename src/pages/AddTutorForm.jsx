import React, { useState } from 'react';

const AddTutorForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        language: '',
        price: '',
        review: '',
        details: '',
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
        try {
            const response = await fetch('https://server-wheat-xi.vercel.app/add-tutor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                alert('Tutor added successfully!');
                // setFormData({
                //     name: '',
                //     image: '',
                //     language: '',
                //     price: '',
                //     review: '',
                //     details: '',
                // });
            } else {
                alert(data.message || 'Failed to add tutor');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Add Tutor</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Language</label>
                    <input
                        type="text"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Review</label>
                    <input
                        type="number"
                        name="review"
                        value={formData.review}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Details</label>
                    <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        rows="4"
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddTutorForm;
