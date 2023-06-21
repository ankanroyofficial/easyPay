import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../../../../constants/colors';
import Normalize from '../../../../../helpers/Dimens';
import Header from '../../../../../components/Header';
import styles from './Styles';
import strings from '../../../../../constants/lng/LocalizedStrings';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LoaderPage from '../../../../../components/LoaderPage'
import { engToPersian } from '../../../../../constants/EnglishToPersian';
import { axiosUrl } from '../../../../../constants/LinkPage';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import Header_Transparent from '../../../../../components/Header_Transparent';
import Button from '../../../../../components/Button';

function PaymentMethod({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [bankIsFocused, setBankIsFocused] = useState(false);
  const [ahnIsFocused, setAhnIsFocused] = useState(false);
  const [anIsFocused, setAnIsFocused] = useState(false);
  const [cnIsFocused, setCnIsFocused] = useState(false);
  const [shebaIsFocused, setShebaIsFocused] = useState(false);
  const [ncinIsFocused, setNcinIsFocused] = useState(false);
  const [binIsFocused, setBinIsFocused] = useState(false);
  const [fnIsFocused, setFnIsFocused] = useState(false);

  const [bank_name, setBank_name] = useState("");
  const [acc_holder_name, setAcc_holder_name] = useState("");
  const [account_number, setAccount_number] = useState("");
  const [card_number, setCard_number] = useState("");
  const [sheba_number, setSheba_number] = useState("");
  const [n_card_id_number, setN_card_id_number] = useState("");
  const [birth_id_number, setBirth_id_number] = useState("");
  const [fathers_name, setFathers_name] = useState("");

  const [token, setToken] = useState("");
  const [loader, setLoader] = useState(false)


  useEffect(() => {
    getTokon()
  }, []);

  const getTokon = async () => {
    try {
      let token = await AsyncStorage.getItem("token");
      setToken(token)
      getData(token)

    } catch (error) {
      console.log(error)
    }
  }

  const getData = async (token) => {
    try {
      setLoader(true)

      // const data = await axios({
      //   method: "post",
      //   url: `${axiosUrl.URL}`,
      //   headers: {
      //     Authorization: "Bearer " + token,
      //     "X-localization": language == "pr" ? "fa" : "en"
      //   },
      // })
      const data = await axiosInstance.post("payment-method-details")

      if (data.data.result) {
        setBank_name(data.data.result.bank.bank_name)
        setAcc_holder_name(data.data.result.bank.account_holder_name)
        setAccount_number(data.data.result.bank.account_number)
        setCard_number(data.data.result.bank.card_number)
        setN_card_id_number(data.data.result.bank.national_card_id_number)
        setSheba_number(data.data.result.bank.sheba_number)
        setBirth_id_number(data.data.result.bank.birth_id_number)
        setFathers_name(data.data.result.bank.fathers_name)
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
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

      if (bank_name == "" || bank_name.trim() == "") {
        Toast.show(language == "en" ? "Please enter Bank name" : "لطفا نام بانک را وارد کنید")
      } else if (acc_holder_name == "" || acc_holder_name.trim() == "") {
        Toast.show(language == "en" ? "Please enter Account holder name" : "لطفا نام دارنده حساب را وارد کنید")
      } else if (account_number == "" || account_number.trim() == "") {
        Toast.show(language == "en" ? "Please enter a valid Account Number" : "لطفا یک شماره حساب معتبر وارد کنید")
      } else if (card_number == "" || card_number.trim() == "" || card_number.length < 16) {
        Toast.show(language == "en" ? "Please enter a valid Card Number" : "لطفا یک شماره کارت معتبر وارد کنید")
      } else if (sheba_number == "" || sheba_number.trim() == "") {
        Toast.show(language == "en" ? "Please enter Sheba Number" : "لطفا شماره شبا را وارد کنید")
      } else if (n_card_id_number == "" || n_card_id_number.trim() == "") {
        Toast.show(language == "en" ? "Please enter National Card Id Number" : "لطفا شماره کارت ملی را وارد کنید")
      } else if (birth_id_number == "" || birth_id_number.trim() == "") {
        Toast.show(language == "en" ? "Please enter Birth Id Number" : "لطفا شماره شناسنامه را وارد کنید")
      } else if (fathers_name == "" || fathers_name.trim() == "") {
        Toast.show(language == "en" ? "Please enter Father's Name" : "لطفا نام پدر را وارد کنید")
      } else {



        var apiaccount_number = account_number.toEnglishDigits()
        var apiaccount_number_en = apiaccount_number.toString()

        var apicard_number = card_number.toEnglishDigits()
        var apicard_number_en = apicard_number.toString()

        var apisheba_number = sheba_number.toEnglishDigits()
        var apisheba_number_en = apisheba_number.toString()

        var apin_card_id_number = n_card_id_number.toEnglishDigits()
        var apin_card_id_number_en = apin_card_id_number.toString()

        var apibirth_id_number = birth_id_number.toEnglishDigits()
        var apibirth_id_number_en = apibirth_id_number.toString()




        setLoader(true)

        const res = {
          "params": {
            "bank_name": bank_name,
            "account_holder_name": acc_holder_name,
            "account_number": language == "en" ? account_number : apiaccount_number_en,
            "sheba_number": language == "en" ? sheba_number : apisheba_number_en,
            "card_number": language == "en" ? card_number : apicard_number_en,
            "national_card_id_number": language == "en" ? n_card_id_number : apin_card_id_number_en,
            "birth_id_number": language == "en" ? birth_id_number : apibirth_id_number_en,
            "fathers_name": fathers_name
          }
        }



        const data = await axiosInstance.post("update-payment-method", res)

        if (data) {
          setLoader(false)
          Toast.show(data.data.result.meaning)
          navigation.navigate('PaymentMethodView')
        }
      }
    }
    catch (error) {
      setLoader(false)
      console.log(error)
    }
  }





  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

      <View style={styles.container}>
        {loader ?
          <LoaderPage />
          :
          <CurveDesing_Component >
            <View style={[globalstyles.container_only_padding]} >
              <ScrollView
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
              >
                <View style={{ flexDirection: 'column', alignItems: language == "en" ? "flex-start" : "flex-end" }}>
                  <Header_Transparent />
                  <Text style={globalstyles.page_Header_Text}>Enter bank account details</Text>
                  <Text style={globalstyles.page_SubHeader_Text}>{language == "en" ? "Please provide your bank details so you can get paid. We donot take any money from your account." : "لطفاً اطلاعات بانکی خود را ارائه دهید تا بتوانید از کیف پول خود برداشت کنید."}</Text>


                  <Text style={globalstyles.textinput_Header_Style}>{language == "en" ? "Bank name" : "نام بانک"}</Text>
                  <TextInput
                    value={bank_name}
                    onChangeText={(e) => setBank_name(e)}
                    keyboardType="default"

                    autoCapitalize="none"
                    placeholder={strings.CHANGEPASS.ENTERHERE}
                    placeholderTextColor={Colors.textinput_inner_text}
                    style={globalstyles.textinputStyle}
                    onFocus={() => setBankIsFocused(true)}
                    onBlur={() => setBankIsFocused(false)}
                  />

                  <Text style={globalstyles.textinput_Header_Style}>{language == "en" ? "Account holder name" : "نام صاحب حساب"}</Text>
                  <TextInput
                    value={acc_holder_name}
                    onChangeText={(e) => setAcc_holder_name(e)}
                    keyboardType="default"
                    autoCapitalize="none"
                    placeholder={strings.CHANGEPASS.ENTERHERE}
                    placeholderTextColor={Colors.textinput_inner_text}
                    style={globalstyles.textinputStyle}
                    onFocus={() => setAhnIsFocused(true)}
                    onBlur={() => setAhnIsFocused(false)}
                  />

                  <Text style={globalstyles.textinput_Header_Style}>{language == "en" ? "Account number" : "شماره حساب"}</Text>
                  <TextInput
                    value={language == "en" ? account_number : engToPersian(account_number)}
                    onChangeText={(e) => setAccount_number(e)}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    placeholder={strings.CHANGEPASS.ENTERHERE}
                    placeholderTextColor={Colors.textinput_inner_text}
                    style={globalstyles.textinputStyle}
                    onFocus={() => setAnIsFocused(true)}
                    onBlur={() => setAnIsFocused(false)}
                  />

                  <Text style={globalstyles.textinput_Header_Style}>{language == "en" ? "16 digits Card Number" : "شماره ۱۶ رقمی روی کارت"}</Text>
                  <TextInput
                    value={language == "en" ? card_number : engToPersian(card_number)}
                    onChangeText={(e) => setCard_number(e)}
                    keyboardType="number-pad"
                    maxLength={16}
                    autoCapitalize="none"
                    placeholder={strings.CHANGEPASS.ENTERHERE}
                    placeholderTextColor={Colors.textinput_inner_text}
                    style={globalstyles.textinputStyle}
                    onFocus={() => setCnIsFocused(true)}
                    onBlur={() => setCnIsFocused(false)}
                  />

                  <Text style={globalstyles.textinput_Header_Style}>{language == "en" ? "Sheba Number" : "شماره شبا"}</Text>
                  <TextInput
                    value={language == "en" ? sheba_number : engToPersian(sheba_number)}
                    onChangeText={(e) => setSheba_number(e)}
                    keyboardType="default"
                    autoCapitalize="none"
                    placeholder={strings.CHANGEPASS.ENTERHERE}
                    placeholderTextColor={Colors.textinput_inner_text}
                    style={globalstyles.textinputStyle}
                    onFocus={() => setShebaIsFocused(true)}
                    onBlur={() => setShebaIsFocused(false)}
                  />

                  <Text style={globalstyles.textinput_Header_Style}>{language == "en" ? "National Card Id Number" : "شماره ملی"}</Text>
                  <TextInput
                    value={language == "en" ? n_card_id_number : engToPersian(n_card_id_number)}
                    onChangeText={(e) => setN_card_id_number(e)}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    placeholder={strings.CHANGEPASS.ENTERHERE}
                    placeholderTextColor={Colors.textinput_inner_text}
                    style={globalstyles.textinputStyle}
                    onFocus={() => setNcinIsFocused(true)}
                    onBlur={() => setNcinIsFocused(false)}
                  />

                  <Text style={globalstyles.textinput_Header_Style}>{language == "en" ? "Birth Id Number" : "شماره شناسنامه"}</Text>
                  <TextInput
                    value={language == "en" ? birth_id_number : engToPersian(birth_id_number)}
                    onChangeText={(e) => setBirth_id_number(e)}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    placeholder={strings.CHANGEPASS.ENTERHERE}
                    placeholderTextColor={Colors.textinput_inner_text}
                    style={globalstyles.textinputStyle}
                    onFocus={() => setBinIsFocused(true)}
                    onBlur={() => setBinIsFocused(false)}
                  />

                  <Text style={globalstyles.textinput_Header_Style}>{language == "en" ? "Father's Name" : "نام پدر"}</Text>
                  <TextInput
                    value={fathers_name}
                    onChangeText={(e) => setFathers_name(e)}
                    keyboardType="default"
                    autoCapitalize="none"
                    placeholder={strings.CHANGEPASS.ENTERHERE}
                    placeholderTextColor={Colors.textinput_inner_text}
                    style={globalstyles.textinputStyle}
                    onFocus={() => setFnIsFocused(true)}
                    onBlur={() => setFnIsFocused(false)}
                  />
                </View>
                <Button
                  onPress={submit}
                  name={"Update bank account"}
                  style={{
                    marginTop: Normalize(10),
                    marginBottom: Normalize(20),
                  }} />

              </ScrollView>
            </View>
          </CurveDesing_Component>
        }

      </View>

    </SafeAreaView>
  );
}

export default withRtl(PaymentMethod);
