import ApiService from "../apiservice";

export function registerApi(formData) {
   return  ApiService.post("/api/users/register", formData)
   
}

export function loginApi(formData) {
   return  ApiService.post("/api/users/login", formData)

}
