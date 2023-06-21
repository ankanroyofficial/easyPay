import axios from "axios"
import { axiosUrl } from "./LinkPage"
import AsyncStorage from "@react-native-async-storage/async-storage"


let headers = {}
// let headers = {
//     // Authorization: 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjgsImlzcyI6Imh0dHBzOi8vaXJhbnRhc2tlci5jb20vZGV2L2FwaS9sb2dpbiIsImlhdCI6MTY0ODE4NTg1NSwiZXhwIjoyNDM2NTg1ODU1LCJuYmYiOjE2NDgxODU4NTUsImp0aSI6IlBQRDF6NER0aGRscU9pSW8ifQ.S7emit5sRsqowBQjniqv-WZNVzb7fo-czw2R9Xze42E",
//     'X-localization': "fa"
// }
const baseURL = axiosUrl.URL
// headers.Authorization='Bearer ' +"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjgsImlzcyI6Imh0dHBzOi8vaXJhbnRhc2tlci5jb20vZGV2L2FwaS9sb2dpbiIsImlhdCI6MTY0ODE4NTg1NSwiZXhwIjoyNDM2NTg1ODU1LCJuYmYiOjE2NDgxODU4NTUsImp0aSI6IlBQRDF6NER0aGRscU9pSW8ifQ.S7emit5sRsqowBQjniqv-WZNVzb7fo-czw2R9Xze42E"


const axiosInstance = axios.create({
    baseURL: baseURL,
    headers
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token")
        const lang = await AsyncStorage.getItem('language')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
            config.headers["X-localization"] = (lang == '"pr"') ? "fa" : "en"
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default axiosInstance;