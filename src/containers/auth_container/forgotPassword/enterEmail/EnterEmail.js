import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import { withRtl } from 'react-native-easy-localization-and-rtl';
import { Colors } from './../../../../constants/colors';
import strings from './../../../../constants/lng/LocalizedStrings';
import Button from './../../../../components/Button';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { axiosUrl } from '../../../../constants/LinkPage';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import Header_Transparent from '../../../../components/Header_Transparent';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay';
import { useNavigation } from '@react-navigation/native';
import { myContext } from '../../../../constants/ContextApi';
function EnterEmail(props) {
  const navigation = useNavigation()
  const { forgotPasswordEmail, setForgotPasswordEmail } = useContext(myContext)
  const { prevEmail } = props.route.params


  useEffect(() => {
    setForgotPasswordEmail(prevEmail)
  }, [])

  const [emailIsFocused, setEmailIsFocused] = useState(false);
  // const [forgotPasswordEmail, setForgotPasswordEmail] = useState(prevEmail);
  const [loader, setLoader] = useState(false)

  const onPressSubmit = async () => {
    try {
      setLoader(true)
      if (forgotPasswordEmail == "" || forgotPasswordEmail.trim() == "") {
        Toast.show(strings.ERROR.ENTEREMAIL)
      } else {
        const EmailVerify = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const res = EmailVerify.test(forgotPasswordEmail)
        if (res == false) {
          Toast.show(strings.ERROR.ENTERVALIDEMAIL)
        } else {
          const data = await axios({
            method: 'post',
            url: `${axiosUrl.URL}send-reset-link-email`,
            headers: {
              'X-localization': 'en',
            },
            data: {
              "params": {
                "email": forgotPasswordEmail
              }
            }
          });

          // console.log(data.data)
          // console.log("------------",forgotPasswordEmail)

          if (data.data.result.error) {
            Toast.show(data.data.result.error.meaning)
          } else {
            Toast.show(data.data.result.success.meaning)
            navigation.navigate("ForgotPasswordVerify", { email: forgotPasswordEmail })
            // setForgotPasswordEmail("")
          }
        }
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
        Keyboard.dismiss();
    })
}, [])

  return (
    //  <KeyboardAvoidingView behavior="padding">
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ flex: 1, }} >
        <View style={{ marginBottom: Normalize(30), flex: 1, paddingHorizontal: Normalize(16) }}>
          <Header_Transparent iswhitebackground />
          <Text style={[globalstyles.page_Header_Text, { alignSelf: "flex-start", marginTop: Normalize(25), marginBottom: Normalize(15) }]}>Forgot Password</Text>
          <Text style={[globalstyles.page_SubHeader_Text, { fontSize: Normalize(12), textAlign: "left", marginBottom: Normalize(25) }]}>Don't worry! Simply enter your registered email{'\n'}address below to recive instructions about how to{'\n'}reset your password</Text>
          {/* email input */}
          <Text style={globalStyle_esyPay.inputHeader} >Email address</Text>
          <TextInput
            value={forgotPasswordEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Enter your email address"
            placeholderTextColor={Colors.textinput_inner_text}
            onChangeText={(e) => setForgotPasswordEmail(e)}
            style={[globalStyle_esyPay.input_noIcon, { borderBottomColor: emailIsFocused ? Colors.primary : Colors.textinput_bottomBorder, }]}
            onFocus={() => setEmailIsFocused(true)}
            onBlur={() => setEmailIsFocused(false)}
          />

          <View style={{ flex: 1 }} />

          {/* Submit in button */}
          <Button
            disabled={loader ? true : false}
            style={{
              marginTop: Normalize(20),
              width: '100%',
              alignSelf: 'center',
            }}
            onPress={onPressSubmit}
            name={loader ? "" : strings.MAKEANOFFER.SUBMIT}
          >
            {loader &&
              <ActivityIndicator
                color={Colors.white}
              />}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    // </KeyboardAvoidingView>
  );
}

export default withRtl(EnterEmail);




