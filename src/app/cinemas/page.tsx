import Cinema from '@/components/Cinema/page';
import { endpoints } from '@/endpoint/endoint';
import { getService } from '@/sevices/service';

export default async function Cinemas() {
    const cinemasRes = await getService(endpoints.cinemas);
    console.log("cinemasRes", cinemasRes)

  return (
    <div>
        <Cinema cinemasData={cinemasRes}/>
    </div>
  )
}
