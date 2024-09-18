import React, { useState, useEffect } from "react";

const Search = () => {
  const [breed, setBreed] = useState("");
  const [breedImages, setBreedImages] = useState([]);
  const [randomImages, setRandomImages] = useState([]);
  const [breedsList, setBreedsList] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;

  // Fetch random dog images and breeds
  useEffect(() => {
    fetchRandomImages();
    fetchBreedsList();
  }, []);

  const fetchRandomImages = () => {
    fetch("https://dog.ceo/api/breeds/image/random/6")
      .then((response) => response.json())
      .then((data) => setRandomImages(data.message))
      .catch(() => setError("Failed to load random images."));
  };

  const fetchBreedsList = () => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((data) => {
        const breeds = Object.keys(data.message);
        setBreedsList(breeds);
      })
      .catch(() => setError("Failed to load breeds list."));
  };

  const handleSearch = () => {
    if (breed.trim() === "") {
      setError("Please enter a valid breed name");
      return;
    }

    fetch(`https://dog.ceo/api/breed/${breed.toLowerCase()}/images`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "error") {
          setError("Breed not found. Please try again.");
          setBreedImages([]);
        } else {
          setBreedImages(data.message);
          setError("");
          setCurrentPage(1);
        }
      })
      .catch(() => {
        setError("An error occurred. Please try again.");
      });
  };

  // Filter breeds when the user types
  const handleBreedChange = (e) => {
    const searchTerm = e.target.value;
    setBreed(searchTerm);

    if (searchTerm.length > 0) {
      const filtered = breedsList.filter((breed) =>
        breed.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredBreeds(filtered);
    } else {
      setFilteredBreeds([]);
    }
  };

  const handleBreedSelect = (selectedBreed) => {
    setBreed(selectedBreed);
    setFilteredBreeds([]);
  };

  // Handle pagination
  const totalPages = Math.ceil(breedImages.length / imagesPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get the current set of images to display on the current page
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = breedImages.slice(indexOfFirstImage, indexOfLastImage);

  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-color-6 p-5">
        <h1 className="text-md font-bold text-color-5">
          Looking for a specific companion ?
        </h1>

        {/* Search Input */}
        <div>
          <div>
            <input
              type="text"
              className="bg-gray-50 border border-color-4 text-gray-900 text-sm rounded-full p-2 mt-4"
              value={breed}
              onChange={handleBreedChange}
              placeholder="Enter breed"
            />
            <button
              className="bg-color-4 text-white p-1.5 ml-1 rounded-full"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Dropdown Suggestions on the first letter typed */}
          {filteredBreeds.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 w-48 max-h-40 overflow-y-auto mt-1 rounded-md shadow-lg">
              {filteredBreeds.map((suggestedBreed, index) => (
                <li
                  key={index}
                  onClick={() => handleBreedSelect(suggestedBreed)}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                >
                  {suggestedBreed}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Error Message when the input is empty or there's not match */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Breed Images or Random Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:px-28 py-6">
          {(breedImages.length === 0 ? randomImages : currentImages).map(
            (image, index) => (
              <div key={index} className="group">
                <img
                  src={image}
                  alt={`Dog ${index}`}
                  className="w-full h-96 object-cover rounded-lg shadow-lg transition duration-300 transform group-hover:scale-105"
                />
              </div>
            )
          )}
        </div>

        {/* Pagination Controls */}
        {breedImages.length > imagesPerPage && (
          <div className="flex justify-center items-center space-x-4">
            <button
              className={`bg-color-4 text-color-6 p-2 rounded ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <svg
                className="w-2.5 h-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
            <span className="text-lg font-normal">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`bg-color-4 text-color-6 p-2 rounded ${
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <svg
                className="w-2.5 h-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
