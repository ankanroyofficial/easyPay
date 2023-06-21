import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Modal, PermissionsAndroid, Platform, ActivityIndicator, } from 'react-native';
import { useRtlContext } from 'react-native-easy-localization-and-rtl';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import Normalize from '../../../../helpers/Dimens';
import styles from './Styles';
import strings from '../../../../constants/lng/LocalizedStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import { leftOrRight, rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import Toast from 'react-native-simple-toast';
import DateTimePickerModal from 'react-native-datepicker';
import { nameShorting } from '../../../../constants/NameShorting';
import { questionPersianTimeShow, showDate_en } from '../../../../constants/DateShow';
import RNFetchBlob from 'rn-fetch-blob';
import { navigateTo } from '../../../../constants/NavigationToProfile';
import { myContext } from '../../../../constants/ContextApi';
import { getTransactionNote } from '../../../../constants/NotesConvert';
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import { engToPersian } from '../../../../constants/EnglishToPersian';
import { whichFontFamily } from '../../../../constants/WhichFontFamily';
import Button from '../../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
export default function Range_Page(props) {
    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
    const navigation = useNavigation()

    const { token, ph_email_verify, setPh_email_verify } = useContext(myContext);
    const [layoutVisible, setLayoutVisible] = useState(props.route.params.earnOrOut);
    const [userId, setUserId] = useState("");
    const [p_data_e, setP_data_e] = useState([]);
    const [p_data_o, setP_data_o] = useState([]);

    const [range_data_e, setRange_data_e] = useState([]);
    const [range_data_o, setRange_data_o] = useState([]);


    const [earned, setEarned] = useState("");
    const [outgoing, setOutgoing] = useState("");
    const [loader, setLoader] = useState(false);
    // const [earnOroutgoing, setEarnOroutgoing] = useState("earn")
    const [allOrRange, setAllorRange] = useState("all")
    // const [d, setD] = useState(0);
    const [tempDate, setTempDate] = useState("")


    const [from_tempDate, setFrom_tempDate] = useState("")
    const [to_tempDate, setTo_TempDate] = useState("")



    const [toDateShow, setToDateShow] = useState("")
    const [fromDateShow, setFromDateShow] = useState("")
    const [parsiandatePickerFrom, setParsiandatePickerFrom] = useState(false);
    const [parsiandatePickerTo, setParsiandatePickerTo] = useState(false);
    const [from_date, setFrom_date] = useState("");
    const [to_date, setTo_date] = useState("");
    const [dropDown, setDropDown] = useState(false)
    const [totOutgoing, setTotOutgoing] = useState("")
    const [totEarn, setTotEarn] = useState("")
    const [total_pageno_earn, setTotal_pageno_earn] = useState("1")
    const [temp_pageno_earn, setTemp_pageno_earn] = useState(1)
    const [total_pageno_outgoing, setTotal_pageno_outgoing] = useState("1")
    const [temp_pageno_outgoing, setTemp_pageno_outgoing] = useState(1)

    const [earn_first_last_data, setEarn_first_last_data] = useState([])
    const [outGoing_first_last_data, setOutGoing_first_last_data] = useState([])



    const addZero = (val) => {
        if (val < 10) {
            return "0" + val
        } else {
            return val
        }
    }
    var date2 = new Date();
    var today = date2.getFullYear() + '-' + (addZero(date2.getMonth() + 1)) + '-' + addZero(date2.getDate());
    let a = new Date().toJSON().slice(0, 10).split('-').reverse().join('/');
    let todayPersian = moment(a, 'DD/MM/YYYY').locale('fa').format('YYYY-MM-DD');
    var englishTommorow = new Date();
    englishTommorow.setDate(englishTommorow.getDate() + 1);
    const [trans_from_date, setTrans_from_date] = useState("2022-02-12")
    const [trans_to_date, setTrans_to_date] = useState(today)
    useEffect(() => {
        getTokon()
    }, []);
    const getTokon = async () => {
        try {
            let id = await AsyncStorage.getItem("userid");
            setUserId(id)
        } catch (error) {
            console.log(error)
        }
    }
    const P_data_e_RendenItem = ({ item, index }) => (
        <View key={index} style={styles.containerAssigned}>
            <View style={{ flexDirection: 'column', marginHorizontal: 15 }}>
                <View style={{ flexDirection: rowOrRowreverse(language), justifyContent: 'space-between' }}>
                    <Text style={styles.text1}>{language == "en" ? moment(item.created_at, 'YYYY-MM-DD').format('Do MMMM, YYYY') : questionPersianTimeShow(item.created_at)}</Text>
                </View>
                <Text style={[styles.text4, { textAlign: leftOrRight(language) }]}>
                    {language == "en" ? item.notes : getTransactionNote(item.notes, language)}
                </Text>
                <View style={{ flexDirection: rowOrRowreverse(language), marginBottom: Normalize(10) }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 25, alignSelf: 'center' }}
                        source={{ uri: ImageLink.ProfilePhoto + item.get_task.get_user.profile_picture }}
                        resizeMode="cover" />
                    <View style={{ marginHorizontal: 10, width: "85%" }} >
                        <Text
                            numberOfLines={1}style={{ color: Colors.primary, fontFamily: 'roboto-medium', fontSize: Normalize(12), textAlign: leftOrRight(language) }}> {item.get_task.title} </Text>
                        <Text style={{ color: Colors.greyText, fontFamily: 'roboto-medium', fontSize: Normalize(12), textAlign: leftOrRight(language) }}> {strings.PAYMENTHISTORY.ASSIGNEDBY} <Text onPress={() => { navigateTo(item.get_task.get_user.slug, navigation) }} style={{ color: Colors.primary }} >{nameShorting(item.get_task.get_user.fname + " " + item.get_task.get_user.lname)}</Text> </Text>
                        <View style={{ flexDirection: rowOrRowreverse(language), justifyContent: 'space-between', }}>
                            <Text style={{ width: '55%', fontSize: Normalize(12), textAlign: leftOrRight(language) }}></Text>

                            <View style={{ flexDirection: rowOrRowreverse(language), marginTop: Normalize(3) }}>
                                {layoutVisible == "outgoing" ? (
                                    <Text style={{ fontFamily: 'roboto-medium', fontSize: Normalize(12) }}>{strings.PAYMENTHISTORY.CREDIT} : </Text>
                                ) : (
                                    <Text style={{ fontFamily: 'roboto-medium', fontSize: Normalize(12) }}>{strings.PAYMENTHISTORY.CREDIT} : </Text>)}
                                <Text style={{ fontFamily: 'roboto-medium', fontSize: Normalize(12), color: Colors.primary }}>{strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian((Math.round(item.amount)), language)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
    const p_data_o_renderItem = ({ item, index }) => (
        <View key={index} style={styles.containerAssigned}>
            <View style={{ flexDirection: 'column', marginHorizontal: 15 }}>
                <View style={{ flexDirection: rowOrRowreverse(language), justifyContent: 'space-between' }}>
                    <Text style={styles.text1}>{language == "en" ? moment(item.created_at, 'YYYY-MM-DD').format('Do MMMM, YYYY') : questionPersianTimeShow(item.created_at)}</Text>

                </View>
                <Text style={[styles.text4, { textAlign: leftOrRight(language) }]}>{language == "en" ? item.notes : getTransactionNote(item.notes, language)}</Text>
                <View style={{ flexDirection: rowOrRowreverse(language), marginBottom: Normalize(10) }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 25, alignSelf: 'center' }}
                        source={{ uri: ImageLink.ProfilePhoto + item.get_task.get_award_bid.get_user.profile_picture }}
                        resizeMode="cover" />
                    <View style={{ marginHorizontal: 10, width: "85%" }} >
                        <Text numberOfLines={1}
                             style={{ color: Colors.primary, fontFamily: 'roboto-medium', fontSize: Normalize(12), textAlign: leftOrRight(language) }}> {item.get_task.title} </Text>

                        <Text style={{ color: Colors.greyText, fontFamily: 'roboto-medium', fontSize: Normalize(12), textAlign: leftOrRight(language) }}> {strings.PAYMENTHISTORY.ASSIGNEDTO} <Text
                            onPress={() => { navigateTo(item.get_task.get_award_bid.get_user.slug, navigation) }}
                            style={{ color: Colors.primary }} >{nameShorting(item.get_task.get_award_bid.get_user.fname + " " + item.get_task.get_award_bid.get_user.lname)}</Text> </Text>



                        <View style={{ flexDirection: rowOrRowreverse(language), justifyContent: 'space-between', }}>
                            <Text style={{ width: '55%', fontSize: Normalize(12), textAlign: leftOrRight(language) }}></Text>


                            <View style={{ flexDirection: rowOrRowreverse(language), marginTop: Normalize(3) }}>
                                {layoutVisible == "outgoing" ? (
                                    <Text style={{ fontFamily: 'roboto-medium', fontSize: Normalize(12) }}>{strings.PAYMENTHISTORY.CREDIT} :</Text>
                                ) : (
                                    <Text style={{ fontFamily: 'roboto-medium', fontSize: Normalize(12) }}>{strings.PAYMENTHISTORY.CREDIT} :</Text>)}
                                <Text style={{ fontFamily: 'roboto-medium', fontSize: Normalize(12), color: Colors.primary }}>{strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian((Math.round(item.amount)), language)} </Text>
                            </View>

                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
    const from_date_select = (val) => {
        let m = moment(val, 'MMM DD, YYYY').format('DD-MM-YYYY');
        let m2 = moment(val, 'MMM DD, YYYY').format('YYYY-MM-DD');
        setFrom_date(m)
        setTrans_from_date(m2)
        setFromDateShow(val)
        // rangeSearch(m, to_date)
    }
    const to_date_select = (val) => {
        let m = moment(val, 'MMM DD, YYYY').format('DD-MM-YYYY');
        let m2 = moment(val, 'MMM DD, YYYY').format('YYYY-MM-DD');
        setTo_date(m)
        setTrans_to_date(m2)
        setToDateShow(val)
        // rangeSearch(from_date, m)
    }
    const From_dateParsian = (val) => {
        if (val) {
            let getDate = moment.from(val, 'fa', 'YYYY-MM-DD').format('DD-MM-YYYY'); //output:  1989/01/24
            let test = moment(getDate, 'DD-MM-YYYY').locale('fa').format('DD-MM-YYYY');
            let testDateMonth = moment(getDate, 'DD-MM-YYYY').locale('fa').format('jMMMM');
            // console.log("From_dateParsian", getDate)
            setFrom_date(getDate)
            let testdateSplit = test.split("-")
            var finalDate = engToPersian(testdateSplit[0]) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
            // setTempDate("")
            setFromDateShow(finalDate)
            setParsiandatePickerFrom(false)
        } else {
            Toast.show(strings.ERROR.PLEASESELECTADATE)
        }
    }
    const To_dateParsian = (val) => {
        if (val) {
            let getDate = moment.from(val, 'fa', 'YYYY-MM-DD').format('DD-MM-YYYY'); //output:  1989/01/24
            let test = moment(getDate, 'DD-MM-YYYY').locale('fa').format('DD-MM-YYYY');
            let testDateMonth = moment(getDate, 'DD-MM-YYYY').locale('fa').format('jMMMM');
            setTo_date(getDate)
            let testdateSplit = test.split("-")
            var finalDate = engToPersian(testdateSplit[0]) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
            // setTempDate("")
            setToDateShow(finalDate)
            setParsiandatePickerTo(false)
        } else {
            Toast.show(strings.ERROR.PLEASESELECTADATE)
        }
    }
    const onpress_fromDate_modal = () => {
        setParsiandatePickerFrom(!parsiandatePickerFrom)
    }
    const onpress_toDate_modal = () => {
        setParsiandatePickerTo(!parsiandatePickerTo)
    }
    const rangeSearch = async (from_val, to_val) => {
        try {
            setLoader(true)
            const res = {
                "params": {
                    "page": 1,
                    "select_range_earned": "R",
                    "earned_from_date": from_val,
                    "earned_to_date": to_val,
                    "outgoing_from_date": from_val,
                    "outgoing_to_date": to_val
                }
            }
            const data = await axiosInstance.post("payment-history", res)
            // console.log("from_val--", from_val, "  to_val----", to_val)
            // console.log(data.data.result)
            if (data.data.result) {
                setTotal_pageno_earn(data.data.result.earned_transactions_count)
                setTotal_pageno_outgoing(data.data.result.outgoing_transactions_count)
                setRange_data_e(data.data.result.earned_transactions)
                setRange_data_o(data.data.result.outgoing_transactions)
                setEarned(data.data.result.earned_transactions_sum)
                setOutgoing(data.data.result.outgoing_transactions_sum)
                setTotOutgoing(data.data.result.outgoing_transactions_tot)
                setTotEarn(data.data.result.earned_transactions_tot)


                setEarn_first_last_data([data.data.result.earned_transactions_first, data.data.result.earned_transactions_last])
                setOutGoing_first_last_data([data.data.result.outgoing_transactions_first, data.data.result.outgoing_transactions_last])

                setLoader(false)
            }
        } catch (error) {
            console.log("rangeSearch", error)
        }
    }
    const fileUrl = (val) => {
        try {
            if (val == "outgoing") {
                return `${axiosUrl.URL}outgoing-payment-history?user_id=${userId}&select_range_earned=${allOrRange == "all" ? "A" : "R"}&earned_from_date=${from_date}&earned_to_date=${to_date}&lang=${language === "en" ? "en" : "fa"}`
            } else {
                return `${axiosUrl.URL}earned-payment-history?user_id=${userId}&select_range_earned=${allOrRange == "all" ? "A" : "R"}&earned_from_date=${from_date}&earned_to_date=${to_date}&lang=${language === "en" ? "en" : "fa"}`
            }
        } catch (error) {
            console.log("rangeSearch", error)
        }
    }
    const checkPermission = async () => {
        if (Platform.OS === 'ios') {
            downloadFile();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'Application needs access to your storage to download File',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Start downloading
                    Toast.show(strings.PAYMENTHISTORY.DOWNLOADING)
                    downloadFile();
                    // console.log('Storage Permission Granted.');
                } else {
                    // If permission denied then show alert
                    Alert.alert('Error', 'Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.log("++++" + err);
            }
        }
    }
    const pathUrl = (val, RootDir) => {
        try {
            let date = new Date();
            if (val == "outgoing") {
                return RootDir + `/outgoing-payment-history_` + Math.floor(date.getTime() + date.getSeconds() / 2) + ".xls"
            } else {
                return RootDir + '/earned-payment-history_' + Math.floor(date.getTime() + date.getSeconds() / 2) + ".xls"
            }
        } catch (error) {
            console.log("fileUrl", error)
        }
    }
    const downloadFile = () => {
        let FILE_URL = fileUrl(layoutVisible);
        let file_ext = getFileExtention(FILE_URL);

        // console.log(FILE_URL)

        file_ext = '.' + file_ext[0];
        const { config, fs } = RNFetchBlob;

        let RootDir = fs.dirs.DownloadDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                path: pathUrl(layoutVisible, RootDir),
                description: 'downloading file...',
                notification: true,
                // useDownloadManager works with Android only
                useDownloadManager: true,
            },
        };
        config(options)
            .fetch('GET', FILE_URL)
            .then(res => {
                // Alert after successful downloading
                // console.log('res -> ', JSON.stringify(res));
                Toast.show(strings.PAYMENTHISTORY.DOWNLOADSUCCESSFULLY);
            }).catch(err => {
                console.log("err", err)
            })


    };
    const getFileExtention = fileUrl => {
        return /[.]/.exec(fileUrl) ?
            /[^.]+$/.exec(fileUrl) : undefined;
    };
    const onpressNextButton_earn = () => {
        var a = temp_pageno_earn
        var b = a + 1
        console.log(b)
        get_listingData_after_NxtOrPre_earn(b, from_date, to_date)
        setTemp_pageno_earn(b)
    }
    const onpressPreviousButton_earn = () => {
        var a = temp_pageno_earn
        var b = a - 1
        get_listingData_after_NxtOrPre_earn(b, from_date, to_date)
        setTemp_pageno_earn(b)
    }
    const onpressNextButton_outgoing = () => {
        var a = temp_pageno_outgoing
        var b = a + 1
        get_listingData_after_NxtOrPre_outoging(b, from_date, to_date)
        setTemp_pageno_outgoing(b)
    }
    const onpressPreviousButton_outgoing = () => {
        var a = temp_pageno_outgoing
        var b = a - 1
        get_listingData_after_NxtOrPre_outoging(b, from_date, to_date)
        setTemp_pageno_outgoing(b)
    }
    const get_listingData_after_NxtOrPre_earn = async (val, from_val, to_val) => {
        try {
            // setLoader(true)
            const res = {
                "params": {
                    "page": val,
                    "select_range_earned": "R",
                    "earned_from_date": from_val,
                    "earned_to_date": to_val,
                    "outgoing_from_date": from_val,
                    "outgoing_to_date": to_val
                }
            }
            const data = await axiosInstance.post("payment-history", res)
            if (data.data.result) {
                setTotal_pageno_earn(data.data.result.earned_transactions_count)
                setRange_data_e(data.data.result.earned_transactions)
                setEarned(data.data.result.earned_transactions_sum)
                setTotEarn(data.data.result.earned_transactions_tot)
                setEarn_first_last_data([data.data.result.earned_transactions_first, data.data.result.earned_transactions_last])
            }
        } catch (error) {
            console.log(error)
        }
    }
    const get_listingData_after_NxtOrPre_outoging = async (val, from_val, to_val) => {
        try {
            const res = {
                "params": {
                    "page": val,
                    "select_range_earned": "R",
                    "earned_from_date": from_val,
                    "earned_to_date": to_val,
                    "outgoing_from_date": from_val,
                    "outgoing_to_date": to_val
                }
            }
            const data = await axiosInstance.post("payment-history", res)
            // console.log(val)
            if (data.data.result) {
                setTotal_pageno_outgoing(data.data.result.outgoing_transactions_count)
                setRange_data_o(data.data.result.outgoing_transactions)
                setOutgoing(data.data.result.outgoing_transactions_sum)
                setTotOutgoing(data.data.result.outgoing_transactions_tot)
                // setEarn_first_last_data([data.data.result.earned_transactions_first, data.data.result.earned_transactions_last])
                setOutGoing_first_last_data([data.data.result.outgoing_transactions_first, data.data.result.outgoing_transactions_last])
                // setLoader(false)
            }
        } catch (error) {
            // setLoader(false)
            console.log(error)
        }
    }
    const RangePage_Header = () => {
        return (
            <View style={{ flex: 1 }} >
                {/* *****************from_date********** */}
                <Text style={[globalstyles.blue_Text, { marginVertical: Normalize(8) }]}>{strings.PAYMENTHISTORY.RANGE}</Text>
                <Text style={globalstyles.textinput_Header_Style}>{strings.BROWSEFILTER.FROM}</Text>
                <View style={[globalstyles.textinput_onlyBox_Style, {}]}>
                    <View style={{ flexDirection: language == "en" ? 'row' : "row-reverse", alignItems: "center" }} >
                        <View style={{ height: Normalize(13), width: Normalize(13), marginHorizontal: Normalize(10) }}>
                            <Image source={images.calander} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                        </View>
                    </View>
                    <View style={{ width: "80%", flexDirection: "row", alignItems: "center" }} >
                        <DateTimePickerModal
                            style={styles.datePickerStyle}
                            mode="date"
                            // hideText
                            showIcon={false}
                            placeholder={
                                from_date ? fromDateShow : strings.POSTTASK.SELECTDATE
                            }
                            customStyles={{
                                dateInput: {
                                    borderWidth: 0, paddingHorizontal: "3%",
                                    alignItems: language == "en" ? "flex-start" : "flex-end"
                                },
                                placeholderText: {
                                    fontSize: Normalize(12),
                                    color: Colors.grey,
                                    fontFamily: 'roboto-regular',
                                }

                            }}
                            format="MMM DD, YYYY"
                            confirmBtnText="Confirm"
                            minDate={"01-01-1950"}
                            cancelBtnText={strings.POSTTASK.CANCEL}
                            onDateChange={(date) => {
                                from_date_select(date)
                            }}
                        />
                        <View style={{ height: Normalize(10), width: Normalize(5), transform: [{ rotate: '90deg' }], marginHorizontal: Normalize(7) }}>
                            <Image source={require("../../../../../assets/rightarrow.png")} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                        </View>
                    </View>

                    {parsiandatePickerFrom && <Modal_From_date />}
                </View>
                {/* *****************to_date********** */}
                <Text style={globalstyles.textinput_Header_Style}>{strings.BROWSEFILTER.TO}</Text>
                <View
                    style={[globalstyles.textinput_onlyBox_Style, { marginBottom: Normalize(20) }]}>
                    <View style={{ flexDirection: language == "en" ? 'row' : "row-reverse", alignItems: "center" }} >
                        <View style={{ height: Normalize(13), width: Normalize(13), marginHorizontal: Normalize(10) }}>
                            <Image source={images.calander} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                        </View>
                    </View>

                    <View style={{ width: "80%", flexDirection: "row", alignItems: "center" }} >
                        <DateTimePickerModal
                            style={styles.datePickerStyle}
                            mode="date"
                            // hideText
                            showIcon={false}
                            placeholder={
                                to_date ? toDateShow : strings.POSTTASK.SELECTDATE
                            }
                            customStyles={{
                                dateInput: {
                                    borderWidth: 0, paddingHorizontal: "3%",
                                    alignItems: language == "en" ? "flex-start" : "flex-end"
                                },
                                placeholderText: {
                                    fontSize: Normalize(12),
                                    color: Colors.grey,
                                    fontFamily: 'roboto-regular',
                                }
                            }}
                            format="MMM DD, YYYY"
                            confirmBtnText="Confirm"
                            minDate={from_date ? moment(from_date, 'DD-MM-YYYY').format('MMM DD, YYYY') : "01-01-1950"}
                            cancelBtnText={strings.POSTTASK.CANCEL}
                            onDateChange={(date) => {
                                to_date_select(date)
                            }}
                        />
                        <View style={{ height: Normalize(10), width: Normalize(5), transform: [{ rotate: '90deg' }], marginHorizontal: Normalize(7) }}>
                            <Image source={require("../../../../../assets/rightarrow.png")} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                        </View>
                    </View>
                </View>

                {parsiandatePickerTo && <Modal_To_date />}

                <Button
                    disabled={loader ? true : false}
                    activeOpacity={0.8}
                    name={loader ? "" : strings.HELP.SEARCH}
                    style={{ width: "70%", alignSelf: "center" }}
                    onPress={() => { rangeSearch(from_date, to_date) }}
                >
                    {
                        loader &&
                        <ActivityIndicator
                            size={"small"}
                            color={Colors.white}
                        />
                    }
                </Button>
            </View>
        )
    }
    const RangePage_Footer = () => {
        return (
            //  *********************Download link*****************
            < View style={{ height: Normalize(27), width: "100%", backgroundColor: '#F2F6FE', flexDirection: rowOrRowreverse(language), justifyContent: "space-between", alignItems: "center", paddingVertical: Normalize(1), marginTop: Normalize(2), paddingLeft: Normalize(2) }
            } >
                {language === "en" &&
                    (allOrRange == "all" &&
                        <Text style={[styles.text1, { fontSize: Normalize(10) }]}>
                            {
                                layoutVisible == "outgoing" ?
                                    addCommaAndTranslateInPersian(totOutgoing, language) : addCommaAndTranslateInPersian(totEarn, language)} transactions for
                            {layoutVisible == "outgoing" ? p_data_o.length != 0 ? language == "en" ? showDate_en(p_data_o[0].created_at) : questionPersianTimeShow(p_data_o[0].created_at) : language == "en" ? showDate_en("2022-02-12") : questionPersianTimeShow("2022-02-12") :
                                p_data_e.length != 0 ? language == "en" ? showDate_en(p_data_e[0].created_at) : questionPersianTimeShow(p_data_e[0].created_at) : language == "en" ? showDate_en("2022-02-12") : questionPersianTimeShow("2022-02-12")} - {language == "en" ? showDate_en(today) : questionPersianTimeShow(today)
                            }
                        </Text>)
                }
                {
                    language === "pr" &&
                    (allOrRange == "all" &&
                        <Text style={[styles.text1, { fontSize: Normalize(10) }]}>
                            {`${layoutVisible == "outgoing" ? engToPersian(totOutgoing) : engToPersian(totEarn)} رسید از ${layoutVisible == "outgoing" ? p_data_o.length != 0 ? questionPersianTimeShow(p_data_o[0].created_at) : questionPersianTimeShow("2022-02-12") :
                                p_data_e.length != 0 ? questionPersianTimeShow(p_data_e[0].created_at) : questionPersianTimeShow("2022-02-12")} تا ${questionPersianTimeShow(today)}`}
                        </Text>)
                }


                {
                    language === "en" &&
                    (allOrRange == "range" &&
                        <Text style={[styles.text1, { fontSize: Normalize(10) }]}>
                            {layoutVisible == "outgoing" ? addCommaAndTranslateInPersian(totOutgoing, language) : addCommaAndTranslateInPersian(totEarn, language)} transactions for

                            {language == "en" ?
                                showDate_en(trans_from_date) : questionPersianTimeShow(trans_from_date)} - {language == "en" ? showDate_en(trans_to_date) :
                                    questionPersianTimeShow(trans_to_date)}
                        </Text>)
                }
                {
                    language === "pr" &&
                    (allOrRange == "range" &&
                        <Text style={[styles.text1, { fontSize: Normalize(10) }]}>
                            {`${layoutVisible == "outgoing" ? addCommaAndTranslateInPersian(totOutgoing, language) : addCommaAndTranslateInPersian(totEarn, language)} رسید از ${questionPersianTimeShow(trans_from_date)} تا ${questionPersianTimeShow(trans_to_date)}`}
                        </Text>
                    )
                }
                <TouchableOpacity
                    onPress={checkPermission}
                    // onPress={() => downLoadFile(from_date, to_date)}
                    style={{ backgroundColor: Colors.secondary, borderRadius: 10, height: "95%", width: "22%", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: Colors.white, fontFamily: 'roboto-bold', fontSize: Normalize(10), }}>{strings.PAYMENTHISTORY.DOWNLOAD}</Text>
                </TouchableOpacity>
            </View >
        )
    }
    const Modal_From_date = () => {
        return (
            <Modal
                animationType="none"
                visible={parsiandatePickerFrom}
                transparent={true}
                onRequestClose={() => {
                    onpress_fromDate_modal()
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(52, 52, 52, 0.3)" }} >
                    <View>
                        <View style={{ flexDirection: "row-reverse", backgroundColor: Colors.white, width: Normalize(240), padding: Normalize(15) }}>
                            <View style={{ flex: 1 }} />
                            <View style={{ flex: 1, flexDirection: "row-reverse", justifyContent: "space-evenly", alignItems: "center" }} >
                                <TouchableOpacity onPress={() => {
                                    setFrom_tempDate("")
                                    onpress_fromDate_modal()
                                }} style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                    <Text style={{ color: "#018577",fontSize: Normalize(12) }}>{strings.POSTTASK.CANCEL}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() =>
                                    // console.log("tempDate",tempDate)
                                    From_dateParsian(from_tempDate)
                                }
                                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "#018577",fontSize: Normalize(12) }} >{strings.POSTTASK.OK}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
    const Modal_To_date = () => {
        return (
            <Modal
                animationType="none"
                visible={parsiandatePickerTo}
                transparent={true}
                onRequestClose={() => onpress_toDate_modal()}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(52, 52, 52, 0.3)" }} >
                    <View>
                        <View style={{ flexDirection: "row-reverse", backgroundColor: Colors.white, width: Normalize(240), padding: Normalize(15) }}>
                            <View style={{ flex: 1 }} />
                            <View style={{ flex: 1, flexDirection: "row-reverse", justifyContent: "space-evenly", alignItems: "center" }} >
                                <TouchableOpacity onPress={() => {
                                    setTo_TempDate("")
                                    onpress_toDate_modal()
                                }} style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                    <Text style={{ color: "#018577",fontSize: Normalize(12) }}>{strings.POSTTASK.CANCEL}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() =>

                                    // console.log(tempDate)
                                    To_dateParsian(to_tempDate)
                                }
                                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "#018577",fontSize: Normalize(12) }} >{strings.POSTTASK.OK}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary, }} >
            <View style={{ flex: 1, backgroundColor: Colors.white }} >
                <View style={{ backgroundColor: Colors.primary, height: Normalize(48), width: "100%", flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                        <Text style={{
                            fontSize: Normalize(14),
                            fontFamily: 'roboto-bold',
                            color: '#fff'
                        }}>{layoutVisible == "earn" ? strings.PAYMENTHISTORY.EARNED : strings.PAYMENTHISTORY.OUTGOING}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()} style={{ height: Normalize(50), width: Normalize(50), justifyContent: "center", alignItems: "center" }} >
                        <Image source={images.cross} style={{ height: Normalize(12), width: Normalize(12), resizeMode: "contain" }} />
                    </TouchableOpacity>
                </View>
                <CurveDesing_Component   >
                    <View style={globalstyles.container_only_padding} >
                        < FlatList
                            showsVerticalScrollIndicator={false}
                            data={layoutVisible == "earn" ? range_data_e : range_data_o}
                            renderItem={layoutVisible == "earn" ? P_data_e_RendenItem : p_data_o_renderItem}
                            ListHeaderComponent={() => (
                                <RangePage_Header />
                            )}
                            ListFooterComponent={() =>
                            (
                                layoutVisible == "outgoing" ?
                                    range_data_o.length != 0 ? <RangePage_Footer /> : <View style={{ height: 1 }} />
                                    :
                                    range_data_e.length != 0 ? <RangePage_Footer /> : <View style={{ height: 1 }} />
                            )}
                        />
                    </View>

                    {/* pagination */}

                    {
                        layoutVisible == "outgoing"
                            ?
                            total_pageno_outgoing > 1 &&
                            <View style={{ height: Normalize(30), marginVertical: Normalize(7), marginHorizontal: 5, flexDirection: rowOrRowreverse(language), justifyContent: "space-between" }} >
                                {
                                    1 < temp_pageno_outgoing ?
                                        total_pageno_outgoing > 1 ?
                                            <TouchableOpacity
                                                onPress={onpressPreviousButton_outgoing}
                                                style={[styles.arrowButton]}>
                                                <Image
                                                    style={styles.imageButton}
                                                    source={language == "en" ? images.arrowleftblack : images.arrowrightblaack}
                                                />
                                            </TouchableOpacity>
                                            :
                                            <View style={[styles.arrowButton]}>
                                                <Image
                                                    style={styles.imageButton}
                                                    source={language == "en" ? images.arrowleftgrey : images.arrowrightgrey}
                                                />
                                            </View>
                                        :
                                        <View style={[styles.arrowButton]}>
                                            <Image
                                                style={styles.imageButton}
                                                source={language == "en" ? images.arrowleftgrey : images.arrowrightgrey}
                                            />
                                        </View>
                                }
                                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", height: "100%", paddingHorizontal: Normalize(5), backgroundColor: "#f5f5f5", borderRadius: 10, elevation: 0.8 }}>
                                    <Text style={[styles.h0, { fontSize: Normalize(14) }]} >
                                        {
                                            language == "en" ?
                                                `${temp_pageno_outgoing}/${total_pageno_outgoing}`
                                                :
                                                `${engToPersian(total_pageno_outgoing)}/${engToPersian(temp_pageno_outgoing)}`
                                        }
                                    </Text>
                                </TouchableOpacity>
                                {
                                    total_pageno_outgoing == temp_pageno_outgoing ?
                                        <View style={[styles.arrowButton]}>
                                            <Image
                                                style={styles.imageButton}
                                                source={language == "en" ? images.arrowrightgrey : images.arrowleftgrey}
                                            />
                                        </View> :
                                        total_pageno_outgoing > temp_pageno_outgoing ?
                                            <TouchableOpacity
                                                onPress={onpressNextButton_outgoing}
                                                style={[styles.arrowButton]}>
                                                <Image
                                                    style={styles.imageButton}
                                                    source={language == "en" ? images.arrowrightblaack : images.arrowleftblack}
                                                />
                                            </TouchableOpacity> :
                                            <View style={[styles.arrowButton]}>
                                                <Image
                                                    style={styles.imageButton}
                                                    source={language == "en" ? images.arrowrightgrey : images.arrowleftgrey}
                                                />
                                            </View>
                                }
                            </View>
                            :
                            total_pageno_earn > 1 &&
                            <View style={{ height: Normalize(30), marginVertical: Normalize(7), marginHorizontal: 5, flexDirection: rowOrRowreverse(language), justifyContent: "space-between" }} >
                                {
                                    1 < temp_pageno_earn ?
                                        total_pageno_earn > 1 ?
                                            <TouchableOpacity
                                                onPress={onpressPreviousButton_earn}
                                                style={[styles.arrowButton]}>
                                                <Image
                                                    style={styles.imageButton}
                                                    source={language == "en" ? images.arrowleftblack : images.arrowrightblaack}
                                                />
                                            </TouchableOpacity>
                                            :
                                            <View style={[styles.arrowButton]}>
                                                <Image
                                                    style={styles.imageButton}
                                                    source={language == "en" ? images.arrowleftgrey : images.arrowrightgrey}
                                                />
                                            </View>
                                        :
                                        <View style={[styles.arrowButton]}>
                                            <Image
                                                style={styles.imageButton}
                                                source={language == "en" ? images.arrowleftgrey : images.arrowrightgrey}
                                            />
                                        </View>
                                }
                                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", height: "100%", paddingHorizontal: Normalize(5), backgroundColor: "#f5f5f5", borderRadius: 10, elevation: 0.8 }}>
                                    <Text style={[styles.h0, { fontSize: Normalize(14) }]} >
                                        {
                                            language == "en" ?
                                                `${temp_pageno_earn}/${total_pageno_earn}`
                                                :
                                                `${engToPersian(total_pageno_earn)}/${engToPersian(temp_pageno_earn)}`
                                        }
                                    </Text>
                                </TouchableOpacity>
                                {
                                    total_pageno_earn == temp_pageno_earn ?
                                        <View style={[styles.arrowButton]}>
                                            <Image
                                                style={styles.imageButton}
                                                source={language == "en" ? images.arrowrightgrey : images.arrowleftgrey}
                                            />
                                        </View> :
                                        total_pageno_earn > temp_pageno_earn ?
                                            <TouchableOpacity
                                                onPress={onpressNextButton_earn}
                                                style={[styles.arrowButton]}>
                                                <Image
                                                    style={styles.imageButton}
                                                    source={language == "en" ? images.arrowrightblaack : images.arrowleftblack}
                                                />
                                            </TouchableOpacity> :
                                            <View style={[styles.arrowButton]}>
                                                <Image
                                                    style={styles.imageButton}
                                                    source={language == "en" ? images.arrowrightgrey : images.arrowleftgrey}
                                                />
                                            </View>
                                }
                            </View>
                    }

                </CurveDesing_Component>

            </View>
        </View>
    )
}