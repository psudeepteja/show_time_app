import React, { useState, ChangeEvent } from "react";
import Modal from "../Modal/Modal";
import { useRouter } from "next/navigation";

const Location: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); 
  const [city, setCity] = useState<string>("");
  const router = useRouter();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => { 
    setCity(e.target.value);
  };

  const handleClick = () => {
    console.log("city", city);
    router.push(`/movies/${city}`);
    setIsOpen(false);
    setCity("");
  };

  return (
    <div className="flex items-center justify-center">
      <button className="" onClick={toggleModal}>
        Nellore
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
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
