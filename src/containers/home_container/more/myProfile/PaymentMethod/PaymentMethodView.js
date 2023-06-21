import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { Colors } from '../../../../../constants/colors';
import Normalize from '../../../../../helpers/Dimens';
import Header from '../../../../../components/Header';
import styles from './Styles';
import strings from '../../../../../constants/lng/LocalizedStrings';
import { leftOrRight } from '../../../../../constants/RowOrRowreverse';
import LoaderPage from "../../../../../components/LoaderPage"
import { engToPersian } from '../../../../../constants/EnglishToPersian';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import Header_Transparent from '../../../../../components/Header_Transparent';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import Button from '../../../../../components/Button';

function PaymentMethodView({ navigation }) {
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
  const [loader, setLoader] = useState(false)


  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      getTokon()
    });
    return willFocusSubscription;
  }, []);

  const getTokon = async () => {
    try {
      getData()
    } catch (error) {
      console.log(error)
    }
  }

  const getData = async () => {
    try {
      setLoader(true)
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

  const submit = async () => {
    try {
      navigation.navigate('PaymentMethodUpdate')
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
      <View style={styles.container}>
        {/* <Header
          back
          name={language == "en" ? "Bank account details" : "مشخصات حساب بانکی"}
          navigation={navigation}
        /> */}
        {loader ?
          <LoaderPage />
          :
          <CurveDesing_Component>
            <View style={[globalstyles.container_only_padding]} >
              <ScrollView
                showsVerticalScrollIndicator={false}
              >
                <View style={{ flexDirection: 'column', alignItems: "flex-start" }}>
                  <Header_Transparent />
                  <Text style={globalstyles.page_Header_Text}>Bank account details</Text>
                  <Text style={globalstyles.blue_Text}>{language == "en" ? "Bank name" : "نام بانک"} :</Text>
                  <Text style={[globalstyles.plantext_outfit_semibold, { marginBottom: Normalize(8), }]}>{bank_name}</Text>

                  <Text style={globalstyles.blue_Text}>{language == "en" ? "Account holder name" : "نام صاحب حساب"} :</Text>
                  <Text style={[globalstyles.plantext_outfit_semibold, { marginBottom: Normalize(8), }]}>{acc_holder_name}</Text>

                  <Text style={globalstyles.blue_Text}>{language == "en" ? "Account number" : "شماره حساب"} :</Text>
                  <Text style={[globalstyles.plantext_outfit_semibold, { marginBottom: Normalize(8), }]}>{language == "en" ? account_number : engToPersian(account_number)}</Text>


                  <Text style={globalstyles.blue_Text}>{language == "en" ? "16 digits Card Number" : "شماره ۱۶ رقمی روی کارت"} :</Text>
                  <Text style={[globalstyles.plantext_outfit_semibold, { marginBottom: Normalize(8), }]}>{language == "en" ? card_number : engToPersian(card_number)}</Text>

                  <Text style={globalstyles.blue_Text}>{language == "en" ? "Sheba Number" : "شماره شبا"} :</Text>
                  <Text style={[globalstyles.plantext_outfit_semibold, { marginBottom: Normalize(8), }]}>{language == "en" ? sheba_number : engToPersian(sheba_number)}</Text>

                  <Text style={globalstyles.blue_Text}>{language == "en" ? "National Card Id Number" : "شماره ملی"} :</Text>
                  <Text style={[globalstyles.plantext_outfit_semibold, { marginBottom: Normalize(8), }]}>{language == "en" ? n_card_id_number : engToPersian(n_card_id_number)}</Text>

                  <Text style={globalstyles.blue_Text}>{language == "en" ? "Birth Id Number" : "شماره شناسنامه"} :</Text>
                  <Text style={[globalstyles.plantext_outfit_semibold, { marginBottom: Normalize(8), }]}>{language == "en" ? birth_id_number : engToPersian(birth_id_number)}</Text>

                  <Text style={globalstyles.blue_Text}>{language == "en" ? "Father's Name" : "نام پدر"} :</Text>
                  <Text style={[globalstyles.plantext_outfit_semibold, { marginBottom: Normalize(8), }]}>{fathers_name}</Text>

                </View>
                <Button
                style={{marginTop:Normalize(8),marginBottom:Normalize(15)}}
                  onPress={submit}
                  name="Update bank account"
                />

              </ScrollView>
            </View>
          </CurveDesing_Component>
        }
      </View>
    </SafeAreaView>
  );
}

export default withRtl(PaymentMethodView);
