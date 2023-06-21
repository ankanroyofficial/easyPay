import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, Image, ScrollView, TextInput, SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../../../constants/colors';
import Normalize from '../../../../helpers/Dimens';
import Header from '../../../../components/Header';
import styles from './Styles2';
import strings from '../../../../constants/lng/LocalizedStrings';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { numberWithCommas, numberWithCommasinParsian } from '../../../../constants/NumberWithComma';
import moment from 'moment';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import { leftOrRight, rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import images from '../../../../constants/images';
import { questionPersianTimeShow } from '../../../../constants/DateShow';
import { engToPersian } from '../../../../constants/EnglishToPersian';
import LoaderPage from '../../../../components/LoaderPage';
import { axiosUrl } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import WarningPage from '../../../../components/WarningPage';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import { alignSelf } from 'styled-system';

function WithdrawMoney({ navigation, route }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [aIsFocused, setAIsFocused] = useState(false);
  const [bank_name, setBank_name] = useState("");
  const [acc_holder_name, setAcc_holder_name] = useState("");
  const [account_number, setAccount_number] = useState("");
  const [card_number, setCard_number] = useState("");
  const [sheba_number, setSheba_number] = useState("");
  const [n_card_id_number, setN_card_id_number] = useState("");
  const [birth_id_number, setBirth_id_number] = useState("");
  const [fathers_name, setFathers_name] = useState("");
  const [a, setA] = useState("");
  const [loader, setLoader] = useState(false)
  const [loader2, setLoader2] = useState(false)
  const [max_withdraw_limit, setmax_withdraw_limit] = useState("");
  const [withdraw_day_limit, setWithdraw_day_limit] = useState("");
  const [wdata, setwdata] = useState([])
  const { balance } = route.params;
  const [requestDelete, setRequestDelete] = useState(false)

  const [temp_idStore, setTemp_idStore] = useState("")
  useEffect(() => {
    getTokon()
  }, []);

  const getTokon = async () => {
    try {
      getData()
    } catch (error) {
      console.log(error)
    }
  }

  const onpressDeleteRequest = () => {
    setRequestDelete(!requestDelete)
  }

  const getData = async () => {
    try {
      setLoader(true)
      setwdata([])
      const data = await axiosInstance.post("payment-method-details")
      if (data.data.result.bank != null) {
        setBank_name(data.data.result.bank.bank_name)
        setAcc_holder_name(data.data.result.bank.account_holder_name)
        setAccount_number(data.data.result.bank.account_number)
        setCard_number(data.data.result.bank.card_number)
        setN_card_id_number(data.data.result.bank.national_card_id_number)
        setSheba_number(data.data.result.bank.sheba_number)
        setBirth_id_number(data.data.result.bank.birth_id_number)
        setFathers_name(data.data.result.bank.fathers_name)
      }

      const dataa = {
        "params": {
          "page": 1
        }
      }
      const res = await axiosInstance.post("withdaraw-request", dataa)
      // console.log(res.data)
      setwdata(res.data.withdrawRequest)
      setmax_withdraw_limit(res.data.max_withdraw_limit)
      setWithdraw_day_limit(res.data.diff_in_days)
      setLoader(false)
    } catch (error) {
      console.log(error)
    }
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
  const submit = async () => {
    try {

      if (language === "en") {
        // var api_a = a.toEnglishDigits()
        var api_a_en = a
      } else {
        var api_a = a.toEnglishDigits()
        var api_a_en = api_a.toString()
      }





      if (bank_name == "") {
        Toast.show(language == "en" ? "At first enter bank account details" : "ابتدا مشخصات حساب بانکی را وارد کنید")
      } else if (api_a_en == "" || api_a_en.trim() == "") {
        Toast.show(language == "en" ? "Please enter Amount" : "لطفا مقدار را وارد کنید")
      } else if (api_a_en < 5) {
        Toast.show(strings.MAKEANOFFER.MINIMUMBUDGET_GURUTASKER)
      } else if (api_a_en > parseInt(max_withdraw_limit)) {
        Toast.show("Withdraw Amount Limit is $ " + addCommaAndTranslateInPersian(max_withdraw_limit, language))
      } else {
        const finalFormData = new FormData();
        finalFormData.append("bank_name", bank_name);
        finalFormData.append("account_holder_name", acc_holder_name);
        finalFormData.append("account_number", account_number);
        finalFormData.append("sheba_number", sheba_number);
        finalFormData.append("card_number", card_number);
        finalFormData.append("national_card_id_number", n_card_id_number);
        finalFormData.append("birth_id_number", birth_id_number);
        finalFormData.append("fathers_name", fathers_name);
        // finalFormData.append('bank_amount', language == "en" ? a : api_a_en);
        finalFormData.append('bank_amount', api_a_en);
        setLoader2(true)

        // console.log(finalFormData)

        const res = finalFormData
        const data = await axiosInstance.post("submit-withdaraw-request", res)
        // console.log(data.data)
        if (data.data.success == undefined) {
          Toast.show(data.data.error.meaning)
        } else {
          Toast.show(data.data.success.meaning)
          // navigation.navigate('Finance')
          getData()
          setA("")
        }
      }
      setLoader2(false)
    } catch (error) {
      setLoader2(false)
      console.log(error)
    }
  }
  const removereq = async (id) => {
    try {
      setLoader(true)
      const data = {
        "params": {
          "id": id
        }
      }
      const res = await axiosInstance.post("remove-withdaraw-request", data)
      // console.log(res.data)
      if (res.data.success) {
        setLoader(false)
        Toast.show(res.data.success.meaning)
        onpressDeleteRequest()
        getTokon()
        setTemp_idStore("")
      } else {
        setLoader(false)
        Toast.show(res.data.error.meaning)
      }
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }
  // console.log(withdraw_day_limit)
  return (
    <>
      {
        loader ?
          <LoaderPage />
          :
          <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
            <KeyboardAvoidingView
              behavior={(Platform.OS === 'ios') ? "padding" : null} style={styles.container}>
              <Header
                back
                name={language == "en" ? "Withdraw Money" : "واریز پول"}
                navigation={navigation}
              />
              <CurveDesing_Component   >
                <View style={globalstyles.container_only_padding} >
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Normalize(20) }}
                  >
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ marginVertical: Normalize(10), fontSize: Normalize(13), fontFamily: 'roboto-bold', color: '#666', textAlign: leftOrRight(language) }}>Wallet Balance : <Text style={{ color: Colors.primary }} >{strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian(balance, language)}</Text></Text>

                      {
                        withdraw_day_limit < 2 ?
                          < View style={{ width: "100%", padding: Normalize(10), backgroundColor: "#fbedd5", flexDirection: rowOrRowreverse(language), borderRadius: Normalize(8) }} >
                            <View style={{ height: Normalize(27), width: Normalize(27) }} >
                              <Image source={images.yellow_info} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                            </View>
                            <View style={{ marginHorizontal: "2%", alignItems: language == "en" ? "flex-start" : "flex-end" }} >
                              <Text numberOfLines={3}
                                style={{
                                  color: Colors.greyText, fontFamily: 'roboto-medium',
                                  fontSize: Normalize(11), textAlign: leftOrRight(language), width: "60%"
                                }}>
                                {strings.ERROR.YOUCANSENDWITHDRAW}
                              </Text>
                            </View>
                          </View>
                          :
                          < View style={{ width: "100%", padding: Normalize(10), backgroundColor: "#fbedd5", flexDirection: rowOrRowreverse(language), borderRadius: Normalize(8) }} >
                            <View style={{ height: Normalize(27), width: Normalize(27) }} >
                              <Image source={images.yellow_info} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                            </View>
                            <View style={{ marginHorizontal: "2%", alignItems: language == "en" ? "flex-start" : "flex-end" }} >
                              <Text numberOfLines={3}
                                style={{
                                  color: Colors.greyText, fontFamily: 'roboto-medium',
                                  fontSize: Normalize(11), textAlign: leftOrRight(language), width: "60%"
                                }}>
                                {strings.ERROR.YOUCANSENDWITHDRAW2}
                              </Text>
                            </View>
                          </View>
                      }
                      <Text style={[globalstyles.blue_Text, { marginVertical: Normalize(8) }]}>{language == "en" ? "Amount" : "مبلغ"}</Text>
                      <TextInput
                        value={language == "en" ? a : engToPersian(a)}
                        onChangeText={(e) => setA(e)}
                        editable={withdraw_day_limit < 2 ? false : true}
                        keyboardType="number-pad"
                        autoCapitalize="none"
                        placeholder={strings.CHANGEPASS.ENTERHERE}
                        placeholderTextColor={Colors.textinput_inner_text}
                        style={[globalstyles.textinputStyle, {
                          backgroundColor: aIsFocused ? withdraw_day_limit < 2 ? Colors.disable_textinput_background : Colors.white : Colors.disable_textinput_background,
                          borderColor: aIsFocused ? withdraw_day_limit < 2 ? Colors.disable_textinput_border : Colors.primary : Colors.disable_textinput_border
                        }]}
                        onFocus={() => setAIsFocused(true)}
                        onBlur={() => setAIsFocused(false)}
                      />
                    </View>
                    {
                      withdraw_day_limit < 2 &&
                      <Text numberOfLines={3}
                        style={{
                          color: Colors.greyText, fontFamily: 'roboto-medium',
                          fontSize: Normalize(14), textAlign: leftOrRight(language), marginTop: Normalize(5)
                        }}>
                        {addCommaAndTranslateInPersian((2 - withdraw_day_limit), language)} days left
                      </Text>
                    }

                    <TouchableOpacity
                      disabled={withdraw_day_limit < 2 || loader2 ? true : false}
                      onPress={submit}
                      style={{
                        flexDirection: 'column',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 20
                      }}>
                      {loader2 ?
                        <View style={{
                          width: '100%',
                          backgroundColor: Colors.secondary,
                          padding: Normalize(10),
                          alignSelf: 'center',
                          borderRadius: Normalize(8),
                        }}>
                          <ActivityIndicator
                            size="small"
                            color={Colors.white}
                          />
                        </View>
                        :
                        <Text style={{
                          width: '100%',
                          backgroundColor: withdraw_day_limit < 2 ? Colors.disableBackGround : Colors.secondary,
                          textAlign: 'center',
                          color: withdraw_day_limit < 2 ? Colors.disableText : Colors.white,
                          fontSize: Normalize(12),
                          padding: Normalize(10),
                          alignSelf: 'center',
                          fontFamily: 'roboto-medium',
                          borderRadius: Normalize(8),
                        }}>{strings.MAKEANOFFER.SUBMIT}</Text>
                      }
                    </TouchableOpacity>
                    <View style={{ height: Normalize(8) }} />
                    {wdata.length > 0 ?
                      <>
                        {wdata.map((item, index) => (
                          <View key={index} style={{
                            width: '99%',
                            paddingVertical: Normalize(8),
                            flexDirection: 'row',
                            elevation: Normalize(2),
                            backgroundColor: Colors.white,
                            marginBottom: Normalize(7),
                            borderRadius: Normalize(8),
                            alignSelf: "center"
                          }}
                          >
                            <View style={styles.leftLine} />
                            <View style={{ flexDirection: rowOrRowreverse(language), flex: 1, alignSelf: 'center', marginHorizontal: 10 }}>
                              <View style={{ flexDirection: rowOrRowreverse(language), width: '100%', }}>

                                <View style={{ flexDirection: 'column', marginHorizontal: 15, flex: 1 }}>
                                  <View style={{ flexDirection: rowOrRowreverse(language), justifyContent: 'space-between' }}>
                                    <Text numberOfLines={3}
                                      style={{
                                        color: '#38393e', marginHorizontal: 0, fontFamily: 'roboto-medium',
                                        fontSize: Normalize(11), width: '60%', textAlign: leftOrRight(language)
                                        // marginRight: language === "en" ? 0 : Normalize(10)
                                      }}>

                                      {language == "en" ?
                                        `Funds transfer to ${item.account_holder_name}`
                                        :
                                        `انتقال وجوه به ${item.account_holder_name}`
                                      }
                                    </Text>
                                    <View style={{ flexDirection: rowOrRowreverse(language), alignSelf: 'center' }}>
                                      <Image style={{ width: Normalize(10), height: Normalize(10), opacity: .6, alignSelf: 'center' }}
                                        source={images.calander}
                                        resizeMode="contain" />
                                      <Text style={{
                                        color: "#818181", marginLeft: Normalize(5), fontFamily: 'roboto-regular', fontSize: Normalize(11),
                                        alignSelf: 'center',
                                      }}>{language == "en" ? moment(item.created_at, 'YYYY-MM-DD').format('Do MMMM, YYYY') : questionPersianTimeShow(item.created_at)}</Text>
                                    </View>
                                  </View>
                                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                    <Text numberOfLines={1} style={{
                                      color: '#818181', marginHorizontal: language === "en" ? 0 : 2, fontFamily: 'roboto-regular', fontSize: Normalize(11), marginTop: 10, marginRight: language === "en" ? 0 : Normalize(5), textAlign: language === "en" ? "left" : "right"
                                    }}>
                                      {language == "en" ? "Status" : "وضعیت"} : {item.status == "N" ? language == "en" ? "New" : "جدید" : language == "en" ? "Old" : "قدیمی"}
                                    </Text>
                                    <Text style={{
                                      color: Colors.primary, marginHorizontal: 10, fontFamily: 'roboto-medium', fontSize: Normalize(12),
                                      alignSelf: 'center', marginRight: 10, marginTop: 10,
                                    }}>{strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian(item.amount, language)}</Text>
                                  </View>
                                  <TouchableOpacity
                                    disabled={item.status == "N" ? false : true}
                                    onPress={() => {
                                      setTemp_idStore(item.id)
                                      onpressDeleteRequest()
                                    }}

                                    style={{
                                      paddingVertical: Normalize(4), paddingHorizontal: Normalize(6), backgroundColor:item.status == "N" ? Colors.secondary:Colors.disableBackGround,
                                      alignSelf: 'center', marginTop: Normalize(8), justifyContent: 'center', borderRadius: 20
                                    }}>
                                    <Text style={{ color:item.status == "N" ? Colors.white:Colors.disableText, fontSize: Normalize(12), fontFamily: "Outfit-Medium" }}>{language == "en" ? "Remove Request" : "ارسال"}</Text>
                                  </TouchableOpacity>
                                  {
                                    requestDelete &&
                                    <WarningPage
                                      ispress={requestDelete}
                                      onPress={onpressDeleteRequest}
                                      cancelOnpress={onpressDeleteRequest}
                                      warningSubTitle={language === "en" ? "Are you sure you want to remove this withdrawal request ?" : "آیا مطمئن هستید که می خواهید این درخواست برداشت را حذف کنید؟"}
                                      okOnpress={() => { removereq(temp_idStore) }}
                                      warningTitle={strings.POSTTASK.AREYOUSURE}
                                    />
                                  }
                                </View>

                              </View>

                            </View>
                          </View>

                        ))}
                      </>

                      :

                      <Text style={{
                        color: Colors.secondary, fontFamily: 'roboto-bold',
                        fontSize: Normalize(14), textAlign: "center"
                      }} >{strings.WITHDRAW.NORECORDFOUND}</Text>

                    }
                  </ScrollView>
                </View>
              </CurveDesing_Component>
            </KeyboardAvoidingView >

          </SafeAreaView >
      }
    </>
  );
}

export default withRtl(WithdrawMoney);
