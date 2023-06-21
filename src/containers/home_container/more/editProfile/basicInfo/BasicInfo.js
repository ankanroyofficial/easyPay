import React, { useEffect, useRef, useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  Modal,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { withRtl } from 'react-native-easy-localization-and-rtl';
import DateTimePickerModal from 'react-native-datepicker';
import axios from 'axios';
import { Colors } from '../../../../../constants/colors';
import Normalize from '../../../../../helpers/Dimens';
import Header from '../../../../../components/Header';
import styles from './Styles';
import Button from '../../../../../components/Button';
import strings from '../../../../../constants/lng/LocalizedStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { myContext } from '../../../../../constants/ContextApi';
import { axiosUrl } from '../../../../../constants/LinkPage';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import globalStyle_esyPay from '../../../../../constants/globalStyles/GlobalStyle_esyPay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EditProfilePhoneModal from './EditProfilePhoneModal';
import NewLoaderPage from '../../../../../components/NewLoaderPage';
import Geolocation from '@react-native-community/geolocation';
import { Constant_apis } from '../../../../../constants/Constant_api';
import { fontfmliy } from '../../../../../components/WhichFontFamily';

const { height, width } = Dimensions.get("window")
function BasicInfo({ navigation }) {
  const ref = useRef();
  const {
    setPh_email_verify,
    setPhone_numbe,
    setEmail_Address,
    country_id, setCountry_id,
    country_value, setCountry_value,
    nationality_id, setNationality_id,
    nationality_value, setNationality_value,
    editProfileaddress, setEditProfileaddress,
    slugName, setSlugName,
    takingPhoneNoModal, setTakingPhoneNoModal,
    phone_Code, setPhone_Code,
    signupPhoneNumer_details,
    setSignupPhoneNumer_details,
    all_country_code,
    isPhoneVerify, setIsPhoneVerify,
    isPhVerify, setIsPhVerify,
    prev_phone, setPrev_Phone,
    prev_phoneCode, setPrev_phoneCode,
    setIsNewbeAFixerStep2Load
  } = useContext(myContext);
  const [loader, setLoader] = useState(false);
  const [fname, setFname] = useState(storageData ? storageData.fname : '');
  const [lname, setLname] = useState('');
  const [taxID, setTaxID] = useState('');
  const [isGenderModal, setIsGenderModal] = useState(false);
  const [gender, setGender] = useState({
    value: '',
    title: '',
  });
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [prev_email, setPrev_email] = useState('');
  const [dateofbirth, setDateofbirth] = useState();
  const [selectYear, setSelectYear] = useState('');

  const [allcountry, setAllcountry] = useState([]);
  const [storageData, setStorageData] = useState();
  const [isEmailVerify, setIsEmailVerify] = useState('N');
  const [fullDate, setFullDate] = useState();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fnameIsFocused, setFnameIsFocused] = useState(false);
  const [lnameIsFocused, setLnameIsFocused] = useState(false);
  const [taxIDIsFocused, setTaxIDIsFocused] = useState(false);
  const [isGetOtp, setIsGetOtp] = useState(false);

  const onPressOpenModalPh = () => {
    setTakingPhoneNoModal(!takingPhoneNoModal);
  };
  const genderType = [
    {
      value: 'M',
      title: 'Male',
      icon: 'male',
    },
    {
      value: 'F',
      title: 'Female',
      icon: 'female',
    },
    {
      value: 'O',
      title: 'Other',
      icon: 'male-female',
    },
  ];

  const dateChange2 = val => {
    const parts = val.split('-');
    const mydate = new Date(parts[0], parts[1] - 1, parts[2]);
    const date = mydate.toDateString();
    const tarik = date.split(' ');
    var fullDate = tarik[2] + ' ' + tarik[1] + ',' + ' ' + tarik[3];
    setSelectYear(tarik[3]);
    setFullDate(fullDate);
    setDateofbirth(val);
  };
  const dateChange3 = val => {
    val = moment(val, 'DD MMM, YYYY').format('YYYY-MM-DD');
    const parts = val.split('-');
    const mydate = new Date(parts[0], parts[1] - 1, parts[2]);
    const date = mydate.toDateString();
    const tarik = date.split(' ');
    var fullDate = tarik[2] + ' ' + tarik[1] + ',' + ' ' + tarik[3];
    setSelectYear(tarik[3]);
    setFullDate(fullDate);
    setDateofbirth(val);
  };
  const onpressSelectGender = () => {
    setIsGenderModal(!isGenderModal);
  };
  const getTokon = async () => {
    try {
      let slug = await AsyncStorage.getItem('slug');
      setSlugName(slug);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };
  const storeProfileData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@profiledata', jsonValue);
    } catch (error) {
      console.log('storeProfileData', error);
    }
  };
  const reload_after_comeBack = async () => {
    try {
      const data = await axios.post(`${axiosUrl.URL}public-profile`, {
        jsonrpc: '2.0',
        params: {
          slug: `${slugName}`,
        },
      });

      // console.log(data.data.result.user)

      if (data.data.result.user) {
        storeProfileData(data.data.result.user);
        let ph = data.data.result.user.is_phone_verified;
        let email = data.data.result.user.is_email_verified;
        if (ph == 'N' || email == 'N') {
          setPh_email_verify(false);
        } else {
          setPh_email_verify(true);
        }

        setIsPhVerify(data.data.result.user.is_phone_verified);

        data.data.result.user.is_phone_verified == "N" ? setIsPhoneVerify(false) : setIsPhoneVerify(true)
        setIsEmailVerify(data.data.result.user.is_email_verified);
        setEmail(data.data.result.user.email);
        setPhone(data.data.result.user.phone);
        setPrev_email(data.data.result.user.email);
        setPrev_Phone(data.data.result.user.phone);
        ref.current == null?.setAddressText(editProfileaddress.name);

        // setLoader(false);
      }
      // setLoader(false);
    } catch (error) {
      console.log('reload_after_comeBack', error);
    }
  };
  const isload_reload_after_comeBack = () => {

    reload_after_comeBack();

  };
  // useEffect(async () => {
  //   isload_reload_after_comeBack();
  //   const willFocusSubscription = navigation.addListener('focus', () => {
  //     isload_reload_after_comeBack();
  //   });
  //   return willFocusSubscription;
  // }, [slugName]);


  const selectCountry = async (val) => {
    try {
      all_country_code.map((item, index) => {
        if (item.phonecode == val) {
          setSignupPhoneNumer_details(item);
        }
      });
    } catch (error) {
      console.log('selectCountry', error);
    }
  };



  const getProfileData = async () => {
    var data = {};
    try {
      let profiledata = await AsyncStorage.getItem('@profiledata');
      if (profiledata) {
        setLoader(true);
        setPhone_Code("")
        data = JSON.parse(profiledata);
        setStorageData(data);
        setFname(data.fname);
        setLname(data.lname);
        setEmail(data.email);

        // console.log(data.email)

        if (data.phone != null) {
          setPhone(data.phone)
          setPrev_Phone(data.phone);
        }




        setIsPhVerify(data.is_phone_verified)

        data.is_phone_verified == "N" ? setIsPhoneVerify(false) : setIsPhoneVerify(true)

        // console.log(data)
        // console.log(data.phone)
        // console.log("---------------------------")

        if (data.gender == 'M') {
          setGender({
            value: 'M',
            title: 'Male',
          });
        } else if (data.gender == 'F') {
          setGender({
            value: 'F',
            title: 'Female',
          });
        } else if (data.gender == 'O') {
          setGender({
            value: 'O',
            title: 'Other',
          });
        } else if (data.gender == null) {
          setGender({
            value: '',
            title: '',
          });
        } else {
          setGender({
            value: '',
            title: '',
          });
        }

        setPrev_email(data.email);
        selectCountry(data.country_code)
        setPhone_Code(data.country_code);
        setPrev_phoneCode(data.country_code);
        if (data.date_of_birth != null) {
          dateChange2(data.date_of_birth);
        }

        // nationality
        {
          data.get_country_info != null && setNationality_id(data.get_country_info.id);
        }
        {
          data.get_country_info != null &&
            setNationality_value(data.get_country_info.name);
        }

        // residance
        {
          data.get_country_residence_info != null && setCountry_id(data.get_country_residence_info.id);
        }
        {
          data.get_country_residence_info != null &&
            setCountry_value(data.get_country_residence_info.name);
        }
        if (data.location != null) {

          setEditProfileaddress({ name: data.location, lat: data.lat, lng: data.lng });
        } else {
          getLocation()
        }

        if (data.tax_id != "" && data.tax_id != null) {
          setTaxID(data.tax_id)
        }

        setLoader(false);
      } else {
        setLoader(false);
        console.log('no data');
      }
      setLoader(false);
    } catch (error) {
      console.log('getProfileData---1', error);
      setLoader(false);
    }
  };
  useEffect(() => {
    getTokon();
    getProfileData();
  }, []);
  const check_phone_no = (val) => {
    return parseInt(val) == val
  }
  const onpressSave_Continue_Button1 = () => {
    navigation.navigate('New_beAFixer_Step2');
  }


  const onpressSave_Continue_Button = () => {
    try {


      // var phoneint = parseInt(phone);
      const currentData = new Date();
      const currentYear = currentData.getFullYear();

      if (fname.length == 0) {
        Toast.show(strings.ERROR.ENTERFNAME);
      } else {
        if (lname.length == 0) {
          Toast.show(strings.ERROR.ENTERLNAME);
        } else {
          if (gender.value == "") {
            Toast.show('Select Gender');
          } else {
            if (nationality_id == "") {
              Toast.show("Select Nationality");
            } else {
              if (dateofbirth == undefined) {
                Toast.show(strings.ERROR.ENTERDOB);
              } else {
                if (currentYear - selectYear < 18) {
                  Toast.show(strings.ERROR.AGEVALIDATION);
                } else {

                  if (editProfileaddress.lat == '' || editProfileaddress.lng == '') {
                    Toast.show("Select Address");
                  } else {
                    if (country_id == "") {
                      Toast.show("Select Country of Residence");
                    } else {
                      if (!check_phone_no(phone)) {
                        Toast.show(strings.ERROR.ENTERPHONE);
                      } else {
                        if (phone_Code == '') {
                          Toast.show('Enter Phone Code');
                        } else {

                          let max_digits = signupPhoneNumer_details.max_no_of_digitis;
                          let min_digits = signupPhoneNumer_details.min_no_of_digits;

                          if (!(phone.length >= min_digits && phone.length <= max_digits)) {
                            if (min_digits != max_digits) {
                              Toast.show(`Enter minimum ${min_digits} digits and maximum ${max_digits} digits phone number`)
                            } else {
                              Toast.show(`Enter ${max_digits} digits phone number`)
                            }
                          } else {

                            if (isPhVerify == 'N') {
                              Toast.show("Verify your Phone number")
                            } else {

                              let countryidint = country_id;
                              let nationalityidint = parseInt(nationality_id);
                              let phoneint = parseInt(prev_phone);

                              let finalFormData = new FormData();
                              finalFormData.append('fname', fname);
                              finalFormData.append('lname', lname);
                              finalFormData.append('gender', gender.value);
                              finalFormData.append('country_id', nationalityidint);
                              finalFormData.append('country_of_residence', countryidint);
                              finalFormData.append('phone', phoneint);
                              finalFormData.append('phonecode', prev_phoneCode);
                              finalFormData.append('date_of_birth', dateofbirth);
                              finalFormData.append('location', editProfileaddress.name);
                              finalFormData.append('lat', editProfileaddress.lat);
                              finalFormData.append('lng', editProfileaddress.lng);
                              finalFormData.append('tax_id', taxID.toString());
                              const data = finalFormData;
                              // console.log(data)
                              finalapiCall(data);
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.log('onpressSave_Continue_Button', error);
    }
  };
  const finalapiCall = async val => {
    try {
      setLoader(true);
      const res = await axiosInstance.post('become-a-co-tasker-edit-profile', val);
      // console.log(res.data)
      if (res.data) {
        if (res.data.error == undefined) {
          await AsyncStorage.setItem('isMyProfile', 'true');
          setIsGetOtp(false)
          setEmail_Address({ isActive: false, activeTitle: email });
          setPhone_numbe({ isActive: false, activeTitle: phone });
          if (prev_phone != phone || prev_email != email) {
            setPh_email_verify(false);
          } else {
            setPh_email_verify(true);
          }
          setLoader(false);
          // Toast.show(res.data.result.status.meaning);
          setIsNewbeAFixerStep2Load(false)
          navigation.navigate('New_beAFixer_Step2');
        } else {
          if (res.data.error.meaning) {
            if (
              res.data.error.meaning == 'Your email-id is not verified!' ||
              res.data.error.meaning ==
              'Your email-id and phone number is not verified!' ||
              res.data.error.meaning == 'Your phone number is not verified!'
            ) {
              const isEmailVerified = res.data.result.is_email_verified;
              const isPhoneVerified = res.data.result.is_phone_verified;
              // console.log(res.data)
              var phoneOtp = '';
              var emailOtp = '';
              if (isPhoneVerified == 'N') {
                phoneOtp = res.data.result.phone_otp;
              } else {
                phoneOtp = '0000';
              }
              if (isEmailVerified == 'N') {
                emailOtp = res.data.result.email_otp;
              } else {
                emailOtp = '000000';
              }
              setLoader(false);
              if (isEmailVerified == 'Y' && isPhoneVerified == 'Y') {
                setIsNewbeAFixerStep2Load(false)
                navigation.navigate('New_beAFixer_Step2');
              } else {
                if (res.data.result.is_email_verified != undefined) {
                  // setAutoLoad(true)
                  navigation.navigate('BothEmailPhoneVerify', {
                    is_email_verified: isEmailVerified,
                    is_phone_verified: isPhoneVerified,
                    phone_otp: phoneOtp,
                    email_otp: emailOtp,
                    email: email,
                    phone: phone,
                  });
                }
              }
            }
            Toast.showWithGravity(
              res.data.error.meaning,
              Toast.LONG,
              Toast.BOTTOM,
            );
          } else {
            Toast.show(res.data.error.phone[0]);
          }
        }
      } else {
        setLoader(false);
        Toast.show(strings.ERROR.SOMETHINGERRORINAPI);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log('finalapiCall---', error);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      info => {
        // console.log(
        //   info.coords.latitude,
        //   info.coords.longitude,
        //   info.coords.accuracy,
        // );

        getLocationName(info.coords.latitude, info.coords.longitude)
      },
      error => { console.log("gggg", error) },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        // maximumAge: 10000
      }
    );
  };
  // useEffect(() => {
  //   getLocation();
  // }, []);
  // const getCurrentLocation = (lat, lon, accuracy) => {
  //   setCurrentLocation({
  //     latitude: lat,
  //     longitude: lon,
  //     latitudeDelta: 0.015,
  //     longitudeDelta: 0.0121,
  //   });

  //   getLocationName()
  // };

  const getLocationName = async (lat, lng) => {
    try {
      const res = await axios.post(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng}&key=${Constant_apis.Google_Location_api}`,
      );
      if (res.data.results) {
        var locationName = res.data.results[0].formatted_address;
        ref.current?.setAddressText(locationName)
        if (locationName.length > 0) {
          var locationName = res.data.results[0].formatted_address;
          // console.log(locationName);


          setEditProfileaddress({
            name: locationName,
            lat: lat,
            lng: lng,
          });
        } else {
          Toast.show('Enter a valid location');
        }
      } else {
        Toast.show('Location error');
      }
    } catch (error) {
      console.log(error);
    }
  };





  return (

    <SafeAreaView
      style={{
        backgroundColor: Colors.primary,
        flex: 1,
        flexDirection: 'column',
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}>
        <Header back name={'Become a EazyPayer'} navigation={navigation} />
        <View
          style={[
            globalstyles.container,
          ]}>

          <ScrollView
            contentContainerStyle={{ marginTop: Normalize(10), }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            {/* fname */}
            <View style={{ marginTop: Normalize(0) }}>
              <Text style={globalStyle_esyPay.inputHeader}>First Name</Text>
              <TextInput
                placeholder="Enter your first name"
                placeholderTextColor={Colors.textinput_placeholder}
                style={[
                  globalStyle_esyPay.input_noIcon,
                  {
                    borderBottomColor: fnameIsFocused
                      ? Colors.greyText
                      : Colors.textinput_bottomBorder,
                  },
                ]}
                value={fname}
                keyboardType="default"
                autoCapitalize="words"
                onChangeText={e => setFname(e)}
                onFocus={() => setFnameIsFocused(true)}
                onBlur={() => setFnameIsFocused(false)}
              />
            </View>

            {/* lname */}
            <View style={{ marginTop: Normalize(18) }}>
              <Text style={globalStyle_esyPay.inputHeader}>Last Name</Text>
              <TextInput
                placeholder="Enter your last name"
                placeholderTextColor={Colors.textinput_placeholder}
                style={[
                  globalStyle_esyPay.input_noIcon,
                  {
                    borderBottomColor: lnameIsFocused
                      ? Colors.greyText
                      : Colors.textinput_bottomBorder,
                  },
                ]}
                value={lname}
                keyboardType="default"
                autoCapitalize="words"
                onChangeText={e => setLname(e)}
                onFocus={() => setLnameIsFocused(true)}
                onBlur={() => setLnameIsFocused(false)}
              />
            </View>


            {/* gender */}
            <View style={{ marginTop: Normalize(18) }}>
              <Text style={globalStyle_esyPay.inputHeader}>
                Gender
              </Text>
              <Pressable
                onPress={onpressSelectGender}
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
                      color: Colors.textinput_placeholder,
                      fontFamily: fontfmliy.bold,
                    }}>
                    {gender.title != '' ? gender.title : 'Select'}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo
                    name={isGenderModal ? 'chevron-small-up' : 'chevron-small-down'}
                    color={Colors.grey}
                    size={Normalize(22)}
                  />
                </View>
              </Pressable>
              {isGenderModal && (
                <Modal
                  animationType="none"
                  visible={isGenderModal}
                  transparent={true}
                  onRequestClose={onpressSelectGender}>
                  <Pressable
                    onPress={onpressSelectGender}
                    style={{ flex: 1, backgroundColor: "rgba(52,52,52,0)", alignItems: "center", paddingHorizontal: Normalize(25) }} >

                    <View style={{ marginTop: Normalize(260), backgroundColor: Colors.white, justifyContent: "center", alignItems: "center", elevation: 5 }} >

                      <View style={{ paddingVertical: Normalize(13), paddingHorizontal: Normalize(10) }} >
                        {genderType.map((item, index) => (
                          <Pressable
                            onPress={() => {
                              setGender({
                                value: item.value,
                                title: item.title,
                              });
                              onpressSelectGender();
                            }}
                            key={index}
                            style={{
                              backgroundColor: Colors.white,
                              width: width - Normalize(50),
                              paddingHorizontal: height * 0.1,
                              // height: height * 0.05,
                              alignItems: "center",
                              paddingVertical: height * 0.01
                            }}>
                            <Text
                              style={[
                                globalstyles.dropdownText,
                                {
                                  color: '#4D4E50',
                                },
                              ]}>
                              {item.title}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    </View>
                  </Pressable>
                </Modal>
              )}
            </View>



            {/* Nationality */}
            <View style={{ marginTop: Normalize(18) }}>
              <Text style={globalStyle_esyPay.inputHeader}>
                Nationality
              </Text>
              <Pressable
                onPress={() => navigation.navigate("CountrySelect", { residenceORnationality: "nationality" })}
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
                  <Text numberOfLines={1}
                    style={{
                      paddingVertical: Normalize(5),
                      fontSize: Normalize(11.5),
                      color: Colors.textinput_placeholder,
                      fontFamily: fontfmliy.bold,
                    }}>
                    {nationality_value
                      ? nationality_value
                      : strings.BASICINFO.PLACEHOLDER}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo
                    name={'chevron-small-right'}
                    color={Colors.grey}
                    size={Normalize(22)}
                  />
                </View>
              </Pressable>
            </View>
            {/* Date of birth*/}
            <View style={{ marginTop: Normalize(18) }}>
              <Text style={globalStyle_esyPay.inputHeader}>
                {strings.BASICINFO.DOB}
              </Text>

              <View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: Normalize(1),
                  borderBottomColor: Colors.textinput_bottomBorder,
                }}>
                  <View style={{
                    borderBottomColor: Colors.textinput_bottomBorder,
                    borderBottomWidth: Normalize(1),
                    paddingVertical: Normalize(7),
                    height: Normalize(44),
                    borderBottomWidth: 0,
                    width: '88%',
                  }}>
                    <DateTimePickerModal
                      style={{
                        height: '100%',
                        width: '100%',
                        justifyContent: 'center',
                      }}
                      mode="date"
                      placeholder={
                        fullDate
                          ? fullDate
                          : strings.BASICINFO.PLACEHOLDER
                      }
                      // hideText
                      customStyles={{
                        dateInput: {
                          borderWidth: 0,
                        },
                        placeholderText: [
                          globalstyles.textinput_view_onlyText,
                          {
                            height: '100%',
                            width: '100%',
                            textAlignVertical: 'center',
                            paddingHorizontal: Normalize(0),
                            fontSize: Normalize(12)
                          },
                        ],
                      }}
                      showIcon={false}
                      format="DD MMM, YYYY"
                      confirmBtnText="Confirm"
                      // minDate="1947-08-15"
                      minDate="Aug 15, 1947"
                      maxDate={new Date()}
                      cancelBtnText="Cancel"
                      onDateChange={date => {
                        dateChange3(date);
                      }}
                    />
                  </View>

                  <View
                    style={{
                      height: Normalize(44),
                      marginRight: Normalize(5),
                      justifyContent: 'center', alignItems: "center"
                    }}>
                    <Entypo
                      name="calendar"
                      color={Colors.primary}
                      size={Normalize(16)}
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* address */}


            <View style={{ marginTop: Normalize(18) }}>
              <Text style={globalStyle_esyPay.inputHeader}>
                Address
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate('EditProfile_Address')}
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
                        editProfileaddress.lat != '' && editProfileaddress.lng != ''
                          ? Colors.greyText
                          : Colors.textinput_placeholder,
                      fontFamily: fontfmliy.bold,
                    }}>
                    {editProfileaddress.lat != '' && editProfileaddress.lng != ''
                      ? editProfileaddress.name
                      : 'Enter Address'}
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



            {/* phone */}
            <View style={{ marginTop: Normalize(18) }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={globalStyle_esyPay.inputHeader}>Phone Number</Text>

                {(isPhVerify && isPhVerify == 'Y') && <Text
                  style={[
                    globalStyle_esyPay.inputHeader,
                    {
                      color: Colors.green_new,
                      fontFamily: fontfmliy.bold,
                      fontSize: Normalize(11.5),
                    },
                  ]}>
                  Verified
                </Text>}

              </View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={onPressOpenModalPh}
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
                      color:
                        phone.length != 10
                          ? Colors.textinput_placeholder
                          : Colors.greyText,
                      fontFamily: fontfmliy.bold,
                    }}>
                    {prev_phoneCode != "" && "+"}{prev_phoneCode} {prev_phoneCode != "" && "-"} {prev_phone.trim().length == 0 ? 'Enter your phone number' : prev_phone}
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

              {takingPhoneNoModal && (
                <EditProfilePhoneModal
                  ispress={takingPhoneNoModal}
                  onpress={onPressOpenModalPh}
                  setPhone={setPhone}
                  phone={phone}
                  setPhone_Code={setPhone_Code}
                  phone_Code={phone_Code}
                  setIsGetOtp={setIsGetOtp}
                  isGetOtp={isGetOtp}
                  isPhoneVerify={isPhoneVerify}
                  setIsPhoneVerify={setIsPhoneVerify}
                  email={email}
                />






              )}
            </View>
            {/* Country */}
            <View style={{ marginTop: Normalize(18) }}>
              <Text style={globalStyle_esyPay.inputHeader}>
                Country of Residence
              </Text>
              <Pressable
                onPress={() => navigation.navigate("CountrySelect", { residenceORnationality: "residence" })}
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
                  <Text numberOfLines={1}
                    style={{
                      paddingVertical: Normalize(5),
                      fontSize: Normalize(11.5),
                      color: Colors.textinput_placeholder,
                      fontFamily: fontfmliy.bold,
                    }}>
                    {country_value
                      ? country_value
                      : strings.BASICINFO.PLACEHOLDER}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo
                    name={'chevron-small-right'}
                    color={Colors.grey}
                    size={Normalize(22)}
                  />
                </View>
              </Pressable>
            </View>

            {/* tax id */}
            <View style={{ marginTop: Normalize(18) }}>
              <Text style={globalStyle_esyPay.inputHeader}>Tax I.D</Text>
              <TextInput

                placeholder="Your Tax I.D will be include on your automatic invoices"
                placeholderTextColor={Colors.textinput_placeholder}
                style={[
                  globalStyle_esyPay.input_noIcon,
                  {
                    borderBottomColor: taxIDIsFocused
                      ? Colors.greyText
                      : Colors.textinput_bottomBorder,
                  },
                ]}
                multiline
                value={taxID}
                keyboardType="default"
                autoCapitalize="words"
                onChangeText={e => setTaxID(e)}
                onFocus={() => setTaxIDIsFocused(true)}
                onBlur={() => setTaxIDIsFocused(false)}
              />
            </View>
            <Text style={[globalStyle_esyPay.inputHeader, {
              marginTop: Normalize(30),
              marginBottom: Normalize(10),
              textAlign: "center",
              fontSize: Normalize(12),
              lineHeight: Normalize(15)
            }]}>Please make sure all information given is the same as on your Passport/National Identity Card/Driving Licence.</Text>
            {/* save button */}
            <Button
              style={{
                marginBottom: height * 0.07
              }}
              nextarrow
              // onPress={savecontinueButton}
              onPress={onpressSave_Continue_Button}
              name={"Next"}
            />
          </ScrollView>
          {
            loader &&
            <NewLoaderPage />
          }
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>

  );
}

export default withRtl(BasicInfo);
