import { Suspense } from 'react'
import SimpleSlider from "@/components/Slider";
import { getService, postService } from "@/sevices/service";
import { endpoints } from "@/endpoint/endoint";
import Card from "@/components/Card/Card";
import SwipeToSlide from "@/components/Slide Card/SlideCard";
import Loading from '../../loading';

export default async function Home(context: { params: { city: any; }; }) {
  const {city}= context.params
  const selectedCity = city ? city :"nellore"
  const payload={}
  const sliderRes = await postService(endpoints.slider, payload);
  const nowShowingRes = await getService(endpoints.nowShowing +`city=${selectedCity}&mdp=1`);
  const upComingRes = await getService(endpoints.upComing + `?city=${selectedCity}&version=3&site_id=6&channel=HTML5&child_site_id=370`);

  return (
    <div>
      <Suspense fallback={ <Loading />}>
      <div className="my-4 border-b">
        <SimpleSlider sliderData={sliderRes?.page} />
      </div>
      </Suspense>
      
      <Suspense fallback={ <Loading />}>
      <div className="my-4 mx-8 border-b">
        <h2 className="2xl:ml-28 my-8 text-xl font-bold border-l-8 border-orange-100 pl-2"> Now Showing </h2>
        <Card nowShowingData={nowShowingRes?.data} />
      </div>
      </Suspense>

      <Suspense fallback={ <Loading />}>
      <div className="my-4 mx-8">
        <h2 className="2xl:ml-28 my-8 text-xl font-bold border-l-8 border-orange-100 pl-2"> Up Coming </h2>
        <SwipeToSlide upComingData={upComingRes} />
      </div>
      </Suspense>
    </div>
  );
}
