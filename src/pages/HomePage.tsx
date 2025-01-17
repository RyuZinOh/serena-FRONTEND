import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import { Parallax } from "react-parallax";
import HomeBg from "./HomeExplicit/HomeBg";
import HomeCard from "./HomeExplicit/HomeCard";
import ContactForm from "./HomeExplicit/ContactForm";
import {
  FaCommentDots,
  FaFire,
  FaStar,
  FaThumbsUp,
  FaTools,
} from "react-icons/fa";

const UnderConstructionCard = () => (
  <div className="w-full max-w-full bg-black bg-opacity-80 rounded-lg overflow-hidden shadow-lg text-center p-8">
    <FaTools className="text-yellow-500 text-4xl mb-4" />

    <h2 className="text-white text-3xl font-extrabold">Under Construction</h2>
    <p className="text-white text-lg mt-2">
      We're working hard to bring you exciting new features like showcasing user
      highlights their deeds and others. Stay tuned!
    </p>
    <div className="flex justify-center space-x-4 mt-4">
      <FaThumbsUp className="text-yellow-500 text-2xl" />
      <FaCommentDots className="text-yellow-500 text-2xl" />
      <FaStar className="text-yellow-500 text-2xl" />
    </div>
  </div>
);

interface CarouselItem {
  title: string;
  subtitle: string;
  cta: string;
  mobileImage: string;
  desktopImage: string;
}

const carouselContent: CarouselItem[] = [
  {
    title: "Become a Master Trainer",
    subtitle: "Your Pokémon journey starts here!",
    cta: "Start Training",
    mobileImage:
      "https://raw.githubusercontent.com/RyuZinOh/static-assets/main/serenax_carou_1.jpg",
    desktopImage:
      "https://raw.githubusercontent.com/RyuZinOh/static-assets/main/serena-carousal/pikachu.png",
  },
  {
    title: "Epic Battles Await",
    subtitle: "Challenge trainers worldwide in real-time battles",
    cta: "Battle Now",
    mobileImage:
      "https://raw.githubusercontent.com/RyuZinOh/static-assets/main/serenax_carou_2.jpg",
    desktopImage:
      "https://raw.githubusercontent.com/RyuZinOh/static-assets/main/serena-carousal/battleTestament.jpg",
  },
  {
    title: "Catch 'Em All",
    subtitle: "Discover and collect rare Pokémon",
    cta: "Explore",
    mobileImage:
      "https://raw.githubusercontent.com/RyuZinOh/static-assets/main/serenax_carou_3.jpg",
    desktopImage:
      "https://raw.githubusercontent.com/RyuZinOh/static-assets/main/serena-carousal/pokemons.png",
  },
];

const Carousel: React.FC<{ content: CarouselItem[] }> = ({ content }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  const images = content.map((item) =>
    isMobile ? item.mobileImage : item.desktopImage
  );

  const handleResize = React.useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Parallax
      bgImage={images[currentSlide]}
      strength={300}
      className="w-full h-[790px] sm:h-[890px]"
    >
      <div className="absolute inset-0 bg-yellow-400 p-16 sm:p-16 flex items-center justify-center">
        <div className="text-center max-w-full sm:max-w-4xl mt-8 sm:mt-16">
          <h1 className="text-1xl sm:text-4xl font-bold mb-2 text-black animate-fade-in">
            {content[currentSlide].title}
          </h1>
          <p className="text-lg sm:text-1xl text-black mb-4 animate-fade-in">
            {content[currentSlide].subtitle}
          </p>

          <Link
            to="/register"
            className="bg-yellow-400 border border-black hover:bg-white hover:border hover:border-none text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 inline-block"
          >
            {content[currentSlide].cta}
          </Link>
        </div>
      </div>
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {content.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-yellow-400 w-8"
                : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </Parallax>
  );
};

const HomePage: React.FC = () => {
  return (
    <Layout
      title="Welcome to Serena - Pokémon Battle, Trade & Explore"
      description="Join Serena, the ultimate Pokémon platform for trainers to battle, trade, and explore the world of Pokémon!"
      author="Serena Team"
      keywords="Pokemon, Battle, Trade, Catch, Serena"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="relative w-full">
        <Carousel content={carouselContent} />
      </div>
      <div className="mt-20 mb-16 flex flex-col sm:flex-row justify-end gap-8">
        <UnderConstructionCard />
        <div className="hidden sm:block w-full sm:w-auto flex-grow">
          <ContactForm />
        </div>
      </div>

      <div className="text-left flex items-center">
        <h3 className="text-xl flex font-bold text-gray-800 mb-4">
          {" "}
          Trending Now
          <FaFire className="text-red-500 text-xl" />
        </h3>
      </div>

      <HomeCard startIndex={1} />
      <HomeBg />
      <HomeCard startIndex={6} />

      <div className="flex justify-center items-center mt-16 mb-4">
        <Link
          to="/appearance"
          className="text-black text-lg font-medium border-2 border-gray-800 py-2 px-8 rounded-lg uppercase tracking-wide bg-yellow-400"
        >
          View More
        </Link>
      </div>
    </Layout>
  );
};

export default HomePage;
