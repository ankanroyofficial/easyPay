import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext, useEffect, useState, useRef, Fragment } from 'react'
import {
    View, Text, Modal, ScrollView, Image, TouchableOpacity, TextInput,
    ActivityIndicator, SafeAreaView, Keyboard, KeyboardAvoidingView, Platform
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
import { numberWithCommas } from '../../../../constants/NumberWithComma';
import pusherConfig from '../../../../../pusher.json';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import LoaderPage from '../../../../components/LoaderPage';
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import { WebView } from 'react-native-webview';
import WarningPage from "../../../../components/WarningPage"
import axiosInstance from '../../../../constants/AxiosCallPage';
import { leftOrRight } from '../../../../constants/RowOrRowreverse';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../../../../components/Header';
import NewLoaderPage from '../../../../components/NewLoaderPage';
import Feather from 'react-native-vector-icons/Feather';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
function RescheduleRequestModal({ ispress, onPress, taskTitle, date, time, posterName, reschedule_id, get_reschedule_request }) {


    const [loader, setLoader] = useState(false)


    // console.log(reschedule_id)
    // console.log(get_reschedule_request)


    const getOfferData = async () => {
        try {
            setLoader(true)
            const data = {
                "params": {
                    "task_to_reschedule_id": (reschedule_id).toString(),
                    "is_confirmed_by_tasker": "Y"
                }
            }
            const res = await axiosInstance.post("confirmed-by-tasker-reschedule-task", data)
            // console.log(data)
            // console.log(res.data)
            if (res.data.result) {
                onPress()
            } else {

                Toast.show(res.data.error.meaning)
            }
            setLoader(false)
        } catch (error) {
            setLoader(false)
            console.log(error)
        }
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ispress}
            onRequestClose={onPress}
        >
            <SafeAreaView behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", justifyContent: "center", alignItems: "center" }} >
                <View style={{ padding: Normalize(20), width: "80%", backgroundColor: Colors.white, elevation: 10, borderRadius: Normalize(8) }} >
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
                                    borderRadius: Normalize(25), alignSelf: 'center', justifyContent: 'center', alignItems: 'center'
                                }} >
                                    <Feather
                                        name="clock"
                                        size={Normalize(30)}
                                        color={Colors.white}
                                    />
                                </View>
                            </View>
                            <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(16), marginVertical: Normalize(10), fontFamily: fontfmliy.bold }]}>Confirm Task Start Time</Text>
                            <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(12.5), lineHeight: Normalize(13), marginBottom: Normalize(15), fontFamily: fontfmliy.regular, textAlign: "center" }]}>Please confirm to {posterName} that you are available to complete</Text>
                            <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(12.5), lineHeight: Normalize(13), marginBottom: Normalize(15), fontFamily: fontfmliy.regular, textAlign: "center" }]}>{reschedule_id}</Text>

                        </View>



                        <View style={{ alignItems: "center" }} >
                            <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(16), fontFamily: fontfmliy.bold }]}>"{taskTitle}"</Text>
                            <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.grey, fontSize: Normalize(16), fontFamily: fontfmliy.regular }]}>on</Text>
                            <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(16), fontFamily: fontfmliy.bold }]}>{date}{"\n"}@ {time}</Text>
                        </View>
                        <Text style={[globalstyles.plantext_regular, { color: Colors.primary, fontSize: Normalize(12.5), lineHeight: Normalize(13), marginVertical: Normalize(10), fontFamily: fontfmliy.regular, textAlign: "center" }]}>If you are not available at this time and date,please message {posterName} and ask them adjust the start date/time</Text>

                        <Button
                            disabled={loader}
                            style={{ marginTop: Normalize(10), backgroundColor: Colors.secondary }}
                            name={"Confirm availability"}
                            onPress={getOfferData}
                        />
                    </Fragment>
                </View>



                <TouchableOpacity
                    onPress={onPress}
                    style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.white, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(10) }} >
                    <Entypo name="cross" color={Colors.textinput_inner_text} size={Normalize(35)} />
                </TouchableOpacity>
            </SafeAreaView>

        </Modal>
    )
}
export default withRtl(RescheduleRequestModal);
