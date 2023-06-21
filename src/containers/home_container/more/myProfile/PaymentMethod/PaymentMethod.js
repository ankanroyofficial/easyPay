import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { Colors } from '../../../../../constants/colors';
import Normalize from '../../../../../helpers/Dimens';
import Header from '../../../../../components/Header';
import styles from './Styles';
import strings from '../../../../../constants/lng/LocalizedStrings';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import Header_Transparent from '../../../../../components/Header_Transparent';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
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
    } catch (error) {
      console.log(error)
    }
  }
  const submit = async () => {
    try {
      setLoader(true)

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
        const res = {
          "params": {
            "bank_name": bank_name,
            "account_holder_name": acc_holder_name,
            "account_number": account_number,
            "sheba_number": sheba_number,
            "card_number": card_number,
            "national_card_id_number": n_card_id_number,
            "birth_id_number": birth_id_number,
            "fathers_name": fathers_name
          }
        }
        const data = await axiosInstance.post("update-payment-method", res)
        if (data) {

          Toast.show(data.data.result.meaning)
          navigation.navigate('PaymentMethodView')
        }
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

      <View style={styles.container}>
        <CurveDesing_Component>
          <View style={[globalstyles.container_only_padding]} >
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
            >
              <View style={{ flexDirection: 'column' }}>
                <Header_Transparent />
                <Text style={globalstyles.page_Header_Text}>Enter bank account details</Text>
                <Text style={globalstyles.page_SubHeader_Text}>Please provide your bank details so you can get paid.{"\n"}We don't take any money from your account</Text>
                <Text style={globalstyles.textinput_Header_Style}>{language == "en" ? "Bank name" : "نام بانک"}</Text>

                <TextInput
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
                  onChangeText={(e) => setAccount_number(e)}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  placeholder={strings.CHANGEPASS.ENTERHERE}
                  placeholderTextColor={Colors.textinput_inner_text}
                  style={globalstyles.textinputStyle}
                  onFocus={() => setAnIsFocused(true)}
                  onBlur={() => setAnIsFocused(false)}
                />

                <Text style={globalstyles.textinput_Header_Style}>{language == "en" ? "16 digits Card Number" : "شماره کارت ۱۶ رقمی"}</Text>
                <TextInput
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
                  onChangeText={(e) => setSheba_number(e)}
                  keyboardType="default"
                  autoCapitalize="none"
                  placeholder={strings.CHANGEPASS.ENTERHERE}
                  placeholderTextColor={Colors.textinput_inner_text}
                  style={globalstyles.textinputStyle}
                  onFocus={() => setShebaIsFocused(true)}
                  onBlur={() => setShebaIsFocused(false)}
                />

                <Text style={globalstyles.textinput_Header_Style}>{language == "en" ? "National Card Id Number" : "شماره شناسه کارت ملی"}</Text>
                <TextInput
                  onChangeText={(e) => setN_card_id_number(e)}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  placeholder={strings.CHANGEPASS.ENTERHERE}
                  placeholderTextColor={Colors.textinput_inner_text}
                  style={globalstyles.textinputStyle}
                  onFocus={() => setNcinIsFocused(true)}
                  onBlur={() => setNcinIsFocused(false)}
                />

                <Text style={globalstyles.textinput_Header_Style}>{language == "en" ? "Birth Id Number" : "شماره شناسنامه تولد"}</Text>
                <TextInput
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
                name={loader ? "" : "Add Bank Account"}
                style={{
                  marginTop: Normalize(10),
                  marginBottom: Normalize(20),
                }}
              >
                {
                  loader &&
                  <ActivityIndicator
                    size="small"
                    color={Colors.white}
                  />
                }
              </Button>
            </ScrollView>
          </View>
        </CurveDesing_Component>
      </View>

    </SafeAreaView>
  );
}

export default withRtl(PaymentMethod);
