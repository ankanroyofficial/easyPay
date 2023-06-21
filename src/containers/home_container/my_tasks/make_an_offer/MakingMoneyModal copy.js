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
import { engToPersian } from '../../../../constants/EnglishToPersian';
import { myContext } from '../../../../constants/ContextApi';
import Button from "../../../../components/Button"
import { numberCheck, numberWithCommas } from '../../../../constants/NumberWithComma';
import pusherConfig from './../../../../../pusher.json';
import { axiosUrl } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import LoaderPage from '../../../../components/LoaderPage';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Header from '../../../../components/Header';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import NewLoaderPage from '../../../../components/NewLoaderPage';
import { nameShorting } from '../../../../constants/NameShorting';

function MakingMoneyModal(props) {

    // console.log(props)

    const { taskSlugname, taskBudget, tierData } = props.route.params
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
    const { token, setToken, userSlugName,
        allVerified, setAllVerified,
        socketId, setSocketId,
        phone_number, setPhone_numbe,
        email_Address, setEmail_Address,
        setMakeAnOfferInitialPopupModal,
        userId
    } = useContext(myContext);
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
    const [isTextInput, setIsTextInput] = useState(false)
    const [isTaxId, setIsTaxId] = useState(false)

    const onPressisTextInput = () => {
        setIsTextInput(!isTextInput)
    }
    const [isAllComplete, setIsAllComplete] = useState({
        profilePic: false,
        address: false,
        dob: false,
        mobileNo: false,
        emailId: false,
        document: false,
    })
    const pageDetails = [
        {
            id: 0,
            title: "Profile Picture",
            BoxVerifiedTitle: strings.MAKEANOFFER.PROFILEPHOTOSET,
            BoxUnverifiedTitle: strings.MAKEANOFFER.UPLOADPHOTO,
            isActive: profile_Picture,
            isComplete: isAllComplete.profilePic,
            onPress: () => onPressProfile_Picture(),
        },
        {
            id: 1,
            title: "Address",
            BoxVerifiedTitle: strings.MAKEANOFFER.ADDRESSADDED,
            BoxUnverifiedTitle: strings.MAKEANOFFER.ENTERYOURADDRESS,
            isActive: address,
            isComplete: isAllComplete.address,
            onPress: () => onPressAddress(),
        },
        {
            id: 2,
            title: "Date of Birth",
            BoxVerifiedTitle: date_of_birth.activeTitle,
            BoxUnverifiedTitle: strings.MAKEANOFFER.ENTERYOURDOB,
            isActive: date_of_birth.isActive,
            isComplete: isAllComplete.dob,
            onPress: () => onPressDate_of_birth(),
        },
        {
            id: 3,
            title: "Mobile Number",
            BoxVerifiedTitle: phone_number.activeTitle,
            BoxUnverifiedTitle: strings.MAKEANOFFER.VERIFYYOURPHONENUMBER,
            isActive: phone_number.isActive,
            isComplete: isAllComplete.mobileNo,
            onPress: () => onPressPhone_number(),
        },
        {
            id: 4,
            title: "Email Address",
            BoxVerifiedTitle: email_Address.activeTitle,
            BoxUnverifiedTitle: strings.MAKEANOFFER.VERIFYYOUREMAILADDRESS,
            isActive: email_Address.isActive,
            isComplete: isAllComplete.emailId,
            onPress: () => onPressEmail_Address(),
        },
        {
            id: 5,
            title: "Document",
            BoxVerifiedTitle: uploadDocument.activeTitle,
            BoxUnverifiedTitle: "Upload document",
            isActive: uploadDocument.isActive,
            isComplete: isAllComplete.document,
            onPress: () => onPressUpload_Document(),
        },
    ]
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
            // console.log("=>", data.data.result.user.tax_id)
            if (data.data.result) {
                const res = data.data.result.user
                let isReject = false
                // console.log(res)
                setProfileStatus(res.status)

                if (res.tax_id != null && res.tax_id != "") {
                    setIsTaxId(true)
                }


                // All
                if (res.profile_picture != null && res.location != null && res.date_of_birth != null && res.is_phone_verified != "N" && res.is_email_verified != "N" && res.is_verify_document != "N") {
                    setAllVerified(true)
                } else {
                    setAllVerified(false)
                }

                // profile
                if (res.profile_picture != null) {
                    setProfile_Picture(true)
                    isAllComplete.profilePic = true
                }
                // location
                if (res.location != null) {
                    setAddress(true)
                    isAllComplete.address = true
                }
                // dob
                if (res.date_of_birth != null) {
                    const a = moment(res.date_of_birth, "YYYY-MM-DD").format("Do MMMM YYYY")
                    setDate_of_birth({ isActive: true, activeTitle: a })
                    isAllComplete.dob = true
                }

                // phone
                if (res.phone !== null) {
                    // console.log(res.phone)
                    // console.log(res.is_phone_verified)
                    if (res.is_phone_verified != "N") {
                        setPhone_numbe({ isActive: true, activeTitle: res.phone })
                        isAllComplete.mobileNo = true
                    } else {
                        setPhone_numbe({ isActive: false, activeTitle: res.phone })
                    }
                } else {
                    setPhone_numbe({ isActive: false, activeTitle: "" })
                }

                // email
                if (res.is_email_verified != "N") {
                    setEmail_Address({ isActive: true, activeTitle: res.email })
                    isAllComplete.emailId = true
                } else {
                    setEmail_Address({ isActive: false, activeTitle: res.email })
                }

                if ((data.data.result.user_to_documents).length == 2) {
                    (data.data.result.user_to_documents).map((item) => {
                        if (item.is_verify == "N") {
                            isReject = true
                        }
                    })
                    setIs_Document_rejected(isReject)
                }
                // console.log("res.is_verify_document >",res.is_verify_document, isReject)

                // Document
                if (res.is_verify_document == "N") {
                    setUploadDocument({ isActive: false, activeTitle: "Upload document" })
                } else {
                    setUploadDocument({ isActive: true, activeTitle: whichDocument(data.data.result.user_to_documents) })
                    isAllComplete.document = true
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
    }, [userSlugName]);
    const onPressProfile_Picture = async () => {
        navigation.navigate("BasicInfo_intro")
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
    const offerFees = (val) => {
        try {
            if (val == "") {
                return [0, 0];
            } else {

                if (tierData.commission_type == "F") {
                    if (isTaxId) {
                        let feesAmount = Math.round(tierData.fix_commission_with_tax);
                        let reviceAmount = amount - Math.round(feesAmount)
                        return [Math.round(feesAmount), reviceAmount];
                    } else {
                        let feesAmount = Math.round(tierData.fix_commission);
                        let reviceAmount = amount - Math.round(feesAmount)
                        return [Math.round(feesAmount), reviceAmount];
                    }
                } else {
                    if (isTaxId) {
                        let feesAmount = Math.round(tierData.commission_with_tax) / 100 * amount;
                        let reviceAmount = amount - Math.round(feesAmount)
                        return [Math.round(feesAmount), reviceAmount];
                    } else {
                        let feesAmount = Math.round(tierData.commission) / 100 * amount;
                        let reviceAmount = amount - Math.round(feesAmount)
                        return [Math.round(feesAmount), reviceAmount];
                    }
                }
            }
        } catch (error) {
            console.log("offerFees", error)
        }
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
                                if (description.length < 15) {
                                    Toast.show("Enter minimum 15 characters description")
                                } else {
                                    setSubmitButtonLoader(true)
                                    Keyboard.dismiss()
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
                                    // console.log(">><<>><<", res.data.result.task)
                                    if (res.data.error) {
                                        if (res.data.error.message) {
                                            if (res.data.error.message.meaning) {
                                                Toast.show(res.data.error.message.meaning)
                                            } else {
                                                Toast.showWithGravity(res.data.error.meaning, Toast.LONG, Toast.BOTTOM)
                                            }
                                            setSubmitButtonLoader(false)
                                        } else {
                                            Toast.show(res.data.error.socket_id[0])
                                            setSubmitButtonLoader(false)
                                        }
                                    } else {
                                        let taskDatas = res.data.result.task
                                        navigateToNewOfferPage(taskDatas)
                                    }
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
    const myBidAmount = (val) => {
        var a;
        val.map((item) => {
            if (userId == item.get_user.id) {
                a = Math.round(item.amount)
            }
        })
        return a
    }
    const navigateToNewOfferPage = (taskAllData) => {
        try {
            setMakeAnOfferInitialPopupModal(true)
            navigation.replace("NewOfferPage", {
                taskSlug: taskAllData.slug,
                alloffers: taskAllData.get_bid,
                posterName: nameShorting(taskAllData.get_user.fname + " " + taskAllData.get_user.lname),
                taskTitle: taskAllData.title,
                myOffer: myBidAmount(taskAllData.get_bid),
                offerDate: taskAllData.date_type == "B" ? "As soon as possible" : dateConvert,
                photo: taskAllData.get_user.profile_picture,
                tierData: tierData,
                isTaxId: isTaxId
            })            
            setSubmitButtonLoader(false)
            setAmount("")
            setDescription("")
        } catch (error) {
            console.log("navigateToNewOfferPage", error)
        }
    }
    return (

        <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
            <KeyboardAvoidingView
                behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ flex: 1, backgroundColor: Colors.white }}>
                <Header
                    name={strings.MAKEANOFFER.MAKEANOFFER}
                    back
                />
                <View style={{ flex: 1, backgroundColor: Colors.grayf8 }} >
                    {allVerified ?
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="always"
                        >
                            <View style={{ flex: 1, backgroundColor: Colors.grayf8 }} >
                                <View style={{ backgroundColor: Colors.white, borderRadius: Normalize(10), elevation: 2, marginHorizontal: Normalize(15), paddingVertical: Normalize(20), paddingHorizontal: Normalize(15), marginVertical: Normalize(10) }} >

                                    {
                                        !isTextInput ?
                                            <View>
                                                <Text onPress={onPressisTextInput} style={[globalstyles.plantext_bold, { fontSize: Normalize(18), textAlign: "center" }]}>$ {amount}</Text>
                                                <Text onPress={onPressisTextInput} style={[globalstyles.plantext_regular, { textAlign: "center" }]}  >Press here to edit</Text>
                                            </View>
                                            :
                                            <View style={{ marginHorizontal: Normalize(15) }}>
                                                <Text style={globalstyles.plantext_bold}  >{strings.MAKEANOFFER.YOUROFFERAMOUNT}</Text>
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
                                                            maxLength={5}
                                                            keyboardType="number-pad"
                                                            onChangeText={(e) => setAmount(e)}
                                                            style={[globalstyles.textinput_onlyText_Style, { color: Colors.greyText, }]}
                                                            onFocus={() => setIsamountfocus(true)}
                                                            onBlur={() => {
                                                                onPressisTextInput()
                                                                setIsamountfocus(false)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>}
                                    <View style={{ paddingBottom: Normalize(15), paddingTop: Normalize(30), borderBottomColor: Colors.boxBorder, borderBottomWidth: 1 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }} >
                                            <FontAwesome name="question-circle" color={Colors.textinput_inner_text} size={Normalize(13)} />
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: Normalize(5), width: "90%", alignItems: "center" }} >
                                                <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(12) }]}  >Standard service fee (incl. tax)</Text>
                                                <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(12) }]}  >$ {offerFees(amount)[0]}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: "row", paddingHorizontal: Normalize(15), alignItems: "center" }} >
                                            <FontAwesome name="info-circle" color={Colors.textinput_inner_text} size={Normalize(12)} />
                                            <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(12), color: Colors.grey, marginLeft: Normalize(3) }]}  >How is the fee calculated?</Text>
                                        </View>
                                    </View>
                                    <View style={{ paddingVertical: Normalize(12), borderBottomColor: Colors.boxBorder, borderBottomWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(12) }]}>{strings.MAKEANOFFER.YOULLRECEIVE}</Text>
                                        <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(12) }]}>$ {offerFees(amount)[1]}</Text>
                                    </View>
                                </View>
                                <View style={{ backgroundColor: Colors.white, borderRadius: Normalize(10), elevation: 2, marginHorizontal: Normalize(15), overflow: "hidden", marginBottom: Normalize(10), marginTop: Normalize(12) }} >
                                    <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(12), backgroundColor: Colors.primary, padding: Normalize(10), color: Colors.white }]}  >Tell abc why you are the best person for the task</Text>
                                    <View style={{ paddingBottom: Normalize(15), paddingHorizontal: Normalize(15), }} >
                                        <Text style={[globalstyles.plantext_regular, { textAlign: "right", paddingTop: Normalize(5), color: description.trim().length >= 15 ? Colors.green_new_2 : (description.trim().length > 0 && description.trim().length < 15) ? Colors.red_old : Colors.greylightText }]}  >Min. 15 characters</Text>
                                        <TextInput
                                            value={description}
                                            onChangeText={(e) => setDescription(e)}
                                            placeholderTextColor={Colors.textinput_inner_text}
                                            placeholder={"E.G. Hello there, i would glably help you with this task.I have 3 years experience in this so iwill professionally complete the task. I also have all the tools, insurance and i'm available on this date."}
                                            multiline
                                            style={[globalstyles.multiline_textinputStyle, {
                                                color: Colors.greyText,
                                                height: Normalize(110),
                                                fontSize: Normalize(12),
                                                borderRadius: Normalize(10),
                                                lineHeight: Normalize(15),
                                                backgroundColor: isaboutfocus ? Colors.white : Colors.disable_textinput_background,
                                                borderColor: isaboutfocus ? Colors.primary : Colors.disable_textinput_border
                                            }]}
                                            onFocus={() => setIsaboutfocus(true)}
                                            onBlur={() => setIsaboutfocus(false)}
                                            onSubmitEditing={() => { Keyboard.dismiss() }}
                                        />
                                    </View>
                                </View>
                                <View style={{ backgroundColor: Colors.white, borderRadius: Normalize(10), elevation: 2, marginHorizontal: Normalize(15), marginBottom: Normalize(10), marginTop: Normalize(12) }} >
                                    <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(12), color: Colors.grey, padding: Normalize(10), textAlign: "justify" }]}  >The offer is legally binding. If the offer is accepted by the Client,an effective contract with the Client is concluded.</Text>
                                    <View style={{ paddingBottom: Normalize(15), paddingHorizontal: Normalize(15) }} >
                                        <Button
                                            name={strings.MAKEANOFFER.SUBMITOFFER}
                                            onPress={submitButton}
                                            style={{ marginTop: Normalize(10) }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        :
                        <View style={{ flex: 1, marginHorizontal: Normalize(15), }} >
                            <View style={{ flex: 1, paddingVertical: Normalize(8) }} >
                                <View style={{ flex: 1 }} >
                                    {
                                        (whichArenotupdated(pageDetails)).length == 1 && (whichArenotupdated(pageDetails))[0] == "Document" ?
                                            is_Document_rejected ?
                                                <Fragment>
                                                    <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.red_old, textAlign: "center", marginBottom: Normalize(30) }]} >Admin Rejected the document. Followed by the button to move to the fixer form</Text>
                                                    <Button
                                                        onPress={() => {
                                                            navigation.navigate("BasicInfo_intro")
                                                        }}
                                                        nextarrow
                                                        name={"Verify now"}
                                                    />
                                                </Fragment>
                                                :
                                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                                    <View style={{ padding: 20, backgroundColor: "#fae0e6", borderRadius: Normalize(10) }} >
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
                                                        <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.red_old }]}>{item.isComplete}{addtext_uploadOrverify(item)}</Text>
                                                    </View>
                                                ))}
                                                < Text style={[globalstyles.plantext_regular, { textAlign: "center", marginTop: Normalize(30), marginBottom: Normalize(10) }]} >Please verify all the necessary informations and documents first.</Text>
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
                            </View>
                        </View >
                    }

                    {
                        (loader || submitButtonLoader) &&
                        <NewLoaderPage />
                    }
                </View>
            </KeyboardAvoidingView >
        </SafeAreaView >
    )
}
export default withRtl(MakingMoneyModal);