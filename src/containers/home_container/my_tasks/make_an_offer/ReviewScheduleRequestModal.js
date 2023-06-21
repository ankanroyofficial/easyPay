
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Modal, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator, Keyboard } from 'react-native'
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
import pusherConfig from './../../../../../pusher.json';
import DateTimePickerModal from 'react-native-datepicker';
import Slider from '@react-native-community/slider';
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import { leftOrRight, rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import { questionPersianTimeShow, englishTimeShow } from '../../../../constants/DateShow';
import WarningPage from '../../../../components/WarningPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import LoaderPage from '../../../../components/LoaderPage';
import { Fragment } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import Feather from 'react-native-vector-icons/Feather';

function ReviewScheduleRequestModal({ ispress, onPress, taskSlugname, name, imageName, reason, oldDate, requesteddate }) {
    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
    const [token, setToken] = useState("");
    const [rejectdateModal, setRejectdateModal] = useState(false)
    const [acceptDateModal, setAcceptDateModal] = useState(false)
    const [loader, setLoader] = useState(false)
    // console.log(requesteddate)
    const getTokon = async () => {
        try {
            let token = await AsyncStorage.getItem("token");
            setToken(token)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getTokon()
    }, []);
    const date_English = (val) => {
        var date = moment(val).format("D")
        var month = moment(val).format("MMMM")
        var day = moment(val).format("dddd")
        var year = moment(val).format("YYYY")
        return [day, date, month, year]
    }

    const date_Persian = (val) => {
        // console.log(val)
        var a = val
        let test = moment(a, 'YYYY-MM-DD').locale('fa').format('DD-MM-YYYY');
        let month = moment(a, 'YYYY-MM-DD').locale('fa').format('jMMMM');
        let date = moment(a, 'YYYY-MM-DD').locale('fa').format('D');
        let day = moment(a, 'YYYY-MM-DD').locale('fa').format("dddd");

        let testdateSplit = test.split("-")

        //    console.log(month)


        // var year = moment(val).format("YYYY")
        return [day, engToPersian(testdateSplit[0]), month, 2000]
    }


    const onpressRejectDate = () => {
        setRejectdateModal(!rejectdateModal)
    }
    const onpressAcceptDate = () => {
        setAcceptDateModal(!acceptDateModal)
    }
    const rejectOrAccept = async (val) => {
        try {
            setLoader(true)

            const data = {
                "params": {
                    "slug": taskSlugname,
                    "type": val
                }
            }
            const res = await axiosInstance.post("reschedule-request-action", data)
            // console.log(res.data)
            if (res.data.success) {
                Toast.show(res.data.success.meaning)
                setLoader(false)
                onpressAcceptDate()
                onPress()
            } else {
                Toast.show(res.data.error.meaning)
                setLoader(false)
                onpressAcceptDate()
                // onPress()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ispress}
            onRequestClose={() => {
                onPress()
            }}
        >
            {
                loader ?
                    <LoaderPage />
                    :
                    <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", alignItems: "center", justifyContent: "center" }} >
                        <View style={{ padding: Normalize(20), width: "80%", backgroundColor: Colors.white, elevation: 10, borderRadius: Normalize(8) }} >
                            <Fragment>

                                <View style={{ paddingHorizontal: 15 }} >

                                    <View style={{ alignItems: "center" }} >
                                        <View style={{
                                            height: Normalize(60), width: Normalize(60), backgroundColor: Colors.white, marginTop: Normalize(-50),
                                            borderRadius: Normalize(30), alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <View style={{
                                                height: Normalize(50),
                                                width: Normalize(50),
                                                backgroundColor: Colors.yellow,
                                                borderRadius: Normalize(25), alignSelf: 'center', justifyContent: 'center', alignItems: 'center'
                                            }} >
                                                <Feather
                                                    name="clock"
                                                    size={Normalize(30)}
                                                    color={Colors.white}
                                                />
                                            </View>
                                        </View>
                                        <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(16), marginVertical: Normalize(10), fontFamily: fontfmliy.bold }]}>{strings.TASKDETAILS.REVIEWPROPOSEDDUEDATE}</Text>
                                        <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(12.5), lineHeight: Normalize(13), marginBottom: Normalize(15), fontFamily: fontfmliy.regular, textAlign: "center" }]}>{`By approving the rescheduled task date. your task will be due by ${date_English(requesteddate)[0]}, ${englishTimeShow(requesteddate)}.`}</Text>

                                    </View>


                                    <View style={{ paddingVertical: 15, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", }} >

                                        {/* *********************Old date**************** */}

                                        <View>
                                            <View style={{ height: Normalize(70), width: Normalize(70), opacity: 0.7 }} >
                                                <Image source={images.calen} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                                                <View style={{ position: "absolute", height: "100%", width: "100%", zIndex: 1, alignItems: "center" }} >
                                                    <Text style={{
                                                        fontSize: Normalize(9),
                                                        fontFamily: 'roboto-bold',
                                                        color: Colors.white, paddingVertical: "11%"
                                                    }}>{language == "en" ? date_English(oldDate)[2] : date_Persian(oldDate)[2]}</Text>
                                                    <Text style={{
                                                        fontSize: Normalize(10),
                                                        fontFamily: 'roboto-medium',
                                                        color: Colors.greyText
                                                    }}>{language == "en" ? date_English(oldDate)[0] : date_Persian(oldDate)[0]}</Text>
                                                    <Text style={{
                                                        fontSize: Normalize(18),
                                                        fontFamily: 'roboto-medium',
                                                        color: Colors.greyText
                                                    }}>{language == "en" ? date_English(oldDate)[1] : date_Persian(oldDate)[1]}</Text>
                                                </View>
                                            </View>
                                            <View style={{ height: Normalize(13), marginTop: "8%" }} />

                                        </View>


                                        <View style={{ height: Normalize(25), width: Normalize(25) }} >
                                            <Image source={images.arrowrightgrey} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                        </View>


                                        {/* *********************new date**************** */}

                                        <View>
                                            <View style={{ height: Normalize(70), width: Normalize(70) }} >
                                                <Image source={images.calen} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                                                <View style={{ position: "absolute", height: "100%", width: "100%", zIndex: 1, alignItems: "center" }} >
                                                    <Text style={{
                                                        fontSize: Normalize(9),
                                                        fontFamily: 'roboto-bold',
                                                        color: Colors.white, paddingVertical: "11%"
                                                    }}>{language == "en" ? date_English(requesteddate)[2] : date_Persian(requesteddate)[2]}</Text>
                                                    <Text style={{
                                                        fontSize: Normalize(10),
                                                        fontFamily: 'roboto-medium',
                                                        color: Colors.greyText
                                                    }}>{language == "en" ? date_English(requesteddate)[0] : date_Persian(requesteddate)[0]}</Text>
                                                    <Text style={{
                                                        fontSize: Normalize(18),
                                                        fontFamily: 'roboto-medium',
                                                        color: Colors.greyText
                                                    }}>{language == "en" ? date_English(requesteddate)[1] : date_Persian(requesteddate)[1]}</Text>
                                                </View>
                                            </View>
                                            <View style={{ height: Normalize(13), width: Normalize(30), backgroundColor: Colors.green2, alignSelf: "center", borderRadius: 20, justifyContent: "center", alignItems: "center", marginTop: "8%" }} >
                                                <Text style={{
                                                    fontSize: Normalize(7),
                                                    fontFamily: 'roboto-bold',
                                                    color: Colors.white
                                                }}>{strings.TASKDETAILS.NEW}</Text>
                                            </View>

                                        </View>

                                    </View>

                                </View>
                                <View style={{ marginTop: Normalize(10) }} >

                                    <View style={{ height: Normalize(40), width: "100%", flexDirection: rowOrRowreverse(language), justifyContent: "space-between" }} >

                                        <TouchableOpacity
                                            onPress={() => {
                                                onpressRejectDate()
                                            }}
                                            style={{ height: "85%", width: "48%", backgroundColor: Colors.primary, borderRadius: 40, justifyContent: "center", alignItems: "center" }} >
                                            <Text style={{
                                                fontSize: Normalize(12),
                                                fontFamily: 'roboto-medium',
                                                color: Colors.white
                                            }}>{strings.MAKEANOFFER.DECLINE}</Text>
                                        </TouchableOpacity>

                                        {rejectdateModal && <WarningPage
                                            onPress={onpressRejectDate}
                                            ispress={rejectdateModal}
                                            warningTitle={language == 'en' ? 'Are you Sure?' : "آیا مطمئن هستید؟"}
                                            warningSubTitle={language == 'en' ? 'Are you sure you want to reject reschedule request?' : "آیا مطمئن هستید که می‌خواهید درخواست زمان‌بندی جدید را رد کنید؟"}
                                            okOnpress={() => rejectOrAccept("R")}
                                            buttonTitle="Decline"
                                            color={Colors.red_old}
                                            cancelOnpress={onpressRejectDate} />}



                                        <TouchableOpacity
                                            onPress={() => {
                                                onpressAcceptDate()
                                                // rejectOrAccept("A")
                                            }}
                                            style={{ height: "85%", width: "48%", backgroundColor: Colors.yellow, borderRadius: 40, justifyContent: "center", alignItems: "center" }} >
                                            <Text style={{
                                                fontSize: Normalize(12),
                                                fontFamily: 'roboto-medium',
                                                color: Colors.white
                                            }}>{strings.MAKEANOFFER.ACCEPTOFFER}</Text>
                                        </TouchableOpacity>

                                        {acceptDateModal && <WarningPage
                                            onPress={onpressAcceptDate}
                                            ispress={acceptDateModal}
                                            warningTitle={language == 'en' ? 'Are you Sure?' : "آیا مطمئن هستید؟"}
                                            warningSubTitle={language == 'en' ? 'Are you sure you want to accept reschedule request?' : "آیا مطمئن هستید که می‌خواهید درخواست زمان‌بندی جدید را بپذیرید؟"}
                                            okOnpress={() => rejectOrAccept("A")}
                                            buttonTitle="Accept"
                                            color={Colors.yellow}
                                            cancelOnpress={onpressAcceptDate} />}

                                    </View>
                                </View>
                            </Fragment>
                        </View>
                        <TouchableOpacity
                            onPress={onPress}
                            style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.white, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(10) }} >
                            <Entypo name="cross" color={Colors.textinput_inner_text} size={Normalize(35)} />
                        </TouchableOpacity>
                    </View>
            }
        </Modal>

    )
}
export default withRtl(ReviewScheduleRequestModal);
