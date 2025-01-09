import React from "react";
import { Fade } from "react-awesome-reveal"; // Import the Fade component
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer p-10 bg-transparent text-base-content">
      <div>
        <div className="navbar-start  w-full" >
                <Link to="/" className="text-xl font-bold text-teal" >
                  <span className='mr-2'> <i className="fa-solid fa-earth-asia text-xl"></i></span>
                  Language <span className='text-mn'>Exchange</span>
                </Link>
              </div>
        <p className="text-sm w-[300px]">
          Language Exchange is a platform to connect tutors and learners worldwide.
          Learn, teach, and grow together!
        </p>
      </div>

      {/* Section 2: Quick Links */}
      <div>
        <span className="footer-title">Quick Links</span>
        <a href="/" className="link link-hover">Home</a>
        <a href="/find-tutors" className="link link-hover">Find Tutors</a>
        <a href="/add-tutorials" className="link link-hover">Add Tutorials</a>
        <a href="/my-tutorials" className="link link-hover">My Tutorials</a>
      </div>

      {/* Section 3: Support */}
      <div>
        <span className="footer-title">Support</span>
        <a href="#faq" className="link link-hover">FAQ</a>
        <a href="#contact-us" className="link link-hover">Contact Us</a>
        <a href="/privacy-policy" className="link link-hover">Privacy Policy</a>
        <a href="/terms-of-service" className="link link-hover">Terms of Service</a>
      </div>
   
      <div>
        <span className="footer-title">Follow Us</span>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://www.facebook.com/profile.php?id=100076935281732"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl"
          >
            <i className="fab fa-facebook-square"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/kawsar-firoz-a140b9237/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl"
          >
            <i className="fab fa-linkedin"></i>
          </a>

          
          <a
            href="https://kawsar334.github.io/assignment_one/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl"
          >
            <i className="fas fa-briefcase"></i>
          </a>
        </div>
      </div>

    </footer>
  );
};
