import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import {
    View, Text, Modal, ScrollView, Image, TouchableOpacity, TextInput,
    ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView
} from 'react-native'
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Toast from 'react-native-simple-toast';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import { useNavigation } from "@react-navigation/native"
import moment from 'moment';
import Pusher from 'pusher-js';
import strings from '../../../../constants/lng/LocalizedStrings';
import { myContext } from '../../../../constants/ContextApi';
import Button from "../../../../components/Button"
import { numberCheck, numberWithCommas } from '../../../../constants/NumberWithComma';
import pusherConfig from '../../../../../pusher.json';
import { axiosUrl } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import LoaderPage from '../../../../components/LoaderPage';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../../../../components/Header';




function MakingMoneyModal(props) {

    // console.log(props)

    const { taskSlugname, taskBudget } = props.route.params

    const taskbudgetString = (val) => {
        var a = val.toString()
        if (a < 5) {
            var b = 5
            var c = b.toString()
            return c
        } else {
            return a
        }
    }
    const navigation = useNavigation()
    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
    const { token, setToken,
        allVerified, setAllVerified,
        socketId, setSocketId,
        phone_number, setPhone_numbe,
        email_Address, setEmail_Address
    } = useContext(myContext);
    const [slugName, setSlugName] = useState("")
    const [profile_Picture, setProfile_Picture] = useState(false)
    const [address, setAddress] = useState(false)
    const [date_of_birth, setDate_of_birth] = useState({ isActive: false, activeTitle: "" })
    const [uploadDocument, setUploadDocument] = useState({ isActive: false, activeTitle: "" })
    const [submitButtonLoader, setSubmitButtonLoader] = useState(false)
    const [isamountfocus, setIsamountfocus] = useState(false)
    const [isaboutfocus, setIsaboutfocus] = useState(false)
    const [loader, setLoader] = useState(false)
    const [description, setDescription] = useState("")
    const [profileStatus, setProfileStatus] = useState("")
    const [amount, setAmount] = useState(taskbudgetString(taskBudget))
    const [is_Document_rejected, setIs_Document_rejected] = useState(false)
    const pageDetails = [
        {
            id: 0,
            title: "Profile Picture",
            BoxVerifiedTitle: strings.MAKEANOFFER.PROFILEPHOTOSET,
            BoxUnverifiedTitle: strings.MAKEANOFFER.UPLOADPHOTO,
            isActive: profile_Picture,
            onPress: () => onPressProfile_Picture(),
        },
        {
            id: 1,
            title: "Address",
            BoxVerifiedTitle: strings.MAKEANOFFER.ADDRESSADDED,
            BoxUnverifiedTitle: strings.MAKEANOFFER.ENTERYOURADDRESS,
            isActive: address,
            onPress: () => onPressAddress(),
        },
        {
            id: 2,
            title: "Date of Birth",
            BoxVerifiedTitle: date_of_birth.activeTitle,
            BoxUnverifiedTitle: strings.MAKEANOFFER.ENTERYOURDOB,
            isActive: date_of_birth.isActive,
            onPress: () => onPressDate_of_birth(),
        },
        {
            id: 3,
            title: "Mobile Number",
            BoxVerifiedTitle: phone_number.activeTitle,
            BoxUnverifiedTitle: strings.MAKEANOFFER.VERIFYYOURPHONENUMBER,
            isActive: phone_number.isActive,
            onPress: () => onPressPhone_number(),
        },
        {
            id: 4,
            title: "Email Address",
            BoxVerifiedTitle: email_Address.activeTitle,
            BoxUnverifiedTitle: strings.MAKEANOFFER.VERIFYYOUREMAILADDRESS,
            isActive: email_Address.isActive,
            onPress: () => onPressEmail_Address(),
        },
        {
            id: 5,
            title: "Document",
            BoxVerifiedTitle: uploadDocument.activeTitle,
            BoxUnverifiedTitle: "Upload document",
            isActive: uploadDocument.isActive,
            onPress: () => onPressUpload_Document(),
        },
    ]
    const getTokon = async () => {
        try {
            let slug = await AsyncStorage.getItem("slug");
            setSlugName(slug)
        } catch (error) {
            console.log(error)
        }
    }
    const get_Document_details = async () => {
        try {
            let isReject = false
            const res = await axiosInstance.post("viewUploadDocuments")
            // console.log(res.data.result.user_to_documents)

            if ((res.data.result.user_to_documents).length == 2) {
                (res.data.result.user_to_documents).map((item) => {
                    if (item.is_verify == "N") {
                        isReject = true
                    }
                })
            }
            setIs_Document_rejected(isReject)
            // console.log("isReject", isReject)

        } catch (error) {
            console.log("get_Document_details", error)
        }
    }

    // console.log("is_Document_rejected", is_Document_rejected)

    useEffect(() => {
        get_Document_details()
        getTokon()
    }, []);
    const verifyData = async () => {
        try {
            setLoader(true)
            var slug = await AsyncStorage.getItem("slug");
            const data = await axios.post(`${axiosUrl.URL}public-profile`, {
                "jsonrpc": "2.0",
                "params": {
                    "slug": slug
                }
            })
            // console.log(data.data.result.user_to_documents)
            if (data.data.result) {
                const res = data.data.result.user
                // console.log(res)
                setProfileStatus(res.status)
                if (res.profile_picture != null) {
                    setProfile_Picture(true)
                }
                res.location != null && setAddress(true)
                if (res.date_of_birth != null) {
                    const a = moment(res.date_of_birth, "YYYY-MM-DD").format("Do MMMM YYYY")
                    setDate_of_birth({ isActive: true, activeTitle: a })
                }
                if (res.phone !== null) {
                    // console.log(res.phone)
                    // console.log(res.is_phone_verified)
                    if (res.is_phone_verified != "N") {                      
                            setPhone_numbe({ isActive: true, activeTitle: res.phone })
                    } else {
                            setPhone_numbe({ isActive: false, activeTitle: res.phone })
                    }
                } else {
                    setPhone_numbe({ isActive: false, activeTitle: "" })
                }
                if (res.is_email_verified != "N") {
                    setEmail_Address({ isActive: true, activeTitle: res.email })
                } else {
                    setEmail_Address({ isActive: false, activeTitle: res.email })
                }

                // console.log(">>>>>>>>", res.is_verify_document)

                if (res.is_verify_document == "N") {
                    setUploadDocument({ isActive: false, activeTitle: "Upload document" })
                } else {
                    setUploadDocument({ isActive: true, activeTitle: whichDocument(data.data.result.user_to_documents) })
                }
                if (res.profile_picture != null && res.location != null && res.date_of_birth != null && res.is_phone_verified != "N" && res.is_email_verified != "N" && res.is_verify_document != "N") {
                    setAllVerified(true)
                } else {
                    // alert("Document Status:" + res.is_verify_document + "\n" + "Other Details" + JSON.stringify(res))
                    setAllVerified(false)
                }
            }
            setLoader(false)
        } catch (error) {
            setLoader(false)
            console.log("verifyData_Make", error)
        }
    }
    const whichDocument = (val) => {
        if (val.length == 0) {
            return "Upload Document"
        } else {
            return document_WhichType(val[0].file_type) + " " + "uploaded"
        }
    }
    const document_WhichType = (val) => {
        switch (val) {
            case "1": return "Passport";
            case "2": return "Driving Licence";
            case "3": return "National Registration Identity Card (NRIC)";
            case "4": return "Passport";
            case "5": return "Driving Licence";
            case "6": return "National Registration Identity Card (NRIC)";
            default: return "error";
        }
    }
    useEffect(() => {
        verifyData()
        const willFocusSubscription = navigation.addListener('focus', () => {
            verifyData()
        });
        return willFocusSubscription;
    }, [slugName]);

    const onPressProfile_Picture = async () => {
        navigation.navigate("BasicInfo_intro")
    }
    const onPressBank_account = async () => {
        console.log("bank_account")
    }
    const onPressAddress = async () => {
        navigation.navigate("BasicInfo_intro")

    }
    const onPressDate_of_birth = async () => {
        navigation.navigate("BasicInfo_intro")

    }
    const onPressPhone_number = async (val) => {
        try {

            if (phone_number.activeTitle === "") {
                navigation.navigate("BasicInfo_intro")
            } else {

                const res = await axiosInstance.post("get-phone-otp")
                if (res.data.result.error) {
                    Toast.show(res.data.result.error.meaning)
                } else {
                    const otp = res.data.result.otp
                    Toast.show(res.data.result.success.meaning)
                    navigation.navigate("PhoneVerifyPage", { otp: otp, phoneNumber: phone_number.activeTitle })
                }
            }
        } catch (error) {
            // setLoader(false)
            console.log(error)
        }
    }
    const onPressEmail_Address = async () => {
        try {
            const res = await axiosInstance.post("get-email-otp")
            if (res.data.result.error) {
                Toast.show(res.data.result.error.meaning)
            } else {
                const otp = res.data.result.otp
                Toast.show(res.data.result.success.meaning)
                navigation.navigate("EmailVerifyPage", { otp: otp, email: email_Address.activeTitle })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const onPressUpload_Document = async () => {
        navigation.navigate('DocumentUpload')
    }
    const onPressPayping_identity = async () => {
        console.log("payping_identity")
    }
    const addtext_uploadOrverify = (val) => {
        switch (val) {
            case "Profile Picture": return `${val} not uploaded`;
            case "Address": return `${val} not updated`;
            case "Date of Birth": return `${val} not updated`;
            case "Mobile Number": return `${val} not verified`;
            case "Email Address": return `${val} not verified`;
            case "Document": return `${val} ${whichStatus(profileStatus)}`;
        }
    }
    const whichStatus = (val) => {
        switch (val) {
            case "A": return "Active"
            case "I": return "Inactive"
            case "D": return "Deleted"
            case "U": return "unverified"
            case "Approved": return "Approved"
            case "R": return "Rejected"
            case "C": return "Cancelled"
            case "W": return "Awaiting for Approval"
        }
    }
    const whichArenotupdated = (val) => {
        var a = []
        val.map((item, index) => {
            if (item.isActive == false) {
                a.push(item.title)
            }
        })
        return a
    }
    const submitButton = async () => {
        try {
            var finalAmount = ""
            var amountInteger = parseInt(amount)
            finalAmount = amount

            if (amount.length != 0) {
                if (numberCheck(finalAmount) === true) {
                    if (amountInteger < 5) {
                        Toast.show(strings.MAKEANOFFER.MINIMUMBUDGET_GURUTASKER)
                    } else {
                        if (amountInteger > 100000) {
                            Toast.show(strings.MAKEANOFFER.LESSTHAN500000000)
                        } else {
                            if (description.length == 0 || description.trim() == "") {
                                Toast.show(strings.MAKEANOFFER.ENTERDESCRIPTION)
                            } else {
                                setSubmitButtonLoader(true)
                                // console.log("Make an offer", socketId)
                                var d = description.trim()
                                const data = {
                                    "jsonrpc": "2.0",
                                    "params": {
                                        "slug": taskSlugname,
                                        "amount": amountInteger,
                                        "description": d,
                                        "socket_id": socketId == "" ? "7533.23472117" : socketId
                                    }
                                }
                                const res = await axiosInstance.post("make-an-offer", data)
                                // console.log(res.data)
                                if (res.data.error) {
                                    if (res.data.error.message) {

                                        if (res.data.error.message.meaning) {
                                            Toast.show(res.data.error.message.meaning)
                                        } else {
                                            // Toast.show(res.data.error.meaning)
                                            Toast.showWithGravity(res.data.error.meaning, Toast.LONG, Toast.BOTTOM)
                                        }
                                        setSubmitButtonLoader(false)
                                    } else {
                                        Toast.show(res.data.error.socket_id[0])
                                        setSubmitButtonLoader(false)
                                    }
                                } else {
                                    Toast.show(strings.MAKEANOFFER.MAKEANOFFERDONE)
                                    // console.log(res.data)
                                    setAmount("")
                                    setDescription("")
                                    setSubmitButtonLoader(false)
                                }
                            }
                        }
                    }
                } else {
                    Toast.show(strings.MAKEANOFFER.VALIDNUMBER)
                }
            } else {
                Toast.show(strings.MAKEANOFFER.ENTERAMOUNT)
            }
        } catch (error) {
            console.log("submitButton_Make", error)
        }
    }
    const getSocketId = () => {
        const pusher = new Pusher(pusherConfig.key, pusherConfig);
        pusher.connection.bind("connected", () => {
            var socketId = pusher.connection.socket_id;
            setSocketId(socketId)
        });
    }
    useEffect(() => {
        getSocketId()
    }, [])
    return (

        <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
            <KeyboardAvoidingView
                behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ flex: 1, backgroundColor: Colors.white }}>

                <Header
                    name={strings.MAKEANOFFER.MAKEANOFFER}
                    back
                />
                <View style={{ flex: 1 }} >

                    {allVerified ?
                        <View style={{ flex: 1,backgroundColor:Colors.grayf8 }} >
                            <View style={{flex:1, backgroundColor: Colors.red_old, }} >

                                <View style={{}} >
                                    <View style={{ borderBottomColor: "#E8E8E8", borderBottomWidth: 1, }} >
                                        <View style={{ paddingBottom: Normalize(10), marginHorizontal: Normalize(15) }}>
                                            <Text style={globalstyles.textinput_Header_Style}  >{strings.MAKEANOFFER.YOUROFFERAMOUNT}</Text>
                                            <View style={[globalstyles.textinput_onlyBox_Style, {
                                                backgroundColor: isamountfocus ? Colors.white : Colors.disable_textinput_background,
                                                borderColor: isamountfocus ? Colors.primary : Colors.disable_textinput_border,
                                            }]} >
                                                <View style={{ height: Normalize(41), width: Normalize(40), justifyContent: "center", alignItems: "center", borderRightColor: isamountfocus ? Colors.primary : Colors.disable_textinput_border, borderRightWidth: 1 }} >
                                                    <Text style={globalstyles.currency_font_bold} >$</Text>
                                                </View>
                                                <View style={{ flex: 1 }} >
                                                    <TextInput
                                                        placeholder={strings.MAKEANOFFER.ENTERAMOUNTTEXTINPUT}
                                                        value={amount}
                                                        maxLength={10}
                                                        keyboardType="number-pad"
                                                        onChangeText={(e) => setAmount(e)}
                                                        style={globalstyles.textinput_onlyText_Style}
                                                        onFocus={() => setIsamountfocus(true)}
                                                        onBlur={() => setIsamountfocus(false)}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: "#fafbfd", paddingVertical: "1%", padding: Normalize(8), borderBottomWidth: 1, borderBottomColor: "#E8E8E8" }} >
                                        <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center" }} >

                                            <View style={{ height: Normalize(27), width: Normalize(18), marginHorizontal: "2%" }} >
                                                <Image source={images.bulb} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                            </View>
                                            <Text style={{
                                                fontSize: Normalize(14),
                                                fontFamily: 'Outfit-Medium',
                                                color: Colors.greyText,
                                                textAlign: language == "en" ? "left" : "right"
                                            }} >{strings.MAKEANOFFER.HOWDOTIERSANDFEESWORK}</Text>
                                        </View>
                                        <Text style={{
                                            fontSize: Normalize(11),
                                            fontFamily: 'Outfit-Regular',
                                            color: Colors.greyText,
                                            paddingVertical: "2%",
                                            lineHeight: Normalize(15),
                                            textAlign: language == "en" ? "left" : "right"
                                        }} >
                                            There are four tiers - starting <Text style={{ fontFamily: 'roboto-medium', color: Colors.primary, }} >Bronze</Text>, advance to <Text style={{ fontFamily: 'roboto-medium', color: Colors.primary, }} >Silver</Text>, <Text style={{ fontFamily: 'roboto-medium', color: Colors.primary, }} >Gold</Text>, and ultimately <Text style={{ fontFamily: 'roboto-medium', color: Colors.primary, }} >Platinum</Text>. The higher the tier, the lower the service fee.
                                        </Text>
                                        <Text
                                            onPress={() => {
                                                navigation.navigate("HowDoScores")
                                            }}
                                            style={{
                                                fontSize: Normalize(12),
                                                fontFamily: 'Outfit-Medium',
                                                color: Colors.primary,
                                                textAlign: language == "en" ? "left" : "right"
                                            }}>{strings.MAKEANOFFER.LEARNMORE}</Text>
                                    </View>
                                </View>
                                <View style={{ paddingVertical: "4%", padding: Normalize(8) }} >
                                    <TextInput
                                        value={description}
                                        onChangeText={(e) => setDescription(e)}
                                        placeholder={strings.MAKEANOFFER.ENTERHERE}
                                        multiline
                                        style={[globalstyles.multiline_textinputStyle, , {
                                            backgroundColor: isaboutfocus ? Colors.white : Colors.disable_textinput_background,
                                            borderColor: isaboutfocus ? Colors.primary : Colors.disable_textinput_border
                                        }]}
                                        onFocus={() => setIsaboutfocus(true)}
                                        onBlur={() => setIsaboutfocus(false)}
                                        onSubmitEditing={() => { Keyboard.dismiss() }}
                                    />

                                    <Button
                                        disabled={submitButtonLoader}
                                        name={strings.MAKEANOFFER.SUBMITOFFER}
                                        onPress={submitButton}
                                        style={{ marginTop: Normalize(10) }}
                                    />
                                </View>
                            </View>
                        </View>
                        :
                        <View style={{ flex: 1, marginHorizontal: Normalize(15), }} >
                            <View style={{ flex: 1, paddingVertical: Normalize(8) }} >
                                {
                                    loader ?
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }} >

                                            <ActivityIndicator
                                                size={"large"}
                                                color={Colors.primary}
                                            />
                                        </View>
                                        :
                                        <View style={{ flex: 1 }} >
                                            {
                                                (whichArenotupdated(pageDetails)).length == 1 && (whichArenotupdated(pageDetails))[0] == "Document" ?
                                                    is_Document_rejected ?
                                                        <>
                                                            < Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.red_old, textAlign: "center", marginBottom: Normalize(30) }]} >Admin Rejected the document. Followed by the button to move to the fixer form</Text>
                                                            <Button
                                                                onPress={() => {
                                                                    navigation.navigate("BasicInfo_intro")
                                                                }}
                                                                nextarrow
                                                                name={"Verify now"}
                                                            />
                                                        </>

                                                        :
                                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                                            <View style={{ padding: 20, backgroundColor: "#fdf3f5", borderRadius: Normalize(10) }} >
                                                                <Text style={[globalstyles.plantext_Outfit_Medium, { fontSize: Normalize(14), color: Colors.red_old, textAlign: "center" }]}>The fixer data is already completed in your profile, it is in under review.</Text>
                                                                <Button
                                                                    style={{ backgroundColor: Colors.red_old, marginTop: Normalize(15) }}
                                                                    onPress={() => navigation.goBack()}
                                                                    name={"Back"}
                                                                />
                                                            </View>
                                                        </View>
                                                    :
                                                    <>
                                                        {whichArenotupdated(pageDetails).map((item, index) => (
                                                            <View key={index} style={{ padding: Normalize(10), backgroundColor: "#fdf3f5", marginBottom: Normalize(8), flexDirection: "row", alignItems: "center", borderRadius: 10 }} >
                                                                <View style={{ height: Normalize(16), width: Normalize(16), marginRight: Normalize(8) }} >
                                                                    <Image source={images.greycross_new} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                                                                </View>
                                                                <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.red_old }]}>{addtext_uploadOrverify(item)}</Text>
                                                            </View>
                                                        ))}
                                                        < Text style={[globalstyles.plantext_Outfit_Medium, { textAlign: "center", marginTop: Normalize(30), marginBottom: Normalize(15) }]} >Please verify all the necessary informations and documents first.</Text>
                                                        <Button
                                                            onPress={() => {
                                                                navigation.navigate("BasicInfo_intro")
                                                            }}
                                                            nextarrow
                                                            name={"Verify now"}
                                                        />
                                                    </>
                                            }
                                        </View>
                                }
                            </View>
                        </View >
                    }
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
export default withRtl(MakingMoneyModal);