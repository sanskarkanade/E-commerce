import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";


const Footer = () => {
  

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <p className="text-center text-sm sm:text-base text-gray-300">
          © {new Date().getFullYear()} All rights reserved. |{" "}
          <a
            href="/terms"
            className="hover:text-blue-400 transition duration-300"
           
          >
            Terms of Service
          </a>{" "}
          |{" "}
          <a
            href="/privacy"
            className="hover:text-blue-400 transition duration-300"
           
          >
            Privacy Policy
          </a>{" "}
          | Made with ❤️ by{" "}
          <span className="font-semibold text-blue-400">Sanskar Kanade</span>
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <span className="text-sm sm:text-base font-medium text-gray-200">
            Connect with me
          </span>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/sanskar-kanade-585805322?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
             
              className="group"
            >
              <FaLinkedin className="text-2xl text-gray-300 hover:text-blue-600 transition duration-300 transform group-hover:scale-110" />
            </a>
            <a
              href="https://github.com/sanskarkanade"
              target="_blank"
              rel="noopener noreferrer"
              
              className="group"
            >
              <FaGithub className="text-2xl text-gray-300 hover:text-gray-500 transition duration-300 transform group-hover:scale-110" />
            </a>
            <a
              href="https://www.instagram.com/sanskar_1776?igsh=MWV5azV2Y3Zuc2tmeQ=="
              target="_blank"
              rel="noopener noreferrer"
              
              className="group"
            >
              <FaInstagram className="text-2xl text-gray-300 hover:text-pink-500 transition duration-300 transform group-hover:scale-110" />
            </a>
            <a
              href="https://x.com/Sanskarkanade17?t=i5NsBVQpYgrWcmG0nO9SlQ&s=09"
              target="_blank"
              rel="noopener noreferrer"
              
              className="group"
            >
              <FaTwitter className="text-2xl text-gray-300 hover:text-blue-400 transition duration-300 transform group-hover:scale-110" />
            </a>
          </div>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;