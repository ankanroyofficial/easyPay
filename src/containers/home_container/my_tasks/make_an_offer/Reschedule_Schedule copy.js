import React, { useContext, useEffect, useState } from 'react'
import {
    View, Text, Modal, ScrollView, Image, TouchableOpacity, TextInput,
    Keyboard, Platform, KeyboardAvoidingView
} from 'react-native'
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Toast from 'react-native-simple-toast';
import { Colors } from '../../../../constants/colors';
import { useNavigation } from "@react-navigation/native"
import moment from 'moment';
import strings from '../../../../constants/lng/LocalizedStrings';
import Button from "../../../../components/Button";
import DateTimePickerModal from 'react-native-datepicker';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import axiosInstance from '../../../../constants/AxiosCallPage';
import { Fragment } from 'react';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
function Reschedule_Schedule({ ispress, onPress, taskSlugname, dueDate, reschedule_request_by, item }) {
      const date2 = new Date();
    const today = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate();
    const englishToday = new Date();
    const dueDateEnglish = moment(today, 'YYYY-MM-DD').format('MMM DD, YYYY');
    const englishTommorow = new Date();
    englishTommorow.setDate(englishTommorow.getDate() + 1);
    const d = new Date();
    d.setMonth(d.getMonth() + 6);
    const dd = d.toJSON().slice(0, 10);
    const after6Month = moment(dd, "YYYY-MM-DD").format("MMM DD, YYYY")
    const { language } = useRtlContext();
    const [submitButtonLoader, setSubmitButtonLoader] = useState(false)
    const [description, setDescription] = useState(reschedule_request_by == "tasker" ? item == null ? "" : item.reschedule_reason : "")
    const [tempDate, setTempDate] = useState("")
    const [showDate, setShowDate] = useState("")
    const [apiDate, setApiDate] = useState("")

    const getTokon = async () => {
        try {
            if (item != null) {
                var val = item.reschedule_date
                let a = moment(val, 'YYYY-MM-DD').format('DD-MM-YYYY')
                setApiDate(a)
                let b = moment(val, 'YYYY-MM-DD').format('MMM DD, YYYY')
                setShowDate(b)
            } else {
                date_in_english(dueDateEnglish)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getTokon()
    }, []);
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
            onRequestClose={onPress}
        >
            <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", justifyContent: "center", alignItems: "center" }} >
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
                            <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(16), marginVertical: Normalize(10), fontFamily: fontfmliy.bold }]}>Reschedule Task</Text>
                            <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(12.5), lineHeight: Normalize(13), marginBottom: Normalize(15), fontFamily: fontfmliy.regular, textAlign: "center" }]}>You can reschedule your task date</Text>

                        </View>
                        {/* *****************date********** */}
                        <View style={{ width: "100%", paddingBottom: Normalize(10) }}>
                            <Text style={[globalstyles.plantext_bold, {
                                paddingBottom: Normalize(6),
                                fontSize: Normalize(13),
                                color: Colors.primary,
                                textAlign: "left"
                            }]}  >{strings.MAKEANOFFER.WHATISYOURDATE}</Text>
                            <View style={{ backgroundColor: Colors.yellowBackground, height: Normalize(40), width: "100%", borderRadius: 5, elevation: 0.5, flexDirection: "row-reverse" }} >
                                <View
                                    style={{ height: Normalize(40), width: Normalize(40), justifyContent: "center", alignItems: "center" }} >
                                    <MaterialCommunityIcons name="calendar-month" color={Colors.primary} size={Normalize(20)} />
                                </View>
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
                                                    color: Colors.primary,
                                                    fontFamily: fontfmliy.regular,
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
                                </View>
                            </View>
                        </View>
                        {/* *******************reason************ */}
                        <View style={{  }} >
                            <Text style={[globalstyles.plantext_bold, {
                                paddingBottom: Normalize(6),
                                fontSize: Normalize(13),
                                color: Colors.primary,
                                textAlign: "left"
                            }]}  >{strings.MAKEANOFFER.ENTERAREASON}</Text>

                            <View style={{ width: "100%", height: Normalize(90), borderRadius: 6, marginVertical: "4%", borderColor: "#E8E8E8", borderWidth: Normalize(1), borderRadius: 5 }} >
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        value={description}
                                        onChangeText={(e) => setDescription(e)}
                                        placeholder={strings.MAKEANOFFER.ENTERHERE}
                                        placeholderTextColor={Colors.grey}
                                        multiline
                                        style={{ height: '100%', width: "100%", textAlign:  "left", padding: Normalize(8), color: Colors.primary,backgroundColor:Colors.yellowBackground ,textAlignVertical:"top"}}
                                        onSubmitEditing={() => { Keyboard.dismiss() }}
                                    />
                                </View>
                            </View>
                        </View>
                        {/* <Text style={[globalstyles.plantext_regular, { color: Colors.primary, fontSize: Normalize(12.5), lineHeight: Normalize(13), marginVertical: Normalize(10), fontFamily: fontfmliy.regular, textAlign: "center" }]}>You will receive a notification when ABC confirms your task start date/time</Text> */}
                        <Button
                            style={{ marginHorizontal: Normalize(5), marginTop: Normalize(10), backgroundColor: Colors.primary }}
                            disabled={submitButtonLoader}
                            name={strings.MAKEANOFFER.SUBMIT}
                            onPress={submitButton} />
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
export default withRtl(Reschedule_Schedule);
