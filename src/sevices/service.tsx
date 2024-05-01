import axios from "axios";
interface Payload { cinemaId?: string; sessionId?: string; providerId?: string; screenOnTop?: number; freeSeating?: boolean; screenFormat?: string; moviecode?: string; config?: { socialDistancing: number; }; }
export async function getService(url: string) {
  try {
    const res = await axios.get(url);
    return res?.data;
  } catch (error) {
    console.log(error)
  }
}

export async function postService(url: string, payload: Payload) {
  try {
    const res = await axios.post(url, payload);
    return res?.data;
  } catch (error) {
    console.log(error)
  }
}

