import React, {  useContext, useEffect, useState } from 'react'
import {
    View, Text, ScrollView,  TextInput, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView
} from 'react-native'
import { withRtl } from 'react-native-easy-localization-and-rtl';
import Toast from 'react-native-simple-toast';
import { Colors } from '../../../../constants/colors';
import { useNavigation } from "@react-navigation/native"
import Pusher from 'pusher-js';
import strings from '../../../../constants/lng/LocalizedStrings';
import { myContext } from '../../../../constants/ContextApi';
import Button from "../../../../components/Button"
import { numberCheck } from '../../../../constants/NumberWithComma';
import pusherConfig from './../../../../../pusher.json';
import axiosInstance from '../../../../constants/AxiosCallPage';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../../../../components/Header';
import NewLoaderPage from '../../../../components/NewLoaderPage';
import { nameShorting } from '../../../../constants/NameShorting';
import moment from 'moment';

function MakingMoneyModal(props) {
    const { taskSlugname, taskBudget, tierData, isTaxId } = props.route.params
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
    const {
        socketId, setSocketId,
        setMakeAnOfferInitialPopupModal,
        userId
    } = useContext(myContext);
    const [submitButtonLoader, setSubmitButtonLoader] = useState(false)
    const [isamountfocus, setIsamountfocus] = useState(false)
    const [isaboutfocus, setIsaboutfocus] = useState(false)
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState(taskbudgetString(taskBudget))
    const [isTextInput, setIsTextInput] = useState(false)

    const onPressisTextInput = () => {
        setIsTextInput(!isTextInput)
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
                offerDate: taskAllData.date_type == "B" ? "As soon as possible" : englishDate(taskAllData.due_date),
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
    const englishDate = (val) => {
        let m = moment(val).format('Do MMM,YYYY');
        return m;
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

                    {
                         submitButtonLoader &&
                        <NewLoaderPage />
                    }
                </View>
            </KeyboardAvoidingView >
        </SafeAreaView >
    )
}
export default withRtl(MakingMoneyModal);