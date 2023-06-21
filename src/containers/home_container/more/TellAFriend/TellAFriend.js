import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  TextInput,
  Dimensions,
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import {withRtl, useRtlContext} from 'react-native-easy-localization-and-rtl';
import {Colors} from '../../../../constants/colors';
import images from '../../../../constants/images';
import Normalize from '../../../../helpers/Dimens';
import Header from '../../../../components/Header';
import strings from '../../../../constants/lng/LocalizedStrings';
import Toast from 'react-native-simple-toast';
import {
  leftOrRight,
  rowOrRowreverse,
} from '../../../../constants/RowOrRowreverse';
import Button from '../../../../components/Button';
import axiosInstance from '../../../../constants/AxiosCallPage';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import {myContext} from '../../../../constants/ContextApi';

function TellAFriend({navigation}) {
  const {RtlStyles, isRtl, language, setLanguage} = useRtlContext();
  const {playStore_url} = useContext(myContext);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const [nameAndEmailArr, setNameAndEmailArr] = useState([]);
  const [frndnameIsfocus, setFrndnameIsfocus] = useState(false);
  const [frndemailIsfocus, setFrndemailIsfocus] = useState(false);
  const [messageIsFocus, setMessageIsFocus] = useState(false);
  const onPressAddButton = () => {
    let arr = nameAndEmailArr;
    if (name == '' || name.trim('') == '') {
      Toast.show(strings.TELLAFEIRND.ENTERNAME);
    } else {
      if (email == '' || email.trim('') == '') {
        Toast.show(strings.ERROR.ENTEREMAIL);
      } else {
        const EmailVerify = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const res = EmailVerify.test(email);
        if (res == false) {
          Toast.show(strings.ERROR.ENTERVALIDEMAIL);
        } else {
          arr.push({id: new Date().toString(), name: name, email: email});
          setName('');
          setEmail('');
          setNameAndEmailArr(arr);
        }
      }
    }
  };
  const objDelete = val => {
    try {
      let idx = val.toString();
      let arr = nameAndEmailArr;
      let newArr = arr.filter(item => item.id != idx);
      setNameAndEmailArr(newArr);
    } catch (error) {
      console.log(error);
    }
  };
  const submitButton = async () => {
    try {
      if (name.length > 0 || email.length > 0) {
        Toast.show(strings.TELLAFEIRND.ENTERADDBUTTON);
      } else {
        if (nameAndEmailArr.length < 1) {
          Toast.show(strings.TELLAFEIRND.ENTERATLEAST1FRIEND);
        } else {
          if (message == '' || message.trim('') == '') {
            Toast.show(strings.TELLAFEIRND.ENTERMESSAGE);
          } else {
            setLoader(true);
            let arr = nameAndEmailArr;
            let msg = message.trim('');
            var nameArr = [];
            var emailArr = [];
            arr.map(item => {
              nameArr = [...nameArr, item.name];
              emailArr = [...emailArr, item.email];
            });

            const data = {
              params: {
                friend_email: emailArr,
                friend_name: nameArr,
                message: msg,
              },
            };

            const res = await axiosInstance.post('tell-a-friend', data);
            // console.log("res.data", res.data)
            if (res.data.result.success) {
              Toast.show(res.data.result.success.meaning);
              setNameAndEmailArr([]);
              setName('');
              setEmail('');
              setMessage('');
              Keyboard.dismiss();
              setLoader(false);
            }
            setLoader(false);
          }
        }
      }
    } catch (error) {
      console.log('submitButton', error);
    }
  };
  const shareToWhatsApp = async (text = 'abcd') => {
    const isOpen = await Linking.canOpenURL('whatsapp://send?text=${text}');
    if (isOpen) {
      Linking.openURL(`whatsapp://send?text=${text}`);
    } else {
      Toast.show("Install Whatsapp")
    }
  };
  return (
    <SafeAreaView
      style={{backgroundColor: Colors.primary, flex: 1, flexDirection: 'column'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{backgroundColor: Colors.white, flex: 1}}>
        <Header
          back
          name={strings.MORESCREEN.TELLAFEIRND}
          navigation={navigation}
        />
        <CurveDesing_Component  >
          <View style={[globalstyles.container_only_padding, {}]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always">
              <Text
                style={[
                  globalstyles.blue_Text,
                  {
                    textAlign: leftOrRight(language),
                    fontSize: Normalize(15),
                    marginTop: Normalize(8),
                  },
                ]}>
                {strings.MORESCREEN.TELLAFEIRND}
              </Text>
              <Text
                style={[
                  globalstyles.textinput_Header_Style,
                  {textAlign: leftOrRight(language)},
                ]}>
                {strings.TELLAFEIRND.FRIENDNAME}
              </Text>
              <TextInput
                value={name}
                keyboardType="default"
                autoCapitalize="none"
                placeholder={strings.TELLAFEIRND.ENTERYOURFRIENDNAME}
                placeholderTextColor={Colors.textinput_inner_text}
                onChangeText={e => setName(e)}
                style={[
                  globalstyles.textinputStyle,
                  {
                    borderColor: frndnameIsfocus
                      ? Colors.primary
                      : Colors.disable_textinput_border,
                    backgroundColor: frndnameIsfocus
                      ? Colors.white
                      : Colors.disable_textinput_background,
                  },
                ]}
                onFocus={() => setFrndnameIsfocus(true)}
                onBlur={() => setFrndnameIsfocus(false)}
              />
              <Text
                style={[
                  globalstyles.textinput_Header_Style,
                  {textAlign: leftOrRight(language)},
                ]}>
                {strings.TELLAFEIRND.FRIENDEMAIL}
              </Text>
              <TextInput
                value={email}
                keyboardType="email-address"
                placeholder={strings.TELLAFEIRND.ENTERYOURFRIENDEMAIL}
                placeholderTextColor={Colors.textinput_inner_text}
                onChangeText={e => setEmail(e)}
                style={[
                  globalstyles.textinputStyle,
                  {
                    borderColor: frndemailIsfocus
                      ? Colors.primary
                      : Colors.disable_textinput_border,
                    backgroundColor: frndemailIsfocus
                      ? Colors.white
                      : Colors.disable_textinput_background,
                  },
                ]}
                onFocus={() => setFrndemailIsfocus(true)}
                onBlur={() => setFrndemailIsfocus(false)}
              />
              <Button
                disabled={nameAndEmailArr.length >= 5 ? true : false}
                onPress={onPressAddButton}
                style={{
                  width: '50%',
                  alignSelf: 'center',
                  backgroundColor:
                    nameAndEmailArr.length >= 5
                      ? Colors.disableBackGround
                      : Colors.green2,
                  marginVertical: Normalize(5),
                }}
                textStyle={{
                  paddingLeft: 0,
                  color:
                    nameAndEmailArr.length >= 5
                      ? Colors.disableText
                      : Colors.white,
                }}
                name={strings.POSTTASK.ADD}
              />
              {nameAndEmailArr.map((item, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: '#f1f6f9',
                    marginTop: Normalize(5),
                    borderRadius: 7,
                    elevation: Normalize(2),
                    width: '100%',
                    alignSelf: 'center',
                    padding: Normalize(10),
                  }}>
                  <View
                    style={{
                      flexDirection: rowOrRowreverse(language),
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <Text
                      style={[
                        globalstyles.plantext_Outfit_Medium,
                        {color: Colors.primary},
                      ]}>
                      {strings.TELLAFEIRND.FRIEND} {index + 1}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        objDelete(item.id);
                      }}
                      style={{height: Normalize(11), width: Normalize(11)}}>
                      <Image
                        source={images.cross}
                        style={{
                          height: '100%',
                          width: '100%',
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: rowOrRowreverse(language),
                      marginVertical: Normalize(4),
                    }}>
                    <Text style={globalstyles.plantext_outfit_regular}>
                      {strings.TELLAFEIRND.NAME}
                    </Text>
                    <Text
                      style={[
                        globalstyles.plantext_Outfit_Medium,
                        {marginHorizontal: Normalize(5)},
                      ]}>
                      {item.name}
                    </Text>
                  </View>
                  <View style={{flexDirection: rowOrRowreverse(language)}}>
                    <Text style={globalstyles.plantext_outfit_regular}>
                      {strings.TELLAFEIRND.EMAIL}
                    </Text>
                    <Text
                      style={[
                        globalstyles.plantext_Outfit_Medium,
                        {marginHorizontal: Normalize(5)},
                      ]}>
                      {item.email}
                    </Text>
                  </View>
                </View>
              ))}
              <Text
                style={[
                  globalstyles.textinput_Header_Style,
                  {textAlign: leftOrRight(language)},
                ]}>
                {strings.TELLAFEIRND.MESSAGE}
              </Text>
              <Text
                style={[
                  globalstyles.textInput_SubHeader,
                  {textAlign: leftOrRight(language)},
                ]}>
                {strings.TELLAFEIRND.PLEASEWRITEACOMMON}
              </Text>
              <TextInput
                value={message}
                multiline
                keyboardType="default"
                onChangeText={e => setMessage(e)}
                placeholder={strings.TELLAFEIRND.ENTERYOURMESSAGEHERE}
                style={[
                  globalstyles.multiline_textinputStyle,
                  {
                    borderColor: messageIsFocus
                      ? Colors.primary
                      : Colors.disable_textinput_border,
                    backgroundColor: messageIsFocus
                      ? Colors.white
                      : Colors.disable_textinput_background,
                  },
                ]}
                onFocus={() => setMessageIsFocus(true)}
                onBlur={() => setMessageIsFocus(false)}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
              />

              <Button
                style={{marginTop: Normalize(10), marginBottom: Normalize(15)}}
                disabled={loader ? true : false}
                onPress={submitButton}
                name={loader ? '' : strings.MAKEANOFFER.SUBMIT}>
                {loader && (
                  <ActivityIndicator size={'small'} color={Colors.white} />
                )}
              </Button>
              <TouchableOpacity
                onPress={() => shareToWhatsApp(playStore_url)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: Normalize(10),
                }}>
                <Text
                  style={{
                    fontSize: Normalize(14),
                    marginRight: Normalize(10),
                    fontFamily: 'Outfit-SemiBold',
                    textAlign: language == 'en' ? 'left' : 'right',
                  }}>
                  Share with whatsapp
                </Text>
                <View
                  style={{
                    width: Normalize(35),
                    height: Normalize(35),
                    marginTop: Normalize(5),
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{height: '100%', width: '100%', resizeMode: 'cover'}}
                    source={images.whatsapp}
                  />
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </CurveDesing_Component>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default withRtl(TellAFriend);
