"use client"
import { useRouter } from "next/navigation";
import React from "react";

export default function Card({ nowShowingData }) {
  const date = new Date();
  // Get the year, month, and day components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 as month index starts from 0
  const day = String(date.getDate()).padStart(2, '0');
  // Format the date in the desired format (YYYY-MM-DD)
  const currentDate = `${year}-${month}-${day}`;


  console.log("formattedDate", currentDate)

  const router = useRouter()
  console.log("router", router)
  const handleClick = (item )=>{
    console.log(item, "item")
    router.push(`/${item.label}/${item.languageFormatGroups[0].fmtGrpId}/${currentDate}`)
  }


  console.log("nowShowingData", nowShowingData)
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 2xl:mx-28">
      {nowShowingData.groupedMovies.map((item) => (
        <div
          key={item.contentId}
          className="bg-white shadow-md rounded-md overflow-hidden sm:w-72 lg:w-72 cursor-pointer"
          onClick={()=>(handleClick(item))}
        >
          <img
            src={item.imgPath}
            alt={item.label}
            className="h-64 sm:w-72 lg:w-72 sm:h-72 md:h-96 object-cover"
          />
          <div className="p-4">
            <h6 className="text-base font-semibold mb-2">{item.label}</h6>
          </div>
        </div>
      ))}
    </div>
  );
}
