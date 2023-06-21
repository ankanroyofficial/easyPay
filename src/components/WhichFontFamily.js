import { Platform } from "react-native";

export const fontfmliy = {
    regular: Platform.OS == "ios" ? "Calibri" : "Calibri Regular",
    bold: Platform.OS == "ios" ? "Lato-Bold":'Calibri Bold' 
}