"use client"
import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function Card({ nowShowingData }) {
  console.log("nowShowingData", nowShowingData)
  const params = useParams()
  const { city } = params
  const router = useRouter()

  const [moviesLength, setMoviesLength] = useState(8)
  const moviesData = nowShowingData?.groupedMovies.slice(0, moviesLength)

  const handleClick = (item) => {
    router.push(`/movies/${city}/${item.label}?frmtid=${item.languageFormatGroups[0].fmtGrpId}&date=${item.languageFormatGroups[0].screenFormats[0].nextAvailableDate}`)
  }

  const handleViewMore = () => {
    setMoviesLength(nowShowingData?.groupedMovies.length)
  }
  console.log("nowShowingData?.groupedMovies.length", nowShowingData?.groupedMovies.length)
  console.log("moviesData.length", moviesData.length)

  

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
              className="sm:w-72 lg:w-72 sm:h-72 md:h-96 object-cover"
              width={600}
              height={0}
              loading='lazy'
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
        {/* <div> 
        <Counter />
      </div> */}
      </div>
      <div className="flex justify-center mt-6">
     {moviesData.length < nowShowingData?.groupedMovies.length &&(
     <div className="px-6 py-2 border rounded-xl shadow-lg text-orange-100 font-semibold cursor-pointer text-xs " onClick={handleViewMore}>View All</div>
     )} 
     </div>
    </>
  );
}
