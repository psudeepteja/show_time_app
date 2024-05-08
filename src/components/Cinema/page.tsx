"use client"
import React from 'react';
import { useParams, useRouter } from "next/navigation";
import { CurrentDate } from '@/utilits';
import Image from 'next/image';

interface CinemaData {
  data: {
    cinemas: {
      id: string;
      name: string;
      cinemaLogoUrl: string;
    }[];
  };
}

interface Props {
  cinemasData: CinemaData;
}

export default function Cinema({ cinemasData }: Props) {
  const { cinemas } = cinemasData?.data;
  const router = useRouter();
  const params = useParams()
  const {city} = params
  const date = CurrentDate()

  const handleClick = (cinema: { id: string; name: string; cinemaLogoUrl: string }) => {
    const { name, id } = cinema;
    router.push(`/cinemas/${city}/c?cinema=${name}&cinemaId=${id}&date=${date}`);
  };

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 m-4 w-full justify-center items-center w-full p-4'>
        {cinemas && cinemas?.map((cinema) => (
          <div
            key={cinema.id}
            className="flex gap-4 justify-start items-center border bg-white shadow-md rounded-md overflow-hidden cursor-pointer text-sm md:text-base"
            onClick={() => handleClick(cinema)}
          >
            <Image src={cinema.cinemaLogoUrl} alt={cinema.name} className='w-24	' width={600} height={0} />
            <div className='p-2'>
              <div className='m-2'>{cinema.name}</div>
              <button className='m-2 p-2 text-sm text-white rounded-lg bg-orange-100 '>View Shows</button>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  );
}
