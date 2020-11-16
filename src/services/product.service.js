import axios from "axios";

axios.defaults.baseURL = "https://5f993a3050d84900163b845a.mockapi.io/eriks";

export const productService = { getProducts };

function getProducts() {
  return axios.get("/products/all").then((response) => {
    return response.data;
  });
}
