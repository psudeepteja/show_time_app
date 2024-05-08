"use client";

import { convertToIST, formatDate } from "@/utilits";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MovieDetail({ movieCodeData, context }) {
  const router = useRouter();
  const { frmtid, date } = context?.searchParams
  const { movieDetails, city } = context?.params

  const [selectDate, setSelectDate] = useState(date);

  const handleDateClick = (dateString) => {
    router.replace(`/movies/nellore/${movieDetails}?frmtid=${frmtid}&date=${dateString}`)
    setSelectDate(dateString);
  };

  const handleShowClick = (session) => {
    const { fid, cid, sid, mid, pid, scrnFmt } = session
    const ffid = fid.toLowerCase()
    const mmid = mid.toLowerCase()
    router.push(`/seatLayout/${ffid}.json?cid=${cid}&sid=${sid}&mid=${mmid}&pid=${pid}&scrnfmt=${scrnFmt}&freeseating=false&fromsessions=true&cityname=nellore&frmtid=${ffid}`)
  }

  if (!movieCodeData) {
    return <h1>OOPS, Currently no shows available</h1>
  }

  return (
    <div className="mx-8 2xl:mx-16">
      {movieCodeData && movieCodeData?.meta?.movies?.map((movie) => (
        <div key={movie.id}>
          <div className="my-6">
            <Image src={movie.cvrPath} alt={movie.name} width={600} height={0}/>
          </div>
          <div className="border-b pb-4">
            <h2 className="text-2xl sm:text-3xl px-2 py-2">
              {movie.name} - {movie.lang}
            </h2>
            <div className="flex gap-4 px-4">
              <span>{movie.censor}</span>
              <span>{movie.duration}m</span>
              <div className="flex gap-2">
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
                              } text-green-100 hover:bg-orange-100 hover:text-white inline-block py-2`}
                          >
                            <div className="text-sm md:text-base font-semibold">
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
