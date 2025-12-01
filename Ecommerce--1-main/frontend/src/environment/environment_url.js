import { dev } from "./environment_constant";

const baseUrl = dev;

const url = {
  auth: {
    register: baseUrl + "register",
    login: baseUrl + "login",
  },
  product: {
    getProducts: baseUrl + "api/products",
    getCategories: baseUrl + "api/categories",
  }
};
export { url };
