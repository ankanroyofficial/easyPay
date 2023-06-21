import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Dimensions,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../../../constants/colors';
import Normalize from '../../../../helpers/Dimens';
import Header from '../../../../components/Header';
import images from './../../../../constants/images';
import styles from './Styles';
import strings from '../../../../constants/lng/LocalizedStrings';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderPage from '../../../../components/LoaderPage';
const { height, width } = Dimensions.get("window")
import { engToPersian } from '../../../../constants/EnglishToPersian';
import { myContext } from '../../../../constants/ContextApi';
import axiosInstance from '../../../../constants/AxiosCallPage';
import { leftOrRight } from '../../../../constants/RowOrRowreverse';
import DocumentPicker from 'react-native-document-picker';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import Button from '../../../../components/Button';
function DisputesAdd({ navigation, route }) {
  const { slug } = route.params
  const { id } = route.params
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const { token } = useContext(myContext);
  const [bankIsFocused, setBankIsFocused] = useState(false);
  const [ahnIsFocused, setAhnIsFocused] = useState(false);
  const [amountpay, setamountpay] = useState('');
  const [message, setmessage] = useState('');
  const [userid, setUserid] = useState('');
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [taskData, setTaskData] = useState("");
  const [imageFinalArray, setImageFinalArray] = useState([])

  const getTokon = async () => {
    try {
      let userid = await AsyncStorage.getItem('userid');
      setUserid(userid);
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTokon();
  }, []);

  const getData = async () => {
    try {
      setLoader2(true);
      const res = {
        jsonrpc: '2.0',
        params: {
          slug: slug,
        },
      }
      const data = await axiosInstance.post("get-task-details", res)
      setTaskData(data.data.result.task);
      setamountpay((Math.round(data.data.result.task.amount)).toString())
      setLoader2(false);
    } catch (error) {
      setLoader2(false);
      console.log('getData - ', error);
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
  const submit = async () => {
    try {
      setLoader(true);

      var finalAmount = ""
      if (language == "en") {
        var amountInteger = parseInt(amountpay)
        finalAmount = amountpay
      } else {
        var amountInteger = parseInt(amountpay.toEnglishDigits())
        finalAmount = amountpay.toEnglishDigits().toString()
      }

      if (amountInteger == "" || amountInteger < 5 || amountInteger > taskData.amount) {
        Toast.show(`Please enter a value greater than or equals to 5 and less than or equal to  ${addCommaAndTranslateInPersian(Math.round(taskData.amount), language)}`);
      } else if (message == '' || message.trim() == '') {
        Toast.show(
          language == 'en'
            ? 'Please enter Message'
            : 'لطفا نام دارنده حساب را وارد کنید',
        );
      } else {
        setLoader(true)
        console.log(taskData.id)
        const finalFormData = new FormData();
        finalFormData.append('task_id', taskData.id);
        finalFormData.append('amount', finalAmount);
        finalFormData.append('message', message);
        imageFinalArray.map((item, index) => {
          finalFormData.append("file[]", {
            uri: item.uri,
            name: item.fileName,
            type: item.type
          })
        })
        // console.log(finalFormData)
        const res = finalFormData
        const data = await axiosInstance.post("save-dispute", res)
        // console.log(finalFormData)
        if (data.data.success) {
          Toast.show(data.data.success.meaning);
          navigation.replace("DisputesDetails", { slug: slug, id: id })
        } else {
          Toast.show(data.data.error.meaning);
        }
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };


  // const selectPortfolioimage = () => {
  //   launchImageLibrary({ mediaType: "photo", selectionLimit: 15 }, (response) => {
  //     if (response.didCancel) {
  //     } else if (response.error) {
  //     } else if (response.customButton) {
  //     } else {
  //       imageArray(response.assets)
  //     }
  //   })
  // }


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





  const imageArray = (val) => {
    setLoader2(true)
    let array = imageFinalArray
    val.map((item) => {
      array.push(item)
    })
    setImageFinalArray(array)
    setLoader2(false)
  }
  // const deleteImage = async (val) => {
  //   let array = imageFinalArray;
  //   let newArr = []
  //   newArr = array.filter(item => item.fileName != val.fileName);
  //   setImageFinalArray(newArr);
  // }

  const deleteImage = async val => {
    let array = imageFinalArray;
    let newArr = [];
    newArr = array.filter(item => item.name != val.name);
    setImageFinalArray(newArr);
  };




  return (
    <>
      {
        loader2 && taskData == "" ? <LoaderPage />
          :
          <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

            <KeyboardAvoidingView
              behavior={(Platform.OS === 'ios') ? "padding" : null} style={styles.container}>
              <Header
                back
                name={strings.MORESCREEN.CREATEDISPUTE}
                navigation={navigation}
              />
              <CurveDesing_Component   >
                <View style={[globalstyles.container_only_padding,]} >
                  <ScrollView
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                  >
                    <View>

                      {userid == taskData.user_id ? (
                        <Text
                          style={[
                            styles.h1, {
                              marginHorizontal: Normalize(15),
                              // marginTop: '7%',
                              color: Colors.primary,
                              textAlign: leftOrRight(language),
                            },
                          ]}>
                          {language == 'en'
                            ? 'Amount you want to pay'
                            : 'مبلغی که می خواهید بپردازید'}
                        </Text>
                      ) : (
                        <Text
                          style={globalstyles.textinput_Header_Style}>Amount you want to recive</Text>
                      )}

                      <TextInput
                        value={language == "en" ? amountpay : engToPersian(amountpay)}
                        onChangeText={e => setamountpay(e)}
                        keyboardType="number-pad"
                        autoCapitalize="none"
                        placeholder={strings.CHANGEPASS.ENTERHERE}
                        placeholderTextColor={Colors.textinput_inner_text}
                        style={globalstyles.textinputStyle}
                        onFocus={() => setBankIsFocused(true)}
                        onBlur={() => setBankIsFocused(false)}
                      />
                      <Text style={globalstyles.textinput_Header_Style}>Message</Text>

                      <TextInput
                        multiline={true}
                        onChangeText={e => setmessage(e)}
                        keyboardType="default"
                        autoCapitalize="none"
                        placeholder={strings.MAKEANOFFER.TYPEYOURMSG}
                        placeholderTextColor={Colors.textinput_inner_text}
                        style={globalstyles.multiline_textinputStyle}
                        onFocus={() => setAhnIsFocused(true)}
                        onBlur={() => setAhnIsFocused(false)}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                      />

                      <Text style={globalstyles.textinput_Header_Style}>Upload Documents</Text>

                      <View style={styles.mainView}>
                        <View style={styles.bodyView}>

                          <TouchableOpacity
                            onPress={() => selectfile()}
                            style={{
                              borderWidth: 0.8,
                              borderColor: Colors.primary,
                              backgroundColor: Colors.disable_textinput_background,
                              alignItems: 'center',
                              justifyContent: 'center',
                              alignSelf: 'center',
                              borderRadius: 8,
                              width: '100%',
                              paddingVertical: Normalize(10),
                              marginVertical: Normalize(8),
                            }}>
                            <Image
                              style={{
                                height: Normalize(23),
                                width: Normalize(23),
                              }}
                              source={images.upload_image}
                            />
                            <Text style={[globalstyles.blue_Text, { fontFamily: "Outfit-Regular", fontSize: Normalize(14), lineHeight: Normalize(17) }]}>{strings.DISPUTE.CLICKTOSELECTFILES}</Text>

                          </TouchableOpacity>


                          {
                            loader2 ?
                              <View style={{ flex: 1 }}>
                              </View>
                              :
                              <View style={{ flexWrap: 'wrap', flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center" }}>
                                {
                                  loader2 ?
                                    <View style={{ flex: 1 }}>
                                      <Text></Text>
                                    </View>
                                    :
                                    <View style={{ flexWrap: 'wrap', flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center" }}>
                                      {
                                        imageFinalArray.map((item, index) => (
                                          <View key={index} style={{ width: Normalize(60), height: Normalize(60), justifyContent: "center", alignItems: "center", borderColor: Colors.primary, borderWidth: 0.8, borderRadius: 5, overflow: "hidden", margin: Normalize(3), padding: Normalize(8) }}>
                                            <TouchableOpacity onPress={() => {
                                              deleteImage(item)
                                            }}
                                              style={{ position: "absolute", top: -Normalize(3), zIndex: 1, left: language == "en" ? null : -Normalize(3), right: language == "en" ? -Normalize(3) : null }}>
                                              <Entypo
                                                name="cross"
                                                size={Normalize(20)}
                                                color={Colors.secondary}
                                              />
                                            </TouchableOpacity>
                                            {/* <Image source={{ uri: item.uri }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} /> */}
                                            {
                                              item.type == "image/jpeg" || item.type == "image/png" ?
                                                <Image
                                                  source={{ uri: item.uri }}
                                                  style={{
                                                    height: '90%',
                                                    width: '90%',
                                                    resizeMode: 'cover',
                                                  }}
                                                /> :
                                                <Image
                                                  source={images.fileIcon}
                                                  style={{
                                                    height: '90%',
                                                    width: '90%',
                                                    resizeMode: 'cover',
                                                  }}
                                                />
                                            }
                                          </View>
                                        ))
                                      }
                                    </View>
                                }
                              </View>
                          }
                        </View>
                      </View>

                    </View>

                    <Button
                      style={{ marginTop: Normalize(15) }}
                      onPress={submit}
                      name={loader ? "" : `${strings.MAKEANOFFER.SUBMIT}`}
                    >
                      {
                        loader &&
                        <ActivityIndicator size="small" color={Colors.white} />
                      }
                    </Button>
                  </ScrollView>
                </View>
              </CurveDesing_Component>
            </KeyboardAvoidingView>

          </SafeAreaView>
      }
    </>
  );
}

export default withRtl(DisputesAdd);
