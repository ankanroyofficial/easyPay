import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, FlatList, Modal, PermissionsAndroid, Platform, } from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import Normalize from '../../../../helpers/Dimens';
import Header from '../../../../components/Header';
import styles from './Styles';
import strings from '../../../../constants/lng/LocalizedStrings';
import CustomTab from '../../../../components/CustomTabforReview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import LoaderPage from "../../../../components/LoaderPage"
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
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
function PaymentHistory({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const { token,
    ph_email_verify, setPh_email_verify,
    phone_number, setPhone_numbe,
    email_Address, setEmail_Address
  } = useContext(myContext);
  const [layoutVisible, setLayoutVisible] = useState("earn");
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
  const [toDateShow, setToDateShow] = useState("")
  const [fromDateShow, setFromDateShow] = useState("")
  const [parsiandatePickerFrom, setParsiandatePickerFrom] = useState(false);
  const [parsiandatePickerTo, setParsiandatePickerTo] = useState(false);
  const [from_date, setFrom_date] = useState("");
  const [to_date, setTo_date] = useState("");
  const [dropDown, setDropDown] = useState(false)
  const [totOutgoing, setTotOutgoing] = useState("")
  const [totEarn, setTotEarn] = useState("")

  const [total_pageno, setTotal_pageno] = useState("1")
  const [temp_pageno, setTemp_pageno] = useState(1)


  const [total_pageno_earn, setTotal_pageno_earn] = useState("1")
  const [temp_pageno_earn, setTemp_pageno_earn] = useState(1)
  const [total_pageno_outgoing, setTotal_pageno_outgoing] = useState("1")
  const [temp_pageno_outgoing, setTemp_pageno_outgoing] = useState(1)



  const [earn_total_pageno, seteEarn_total_Total_pageno] = useState("")
  const [outgoing_total_pageno, setOutgoing_Total_pageno] = useState("")

  const [isPhVerify, setIsPhVerify] = useState("N")
  const [isEmailVerify, setIsEmailVerify] = useState("N")
  const [verifyModal, setVerifyModal] = useState(false)
  // const [phone_number, setPhone_numbe] = useState({ isActive: false, activeTitle: "" })
  // const [email_Address, setEmail_Address] = useState({ isActive: false, activeTitle: "" })

  const [isrange, setIsrange] = useState(false)


  const pageDetails = [
    {
      id: 1,
      title: strings.MAKEANOFFER.VERIFYAMOBILENUMBER,
      BoxVerifiedTitle: phone_number.activeTitle,
      BoxUnverifiedTitle: strings.MAKEANOFFER.VERIFYYOURPHONENUMBER,
      isActive: phone_number.isActive,
      onPress: () => onPressPhone_number(),
    },
    {
      id: 2,
      title: strings.MAKEANOFFER.VERIFYAEMAILADDRESS,
      BoxVerifiedTitle: email_Address.activeTitle,
      BoxUnverifiedTitle: strings.MAKEANOFFER.VERIFYYOUREMAILADDRESS,
      isActive: email_Address.isActive,
      onPress: () => onPressEmail_Address(),
    }
  ]

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
  const tomorrow = moment().add(1, 'days');
  const persianTommorow = tomorrow.locale('fa').format('YYYY-MM-DD')
  var englishToday = new Date();
  var englishTommorow = new Date();
  englishTommorow.setDate(englishTommorow.getDate() + 1);
  const onpressAllButton = () => {
    setDropDown(!dropDown)
  }
  const [trans_from_date, setTrans_from_date] = useState("2022-02-12")
  const [trans_to_date, setTrans_to_date] = useState(today)
  useEffect(() => {
    getTokon()
  }, []);
  const getTokon = async () => {
    try {
      let id = await AsyncStorage.getItem("userid");
      setUserId(id)
      getData()
    } catch (error) {
      console.log(error)
    }
  }
  const getData = async () => {
    try {
      setLoader(true)
      const data = await axiosInstance.post("payment-history")
      // console.log(data.data)
      if (data.data.result) {
        // seteEarn_total_Total_pageno(data.data.result.earned_transactions_count)
        setTotal_pageno_earn(data.data.result.earned_transactions_count)

        // setOutgoing_Total_pageno(data.data.result.outgoing_transactions_count)
        setTotal_pageno_outgoing(data.data.result.outgoing_transactions_count)

        setP_data_e(data.data.result.earned_transactions)
        setP_data_o(data.data.result.outgoing_transactions)
        setEarned(data.data.result.earned_transactions_sum)
        setOutgoing(data.data.result.outgoing_transactions_sum)
        setTotOutgoing(data.data.result.outgoing_transactions_tot)
        setTotEarn(data.data.result.earned_transactions_tot)
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }
  const layoutOptionChoose2 = () => {
    return (
      <View style={{
        width: "100%",
        height: Normalize(37),
        flexDirection: rowOrRowreverse(language),
        marginTop: Normalize(7),
        marginBottom: Normalize(5),
        borderWidth: Normalize(1),
        borderColor: Colors.primary,
        borderRadius: 5,
        overflow: "hidden"
      }} >
        <TouchableOpacity
          onPress={() => {
            allOrRange == "range" ? getData(token) : null
            setAllorRange("all")
            setLayoutVisible("earn")
            // setTotal_pageno(earn_total_pageno)
            // setTemp_pageno(1)
          }}
          style={{ flex: 1, backgroundColor: layoutVisible == "earn" ? Colors.primary : Colors.white, alignItems: 'center', justifyContent: 'center' }} >
          <Text style={{ fontSize: Normalize(13), color: layoutVisible == "earn" ? Colors.white : Colors.primary, fontFamily: layoutVisible == "earn" ? "Outfit-Medium" : 'Outfit-Regular' }}>{strings.PAYMENTHISTORY.EARNED}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            allOrRange == "range" ? getData(token) : null
            setAllorRange("all")
            setLayoutVisible("outgoing")
            // setTotal_pageno(outgoing_total_pageno)
            // setTemp_pageno(1)
          }}
          style={{ flex: 1, backgroundColor: layoutVisible == "outgoing" ? Colors.primary : Colors.white, alignItems: 'center', justifyContent: 'center' }} >
          <Text style={{ fontSize: Normalize(13), color: layoutVisible == "outgoing" ? Colors.white : Colors.primary, fontFamily: layoutVisible == "outgoing" ? "Outfit-Medium" : 'Outfit-Regular' }}>{strings.PAYMENTHISTORY.OUTGOING}</Text>
        </TouchableOpacity>
      </View>
    );
  };
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
              numberOfLines={1}
              onPress={() => Toast.show("in progress")}
              style={{ color: Colors.primary, fontFamily: 'Outfit-Medium', fontSize: Normalize(12), textAlign: leftOrRight(language) }}> {item.get_task.title} </Text>
            <Text style={{ color: Colors.greyText, fontFamily: 'Outfit-Medium', fontSize: Normalize(12), textAlign: leftOrRight(language) }}> {strings.PAYMENTHISTORY.ASSIGNEDBY} <Text onPress={() => { navigateTo(item.get_task.get_user.slug, navigation) }} style={{ color: Colors.primary }} >{nameShorting(item.get_task.get_user.fname + " " + item.get_task.get_user.lname)}</Text> </Text>
            <View style={{ flexDirection: rowOrRowreverse(language), justifyContent: 'space-between', }}>
              <Text style={{ width: '55%', fontSize: Normalize(12), textAlign: leftOrRight(language) }}></Text>

              <View style={{ flexDirection: rowOrRowreverse(language), marginTop: Normalize(3) }}>
                {layoutVisible == "outgoing" ? (
                  <Text style={{ fontFamily: 'Outfit-Medium', fontSize: Normalize(12) }}>{strings.PAYMENTHISTORY.CREDIT} : </Text>
                ) : (
                  <Text style={{ fontFamily: 'Outfit-Medium', fontSize: Normalize(12) }}>{strings.PAYMENTHISTORY.CREDIT} : </Text>)}
                <Text style={{ fontFamily: 'Outfit-Medium', fontSize: Normalize(12), color: Colors.primary }}>{strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian((Math.round(item.amount)), language)} </Text>
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
             onPress={() => Toast.show("in progress")}
              style={{ color: Colors.primary, fontFamily: 'Outfit-Medium', fontSize: Normalize(12), textAlign: leftOrRight(language) }}> {item.get_task.title} </Text>
            <Text style={{ color: Colors.greyText, fontFamily: 'Outfit-Medium', fontSize: Normalize(12), textAlign: leftOrRight(language) }}> {strings.PAYMENTHISTORY.ASSIGNEDTO} <Text
              onPress={() => { navigateTo(item.get_task.get_award_bid.get_user.slug, navigation) }}
              style={{ color: Colors.primary }} >{nameShorting(item.get_task.get_award_bid.get_user.fname + " " + item.get_task.get_award_bid.get_user.lname)}</Text> </Text>



            <View style={{ flexDirection: rowOrRowreverse(language), justifyContent: 'space-between', }}>
              <Text style={{ width: '55%', fontSize: Normalize(12), textAlign: leftOrRight(language) }}></Text>


              <View style={{ flexDirection: rowOrRowreverse(language), marginTop: Normalize(3) }}>
                {layoutVisible == "outgoing" ? (
                  <Text style={{ fontFamily: 'Outfit-Medium', fontSize: Normalize(12) }}>{strings.PAYMENTHISTORY.CREDIT} :</Text>
                ) : (
                  <Text style={{ fontFamily: 'Outfit-Medium', fontSize: Normalize(12) }}>{strings.PAYMENTHISTORY.CREDIT} :</Text>)}
                <Text style={{ fontFamily: 'Outfit-Medium', fontSize: Normalize(12), color: Colors.primary }}>{strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian((Math.round(item.amount)), language)} </Text>
              </View>

            </View>
          </View>
        </View>
      </View>
    </View>
  )
  const DropDownModal = () => (
    <Modal
      animationType="none"
      transparent={true}
      visible={dropDown}
      onRequestClose={() => {
        onpressAllButton()
      }}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", padding: Normalize(25), justifyContent: "center" }} >
        <View style={{ backgroundColor: Colors.white, borderRadius: 4, paddingBottom: "2%" }} >
          <View style={{ backgroundColor: Colors.primary, height: Normalize(50), width: "100%", flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#E8E8E8", borderBottomWidth: 1 }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
              <Text style={{
                fontSize: Normalize(14),
                fontFamily: 'Outfit-SemiBold',
                color: '#fff'
              }}>{strings.PAYMENTHISTORY.CHOOSEANYONE}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.5} onPress={onpressAllButton} style={{ height: Normalize(50), width: Normalize(50), justifyContent: "center", alignItems: "center" }} >
              <Image source={images.cross} style={{ height: Normalize(12), width: Normalize(12), resizeMode: "contain" }} />
            </TouchableOpacity>
          </View>

          <View style={{ paddingVertical: "5%", }} >
            <TouchableOpacity
              onPress={() => {
                setAllorRange("all")
                getData(token)
                onpressAllButton()
              }}
            >
              <Text style={{ paddingVertical: "3%", borderColor: Colors.primary, borderWidth: Normalize(1), width: '30%', borderRadius: 5, backgroundColor: Colors.primary, alignSelf: 'center', textAlign: "center", fontSize: Normalize(12), fontFamily: 'Outfit-Medium', color: Colors.white }}  >{strings.PAYMENTHISTORY.ALL}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // setAllorRange("range")
                // setP_data_e([])
                // setP_data_o([])
                // setEarned("0")
                // setOutgoing("0")
                // setTotOutgoing("0")
                // setTotEarn("0")


                setRange_data_e([])
                setRange_data_o([])


                onpressAllButton()
                onpressrange_Button()
              }}
            >
              <Text style={{ paddingVertical: "3%", borderColor: Colors.primary, borderWidth: Normalize(1), width: '30%', borderRadius: 5, backgroundColor: Colors.primary, alignSelf: 'center', marginTop: 10, textAlign: "center", fontSize: Normalize(12), fontFamily: 'Outfit-Medium', color: Colors.white }} >{strings.PAYMENTHISTORY.RANGE}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
  const from_date_select = (val) => {
    let m = moment(val, 'MMM DD, YYYY').format('DD-MM-YYYY');
    let m2 = moment(val, 'MMM DD, YYYY').format('YYYY-MM-DD');
    setFrom_date(m)
    setTrans_from_date(m2)
    setFromDateShow(val)
    rangeSearch(m, to_date)
  }
  const to_date_select = (val) => {
    if (from_date.length == 0) {
      Toast.show("At first select From date")
    } else {
      let m = moment(val, 'MMM DD, YYYY').format('DD-MM-YYYY');
      let m2 = moment(val, 'MMM DD, YYYY').format('YYYY-MM-DD');
      setTo_date(m)
      setTrans_to_date(m2)
      setToDateShow(val)
      rangeSearch(from_date, m)
    }
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
      setTempDate("")
      setFromDateShow(finalDate)
      setParsiandatePickerFrom(false)
    } else {
      Toast.show(strings.ERROR.PLEASESELECTADATE)
    }
  }
  const To_dateParsian = (val) => {
    if (val) {
      if (from_date.length == 0) {
        Toast.show("At first select From date")
      } else {
        let getDate = moment.from(val, 'fa', 'YYYY-MM-DD').format('DD-MM-YYYY'); //output:  1989/01/24
        let test = moment(getDate, 'DD-MM-YYYY').locale('fa').format('DD-MM-YYYY');
        let testDateMonth = moment(getDate, 'DD-MM-YYYY').locale('fa').format('jMMMM');
        setTo_date(getDate)
        let testdateSplit = test.split("-")
        var finalDate = engToPersian(testdateSplit[0]) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
        setTempDate("")
        setToDateShow(finalDate)
        setParsiandatePickerTo(false)
      }
    } else {
      Toast.show(strings.ERROR.PLEASESELECTADATE)
    }
  }
  const RangePage = () => (
    <View style={{ flex: 1 }} >
      {/* *****************from_date********** */}
      <Text style={[styles.h5, language == 'pr' ? { ...RtlStyles.textInverse } : { ...RtlStyles.text }]}>{strings.BROWSEFILTER.FROM}</Text>
      <View style={{ flexDirection: language == "en" ? 'row' : "row-reverse", borderWidth: Normalize(1), borderColor: Colors.primary, borderRadius: 4, height: Normalize(38), marginVertical: Normalize(5), marginHorizontal: Normalize(10) }}>
        <View style={{ flexDirection: language == "en" ? 'row' : "row-reverse", alignItems: "center" }} >
          <View style={{ height: Normalize(13), width: Normalize(13), marginHorizontal: Normalize(10) }}>
            <Image source={images.calander} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
          </View>
        </View>
        {
          language == "en" ?
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
                    fontFamily: 'Outfit-Regular',
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

            :
            <TouchableOpacity onPress={() => setParsiandatePickerFrom(true)} style={{ flex: 1, justifyContent: "space-between", paddingHorizontal: "2%", flexDirection: "row", alignItems: "center" }} >
              <View style={{ height: Normalize(10), width: Normalize(5), transform: [{ rotate: '90deg' }], marginHorizontal: Normalize(7) }}>
                <Image source={require("../../../../../assets/rightarrow.png")} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
              </View>
              <Text style={{ color: Colors.grey, fontSize: Normalize(12), paddingHorizontal: "3%" }}>
                {
                  fromDateShow ? fromDateShow : strings.POSTTASK.SELECTDATE
                }
              </Text>
            </TouchableOpacity>
        }
        <Modal
          animationType="none"
          visible={parsiandatePickerFrom}
          transparent={true}
          onRequestClose={() => {
            setParsiandatePickerFrom(false)
          }}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(52, 52, 52, 0.3)" }} >
            <View>
              <View style={{ flexDirection: "row-reverse", backgroundColor: Colors.white, width: Normalize(240), padding: Normalize(15) }}>
                <View style={{ flex: 1 }} />
                <View style={{ flex: 1, flexDirection: "row-reverse", justifyContent: "space-evenly", alignItems: "center" }} >
                  <TouchableOpacity onPress={() => {
                    setTempDate("")
                    setParsiandatePickerFrom(false)
                  }} style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ color: "#018577", fontSize: Normalize(12) }}>{strings.POSTTASK.CANCEL}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() =>
                    // console.log("tempDate",tempDate)
                    From_dateParsian(tempDate)
                  }
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#018577", fontSize: Normalize(12) }} >{strings.POSTTASK.OK}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      {/* *****************to_date********** */}
      <Text style={[styles.h5, language == 'pr' ? { ...RtlStyles.textInverse } : { ...RtlStyles.text }]}>{strings.BROWSEFILTER.TO}</Text>
      <View style={{ flexDirection: language == "en" ? 'row' : "row-reverse", borderWidth: Normalize(1), borderColor: Colors.primary, borderRadius: 4, height: Normalize(38), marginVertical: Normalize(5), marginHorizontal: Normalize(10) }}>
        <View style={{ flexDirection: language == "en" ? 'row' : "row-reverse", alignItems: "center" }} >
          <View style={{ height: Normalize(13), width: Normalize(13), marginHorizontal: Normalize(10) }}>
            <Image source={images.calander} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
          </View>
        </View>
        {
          language == "en" ?
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
                    fontFamily: 'Outfit-Regular',
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
            :
            <TouchableOpacity onPress={() => setParsiandatePickerTo(true)} style={{ flex: 1, justifyContent: "space-between", paddingHorizontal: "2%", flexDirection: "row", alignItems: "center" }} >
              <View style={{ height: Normalize(10), width: Normalize(5), transform: [{ rotate: '90deg' }], marginHorizontal: Normalize(7) }}>
                <Image source={require("../../../../../assets/rightarrow.png")} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
              </View>
              <Text style={{ color: Colors.grey, fontSize: Normalize(12), paddingHorizontal: "3%" }}>
                {
                  toDateShow ? toDateShow : strings.POSTTASK.SELECTDATE
                }
              </Text>
            </TouchableOpacity>
        }
        <Modal
          animationType="none"
          visible={parsiandatePickerTo}
          transparent={true}
          onRequestClose={() => {
            setParsiandatePickerTo(false)
          }}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(52, 52, 52, 0.3)" }} >
            <View>
              <View style={{ flexDirection: "row-reverse", backgroundColor: Colors.white, width: Normalize(240), padding: Normalize(15) }}>
                <View style={{ flex: 1 }} />
                <View style={{ flex: 1, flexDirection: "row-reverse", justifyContent: "space-evenly", alignItems: "center" }} >
                  <TouchableOpacity onPress={() => {

                    setTempDate("")
                    setParsiandatePickerTo(false)
                  }} style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ color: "#018577", fontSize: Normalize(12) }}>{strings.POSTTASK.CANCEL}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() =>

                    // console.log("tempDate")
                    To_dateParsian(tempDate)
                  }
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#018577", fontSize: Normalize(12) }} >{strings.POSTTASK.OK}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={{ height: Normalize(5) }} />
      {
        layoutVisible == "outgoing" ?
          <FlatList
            showsVerticalScrollIndicator={false}
            data={p_data_o}
            renderItem={p_data_o_renderItem}
          />
          :
          < FlatList
            showsVerticalScrollIndicator={false}
            data={p_data_e}
            renderItem={P_data_e_RendenItem}
          />
      }
    </View>
  )

  const onpress_toDate_modal = () => {
    setParsiandatePickerTo(!parsiandatePickerTo)
  }
  const rangeSearch = async (from_val, to_val) => {
    try {
      // console.log("*******************")
      // setTotal_pageno("0")
      // setTemp_pageno(0)

      // setTotal_pageno_earn("0")
      // setTemp_pageno_earn(0)
      // setTotal_pageno_outgoing("0")
      // setTemp_pageno_outgoing(0)
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
      // console.log(data.data.result.outgoing_transactions)
      if (data.data.result) {
        setTotal_pageno_earn(data.data.result.earned_transactions_count)
        setTotal_pageno_outgoing(data.data.result.outgoing_transactions_count)
        setRange_data_e(data.data.result.earned_transactions)
        setRange_data_o(data.data.result.outgoing_transactions)
        setEarned(data.data.result.earned_transactions_sum)
        setOutgoing(data.data.result.outgoing_transactions_sum)
        setTotOutgoing(data.data.result.outgoing_transactions_tot)
        setTotEarn(data.data.result.earned_transactions_tot)
        setLoader(false)
      }
    } catch (error) {
      console.log("rangeSearch", error)
    }
  }
  const fileUrl1 = (val) => {
    try {
      if (val == "outgoing") {
        return `${axiosUrl.URL}outgoing-payment-history?user_id=${userId}&select_range_earned=${allOrRange == "all" ? "A" : "R"}&earned_from_date=${from_date}&earned_to_date=${to_date}`
      } else {
        return `${axiosUrl.URL}earned-payment-history?user_id=${userId}&select_range_earned=${allOrRange == "all" ? "A" : "R"}&earned_from_date=${from_date}&earned_to_date=${to_date}`
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
  const onpressrange_Button = () => {
    try {
      // setIsrange(!isrange)

      Toast.show("In Progress")

      // navigation.navigate("Range_Page", { "earnOrOut": layoutVisible })

    } catch (error) {
      console.log("onpressrange_Button", error)
    }
  }
  const onpressNextButton_earn = () => {
    var a = temp_pageno_earn
    var b = a + 1
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
      setLoader(true)
      const res = {
        "params": {
          "page": val,
          "select_range_earned": allOrRange == "all" ? "A" : "R",
          "earned_from_date": from_val,
          "earned_to_date": to_val,
          "outgoing_from_date": from_val,
          "outgoing_to_date": to_val
        }
      }
      const data = await axiosInstance.post("payment-history", res)
      if (data.data.result) {
        // seteEarn_total_Total_pageno(data.data.result.earned_transactions_count)
        setTotal_pageno_earn(data.data.result.earned_transactions_count)
        setP_data_e(data.data.result.earned_transactions)
        setEarned(data.data.result.earned_transactions_sum)
        setTotEarn(data.data.result.earned_transactions_tot)
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }
  const get_listingData_after_NxtOrPre_outoging = async (val, from_val, to_val) => {
    try {
      setLoader(true)
      const res = {
        "params": {
          "page": val,
          "select_range_earned": allOrRange == "all" ? "A" : "R",
          "earned_from_date": from_val,
          "earned_to_date": to_val,
          "outgoing_from_date": from_val,
          "outgoing_to_date": to_val
        }
      }
      const data = await axiosInstance.post("payment-history", res)
      if (data.data.result) {
        // setOutgoing_Total_pageno(data.data.result.outgoing_transactions_count)
        setTotal_pageno_outgoing(data.data.result.outgoing_transactions_count)
        setP_data_o(data.data.result.outgoing_transactions)
        setOutgoing(data.data.result.outgoing_transactions_sum)
        setTotOutgoing(data.data.result.outgoing_transactions_tot)
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }
  const onPressPhone_number = async (val) => {
    try {
      if (phone_number.activeTitle === "") {
        onpressVerify()
        navigation.navigate("BasicInfo_intro")
      } else {
        const res = await axiosInstance.post("get-phone-otp")
        if (res.data.result.error) {
          Toast.show(res.data.result.error.meaning)
        } else {
          const otp = res.data.result.otp
          onpressVerify()
          Toast.show(res.data.result.success.meaning)
          navigation.navigate("PhoneVerifyPage", { otp: otp, phoneNumber: phone_number.activeTitle })
        }
      }
    } catch (error) {
      console.log("onPressPhone_number", error)
    }
  }
  const onPressEmail_Address = async () => {
    try {

      const res = await axiosInstance.post("get-email-otp")
      if (res.data.result.error) {
        Toast.show(res.data.result.error.meaning)
      } else {
        const otp = res.data.result.otp
        Toast.show(res.data.result.success.meaning)
        onpressVerify()
        navigation.navigate("EmailVerifyPage", { otp: otp, email: email_Address.activeTitle })
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onpressVerify = () => {
    setVerifyModal(!verifyModal)
  }
  const verifyData = async () => {
    try {
      let slug = await AsyncStorage.getItem("slug");
      const data = await axiosInstance.post("public-profile",
        {
          "jsonrpc": "2.0",
          "params": {
            "slug": `${slug}`
          }
        })
      // console.log("**********", data.data.result)
      if (data.data.result) {
        const res = data.data.result.user
        setIsPhVerify(res.is_phone_verified)
        setIsEmailVerify(res.is_email_verified)
        if (res.phone !== null && res.email !== null) {
          if (res.is_phone_verified != "N") {
            language == "en" ? setPhone_numbe({ isActive: true, activeTitle: res.phone }) : setPhone_numbe({ isActive: true, activeTitle: engToPersian(res.phone) })
          } else {
            language == "en" ? setPhone_numbe({ isActive: false, activeTitle: res.phone }) : setPhone_numbe({ isActive: false, activeTitle: engToPersian(res.phone) })
          }
          if (res.is_email_verified != "N") {
            setEmail_Address({ isActive: true, activeTitle: res.email })
          } else {
            setEmail_Address({ isActive: false, activeTitle: res.email })
          }
        } else {
          if (res.phone !== null) {
            if (res.is_phone_verified != "N") {
              language == "en" ?
                setPhone_numbe({ isActive: true, activeTitle: res.phone })
                :
                setPhone_numbe({ isActive: true, activeTitle: engToPersian(res.phone) })
            } else {
              language == "en" ?
                setPhone_numbe({ isActive: false, activeTitle: res.phone })
                :
                setPhone_numbe({ isActive: false, activeTitle: engToPersian(res.phone) })
            }
          } else {
            setPhone_numbe({ isActive: false, activeTitle: "" })
          }
          if (res.is_email_verified != "N") {
            setEmail_Address({ isActive: true, activeTitle: res.email })
          } else {
            setEmail_Address({ isActive: false, activeTitle: res.email })
          }
        }
      }
    } catch (error) {
      console.log("verifyData_get_it_done", error)
    }
  }
  useEffect(() => {
    verifyData()
    const willFocusSubscription = navigation.addListener('focus', () => {
      verifyData()
    });
    return willFocusSubscription;
  }, []);
  const checkIsVerify = () => {
    if (isPhVerify == "N" || isEmailVerify == "N") {
      return false
    } else {
      return true
    }
  }
  const VerifyModalComponent = () => {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={verifyModal}
        onRequestClose={() => {
          onpressVerify()
        }}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", padding: Normalize(15), justifyContent: "center" }} >
          <View style={{ backgroundColor: Colors.white, borderRadius: 4, paddingBottom: "2%" }} >
            <ScrollView showsVerticalScrollIndicator={false} >
              <View style={{ height: Normalize(50), width: "100%", flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#D8D8D8", borderBottomWidth: 1 }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                  <Text style={{
                    fontSize: Normalize(12),
                    fontFamily: 'Outfit-SemiBold',
                    color: '#38393e',
                    textAlign: "center"
                  }}>{language === "en" ? "To posting a task and getting quotes" : "قبل از ایجاد یک کار می بایست ابتدا ایمیل و شماره موبایل خود را تایید کنید"}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.5}
                  onPress={() =>
                    // setVerifyModal(!verifyModal)
                    onpressVerify()
                  }

                  style={{ height: Normalize(50), width: Normalize(50), justifyContent: "center", alignItems: "center" }} >
                  <Image source={images.cross} style={{ height: Normalize(12), width: Normalize(12), resizeMode: "contain" }} />
                </TouchableOpacity>
              </View>
              <View style={{ padding: Normalize(8) }} >
                {pageDetails.map((item, index) => (
                  <View key={index} style={{ width: "100%", marginBottom: "2%" }}>
                    <Text style={{
                      paddingVertical: Normalize(8),
                      fontSize: Normalize(14),
                      fontFamily: 'Outfit-Regular',
                      color: '#818181',
                      textAlign: language == "en" ? "left" : "right"
                    }}  >{item.title}</Text>
                    <TouchableOpacity
                      disabled={item.isActive}
                      onPress={item.onPress}
                      style={{ height: Normalize(43), width: "100%", borderRadius: 5, borderColor: item.isActive ? "#99b83c" : "#D8D8D8", borderWidth: Normalize(1), flexDirection: language == "en" ? "row" : "row-reverse" }} >
                      <View style={{ height: Normalize(43), width: Normalize(43), justifyContent: "center", alignItems: "center" }} >
                        <Image source={item.isActive ? images.greenTick : images.grayTick} style={{ height: "60%", width: "60%", resizeMode: "contain" }} />
                      </View>
                      <View style={{ flex: 1, justifyContent: "center", }} >
                        <Text style={{
                          fontSize: Normalize(12),
                          paddingHorizontal: "2%",
                          fontFamily: 'Outfit-Medium',
                          color: item.isActive ? Colors.greyText : '#636468',
                          textAlign: language == "en" ? "left" : "right"
                        }}>{item.isActive ? item.BoxVerifiedTitle : item.BoxUnverifiedTitle}</Text>
                      </View>
                      <View style={{ height: Normalize(40), width: Normalize(40), justifyContent: "center", alignItems: "center", opacity: item.isActive ? 0.7 : 0.3 }} >
                        <Image source={language == "en" ? images.rightArrow : images.leftArrow} style={{ height: "35%", width: "35%", resizeMode: "contain" }} />
                      </View>
                    </TouchableOpacity>
                  </View>
                ))
                }
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    )
  }
  const posttaskButton = () => {
    if (checkIsVerify() == true) {
      navigation.navigate('PostTaskDetails', { item: {} })
      // Toast.show(strings.PAYMENTHISTORY.ATFIRSTPOSTTASK)
    } else {
      setVerifyModal(true)
    }
  }
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
      <View style={styles.container}>
        <Header
          back
          name={strings.PAYMENTHISTORY.HEADERTEXT}
          navigation={navigation}
        />
        {
          loader ?
            <LoaderPage />
            :
            <>
              <CurveDesing_Component   >
                <View style={globalstyles.container_only_padding} >
                  {layoutOptionChoose2()}
                  <View style={{ flexDirection: rowOrRowreverse(language),marginBottom:Normalize(8),borderBottomColor:"#d3d4d5",borderBottomWidth:Normalize(0.8),borderTopColor:"#d3d4d5",borderTopWidth:Normalize(0.8)}}>
                    <View style={{ flexDirection: rowOrRowreverse(language), width: '61%', paddingVertical: Normalize(10), alignItems: "center", justifyContent: "center" }}>
                      {layoutVisible == "outgoing" ? (
                        <Text style={{ fontFamily: 'Outfit-Medium', fontSize: outgoing > 99999 ? Normalize(11) : Normalize(12) }}>{strings.PAYMENTHISTORY.NETOUTGOING} : </Text>
                      ) : (
                        <Text style={{ fontFamily: 'Outfit-Medium', fontSize: Normalize(12) }}>{strings.PAYMENTHISTORY.NETEARN} : </Text>)
                      }
                        <Text style={{ fontFamily: language === "en" ? 'Outfit-Medium' : 'Outfit-SemiBold', fontSize: Normalize(13), color: Colors.primary }}>{strings.BROWSEFILTER.TOMAN} {layoutVisible == "outgoing" ? addCommaAndTranslateInPersian((Math.round(outgoing)), language) : addCommaAndTranslateInPersian((Math.round(earned)), language)} </Text>
                    </View>
                    <View style={{ width: 1, backgroundColor: "#d3d4d5" }} />
                    <View style={{ flexDirection: rowOrRowreverse(language), width: '39%', paddingVertical: Normalize(10), alignItems: "center", justifyContent: "center" }}>
                      <Text style={{ fontFamily: 'Outfit-Medium', fontSize: Normalize(10) }}>{strings.PAYMENTHISTORY.SHOW} : </Text>
                      <TouchableOpacity
                        onPress={onpressAllButton}
                        style={{ flexDirection: rowOrRowreverse(language) }} >
                        <Text style={{ fontFamily: 'Outfit-Medium', fontSize: Normalize(12), color: Colors.primary }}>{allOrRange == "all" ? strings.PAYMENTHISTORY.ALL : strings.PAYMENTHISTORY.RANGE}</Text>
                        <Image style={{ width: 7, height: 7, alignSelf: 'center', marginHorizontal: Normalize(2) }}
                          source={images.downarrow}
                          resizeMode="contain" />
                      </TouchableOpacity>

                      {dropDown && <DropDownModal />}

                    </View>
                  </View>
                  {layoutVisible == "outgoing"
                    ?
                    allOrRange == "all" ?
                      p_data_o.length == 0 ?
                        <View style={{ flex: 1 }} >
                          <View style={{ height: Normalize(120), width: Normalize(120), alignSelf: "center", marginTop: Normalize(50) }} >
                            <Image source={images.ir_icon} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                          </View>
                          <Text style={[styles.text2, { paddingHorizontal: Normalize(20), marginVertical: Normalize(20), textAlign: "center" }]} >{strings.PAYMENTHISTORY.YOUHAVENTPAID}</Text>
                          <TouchableOpacity
                            onPress={posttaskButton}
                            style={{
                              backgroundColor: Colors.secondary, padding: Normalize(7), alignSelf: 'center', borderRadius: 20
                            }}>
                            <Text style={{ ...styles.text3, paddingHorizontal: Normalize(40) }}>{strings.GETITDONE.POSTATASK}</Text>
                          </TouchableOpacity>
                          {verifyModal && <VerifyModalComponent />}
                        </View>
                        :
                        <FlatList
                          showsVerticalScrollIndicator={false}
                          data={p_data_o}
                          renderItem={p_data_o_renderItem}
                        />
                      :
                      allOrRange == "range" ?
                        <RangePage />
                        :
                        <View style={{ flex: 1, backgroundColor: "blue" }} ></View>
                    :
                    allOrRange == "all" ?
                      p_data_e.length == 0 ?
                        <View style={{ flex: 1 }} >
                          <View style={{ height: Normalize(130), width: "80%", alignSelf: "center", marginTop: Normalize(50) }} >
                            <Image source={images.payments_earned} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                          </View>
                          <Text style={[styles.text2, { paddingHorizontal: Normalize(20), marginVertical: Normalize(20), textAlign: "center" }]} >{strings.PAYMENTHISTORY.YOUHAVENTEARN}</Text>
                          <TouchableOpacity
                            onPress={() => navigation.navigate("Browse")}
                            style={{
                              backgroundColor: Colors.secondary, padding: Normalize(7), alignSelf: 'center', borderRadius: 20
                            }}>
                            <Text style={{ ...styles.text3, paddingHorizontal: Normalize(40) }}>{strings.BROWSE.HEADERTEXT}</Text>
                          </TouchableOpacity>
                        </View>
                        :
                        < FlatList
                          showsVerticalScrollIndicator={false}
                          data={p_data_e}
                          renderItem={P_data_e_RendenItem}
                        />
                      :
                      allOrRange == "range" ?
                        <RangePage />
                        :
                        <View style={{ flex: 1, backgroundColor: "pink" }} ></View>
                  }

                  {/* {isrange && <RangePage_modal earnOrOut={layoutVisible} />} */}

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

                </View>
              </CurveDesing_Component>
            </>
        }
        {/* Download link */}

        <View style={{ width: "100%", backgroundColor: Colors.primary, flexDirection: rowOrRowreverse(language), justifyContent: "space-between", paddingHorizontal: "3%", alignItems: "center", paddingVertical: Normalize(8) }} >
          {language === "en" &&
            (allOrRange == "all" &&
              <Text style={{
                fontSize: Normalize(10),
                color: Colors.white,
                fontFamily: 'Outfit-Regular',
              }}>
                {
                  layoutVisible == "outgoing" ?
                    addCommaAndTranslateInPersian(totOutgoing, language) : addCommaAndTranslateInPersian(totEarn, language)} transactions for
                {layoutVisible == "outgoing" ? p_data_o.length != 0 ? language == "en" ? showDate_en(p_data_o[0].created_at) : questionPersianTimeShow(p_data_o[0].created_at) : language == "en" ? showDate_en("2022-02-12") : questionPersianTimeShow("2022-02-12") :
                  p_data_e.length != 0 ? language == "en" ? showDate_en(p_data_e[0].created_at) : questionPersianTimeShow(p_data_e[0].created_at) : language == "en" ? showDate_en("2022-02-12") : questionPersianTimeShow("2022-02-12")} - {language == "en" ? showDate_en(today) : questionPersianTimeShow(today)
                }
              </Text>)
          }
          {language === "pr" &&
            (allOrRange == "all" &&
              <Text style={{
                fontSize: Normalize(10),
                color: Colors.white,
                fontFamily: 'Outfit-Regular',
              }}>
                {`${layoutVisible == "outgoing" ? engToPersian(totOutgoing) : engToPersian(totEarn)} رسید از ${layoutVisible == "outgoing" ? p_data_o.length != 0 ? questionPersianTimeShow(p_data_o[0].created_at) : questionPersianTimeShow("2022-02-12") :
                  p_data_e.length != 0 ? questionPersianTimeShow(p_data_e[0].created_at) : questionPersianTimeShow("2022-02-12")} تا ${questionPersianTimeShow(today)}`}
              </Text>)
          }


          {language === "en" &&
            (allOrRange == "range" &&
              <Text style={{
                fontSize: Normalize(10),
                color: Colors.white,
                fontFamily: 'Outfit-Regular',
              }}>
                {layoutVisible == "outgoing" ? addCommaAndTranslateInPersian(totOutgoing, language) : addCommaAndTranslateInPersian(totEarn, language)} transactions for

                {language == "en" ?
                  showDate_en(trans_from_date) : questionPersianTimeShow(trans_from_date)} - {language == "en" ? showDate_en(trans_to_date) :
                    questionPersianTimeShow(trans_to_date)}
              </Text>)
          }


          <TouchableOpacity
            onPress={checkPermission}
            // onPress={() => downLoadFile(from_date, to_date)}
            style={{ backgroundColor: Colors.white, borderRadius: Normalize(5), height: Normalize(20), width: "22%", justifyContent: "center", alignItems: "center", elevation:Normalize(2) }}>
            <Text style={{ color: Colors.primary, fontFamily: 'Outfit-SemiBold', fontSize: Normalize(10), }}>{strings.PAYMENTHISTORY.DOWNLOAD}</Text>
          </TouchableOpacity>
        </View>




      </View>
    </SafeAreaView>
  );
}

export default withRtl(PaymentHistory);
