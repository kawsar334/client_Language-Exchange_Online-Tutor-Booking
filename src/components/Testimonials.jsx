import React, { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";

const Testimonials = () => {
    const { isDarkMode } = useContext(ThemeContext)
    const testimonials = [
        {
            id: 1,
            name: "Ali Reza",
            feedback: "This platform helped me connect with amazing tutors. The user interface is so easy to use!",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ZdkWloBQS7DXKGDZ-F9IuIp-uFVF7F18Vg&s",
        },
        {
            id: 2,
            name: "Sara Khan",
            feedback: "I found the perfect tutor for learning French. Highly recommended!",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5TlVx7SebsbHcRPmjypiKNXhV0Jtxx0Muyw&s",
        },
        {
            id: 3,
            name: "Mohammad Rizwan",
            feedback: "A fantastic experience! The tutors are professional and the platform is very reliable.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDu9TCVKcnIbjtAlWtn5YsoJYHRs1DkIInBQ&s",
        },
    ];

    return (
        <section className=" py-12 px-4 my-[100px]">
            <h2 className={`${isDarkMode ? "text-3xl font-bold text-center text-tc mb-8" : "text-3xl font-bold text-center text-gray-800 mb-8"}`}>What Our Student Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white border p-6 rounded-lg shadow-lg text-center">
                        <img
                            data-aos="fade-up"
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-24 h-24 object-cover border-[2px] border-tc  rounded-full mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800" data-aos="fade-down">{testimonial.name}</h3>
                        <p className="text-gray-600 mt-4" data-aos="fade-up">{testimonial.feedback}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
