import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Dimensions,
  Keyboard,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../../../../constants/colors';
import Normalize from '../../../../helpers/Dimens';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay';
import Button from '../../../../components/Button';
import Header_Transparent from '../../../../components/Header_Transparent';
import Toast from 'react-native-simple-toast';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TakingPhoneModal from './TakingPhoneModal';
import strings from '../../../../constants/lng/LocalizedStrings';
import { myContext } from '../../../../constants/ContextApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { axiosUrl } from '../../../../constants/LinkPage';
import { Alert } from 'react-native';
import { requestLocationPermission } from '../../../../constants/permissions/LocationPremission';
import { fontfmliy } from '../../../../components/WhichFontFamily';
const { height, width } = Dimensions.get("window")
export default function TakingDetails() {
  const navigation = useNavigation();
  const { setSignupLocation,
    signupLocation,
    all_country_code,
    takingPhoneNoModal,
    setTakingPhoneNoModal,
    onPressOpenModalPh,
    phone_Code, setPhone_Code,
    setTempSignupLocation,
    signupPhoneNumer_details,
    setSignupPhoneNumer_details
  } = useContext(myContext);
  const [fname, setFname] = useState('');
  const [isFnameFocused, setIsFnameFocused] = useState(false);
  const [lname, setLname] = useState('');
  const [isLnameFocused, setIsLnameFocused] = useState(false);
  const [phone, setPhone] = useState('');
  const [isGetOtp, setIsGetOtp] = useState(false);
  const [isPhoneVerify, setIsPhoneVerify] = useState(false);
  const check_phone_no = val => {
    return parseInt(val) == val;
  };
  const onpressnextButton = () => {
    try {
      let max_digits = signupPhoneNumer_details.max_no_of_digitis;
      let min_digits = signupPhoneNumer_details.min_no_of_digits;
      if (
        fname.trim().length == 0 ||
        lname.trim().length == 0 ||
        phone.trim().length == 0 ||
        phone_Code == '' ||
        signupLocation.lat == '' ||
        signupLocation.lng == ''
      ) {
        Toast.show(strings.ERROR.FILLUPALLFIELD);
      } else {
        if (signupLocation.lat == '' || signupLocation.lng == '') {
          Toast.show('Enter signupLocation');
        } else {
          if (!check_phone_no(phone)) {
            Toast.show("Enter a valid phone number")
          } else {
            if (phone_Code == "") {
              Toast.show("Select Phone Code")
            } else {
              if (!(phone.length >= min_digits && phone.length <= max_digits)) {
                if (min_digits != max_digits) {
                  Toast.show(`Enter minimum ${min_digits} digits and maximum ${max_digits} digits phone number`)
                } else {
                  Toast.show(`Enter ${max_digits} digits phone number`)
                }
              } else {
                tellUsAboutYourself()
              }
            }
          }
        }
      }
    } catch (error) {
      console.log('onpressnextButton', error);
    }
  };
  const tellUsAboutYourself = async () => {
    try {
      let lastDetails = await AsyncStorage.getItem('lastRegisterEmail');
      let a = JSON.parse(lastDetails);
      let data = {
        params: {
          location: signupLocation.name,
          lat: signupLocation.lat.toString(),
          lng: signupLocation.lng.toString(),
          fname: fname,
          lname: lname,
          email: a.email,
          phone: (phone).toString(),
          phonecode: phone_Code.toString(),
        },
      };
      // console.log(data)
      let res = await axios.post(axiosUrl.URL + 'tell-us-about-yourself', data);
      // console.log(res.data)

      if (res.data.result) {
        Toast.show(res.data.result.meaning);
        navigation.navigate('AfterSignUpThreePointPage');
      } else {
        Toast.show(res.data.error.meaning);
      }
    } catch (error) {
      console.log('tellUsAboutYourself', error);
    }
  };
  const whichCountry = async () => {
    try {
      let res = await axios.post('http://ip-api.com/json');
      let b = JSON.stringify(res.data)
      Toast.show(b)
      if (res.data.countryCode) {
        Toast.show(`devices country code > ${res.data.countryCode}`)
        all_country_code.map((item, index) => {
          if (item.sortname == res.data.countryCode) {
            // console.log(">>>>", item.phonecode)
            // Toast.show(`phone code >${item.phonecode}`)
            setPhone_Code(item.phonecode);
            let a = JSON.stringify(item)
            AsyncStorage.setItem('signupPhoneNumer_details', a);
            AsyncStorage.setItem("signupPhoneCode", (item.phonecode).toString())
            // setPreviousData()
          }
        });
        // console.log("---------------------------");
      } else {
        Toast.show("country code not came from ip-api ")
      }
    } catch (error) {
      console.log('whichCountry', error);
    }
  };
  const whichCountry_testing = async () => {
    try {
      let res = await axios.post('http://ip-api.com/json');
      let b = JSON.stringify(res.data)
      Toast.show(b)
    } catch (error) {
      console.log('whichCountry', error);
    }
  };




  const is_whichCountry_load = async () => {
    let phonecode = await AsyncStorage.getItem("signupPhoneCode")
    // Toast.show(`AsyncStorage phonecode > ${phonecode == null ? "null" : phonecode}`)

    if (phonecode == null || phone_Code == "") {
      whichCountry();
    }
  }
  // useEffect(async () => {
  //   // is_whichCountry_load()
  //   // whichCountry_testing()
  //   setPreviousData()
  // }, []);
  const handleBackButtonClick = () => {
    Alert.alert('Close', 'Are you sure, you want to close this registration?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'OK', onPress: goToLoginRegisterPage_IdRemove },
    ]);
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  const goToLoginRegisterPage_IdRemove = async () => {
    try {
      let lastDetails = await AsyncStorage.getItem('lastRegisterEmail');
      let a = JSON.parse(lastDetails);
      let data = {
        params: {
          email: a.email,
        },
      };
      let res = await axios.post(
        axiosUrl.URL + 'close-registration-background',
        data,
      );
      // console.log(res.data);

      if (res.data.result) {
        // Toast.show(res.data.result.meaning);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'IntroVideoScreen' }],
          }),
        );
        await AsyncStorage.removeItem('lastRegisterEmail');
        await AsyncStorage.removeItem("signupFname")
        await AsyncStorage.removeItem("signupLname")
        await AsyncStorage.removeItem("signupAddress")
        await AsyncStorage.removeItem("signupPhoneNo")
        await AsyncStorage.removeItem("signupPhoneCode")
        await AsyncStorage.removeItem("signupPhoneNumer_details")
        await AsyncStorage.removeItem("isSignUpPhVerified")
        await AsyncStorage.removeItem('last_login_from');
        setSignupLocation({
          name: '',
          lat: '',
          lng: '',
        })
        setPhone_Code('65')
        setSignupPhoneNumer_details({
          "created_at": null,
          "flag": "sg.png",
          "id": 196,
          "international_prefix": 0,
          "max_no_of_digitis": 8,
          "min_no_of_digits": 8,
          "name": "Singapore",
          "national_prefix": 0,
          "phonecode": 65,
          "sortname": "SG",
          "updated_at": null,
          "utc_dst": "+1"
        })

      } else {
        Toast.show(res.data.error.meaning);
      }
    } catch (error) {
      console.log('close-registration-background', error);
    }
  };
  const fnameSave = async (e) => {
    setFname(e)
    await AsyncStorage.setItem("signupFname", e)

  }
  const lnameSave = async (e) => {
    setLname(e)
    await AsyncStorage.setItem("signupLname", e)
  }
  const setPreviousData = async () => {
    let firstname = await AsyncStorage.getItem("signupFname")
    let lastname = await AsyncStorage.getItem("signupLname")
    let address = await AsyncStorage.getItem("signupAddress")
    let phoneNum = await AsyncStorage.getItem("signupPhoneNo")
    let phonecode = await AsyncStorage.getItem("signupPhoneCode")
    let isPhonenumVerified = await AsyncStorage.getItem("isSignUpPhVerified")
    let phonedetailsss = await AsyncStorage.getItem("signupPhoneNumer_details")

    // console.log("prev------>",phonedetailsss)

    if (firstname != null) {
      setFname(firstname)
    } else {
      setFname("")
    }
    if (lastname != null) {
      setLname(lastname)
    } else {
      setLname("")
    }
    if (address != null) {
      let a = JSON.parse(address)
      setSignupLocation({
        name: a.name,
        lat: a.lat,
        lng: a.lng,
      })
    }
    if (phoneNum != null) {
      setPhone(phoneNum)
    }

    if (phonecode != null) {
      setPhone_Code(phonecode)
    }

    if (isPhonenumVerified != null && isPhonenumVerified == "true") {
      setIsPhoneVerify(true)
    } else {
      setIsPhoneVerify(false)
    }

    if (phonedetailsss != null) {
      let pd = JSON.parse(phonedetailsss)
      setSignupPhoneNumer_details(pd)
    }
  }
  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss();
    })
  }, [])

  // useEffect(() => {
  //   let a = requestLocationPermission()
  //   return a
  // }, [])



  const prevDatabaseDetails = async () => {
    try {

      let lastDetails = await AsyncStorage.getItem("lastRegisterEmail")
      let a = JSON.parse(lastDetails)

      let data = {
        "params": {
          "email": a.email,
        }
      }
      let res = await axios.post(axiosUrl.URL + "get-info-of-verify", data)
      // console.log("----------------", res.data.result.user.info)

      if (res.data.result) {
        let databaseuserDetails = res.data.result.user.info
        let firstname = await AsyncStorage.getItem("signupFname")
        let lastname = await AsyncStorage.getItem("signupLname")
        let address = await AsyncStorage.getItem("signupAddress")
        let phoneNum = await AsyncStorage.getItem("signupPhoneNo")
        let phonecode = await AsyncStorage.getItem("signupPhoneCode")
        let isPhonenumVerified = await AsyncStorage.getItem("isSignUpPhVerified")
        let phonedetailsss = await AsyncStorage.getItem("signupPhoneNumer_details")

        // first name
        if (firstname != null) {
          setFname(firstname)
        } else if (databaseuserDetails.fname != null) {
          setFname(databaseuserDetails.fname)
          await AsyncStorage.setItem("signupFname", databaseuserDetails.fname)
        }
        // last name
        if (lastname != null) {
          setLname(lastname)
        } else if (databaseuserDetails.lname != null) {
          setLname(databaseuserDetails.lname)
          await AsyncStorage.setItem("signupLname", databaseuserDetails.lname)
        }
        // address
        if (address != null) {
          let a = JSON.parse(address)
          setSignupLocation({
            name: a.name,
            lat: a.lat,
            lng: a.lng,
          })
        } else if (databaseuserDetails.location != null || databaseuserDetails.lat != null || databaseuserDetails.lng != null) {
          setSignupLocation({
            name: databaseuserDetails.location,
            lat: databaseuserDetails.lat,
            lng: databaseuserDetails.lng,
          })

          let signupAddress = { "name": databaseuserDetails.location, "lat": databaseuserDetails.lat, "lng": databaseuserDetails.lng }
          let modifiedJson = JSON.stringify(signupAddress)
          await AsyncStorage.setItem("signupAddress", modifiedJson)


        }
        // phone number
        if (phoneNum != null) {
          setPhone(phoneNum)
        } else if (databaseuserDetails.phone != null) {
          if (databaseuserDetails.is_phone_verified != "N") {
            setPhone(databaseuserDetails.phone)
            await AsyncStorage.setItem("signupPhoneNo", databaseuserDetails.phone)
          }
        }
        // phone code
        if (phonecode != null) {
          selectCountry(phonecode)
          // setPhone_Code(phonecode)
        } else if (databaseuserDetails.country_code != null) {
          selectCountry(databaseuserDetails.country_code)
        }
        // isphone verify
        if (isPhonenumVerified != null && isPhonenumVerified == "true") {
          setIsPhoneVerify(true)
        } else if (databaseuserDetails.is_phone_verified != null) {

          if (databaseuserDetails.is_phone_verified == "N") {
            setIsPhoneVerify(false)
          } else if (databaseuserDetails.is_phone_verified == "Y") {
            setIsPhoneVerify(true)
            await AsyncStorage.setItem("isSignUpPhVerified", "true")
          }
        }
      }
    } catch (error) {
      console.log()
    }
  }
  const selectCountry = async (val) => {
    try {
      all_country_code.map((item, index) => {
        if (item.phonecode == val) {
          setPhone_Code(item.phonecode);
          setSignupPhoneNumer_details(item);
          let a = JSON.stringify(item)
          AsyncStorage.setItem('signupPhoneNumer_details', a);
          AsyncStorage.setItem("signupPhoneCode", (item.phonecode).toString())
        }
      });
    } catch (error) {
      console.log('selectCountry', error);
    }
  };
  useEffect(() => {
    prevDatabaseDetails()
  }, [])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        <View style={{ height: height, width: width, paddingHorizontal: Normalize(15) }}>
          <View style={{ flex: 1 }}>
            <Header_Transparent
              backFunc={handleBackButtonClick}
              iswhitebackground={true} />
            <Text
              style={[
                globalStyle_esyPay.pageHeading,
                { color: Colors.greyText, marginTop: Normalize(10) },
              ]}>
              Tell us about
            </Text>
            <Text
              style={[
                globalStyle_esyPay.pageHeading,
                { color: Colors.greyText, marginTop: Normalize(4) },
              ]}>
              yourself
            </Text>

            <View style={{ marginTop: Normalize(30) }}>
              <Text style={globalStyle_esyPay.inputHeader}>First Name</Text>
              <TextInput
                placeholder="Enter your first name"
                placeholderTextColor={Colors.textinput_placeholder}
                style={[
                  globalStyle_esyPay.input_noIcon,
                  {
                    fontSize: Normalize(11.5),
                    color: Colors.greyText,
                    fontFamily: fontfmliy.bold,
                    borderBottomColor: isFnameFocused
                      ? Colors.greyText
                      : Colors.textinput_bottomBorder,
                  },
                ]}
                value={fname}
                keyboardType="default"
                autoCapitalize="words"
                onChangeText={e => fnameSave(e)}
                onFocus={() => setIsFnameFocused(true)}
                onBlur={() => setIsFnameFocused(false)}
              />
            </View>
            <View style={{ marginTop: Normalize(18) }}>
              <Text style={globalStyle_esyPay.inputHeader}>Last Name</Text>
              <TextInput
                placeholder="Enter your last name"
                placeholderTextColor={Colors.textinput_placeholder}
                style={[
                  globalStyle_esyPay.input_noIcon,
                  {
                    fontSize: Normalize(11.5),
                    color: Colors.greyText,
                    fontFamily: fontfmliy.bold,
                    borderBottomColor: isLnameFocused
                      ? Colors.greyText
                      : Colors.textinput_bottomBorder,
                  },
                ]}
                value={lname}
                keyboardType="default"
                autoCapitalize="words"
                onChangeText={e => lnameSave(e)}
                onFocus={() => setIsLnameFocused(true)}
                onBlur={() => setIsLnameFocused(false)}
              />
            </View>

            <View style={{ marginTop: Normalize(18) }}>
              <Text style={globalStyle_esyPay.inputHeader}>
                Where are you located?
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate('SelectLocationPage')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: Normalize(1),
                  borderBottomColor: Colors.textinput_bottomBorder,
                }}>
                <View
                  style={{
                    borderBottomColor: Colors.textinput_bottomBorder,
                    borderBottomWidth: Normalize(1),
                    paddingVertical: Normalize(7),
                    height: '100%',
                    borderBottomWidth: 0,
                    width: '88%',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      paddingVertical: Normalize(5),
                      fontSize: Normalize(11.5),
                      color:
                        signupLocation.lat != '' && signupLocation.lng != ''
                          ? Colors.greyText
                          : Colors.textinput_placeholder,
                      fontFamily: fontfmliy.bold,
                    }}>
                    {signupLocation.lat != '' && signupLocation.lng != ''
                      ? signupLocation.name
                      : 'What city do you live in'}
                  </Text>
                </View>
                <View
                  style={{
                    height: Normalize(30),
                    width: Normalize(30),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo
                    name={'location-pin'}
                    color={Colors.primary}
                    size={Normalize(20)}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: Normalize(18) }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={globalStyle_esyPay.inputHeader}>Phone Number</Text>
                {isPhoneVerify && (
                  <Text
                    style={[
                      globalStyle_esyPay.inputHeader,
                      {
                        color: Colors.green_new,
                        fontFamily: fontfmliy.bold,
                        fontSize: Normalize(11.5),
                      },
                    ]}>
                    Verified
                  </Text>
                )}
              </View>

              <TouchableOpacity
                activeOpacity={1}
                onPressIn={() => setTakingPhoneNoModal(true)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: Normalize(1),
                  borderBottomColor: Colors.textinput_bottomBorder,
                }}>
                <View
                  style={{
                    borderBottomColor: Colors.textinput_bottomBorder,
                    borderBottomWidth: Normalize(1),
                    paddingVertical: Normalize(7),
                    height: '100%',
                    borderBottomWidth: 0,
                    width: '88%',
                  }}>
                  <Text
                    style={{
                      paddingVertical: Normalize(5),
                      fontSize: Normalize(11.5),
                      color: isPhoneVerify ? Colors.greyText : Colors.textinput_placeholder,
                      fontFamily: fontfmliy.bold,
                    }}>

                    {isPhoneVerify ? phone.length > 0 ? `+${phone_Code}-${phone}` : 'Enter your phone number' : 'Enter your phone number'}
                  </Text>
                </View>

                <View
                  style={{
                    height: Normalize(30),
                    width: Normalize(30),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome
                    name={'phone'}
                    color={Colors.primary}
                    size={Normalize(18)}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {takingPhoneNoModal && (
              <TakingPhoneModal
                ispress={takingPhoneNoModal}
                onpress={() => setTakingPhoneNoModal(!takingPhoneNoModal)}
                setPhone2={setPhone}
                phone2={phone}
                setIsGetOtp={setIsGetOtp}
                isGetOtp={isGetOtp}
                isPhoneVerify={isPhoneVerify}
                setIsPhoneVerify={setIsPhoneVerify}
              />
            )}

            <View style={{ flex: 1 }}></View>

            <Button
              // onPress={() => { navigation.navigate("AfterSignUpThreePointPage") }}
              onPress={onpressnextButton}
              name="Next"
              style={{ marginVertical: Normalize(25) }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
