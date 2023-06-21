import { View, Text, SafeAreaView, TouchableOpacity, BackHandler } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Colors } from '../../../../constants/colors'
import Normalize from '../../../../helpers/Dimens';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay'
import Button from '../../../../components/Button'
import Header_Transparent from '../../../../components/Header_Transparent'
import { CommonActions, useNavigation } from '@react-navigation/native'
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosUrl } from '../../../../constants/LinkPage';
import axios from 'axios';
import { myContext } from '../../../../constants/ContextApi';
export default function AfterSignUpThreePointPage() {
    const navigation = useNavigation()
    const { setToken,setUserId } = useContext(myContext)
    const [whichPoint, setWhichPoint] = useState("1")

    const threePoint = [
        {
            id: 1,
            title: "Getting Help",
            subTitle: "I want to post tasks and find help"
        },
        {
            id: 2,
            title: "Making Money",
            subTitle: "I want to help people,earn money and do flexible tasks"
        },
        {
            id: 3,
            title: "Both",
            subTitle: "I want to do everything find help and earn money on EazyPay"
        }
    ]
    const onpressSubmitBUtton = async () => {
        try {
            let lastDetails = await AsyncStorage.getItem("lastRegisterEmail")
            let a = JSON.parse(lastDetails)
            if (whichPoint == "0") {
                Toast.show("Select any one")
            } else {
                let data = {
                    "params": {
                        "1": whichPoint == 1 ? "true" : "false",
                        "2": whichPoint == 2 ? "true" : "false",
                        "3": whichPoint == 3 ? "true" : "false",
                        "email": a.email
                    }
                }

                let res = await axios.post(axiosUrl.URL + "up1", data)
                // console.log(res.data)
                if (res.data.result) {
                    Toast.show(res.data.result.meaning)
                    await AsyncStorage.setItem('token', res.data.result.token);
                    await AsyncStorage.setItem('slug', res.data.result.user.slug);
                    await AsyncStorage.setItem('email', a.email);
                    await AsyncStorage.setItem('password', a.password);
                    let login_details = { "email": a.email, "password": a.password };
                    let to_stringify = JSON.stringify(login_details)
                    await AsyncStorage.setItem('normal_login_details', to_stringify);
                    await AsyncStorage.setItem('userid', (res.data.result.user.id).toString());
                    setUserId ((res.data.result.user.id).toString());
                    await AsyncStorage.setItem('application', "login");
                    // await AsyncStorage.setItem("last_login_from", "A")
                    if (whichPoint == 2 || whichPoint == 3) {
                        await AsyncStorage.setItem("entryNotifyModal", "true")
                    }
                    setToken(res.data.result.token)
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [{ name: "Home" }]
                        }));
                    await AsyncStorage.removeItem("signupFname")
                    await AsyncStorage.removeItem("signupLname")
                    await AsyncStorage.removeItem("signupAddress")
                    await AsyncStorage.removeItem("signupPhoneNo")
                    await AsyncStorage.removeItem("signupPhoneCode")
                    await AsyncStorage.removeItem("signupPhoneNumer_details")
                    await AsyncStorage.removeItem("isSignUpPhVerified")
                    await AsyncStorage.removeItem("lastRegisterEmail")

                } else {
                    Toast.show(res.data.error.meaning)
                }
            }
        } catch (error) {
            console.log("onpressSubmitBUtton", error)
        }
    }
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);
    const handleBackButtonClick = () => {
        navigation.navigate("TakingDetails");
        return true;
    }









    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={{ flex: 1, paddingHorizontal: Normalize(15) }} >
                <Header_Transparent
                    iswhitebackground={true}
                    backFunc={() => navigation.navigate("TakingDetails")}
                />




                <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.greyText, marginTop: Normalize(10) }]} >What are you more</Text>
                <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.greyText, marginTop: Normalize(4) }]} >interested in?</Text>



                <Text style={[globalStyle_esyPay.detailsText, { fontSize: Normalize(13), color: Colors.greyText, marginTop: Normalize(18) }]} >What you choose doesn't limit you on EazyPay</Text>


                <View style={{ marginTop: Normalize(30) }} >


                    {threePoint.map((item, index) => (

                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { setWhichPoint(item.id) }}
                            key={index} style={{ flexDirection: "row", borderBottomWidth: 1, borderBottomColor: Colors.textinput_bottomBorder, marginBottom: (15) }} >

                            <View style={{ paddingHorizontal: Normalize(6) }} >
                                <View style={{ height: Normalize(15), width: Normalize(15), borderRadius: Normalize(15) / 2, borderWidth: 1, borderColor: whichPoint == item.id ? Colors.secondary : Colors.grey, justifyContent: "center", alignItems: "center" }} >
                                    {
                                        whichPoint == item.id &&
                                        <View style={{ height: Normalize(9), width: Normalize(9), borderRadius: Normalize(9) / 2, backgroundColor: Colors.secondary }} />
                                    }
                                </View>
                            </View>
                            <View style={{ flex: 1, paddingLeft: Normalize(5) }} >
                                <Text style={{ color: whichPoint == item.id ? Colors.secondary : Colors.greyText, fontSize: Normalize(13), fontFamily: "AvenirNextLTPro-Demi" }} >{item.title}</Text>
                                <Text style={[globalStyle_esyPay.detailsText, { marginTop: Normalize(4), marginBottom: (15) }]} >{item.subTitle}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                    }


                </View>

                <View style={{ flex: 1 }} />



                <Button
                    // onPress={()=>{navigation.navigate("AfterSignUpThreePointPage")}}
                    onPress={onpressSubmitBUtton}
                    name="Submit"
                    style={{ marginVertical: Normalize(25) }}
                />
            </View>
        </SafeAreaView>
    )
}