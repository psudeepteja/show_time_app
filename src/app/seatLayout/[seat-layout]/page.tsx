import SeactSelection from "@/components/SeatSelection/SeactSelection";
import { endpoints } from "@/endpoint/endoint";
import { postService } from "@/sevices/service";

interface Context {
  searchParams: {
    cid: string;
    sid: string;
    pid: string;
    scrnfmt: string;
    mid: string;
  }
}

export default async function SeatLayout(context: Context) {
  const { cid, sid, pid, scrnfmt, mid } = context?.searchParams
  const payload = {
    "cinemaId": cid,
    "sessionId": sid,
    "providerId": pid,
    "screenOnTop": 0,
    "freeSeating": false,
    "screenFormat": scrnfmt,
    "moviecode": mid,
    "config": {
      "socialDistancing": 1
    }
  }
  const seatSelectionRes = await postService(endpoints.seatSelection, payload);

  return (
    <div>
      <SeactSelection seatSelectionData={seatSelectionRes} />
    </div>
  )
}

