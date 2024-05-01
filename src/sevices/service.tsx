import axios from "axios";

export  async function getService(url: string) {
  try {
    const res = await axios.get(url);
    return res?.data;
  } catch (error) {
    console.log(error)
  }
}

export  async function postService(url: string, payload) {
  try {
    const res = await axios.post(url, payload);
    return res?.data;
  } catch (error) {
    console.log(error)
  }
}

