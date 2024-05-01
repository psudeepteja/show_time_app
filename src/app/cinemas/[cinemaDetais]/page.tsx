// import { endpoints } from '@/endpoint/endoint';
// import { getService } from '@/sevices/service';
import React from 'react'

interface Context {
  searchParams: {
    cinemaId: string;
  };
}

export default async function CinemaDetails({ context }: { context: Context }) {
  // console.log("context",context)
  // const {cinemaId}=context?.searchParams
  // const cinemaRes = await getService(endpoints.cinema + `cinemaId=${cinemaId}`);

  return (
    <div className='flex justify-center items-center'>
      <h1 >Ohh! This page is currently not working. Please try again...</h1>
    </div>
  )
}
