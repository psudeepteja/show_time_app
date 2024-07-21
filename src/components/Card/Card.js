"use client"
import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Modal from "../Modal/Modal";

export default function Card({ nowShowingData }) {
  const params = useParams()
  const { city } = params
  const router = useRouter()
  const intialMovieslemgth = 8
  const [isOpen, setIsOpen] = useState(false);
  const [moviesLength, setMoviesLength] = useState(intialMovieslemgth)
  const [langData, setLangData] = useState([])
  const [langInfo, setLangInfo] = useState()
  const moviesData = nowShowingData?.groupedMovies.slice(0, moviesLength)

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (item) => {
    console.log(item, "item")
    const { label, languageFormatGroups } = item

    setLangData({ label, languageFormatGroups })
    if (languageFormatGroups.length > 1) {
      toggleModal()
      setLangInfo(languageFormatGroups[0])
    } else {
      router.push(`/movies/${city}/${label}?frmtid=${languageFormatGroups[0].fmtGrpId}&date=${languageFormatGroups[0].screenFormats[0].nextAvailableDate}`)
    }
  }

  const handleViewMore = () => {
    setMoviesLength(nowShowingData?.groupedMovies.length)
  }
  const handleLangChange = (info) => {
    setLangInfo(info)
  }
  const handleLangClick = () => {
    toggleModal()
    router.push(`/movies/${city}/${langData.label}?frmtid=${langInfo.fmtGrpId}&date=${langInfo.screenFormats[0].nextAvailableDate}`)
  }

  return (
    <>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 2xl:mx-28">
        {moviesData?.map((item) => (
          <div
            key={item.contentId}
            className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer relative"
            onClick={() => (handleClick(item))}
          >
            {item.bookingStatus && (<p className="absolute top-2 right-2 bg-green-200 text-white rounded-md text-xs md:text-base font-semibold px-2 py-0.5">{item.bookingStatus}</p>)}
            <Image
              src={item.imgPath}
              alt={item.label}
              // className="sm:w-72 lg:w-72 sm:h-72 md:h-96 object-cover"
              width={300}
              height={400}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true} 
            />
            <div className="p-4">
              <h6 className="text-sm lg:text-base font-semibold mb-2">{item.label}</h6>
              <div className="text-xs flex gap-2">
                <span>{item.censor}</span>
                {item.languageFormatGroups?.map((i, idx) => (
                  <span key={idx} className="text-xs">{i.lang}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {langData?.languageFormatGroups?.length > 1 && (
        <Modal isOpen={isOpen} onClose={toggleModal}>
          <p
            className="text-gray-500 hover:text-gray-700 pb-4 md:pb-2 text-right cursor-pointer"
            onClick={toggleModal}
          >
            Close
          </p>
          {langData.languageFormatGroups.map((i, idx) => (
            <div key={idx} className="flex">
              <input type="radio" id="lang" name="lang" value={i.lang} onChange={() => handleLangChange(i)} checked={langInfo.lang === i.lang} />
              <p>{i.lang}</p>
            </div>
          ))}
          <p className="bg-orange-100 px-4 py-2 text-white font-semibold text-center" onClick={handleLangClick}>Proceed</p>
        </Modal>
      )}
      
      <div className="flex justify-center mt-6">
        {moviesData.length < nowShowingData?.groupedMovies.length && (
          <div className="px-6 py-2 border rounded-xl shadow-lg text-orange-100 font-semibold cursor-pointer text-xs " onClick={handleViewMore}>View All</div>
        )}
      </div>
    </>
  );
}
