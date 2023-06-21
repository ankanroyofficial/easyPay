
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {
    View, Text, Modal, ScrollView, Image, TouchableOpacity, TextInput,
    ActivityIndicator, Keyboard, Platform, KeyboardAvoidingView
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
import DateTimePickerModal from 'react-native-datepicker';
import { questionPersianTimeShow } from '../../../../constants/DateShow';
import { axiosUrl } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import { leftOrRight } from '../../../../constants/RowOrRowreverse';
function Reschedule_Schedule({ ispress, onPress, taskSlugname, dueDate, reschedule_request_by, item }) {
    // console.log(item)

    var date2 = new Date();
    var today = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate();
    let a = new Date().toJSON().slice(0, 10)
    let dueDatePersian = moment(today, 'YYYY-MM-DD').locale('fa').format('YYYY-MM-DD');
    var englishToday = new Date();
    let dueDateEnglish = moment(today, 'YYYY-MM-DD').format('MMM DD, YYYY');
    var englishTommorow = new Date();
    englishTommorow.setDate(englishTommorow.getDate() + 1);
    var d = new Date();
    d.setMonth(d.getMonth() + 6);
    var dd = d.toJSON().slice(0, 10);
    var after6Month = moment(dd, "YYYY-MM-DD").format("MMM DD, YYYY")
    let after6Month_pr = moment(dd, 'YYYY-MM-DD').locale('fa').format('YYYY-MM-DD');

    const navigation = useNavigation()
    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
    const [token, setToken] = useState("");
    const [slugName, setSlugName] = useState("")
    const [submitButtonLoader, setSubmitButtonLoader] = useState(false)
    const [description, setDescription] = useState(reschedule_request_by == "tasker" ? item == null ? "" : item.reschedule_reason : "")
    const [parsiandatePickerFrom, setParsiandatePickerFrom] = useState(false);
    const [tempDate, setTempDate] = useState(language == "en" ? "" : dueDatePersian)
    const [showDate, setShowDate] = useState("")
    const [apiDate, setApiDate] = useState("")

    const getTokon = async () => {
        try {
            // setLoader(true)
            let token = await AsyncStorage.getItem("token");
            let slug = await AsyncStorage.getItem("slug");

            setToken(token)
            setSlugName(slug)

            if (language == "pr") {
                if (item != null) {

                    var val = item.reschedule_date
                    // console.log("val",val)
                    let date1 = moment(val, 'YYYY-MM-DD').format('DD-MM-YYYY');
                    const a = val.substr(0, 10)
                    let test = moment(a, 'YYYY-MM-DD').locale('fa').format('DD-MM-YYYY');
                    let testDateMonth = moment(a, 'DD-MM-YYYY').locale('fa').format('jMMMM');
                    let testdateSplit = test.split("-")
                    var removeZero = testdateSplit[0]
                    if (removeZero[0] == 0) {
                        var finalDate = engToPersian(removeZero[1]) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
                    } else {
                        var finalDate = engToPersian(testdateSplit[0]) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
                    }
                    setApiDate(date1)
                    setShowDate(questionPersianTimeShow(val))
                } else {
                    date_in_Parsian(dueDatePersian)
                }
            } else {
                if (item != null) {
                    var val = item.reschedule_date
                    let a = moment(val, 'YYYY-MM-DD').format('DD-MM-YYYY')
                    setApiDate(a)
                    let b = moment(val, 'YYYY-MM-DD').format('MMM DD, YYYY')
                    setShowDate(b)
                } else {
                    date_in_english(dueDateEnglish)
                }
            }

            // setLoader(false)
        } catch (error) {
            console.log(error)
            // setLoader(false)
        }
    }
    useEffect(() => {
        getTokon()
    }, []);
    const date_in_Parsian = (val) => {
        // console.log("444",val)
        try {
            if (tempDate.length > 0) {
                let getDate = moment.from(val, 'fa', 'YYYY-MM-DD').format('DD-MM-YYYY'); //output:  1989/01/24
                let test = moment(getDate, 'DD-MM-YYYY').locale('fa').format('DD-MM-YYYY');

                let getDate2 = moment(getDate, 'DD-MM-YYYY').format('YYYY-MM-DD');

                let testDateMonth = moment(getDate, 'DD-MM-YYYY').locale('fa').format('jMMMM');
                let testdateSplit = test.split("-")
                var removeZero = testdateSplit[0]
                if (removeZero[0] == 0) {
                    finalDate = engToPersian(removeZero[1]) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
                } else {
                    finalDate = engToPersian(testdateSplit[0]) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
                }
                setApiDate(getDate)

                // setShowDate(finalDate)

                setShowDate(questionPersianTimeShow(getDate2))

                setParsiandatePickerFrom(false)

            } else {
                Toast.show(strings.ERROR.PLEASESELECTADATE)
            }
        } catch (error) {
            console.log("date_in_Parsian", error)
        }
    }
    const date_in_english = (val) => {
        try {
            let m = moment(val, 'MMM DD, YYYY').format('DD-MM-YYYY');
            setApiDate(m)
            setShowDate(val)
        } catch (error) {
            console.log("date_in_english", error)
        }
    }
    const submitButton = async () => {
        try {
            if (apiDate.length == 0) {
                Toast.show("enter date")
            } else {
                setSubmitButtonLoader(true)
                Keyboard.dismiss()
                var d = description
                const data = reschedule_request_by == "poster" ?
                    {
                        "params": {
                            "slug": taskSlugname,
                            "reschedule_request_id": "",
                            "reschedule_date": apiDate,
                            "reschedule_reason": d
                        }
                    }
                    :
                    reschedule_request_by == "tasker" && item == null ?
                        {
                            "params": {
                                "slug": taskSlugname,
                                "reschedule_date": apiDate,
                                "reschedule_reason": d
                            }
                        } :
                        item.status == "I" &&
                        {
                            "params": {
                                "slug": taskSlugname,
                                "reschedule_request_id": item.id,
                                "reschedule_date": apiDate,
                                "reschedule_reason": d
                            }
                        }
                const res = await axiosInstance.post("reschedule-task", data)
                if (res.data.success) {
                    Toast.show(res.data.success.meaning)
                    onPress()
                } else {
                    Toast.show(res.data.error.meaning)
                }
                setTempDate("")
                setSubmitButtonLoader(false)
            }
        } catch (error) {
            setSubmitButtonLoader(false)
            console.log("reschedule_submitButton------", error)
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
            <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", padding: Normalize(15), justifyContent: "center" }} >
                <View style={{ backgroundColor: Colors.white, borderRadius: Normalize(8), paddingBottom: "2%" }} >
                    <ScrollView
                        keyboardShouldPersistTaps="always"
                        showsVerticalScrollIndicator={false} >
                        <View style={{ height: Normalize(50), backgroundColor: Colors.primary, width: "100%", flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#E8E8E8", borderBottomWidth: 1 }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                <Text style={{
                                    fontSize: Normalize(14),
                                    fontFamily: 'roboto-bold',
                                    color: Colors.white
                                }}>{strings.MAKEANOFFER.RESCHEDULETASK}</Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={{ height: Normalize(50), width: Normalize(50), justifyContent: "center", alignItems: "center" }} >
                                <Image source={images.cross} style={{ height: Normalize(12), width: Normalize(12), resizeMode: "contain" }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{}} >
                            <View style={{ padding: Normalize(8) }} >
                                <View style={{ width: "100%", paddingBottom: Normalize(10) }}>
                                    <Text style={{
                                        paddingVertical: Normalize(8),
                                        fontSize: Normalize(14),
                                        fontFamily: 'roboto-regular',
                                        color: Colors.primary,
                                        textAlign: language == "en" ? "left" : "right"
                                    }}  >{strings.MAKEANOFFER.WHATISYOURDATE}</Text>
                                    <View style={{ height: Normalize(40), width: "100%", borderRadius: 5, borderColor: "#D8D8D8", borderWidth: Normalize(1), flexDirection: language == "pr" ? "row" : "row-reverse" }} >
                                        <View
                                            style={{ height: Normalize(39), width: Normalize(40), justifyContent: "center", alignItems: "center", opacity: 0.8, borderRightColor: "#D8D8D8", borderRightWidth: language == "pr" ? 1 : 0, borderLeftColor: "#D8D8D8", borderLeftWidth: language == "pr" ? 0 : 1 }} >
                                            <View style={{ height: Normalize(18), width: Normalize(18) }} >
                                                <Image source={images.calenderr} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                            </View>
                                        </View>
                                        {/* <View style={{ flex: 1, paddingHorizontal: "3%" }} > */}

                                        {/* *****************date********** */}

                                        <View style={{ borderRadius: 4, flex: 1, paddingHorizontal: "3%", }}>
                                            <View style={{ width: "80%", flexDirection: "row", alignItems: "center" }} >
                                                <DateTimePickerModal
                                                    style={{
                                                        alignSelf: 'center',
                                                        width: "100%",
                                                        height: "100%",
                                                        justifyContent: "center"
                                                    }}
                                                    mode="date"
                                                    // hideText
                                                    showIcon={false}
                                                    placeholder={showDate ? showDate : strings.POSTTASK.SELECTDATE}
                                                    customStyles={{
                                                        dateInput: {
                                                            borderWidth: 0, paddingHorizontal: "3%",
                                                            alignItems: language == "en" ? "flex-start" : "flex-end"
                                                        },
                                                        placeholderText: {
                                                            fontSize: Normalize(13),
                                                            color: Colors.grey,
                                                            fontFamily: 'roboto-regular',
                                                        }
                                                    }}
                                                    format="MMM DD, YYYY"
                                                    confirmBtnText="Confirm"
                                                    minDate={englishToday}
                                                    maxDate={after6Month}
                                                    cancelBtnText={strings.POSTTASK.CANCEL}
                                                    onDateChange={(date) => {
                                                        date_in_english(date)
                                                    }}
                                                />
                                            </View>

                                            <Modal
                                                animationType="none"
                                                visible={parsiandatePickerFrom}
                                                transparent={true}
                                                onRequestClose={() => {
                                                    setParsiandatePickerFrom(false)
                                                }}
                                            >
                                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(52, 52, 52, 0.3)" }} >
                                                </View>
                                            </Modal>

                                        </View>

                                        {/* </View> */}
                                    </View>
                                </View>
                            </View>


                        </View>
                        <View style={{ padding: Normalize(8) }} >
                            <Text style={{
                                fontSize: Normalize(14),
                                fontFamily: 'roboto-regular',
                                color: Colors.primary,
                                textAlign: language == "en" ? "left" : "right"
                            }} >{strings.MAKEANOFFER.ENTERAREASON}</Text>

                            <View style={{ width: "100%", height: Normalize(120), borderRadius: 6, marginVertical: "4%", borderColor: "#E8E8E8", borderWidth: Normalize(1), borderRadius: 5 }} >
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        value={description}
                                        onChangeText={(e) => setDescription(e)}
                                        placeholder={strings.MAKEANOFFER.ENTERHERE}
                                        multiline
                                        style={{ height: '100%', width: "100%", textAlign: language == "en" ? "left" : "right", padding: "2%", color: '#000', textAlignVertical: "top" }}
                                        onSubmitEditing={() => { Keyboard.dismiss() }}
                                    />
                                </View>
                            </View>
                        </View>
                        <Button
                            style={{ marginHorizontal: Normalize(8) }}
                            disabled={submitButtonLoader ? true : false}
                            name={submitButtonLoader ? "" : strings.MAKEANOFFER.SUBMIT}
                            onPress={submitButton}
                        >
                            {
                                submitButtonLoader &&
                                <ActivityIndicator
                                    size="small"
                                    color={Colors.white}
                                />
                            }
                        </Button>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>

        </Modal>

    )
}
export default withRtl(Reschedule_Schedule);
