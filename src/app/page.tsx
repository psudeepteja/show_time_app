import SimpleSlider from "@/components/Slider";
import { getService, postService } from "@/sevices/service";
import { endpoints } from "@/endpoint/endoint";
import Card from "@/components/Card/Card";
import SwipeToSlide from "@/components/Slide Card/SlideCard";

export default async function Home() {
  const sliderRes = await postService(endpoints.slider);
  const nowShowingRes = await getService(endpoints.nowShowing);
  const upComingRes = await getService(endpoints.upComing);

  return (
    <div>
      <div className="my-4">
        <SimpleSlider sliderData={sliderRes.page} />
      </div>
      <div className="my-4 mx-8">
        <h2 className="2xl:ml-28 my-8 text-xl font-bold "> Now Showing </h2>
        <Card nowShowingData={nowShowingRes.data} />
      </div>
      <div className="my-4 mx-16">
        <h2 className="2xl:ml-20 my-8 text-xl font-bold "> Up Coming </h2>
        <SwipeToSlide upComingData={upComingRes} />
      </div>
    </div>
  );
}
