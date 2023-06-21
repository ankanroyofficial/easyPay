import React, {useEffect, useRef, useState, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Pressable,
  Modal,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {withRtl, useRtlContext} from 'react-native-easy-localization-and-rtl';
import DateTimePickerModal from 'react-native-datepicker';
import axios from 'axios';
import {Colors} from '../../../../../constants/colors';
import images from '../../../../../constants/images';
import Normalize from '../../../../../helpers/Dimens';
import Header from '../../../../../components/Header';
import styles from './Styles';
import Button from '../../../../../components/Button';
import strings from '../../../../../constants/lng/LocalizedStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderPage from '../../../../../components/LoaderPage';
import moment from 'moment';
import {myContext} from '../../../../../constants/ContextApi';
import {axiosUrl} from '../../../../../constants/LinkPage';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {is_search} from '../../../../../constants/KeyWordSearch';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
function BasicInfo({navigation}) {
  const {language} = useRtlContext();
  const {
    setPh_email_verify,
    phone_number,
    setPhone_numbe,
    email_Address,
    setEmail_Address,
    activeTab,
    setActiveTab,
    choose_Categories,
    setChoose_Categories,
    all_country_code,
  } = useContext(myContext);
  const [loader, setLoader] = useState(false);
  const [fname, setFname] = useState(storageData ? storageData.fname : '');
  const [lname, setLname] = useState('');
  const [isGenderModal, setIsGenderModal] = useState(false);
  const [gender, setGender] = useState({
    value: '',
    title: '',
  });
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [prev_email, setPrev_email] = useState('');
  const [prev_phone, setPrev_Phone] = useState('');
  const [country_id, setCountry_id] = useState('');
  const [country_value, setCountry_value] = useState('');
  const [search_country_key, setSearch_country_key] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [dateofbirth, setDateofbirth] = useState();
  const [selectYear, setSelectYear] = useState('');

  const [alllanguage, setAlllanguage] = useState([]);
  const [allcountry, setAllcountry] = useState([]);
  const [openCountryModel, setOpenCountryModel] = useState(false);
  const [location, setLocation] = useState({
    name: '',
    lat: '',
    lng: '',
  });
  const [slugName, setSlugName] = useState();
  const [storageData, setStorageData] = useState();
  const [isPhVerify, setIsPhVerify] = useState('N');
  const [isEmailVerify, setIsEmailVerify] = useState('N');
  const ref = useRef();
  const [fullDate, setFullDate] = useState();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fnameIsFocused, setFnameIsFocused] = useState(false);
  const [lnameIsFocused, setLnameIsFocused] = useState(false);
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [phnumIsFocused, setPhnumIsFocused] = useState(false);
  const [stateIsFocused, setStateIsFocused] = useState(false);
  const [cityIsFocused, setCityIsFocused] = useState(false);
  const [is_category_modal, setIs_category_modal] = useState(false);
  const [phone_Code, setPhone_Code] = useState('');
  const [search_phone_Code, setSearch_Phone_Code] = useState('');
  const [autoLoad, setAutoLoad] = useState(false);

  let a = new Date().toJSON().slice(0, 10).split('-').reverse().join('/');
  var englishTommorow = new Date();
  englishTommorow.setDate(englishTommorow.getDate() + 1);
  const [getAround, setGetAround] = useState([
    {
      id: 0,
      title: strings.BASICINFO.BICYCLE,
      value: 'B',
      c: 'false',
    },
    {
      id: 1,
      title: strings.BASICINFO.CAR,
      value: 'C',
      c: 'false',
    },
    {
      id: 2,
      title: strings.BASICINFO.ONLINE,
      value: 'O',
      c: 'false',
    },
    {
      id: 3,
      title: strings.BASICINFO.SCOOTER,
      value: 'S',
      c: 'false',
    },
    {
      id: 4,
      title: strings.BASICINFO.TRUCK,
      value: 'T',
      c: 'false',
    },
    {
      id: 5,
      title: strings.BASICINFO.WALK,
      value: 'W',
      c: 'false',
    },
  ]);
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
  const getcountrylanguage = async () => {
    setLoader(true);
    const data = await axios.post(`${axiosUrl.URL}get-country-language`);
    // console.log("langFinalData",data.data)
    if (data.data.countrys && data.data.language) {
      var langFinalData = [];
      data.data.language.map(item => {
        langFinalData.push({
          ...{language: item.language},
          ...{isActive: false},
          ...{id: item.id},
        });
      });
      setAllcountry(data.data.countrys);
      // console.log("langFinalData", langFinalData)
      setLoader(false);
    } else {
      console.log('data is not coming');
      setLoader(false);
    }
  };
  const selectCountry = (id, name) => {
    setCountry_id(id);
    setCountry_value(name);
    onpressCountryModal();
  };
  const onpressCountryModal = () => {
    setOpenCountryModel(!openCountryModel);
  };
  const onpressSelectGender = () => {
    setIsGenderModal(!isGenderModal);
  };
  useEffect(() => {
    getcountrylanguage();
  }, []);

  const testt = (val, selectedCategory) => {
    const a = selectedCategory.some(
      item => item.categories_to_language.name === val,
    );
    return a;
  };
  const getTokon = async () => {
    try {
      setLoader(true);
      let slug = await AsyncStorage.getItem('slug');
      setSlugName(slug);
      setLoader(false);
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
      setLoader(true);
      // console.log("**********************************")
      const data = await axios.post(`${axiosUrl.URL}public-profile`, {
        jsonrpc: '2.0',
        params: {
          slug: `${slugName}`,
        },
      });
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
        setIsEmailVerify(data.data.result.user.is_email_verified);
        setEmail(data.data.result.user.email);
        setPhone(data.data.result.user.phone);
        setPrev_email(data.data.result.user.email);
        setPrev_Phone(data.data.result.user.phone);
        ref.current == null?.setAddressText(location.name);

        setLoader(false);
      }
      setLoader(false);
    } catch (error) {
      console.log('reload_after_comeBack', error);
    }
  };
  const isload_reload_after_comeBack = () => {
    if (autoLoad) {
      console.log('stop');
    } else {
      reload_after_comeBack();
    }
  };
  useEffect(async () => {
    isload_reload_after_comeBack();
    const willFocusSubscription = navigation.addListener('focus', () => {
      isload_reload_after_comeBack();
    });
    return willFocusSubscription;
  }, [slugName]);

  const getProfileData = async () => {
    // console.log("---------------------------")
    var data = {};
    try {
      setLoader(true);
      let profiledata = await AsyncStorage.getItem('@profiledata');
      if (profiledata) {
        setLoader(true);
        data = JSON.parse(profiledata);

        // console.log(data)

        setStorageData(data);
        setFname(data.fname);
        setLname(data.lname);
        setEmail(data.email);
        setPhone(data.phone);
        setPhoneNumber(data.phone);

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
        setPrev_Phone(data.phone);
        setPhone_Code(data.country_code);

        if (data.date_of_birth != null) {
          dateChange2(data.date_of_birth);
        }
        {
          data.country_id == null ? '' : setCountry_id(data.country_id);
        }
        {
          data.get_country_info != null &&
            setCountry_value(data.get_country_info.name);
        }
        // {
        //   data.state == null ? '' : setState(data.state);
        // }
        // {
        //   data.city == null ? '' : setCity(data.city);
        // }
        {
          data.location != null &&
            setLocation({name: data.location, lat: data.lat, lng: data.lng});
        }
        // if (data.get_around_by != null) {
        //   var newData = JSON.parse(data.get_around_by)
        //   for (let i = 0; i < newData.length; i++) {
        //     for (let j = 0; j < getAround.length; j++) {
        //       if (newData[i] == getAround[j].value) {
        //         let g = getAround;
        //         g[j].c = 'true';
        //         setGetAround(g);
        //       }
        //     }
        //   }
        // }
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
  const phoneVerify = async () => {
    try {
      setLoader(true);
      const res = await axiosInstance.post('get-phone-otp');
      if (res.data.result.error) {
        Toast.show(res.data.result.error.meaning);
        setLoader(false);
      } else {
        const otp = res.data.result.otp;
        Toast.show(res.data.result.success.meaning);
        setLoader(false);
        navigation.navigate('PhoneVerifyPage', {
          otp: otp,
          phoneNumber: prev_phone,
        });
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  const emailVerify = async () => {
    try {
      setLoader(true);

      const res = await axiosInstance.post('get-email-otp');

      if (res.data.result.error) {
        Toast.show(res.data.result.error.meaning);
        setLoader(false);
      } else {
        const otp = res.data.result.otp;
        Toast.show(res.data.result.success.meaning);
        setLoader(false);
        navigation.navigate('EmailVerifyPage', {otp: otp, email: prev_email});
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  const onpressSelect_CountryCode = () => {
    setIs_category_modal(!is_category_modal);
  };

  const onpressSave_Continue_Button1 = () => {
    navigation.navigate('BasicInfo_2');
  };
  const onpressSave_Continue_Button = () => {
    try {
      const EmailVerify = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      var countryidint = parseInt(country_id);
      var phoneint = parseInt(phone);
      const currentData = new Date();
      const currentYear = currentData.getFullYear();

      if (fname.length == 0) {
        Toast.show(strings.ERROR.ENTERFNAME);
      } else {
        if (lname.length == 0) {
          Toast.show(strings.ERROR.ENTERLNAME);
        } else {
          if (gender.length == 0) {
            Toast.show('Select Gender');
          } else {
            if (email.length == 0) {
              Toast.show(strings.ERROR.ENTEREMAIL);
            } else {
              if (!EmailVerify.test(email)) {
                Toast.show('Enter your valid email address');
              } else {
                if (phone.length == 0) {
                  Toast.show(strings.ERROR.ENTERPHONE);
                } else {
                  if (phone.length != 8) {
                    Toast.show(strings.ERROR.ENTERVALIDPHONE);
                  } else {
                    if (phone_Code == '') {
                      Toast.show('Enter Phone Code');
                    } else {
                      if (dateofbirth == undefined) {
                        Toast.show(strings.ERROR.ENTERDOB);
                      } else {
                        if (currentYear - selectYear < 18) {
                          Toast.show(strings.ERROR.AGEVALIDATION);
                        } else {
                          if (country_id.length == 0) {
                            Toast.show(strings.ERROR.SELECTCOUNTRY);
                          } else {
                            // console.log({
                            //   fname: fname,
                            //   lname: lname,
                            //   gender: gender,
                            //   email: email,
                            //   phone: phone,
                            //   DateofBirth: dateofbirth,
                            //   country_id: country_id,
                            //   country_name: country_value,
                            //   // state: state,
                            //   // city: city
                            // })

                            const finalFormData = new FormData();
                            finalFormData.append('fname', fname);
                            finalFormData.append('lname', lname);
                            finalFormData.append('gender', gender.value);
                            finalFormData.append('email', email);
                            finalFormData.append('phone', phoneint);
                            finalFormData.append('country_id', countryidint);
                            // finalFormData.append('state', '');
                            // finalFormData.append('city', '');
                            finalFormData.append('date_of_birth', dateofbirth);
                            finalFormData.append('phonecode', phone_Code);
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
    } catch (error) {
      console.log('onpressSave_Continue_Button', error);
    }
  };

  const finalapiCall = async val => {
    try {
      setLoader(true);
      const res = await axiosInstance.post('your-profile-details-step1', val);
      // console.log(res.data)
      if (res.data) {
        if (res.data.error == undefined) {
          await AsyncStorage.setItem('isMyProfile', 'true');
          setEmail_Address({isActive: false, activeTitle: email});
          setPhone_numbe({isActive: false, activeTitle: phone});
          if (prev_phone != phone || prev_email != email) {
            setPh_email_verify(false);
          } else {
            setPh_email_verify(true);
          }
          setLoader(false);
          Toast.show(res.data.result.status.meaning);
          navigation.navigate('BasicInfo_2');
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
                navigation.navigate('BasicInfo_2');
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
                  // console.log({ is_email_verified: isEmailVerified, is_phone_verified: isPhoneVerified, phone_otp: phoneOtp, email_otp: emailOtp })
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
      console.log('finalapiCall---', error);
    }
  };

  return (
    <>
      {loader ? (
        <LoaderPage />
      ) : (
        <SafeAreaView
          style={{
            backgroundColor: Colors.primary,
            flex: 1,
            flexDirection: 'column',
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styles.container}>
            <Header back name={'Be a fixer'} navigation={navigation} />
            <CurveDesing_Component  >
              <View
                style={[
                  globalstyles.container,
                  {marginVertical: Normalize(20)},
                ]}>
                <ScrollView
                  style={{}}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="always">
                  <Text
                    style={[
                      globalstyles.page_Header_Text,
                      {
                        fontSize: Normalize(18),
                        marginBottom: Normalize(15),
                        marginVertical: 0,
                      },
                    ]}>
                    Your Profile Details
                  </Text>
                  {/* name */}
                  <View style={{flexDirection: 'row'}}>
                    {/* first name */}
                    <View style={{flex: 1}}>
                      <Text style={globalstyles.textinput_Header_Style}>
                        {strings.BASICINFO.FIRSTNAME}
                      </Text>
                      <TextInput
                        value={fname}
                        placeholder={strings.BASICINFO.FIRSTNAME}
                        placeholderTextColor={Colors.textinput_inner_text}
                        style={[
                          globalstyles.textinputStyle,
                          {
                            borderColor: fnameIsFocused
                              ? Colors.primary
                              : Colors.disable_textinput_border,
                            backgroundColor: fnameIsFocused
                              ? Colors.white
                              : Colors.disable_textinput_background,
                          },
                        ]}
                        onChangeText={e => setFname(e)}
                        onFocus={() => setFnameIsFocused(true)}
                        onBlur={() => setFnameIsFocused(false)}
                      />
                    </View>
                    <View style={{width: Normalize(8)}} />
                    {/* last name */}
                    <View style={{flex: 1}}>
                      <Text style={globalstyles.textinput_Header_Style}>
                        {strings.BASICINFO.LASTNAME}
                      </Text>
                      <TextInput
                        value={lname}
                        placeholderTextColor={Colors.textinput_inner_text}
                        placeholder={strings.BASICINFO.LASTNAME}
                        style={[
                          globalstyles.textinputStyle,
                          {
                            borderColor: lnameIsFocused
                              ? Colors.primary
                              : Colors.disable_textinput_border,
                            backgroundColor: lnameIsFocused
                              ? Colors.white
                              : Colors.disable_textinput_background,
                          },
                        ]}
                        onChangeText={e => setLname(e)}
                        onFocus={() => setLnameIsFocused(true)}
                        onBlur={() => setLnameIsFocused(false)}
                      />
                    </View>
                  </View>

                  {/* gender */}
                  <Text style={globalstyles.textinput_Header_Style}>
                    Gender
                  </Text>

                  <Pressable
                    onPress={onpressSelectGender}
                    style={[
                      globalstyles.textinput_onlyBox_Style,
                      {
                        borderColor: openCountryModel
                          ? Colors.primary
                          : Colors.disable_textinput_border,
                        backgroundColor: openCountryModel
                          ? Colors.white
                          : Colors.disable_textinput_background,
                      },
                    ]}>
                    <View style={{flex: 1}}>
                      <Text style={globalstyles.textinput_onlyText_Style}>
                        {gender.title != '' ? gender.title : 'Select'}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '100%',
                        width: Normalize(15),
                        marginRight: Normalize(5),
                      }}>
                      <Image
                        source={images.downlinearrow}
                        style={{
                          height: '100%',
                          width: '100%',
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  </Pressable>

                  {isGenderModal && (
                    <Modal
                      animationType="fade"
                      visible={isGenderModal}
                      transparent={true}
                      onRequestClose={onpressSelectGender}>
                      <View
                        style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.2)'}}>
                        <TouchableOpacity
                          onPress={onpressSelectGender}
                          style={{flex: 3.5}}
                        />
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: Colors.white,
                            borderTopLeftRadius: Normalize(15),
                            borderTopRightRadius: Normalize(15),
                          }}>
                          <View
                            style={{
                              height: Normalize(30),
                              width: '100%',
                              flexDirection: 'row',
                            }}>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={[
                                  globalstyles.dropdownHeader,
                                  {paddingLeft: Normalize(50)},
                                ]}>
                                Select Gender
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={onpressSelectGender}
                              style={{
                                width: '10%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Entypo
                                name="cross"
                                color={Colors.red_old}
                                size={Normalize(25)}
                              />
                            </TouchableOpacity>
                          </View>
                          <View style={{flex: 1}}>
                            {genderType.map((item, index) => (
                              <TouchableOpacity
                                onPress={() => {
                                  setGender({
                                    value: item.value,
                                    title: item.title,
                                  });
                                  onpressSelectGender();
                                }}
                                key={index}
                                style={{
                                  backgroundColor:
                                    item.value == gender.value
                                      ? Colors.primary
                                      : Colors.white,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  paddingVertical: Normalize(5),
                                  height: '33%',
                                  flexDirection: 'row',
                                }}>
                                <Ionicons
                                  name={item.icon}
                                  color={
                                    item.value == gender.value
                                      ? Colors.white
                                      : '#4D4E50'
                                  }
                                  size={Normalize(13)}
                                />

                                <Text
                                  style={[
                                    globalstyles.dropdownText,
                                    {
                                      color:
                                        item.value == gender.value
                                          ? Colors.white
                                          : '#4D4E50',
                                      paddingLeft: Normalize(8),
                                    },
                                  ]}>
                                  {item.title}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>
                      </View>
                    </Modal>
                  )}
                  {/* Email */}
                  <View>
                    <View
                      style={{
                        flexDirection: language == 'en' ? 'row' : 'row-reverse',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={globalstyles.textinput_Header_Style}>
                        {strings.BASICINFO.EMAIL}
                      </Text>
                      {email == prev_email && (
                        <Pressable
                          onPress={emailVerify}
                          disabled={
                            isEmailVerify
                              ? isEmailVerify == 'Y'
                                ? true
                                : false
                              : false
                          }
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          {isEmailVerify && isEmailVerify == 'Y' && (
                            <View
                              style={{
                                height: Normalize(12),
                                width: Normalize(12),
                                marginRight: Normalize(2),
                              }}>
                              <Image
                                source={images.green_round_tick}
                                style={globalstyles.imageFit}
                              />
                            </View>
                          )}
                          <Text
                            style={[
                              globalstyles.plantext_roboto_regular,
                              {
                                color: isEmailVerify
                                  ? isEmailVerify == 'Y'
                                    ? Colors.green_new
                                    : Colors.secondary
                                  : Colors.secondary,
                              },
                            ]}>
                            {isEmailVerify
                              ? isEmailVerify == 'Y'
                                ? strings.BASICINFO.VERIFIED
                                : strings.BASICINFO.VERIFY
                              : strings.BASICINFO.VERIFY}
                          </Text>
                        </Pressable>
                      )}
                    </View>
                    <TextInput
                      value={email}
                      placeholder={strings.BASICINFO.PLACEHOLDER}
                      placeholderTextColor={Colors.textinput_inner_text}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      style={[
                        globalstyles.textinputStyle,
                        {
                          borderColor: emailIsFocused
                            ? Colors.primary
                            : Colors.disable_textinput_border,
                          backgroundColor: emailIsFocused
                            ? Colors.white
                            : Colors.disable_textinput_background,
                        },
                      ]}
                      onChangeText={e => setEmail(e)}
                      onFocus={() => setEmailIsFocused(true)}
                      onBlur={() => setEmailIsFocused(false)}
                    />
                  </View>
                  {/* Phone number */}
                  <View>
                    <View
                      style={{
                        flexDirection: language == 'en' ? 'row' : 'row-reverse',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={globalstyles.textinput_Header_Style}>
                        {strings.BASICINFO.PHONENUMBER}
                      </Text>
                      {phoneNumber
                        ? phone == prev_phone && (
                            <Pressable
                              onPress={phoneVerify}
                              disabled={
                                isPhVerify
                                  ? isPhVerify == 'Y'
                                    ? true
                                    : false
                                  : false
                              }
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              {isPhVerify && isPhVerify == 'Y' && (
                                <View
                                  style={{
                                    height: Normalize(12),
                                    width: Normalize(12),
                                    marginRight: Normalize(2),
                                  }}>
                                  <Image
                                    source={images.green_round_tick}
                                    style={globalstyles.imageFit}
                                  />
                                </View>
                              )}
                              <Text
                                style={[
                                  globalstyles.plantext_roboto_regular,
                                  {
                                    color: isPhVerify
                                      ? isPhVerify == 'Y'
                                        ? Colors.green_new
                                        : Colors.secondary
                                      : Colors.secondary,
                                  },
                                ]}>
                                {isPhVerify
                                  ? isPhVerify == 'Y'
                                    ? strings.BASICINFO.VERIFIED
                                    : strings.BASICINFO.VERIFY
                                  : strings.BASICINFO.VERIFY}
                              </Text>
                            </Pressable>
                          )
                        : null}
                    </View>

                    <View style={[globalstyles.textinput_onlyBox_Style, {}]}>
                      <TouchableOpacity
                        onPress={onpressSelect_CountryCode}
                        style={{
                          height: '100%',
                          paddingHorizontal: '0%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRightColor: Colors.disable_textinput_border,
                          borderRightWidth: Normalize(0.5),
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            fontSize: Normalize(12),
                            fontFamily: 'Outfit-Regular',
                            color: Colors.textinput_inner_text,
                            paddingLeft: Normalize(7),
                          }}>
                          + {phone_Code == '' ? '000' : phone_Code}
                        </Text>
                        <View style={{marginHorizontal: Normalize(7)}}>
                          <Entypo
                            name="chevron-down"
                            color={Colors.textinput_inner_text}
                            size={Normalize(14)}
                          />
                        </View>
                      </TouchableOpacity>
                      <TextInput
                        value={phone}
                        maxLength={8}
                        placeholder={strings.BASICINFO.PLACEHOLDER}
                        placeholderTextColor={Colors.textinput_inner_text}
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                        style={{
                          fontSize: Normalize(12),
                          fontFamily: 'Outfit-Regular',
                          color: Colors.textinput_inner_text,
                          flex: 1,
                          paddingHorizontal: Normalize(12),
                          borderColor: phnumIsFocused
                            ? Colors.primary
                            : Colors.disable_textinput_border,
                          backgroundColor: phnumIsFocused
                            ? Colors.white
                            : Colors.disable_textinput_background,
                        }}
                        onChangeText={e => setPhone(e)}
                        onFocus={() => setPhnumIsFocused(true)}
                        onBlur={() => setPhnumIsFocused(false)}
                      />
                    </View>

                    {is_category_modal && (
                      <Modal
                        animationType="fade"
                        visible={is_category_modal}
                        transparent={true}
                        onRequestClose={onpressSelect_CountryCode}>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: 'rgba(52,52,52,0.5)',
                          }}>
                          <View
                            style={{
                              flex: 1,
                              backgroundColor: Colors.white,
                              marginVertical: Normalize(46),
                              marginHorizontal: Normalize(30),
                              borderRadius: Normalize(5),
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                width: '100%',
                                height: Normalize(40),
                                borderBottomColor: Colors.grayf5,
                                borderBottomWidth: 1,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={[
                                    globalstyles.plantext_Outfit_Medium,
                                    {
                                      fontSize: Normalize(14),
                                      color: Colors.primary,
                                    },
                                  ]}>
                                  Choose Phone Code
                                </Text>
                              </View>
                              <TouchableOpacity
                                onPress={onpressSelect_CountryCode}
                                style={{
                                  width: '10%',
                                  height: '100%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Entypo
                                  name="cross"
                                  color={Colors.red_old}
                                  size={Normalize(25)}
                                />
                              </TouchableOpacity>
                            </View>
                            <View
                              style={{flex: 1, paddingVertical: Normalize(10)}}>
                              <View
                                style={[
                                  globalstyles.textinput_onlyBox_Style,
                                  {width: '90%', height: Normalize(35)},
                                ]}>
                                <TextInput
                                  value={search_phone_Code}
                                  onChangeText={e => {
                                    setSearch_Phone_Code(e);
                                  }}
                                  style={[
                                    globalstyles.textinput_onlyText_Style_No_textAlignVertical,
                                    {flex: 1, paddingHorizontal: Normalize(10)},
                                  ]}
                                  placeholder="Search Country Name"
                                  placeholderTextColor={
                                    Colors.textinput_inner_text
                                  }
                                />
                                <TouchableOpacity
                                  onPress={() => {
                                    setSearch_Phone_Code('');
                                    Keyboard.dismiss();
                                  }}
                                  style={{
                                    width: '10%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  {search_phone_Code == '' ? (
                                    <Feather
                                      name="search"
                                      color={Colors.textinput_inner_text}
                                      size={Normalize(16)}
                                    />
                                  ) : (
                                    <Entypo
                                      name="cross"
                                      color={Colors.red_old}
                                      size={Normalize(16)}
                                    />
                                  )}
                                </TouchableOpacity>
                              </View>
                              <ScrollView
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps="always">
                                {all_country_code.map(
                                  (item, index) =>
                                    is_search(search_phone_Code, item.name) && (
                                      <TouchableOpacity
                                        onPress={() => {
                                          setPhone_Code(item.phonecode);
                                          onpressSelect_CountryCode();
                                        }}
                                        key={index}
                                        style={{
                                          flexDirection: 'row',
                                          marginBottom: Normalize(8),
                                          backgroundColor:
                                            item.phonecode == phone_Code
                                              ? Colors.primary
                                              : Colors.white,
                                          alignItems: 'center',
                                          paddingVertical: Normalize(5),
                                        }}>
                                        <Text
                                          style={[
                                            globalstyles.plantext_outfit_semibold,
                                            {
                                              fontSize: Normalize(11.5),
                                              color:
                                                item.phonecode == phone_Code
                                                  ? Colors.white
                                                  : Colors.black,
                                              paddingRight: Normalize(5),
                                              paddingHorizontal: Normalize(20),
                                            },
                                          ]}>
                                          + {item.phonecode}
                                        </Text>
                                        <Text
                                          style={[
                                            globalstyles.plantext_Outfit_Medium,
                                            {
                                              fontSize: Normalize(11.5),
                                              color:
                                                item.phonecode == phone_Code
                                                  ? Colors.white
                                                  : Colors.black,
                                            },
                                          ]}>
                                          {item.name}
                                        </Text>
                                      </TouchableOpacity>
                                    ),
                                )}
                              </ScrollView>
                            </View>
                          </View>
                        </View>
                      </Modal>
                    )}
                  </View>

                  {/* Date of birth*/}
                  <View>
                    <Text style={globalstyles.textinput_Header_Style}>
                      {strings.BASICINFO.DOB}
                    </Text>

                    <View>
                      <View style={globalstyles.textinput_onlyBox_Style}>
                        <View style={{flex: 1}}>
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
                            height: '100%',
                            width: Normalize(16),
                            marginRight: Normalize(5),
                          }}>
                          <Image
                            source={images.dob_icon}
                            style={{
                              height: '100%',
                              width: '100%',
                              resizeMode: 'contain',
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <Text
                    style={[
                      globalstyles.page_Header_Text,
                      {fontSize: Normalize(17), marginTop: Normalize(10)},
                    ]}>
                    {strings.BASICINFO.HEADING2}
                  </Text>
                  <Text
                    style={[
                      globalstyles.page_SubHeader_Text,
                      {
                        fontSize: Normalize(12),
                        marginTop: Normalize(0),
                        marginBottom: Normalize(10),
                        color: Colors.greylightText,
                      },
                    ]}>
                    Please make sure all the information is as per your national
                    registration.
                  </Text>

                  {/* Country */}
                  <View>
                    <Text style={globalstyles.textinput_Header_Style}>
                      {strings.BASICINFO.COUNTRY}
                    </Text>
                    <Pressable
                      onPress={() => setOpenCountryModel(!openCountryModel)}
                      style={[
                        globalstyles.textinput_onlyBox_Style,
                        {
                          borderColor: openCountryModel
                            ? Colors.primary
                            : Colors.disable_textinput_border,
                          backgroundColor: openCountryModel
                            ? Colors.white
                            : Colors.disable_textinput_background,
                        },
                      ]}>
                      <View style={{flex: 1}}>
                        <Text style={globalstyles.textinput_onlyText_Style}>
                          {country_value
                            ? country_value
                            : strings.BASICINFO.PLACEHOLDER}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: '100%',
                          width: Normalize(15),
                          marginRight: Normalize(5),
                        }}>
                        <Image
                          source={images.downlinearrow}
                          style={{
                            height: '100%',
                            width: '100%',
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                    </Pressable>
                    {openCountryModel && (
                      <Modal
                        animationType="fade"
                        transparent={true}
                        visible={openCountryModel}
                        onRequestClose={onpressCountryModal}>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: 'rgba(52,52,52,0.5)',
                          }}>
                          <View
                            style={{
                              flex: 1,
                              backgroundColor: Colors.white,
                              marginVertical: Normalize(46),
                              marginHorizontal: Normalize(30),
                              borderRadius: Normalize(5),
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                width: '100%',
                                height: Normalize(40),
                                borderBottomColor: Colors.grayf5,
                                borderBottomWidth: 1,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={[
                                    globalstyles.plantext_Outfit_Medium,
                                    {
                                      fontSize: Normalize(14),
                                      color: Colors.primary,
                                    },
                                  ]}>
                                  Nationality
                                </Text>
                              </View>

                              <TouchableOpacity
                                onPress={onpressCountryModal}
                                style={{
                                  width: '10%',
                                  height: '100%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Entypo
                                  name="cross"
                                  color={Colors.red_old}
                                  size={Normalize(25)}
                                />
                              </TouchableOpacity>
                            </View>
                            <View
                              style={{flex: 1, paddingVertical: Normalize(10)}}>
                              <View
                                style={[
                                  globalstyles.textinput_onlyBox_Style,
                                  {width: '90%', height: Normalize(35)},
                                ]}>
                                <TextInput
                                  value={search_country_key}
                                  onChangeText={e => {
                                    setSearch_country_key(e);
                                  }}
                                  style={[
                                    globalstyles.textinput_onlyText_Style_No_textAlignVertical,
                                    {flex: 1, paddingHorizontal: Normalize(10)},
                                  ]}
                                  placeholder="Search Country Name"
                                  placeholderTextColor={
                                    Colors.textinput_inner_text
                                  }
                                />
                                <TouchableOpacity
                                  onPress={() => {
                                    setSearch_country_key('');
                                    Keyboard.dismiss();
                                  }}
                                  style={{
                                    width: '10%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  {search_country_key == '' ? (
                                    <Feather
                                      name="search"
                                      color={Colors.textinput_inner_text}
                                      size={Normalize(16)}
                                    />
                                  ) : (
                                    <Entypo
                                      name="cross"
                                      color={Colors.red_old}
                                      size={Normalize(16)}
                                    />
                                  )}
                                </TouchableOpacity>
                              </View>

                              <ScrollView
                                style={{}}
                                keyboardShouldPersistTaps="always"
                                showsVerticalScrollIndicator={false}>
                                {allcountry.map(
                                  (item, index) =>
                                    is_search(
                                      search_country_key,
                                      item.name,
                                    ) && (
                                      <TouchableOpacity
                                        key={index}
                                        onPress={() =>
                                          selectCountry(item.id, item.name)
                                        }
                                        style={{
                                          backgroundColor:
                                            item.id == country_id
                                              ? Colors.primary
                                              : Colors.white,
                                        }}>
                                        <Text
                                          style={[
                                            globalstyles.plantext_Outfit_Medium,
                                            {
                                              fontSize: Normalize(13),
                                              color:
                                                item.id == country_id
                                                  ? Colors.white
                                                  : Colors.blackText,
                                              textAlign: 'center',
                                              paddingVertical: Normalize(5),
                                            },
                                          ]}>
                                          {item.name}
                                        </Text>
                                      </TouchableOpacity>
                                    ),
                                )}
                              </ScrollView>
                            </View>
                          </View>
                        </View>
                      </Modal>
                    )}
                  </View>

                  {/* save button */}
                  <Button
                    style={{
                      marginTop: Normalize(15),
                      marginBottom: Normalize(10),
                    }}
                    nextarrow
                    // onPress={savecontinueButton}
                    onPress={onpressSave_Continue_Button}
                    name={strings.SKILLS.SAVE}
                  />
                </ScrollView>
              </View>
            </CurveDesing_Component>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )}
    </>
  );
}

export default withRtl(BasicInfo);
