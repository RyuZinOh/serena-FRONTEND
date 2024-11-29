import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaGithub, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      text: "“Pika Pika! Serena is the BEST place to train, trade, and battle! I’ve made so many new friends and caught tons of Pokémon!”",
      name: "Pikachu",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    },
    {
      text: "“Charmander, Char! This place is ON FIRE! The battles are intense, and trading is a blaze of fun!”",
      name: "Charmander",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    },
    {
      text: "“Psyyy! This community is great, so many cool events! It's easy to connect with trainers and trade Pokémon. I'm quackers for it!”",
      name: "Psyduck",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="bg-black text-white py-8">
      <footer className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">About Us</h4>
            <p className="text-sm">
              We are Serena, a platform for trainers to battle, trade, and
              explore the world of Pokémon. Join us and become a part of the
              adventure!
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "text-yellow-500" : "hover:text-gray-400"
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "text-yellow-500" : "hover:text-gray-400"
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/policy"
                  className={({ isActive }) =>
                    isActive ? "text-yellow-500" : "hover:text-gray-400"
                  }
                >
                  Privacy Policy
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className="text-sm">
              Email:{" "}
              <a
                href="mailto:yoyuehappy@gmail.com"
                className="hover:text-gray-400"
              >
                yoyuehappy@gmail.com
              </a>
            </p>
            <p className="text-sm">
              Phone:{" "}
              <a href="tel:+9779814202188" className="hover:text-gray-400">
                +977 9814202188
              </a>
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Testimonials</h4>
            <div className="relative">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={prevTestimonial}
                  className="text-white text-2xl"
                >
                  ❮
                </button>
                <div className="flex items-center">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt="Pokemon Sprite"
                    className="w-24 h-24 mr-4"
                  />
                  <p className="text-sm italic">
                    {testimonials[currentTestimonial].text}
                  </p>
                </div>
                <button
                  onClick={nextTestimonial}
                  className="text-white text-2xl"
                >
                  ❯
                </button>
              </div>
              <p className="text-sm font-semibold">
                {testimonials[currentTestimonial].name}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm">
            &copy; 2024 Serene Safal. All Rights Reserved.
          </p>
        </div>
        <div className="mt-4 text-center">
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/RyuZinOh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://twitter.com/serena"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://facebook.com/serena"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://instagram.com/serena"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
