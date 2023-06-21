import React, { useState } from 'react'
import {
    View, Text, Modal, TouchableOpacity, TextInput,
    Keyboard, KeyboardAvoidingView
} from 'react-native'
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Toast from 'react-native-simple-toast';
import { Colors } from '../../../../constants/colors';
import strings from '../../../../constants/lng/LocalizedStrings';
import { engToPersian } from '../../../../constants/EnglishToPersian';
import Button from "../../../../components/Button"
import axiosInstance from '../../../../constants/AxiosCallPage';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import { Fragment } from 'react';

function IncreasepriceModal_For_Tasker({ ispress, onPress, taskSlugname, posterName, tierData, isTaxId }) {
    const { language } = useRtlContext();
    const [submitButtonLoader, setSubmitButtonLoader] = useState(false)
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")

    const numberCheck = (val) => {
        var a = parseInt(val) == val
        return a
    }
    const asktoincreaseButton = async () => {
        try {
            var finalAmount = ""
            var amountInteger = parseInt(amount)
            finalAmount = amount

            if (amount.length != 0) {
                if (numberCheck(finalAmount) === true) {
                    if (amountInteger < 5) {
                        Toast.show("Amount must be $5 or greater than $5")
                    } else {
                        if (amountInteger > 99999) {
                            Toast.show(strings.MAKEANOFFER.LESSTHAN500000000)
                        } else {
                            setSubmitButtonLoader(true)
                            var d = description.trim()
                            const data = {
                                "params": {
                                    "slug": taskSlugname,
                                    "amount": finalAmount,
                                    "description": d
                                }
                            }
                            const res = await axiosInstance.post("incrase-payment-request", data)
                            // console.log(res.data)
                            if (res.data.error) {
                                setSubmitButtonLoader(false)
                                Toast.show(res.data.error.meaning)
                            } else {
                                setSubmitButtonLoader(false)
                                onPress()
                                setAmount("")
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
            console.log(error)
        }
    }
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

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ispress}
            onRequestClose={() => {
                onPress()
                setSubmitButtonLoader(false)
            }}
        >
            <KeyboardAvoidingView
                behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", alignItems: "center", justifyContent: "center" }} >

                <View style={{ padding: Normalize(15), width: "85%", backgroundColor: Colors.white, elevation: 5, borderRadius: Normalize(8) }} >
                    <Fragment>
                        <View style={{ alignItems: "center" }} >
                            <View style={{
                                height: Normalize(60), width: Normalize(60), backgroundColor: Colors.white, marginTop: Normalize(-50),
                                borderRadius: Normalize(30), alignItems: 'center', justifyContent: 'center'
                            }}>
                                <View style={{
                                    height: Normalize(50),
                                    width: Normalize(50),
                                    backgroundColor: Colors.secondary,
                                    borderRadius: Normalize(25),
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }} >
                                    <Entypo
                                        name="plus"
                                        size={Normalize(30)}
                                        color={Colors.white}
                                    />
                                </View>
                            </View>
                            <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(16), marginVertical: Normalize(10), fontFamily: fontfmliy.bold }]}>Request Extra Payment</Text>
                            <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.grey, fontSize: Normalize(12.5), lineHeight: Normalize(13), marginBottom: Normalize(15), fontFamily: fontfmliy.regular, textAlign: "center" }]}>Your request will be sent to the Client,who will either accept or decline youe request</Text>
                        </View>
                        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", borderBottomColor: Colors.boxBorder, borderBottomWidth: Normalize(1.5) }} >
                            <Fontisto
                                name="dollar"
                                size={Normalize(16)}
                                color={Colors.primary}
                            />
                            <TextInput
                                placeholder={"0"}
                                placeholderTextColor={Colors.boxBorder}
                                value={language == "en" ? amount : engToPersian(amount)}
                                maxLength={5}
                                keyboardType="number-pad"
                                onChangeText={(e) =>
                                    setAmount(e)}
                                style={{
                                    paddingLeft: Normalize(8),
                                    fontSize: Normalize(15),
                                    color: Colors.primary,
                                    alignItems: "stretch",
                                    // fontFamily:fontfmliy.bold,
                                    letterSpacing: Normalize(1),
                                    fontWeight: "700"
                                }}
                            />
                        </View>
                        <View style={{ paddingBottom: Normalize(15), paddingTop: Normalize(10), borderBottomColor: Colors.boxBorder, borderBottomWidth: 1 }}>
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
                        <View style={{ paddingVertical: "5%" }} >
                            <Text style={[globalstyles.plantext_regular, {
                                fontSize: Normalize(13),
                                color: Colors.grey,
                                textAlign: "left"
                            }]}  >
                                Reason for extra payment (optional)
                            </Text>
                            <View style={{ marginVertical: Normalize(6), width: "100%", height: Normalize(60), }} >
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        value={description}
                                        onChangeText={(e) => setDescription(e)}
                                        placeholderTextColor={Colors.grey}
                                        placeholder={strings.BASICINFO.PLACEHOLDER}
                                        multiline
                                        style={{ backgroundColor: Colors.secondaryBackground, borderRadius: Normalize(8), padding: Normalize(10), height: "100%", width: "100%", textAlignVertical: "top", textAlign: language == "en" ? "left" : "right", color: Colors.primary }}
                                        onSubmitEditing={() => { Keyboard.dismiss() }}
                                    />
                                </View>
                            </View>
                            <Text style={[globalstyles.plantext_regular, {
                                paddingBottom: Normalize(6),
                                fontSize: Normalize(13),
                                color: Colors.grey,
                                textAlign: "left"
                            }]}  >
                                Please wait until your extra payment request is approved before continuing work or requesting full payment
                            </Text>
                        </View>
                        <Button
                            style={{ backgroundColor: Colors.secondary }}
                            disabled={submitButtonLoader}
                            name={"Request"}
                            onPress={asktoincreaseButton}
                        />
                    </Fragment>
                </View>
                <TouchableOpacity
                    onPress={onPress}
                    style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.white, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(10) }} >
                    <Entypo name="cross" color={Colors.textinput_inner_text} size={Normalize(35)} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </Modal>

    )
}
export default withRtl(IncreasepriceModal_For_Tasker);
