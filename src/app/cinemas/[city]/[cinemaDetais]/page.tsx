import CinemaDetails from '@/components/CinemaDetails/CinemaDetails';
import { endpoints } from '@/endpoint/endoint';
import { getService } from '@/sevices/service';
import React from 'react'

interface Context {
  searchParams: {
    cinema: string;
    cinemaId: string;
    date: string
  };
}

export default async function Cinemas(context: any) {
  const { cinemaId, date } = context?.searchParams
  const cinemaDetailsRes = await getService(endpoints.cinema + `cinemaId=${cinemaId}&date=${date}`);

  return (
    <div >
      <CinemaDetails cinemaDetailsData={cinemaDetailsRes} context={context} />
    </div>
  )
}
