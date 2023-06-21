import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Linking,
  TextInput,
  RefreshControl,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Header from '../../../../components/Header';
import styles from './Styles';
import { useRtlContext } from 'react-native-easy-localization-and-rtl';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import strings from '../../../../constants/lng/LocalizedStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nameShorting } from '../../../../constants/NameShorting';
import { numberCheck } from '../../../../constants/NumberWithComma';
import LoaderPage from '../../../../components/LoaderPage';
const { height } = Dimensions.get('window');
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-simple-toast';
import { Modal } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { engToPersian } from '../../../../constants/EnglishToPersian';
import { leftOrRight, rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import { questionEnglishTimeShow, questionPersianTimeShow } from '../../../../constants/DateShow';
import Normalize from './../../../../helpers/Dimens';
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import WarningPage from '../../../../components/WarningPage';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';

export default function DisputesDetails({ navigation, route }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const webref = useRef()
  const [type, setType] = useState('');
  const [d_type, setD_type] = useState('');
  const [d_data, setD_data] = useState('');
  const [d_data2, setD_data2] = useState('');
  const [d_data3, setD_data3] = useState('');
  const [d_data4, setD_data4] = useState('');
  const [admin, setAdmin] = useState('');
  const { slug } = route.params;
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [acceptModal, setAcceptModal] = useState(false);
  const [loaderSubmit, setLoaderSubmit] = useState(false);
  const [loaderaccept, setLoaderAccept] = useState(false);
  const [loadercounter, setLoaderCounter] = useState(false);
  const [loaderPay, setLoaderPay] = useState(false);
  const [nego, setNego] = useState([]);
  const [imageFinalArray, setImageFinalArray] = useState([]);
  const [message, setmessage] = useState('');
  const [ahnIsFocused, setAhnIsFocused] = useState(false);
  const [counterbox, setCounterbox] = useState(false);
  const [amount, setAmount] = useState('');
  const [amIsFocused, setAmIsFocused] = useState(false);
  const [arbitration, setArbitration] = useState(false);
  const [isVisible, setIsvisible] = useState(false);
  const [file_name, setFilename] = useState('');
  const [isVisible2, setIsvisible2] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [evidancecheckBox, setEvidancecheckBox] = useState(false);
  const [totalAmount, setTotalAmount] = useState('');
  const [paybleAmount, setPaybleAmount] = useState('');
  const [adjustAmount, setAdjustAmount] = useState('');
  const [payment_method, setpayment_method] = useState('');
  const [ispaymentgateway, setIsPaymentgateway] = useState(false);
  const [apiUrl, setApiUri] = useState("")
  const [id, setId] = useState("")
  const [userId, setUserId] = useState("")
  const [attributation_fees, setAttributation_fees] = useState("0")
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    reloadOnScroll()
    Toast.show(strings.ERROR.REFRESHING)
    setRefreshing(false)
  }, [refreshing]);


  useEffect(() => {
    getTokon();
  }, []);

  const getTokon = async () => {
    try {
      let userid = await AsyncStorage.getItem('userid');
      setUserId(userid)
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async () => {
    try {
      setLoader(true);
      // setLanguage("pr")
      const res = {
        jsonrpc: '2.0',
        params: {
          slug: slug,
        },
      }
      const data = await axiosInstance.post("dispute-details", res)
      // console.log(data.data)
      setAttributation_fees(data.data.task_fees.attributation_fees)
      setD_data(data.data.disputeMaster);
      setId(data.data.disputeMaster.id);
      setD_data2(data.data.disputeMaster.get_task.title);
      setD_data4(data.data.disputeMaster.get_tasker);
      setD_data3(data.data.disputeMaster.get_poster);
      setType(data.data.user_type);
      setD_type(data.data.disputeMaster.offer_by);
      setTotalAmount(data.data.total_amt);
      setPaybleAmount(data.data.payable_amt);
      setAdjustAmount(data.data.adjust_amt);
      setpayment_method(data.data.payment_method);
      setNego(data.data.disputeMaster.get_dispute_message);
      if (data.data.disputeMaster.status == "C") {
        setAdmin(data.data.result)
      }
      setLoader(false);
    } catch (error) {
      console.log('getData - ', error);
      setLoader(false);
    }
  };
  const reloadOnScroll = async () => {
    try {
      const res = {
        jsonrpc: '2.0',
        params: {
          slug: slug,
        },
      }
      const data = await axiosInstance.post("dispute-details", res)
      setD_data(data.data.disputeMaster);
      setId(data.data.disputeMaster.id);
      setD_data2(data.data.disputeMaster.get_task.title);
      setD_data4(data.data.disputeMaster.get_tasker);
      setD_data3(data.data.disputeMaster.get_poster);
      setType(data.data.user_type);
      setD_type(data.data.disputeMaster.offer_by);
      setTotalAmount(data.data.total_amt);
      setPaybleAmount(data.data.payable_amt);
      setAdjustAmount(data.data.adjust_amt);
      setpayment_method(data.data.payment_method);
      setNego(data.data.disputeMaster.get_dispute_message);
      if (data.data.disputeMaster.status == "C") {
        setAdmin(data.data.result)
      }
      setLoader(false);
    } catch (error) {
      console.log('reloadOnScroll - ', error);
    }
  };
  const selectfile = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      imageArray(res);
    } catch (error) {
      console.log(error)
    }
  };
  const imageArray = val => {
    setLoader2(true);
    let array = imageFinalArray;
    val.map(item => {
      array.push(item);
    });
    setImageFinalArray(array);
    setLoader2(false);
  };
  const deleteImage = async val => {
    let array = imageFinalArray;
    let newArr = [];
    newArr = array.filter(item => item.name != val.name);
    setImageFinalArray(newArr);
  };
  const persianData = (val) => {
    // console.log("dddd",val)
    const a = val.substr(0, 10)
    let test = moment(a, 'YYYY-MM-DD').locale('fa').format('DD-MM-YYYY');
    let testDateMonth = moment(a, 'YYYY-MM-DD').locale('fa').format('jMMMM');

    let testdateSplit = test.split("-")
    var b = val
    const today = new Date()
    var now = moment(b);
    var expiration = moment(today);
    var minsAverage = expiration.diff(now, "minutes");

    var min = parseInt(minsAverage % 60);
    var hours = parseInt(minsAverage / 60);
    var days = parseInt(hours / 24);

    hours = hours - 24 * days;
    var final_time = ""

    // final_time = engToPersian(testdateSplit[0]) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
    // return final_time

    var removeZero = testdateSplit[0]
    if (removeZero[0] == 0) {
      final_time = engToPersian(removeZero[1].toString()) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
      return final_time
    } else {
      final_time = engToPersian(testdateSplit[0]) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
      return final_time
    }
  }
  const getredtext = () => {
    try {
      if (d_data.status == "S3") {
        if (d_data.poster_fees_paid == "Y" && type == "T" && d_data.tasker_fees_paid == "N") {
          return [`You have to submit the arbitration fees and evidences by  ${d_data.stage3_deadline} as ${nameShorting(d_data3.fname + ' ' + d_data3.lname)} has already paid arbitration fees. In case you fail to submit fees, then ${nameShorting(d_data3.fname + ' ' + d_data3.lname)}  will win the dispute.`,
          `طرف مقابل شما در اختلاف نسبت به پرداخت هزینه های داوری و ارسال مدارک نهایی اقدام کرده است. بنابراین شما می بایست تا قبل از تاریخ ${persianData(d_data.stage3_deadline)} نسبت به پرداخت هزینه های داوری و ارسال مدارک نهایی اقدام نمایید. در غیر این صورت ${nameShorting(d_data3.fname + ' ' + d_data3.lname)} در اختلاف پیروز خواهد شد.`]
        } else if (d_data.poster_fees_paid == "N" && type == "T" && d_data.tasker_fees_paid == "Y") {
          return [`You have to submit evidences by ${d_data.stage3_deadline} to support your side.`, `شما باید مدارک و مستندات مرتبط با اختلاف ایجاد شده را تا تاریخ ${persianData(d_data.stage3_deadline)} ارائه دهید تا بتواند دعوی شما را اثبات کند.`]
        } else if (d_data.poster_fees_paid == "Y" && type == "P" && d_data.tasker_fees_paid == "N") {
          return [`You have to submit evidences by ${d_data.stage3_deadline} to support your side.`, `شما باید مدارک و مستندات مرتبط با اختلاف ایجاد شده را تا تاریخ ${persianData(d_data.stage3_deadline)} ارائه دهید تا بتواند دعوی شما را اثبات کند.`]
        } else if (d_data.poster_fees_paid == "N" && type == "P" && d_data.tasker_fees_paid == "Y") {
          return [`You have to submit the arbitration fees and evidences by ${d_data.stage3_deadline} as ${nameShorting(d_data4.fname + ' ' + d_data4.lname)} has already paid arbitration fees. In case you fail to submit fees, then ${nameShorting(d_data4.fname + ' ' + d_data4.lname)} will win the dispute.`,
          `طرف مقابل شما در اختلاف نسبت به پرداخت هزینه های داوری و ارسال مدارک نهایی اقدام کرده است. بنابراین شما می بایست تا قبل از تاریخ ${persianData(d_data.stage3_deadline)} نسبت به پرداخت هزینه های داوری و ارسال مدارک نهایی اقدام نمایید. در غیر این صورت ${nameShorting(d_data4.fname + ' ' + d_data4.lname)} در اختلاف پیروز خواهد شد.`]
        } else if (d_data.poster_fees_paid == "Y" && type == "P" && d_data.tasker_fees_paid == "Y" && d_data.poster_evidence_submitted === "N") {
          return [`You have to submit evidences by ${d_data.stage3_deadline} as ${nameShorting(d_data4.fname + ' ' + d_data4.lname)} has already paid arbitration fees. In case you fail to submit evidences, then ${nameShorting(d_data4.fname + ' ' + d_data4.lname)} will win the dispute.`,
          `طرف مقابل شما در اختلاف نسبت به پرداخت هزینه های داوری و ارسال مدارک نهایی اقدام کرده است. بنابراین شما می بایست تا قبل از تاریخ ${persianData(d_data.stage3_deadline)} نسبت به پرداخت هزینه های داوری و ارسال مدارک نهایی اقدام نمایید. در غیر این صورت ${nameShorting(d_data4.fname + ' ' + d_data4.lname)} در اختلاف پیروز خواهد شد.`]
        } else if (d_data.poster_fees_paid == "Y" && type == "T" && d_data.tasker_fees_paid == "Y" && d_data.tasker_evidence_submitted === "N") {
          return [`You have to submit evidences by ${d_data.stage3_deadline} as ${nameShorting(d_data3.fname + ' ' + d_data3.lname)} has already paid arbitration fees. In case you fail to submit evidences, then ${nameShorting(d_data3.fname + ' ' + d_data3.lname)} will win the dispute.`,
          `طرف مقابل شما در اختلاف نسبت به پرداخت هزینه های داوری و ارسال مدارک نهایی اقدام کرده است. بنابراین شما می بایست تا قبل از تاریخ ${persianData(d_data.stage3_deadline)} نسبت به پرداخت هزینه های داوری و ارسال مدارک نهایی اقدام نمایید. در غیر این صورت ${nameShorting(d_data3.fname + ' ' + d_data3.lname)} در اختلاف پیروز خواهد شد.`]
        } else {
          return ["", ""];
        }
      } else if (d_data.status == "S4") {
        return ["EazyPay team will check the provided evidences and give the result within 15 days", "تیم ایران تسکر شواهد ومدارک ارائه شده را بررسی کرده و در مدت ۱۵ روز نتیجه را اعلام خواهد کرد"]
      }
    } catch (error) {
      console.log("getredtext", error)
    }
  };
  const submit = async () => {
    try {

      if (message == '' || message.trim() == '') {
        Toast.show(
          language == 'en'
            ? 'Please enter Message'
            : 'لطفا نام دارنده حساب را وارد کنید',
        );
      } else {
        setLoaderSubmit(true);
        const finalFormData = new FormData();
        finalFormData.append('id', id);
        finalFormData.append('message', message);
        imageFinalArray.map((item, index) => {
          finalFormData.append('file[]', {
            uri: item.uri,
            name: item.name,
            type: item.type,
          });
        });

        if (d_data.poster_fees_paid == "Y" && type == "P" || d_data.tasker_fees_paid == "Y" && type == "T") {

          if (d_data.tasker_fees_paid == 'Y' && (type == 'T' || type == 'P') && d_data.tasker_evidence_submitted == "N") {
            if (evidancecheckBox) {
              const data = finalFormData
              const res = await axiosInstance.post("dispute-evidence-submit", data)
              if (res.data.error) {
                console.log("*************************", res.data.error)
              } else {
                Toast.show(res.data.success.meaning);
                getTokon()
                setImageFinalArray([])
                setmessage("")
              }
            } else {
              Toast.show(language === "en" ? "are you agree with this Terms and Conditions ? Then select the mark" : "آیا با این شرایط و ضوابط موافق هستید؟ سپس علامت را انتخاب کنید")
            }
          } else {
            const data = finalFormData
            const res = await axiosInstance.post("dispute-evidence-submit", data)
            if (res.data.error) {
              // console.log("*************************", res.data.error)
            } else {
              Toast.show(res.data.success.meaning);
              getTokon()
              setImageFinalArray([])
              setmessage("")
            }
          }

        } else {
          const data = finalFormData
          const res = await axiosInstance.post("dispute-message", data)
          if (res.data.error) {
            // console.log("--------------------------", res.data.error)
            // console.log(imageFinalArray)
          } else {
            Toast.show(res.data.success.meaning);
            getTokon()
            setImageFinalArray([])
            setmessage("")
          }
        }
      }
      setLoaderSubmit(false);
    } catch (error) {
      setLoaderSubmit(false);
      console.log(error);
    }
  };
  const accept = async () => {
    try {
      setAcceptModal(!acceptModal);
      setLoaderAccept(true);
      const data = {
        "params": {
          "id": id
        }
      }
      const res = await axiosInstance.post("accept-dispute", data)
      // console.log(res.data)
      if (res.data.success) {
        Toast.show(res.data.success.meaning);
        getTokon()
      } else {
        Toast.show(res.data.error.meaning);
      }
      setLoaderAccept(false);
    } catch (error) {
      setLoaderAccept(false);
      console.log(error);
    }
  };
  const counter = async () => {
    try {
      var finalAmount = ""

      if (language == "en") {
        var amountInteger = parseInt(amount)
        finalAmount = amount

      } else {
        var amountInteger = parseInt(amount.toEnglishDigits())

        finalAmount = amount.toEnglishDigits().toString()
      }

      if (amount == '' || amount.trim() == '') {
        Toast.show(
          language == 'en'
            ? 'Please enter Amount'
            : 'لطفا نام دارنده حساب را وارد کنید',
        );
      } else if (numberCheck(finalAmount) != true) {
        Toast.show(strings.MAKEANOFFER.VALIDNUMBER)
      } else if (type == "P" && amountInteger < (parseInt(d_data.offer_by_poster) + 10)) {
        Toast.show(
          language == 'en'
            ? 'Please enter a value greater than or equal to ' + (parseInt(d_data.offer_by_poster) + 10)
            : 'لطفا نام دارنده حساب را وارد کنید',
        );
      } else if (amountInteger < 5) {
        Toast.show(strings.MAKEANOFFER.MINIMUMBUDGET_GURUTASKER);
      } else if (type == "T" && amountInteger > (parseInt(d_data.offer_by_tasker) - 10)) {
        Toast.show(
          language == 'en'
            ? 'Please enter a value greater than or equal to ' + (parseInt(d_data.offer_by_tasker) - 10)
            : 'لطفا نام دارنده حساب را وارد کنید',
        );
      }
      else {
        setLoaderCounter(true);
        const finalFormData = new FormData();
        finalFormData.append('id', id);
        finalFormData.append('amount', amountInteger);
        const data = finalFormData
        const res = await axiosInstance.post("dispute-counter-offer", data)
        if (res) {
          Toast.show(res.data.success.meaning);
          getTokon()
        }
        setLoaderCounter(false);
        setCounterbox(!counterbox)
      }
    } catch (error) {
      setLoaderCounter(false);
      console.log(error);
    }
  };
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
  const opensummery = () => {
    if (isSelected) {
      setArbitration(!arbitration)
      setIsvisible2(!isVisible2)
    } else {
      Toast.show(
        language == 'en'
          ? 'Please agree first' : 'لطفا نام دارنده حساب را وارد کنید',
      );
    }

  };
  const finalPay = async () => {
    try {
      setLoaderPay(true)
      if (payment_method != "") {
        const data = {
          "params": {
            "id": id
          }
        }
        const res = await axiosInstance.post("pay-dispute-fees", data)
        console.log(res.data)
        if (res.data.redirect_url) {
          console.log("data")

          setApiUri(res.data.redirect_url)
          setIsPaymentgateway(true)
          setLoaderPay(false)
        } else {
          if (res.data.result) {
            Toast.show(res.data.result.status.meaning)
            // setIsvisible2(!isVisible2)
            setLoaderPay(false)
          } else {
            if (res.data.error.meaning) {
              Toast.show(res.data.error.meaning)
              setIsvisible2(!isVisible2)
              setLoaderPay(false)
            } else {
              Toast.show(res.data.error.message)
              // setIsvisible2(!isVisible2)
              setLoaderPay(false)
            }
          }
        }
      } else {
        Toast.show(strings.ERROR.WAIT)

      }
    } catch (error) {
      console.log("finalPay", error)
      setLoaderPay(false)
    }
  };
  const onPressPamentGetWay = () => {
    console.log("3", ispaymentgateway)

    if (ispaymentgateway == true) {

      setIsPaymentgateway(false)
      Toast.show(strings.ERROR.PAYMENTCANCEL)
    } else {
      console.log("1", ispaymentgateway)
      setIsPaymentgateway(true)
      console.log("2", ispaymentgateway)

    }
  }
  const onNavigationStateChangeHandle = ({ url }) => {
    // console.log(url)
    if (url == `${axiosUrl.URL}payment-fail`) {
      onPressPamentGetWay()

      if (Platform.OS == "ios") {
        Alert.alert(
          "Fail!",
          "Payment Failed",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
    } else if (url == `${axiosUrl.URL}payment-cancel`) {
      onPressPamentGetWay()
      if (Platform.OS == "ios") {
        Alert.alert(
          "Cancel!",
          "Payment Cancelled",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
    } else if (url == `${axiosUrl.URL}payment-success`) {
      setIsvisible2(!isVisible2)
      setIsPaymentgateway(!ispaymentgateway)
      getData()
      if (Platform.OS == "ios") {
        Alert.alert(
          "Success!",
          "Payment Done Sucessfully",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
      Toast.show(strings.ERROR.SUCCESSFULLYTASKASSIGNED)

    } else if (url == `${axiosUrl.URL}payment-in-progress`) {
      onPressPamentGetWay()

      if (Platform.OS == "ios") {
        Alert.alert(
          "Success!",
          "Payment in progress",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
    } else {
      console.log(url)
    }
  }
  return (
    <>
      {loader || d_data == '' || nego == [] || d_data4 == "" || d_data3 == "" || d_data2 == "" ? (
        <LoaderPage />
      ) : (
        <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

          <KeyboardAvoidingView
            behavior={(Platform.OS === 'ios') ? "padding" : null} style={styles.container}>
            <Header navigation={navigation} back name={strings.MORESCREEN.DISPUTEDETAILS} />
            <CurveDesing_Component   >
              <View style={globalstyles.container_only_padding} >
                <ScrollView
                  keyboardShouldPersistTaps="always"
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  contentContainerStyle={{ paddingBottom: Normalize(25) }}
                  showsVerticalScrollIndicator={false}
                >
                  <Text style={{
                      fontSize: Normalize(15),
                      color: Colors.primary,
                      textAlign: leftOrRight(language),
                      marginTop: Normalize(4),
                      fontFamily: 'Outfit-SemiBold'
                    }}>
                    {d_data2}
                  </Text>
                  <View style={{ flexDirection: rowOrRowreverse(language) }}>
                    <Text
                      style={{
                        color: '#666',
                        marginTop: 10,
                        fontSize: Normalize(13),
                        fontFamily: 'Outfit-SemiBold',
                      }}>
                      {/* {strings.MORESCREEN.DISPUTES} */}
                      {
                        language === "en" ? "Dispute" : "طرفین اختلاف"
                      }
                    </Text>
                    <Text
                      style={{
                        color: '#666',
                        marginTop: 10,
                        fontSize: Normalize(12),
                        fontFamily: 'Outfit-Medium',
                      }}>
                      :
                    </Text>
                    <Text
                      style={{
                        color: '#666',
                        marginHorizontal: 5,
                        marginTop: 10,
                        fontSize: Normalize(12),
                        fontFamily: 'Outfit-Regular',
                        textAlign: leftOrRight(language)
                      }}>
                      {nameShorting(d_data3.fname + ' ' + d_data3.lname)}
                    </Text>
                    <Text
                      style={{
                        color: '#666',
                        marginHorizontal: 2,
                        marginTop: 10,
                        fontSize: Normalize(12),
                        fontFamily: 'Outfit-SemiBold',
                      }}>
                      ({language == "en" ? "vs" : "در اختلاف با"})
                    </Text>
                    <Text
                      style={{
                        color: '#666',
                        marginHorizontal: 2,
                        marginTop: 10,
                        fontSize: Normalize(12),
                        fontFamily: 'Outfit-Regular',
                        textAlign: leftOrRight(language)
                      }}>
                      {nameShorting(d_data4.fname + ' ' + d_data4.lname)}
                    </Text>
                  </View>

                  <View style={{ flexDirection: rowOrRowreverse(language) }}>
                    <Text
                      style={{
                        color: '#666',
                        marginTop: 10,
                        fontSize: Normalize(13),
                        marginBottom: 5,
                        fontFamily: 'Outfit-SemiBold',
                      }}>
                      {language == "en" ? "Amount in Disputes :" : "مبلغ مورد اختلاف  :"}
                    </Text>
                    <Text
                      style={{
                        color: '#666',
                        marginTop: 10,
                        fontSize: Normalize(12),
                        marginBottom: 5,
                        fontFamily: 'Outfit-Medium',
                        textAlign: leftOrRight(language),
                        marginHorizontal: 5,
                      }}>{strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian(parseInt(d_data.amount), language)}</Text>
                  </View>
                  <View
                    style={{
                      marginBottom: Normalize(7),
                      flexDirection: rowOrRowreverse(language),
                      marginTop: Normalize(3),
                      justifyContent: "space-between",
                      height: Normalize(135),
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '33%',
                        height: '100%',
                        borderColor: '#ddd',
                        borderWidth: Normalize(1),
                        borderRadius: 5,
                      }}>
                      <View style={{ flex: 1 }} >
                        <Image
                          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                          source={images.stage1}
                        />
                      </View>

                      <View
                        style={{
                          flex: 1,
                          backgroundColor:
                            d_data.status == 'S1' ? Colors.secondary : '#95A9AF',
                          alignItems: 'center',
                          justifyContent: "space-evenly"

                        }}>
                        <Text
                          style={{
                            fontSize: Normalize(12),
                            color: '#fff',
                            fontFamily: 'Outfit-SemiBold',
                          }}>
                          {language == "en" ? "Stage 1" : "مرحله ی ۱"}
                        </Text>
                        <Text
                          numberOfLines={2}
                          style={{
                            color: '#fff',
                            fontSize: Normalize(9),
                            textAlign: 'center',
                            marginBottom: 5,
                          }}>
                          {language == "en" ? "Identify the \n issue" : 'اختلافات را شناسایی کنید'}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '33%',
                        height: '100%',
                        borderColor: '#ddd',
                        borderWidth: Normalize(1),
                        borderRadius: 5,
                      }}>
                      <View style={{ flex: 1 }} >
                        <Image
                          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                          source={images.stage2}
                        />
                      </View>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor:
                            d_data.status == 'S2' ? Colors.secondary : '#95A9AF',
                          alignItems: 'center',
                          justifyContent: "space-evenly"
                        }}>
                        <Text
                          style={{
                            fontSize: Normalize(12),
                            color: '#fff',
                            fontFamily: 'Outfit-SemiBold',
                          }}>
                          {language == "en" ? "Stage 2" : "مرحله ۲"}
                        </Text>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: Normalize(9),
                            textAlign: 'center',
                            marginBottom: 5,
                          }}>
                          {language == "en" ? "Negotiations final offer" : "مذاکره و ارائه پیشنهادات"}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '33%',
                        height: '100%',
                        borderColor: '#ddd',
                        borderWidth: Normalize(1),
                        borderRadius: 5,
                      }}>
                      <View style={{ flex: 1 }} >
                        <Image
                          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                          source={images.stage3}
                        />
                      </View>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor:
                            d_data.status == 'S3' || d_data.status == 'S4' ? Colors.secondary : '#95A9AF',
                          alignItems: 'center',
                          justifyContent: "space-evenly"
                        }}>
                        <Text
                          style={{
                            fontSize: Normalize(12),
                            color: '#fff',
                            fontFamily: 'Outfit-SemiBold',
                          }}>
                          {language == "en" ? "Stage 3" : "مرحله ۳"}
                        </Text>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: Normalize(9),
                            textAlign: 'center',
                            marginBottom: 5,
                          }}>
                          {language == "en" ? "EazyPay evidences and evidences" : 'مدارک و مستندات'}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      borderColor: '#d2d4d6',
                      borderWidth: Normalize(1),
                      borderRadius: 5,
                      marginVertical: Normalize(5),
                    }}>
                    <Text
                      style={{
                        fontSize: Normalize(11.5),
                        color: '#555',
                        marginVertical: 10,
                        alignSelf: 'center',
                        fontFamily: 'Outfit-Medium',
                      }}>{language == "en" ? "Total amount disputed : " : "مبلغ مورد اختلاف :"} {strings.BROWSEFILTER.TOMAN} <Text style={{ fontFamily: 'Outfit-SemiBold' }} >{addCommaAndTranslateInPersian(parseInt(d_data.amount), language)}</Text></Text>
                    <View
                      style={{ height: 1, backgroundColor: '#95A9AF', width: '100%' }}
                    />

                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ width: '49%', flexDirection: 'column' }}>
                        {d_data.offer_by_tasker ? (
                          <>
                            <Text
                              style={{
                                color: '#666',
                                marginTop: 10,
                                fontSize: Normalize(10),
                                fontFamily: 'Outfit-Medium',
                                textAlign: 'center',
                              }}>
                              {language == "en" ? `Tasker ${type == 'T' ? '(You)' : ''} wants to Receive :`
                                :
                                `مجری ${type == 'T' ? '(شما)' : ''} می خواهد دریافت کند :`
                              }
                            </Text>
                            <Text style={{
                              color: Colors.primary, alignSelf: 'center', fontSize: Normalize(10), marginBottom: 10,
                              fontFamily: 'Outfit-Medium', flexDirection: rowOrRowreverse(language)
                            }}>{strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian(parseInt(d_data.offer_by_tasker), language)}</Text>
                          </>
                        ) : null}
                      </View>
                      <View
                        style={{
                          width: 1,
                          backgroundColor: '#95A9AF',
                          height: '90%',
                          alignSelf: 'center',
                        }}
                      />
                      <View style={{ width: '49%' }}>
                        {d_data.offer_by_poster ? (
                          <>
                            <Text
                              style={{
                                color: '#666',
                                marginHorizontal: 5,
                                marginTop: 10,
                                fontSize: Normalize(10),
                                fontFamily: 'Outfit-Medium',
                                textAlign: 'center',
                              }}>
                              {language == "en" ? `Poster ${type == 'P' ? '(You)' : ''} wants to Pay :` : `کارفرما ${type == 'P' ? '(شما)' : ''} می خواهد پرداخت کند :`}
                            </Text>

                            <Text style={{
                              color: Colors.primary, alignSelf: 'center', fontSize: Normalize(10), marginBottom: 10,
                              fontFamily: 'Outfit-Medium', flexDirection: rowOrRowreverse(language)
                            }}>{strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian(parseInt(d_data.offer_by_poster), language)}</Text>
                          </>
                        ) : null}
                      </View>
                    </View>
                    <View
                      style={{ height: 0.5, backgroundColor: '#95A9AF', width: '100%' }}
                    />

                    {type == d_type || d_data.status == 'S3' || d_data.status == "S4" || d_data.status == "C" ? null : (
                      <View>
                        {counterbox ? (
                          <View>
                            <TextInput
                              value={language == "en" ? amount : engToPersian(amount)}
                              onChangeText={e => setAmount(e)}
                              keyboardType="number-pad"
                              autoCapitalize="none"
                              placeholder={"Amount you want to recive"}
                              placeholderTextColor={Colors.textinput_inner_text}
                              style={[
                                styles.inputStyle,
                                {
                                  alignSelf: 'center',
                                  width: '90%',
                                  marginTop: 30,
                                  marginRight: Normalize(0),
                                },
                                {
                                  borderColor: amIsFocused
                                    ? Colors.primary
                                    : Colors.grey,
                                },
                                language == 'pr'
                                  ? { ...RtlStyles.textInverse }
                                  : { ...RtlStyles.text },
                              ]}
                              onFocus={() => setAmIsFocused(true)}
                              onBlur={() => setAmIsFocused(false)}
                            />

                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                              }}>
                              <TouchableOpacity
                                onPress={() => setCounterbox(!counterbox)}>
                                <Text
                                  style={{
                                    color: '#fff',
                                    backgroundColor: Colors.secondary,
                                    marginHorizontal: 10,
                                    marginVertical: 10,
                                    paddingVertical: 10,
                                    paddingHorizontal: 15,
                                    borderRadius: 5,
                                    fontSize: Normalize(12),
                                    textAlign: 'center',
                                    fontFamily: 'Outfit-Medium',
                                    alignSelf: 'center',
                                    width: 140,
                                  }}>
                                  {strings.POSTTASK.CANCEL}
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={counter}
                                disabled={loadercounter ? true : false}
                              >
                                {loadercounter ? (
                                  <View
                                    style={{
                                      backgroundColor: Colors.secondary,
                                      width: 140,
                                      marginHorizontal: 10,
                                      marginVertical: 10,
                                      paddingVertical: 10,
                                      paddingHorizontal: 15,
                                      borderRadius: 5,
                                    }}>
                                    <ActivityIndicator
                                      size="small"
                                      color={Colors.white}
                                    />
                                  </View>
                                ) : (
                                  <Text
                                    style={{
                                      color: '#fff',
                                      backgroundColor: Colors.secondary,
                                      marginHorizontal: 10,
                                      marginVertical: 10,
                                      paddingVertical: 10,
                                      paddingHorizontal: 15,
                                      borderRadius: 5,
                                      fontSize: Normalize(11.5),
                                      textAlign: 'center',
                                      width: 140,
                                      fontFamily: 'Outfit-Regular',
                                      alignSelf: 'center',
                                    }}>
                                    {strings.MAKEANOFFER.SUBMIT}
                                  </Text>
                                )}
                              </TouchableOpacity>
                            </View>
                          </View>
                        ) : null}

                        {counterbox ? null : (
                          <View
                            style={{
                              flexDirection: rowOrRowreverse(language),
                              marginTop: 20,
                              justifyContent: 'center',
                            }}>
                            <TouchableOpacity onPress={() => setAcceptModal(!acceptModal)}
                              disabled={loaderaccept ? true : false}
                            >
                              {loaderaccept ? (
                                <View
                                  style={{
                                    backgroundColor: Colors.secondary,
                                    width: 120,
                                    marginHorizontal: 10,
                                    marginVertical: 10,
                                    paddingVertical: 10,
                                    paddingHorizontal: 15,
                                    borderRadius: 5,
                                  }}>
                                  <ActivityIndicator
                                    size="small"
                                    color={Colors.white}
                                  />
                                </View>
                              ) : (
                                <Text
                                  style={{
                                    color: '#fff',
                                    backgroundColor: Colors.secondary,
                                    marginHorizontal: 10,
                                    marginVertical: 10,
                                    paddingVertical: 10,
                                    paddingHorizontal: 15,
                                    borderRadius: 5,
                                    fontSize: Normalize(12),
                                    fontFamily: 'Outfit-Medium',
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                    width: 120,
                                  }}>
                                  {strings.TASKDETAILS.ACCEPT2}
                                </Text>
                              )}
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => setCounterbox(!counterbox)}>
                              <Text
                                style={{
                                  color: '#fff',
                                  backgroundColor: Colors.secondary,
                                  marginHorizontal: 10,
                                  marginVertical: 10,
                                  paddingVertical: 10,
                                  paddingHorizontal: 15,
                                  borderRadius: 5,
                                  fontSize: Normalize(11.5),
                                  fontFamily: 'Outfit-Medium',
                                  alignSelf: 'center',
                                  textAlign: 'center',
                                  width: 140,
                                }}>
                                {language == "en" ? "Counter Offer" : "پیشنهاد جدید"}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    )}
                    {d_data.status == 'S2' ? (
                      <TouchableOpacity
                        onPress={() => setArbitration(!arbitration)}
                        style={{ marginVertical: 20, alignItems: "center" }}>
                        <Text style={{ fontFamily: 'Outfit-Medium', backgroundColor: Colors.secondary, padding: "2.5%", color: Colors.white, borderRadius: 7, letterSpacing: 0.5 }}>
                          {language == "en" ? "FILE ARBITRATION" : "داوری پرونده"}
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                    {d_data.status == 'C' ? (
                      <View
                        style={{ width: '100%', marginVertical: 20, flexDirection: 'column' }}>
                        <Text style={{ alignSelf: 'center', textAlign: 'center' }}>
                          {language == "en" ? "Result Receive :" : "بازپرداخت به حساب شما :"} {strings.BROWSEFILTER.TOMAN} <Text style={{ fontFamily: 'Outfit-SemiBold' }} >{type == "T" ? addCommaAndTranslateInPersian(parseInt(d_data.tasker_received_amount), language) : addCommaAndTranslateInPersian(parseInt(d_data.poster_received_amount), language)}</Text></Text>
                        <Text style={{ alignSelf: 'center', textAlign: 'center', marginTop: 15, fontFamily: 'Outfit-Medium', }}>
                          {language == "en" ? "RESOLVED DISPUTE" : "اختلاف حل شده است"}
                        </Text>
                      </View>
                    ) : null}


                    {d_data.status == 'S3' &&
                      d_data.tasker_fees_paid == 'Y' &&
                      type == 'P' &&
                      d_data.poster_fees_paid == 'N' ? (
                      <TouchableOpacity
                        onPress={() => setArbitration(!arbitration)}
                        style={{ marginVertical: 20 }}>
                        <Text style={{ alignSelf: 'center', backgroundColor: Colors.primary, color: Colors.white, padding: "2%", borderRadius: 5, fontFamily: 'Outfit-SemiBold', fontSize: Normalize(11) }}>
                          {language == "en" ? "PAY ARBITRATION FEES" : "پرداخت هزینه های داوری"}
                        </Text>
                      </TouchableOpacity>
                    ) : null}


                    {d_data.status == 'S3' &&
                      d_data.poster_fees_paid == 'Y' &&
                      type == 'T' &&
                      d_data.tasker_fees_paid == 'N' ? (
                      <TouchableOpacity
                        onPress={() => setArbitration(!arbitration)}
                        style={{ marginVertical: 20 }}>
                        <Text style={{ alignSelf: 'center', backgroundColor: Colors.primary, color: Colors.white, padding: "2%", borderRadius: 5, fontFamily: 'Outfit-SemiBold', fontSize: Normalize(11) }}>
                          {language == "en" ? "PAY ARBITRATION FEES" : "پرداخت هزینه های داوری"}
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>

                  {type == d_type ? null : (
                    <View >
                      {d_data.status == 'S1' ? (
                        <Text
                          style={{
                            color: Colors.secondary,
                            marginHorizontal: 15,
                            textAlign: 'center',
                            marginBottom: 20,
                          }}>
                          {language == "en" ?
                            `You have to respond by ${d_data.stage1_deadline}. In case you fail to respond, the ${type == 'P' ? 'Tasker ' + nameShorting(d_data4.fname + ' ' + d_data4.lname) : 'Poster ' + nameShorting(d_data3.fname + ' ' + d_data3.lname)}  will win the dispute`
                            :
                            `شما می بایست قبل از تاریخ ${questionPersianTimeShow(d_data.stage1_deadline)}. پاسخ دهید، در غیر اینصورت ${type == 'P' ? '' + nameShorting(d_data4.fname + ' ' + d_data4.lname) : nameShorting(d_data3.fname + ' ' + d_data3.lname)} در اختلاف پیروز خواهد شد.`
                          }</Text>
                      ) : null}
                    </View>
                  )}

                  {
                    getredtext() !== undefined &&
                    <Text
                      style={{
                        color: Colors.secondary,
                        marginHorizontal: 15,
                        textAlign: 'center',
                        marginBottom: 20,
                        fontSize: Normalize(11)
                      }}>

                      {
                        language === "en" ? (getredtext())[0] : (getredtext())[1]
                      }
                    </Text>}
                  <Text
                    style={{
                      color: '#444',
                      marginVertical: 10,
                      fontSize: Normalize(14),
                      fontFamily: 'Outfit-Medium',
                      textAlign: leftOrRight(language)
                    }}>
                    {language == "en" ? "Negotiation" : "مذاکرات"}
                  </Text>
                  {nego.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        width: '99%',
                        alignSelf: "center",
                        flexDirection: 'row',
                        elevation: Normalize(2),
                        backgroundColor: Colors.white,
                        borderRadius: 8,
                        marginBottom: Normalize(8),
                        padding: Normalize(8),
                      }}>
                      <View
                        style={{
                          flexDirection: language === 'en' ? 'row' : 'row-reverse',
                          flex: 1,
                          alignSelf: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: language === 'en' ? 'row' : 'row-reverse',
                            width: '100%',
                          }}>
                          <Image
                            style={{ width: 60, height: 60, borderRadius: 30 }}
                            source={{
                              uri:
                                'https://changicourt.com/dev/storage/app/public/profile_picture/' +
                                item.get_user.profile_picture,
                            }}
                            resizeMode="cover"
                          />
                          <View
                            style={{
                              flexDirection: 'column',
                              marginLeft: 15,
                              flex: 1,
                            }}>
                            <View
                              style={{
                                flexDirection: language === 'en' ? 'row' : 'row-reverse',
                                justifyContent: 'space-between',
                                width: "95%"
                              }}>

                              <View style={{ flexDirection: language === 'en' ? 'row' : 'row-reverse', alignSelf: language == "en" ? "flex-start" : "flex-end", width: "50%" }} >
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    color: '#38393e',
                                    fontFamily: 'Outfit-Medium',
                                    fontSize: Normalize(12),
                                    marginRight: language === 'en' ? 0 : Normalize(10),
                                  }}>
                                  {nameShorting(
                                    item.get_user.fname + ' ' + item.get_user.lname)}
                                </Text>
                                {
                                  item.admin_id != null &&
                                  <Text
                                    style={{
                                      color: '#38393e',
                                      fontFamily: 'Outfit-Medium',
                                      fontSize: Normalize(11),
                                      marginHorizontal: Normalize(2),
                                    }}>
                                    {strings.DISPUTE.FINALEVIDENCE}
                                  </Text>
                                }
                              </View>
                            </View>
                            <View style={{ flexDirection: language === 'en' ? 'row' : 'row-reverse', alignSelf: "flex-start", marginVertical: Normalize(4) }}>
                              <Image
                                style={{ width: Normalize(9), height: Normalize(9), opacity: 0.6, alignSelf: 'center' }}
                                source={images.clockIcon}
                                resizeMode="contain"
                              />
                              <Text
                                style={{ color: '#818181', fontFamily: 'Outfit-Regular', fontSize: Normalize(9), }}>
                                {' '}
                                {language == "en" ? moment(item.created_at, 'YYYY-MM-DD HH:mm:ss',).format('DD/MM/YY hh:mm A') : questionPersianTimeShow(item.created_at)}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                borderRadius: 5,
                                borderWidth: Normalize(1),
                                borderColor: Colors.disable_textinput_border,
                                marginTop: Normalize(3),
                                paddingVertical: 15,
                                backgroundColor: Colors.disable_textinput_background
                              }}>
                              <Text
                                style={{
                                  fontSize: Normalize(11),
                                  fontFamily: 'Outfit-Regular',
                                  color: Colors.textinput_inner_text,
                                  lineHeight: Normalize(14),
                                  paddingHorizontal: Normalize(12)
                                }}>
                                {item.message}
                              </Text>
                              {item.get_attachments.length > 0 ? (
                                <View style={{ flexDirection: 'column', width: "100%" }}>
                                  <View style={{ flexDirection: rowOrRowreverse(language), alignItems: "center", marginVertical: Normalize(5) }} >
                                    <View style={{ height: Normalize(12), width: Normalize(12) }} >
                                    </View>
                                    <Text
                                      style={[globalstyles.blue_Text, { fontSize: Normalize(12) }]}>Attachment</Text>
                                  </View>



                                  {item.get_attachments.map((item, index) => (
                                    <TouchableOpacity
                                      key={index}
                                      style={{ flexDirection: rowOrRowreverse(language) }}
                                      onPress={() => {
                                        Linking.openURL(`${ImageLink.Dispute}${item.file_name}`)
                                      }}
                                    >
                                      <View
                                        style={{
                                          width: Normalize(8),
                                          height: Normalize(8),
                                          borderRadius: Normalize(8) / 2,
                                          marginLeft: Normalize(9),
                                          alignSelf: 'center',
                                          backgroundColor: Colors.primary,
                                        }}
                                      />
                                      <Text
                                        numberOfLines={1}
                                        style={{
                                          fontSize: Normalize(11),
                                          margin: 5,
                                          fontFamily: 'Outfit-SemiBold',
                                          color: '#b2b5b9',
                                          width: "90%",
                                          textAlign: leftOrRight(language)
                                        }}>
                                        {item.file_name.substr(16)}
                                      </Text>
                                    </TouchableOpacity>
                                  ))}
                                </View>
                              ) : null}
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}

                  {d_data.status == 'C' ? (
                    <View
                      style={{
                        width: '100%',
                        paddingVertical: Normalize(10),
                        flexDirection: 'row',
                        elevation: Normalize(2),
                        backgroundColor: Colors.white,
                        marginTop: Normalize(7),
                      }}>
                      <View style={styles.leftLine} />
                      {
                        admin != null &&
                        <View
                          style={{
                            flexDirection: language === 'en' ? 'row' : 'row-reverse',
                            flex: 1,
                            alignSelf: 'center',
                            marginLeft: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: language === 'en' ? 'row' : 'row-reverse',
                              width: '100%',
                            }}>
                            <Image
                              style={{ width: 60, height: 60, borderRadius: 30 }}
                              source={{
                                uri: 'https://changicourt.com/dev/public/blank.png',
                              }}
                              resizeMode="cover"
                            />
                            <View
                              style={{
                                flexDirection: 'column',
                                marginLeft: 15,
                                flex: 1,
                              }}>
                              <View
                                style={{
                                  flexDirection:
                                    language === 'en' ? 'row' : 'row-reverse',
                                  justifyContent: 'space-between',
                                }}>
                                <Text
                                  style={{
                                    color: '#38393e',
                                    marginLeft: 0,
                                    fontFamily: 'Outfit-Medium',
                                    fontSize: Normalize(13),
                                    marginRight: language === 'en' ? 0 : Normalize(10),
                                  }}>
                                  {language == "en" ? 'EazyPay admin' : "EazyPay admin"}
                                </Text>
                                <View
                                  style={{
                                    flexDirection:
                                      language === 'en' ? 'row' : 'row-reverse',
                                    alignSelf: 'center',
                                  }}>
                                  <Image
                                    style={{
                                      width: Normalize(9), height: Normalize(9),
                                      opacity: 0.6,
                                      alignSelf: 'center',
                                    }}
                                    source={images.clockIcon}
                                    resizeMode="contain"
                                  />
                                  <Text
                                    style={{
                                      color: '#818181',
                                      marginLeft: 0,
                                      fontFamily: 'Outfit-Regular',
                                      fontSize: Normalize(10),
                                      alignSelf: 'center',
                                      marginHorizontal: 15,
                                    }}>
                                    {' '}
                                    {language == "en" ? moment(admin.created_at, 'YYYY-MM-DD HH:mm:ss').format('Do MMM, YYYY hh:mm A') : questionPersianTimeShow(admin.created_at.substr(0, 10))}
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'column',
                                  justifyContent: 'space-between',
                                  borderRadius: 5,
                                  borderWidth: Normalize(1),
                                  borderColor: '#a2a3a4',
                                  marginRight: 15,
                                  marginVertical: 10,
                                  paddingVertical: 15,
                                }}>
                                <Text
                                  style={{
                                    color: '#818181',
                                    marginLeft: language === 'en' ? 10 : 5,
                                    fontFamily: 'Outfit-Regular',
                                    lineHeight: 20,
                                    fontSize: 13,
                                    marginRight: language === 'en' ? 0 : Normalize(5),
                                    textAlign: language === 'en' ? 'left' : 'right',
                                  }}>
                                  {language == "en" ? admin.message : admin.message_fa}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      }
                    </View>
                  ) : null}

                  {d_data.status == 'C' ||
                    (
                      type == 'P' &&
                      d_data.poster_evidence_submitted == 'Y') ||
                    (
                      type == 'T' &&
                      d_data.tasker_evidence_submitted == 'Y') ? null : (
                    <View
                      style={{
                        width: '98%',
                        alignSelf: "center",
                        paddingVertical: Normalize(10),
                        flexDirection: 'row',
                        elevation: Normalize(2),
                        backgroundColor: Colors.white,
                        marginTop: Normalize(7),
                        borderRadius: Normalize(8)
                      }}>
                      <View
                        style={{
                          flexDirection: language === 'en' ? 'row' : 'row-reverse',
                          flex: 1,
                          alignSelf: 'center',
                          marginLeft: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: language === 'en' ? 'row' : 'row-reverse',
                            width: '100%',
                          }}>
                          {type == 'P' ? (
                            <Image
                              style={{ width: 60, height: 60, borderRadius: 30 }}
                              source={{
                                uri:
                                  'https://changicourt.com/dev/storage/app/public/profile_picture/' +
                                  d_data3.profile_picture,
                              }}
                              resizeMode="cover"
                            />
                          ) : (
                            <Image
                              style={{ width: 60, height: 60, borderRadius: 30 }}
                              source={{
                                uri:
                                  'https://changicourt.com/dev/storage/app/public/profile_picture/' +
                                  d_data4.profile_picture,
                              }}
                              resizeMode="cover"
                            />
                          )}
                          <View
                            style={{
                              flexDirection: 'column',
                              marginHorizontal: Normalize(11),
                              flex: 1,
                            }}>
                            <View
                              style={{
                                flexDirection:
                                  language === 'en' ? 'row' : 'row-reverse',
                                justifyContent: 'space-between',
                              }}>
                              <Text
                                style={{
                                  color: '#38393e',
                                  fontFamily: 'Outfit-Medium',
                                  textAlign: leftOrRight(language),
                                }}>
                                {type == 'P'
                                  ? nameShorting(d_data3.fname + ' ' + d_data3.lname)
                                  : nameShorting(d_data4.fname + ' ' + d_data4.lname)}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection:
                                  language === 'en' ? 'row' : 'row-reverse',
                                justifyContent: 'space-between',
                              }}>
                              {(d_data.poster_fees_paid == 'Y' && type == 'P' && d_data.poster_evidence_submitted == "N") ||
                                (d_data.tasker_fees_paid == 'Y' && type == 'T' && d_data.tasker_evidence_submitted == "N") ? (
                                <Text
                                  style={{
                                    color: '#666',
                                    fontFamily: 'Outfit-Regular',
                                    fontSize: Normalize(10),
                                    marginTop: 5,
                                    marginRight:
                                      language === 'en' ? 0 : Normalize(10),
                                    textAlign: "justify",
                                    // paddingHorizontal:"1%"
                                  }}>
                                  {language == "en" ? `Please submit final evidences by ${d_data.stage3_deadline} using the below message section. Note that you will be able to submit the evidences only once and will not be allowed to modify the evidences then after, so make sure to include all the evidences, preferably in a image file format.` : `لطفا مدارک و مستندات نهایی را تا تاریخ ${questionPersianTimeShow(d_data.stage3_deadline)} با استفاده از پنجره زیر ارسال نمایید. توجه داشته باشید که فقط یک بار می توانید مدارک را ارسال کنید و اجازه تغییر مدارک را نخواهید داشت.`}
                                </Text>
                              ) : null}
                            </View>

                            <TextInput
                              value={message}
                              multiline={true}
                              onChangeText={e => setmessage(e)}
                              keyboardType="default"
                              autoCapitalize="none"
                              placeholder={strings.MAKEANOFFER.ENTERHERE}
                              placeholderTextColor={Colors.textinput_inner_text}
                              style={[
                                globalstyles.textinputStyle,
                                {
                                  borderColor: ahnIsFocused ? Colors.primary : Colors.disable_textinput_border,
                                  backgroundColor: ahnIsFocused ? Colors.white : Colors.disable_textinput_background
                                }]}
                              onFocus={() => setAhnIsFocused(true)}
                              onBlur={() => setAhnIsFocused(false)}
                              onSubmitEditing={() => { Keyboard.dismiss() }}
                            />
                            <View style={styles.mainView}>
                              <View style={styles.bodyView}>

                                {
                                  d_data.poster_fees_paid == "Y" && type == "P" || d_data.tasker_fees_paid == "Y" && type == "T" ?
                                    <TouchableOpacity
                                      onPress={() => selectfile()}
                                      style={[
                                        styles.imageUploadBtn,
                                        {
                                          width: '100%',
                                          height: height * 0.08,
                                          marginBottom: '5%',
                                          flexDirection: rowOrRowreverse(language),
                                          justifyContent: "center",
                                        },
                                      ]}>
                                      <Image
                                        style={{
                                          height: Normalize(15), width: Normalize(15), marginRight: Normalize(5)
                                        }}
                                        source={images.upload_image}
                                        resizeMode="contain"
                                      />
                                      <Text style={{
                                        fontSize: Normalize(11),
                                        fontFamily: 'Outfit-Regular',
                                        color: Colors.primary,
                                      }}>
                                        {strings.DISPUTE.CLICKTOSELECTFILES}
                                      </Text>
                                      <Text style={{
                                        fontSize: Normalize(11),
                                        fontFamily: 'Outfit-Regular',
                                        color: Colors.primary,
                                      }}>
                                      </Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                      onPress={() => selectfile()}
                                      style={[
                                        styles.imageUploadBtn,
                                        {
                                          width: '100%',
                                          height: height * 0.08,
                                          marginBottom: '5%',
                                          flexDirection: rowOrRowreverse(language),
                                          justifyContent: "center",
                                        },
                                      ]}>
                                      <Image
                                        style={{ height: Normalize(15), width: Normalize(15), marginRight: Normalize(5) }}
                                        source={images.upload_image}
                                        resizeMode="contain"
                                      />
                                      <Text style={{
                                        fontSize: Normalize(11),
                                        fontFamily: 'Outfit-Regular',
                                        color: Colors.primary,
                                      }}>
                                        {strings.DISPUTE.CLICKTOSELECTFILES}
                                      </Text>
                                      <Text style={{
                                        fontSize: Normalize(11),
                                        fontFamily: 'Outfit-Regular',
                                        color: Colors.primary,
                                      }}>
                                        {/* {language == "en" ? "Recommended size 180px * 240px" : "اندازه پیشنهادی ۱۸۰ * ۲۴۰ پیکسل"} */}
                                      </Text>
                                    </TouchableOpacity>
                                }
                                {
                                  d_data.poster_fees_paid == "Y" && type == "P" && d_data.status == "S3" || d_data.tasker_fees_paid == "Y" && type == "T" && d_data.status == "S3" ?
                                    <View style={{
                                      alignSelf: 'center',
                                      marginTop: Normalize(5),
                                      width: "100%",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      justifyContent: 'center'
                                    }} >

                                      <CheckBox
                                        containerStyle={{ padding: 0, margin: 0 }}
                                        checked={evidancecheckBox}
                                        onPress={() => setEvidancecheckBox(!evidancecheckBox)}
                                      />
                                      <Text style={{ width: "100%", fontFamily: 'Outfit-Regular', fontSize: Normalize(9), color: Colors.greyText, }} >I agree tttto the <Text style={{ fontFamily: 'Outfit-Medium', color: Colors.green2 }} >Arbtiration Terms and Conditions.</Text></Text>

                                    </View>
                                    : null}

                                {loader2 ? (
                                  <View style={{ flex: 1 }}>
                                    <Text
                                      style={{
                                        fontSize: Normalize(13),
                                        fontFamily: 'Outfit-Medium',
                                        color: Colors.primary,
                                        marginVertical: Normalize(5),
                                      }}></Text>
                                  </View>
                                ) : (
                                  <View
                                    style={{
                                      flexWrap: 'wrap',
                                      flexDirection:
                                        language == 'en' ? 'row' : 'row-reverse',
                                      justifyContent: 'center',
                                    }}>
                                    {imageFinalArray.length != 0 && (
                                      <Text
                                        style={{
                                          fontSize: Normalize(11.5),
                                          fontFamily: 'Outfit-Medium',
                                          color: Colors.primary,
                                          marginVertical: Normalize(5),
                                          textAlign:
                                            language == 'en' ? 'left' : 'right',
                                        }}>
                                        { }
                                      </Text>
                                    )}
                                    {loader2 ? (
                                      <View style={{ flex: 1 }}>
                                        <Text></Text>
                                      </View>
                                    ) : (
                                      <View
                                        style={{
                                          flexWrap: 'wrap',
                                          flexDirection:
                                            language == 'en' ? 'row' : 'row-reverse',
                                          justifyContent: 'center',
                                        }}>
                                        {imageFinalArray.map((item, index) => (
                                          <View
                                            key={index}
                                            style={{
                                              width: Normalize(85),
                                              height: Normalize(85),
                                              borderColor: Colors.primary,
                                              borderWidth: 0.8,
                                              borderRadius: 5,
                                              overflow: 'hidden',
                                              marginVertical: '2%',
                                              marginHorizontal: '1%',
                                              padding: Normalize(3),
                                            }}>
                                            <TouchableOpacity
                                              onPress={() => {
                                                deleteImage(item);
                                              }}
                                              style={{
                                                position: 'absolute',
                                                top: -Normalize(3),
                                                zIndex: 1,
                                                left:
                                                  language == 'en'
                                                    ? null
                                                    : -Normalize(3),
                                                right:
                                                  language == 'en'
                                                    ? -Normalize(3)
                                                    : null,
                                              }}>
                                              <Entypo
                                                name="cross"
                                                size={Normalize(20)}
                                                color={Colors.secondary}
                                              />
                                            </TouchableOpacity>

                                            {
                                              item.type == "image/jpeg" || item.type == "image/png" ?
                                                <Image
                                                  source={{ uri: item.uri }}
                                                  style={{
                                                    height: '100%',
                                                    width: '100%',
                                                    resizeMode: 'cover',
                                                  }}
                                                /> :
                                                <Image
                                                  source={images.fileIcon}
                                                  style={{
                                                    height: '100%',
                                                    width: '100%',
                                                    resizeMode: 'cover',
                                                  }}
                                                />
                                            }
                                          </View>
                                        ))}
                                      </View>
                                    )}
                                  </View>
                                )}
                              </View>
                            </View>
                            <TouchableOpacity
                              onPress={submit}
                              disabled={loaderSubmit ? true : false}
                              style={{
                                flexDirection: 'column',
                                width: '80%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                marginBottom: 30,
                                marginRight: Normalize(15),
                                marginTop: 10,
                              }}>
                              {loaderSubmit ? (
                                <View
                                  style={{
                                    width: '90%',
                                    backgroundColor: Colors.secondary,
                                    padding: Normalize(10),
                                    alignSelf: 'center',
                                    borderRadius: 10,
                                  }}>
                                  <ActivityIndicator
                                    size="small"
                                    color={Colors.white}
                                  />
                                </View>
                              ) : (
                                <Text style={styles.submit}>
                                  {strings.MAKEANOFFER.SUBMIT}
                                </Text>
                              )}
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                </ScrollView>
              </View>
            </CurveDesing_Component>
            <Modal
              animationType={"fade"}
              transparent={true}
              visible={isVisible}
            >
              <View style={{ height: '100%', width: '100%', backgroundColor: 'rgba(000, 000, 000, 0.5)', alignSelf: 'center', justifyContent: 'center' }}>
                <View style={{ height: payment_method === "G" ? '70%' : '50%', width: '80%', backgroundColor: '#000', alignSelf: 'center' }}>

                  <Image
                    style={{
                      width: '100%',
                      height: '80%',
                      borderRadius: 0,
                      margin: 0,
                    }}
                    source={{
                      uri:
                        ImageLink.Dispute +
                        file_name,
                    }}
                    resizeMode="contain"
                  />
                  <TouchableOpacity
                    onPress={() => setIsvisible(!isVisible)}
                    style={{ width: '90%', height: 45, borderRadius: 20, backgroundColor: Colors.secondary, justifyContent: 'center', alignSelf: 'center', marginTop: '10%' }}>
                    <Text style={{ color: '#fff', textAlign: 'center', alignSelf: 'center', fontFamily: 'Outfit-Medium' }}>{strings.MAKEANOFFER.CLOSE}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Modal
              animationType={"fade"}
              transparent={true}
              visible={arbitration}
            // onRequestClose={() => { console.log("Modal has been closed.") }}
            >
              <View style={{ height: '100%', width: '100%', backgroundColor: 'rgba(000, 000, 000, 0.5)', alignSelf: 'center', justifyContent: 'center' }}>
                <View style={{ height: language == "en" ? "38%" : '45%', width: '80%', backgroundColor: '#fff', alignSelf: 'center' }}>
                  <View style={{ height: '62%' }}>
                    <Text style={{
                      fontFamily: 'Outfit-SemiBold', fontSize: Normalize(12), color: Colors.greyText, alignSelf: 'center',
                      marginVertical: '10%', marginHorizontal: '2%'
                    }}>{language == "en" ? "Pay Arbitration Fees of :" : "پرداخت هزینه های داوری:"} {strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian(parseInt(attributation_fees), language)}</Text>
                    <Text style={{
                      fontFamily: 'Outfit-Medium', fontSize: 13, color: '#a2a5a8', alignSelf: 'center',
                      marginHorizontal: '5%', textAlign: 'center'
                    }}>{language == "en" ? "You can pay the arbitration fees and submit final evidence. EazyPay will arbitrate and you have to agree the decision taken by EazyPay" : "این امکان به شما داده شده است که با یکدیگر مذاکره کنید و اختلافات را حل کنید. اگر نیاز به داوری ایران تسکر دارید می بایست هزینه داوری را پرداخت کنید و همچنین شواهد و مدارک نهایی را ارسال نمایید. ایران تسکر در یک بازه زمانی ۱۵ روزه داوری خواهد کرد و شما می بایست تصمیم ایران تسکر را بپذیرید. همچنین طرف مقابل نیز ملزم به پرداخت هزینه های داوری و ارسال مدارک خواهد بود."}</Text>

                    <View style={{
                      flexDirection: rowOrRowreverse(language),
                      marginTop: '5%',
                      alignItems: "center"
                    }}>
                      <CheckBox
                        // center
                        checked={isSelected}
                        onPress={() => setSelection(!isSelected)}
                      />
                      {
                        language == "en" ?
                          <Text style={{ fontFamily: 'Outfit-Regular', fontSize: Normalize(10), color: Colors.greyText, paddingRight: Normalize(70) }} >I agree to the <Text style={{ fontFamily: 'Outfit-Medium', color: Colors.green2 }} >Arbtiration Terms and Conditions</Text></Text>
                          :
                          <Text style={{ fontFamily: 'Outfit-Regular', fontSize: Normalize(10), color: Colors.greyText }} >موافقت خود را اعلام میدارم.<Text style={{ fontFamily: 'Outfit-Medium', color: Colors.green2 }} >شرایط و ضوابط داوری</Text></Text>
                      }

                    </View>
                  </View>
                  <View style={{ flexDirection: rowOrRowreverse(language), width: '100%', justifyContent: 'center', flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => setArbitration(!arbitration)}
                      style={{
                        paddingHorizontal: 10, height: 40, borderRadius: 10, backgroundColor: Colors.secondary,
                        justifyContent: 'center', alignSelf: 'center', marginTop: '10%', marginHorizontal: 2
                      }}>
                      <Text style={{ color: '#fff', textAlign: 'center', alignSelf: 'center', fontFamily: 'Outfit-Medium', fontSize: 13 }}>{strings.POSTTASK.CANCEL}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={opensummery}
                      style={{
                        paddingHorizontal: 10, height: 40, borderRadius: 10, backgroundColor: Colors.secondary,
                        justifyContent: 'center', alignSelf: 'center', marginTop: '10%', marginHorizontal: 2
                      }}>
                      <Text style={{ color: '#fff', textAlign: 'center', alignSelf: 'center', fontFamily: 'Outfit-Medium', fontSize: 13 }}>{language == "en" ? "Agree and pay Arbitration fees" : "موافقت و پرداخت هزینه داوری"}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <Modal
              animationType={"fade"}
              transparent={true}
              visible={isVisible2}
            >
              <View style={{ height: '100%', width: '100%', backgroundColor: 'rgba(000, 000, 000, 0.5)', alignSelf: 'center', justifyContent: 'center' }}>
                <View style={{ height: '65%', width: '80%', backgroundColor: '#fff', alignSelf: 'center' }}>
                  <View style={{ flexDirection: 'column', height: '80%' }}>

                    <Text style={{
                      fontFamily: 'Outfit-SemiBold', fontSize: Normalize(12), color: Colors.greyText, alignSelf: 'center',
                      marginVertical: '10%', marginHorizontal: '2%'
                    }}>{strings.MAKEANOFFER.PAYMENTREQUIRED2}</Text>

                    <View style={{ flexDirection: rowOrRowreverse(language), justifyContent: 'space-between', marginHorizontal: '5%', marginTop: '0%' }}>
                      <Text style={{
                        fontFamily: 'Outfit-Regular', fontSize: Normalize(11.5), color: Colors.black, alignSelf: 'center',
                        marginHorizontal: '2%'
                      }}>{strings.MAKEANOFFER.SUMMARY2}</Text>
                    </View>

                    <View style={{ flexDirection: rowOrRowreverse(language), justifyContent: 'space-between', marginHorizontal: '5%', marginTop: '5%', marginBottom: '2%' }}>
                      <Text style={{
                        fontFamily: 'Outfit-Regular', fontSize: Normalize(12), color: Colors.greyText, alignSelf: 'center',
                        marginHorizontal: '2%'
                      }}>{language == "en" ? "Dispute Atribution fees" : "هزینه های داوری"}</Text>
                      <Text style={{
                        fontFamily: 'Outfit-Medium', fontSize: Normalize(12), color: Colors.greyText, alignSelf: 'center',
                        marginHorizontal: '2%'
                      }}>{addCommaAndTranslateInPersian((parseInt(totalAmount)), language)}</Text>
                    </View>

                    {adjustAmount == "0" ? null :
                      <View style={{ flexDirection: rowOrRowreverse(language), justifyContent: 'space-between', marginHorizontal: '5%', marginVertical: '2%' }}>
                        <Text style={{
                          fontFamily: 'Outfit-Regular', fontSize: Normalize(12), color: Colors.greyText, alignSelf: 'center',
                          marginHorizontal: '2%'
                        }}>{strings.MAKEANOFFER.ADJUSTFROMWALLET}</Text>
                        <Text style={{
                          fontFamily: 'Outfit-Medium', fontSize: Normalize(12), color: Colors.greyText, alignSelf: 'center',
                          marginHorizontal: '2%'
                        }}>{addCommaAndTranslateInPersian((parseInt(adjustAmount)), language)}</Text>
                      </View>}
                    {payment_method === "G" && <View style={{ flexDirection: rowOrRowreverse(language), justifyContent: 'space-between', marginHorizontal: '5%', marginVertical: '2%' }}>
                      <Text style={{
                        fontFamily: 'Outfit-SemiBold', fontSize: Normalize(11.5), color: Colors.black, alignSelf: 'center',
                        marginHorizontal: '2%'
                      }}>{strings.MAKEANOFFER.NEEDTOPAY}</Text>
                      <Text style={{
                        fontFamily: 'Outfit-Medium', fontSize: Normalize(12), color: Colors.greyText, alignSelf: 'center',
                        marginHorizontal: '2%'
                      }}>{addCommaAndTranslateInPersian((parseInt(paybleAmount)), language)}</Text>
                    </View>}

                    {payment_method == "G" ?

                      <View style={{ flexDirection: rowOrRowreverse(language), justifyContent: 'space-between', marginHorizontal: '5%', marginTop: '7%' }}>
                        <Text style={{
                          fontFamily: 'Outfit-Regular', fontSize: Normalize(11.5), color: Colors.black, alignSelf: 'center',
                          marginHorizontal: '2%'
                        }}>{strings.MAKEANOFFER.PAYMENTMETHODS}</Text>
                      </View> :
                      null}

                    {payment_method == "G" ?
                      <View style={{ flexDirection: rowOrRowreverse(language), justifyContent: 'space-between', marginHorizontal: '7%', marginTop: Normalize(10) }}>
                        <View style={{ height: Normalize(25), width: Normalize(25), justifyContent: "center", alignItems: "center" }} >
                          <Image style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                            source={images.irantaskerIcon}
                          />
                        </View>
                        <Text style={{
                          fontFamily: 'Outfit-Regular', fontSize: Normalize(11.5), color: Colors.black,
                          marginHorizontal: '2%', width: '65%',
                        }}>{strings.MAKEANOFFER.PAYPING}</Text>
                        <View style={{ justifyContent: "center", alignItems: "center" }} >
                          <View style={{ height: Normalize(17), width: Normalize(17), borderRadius: Normalize(17) / 2 }} >
                            <Image source={images.greenTick} style={{ height: "90%", width: "90%", resizeMode: "cover" }} />
                          </View>
                        </View>
                      </View> : null}


                    {language == "en" ?

                      <Text style={{
                        fontFamily: 'Outfit-Regular', fontSize: Normalize(12), color: Colors.greyText,
                        marginHorizontal: '5%', marginTop: '8%', alignSelf: 'center'
                      }}>
                        "Payment will be secured inside <Text style={{ color: Colors.green2 }} >EazyPay Pay</Text> until you’re happy the task has been completed. View <Text style={{ color: Colors.green2 }} >Terms & Conditions.</Text>
                      </Text>
                      :
                      <Text style={{
                        fontFamily: 'Outfit-Regular', fontSize: Normalize(12), color: Colors.greyText,
                        marginHorizontal: '5%', marginTop: '8%', alignSelf: 'center'
                      }}>
                        پرداخت به صورت <Text style={{ color: Colors.green2 }}>امن و گروگذاری</Text> شده انجام خواهد شد.تا زمانی که شما رضایت خود را از از نحوه انجام کار با فشردن کلید آزادسازی اعلام نکرده باشید پول به صورت امانت در اختیار ایران تسکر باقی خواهد ماند. <Text style={{ color: Colors.green2 }}>شرایط و ضوابط.</Text>.
                      </Text>
                    }
                  </View>
                  <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                    <TouchableOpacity
                      onPress={() => setIsvisible2(!isVisible2)}
                      style={{
                        paddingHorizontal: Normalize(15), height: 40, borderRadius: 10, backgroundColor: Colors.secondary,
                        justifyContent: 'center', alignSelf: 'center', marginTop: '10%', marginRight: 3
                      }}>
                      <Text style={{ color: '#fff', textAlign: 'center', alignSelf: 'center', fontFamily: 'Outfit-Medium', fontSize: 13 }}>{strings.POSTTASK.CANCEL}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={finalPay}
                      disabled={loaderPay ? true : false}
                      style={{
                        paddingHorizontal: Normalize(15), height: 40, borderRadius: 10, backgroundColor: Colors.secondary,
                        justifyContent: 'center', alignSelf: 'center', marginTop: '10%', marginLeft: 3
                      }}>
                      {loaderPay ?
                        <ActivityIndicator
                          size="small"
                          color={Colors.white}
                          style={{ marginHorizontal: 51 }}
                        /> :
                        <Text style={{
                          color: '#fff', textAlign: 'center', alignSelf: 'center', fontFamily: 'Outfit-Medium',
                          fontSize: 13
                        }}>{strings.MAKEANOFFER.SECURELYHOLDPAYMENT}</Text>}
                    </TouchableOpacity>
                  </View>
                </View>

                {
                  ispaymentgateway &&
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={ispaymentgateway}
                    onRequestClose={() => {
                      onPressPamentGetWay()
                    }}
                  >
                    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
                      <View style={{ flex: 1, backgroundColor: Colors.white }} >
                        <View style={{ height: Normalize(50), width: "100%", flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#E8E8E8", borderBottomWidth: 1, backgroundColor: Colors.primary }}>
                          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                            <Text style={{
                              fontSize: Normalize(14),
                              fontFamily: 'Outfit-SemiBold',
                              color: Colors.white
                            }}>{strings.MAKEANOFFER.PAYMENT}</Text>
                          </View>
                          <TouchableOpacity activeOpacity={0.5} onPress={onPressPamentGetWay} style={{ height: Normalize(50), width: Normalize(50), justifyContent: "center", alignItems: "center" }} >
                            <Image source={images.crossWhite} style={{ height: Normalize(12), width: Normalize(12), resizeMode: "contain" }} />
                          </TouchableOpacity>
                        </View>
                        <WebView
                          ref={webref}
                          source={{ uri: apiUrl }}
                          style={{ flex: 1 }}
                          // onLoad={console.log("loaded")}
                          onNavigationStateChange={onNavigationStateChangeHandle}
                          // renderLoading={renderLoadingView}
                          startInLoadingState={true}
                        />
                        {/* <TouchableOpacity style={{ height: 100 }} ></TouchableOpacity> */}
                      </View>
                    </SafeAreaView>
                  </Modal>}
              </View>
            </Modal>
            <WarningPage
              onPress={() => setAcceptModal(!acceptModal)}
              ispress={acceptModal}
              warningTitle={language == 'en' ? 'Accept' : 'خروج'}
              warningSubTitle={language == 'en' ? 'Are you Sure?' : "آیا مطمئن هستید؟"}
              okOnpress={accept}
              cancelOnpress={() => setAcceptModal(!acceptModal)} />


          </KeyboardAvoidingView>
        </SafeAreaView>
      )}
    </>
  );
}
