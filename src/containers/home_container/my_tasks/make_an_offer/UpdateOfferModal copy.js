import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {
    View, Text, Modal, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator,
    KeyboardAvoidingView, Platform
} from 'react-native'
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Toast from 'react-native-simple-toast';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import { useNavigation } from "@react-navigation/native"
import strings from '../../../../constants/lng/LocalizedStrings';
import { myContext } from '../../../../constants/ContextApi';
import Button from "../../../../components/Button"
import Pusher from 'pusher-js';
import { engToPersian } from '../../../../constants/EnglishToPersian';
import pusherConfig from './../../../../../pusher.json';
import axiosInstance from '../../../../constants/AxiosCallPage';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';



function UpdateOfferModal({ ispress, onPress, taskSlugname, taskOfferamount, taskOfferId }) {
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
    const { socketId, setSocketId } = useContext(myContext);
    const [token, setToken] = useState("");
    const [slugName, setSlugName] = useState("")
    const [amount, setAmount] = useState(taskbudgetString(taskOfferamount))
    const [tierData, setTierData] = useState()
    const [updateButtonLoader, setUpdateButtonLoader] = useState(false)
    // const [socketId, setSocketId] = React.useState("")
    const [isamountfocus, setIsamountfocus] = useState(false)
    const getTokon = async () => {
        try {
            let token = await AsyncStorage.getItem("token");
            let slug = await AsyncStorage.getItem("slug");
            setToken(token)
            setSlugName(slug)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getTokon()
    }, []);
    const getTireData = async () => {
        try {
            const res = await axiosInstance.post("my-dashboard")
            if (res.data.result) {
                setTierData(res.data.result.tier)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getTireData()
        const willFocusSubscription = navigation.addListener('focus', () => {
            getTireData()
        });
        return willFocusSubscription;
    }, [slugName]);
    const numberCheck = (val) => {
        var a = parseInt(val) == val
        return a
    }
    String.prototype.toEnglishDigits = function () {
        var num_dic = {
            '۰': '0',
            '۱': '1',
            '۲': '2',
            '۳': '3',
            '۴': '4',
            '۵': '5',
            '۶': '6',
            '۷': '7',
            '۸': '8',
            '۹': '9',
        }

        return parseInt(this.replace(/[۰-۹]/g, function (w) {
            return num_dic[w]
        }));
    }
    const updateButton = async () => {
        try {
            var finalAmount = ""
            if (language == "en") {
                var amountInteger = parseInt(amount)
                finalAmount = amount
            } else {
                var amountInteger = parseInt(amount.toEnglishDigits())
                finalAmount = amount.toEnglishDigits().toString()
            }
            if (finalAmount.length != 0) {
                if (numberCheck(finalAmount) === true) {
                    if (amountInteger < 5) {
                        Toast.show(strings.MAKEANOFFER.MINIMUMBUDGET_GURUTASKER)
                    } else {
                        if (amountInteger > 100000) {
                            Toast.show(strings.MAKEANOFFER.LESSTHAN500000000)
                        } else {
                            setUpdateButtonLoader(true)
                            // console.log("update offer", socketId)
                            const data = {
                                "jsonrpc": "2.0",
                                "params": {
                                    "slug": taskSlugname,
                                    "id": taskOfferId,
                                    "amount": amountInteger,
                                    "socket_id": socketId == "" ? "7533.23472117" : socketId
                                }
                            }
                            const res = await axiosInstance.post("update-an-offer", data)


                            if (res.data.bid) {
                                Toast.show(strings.MAKEANOFFER.SUCCESSFULLYUPDATEOFFER)
                                onPress()
                                setAmount("")
                                setUpdateButtonLoader(false)
                            }
                        }
                    }
                } else {
                    Toast.show(strings.MAKEANOFFER.VALIDNUMBER)
                }
            } else {
                Toast.show(strings.MAKEANOFFER.ENTERAMOUNT)
            }
            setUpdateButtonLoader(false)
        } catch (error) {
            console.log(error)
            setUpdateButtonLoader(false)
        }

    }
    const getSocketId = () => {
        const pusher = new Pusher(pusherConfig.key, pusherConfig);
        //  let channel = pusher.subscribe("eazypay-development");
        //  console.log(channel)
        pusher.connection.bind("connected", () => {
            var socketId = pusher.connection.socket_id;
            // console.log("socket id",socketId)
            setSocketId(socketId)
        });
    }
    const getAllData = () => {
        const pusher = new Pusher(pusherConfig.key, pusherConfig);
        let channel = pusher.subscribe("eazypay-development");
        pusher.connection.bind("connected", () => {
            var socketid = pusher.connection.socket_id;
            setSocketId(socketid)
        });
        channel.bind('question-event', function (data) {
            // console.log("data", data.task_questions.message)
            getSocketId()
            // if(data.task_questions.message){
            // console.log(data.task_questions.message!=undefined)
            //   console.log("msg recived")
            //   // getData()
            // }else{
            //   console.log("msg not recived")
            // }

        })
        channel.bind('bid-apply-event', function (data) { getSocketId() })
        channel.bind('bid-withdraw-event', function (data) { getSocketId() })
        channel.bind('bid-update-event', function (data) { getSocketId() })
        channel.bind('bid-reply-event', function (data) { getSocketId() })
        channel.bind('task-assign-event', function (data) { getSocketId() })
    }
    useEffect(() => {
        getSocketId()
        getAllData()
    }, [ispress])
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ispress}
            onRequestClose={() => {
                onPress()
                setUpdateButtonLoader(false)
            }}
        >
            <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", padding: Normalize(15), justifyContent: "center" }} >
                <View style={{ backgroundColor: Colors.white, borderRadius: 4, paddingBottom: "2%" }} >

                    <View style={{ height: Normalize(50), width: "100%", flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#E8E8E8", borderBottomWidth: 1, backgroundColor: Colors.primary }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                            <Text style={{
                                fontSize: Normalize(14),
                                fontFamily: 'roboto-bold',
                                color: Colors.white
                            }}>{strings.MAKEANOFFER.UPDATEOFFER}</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => {
                            setUpdateButtonLoader(false)
                            onPress()
                        }} style={{ height: Normalize(50), width: Normalize(50), justifyContent: "center", alignItems: "center" }} >
                            <Image source={images.cross} style={{ height: Normalize(12), width: Normalize(12), resizeMode: "contain" }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: Normalize(8) }}>
                        <View style={{ backgroundColor: "#fafbfd", paddingBottom: "2%", padding: Normalize(8), borderBottomColor: "#E8E8E8", borderBottomWidth: 1, }} >
                            <View style={{ width: "100%", paddingBottom: Normalize(25) }}>
                                <Text style={{
                                    paddingVertical: Normalize(8),
                                    fontSize: Normalize(14),
                                    fontFamily: 'roboto-regular',
                                    color: Colors.greyText,
                                    textAlign: language == "en" ? "left" : "right"
                                }}  >{strings.MAKEANOFFER.YOUROFFERAMOUNT}</Text>
                                <View style={[globalstyles.textinput_onlyBox_Style, {
                                    backgroundColor: isamountfocus ? Colors.white : Colors.disable_textinput_background,
                                    borderColor: isamountfocus ? Colors.primary : Colors.disable_textinput_border
                                }]} >
                                    <View style={{ height: Normalize(41), width: Normalize(40), justifyContent: "center", alignItems: "center", borderRightColor: isamountfocus ? Colors.primary : Colors.disable_textinput_border, borderRightWidth: 1 }} >
                                        <Text style={globalstyles.currency_font_bold} >$</Text>
                                    </View>
                                    <View style={{ flex: 1 }} >
                                        <TextInput
                                            placeholder={strings.MAKEANOFFER.ENTERAMOUNTTEXTINPUT}
                                            value={language == "en" ? amount : engToPersian(amount)}
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
                        <View style={{ backgroundColor: "#fafbfd", paddingVertical: "2%", padding: Normalize(8), borderBottomWidth: 1, borderBottomColor: "#E8E8E8" }} >
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
                                    onPress()
                                    navigation.navigate("HowDoScores")
                                }}
                                style={{
                                    fontSize: Normalize(11),
                                    fontFamily: 'roboto-medium',
                                    color: '#636468',
                                    color: Colors.primary,
                                    textAlign: language == "en" ? "left" : "right"
                                }}>{strings.MAKEANOFFER.LEARNMORE}</Text>
                        </View>
                        <Button
                            disabled={updateButtonLoader ? true : false}
                            name={updateButtonLoader ? "" : strings.MAKEANOFFER.UPDATEOFFER}
                            onPress={updateButton}
                            style={{ marginBottom: Normalize(15) }}
                        >
                            {
                                updateButtonLoader &&
                                <ActivityIndicator
                                    size="small"
                                    color={Colors.white}
                                />
                            }
                        </Button>
                    </View>
                </View>
            </KeyboardAvoidingView>


        </Modal>

    )
}
export default withRtl(UpdateOfferModal);