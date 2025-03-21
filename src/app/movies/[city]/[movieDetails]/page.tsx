import { Suspense } from 'react'
import { endpoints } from "@/endpoint/endoint";
import { getService } from "@/sevices/service";
import MovieDetail from "@/components/Movie-Detail/MovieDetail"
import Loading from '@/app/loading';

interface Context {
  searchParams: {
    frmtid: any;
    date: any;
  };
  params: {
    city: string
  }
}

export default async function Movies(context: Context) {
  const { frmtid, date } = context?.searchParams
  const { city } = context?.params
  const movieCodeRes = await getService(endpoints.movieCode + `city=${city}&movieCode=${frmtid}&date=${date}&version=3&site_id=6&channel=web&child_site_id=370`);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <MovieDetail movieCodeData={movieCodeRes} context={context} />
      </Suspense>
    </div>
  );
}

