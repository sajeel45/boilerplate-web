import { APIurls } from "../constants.ts";
import apiService from "./index.ts";
import multipart from "./multipart.ts";

export const ApiRequests = {
  //user Authentication
  login: async (data) => await apiService.post(APIurls.auth + "/login", data,),
  logout: async (data) => await apiService.post(APIurls.auth + "/logout", data),
  register: async (data) => await apiService.post(APIurls.auth + "/register", data),
  authenticate: async (params) => await apiService.get(APIurls.auth + "/authenticate",{params}),
  refreshToken: async (data) => await apiService.post(APIurls.auth  + "/refresh-tokens", data),

  addBook: async (data) => await apiService.post(APIurls.book , data),
  getBooks: async (params) => await apiService.get(APIurls.book , { params }),
  deleteBook: async (id) => await apiService.delete(`${APIurls.book}/${id}`),
  updateBook: async (id, data) => await apiService.patch(`${APIurls.book}/${id}`, data),
  getBook: async (id) => await apiService.get(`${APIurls.book}/${id}`),

  //user Authentication
    
  
};
