import { randomPhotosURL } from "../constants";

const fetchRandomPhotosAsync = async (count) => {
  const url = new URL(randomPhotosURL);
  url.searchParams.append("count", count);

  const response = await fetch(url, { method: "GET" });
  const responseJSON = await response.json();
  const responseBody = JSON.parse(responseJSON).body;

  if (response.ok) {
    return responseBody;
  }

  throw new Error(responseBody);
};

export default fetchRandomPhotosAsync;
