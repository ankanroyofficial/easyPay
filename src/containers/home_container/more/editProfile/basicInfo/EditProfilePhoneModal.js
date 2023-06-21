import { View, Text, TextInput, TouchableOpacity, Modal, Image, StyleSheet, ScrollView, Keyboard } from 'react-native'
import React, { Fragment, useContext, useRef, useState } from 'react'
import { Colors } from '../../../../../constants/colors'
import Normalize from '../../../../../helpers/Dimens';
import globalStyle_esyPay from '../../../../../constants/globalStyles/GlobalStyle_esyPay'
import Button from '../../../../../components/Button'
import Toast from 'react-native-simple-toast';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import strings from '../../../../../constants/lng/LocalizedStrings';
import images from '../../../../../constants/images';
import axios from 'axios';
import { axiosUrl, ImageLink } from '../../../../../constants/LinkPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import { myContext } from '../../../../../constants/ContextApi';
import { is_search } from '../../../../../constants/KeyWordSearch';
import { StatusBar } from 'react-native';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import { useNavigation } from '@react-navigation/native';
export default function EditProfilePhoneModal({ ispress, onpress, phone, setPhone, isGetOtp, setIsGetOtp, email }) {
    const [phoneIsFocused, setPhoneIsFocused] = useState(false);
    const navigation = useNavigation()

    const { all_country_code,
        pin1_EditProfile, setPin1_EditProfile,
        pin2_EditProfile, setPin2_EditProfile,
        pin3_EditProfile, setPin3_EditProfile,
        pin4_EditProfile, setPin4_EditProfile,
        phone_Code, setPhone_Code, signupPhoneNumer_details,
        isPhoneVerify, setIsPhoneVerify,
        isPhVerify, setIsPhVerify,
        prev_phone,
        setPrev_Phone,
        setPrev_phoneCode
    } = useContext(myContext)


    console.log(phone)


    const input1 = useRef();
    const input2 = useRef();
    const input3 = useRef();
    const input4 = useRef();

    // const [pin1_EditProfile, setPin1_EditProfile] = useState("")
    // const [pin2_EditProfile, setPin2_EditProfile] = useState("")
    // const [pin3_EditProfile, setPin3_EditProfile] = useState("")
    // const [pin4_EditProfile, setPin4_EditProfile] = useState("")

    const [phone_Code_temp, setPhone_Code_temp] = useState(phone_Code)

    const [is_category_modal, setIs_category_modal] = useState(false)
    const [search_phone_Code, setSearch_Phone_Code] = useState("")
    const check_phone_no = (val) => {
        return parseInt(val) == val
    }
    const onpressSave = () => {
        try {
            if (!check_phone_no(phone)) {
                Toast.show("Enter a valid phone number")
            } else {
                if (phone_Code == "") {
                    Toast.show("Select Phone Code")
                } else {
                    let max_digits = signupPhoneNumer_details.max_no_of_digitis;
                    let min_digits = signupPhoneNumer_details.min_no_of_digits;

                    // console.log(phone.length)
                    // console.log(min_digits)
                    // console.log(max_digits)

                    if (!(phone.length >= min_digits && phone.length <= max_digits)) {
                        if (min_digits != max_digits) {
                            Toast.show(`Enter minimum ${min_digits} digits and maximum ${max_digits} digits phone number`)
                        } else {
                            Toast.show(`Enter ${max_digits} digits phone number`)
                        }
                    } else {
                        sendToPhoneVerify()
                    }
                }
            }
        } catch (error) {
            console.log("onpressSave", error)
        }
    }
    const sendToPhoneVerify = async () => {
        try {
            let data = {
                "params": {
                    "email": email,
                    "phone": phone,
                    "country_code": phone_Code
                }
            }
            // console.log(data)
            let res = await axiosInstance.post(axiosUrl.URL + "send-get-phone-otp", data)
            // console.log(res.data)
            if (res.data.result) {
                // setIsPhoneVerify(false)
                // setIsPhVerify("N")
                let otp = (res.data.result.otp).toString()
                Toast.show(res.data.result.success.meaning)
                setPin1_EditProfile(otp[0])
                setPin2_EditProfile(otp[1])
                setPin3_EditProfile(otp[2])
                setPin4_EditProfile(otp[3])
                setIsGetOtp(true)
            } else {
                Toast.show(res.data.error.meaning)
            }
        } catch (error) {
            console.log("sendToPhoneVerify", error)
        }
    }
    const onpressVerify = async () => {
        try {
            if (pin1_EditProfile == "" || pin2_EditProfile == "" || pin3_EditProfile == "" || pin4_EditProfile == "") {
                Toast.show("Enter valid otp")
            } else {

                let a = await AsyncStorage.getItem("email")
                let data = {
                    "params": {
                        "email": a,
                        "phone": phone,
                        "country_code": phone_Code,
                        "code1": pin1_EditProfile,
                        "code2": pin2_EditProfile,
                        "code3": pin3_EditProfile,
                        "code4": pin4_EditProfile
                    }
                }
                // console.log(data)

                let res = await axios.post(axiosUrl.URL + "verify-phone-otp", data)


                // console.log(res.data)

                if (res.data.result) {
                    setIsPhoneVerify(true)
                    setIsPhVerify("Y")
                    setIsGetOtp(false)
                    setPrev_Phone(phone)
                    setPrev_phoneCode(phone_Code)
                    onpress()
                    Toast.show("Verified")
                } else {
                    Toast.show(res.data.error.meaning)
                }
            }

        } catch (error) {
            console.localization("onpressVerify", error)
        }
    }
    const resendButton = async () => {
        try {
            let lastDetails = await AsyncStorage.getItem("lastRegisterEmail")
            let a = JSON.parse(lastDetails)
            let data = {
                "params": {
                    "email": a.email,
                    "phone": phone,
                    "country_code": phone_Code
                }
            }

            let res = await axiosInstance.post(axiosUrl.URL + "resend-get-phone-otp", data)

            // console.log(res.data)

            if (res.data.result) {
                let otp = (res.data.result.otp).toString()
                Toast.show(res.data.result.success.meaning)
                setPin1_EditProfile(otp[0])
                setPin2_EditProfile(otp[1])
                setPin3_EditProfile(otp[2])
                setPin4_EditProfile(otp[3])
            } else {
                Toast.show(res.data.error.meaning)
            }
        } catch (error) {
            console.log("resendButton", error)
        }
    }
    return (
        <Modal
            visible={ispress}
            onRequestClose={() => {
                setPhone(prev_phone)
                setIsGetOtp(false)
                onpress()
            }}
            animationType="fade"
            transparent
        >
            <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", justifyContent: "center", alignItems: "center" }} >
                <View style={{ padding: Normalize(20), width: "85%", backgroundColor: Colors.white, elevation: 10, borderRadius: Normalize(8) }} >
                    {
                        isGetOtp ?
                            <Fragment>
                                <View style={{ alignItems: "center" }}>
                                    <View style={{ height: Normalize(70), width: Normalize(70) }} >
                                        <Image source={images.phOtp} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                    </View>
                                    <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(15), marginTop: Normalize(15) }]}>Verify Your Phone Number</Text>
                                    <Text style={[globalStyle_esyPay.detailsText, { fontSize: Normalize(13), marginVertical: Normalize(6) }]}>A verification code has been sent to</Text>
                                    <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.secondary, fontSize: Normalize(15) }]}>+{phone_Code} {phone}</Text>
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: Normalize(20) }} >
                                    <View style={style.smallinputbox}>
                                        <TextInput
                                            ref={input1}
                                            maxLength={1}
                                            value={pin1_EditProfile}
                                            underlineColorAndroid="#ffeee0"
                                            onChangeText={
                                                (e) => {
                                                    setPin1_EditProfile(e)
                                                    if (pin1_EditProfile != "") {
                                                        input1.current.focus()
                                                    } else {
                                                        input2.current.focus()
                                                    }
                                                }

                                            }
                                            keyboardType="decimal-pad"
                                            style={style.smalltextInput}

                                        />
                                    </View>
                                    <View style={style.smallinputbox}>
                                        <TextInput maxLength={1}
                                            ref={input2}
                                            value={pin2_EditProfile}
                                            underlineColorAndroid="#ffeee0"
                                            onChangeText={
                                                (e) => {
                                                    setPin2_EditProfile(e)
                                                    if (pin2_EditProfile != "") {
                                                        input1.current.focus()
                                                    } else {
                                                        input3.current.focus()
                                                    }
                                                }

                                            }
                                            keyboardType="decimal-pad"
                                            style={style.smalltextInput}

                                        />
                                    </View>
                                    <View style={style.smallinputbox}>
                                        <TextInput maxLength={1}
                                            value={pin3_EditProfile}
                                            underlineColorAndroid="#ffeee0"
                                            ref={input3}
                                            onChangeText={
                                                (e) => {
                                                    setPin3_EditProfile(e)
                                                    if (pin3_EditProfile != "") {
                                                        input2.current.focus()
                                                    } else {
                                                        input4.current.focus()
                                                    }
                                                }
                                            }
                                            keyboardType="decimal-pad"
                                            style={style.smalltextInput}

                                        />
                                    </View>
                                    <View style={style.smallinputbox}>
                                        <TextInput maxLength={1}
                                            ref={input4}
                                            value={pin4_EditProfile}
                                            underlineColorAndroid="#ffeee0"
                                            onChangeText={
                                                (e) => {
                                                    setPin4_EditProfile(e)
                                                    if (pin4_EditProfile != "") {
                                                        input3.current.focus()
                                                    }
                                                }
                                            }
                                            keyboardType="decimal-pad"
                                            style={style.smalltextInput}
                                        />
                                    </View>
                                </View>


                                <View style={{ alignItems: "center", marginBottom: Normalize(30) }}>

                                    <Text style={[globalStyle_esyPay.detailsText, { fontSize: Normalize(12), marginTop: Normalize(8), marginBottom: Normalize(4) }]}>Didn't receive a code?</Text>


                                    <TouchableOpacity
                                        onPress={resendButton}
                                        style={{ flexDirection: "row", }}>
                                        <MaterialCommunityIcons name={"reload"} color={Colors.secondary} size={Normalize(15)} />
                                        <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.secondary, fontSize: Normalize(13), paddingLeft: Normalize(4) }]}>Resend</Text>
                                    </TouchableOpacity>

                                </View>
                                <Button
                                    onPress={onpressVerify}
                                    name={"Verify & Proceed"}
                                />
                            </Fragment>
                            :
                            <Fragment>
                                <View style={{ alignItems: "center" }}>
                                    <FontAwesome name={"phone"} color={Colors.secondary} size={Normalize(47)} />
                                    <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(15) }]}>Add Phone Number</Text>
                                </View>
                                <View style={[globalstyles.textinput_onlyBox_Style, { marginVertical: Normalize(20) }]} >
                                    <TouchableOpacity
                                        onPress={() => {
                                            onpress()
                                            navigation.navigate("PhoneCodeSelectPage")
                                        }}

                                        style={{ height: "100%", paddingHorizontal: "0%", justifyContent: "center", alignItems: "center", borderRightColor: Colors.disable_textinput_border, borderRightWidth: Normalize(0.5), flexDirection: "row" }} >
                                        <Text style={{
                                            fontSize: Normalize(12),
                                            fontFamily: 'Lato-Regular',
                                            color: Colors.textinput_inner_text,
                                            paddingLeft: Normalize(7),
                                        }} >+ {phone_Code}</Text>
                                        <View style={{ marginHorizontal: Normalize(7) }} >
                                            <Entypo name="chevron-down" color={Colors.textinput_inner_text} size={Normalize(14)} />
                                        </View>
                                    </TouchableOpacity>
                                    <TextInput
                                        value={phone}
                                        keyboardType="phone-pad"
                                        autoCapitalize="none"
                                        maxLength={10}
                                        placeholderTextColor={Colors.textinput_inner_text}
                                        placeholder={strings.SIGNUPCREEN.MOBILEPLACEHOLDER}
                                        style={{
                                            fontSize: Normalize(12),
                                            fontFamily: 'Lato-Regular',
                                            color: Colors.textinput_inner_text,
                                            flex: 1,
                                            paddingHorizontal: Normalize(12),
                                            backgroundColor: phoneIsFocused ? Colors.white : Colors.disable_textinput_background,
                                            padding: 0
                                        }}
                                        onChangeText={(e) => {
                                            setPhone(e)
                                        }}
                                        onFocus={() => setPhoneIsFocused(true)}
                                        onBlur={() => setPhoneIsFocused(false)}
                                    />
                                </View>
                                <Button
                                    onPress={onpressSave}
                                    name={"Save"}
                                />
                            </Fragment>
                    }
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setPhone(prev_phone)
                        setIsGetOtp(false)
                        onpress()
                    }}
                    style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.white, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(12) }} >
                    <Entypo name="cross" color={Colors.textinput_inner_text} size={Normalize(35)} />
                </TouchableOpacity>
            </View>
        </Modal>
    )
}


const style = StyleSheet.create({
    smallinputbox: {
        height: Normalize(35),
        width: Normalize(35),
        backgroundColor: "#ffeee0",
        borderWidth: Normalize(1),
        borderRadius: Normalize(3),
        borderColor: Colors.lightGrey,
    },
    smalltextInput: {
        // flex: 1,
        height: "100%",
        width: "100%",
        fontSize: Normalize(15),
        textAlign: "center",
        color: Colors.primary,
        fontFamily: "Lato-Bold",
        padding: 0
    }
})