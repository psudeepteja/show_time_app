"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function MovieDetail({ movieCodeData }, context) {
  const router = useRouter();
  console.log("++++++", movieCodeData);
  const params = useParams();
  const { movies, fmtGrpId, specificDate } = params;
  const [selectDate, setSelectDate] = useState(specificDate);

  // Function to convert timestamp to IST time (AM/PM format)
  const convertToIST = (timestamp) => {
    const date = new Date(timestamp);
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const istTime = new Date(date.getTime() + istOffset);
    const istTimeHours = istTime.getHours();
    const istTimeMinutes = istTime.getMinutes().toString().padStart(2, "0"); // Get minutes and pad with leading zero if necessary
    const period = istTimeHours >= 12 ? "PM" : "AM"; // Determine AM/PM
    const formattedHours = istTimeHours % 12 || 12; // Convert hours to 12-hour format
    return `${formattedHours}:${istTimeMinutes} ${period}`; // Return time portion in AM/PM format
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthAbbreviation = new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(date);
    const day = date.getDate();
    return `${monthAbbreviation} ${day}`;
  };

  const handleDateClick = (dateString) => {
    router.replace(`/${movies}/${fmtGrpId}/${dateString}`);
    setSelectDate(dateString);
  };

  const handleShowClick = (session) => {
    console.log("session", session)
    const { fid, cid, sid, mid, pid, scrnFmt } = session
    const ffid = fid.toLowerCase()
    const mmid = mid.toLowerCase()
    router.push(`/seatLayout/${ffid}.json?cid=${cid}&sid=${sid}&mid=${mmid}&pid=${pid}&scrnfmt=${scrnFmt}&freeseating=false&fromsessions=true&cityname=nellore&frmtid=${ffid}`)
  }

  return (
    <div className="mx-8 2xl:mx-16">
      {movieCodeData && movieCodeData?.meta?.movies?.map((movie) => (
        <div key={movie.id}>
          <div className="my-6">
            <img src={movie.cvrPath} alt={movie.name} />
          </div>
          <div className="border-b pb-4">
            <h2 className="text-2xl sm:text-3xl px-2 py-2">
              {movie.name} - {movie.lang}
            </h2>
            <div className="flex gap-4 px-4">
              <span>{movie.censor}</span>
              <span>{movie.duration}m</span>
              <div>
                {movie.grn.map((genre, index) => (
                  <span key={index}>{genre}</span>
                ))}
              </div>
              <span>{movie.scrnFmt}</span>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto">
            {movieCodeData.data.sessionDates.map((dateString, idx) => (
              <div
                key={idx}
                className={`border rounded-lg text-center  p-2 mt-4 cursor-pointer ${selectDate === dateString ? "bg-orange-100 text-white" : ""
                  }`}
                onClick={() => handleDateClick(dateString)}
              >
                {formatDate(dateString)}
              </div>
            ))}
          </div>
          <div className="mt-6">
            {movieCodeData?.data?.cinemasOrder?.map((cinemaId) => (
              <div key={cinemaId} className="mt-4">
                <h4 className="text-lg font-medium">
                  {
                    movieCodeData.meta.cinemas.find(
                      (cinema) => cinema.id === cinemaId
                    ).name
                  }
                </h4>
                <div className="grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 2xl:grid-cols-8 justify-center items-center">
                  {movieCodeData.pageData.sessions[cinemaId] &&
                    movieCodeData.pageData.sessions[cinemaId]
                      .sort(
                        (a, b) => new Date(a.showTime) - new Date(b.showTime)
                      )
                      .map((session) => (
                        <div
                          key={session.sid}
                          className="mt-3 cursor-pointer"
                          onClick={() => { handleShowClick(session) }}
                        >
                          <div
                            className={`w-full text-center  border rounded-lg ${session.avail === 0 && "text-gray-500"
                              } ${session.avail > 50
                                ? "text-green-100"
                                : "text-red-600"
                              } text-green-100 hover:bg-orange-100 hover:text-white inline-block px-2 py-2`}
                          >
                            <div className="text-xs md:text-base font-semibold">
                              {convertToIST(session.showTime)}
                            </div>
                            <div className="text-xs">{session.audi}</div>
                          </div>
                          <div className="text-xs text-center mt-2">
                            {session.avail > 0 ? (
                              <span> {session.avail} Available </span>
                            ) : (
                              <span>Sold Out</span>
                            )}
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
