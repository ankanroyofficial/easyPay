import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";
import { PermissionsAndroid } from "react-native";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
export const requestLocationPermission = async () => {
    try {

        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            , {
                'title': 'Location',
                'message': 'EasyPay App want to access your location',
                // buttonNeutral: "Ask Me Later",
                buttonNegative: "Allow",
                // buttonPositive: "OK"
            })

        const a = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // console.log("You can use the ACCESS_FINE_LOCATION")
            return "access";
            // locationOn();
            // return "true";
        } else {
            return "false";
        }



        // else if (granted == "denied") {
        //     // return "deniedpress";
        //     // console.log("denieddd/ddd",granted)
        //     return "false";
        // } else if (granted == "never_ask_again") {
        //     // Linking.openSettings();
        //     // return "never_assk_again";
        //     return "false";
        // } else {
        //     // Linking.openSettings()
        //     console.log("ACCESS_FINE_LOCATION permission denied");
        //     // return "denied";
        //     return "false";
        // }


    } catch (err) {
        console.log(err)
    }
}


const locationOn = () => {


    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
    }).then((data) => {
        // console.log("locationOn      > then 1 ", data)
        return "true";

        // The user has accepted to enable the location services
        // data can be :
        //  - "already-enabled" if the location services has been already enabled
        //  - "enabled" if user has clicked on OK button in the popup
    })
        .catch((err) => {
            // console.log("locationOn      > err 1 ", err)
            // navigation.navigate("Filter_Location_selectPage")

            return "nogps";

            // The user has not accepted to enable the location services or something went wrong during the process
            // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
            // codes :
            //  - ERR00 : The user has clicked on Cancel button in the popup
            //  - ERR01 : If the Settings change are unavailable
            //  - ERR02 : If the popup has failed to open
            //  - ERR03 : Internal error
        });
}





// import { Platform, PermissionsAndroid } from 'react-native';

// import Geolocation from 'react-native-geolocation-service';

// async function requestPermissions() {
//   if (Platform.OS === 'ios') {
//     Geolocation.requestAuthorization();
//     Geolocation.setRNConfiguration({
//       skipPermissionRequests: false,
//      authorizationLevel: 'whenInUse',
//    });
//   }

//   if (Platform.OS === 'android') {
//     await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     );
//   }
// }