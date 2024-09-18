import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [randomDogImage, setRandomDogImage] = useState("");

  // Fetch a random image from the API
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => setRandomDogImage(data.message));
  }, []);

  return (
    <div className="flex items-center justify-center text-center overflow-hidden">
      <h1 className="text-color-6 text-5xl md:text-6xl lg:text-8xl font-bold">
        WE ARE PAWSOME !
      </h1>
      {/* Semi-Circle background */}
      <div className="absolute w-[100vw] md:w-[90vw] lg:w-[80vw] h-[100vw] md:h-[80vw] lg:h-[40vw] ease-in-out duration-300 p-2 bg-color-6 rounded-t-full bottom-0 opacity-80">
        <div className="flex flex-col items-center">
          {/* fetched image from the API */}
          {randomDogImage && (
            <img
              src={randomDogImage}
              alt="Random Dog"
              className="absolut w-60 md:w-72 lg:w-96 h-60 md:h-72 lg:h-96 rounded-full ease-in-out duration-300"
            />
          )}

          <div className="m-4">
            <p className="text-gray-500 mb-3">
              We brighten your day with a daily dose of
            </p>
            <h2 className="text-xl md:text-2xl lg:text-4xl text-color-4 font-bold">
              CUTNESS !
            </h2>
          </div>

          <div className="md:absolute lg:absolute bottom-16">
            <Link
              to="/gallery"
              className="block py-3 px-4 bg-color-4 text-white rounded-full hover:bg-color-2"
            >
              Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
