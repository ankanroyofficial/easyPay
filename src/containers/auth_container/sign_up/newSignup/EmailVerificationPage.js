import { View, Text, SafeAreaView, TouchableOpacity, Platform, BackHandler, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Colors } from '../../../../constants/colors'
import Normalize from '../../../../helpers/Dimens';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay'
import Button from '../../../../components/Button'
import Toast from 'react-native-simple-toast';
import { CommonActions, useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'react-native';
import { myContext } from '../../../../constants/ContextApi';
import { axiosUrl } from '../../../../constants/LinkPage';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fontfmliy } from '../../../../components/WhichFontFamily';

const { height, width } = Dimensions.get("window")
export default function EmailVerificationPage(props) {
    const { fcmToken, setFcmToken, setSignupLocation } = useContext(myContext)
    const navigation = useNavigation()
    const [loader, setLoader] = useState(false)
    const { email } = props.route.params


    // const onpressNextButton = async () => {
    //     navigation.navigate("TakingDetails")
    // }

    const onpressNextButton = async () => {
        try {
            setLoader(true)

            let data = {
                "params": {
                    "email": email,
                    "verify_in_app": "true",
                    "firebase_reg_no": fcmToken !== "" ? fcmToken : "cpuu8oy2A3g-EqiwUcPG7a:APA91bFvUhBshgji__P1h_Z0UgKt15odWc0y1P7z33XVy6OVR1TmkyNVwKl1FVYuK4itkvdM6j5ehSe2WY_MMbdOZQhEoHYhMe3Q9CP38vKaCFowv1zqQMFfmpM_7wqxuyIKetkM4r_h",
                    "device_type": Platform.OS === "android" ? "android" : "iphone"
                }
            }

            let res = await axios.post(axiosUrl.URL + "save-next", data)
            // console.log(res.data)

            if (res.data.result) {
                setLoader(false)
                // Toast.show(res.data.result.meaning)
                AsyncStorage.setItem("last_login_from", "A")
                setSignupLocation({
                    name: '',
                    lat: '',
                    lng: '',
                })
                navigation.navigate("TakingDetails")
            } else {
                setLoader(false)
                Toast.show(res.data.error.meaning)
            }
            setLoader(false)
        } catch (error) {
            setLoader(false)
            console.log("onpressNextButton", error)
        }
    }
    const resendButton = async () => {
        try {

            let data = {
                "params": {
                    "email": email
                }
            }
            let res = await axios.post(axiosUrl.URL + "resend-otp-for-email", data)
            if (res.data.result) {
                Toast.show(res.data.result.meaning)
            } else {
                Toast.show(res.data.error.meaning)
            }
        } catch (error) {
            console.log("resendButton", error)
        }
    }


    const goToLoginRegisterPage_IdRemove = async () => {
        try {
            let lastDetails = await AsyncStorage.getItem('lastRegisterEmail');
            let a = JSON.parse(lastDetails);
            let data = {
                params: {
                    email: a.email,
                },
            };
            let res = await axios.post(
                axiosUrl.URL + 'close-registration-background',
                data,
            );
            // console.log(res.data);

            if (res.data.result) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [{ name: 'TakingEmail' }],
                    }),
                );
                await AsyncStorage.removeItem('last_login_from');
                await AsyncStorage.removeItem('lastRegisterEmail');
            }
        } catch (error) {
            console.log('close-registration-background', error);
        }
    };
    const onpressChangeEmail = async () => {
        goToLoginRegisterPage_IdRemove()
    }
    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true);
        return () => backHandler.remove();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
            <View style={{ flex: 1, paddingHorizontal: Normalize(15), alignItems: "center", paddingTop: width * 0.28, }} >
                <MaterialCommunityIcons name={"email-lock"} color={Colors.secondary} size={Normalize(75)} />

                <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.greyText, marginTop: Normalize(7), fontSize: Normalize(14) }]} >Verify Your Email</Text>

                <Text style={[globalStyle_esyPay.detailsText, { fontSize: Normalize(13), marginVertical: Normalize(8) }]}>An email verification link has been sent to:</Text>
                <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.secondary, fontSize: Normalize(13) }]}>{email}</Text>


                <View style={{ flex: 1 }} />

                <View style={{ alignItems: "center", marginBottom: Normalize(30) }}>

                    <Text style={[globalStyle_esyPay.detailsText, { fontSize: Normalize(12), marginTop: Normalize(8), marginBottom: Normalize(4) }]}>Didn't receive a code?</Text>


                    <TouchableOpacity
                        onPress={resendButton}
                        style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialCommunityIcons name={"reload"} color={Colors.secondary} size={Normalize(15)} />
                        <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.secondary, fontSize: Normalize(14), paddingLeft: Normalize(4) }]}>Resend</Text>
                    </TouchableOpacity>
                    <Text style={[globalStyle_esyPay.detailsText, { fontSize: Normalize(12), marginTop: Normalize(8), textAlign: "center" }]}>Can't find it? Check yout junk/spam folder{"\n"}If you use gmail,check your promotions section</Text>
                </View>



            </View>
            <Button
                disabled={loader}
                // onPress={() => navigation.navigate("TakingDetails")}
                onPress={onpressNextButton}
                name="Next"
                style={{ marginHorizontal: Normalize(15) }}
            />
            <TouchableOpacity onPress={onpressChangeEmail}>
                <Text style={{ color: Colors.greyText, fontSize: Normalize(13), textAlign: "center", paddingTop: Normalize(10), paddingBottom: Normalize(15), fontFamily: fontfmliy.regular }}>Change email address</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}