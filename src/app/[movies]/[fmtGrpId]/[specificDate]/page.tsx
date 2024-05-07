import {Suspense} from 'react'
import { endpoints } from "@/endpoint/endoint";
import { getService } from "@/sevices/service";
import MovieDetail from "@/components/Movie-Detail/MovieDetail"
import Loading from '@/app/loading';

export default async function Movies(context: { params: { fmtGrpId: string; specificDate: string }; }) {
  const { fmtGrpId, specificDate } = context.params
  const movieCodeRes = await getService(endpoints.movieCode + `${fmtGrpId}&date=${specificDate}&version=3&site_id=6&channel=web&child_site_id=370`);
  return (
    <div>
      <Suspense fallback={<Loading />}>
      <MovieDetail movieCodeData={movieCodeRes} />
      </Suspense>
    </div>
  );
}

