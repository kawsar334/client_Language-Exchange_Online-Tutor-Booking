import { Link } from "react-router-dom";


export const Hero = ({ uniqueTutor }) => {
  // Dynamic array for carousel slides
  const slides = [
    {
      _id: 1,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGVkdWNhdGlvbnxlbnwwfHx8fDE2OTI3NzQxMDA&ixlib=rb-1.2.1&q=80&w=1080',
      title: 'Learn New Languages',
      desc: 'Connect with expert tutors to master new languages efficiently.',
      buttonText: 'Get Started',
    },
    {
      _id: 2,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8HCR_M2L7_1SAQbKBc7vRVbwfiHz5hpRUhg&s',
      title: 'Teach and Earn',
      desc: 'Share your knowledge and make an impact globally as a tutor.',
      buttonText: 'Join as a Tutor',
    },
    {
      _id: 3,
      image: 'https://www.internations.org/image/250_250/2024/10/10/e0a350cf9779eff7bd143575893746abf133c25d803a6fdad3d2224a948e723f.jpeg',
      title: 'Global Language Exchange',
      desc: 'Explore diverse languages and cultures with learners worldwide.',
      buttonText: 'Explore Now',
    },
    {
      _id: 4,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyu9RcQch_ocKEiUk8r9Yruj_lvqtvLPEHnw&s',//
      title: 'Personalized Learning',
      desc: 'Get customized learning plans tailored just for you.',
      buttonText: 'Learn More',
    },
    {
      _id: 5,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFyYNwYnlH5LfNLI-IV7E88SpvQwimvTnp2w&s',
      title: 'Interactive Classes',
      desc: 'Join interactive classes for hands-on learning experiences.',
      buttonText: 'Join Now',
    },
    {
      _id: 6,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwbDrZ-IP1WT3VmadIx05HdTswkf-rkUJ0Lw&s',
      title: 'Learn Anytime, Anywhere',
      desc: 'Access your classes from anywhere in the world at any time.',
      buttonText: 'Start Now',
    },
  ];

  return (
    <div className="carousel w-full  h-[500px]" >
      {slides.map((slide, index) => (
        <div
          key={slide?._id}
          id={`slide${slide?._id}`}
          className="carousel-item relative w-full"
        >
          {/* Image */}
          <img
            src={slide.image}
            className="w-full object-cover"
            alt={slide.title}
            data-aos="zoom-in"
          />
          {/* Overlay */}
          <div className="absolute flex justify-center items-center h-full w-full bg-black bg-opacity-50">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold" >{slide.title}</h1>
              <p className="text-lg mt-4" data-aos="flip-down">{slide.desc}</p>
              <a  href="#category" className="btn btn-primary mt-6" data-aos="flip-up">{slide.buttonText}</a>
            </div>
          </div>
          {/* Navigation Buttons */}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href={`#slide${index === 0 ? slides.length : index}`}
              className="btn btn-circle"
            >
              ❮
            </a>
            <a
              href={`#slide${index === slides.length - 1 ? 1 : index + 2}`}
              className="btn btn-circle"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};



