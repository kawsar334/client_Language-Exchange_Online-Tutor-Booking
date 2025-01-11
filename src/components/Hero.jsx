


import { useState } from "react";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";

export const Hero = ({ uniqueTutor }) => {
  const slides = [
    {
      _id: 1,
      image: img1,
      title: 'Learn New Languages',
      desc: 'Connect with expert tutors to master new languages efficiently.',
      buttonText: 'Get Started',
    },
    {
      _id: 2,
      image: img2,
      title: 'Teach and Earn',
      desc: 'Share your knowledge and make an impact globally as a tutor.',
      buttonText: 'Join as a Tutor',
    },
    {
      _id: 3,
      image: img3,
      title: 'Global Language Exchange',
      desc: 'Explore diverse languages and cultures with learners worldwide.',
      buttonText: 'Explore Now',
    },
    {
      _id: 4,
      image: img4,
      title: 'Personalized Learning',
      desc: 'Get customized learning plans tailored just for you.',
      buttonText: 'Learn More',
    },
    {
      _id: 5,
      image: img5,
      title: 'Interactive Classes',
      desc: 'Join interactive classes for hands-on learning experiences.',
      buttonText: 'Join Now',
    },
    {
      _id: 6,
      image: img6,
      title: 'Learn Anytime, Anywhere',
      desc: 'Access your classes from anywhere in the world at any time.',
      buttonText: 'Start Now',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleMiniImageClick = (index) => {
    setCurrentSlide(index);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="relative">
      <div className="carousel w-full h-[400px] relative">
        {slides.map((slide, index) => (
          <div
            key={slide._id}
            className={`carousel-item relative w-full flex justify-center items-center ${index === currentSlide ? "block" : "hidden"
              }`}
          >

            <img
              src={slide.image}
              className="w-[100%] h-full object-cover"
              alt={slide.title}
              data-aos="zoom-in"
            />
            <div className="absolute flex justify-center items-center h-full w-full hover:bg-black hover:bg-opacity-50 transition-all duration-500">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold">{slide.title}</h1>
                <p className="text-lg mt-4" data-aos="flip-down">
                  {slide.desc}
                </p>
                <a href="#category" className="btn bg-teal hover:bg-white border-teal hover:text-teal  mt-6" data-aos="flip-up">
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <button onClick={handlePrevSlide} className="btn btn-circle">
          ❮
        </button>
        <button onClick={handleNextSlide} className="btn btn-circle">
          ❯
        </button>
      </div>
      <div className="flex justify-center items-center w-full md:w-[80%] m-auto transform left-[50%] translate-x-[-50%] absolute bottom-[-60px] bg- shadow-sm h-[200px] rounded space-x-3 p-4">
        {slides.map((slide, index) => (
          <div key={slide._id} className="bottom-0 z-10">
            <img
              src={slide.image}
              className="w-[50px] md:w-[200px] h-[50px] md:h-[100px] object-cover border rounded cursor-pointer"
              alt=""
              onClick={() => handleMiniImageClick(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
