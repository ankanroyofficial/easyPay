
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react'
import { View, Dimensions, Pressable, SafeAreaView, Text, TextInput, Image, ScrollView } from 'react-native'
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { Colors } from '../../../../constants/colors';
import Header from '../../../../components/Header';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay';
const { height, width } = Dimensions.get("window")
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import images from '../../../../constants/images';
import Button from '../../../../components/Button';
import { WebView } from 'react-native-webview';
import Toast from 'react-native-simple-toast';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import { useEffect } from 'react';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import axiosInstance from '../../../../constants/AxiosCallPage';
import strings from '../../../../constants/lng/LocalizedStrings';
import { myContext } from '../../../../constants/ContextApi';
import { useContext } from 'react';
import { Modal } from 'react-native';
import LoaderPage from '../../../../components/LoaderPage';
import { axiosUrl } from '../../../../constants/LinkPage';
import { Keyboard } from 'react-native';
import NewLoaderPage from '../../../../components/NewLoaderPage';
import { Platform } from 'react-native';
import SucessModalDesign from '../../../../components/SucessModalDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

function PaymentReservation(props) {
    const webref = useRef()
    const { socketId,
        setTaskdetailsData,
        setNewOfferPageMessageArry,
        setNewOfferPageMessageWithTaskerArry,
        voucherDetails, setVoucherDetails
    } = useContext(myContext)
    const { bid_id, amount, taskSlug, taskerName } = props.route.params
    const navigation = useNavigation()
    const [opentab, setopentab] = useState("P")
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [address2, setAddress2] = useState("")
    const [name2, setName2] = useState("")


    const [isAgree, setIsAgree] = useState(false)
    const [loader, setLoader] = useState(false)
    const [ispaymentgateway, setIsPaymentgateway] = useState(false);
    const [amountDetails, setAmountDetails] = useState(null)
    const [apiUrl, setApiUri] = useState("")
    const [isSucessPayment, setIsSucessPayment] = useState(false)
    const onPressAgree = () => {
        setIsAgree(!isAgree)
    }
    const onPressPamentGetWay = () => {
        if (ispaymentgateway == true) {
            setIsPaymentgateway(false)
            Toast.show(strings.ERROR.PAYMENTCANCEL)
        } else {
            setIsPaymentgateway(!ispaymentgateway)
        }
    }
    useEffect(() => {
        getOfferData()
    }, []);
    const getOfferData = async () => {
        try {
            setLoader(true)
            const data = {
                "jsonrpc": "2.0",
                "params": {
                    "bid_id": bid_id
                }
            }
            const res = await axiosInstance.post("get-offer-payment-details", data)
            if (res.data.jsonrpc) {
                setLoader(false)
                setAmountDetails(res.data)
            }
        } catch (error) {
            setLoader(false)
            console.log("getOfferData", error)
        }
    }
    const onPressNextButton = async () => {
        try {

            if (opentab == "P") {
                if (name.trim().length == 0) {
                    Toast.show("Enter Name")
                } else {
                    if (address.trim().length == 0) {
                        Toast.show("Enter Address")
                    } else {
                        if (!isAgree) {
                            Toast.show("Please agree terms and conditions")
                        } else {
                            if (amountDetails != null) {
                                acceptOffer()
                            } else {
                                Toast.show("Error in amount Details")
                            }
                        }
                    }
                }
            } else {
                if (name2.trim().length == 0) {
                    Toast.show("Enter Company Name")
                } else {
                    if (address2.trim().length == 0) {
                        Toast.show("Enter Company Address")
                    } else {
                        if (!isAgree) {
                            Toast.show("Please agree terms and conditions")
                        } else {
                            if (amountDetails != null) {
                                acceptOffer()
                            } else {
                                Toast.show("Error in amount Details")
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.log("SecurelyholdpaymentBotton", error)

        }
    }
    const acceptOffer = async () => {
        try {
            Keyboard.dismiss()
            setLoader(true)
            const data = {
                "params": {
                    "slug": taskSlug,
                    "id": bid_id,
                    "offer_amt": Math.round(amountDetails.offer_amt),
                    "socket_id": socketId == "" ? "7533.23472117" : socketId,
                    "fees": Math.round(amountDetails.fees),
                    "payment_method": amountDetails.payment_type,
                    "payable_amt": amountDetails.payblabe_amount,
                    "type": opentab,
                    "name": opentab == "P" ? name : name2,
                    "address": opentab == "P" ? address : address2,
                    "voucher_id": voucherDetails != null ? voucherDetails.id : ""
                }
            }
            // console.log(".........................................", data)
            const res = await axiosInstance.post("new-accept-offer", data)
            // console.log(res.data)

            if (res.data.redirect_url) {
                setApiUri(res.data.redirect_url)
                setLoader(false)
                onPressPamentGetWay()
            } else {
                setLoader(false)
                if (res.data.result) {
                    Toast.show(res.data.result.status.meaning)
                } else {
                    if (res.data.error.message.meaning) {
                        Toast.show(res.data.error.message.meaning)
                    } else {
                        Toast.show(res.data.error.message)
                    }
                }
            }
            setLoader(false)
        } catch (error) {
            setLoader(false)
            console.log("acceptOffer", error)
        }
    }
    const onNavigationStateChangeHandle = async ({ url }) => {
        // console.log("url**************", url)
        if (url == `${axiosUrl.URL}payment-fail`) {
            onPressPamentGetWay()
            if (Platform.OS == "ios") {
                Alert.alert(
                    "Fail!",
                    "Payment Failed",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        } else if (url == `${axiosUrl.URL}payment-cancel`) {
            onPressPamentGetWay()
            if (Platform.OS == "ios") {
                Alert.alert(
                    "Cancel!",
                    "Payment Cancelled",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        } else if (url == `${axiosUrl.URL}payment-success` || checkLast_word(url)) {
            setIsPaymentgateway(!ispaymentgateway)
            await AsyncStorage.setItem("isMyTaskloader", "true")
            await AsyncStorage.setItem("isBrowserTaskloader", "true")
            await AsyncStorage.setItem("rescheduleOpen", "true")
            setVoucherDetails(null)
            if (Platform.OS == "ios") {
                Alert.alert(
                    "Success!",
                    "Payment Done Sucessfully",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            } else {
                Toast.show(strings.ERROR.SUCCESSFULLYTASKASSIGNED)
            }
            setIsSucessPayment(true)
        } else if (url == `${axiosUrl.URL}payment-in-progress`) {
            setIsPaymentgateway(!ispaymentgateway)
            if (Platform.OS == "ios") {
                Alert.alert(
                    "Success!",
                    "Payment in progress",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            } else {
                Toast.show("Payment in progress")
            }
        } else if (is_checkLast_word_paymentreturnurl(url)) {
            getOfferData()
        } else {
            console.log("else url.............", url)
        }
    }
    const checkLast_word = (get_url) => {
        var splitUrl = get_url.split("/")
        var lastWord = splitUrl[splitUrl.length - 1]
        if (lastWord == "completed") {
            return true
        } else {
            return false
        }
    }
    const is_checkLast_word_paymentreturnurl = (get_url) => {
        var splitUrl = get_url.split("/")
        var lastWord = splitUrl[splitUrl.length - 1]
        // console.log("lastWord``````````````````````````````````````", lastWord)
        if (lastWord == "payment-return-url") {
            return true
        } else {
            return false
        }
    }
    const renderLoadingView = () => {
        return (
            <View style={{
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                position: "absolute"
            }} >
                <NewLoaderPage />
            </View>
        );
    }
    const onPressSucessContinue = () => {
        setIsSucessPayment(false)
        gototaskdetails(taskSlug)
    }
    const gototaskdetails = async (val) => {
        try {
            setLoader(true)
            const res = {
                "jsonrpc": "2.0",
                "params": {
                    "slug": val
                }
            }
            const data = await axiosInstance.post("get-task-details", res)

            // console.log(data.data)

            if (data.data.result) {
                setLoader(false)
                let a = data.data.result;
                let oldTaskdata = data.data.result.task;
                oldTaskdata.lowest_offers = a.lowest_offers;
                oldTaskdata.highest_offers = a.highest_offers;
                oldTaskdata.nearbyfixeroffer = a.nearbyfixeroffer;
                oldTaskdata.recommended_fixer_sort_based_on_rating = a.recommended_fixer_sort_based_on_rating
                // console.log(oldTaskdata)
                setNewOfferPageMessageArry([])
                setNewOfferPageMessageWithTaskerArry([])
                setTaskdetailsData(oldTaskdata)
                navigation.push('TaskDetails', { show: oldTaskdata, from: "PaymentReservation" })
            }
        } catch (error) {
            setLoader(false)
            console.log("getData_taskdetails---------- payment reserve", error)
        }

    }

    // console.log(voucherDetails)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
            <View style={{ flex: 1, backgroundColor: Colors.white }} >
                <Header name={`Payment Reservation`} back />
                <View style={{ flex: 1 }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={"always"}
                    >
                        <View style={{ flex: 1, paddingHorizontal: 20 }} >

                            <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.greyText, fontSize: Normalize(14), marginTop: Normalize(15), fontFamily: "Lato-Bold" }]}>{"Billing Address"}</Text>
                            <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.greyText, fontSize: Normalize(12), marginTop: Normalize(10), fontFamily: "Lato-Regular" }]}>{"please write the billing address that you want to be shown on the invoice"}</Text>

                            <View style={{
                                flexDirection: 'row',
                                borderRadius: Normalize(8),
                                height: Normalize(40),
                                width: '60%',
                                alignSelf: 'flex-start',
                                overflow: 'hidden',
                                backgroundColor: '#e1e4e9',
                                marginTop: Normalize(20),
                                marginBottom: Normalize(10),
                            }}>
                                <Pressable style={{
                                    flex: opentab == 'P' ? 1 : 0.85, justifyContent: 'center', alignItems: 'center',
                                    backgroundColor: opentab == 'P' ? Colors.secondary : 'transparent', borderRadius: Normalize(8),
                                }}
                                    onPress={() => setopentab('P')}>
                                    <Text style={{ fontSize: Normalize(13), color: opentab == 'P' ? Colors.white : Colors.grey, fontFamily: fontfmliy.bold }} >Personal</Text>
                                </Pressable>
                                <Pressable style={{
                                    flex: opentab == 'B' ? 1 : 0.85, justifyContent: 'center', alignItems: 'center',
                                    backgroundColor: opentab == 'B' ? Colors.secondary : 'transparent', borderRadius: Normalize(8),
                                }}
                                    onPress={() => setopentab('B')}>
                                    <Text style={{ fontSize: Normalize(13), color: opentab == 'B' ? Colors.white : Colors.grey, fontFamily: fontfmliy.bold }} >Business</Text>
                                </Pressable>

                            </View>
                            <View style={{ marginTop: Normalize(5), height: Normalize(30), flexDirection: "row", }} >
                                <View style={{ height: "100%", width: "9%", justifyContent: "center", alignItems: "center", }} >
                                    <FontAwesome name="user" color={Colors.disableText} size={Normalize(18)} />
                                </View>
                                <Text style={[globalStyle_esyPay.pageHeading, {
                                    color: Colors.greyText, fontSize: Normalize(12),
                                    fontFamily: "Lato-Regular", alignSelf: 'center'
                                }]}>{opentab == 'P' ? "Full Name *" : "Company Name *"}</Text>

                            </View>
                            <View style={{
                                borderBottomWidth: 1, borderColor: Colors.boxBorder, flexDirection: "row", padding: Normalize(3),
                                height: Normalize(40), marginHorizontal: Normalize(5),
                            }} >
                                {opentab == "P" ?
                                    <TextInput
                                        value={name}
                                        onChangeText={(e) => setName(e)}
                                        placeholder='Enter name...'
                                        placeholderTextColor={Colors.grey}
                                        style={{ alignItems: "stretch", width: "100%", color: Colors.greyText }}
                                    />
                                    :
                                    <TextInput
                                        value={name2}
                                        onChangeText={(e) => setName2(e)}
                                        placeholder='Enter company name...'
                                        placeholderTextColor={Colors.grey}
                                        style={{ alignItems: "stretch", width: "100%", color: Colors.greyText }}
                                    />
                                }
                            </View>

                            <View style={{ marginTop: Normalize(15), height: Normalize(30), flexDirection: "row" }} >
                                <View style={{ height: "100%", width: "9%", justifyContent: "center", alignItems: "center", }} >
                                    <Ionicons name="ios-location-sharp" color={Colors.disableText} size={Normalize(18)} />
                                </View>
                                <Text style={[globalStyle_esyPay.pageHeading, {
                                    color: Colors.greyText, fontSize: Normalize(12),
                                    fontFamily: "Lato-Regular", alignSelf: 'center'
                                }]}>{opentab == 'P' ? "Address *" : "Company Address *"}</Text>

                            </View>
                            <View style={{
                                borderBottomWidth: 1, borderColor: Colors.boxBorder, flexDirection: "row", padding: Normalize(3),
                                height: Normalize(40), marginHorizontal: Normalize(5),
                            }} >
                                {opentab == "P" ?
                                    <TextInput
                                        value={address}
                                        onChangeText={(e) => setAddress(e)}
                                        placeholder='Enter address...'
                                        placeholderTextColor={Colors.grey}
                                        style={{ alignItems: "stretch", width: "100%", color: Colors.greyText }}
                                    />
                                    :
                                    <TextInput
                                        value={address2}
                                        onChangeText={(e) => setAddress2(e)}
                                        placeholder='Enter company address...'
                                        placeholderTextColor={Colors.grey}
                                        style={{ alignItems: "stretch", width: "100%", color: Colors.greyText }}
                                    />
                                }
                            </View>



                            {/* Vouchers */}


                            <View
                                style={{
                                    marginTop: Normalize(15), height: Normalize(30), marginHorizontal: Normalize(5),
                                    flexDirection: "row", padding: Normalize(3), justifyContent: 'space-between'
                                }} >





                                <Pressable
                                    onPress={() => navigation.navigate("VoucherList", { amount })}
                                    style={{ flexDirection: 'row' }} >
                                    <View style={{ height: "100%", justifyContent: "center", alignItems: "center", }} >
                                        <FontAwesome name="book" color={Colors.disableText} size={Normalize(18)} />
                                    </View>

                                    <Text style={[globalStyle_esyPay.pageHeading, {
                                        color: Colors.greyText,
                                        fontSize: Normalize(12),
                                        fontFamily: voucherDetails != null ? fontfmliy.bold : fontfmliy.regular,
                                        alignSelf: 'center',
                                        paddingLeft: Normalize(10),
                                    }]}>{voucherDetails != null ? `Voucher ${voucherDetails.voucher_code}` : "Add Voucher"}</Text>
                                </Pressable>



                                {
                                    voucherDetails != null ?
                                        <Pressable
                                            onPress={() => setVoucherDetails(null)}
                                            style={{ height: "100%", width: "5%", justifyContent: "center", alignItems: "center", }} >
                                            <Entypo name="cross" color={Colors.red_old} size={Normalize(18)} />
                                        </Pressable>

                                        :

                                        <Pressable
                                            onPress={() => navigation.navigate("VoucherList", { amount })}
                                            style={{ height: "100%", width: "5%", justifyContent: "center", alignItems: "center", }} >
                                            <Entypo name="chevron-right" color={Colors.greylightText} size={Normalize(18)} />
                                        </Pressable>

                                }
                            </View>
                            <View style={{
                                marginTop: Normalize(15), height: Normalize(50), marginRight: -20, marginLeft: -20,
                                flexDirection: "row", padding: Normalize(1), justifyContent: 'space-between', backgroundColor: Colors.primary
                            }} >
                                <Text style={[globalStyle_esyPay.pageHeading, {
                                    color: Colors.white, fontSize: Normalize(12),
                                    fontFamily: "Lato-Regular", alignSelf: 'center', marginLeft: Normalize(20)
                                }]}>{"Ammount to reserve"}</Text>
                                <Text style={[globalStyle_esyPay.pageHeading, {
                                    color: Colors.white, fontSize: Normalize(12),
                                    fontFamily: "Lato-Regular", alignSelf: 'center', marginRight: Normalize(20)
                                }]}>{voucherDetails != null ? `$ ${amount - (Math.round(voucherDetails.price))}` : `$ ${amount}`}</Text>

                            </View>

                            <View style={{
                                marginTop: Normalize(15),
                                flexDirection: "row", padding: Normalize(1)
                            }} >

                                <Pressable
                                    onPress={onPressAgree}
                                    style={{
                                        height: Normalize(15),
                                        width: Normalize(15),
                                        borderRadius: Normalize(15) / 2,
                                        borderColor: isAgree ? Colors.secondary : Colors.lightGrey,
                                        borderWidth: 1,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}  >
                                    {isAgree && <FontAwesome
                                        name="circle"
                                        color={Colors.secondary}
                                        size={Normalize(12)}
                                    />}
                                </Pressable>
                                <Text style={[globalstyles.plantext_regular, {
                                    color: Colors.greyText, fontSize: Normalize(12), alignSelf: 'center', marginHorizontal: Normalize(5)
                                }]}>{"I agree and expressly demand that the task and the meditation of the task be started before the end of the ststutory revocation period. i am aware that i will loss my right of revocation if the contact is fulfilled in full"}</Text>
                            </View>
                        </View>
                        <Button
                            onPress={onPressNextButton}
                            name={"Next"}
                            style={{
                                marginVertical: Normalize(30),
                                width: '90%',
                                alignSelf: 'center'
                            }}
                        />
                    </ScrollView>
                    {
                        loader && <NewLoaderPage />
                    }
                </View>
                {
                    ispaymentgateway &&
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={ispaymentgateway}
                        onRequestClose={() => {
                            onPressPamentGetWay()
                        }}
                    >
                        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
                            <View style={{ flex: 1, backgroundColor: Colors.white }} >
                                <Header name={"Payment"} back backFunc={onPressPamentGetWay} />
                                <WebView
                                    ref={webref}
                                    source={{ uri: apiUrl }}
                                    style={{ flex: 1 }}
                                    onNavigationStateChange={onNavigationStateChangeHandle}
                                    renderLoading={renderLoadingView}
                                    startInLoadingState={true}
                                />
                            </View>
                        </SafeAreaView>
                    </Modal>
                }
                {
                    isSucessPayment &&
                    <SucessModalDesign
                        ispress={isSucessPayment}
                        onpress={onPressSucessContinue}
                        title={"payment Reserved!"}
                        subTitle={`You can now share the final details of your task and chat with ${taskerName} in Message`}
                    />
                }

            </View>
        </SafeAreaView>
    )
}
export default withRtl(PaymentReservation);