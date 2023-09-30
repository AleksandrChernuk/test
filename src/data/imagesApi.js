import axios from "axios";

const API_KEY = "32068008-acb4b1bc1aee14e726f03befc";

export const fetchImages = async (query, page, perPage) => {
  try {
    const res = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
