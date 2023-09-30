import axios from "axios";

const API_KEY = "live_0x2KrOycvajqvVgZppPEFyH3fhUbWUGpPRJTbFjeHDmMZlDhaWhc9VpkFgqdOsAc";

axios.defaults.headers.common["x-api-key"] = API_KEY;

export const fatchBreeds = async () => {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fatchBreedById = async (catId) => {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${catId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
