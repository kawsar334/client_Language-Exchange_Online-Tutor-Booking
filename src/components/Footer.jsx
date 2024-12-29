import React from "react";
import { Fade } from "react-awesome-reveal"; // Import the Fade component

export const Footer = () => {
  return (
    <footer className="footer p-10 bg-transparent text-base-content">
      <div>
        <span className="footer-title">About Us</span>
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
        <a href="/faq" className="link link-hover">FAQ</a>
        <a href="/contact-us" className="link link-hover">Contact Us</a>
        <a href="/privacy-policy" className="link link-hover">Privacy Policy</a>
        <a href="/terms-of-service" className="link link-hover">Terms of Service</a>
      </div>

      {/* Section 4: Social Media */}
      <div>
        <span className="footer-title">Follow Us</span>
        <div className="grid grid-flow-col gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl">
            <i className="fab fa-facebook-square"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl">
            <i className="fab fa-twitter-square"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};
