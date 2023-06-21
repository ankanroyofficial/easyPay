import { PermissionsAndroid, Platform } from "react-native";
import Toast from 'react-native-simple-toast';
export const androidCameraPermission = () => new Promise(async (resolve, reject) => {
    try {
        // console.log("-------------")
        if (Platform.OS === "android" && Platform.Version > 22) {
            // console.log(".............")
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            ]);
            console.log("granted response", granted);
            if (granted["android.permission.CAMERA"] !== 'granted' ||
                granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== "granted" ||
                granted['android.permission.READ_EXTERNAL_STORAGE'] !== "granted"
            ) {
                // console.log("++++++++++++++")
                // Toast.show("Don't have required permission.Please allow permission")
                Toast.show("Please allow camera permission")
                return resolve(false);
            }
            return resolve(true);
        }
        return resolve(true);
    } catch (error) {
        console.log(error)
        return resolve(false);
    }
});