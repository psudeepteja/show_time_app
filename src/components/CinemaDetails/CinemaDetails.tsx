"use client"
import { convertToIST, formatDate } from '@/utilits';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface Session {
  fid: string;
  cid: string;
  sid: string;
  mid: string;
  pid: string;
  scrnFmt: string;
  avail: number;
  showTime: string;
  audi: string;
}

interface CinemaDetailsData {
  data?: {
    sessionDates?: string[];
    meta?: {
      movies?: {
        id: string;
        imgPath: string;
        name: string;
        censor: string;
        scrnFmt: string;
        lang: string;
      }[];
    };
    pageData?: {
      sessions: Session[];
    };
  };
  meta?: {
    cinema:{
      label: string
      address:string
    },
    movies?: {
      id: string;
      imgPath: string;
      name: string;
      censor: string;
      scrnFmt: string;
      lang: string;
    }[];
  };
  pageData?: {
    sessions: Session[];
  };
}

interface Context {
  searchParams: {
    cinema: string;
    cinemaId: string;
    date: string;
  };
}

interface Props {
  cinemaDetailsData: CinemaDetailsData;
  context: Context;
}

export default function CinemaDetails({ cinemaDetailsData, context }: Props) {
  const { cinema, cinemaId, date } = context.searchParams;
  console.log("cinemaDetailsData++", cinemaDetailsData)
  const [selectDate, setSelectDate] = useState<string>(date);
  const router = useRouter();

  const handleDateClick = (dateString: string) => {
    router.replace(`/cinemas/nellore/c?cinema=${cinema}&cinemaId=${cinemaId}&date=${dateString}`);
    setSelectDate(dateString);
  };

  const handleShowClick = (session: Session) => {
    console.log("session", session);
    const { fid, cid, sid, mid, pid, scrnFmt } = session;
    const ffid = fid.toLowerCase();
    const mmid = mid.toLowerCase();
    router.push(`/seatLayout/${ffid}.json?cid=${cid}&sid=${sid}&mid=${mmid}&pid=${pid}&scrnfmt=${scrnFmt}&freeseating=false&fromsessions=true&cityname=nellore&frmtid=${ffid}`);
  };

  return (
    <div className='mx-4 lg:mx-20'>
      <div className='py-8 border-b'>
            <p className='text-lg lg:text-3xl font-bold'>{cinemaDetailsData?.meta?.cinema.label}</p>
            <p className='text-xs lg:text-base'>{cinemaDetailsData?.meta?.cinema.address}</p>
      </div>
      <div className="flex gap-4 overflow-x-auto">
        {cinemaDetailsData?.data?.sessionDates?.map((dateString, idx) => (
          <div
            key={idx}
            className={`border rounded-lg text-center p-2 my-4 cursor-pointer ${selectDate === dateString ? "bg-orange-100 text-white" : ""
              }`}
            onClick={() => handleDateClick(dateString)}
          >
            {formatDate(dateString)}
          </div>
        ))}
      </div>
      <div >
        {cinemaDetailsData?.meta?.movies?.map((movie) => (
          <div key={movie.id} className='grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 py-8 border-t'>
            <div className='grid grid-cols-3 gap-2'>
              <div>
                <img src={movie.imgPath} alt={movie.name} className='w-24	' />
              </div>
              <div className='col-span-2'>
                <h3 className='font-lg font-semibold'> {movie.name}</h3>
                <div className='flex gap-2 text-sm'>
                  <span>{movie.censor}</span>
                  <span >{movie.scrnFmt}</span>
                  <span>{movie.lang}</span>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:col-span-2'>
              {cinemaDetailsData?.pageData?.sessions
                .sort((a, b) => new Date(a.showTime).getTime() - new Date(b.showTime).getTime())
                .map((session, idx) => (
                  <React.Fragment key={idx} >
                    {movie?.id === session?.mid && (
                      <div onClick={() => { handleShowClick(session) }}>
                        <div className={`w-full text-center  border rounded-lg ${session.avail === 0 ? "text-gray-500" : session.avail > 50 ? "text-green-100" : "text-red-600"} text-green-100 hover:bg-orange-100 hover:text-white inline-block py-2 cursor-pointer`}>
                          <p className='text-sm md:text-base font-semibold'>{convertToIST(session.showTime)}</p>
                          <p className='text-xs'>{session.audi}</p>
                        </div>
                        <p className="text-xs text-center mt-2">{session.avail} Available</p>
                      </div>
                    )}
                  </React.Fragment>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
