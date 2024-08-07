"use client"
import React, { useState, ChangeEvent } from "react";
import Modal from "../Modal/Modal";
import { useParams, useRouter } from "next/navigation";

const Location: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); 
  const [city, setCity] = useState<string>("");
  const router = useRouter();
  const params = useParams()
  const loc: string  = String(params.city); 
  const location:string = loc.charAt(0).toUpperCase() + loc.slice(1)

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => { 
    setCity(e.target.value);
  };

  const handleClick = () => {
    router.push(`/movies/${city.toLowerCase()}`);
    setIsOpen(false);
    setCity("");
  };

  return (
    <div className="flex items-center justify-center">
      <button  onClick={toggleModal}>
        {location}
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
      <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700 pb-4 md:pb-2"
            onClick={toggleModal}
          >
            Close
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={city}
            placeholder="Search City..."
            className="border-2 border-orange-100 focus:outline-none rounded-md w-3/4 p-2"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={handleClick}
            className="bg-orange-100 p-2 focus:outline-none text-white rounded-md"
          >
            Search
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Location;
