import ApiService from "../apiservice";
import { getToken } from "../authservice";

export function registerApi(formData) {
   return  ApiService.post("/api/users/register", formData)
   
}

export function loginApi(formData) {
   return  ApiService.post("/api/users/login", formData)

}


export function logoutApi() {
   return ApiService.get("/api/users/logout", {
       headers: {
           'Authorization': `Bearer ${getToken()}`
       }
   })
}