import Cinema from '@/components/Cinema/page';
import { endpoints } from '@/endpoint/endoint';
import { getService } from '@/sevices/service';

interface Context {
  params: {
    city: any;
  };
}

export default async function Cinemas(context: Context) {
  const { city } = context.params
  const selectedCity = city ? city : "nellore"

  const cinemasRes = await getService(endpoints.cinemas + `city=${selectedCity}`);

  return (
    <div>
      <Cinema cinemasData={cinemasRes} />
    </div>
  )
}
