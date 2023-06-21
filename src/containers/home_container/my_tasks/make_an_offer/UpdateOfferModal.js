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
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


function UpdateOfferModal({ ispress, onPress, taskSlugname, taskOfferamount, taskOfferId, tierData, isTaxId }) {

    const taskbudgetString = (val) => {
        if (val == undefined) {
            return ""
        } else {
            let a = val.toString()
            if (a < 5) {
                let b = 5
                let c = b.toString()
                return c
            } else {
                return a
            }
        }
    }
    const { language } = useRtlContext();
    const { socketId, setSocketId, newOfferPageMessageArry } = useContext(myContext);
    const [amount, setAmount] = useState(taskbudgetString(taskOfferamount))
    const [updateButtonLoader, setUpdateButtonLoader] = useState(false)
    const [isamountfocus, setIsamountfocus] = useState(false)

    const numberCheck = (val) => {
        var a = parseInt(val) == val
        return a
    }
    const updateButton = async () => {
        try {
            var finalAmount = ""
            var amountInteger = parseInt(amount)
            finalAmount = amount

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
                                // sendMsg()
                                Toast.show(strings.MAKEANOFFER.SUCCESSFULLYUPDATEOFFER)
                                setAmount("")
                                AsyncStorage.setItem("offerReload", "true")
                                onPress()
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
    useEffect(() => {
        getSocketId()
    }, [ispress])


    const offerFees = (val) => {
        try {
            if (val != undefined) {
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
            } else {
                return [8181, 1818]
            }
        } catch (error) {
            console.log("offerFees", error)
        }
    }


    const sendMsg = async (val) => {
        try {
            const data = {
                "jsonrpc": "2.0",
                "params": {
                    "slug": taskSlugname,
                    "bid_id": taskOfferId,
                    "message": "trimMessage",
                    "socket_id": socketId == "" ? "7533.23472117" : socketId
                }
            }
            const res = await axiosInstance.post("send-offer-reply", data)

            // console.log(">>>>",res.data)

            if (res.data.result) {
                newOfferPageMessageArry.push({ msg: res.data.result.message, msgUserId: res.data.result.user_id, id: res.data.result.bid_id })
            } else {
                Toast.show(res.data.error.meaning)
            }
        } catch (error) {
            console.log("sendMsg--inUpdate", error)
        }
    }







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
            <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)" }} >

                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }} >
                    <TouchableOpacity
                        onPress={() => {
                            onPress()
                            setUpdateButtonLoader(false)
                        }}
                        style={{ margin: Normalize(15), height: Normalize(40), width: Normalize(40), borderRadius: Normalize(40) / 2, backgroundColor: Colors.secondary, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(10) }} >
                        <Entypo name="cross" color={Colors.white} size={Normalize(28)} />
                    </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: Colors.white, paddingBottom: Normalize(10) }}>
                    <View style={{ paddingHorizontal: Normalize(15), }} >
                        <View style={{ width: "100%" }}>
                            <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(13), color: Colors.greyText, paddingVertical: Normalize(8), }]}  >{strings.MAKEANOFFER.UPDATEOFFER}</Text>
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
                    <View style={{ paddingHorizontal: Normalize(10), paddingBottom: Normalize(20) }} >
                        <View style={{ paddingBottom: Normalize(15), paddingTop: Normalize(15), borderBottomColor: Colors.boxBorder, borderBottomWidth: 1 }}>
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
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }} >
                        <Button
                            name={"Cancel"}
                            onPress={() => {
                                onPress()
                                setUpdateButtonLoader(false)
                            }}
                            style={{ width: "48%", backgroundColor: Colors.primary }}
                        />
                        <Button
                            disabled={updateButtonLoader}
                            name={"Edit Price"}
                            onPress={updateButton}
                            style={{ width: "48%", backgroundColor: Colors.secondary }}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>


        </Modal>

    )
}
export default withRtl(UpdateOfferModal);