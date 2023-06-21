import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Toast from 'react-native-simple-toast';
import Normalize from './../../../../../helpers/Dimens';
import Button from './../../../../../components/Button';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import strings from '../../../../../constants/lng/LocalizedStrings';
import Header from '../../../../../components/Header';
import { Colors } from '../../../../../constants/colors';
import {
  leftOrRight,
  rowOrRowreverse,
} from '../../../../../constants/RowOrRowreverse';
import { myContext } from '../../../../../constants/ContextApi';
import styles from './Styles';
import images from '../../../../../constants/images';
import { addCommaAndTranslateInPersian } from '../../../../../constants/NumberWithCommaAndInPersian';
import { ImageLink } from '../../../../../constants/LinkPage';
import moment from 'moment';
import DateTimePickerModal from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AfterBooking from '../LMS_booking_request/AfterBooking';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import { Constant_apis } from '../../../../../constants/Constant_api';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fontfmliy } from '../../../../../components/WhichFontFamily';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
function ContinueToBook({ navigation, route }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const { token } = useContext(myContext);

  const { item, isLocation, name, title, image } = route.params;
  const [loader, setLoader] = useState(false);
  const [test, setTest] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const [month, setMonth] = useState();
  const [tempDate, setTempDate] = useState('');
  const [pvt_Message, setPvt_Message] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [engShowDate, setEngShowDate] = useState('');
  const [time, setTime] = useState('');
  const [y2, setY2] = useState('');
  const [m2, setM2] = useState('');
  const [d2, setD2] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [date_type, setDate_type] = useState('B');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [viewTime, setViewTime] = useState(false);
  const [afterBookingmodal, setAfterBookingmodal] = useState(false);
  const [aftbookingdetails, setAftbookingdetails] = useState({
    slug: '',
    name: '',
  });
  let a = new Date().toJSON().slice(0, 10).split('-').reverse().join('/');
  let todayPersian = moment(a, 'DD/MM/YYYY').locale('fa').format('YYYY-MM-DD');
  var englishToday = new Date();
  var englishTommorow = new Date();
  englishTommorow.setDate(englishTommorow.getDate() + 1);
  var d = new Date();
  d.setMonth(d.getMonth() + 6);
  var dd = d.toJSON().slice(0, 10);
  var after6Month = moment(dd, 'YYYY-MM-DD').format('DD MMM,YYYY');
  const onPressAfterbooking = () => {
    setAfterBookingmodal(!afterBookingmodal);
  };
  const onPressViewBooking = () => {
    navigation.goBack();
    setAfterBookingmodal(false);
  };
  const dateEnglish = val => {
    let m = moment(val, 'DD MMM,YYYY').format('DD-MM-YYYY');
    setDate(m);
    const parts = m.split('-');
    const mydate = new Date(parts[2], parts[1] - 1, parts[0]);
    const meeeee = new Date(parts[2], parts[1] - 1, parts[0]).getMonth() + 1;
    setMonth(meeeee);
    const date = mydate.toDateString();
    const tarik = date.split(' ');
    setY2(tarik[3]);
    setM2(tarik[1]);
    setD2(tarik[2]);
    setEngShowDate(val);
  };
  const addZero = i => {
    if (i < 10) {
      i = '0' + i;
    } else {
      i = i;
    }

    return i;
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (Platform.OS == 'ios') {
      setTest(selectedDate);
    } else {
      setShow(false);
    }
    takeTime(currentDate);
  };
  const showMode = currentMode => {
    setShow(!show);
    setMode(currentMode);
  };
  const showTimepicker = () => {
    showMode('time');
  };
  const am_or_pm = val => {
    if (val >= 12) {
      return 'pm';
    } else {
      return 'am';
    }
  };
  const removeZero = i => {
    if (i < 10) {
      if (i.length > 1) {
        i = i[1];
      } else {
        i = i;
      }
    } else {
      i = i;
    }
    return i;
  };
  const greaterThan12 = val => {
    if (val >= 12) {
      return val - 12;
    } else {
      return val;
    }
  };
  const am_pm_time = val => {
    var time = new Date(val);
    var newtime = time.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    // console.log(typeof (newtime))
    if (Platform.OS == 'ios') {
      var splittime = newtime.split(' ');
      var splittime2 = splittime[0].split(':');
      setShowTime(false);
      return addZero(splittime2[0]) + ':' + splittime2[1] + ' ' + splittime[1];
    } else {
      var splittime = newtime.split(' ');
      if (splittime.length == 5) {
        var splittime2 = splittime[3].split(':');
        setShowTime(false);
        return (
          addZero(splittime2[0]) + ':' + splittime2[1] + ' ' + splittime[4]
        );
      } else if (splittime.length == 3) {
        var splittime2 = splittime[1].split(':');
        setShowTime(false);
        return (
          addZero(splittime2[0]) + ':' + splittime2[1] + ' ' + splittime[2]
        );
      } else if (splittime.length == 4) {
        var splittime2 = splittime[3].split(':');
        setShowTime(false);
        return (
          removeZero(greaterThan12(splittime2[0])) +
          ':' +
          splittime2[1] +
          ' ' +
          am_or_pm(splittime2[0])
        );
      } else {
        return 'specific devices problem';
      }
    }
  };
  const takeTime = val => {
    if (val != '') {
      var todayDate = new Date();
      var todayDate_year = todayDate.getFullYear();
      var todayDate_month = todayDate.getMonth() + 1;
      var todayDate_date = todayDate.getDate();

      if (
        y2 == todayDate_year &&
        month == todayDate_month &&
        d2 == todayDate_date
      ) {
        const data = new Date(val);
        const SelectTime = new Date(data);
        const currentTime = new Date();

        let h = addZero(currentTime.getHours());
        let m = addZero(currentTime.getMinutes());
        let s = addZero(currentTime.getSeconds());
        let t = h + ':' + m + ':' + s;

        let h2 = addZero(SelectTime.getHours());
        let m2 = addZero(SelectTime.getMinutes());
        let s2 = addZero(SelectTime.getSeconds());
        let t2 = h2 + ':' + m2;
        if (h < h2) {
          setViewTime(am_pm_time(val));
          setTime(t2);
          setShowTime(false);
        } else if (h == h2) {
          if (m < m2) {
            setViewTime(am_pm_time(val));
            setTime(t2);
            setShowTime(false);
          } else {
            Toast.show(strings.POSTTASK.SELECTMUCHMORETIME);
          }
        } else {
          Toast.show(strings.POSTTASK.SELECTMUCHMORETIME);
        }
        setShowTime(false);
      } else {
        const data = new Date(val);
        function addZero(i) {
          if (i < 10) {
            i = '0' + i;
          }
          return i;
        }
        const d = new Date(val);
        let h = addZero(d.getHours());
        let m = addZero(d.getMinutes());
        let s = addZero(d.getSeconds());
        let t = h + ':' + m;
        setViewTime(am_pm_time(val));
        setTime(t);
        setShowTime(false);
      }
      setShowTime(false);
    } else {
      setShowTime(false);
    }
  };
  const onpresSendButton = () => {
    if (isLocation != 'null') {
      if (location.length != 0) {
        afterLocation();
      } else {
        Toast.show(strings.POSTTASK.SELECTLOCATION);
      }
    } else {
      afterLocation();
    }
  };
  const afterLocation = () => {
    var todayDate = new Date();
    var todayDate_year = todayDate.getFullYear();
    var todayDate_month = todayDate.getMonth() + 1;
    var todayDate_date = todayDate.getDate();
    var checkTodayDate =
      todayDate_date + '-' + todayDate_month + '-' + todayDate_year;


      if (date_type == 'B') {
        setDate('');
        setTime('')
        finalApiCall();
      } else if(date_type == 'O') {
        if (date.length != 0) {
          if(time.length!=""){
            finalApiCall();
          }else{
            Toast.show("Select Time");
          }
        } else {
          Toast.show(strings.POSTTASK.SELECTDATE);
        }
      }
  };




  const finalApiCall = async () => {
    try {
      setLoader(true);
      const formdata = new FormData();
      formdata.append('slug', item.slug);
      formdata.append('private_message', pvt_Message);
      formdata.append('time',date_type == 'O' ? time:'');
      formdata.append('date',date_type == 'O' ? date : '');
      formdata.append('due_date', '');
      formdata.append('location', location);
      formdata.append('lat', lat);
      formdata.append('lng', lng);
      formdata.append('date_type', date_type);

      const data = formdata;
      const res = await axiosInstance.post('request-booking', data);
      // console.log(res.data)
      if (res.data.error) {
        setLoader(false);
        Toast.show(res.data.error.meaning);
        // onPressAfterbooking()
      } else {
        Toast.show(res.data.success.meaning);
        setAftbookingdetails({ name: res.data.name, slug: res.data.slug });
        setLoader(false);
        onPressAfterbooking();
      }
    } catch (error) {
      setLoader(false);
      console.log('finalApiCall', error);
    }
  };
  const TwoBoxs = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: Normalize(75),
          marginVertical: Normalize(10),
          justifyContent: 'space-between',
        }}>
        {/* *****************Before date************ */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setShow(false);
            setDate("")
            setTime("")
            setEngShowDate("")
            setDate_type('B');
          }}
          style={[
            styles.dateSmallBox,
            {
              backgroundColor: date_type == 'B' ? Colors.primary : Colors.grayf5,
              flexDirection: 'column',
            },
          ]}>
          <View style={{ flexDirection: 'row' }}>

            <View style={{}} >
              <MaterialCommunityIcons
                name="clock-fast"
                size={Normalize(25)}
                color={date_type == 'B' ? Colors.secondary : Colors.grey}
              />
            </View>

          </View>
          <Text
            style={[
              globalstyles.plantext_outfit_regular,
              {
                color: date_type == 'B' ? Colors.white : Colors.grey,
                fontSize: Normalize(12),
              },
            ]}>
            as soon as possible
          </Text>
        </TouchableOpacity>
        {/* ***************On date******** */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setDate_type('O');
          }}
          style={[
            styles.dateSmallBox,
            {
              backgroundColor: date_type == 'O' ? Colors.primary : Colors.grayf5,
            },
          ]}>
          <MaterialCommunityIcons
            name="calendar-clock"
            size={Normalize(25)}
            color={date_type == 'O' ? Colors.secondary : Colors.grey}
          />
          <Text
            style={[
              globalstyles.plantext_outfit_regular,
              {
                color: date_type == 'O' ? Colors.white : Colors.grey,
                fontSize: Normalize(12)
              },
            ]}>
            Set date & time
          </Text>
        </TouchableOpacity>

        {/* ********************I'm flexible****************** */}
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.primary, flexDirection: 'column', flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container2}>
        <Header
          back
          navigation={navigation}
          name={strings.LMS.REQUESTBOOKING}
        />

        <CurveDesing_Component  >
          <View style={globalstyles.container_only_padding}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
              style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <View style={{ marginTop: Normalize(5) }}>
                  <View
                    style={{
                      flexDirection: rowOrRowreverse(language),
                      marginTop: Normalize(10),
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: Normalize(50),
                        width: Normalize(50),
                        backgroundColor: '#f5f5f5',
                        borderRadius: Normalize(50) / 2,
                        overflow: 'hidden',
                      }}>

                      {
                        image != null
                          ?
                          <Image
                            source={{ uri: ImageLink.ProfilePhoto + image }}
                            style={{
                              height: '100%',
                              width: '100%',
                              resizeMode: 'cover',
                            }}
                          />
                          :
                          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", borderWidth: Normalize(1), borderColor: Colors.secondaryBorder, backgroundColor: Colors.secondaryBackground, borderRadius: Normalize(50) / 2 }}>
                            <AntDesign
                              name={"user"}
                              color={Colors.secondary}
                              size={Normalize(25)} />
                          </View>
                      }



                    </View>
                    <View
                      style={{
                        width: '100%',
                        alignItems:
                          language === 'en' ? 'flex-start' : 'flex-end',
                        marginLeft: Normalize(5),
                      }}>
                      <Text
                        style={[
                          styles.h1B,
                          {
                            textAlign: leftOrRight(language),
                            color: Colors.primary,
                            fontSize: Normalize(12),
                          },
                        ]}>
                        {name}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.h1B,
                          {
                            textAlign: leftOrRight(language),
                            fontSize: Normalize(11),
                            width: '60%',
                            color: Colors.primary,
                          },
                        ]}>
                        {title}
                      </Text>
                      {language === 'en' ? (
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.h1B,
                            {
                              fontFamily: fontfmliy.regular,
                              textAlign: leftOrRight(language),
                              fontSize: Normalize(11),
                              width: '80%',
                              color: Colors.primary,
                            },
                          ]}>
                          {strings.LMS.PACKAGE2} {item.name} (
                          {addCommaAndTranslateInPersian(item.price, language)}{' '}
                          {strings.BROWSEFILTER.TOMAN}){' '}
                        </Text>
                      ) : (
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.h1B,
                            {
                              fontFamily: fontfmliy.regular,
                              textAlign: leftOrRight(language),
                              fontSize: Normalize(11),
                              width: '80%',
                              color: Colors.primary,
                            },
                          ]}>
                          {strings.LMS.PACKAGE2} (
                          {addCommaAndTranslateInPersian(item.price, language)}{' '}
                          {strings.BROWSEFILTER.TOMAN}) {item.name}{' '}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={{ height: Normalize(10) }} />
                  {/* *************LOCATION***************** */}
                  {isLocation != 'null' && (
                    <View>
                      <Text
                        style={[styles.h5, { textAlign: leftOrRight(language) }]}>
                        {strings.BROWSEFILTER.LOCATION}
                      </Text>
                      <Text
                        style={[
                          styles.smallTxt,
                          {
                            textAlign: leftOrRight(language),
                            marginVertical: Normalize(2),
                          },
                        ]}>
                        {strings.LMS.WHEREDOYOU}
                      </Text>
                      <GooglePlacesAutocomplete
                        placeholder={
                          location != ''
                            ? location
                            : strings.MAKEANOFFER.ENTERHERE
                        }
                        fetchDetails
                        // renderLeftButton={() => (
                        //   <View style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: Normalize(10) }} >
                        //     <Image source={images.aim} style={{ width: Normalize(16), height: Normalize(16), resizeMode: "contain", opacity: 0.8 }} />
                        //   </View>
                        // )}

                        styles={{
                          textInput: [globalstyles.textinputStyle, {}],
                          row: {
                            padding: 13,
                            flexDirection:
                              language == 'en' ? 'row' : 'row-reverse',
                          },
                        }}
                        renderRow={results => {
                          if (results.isPredefinedPlace) {
                            return (
                              <Text
                                style={{
                                  width: '100%',
                                  fontSize: Normalize(11),
                                  fontFamily: fontfmliy.regular,
                                  color: Colors.textinput_inner_text,
                                  padding: Normalize(2),
                                  textAlign:
                                    language == 'en' ? 'left' : 'right',
                                }}>
                                {results.description}
                              </Text>
                            );
                          } else {
                            return (
                              <Text
                                style={{
                                  width: '100%',
                                  fontSize: Normalize(11),
                                  fontFamily: fontfmliy.regular,
                                  color: Colors.textinput_inner_text,
                                  padding: Normalize(2),
                                  textAlign:
                                    language == 'en' ? 'left' : 'right',
                                }}>
                                {results.description}
                              </Text>
                            );
                          }
                        }}
                        textInputProps={{
                          placeholderTextColor: Colors.textinput_inner_text,
                          textAlign: language == 'en' ? 'left' : 'right',
                        }}
                        onPress={(data, details = null) => {
                          const { lat, lng } = details.geometry.location;
                          setLocation(data.description);
                          setLat(lat);
                          setLng(lng);
                        }}
                        enablePoweredByContainer={false}
                        query={{
                          key: Constant_apis.Google_Location_api,
                          language: 'en',
                          components: Constant_apis.Location_components,
                        }}
                      />
                    </View>
                  )}

                  {/* two botton */}
                  <TwoBoxs />
                  {/* Location date time message */}
                  <View style={{ flex: 1 }}>
                    {(date_type == 'O') && (
                      <>
                        <Text style={[styles.h5, { textAlign: leftOrRight(language) }]}>
                          {strings.BROWSEFILTER.DATE}
                        </Text>
                        <Text
                          style={[
                            styles.smallTxt,
                            {
                              textAlign: leftOrRight(language),
                              marginTop: Normalize(1),
                            },
                          ]}>
                          {strings.LMS.WHENDOYOU}
                        </Text>
                        <View
                          style={{
                            flexDirection:
                              language == 'en' ? 'row' : 'row-reverse',
                            borderWidth: 0.6,
                            borderColor: Colors.disable_textinput_border,
                            borderRadius: 5,
                            height: Normalize(42),
                            marginVertical: Normalize(10),
                            backgroundColor:
                              Colors.disable_textinput_background,
                            overflow: 'hidden',
                          }}>
                          <View
                            style={{
                              flexDirection:
                                language == 'en' ? 'row' : 'row-reverse',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                height: Normalize(13),
                                width: Normalize(13),
                                marginHorizontal: Normalize(10),
                              }}>
                              <Image
                                source={images.calander}
                                style={{
                                  height: '100%',
                                  width: '100%',
                                  resizeMode: 'contain',
                                }}
                              />
                            </View>
                          </View>

                          <View
                            style={{
                              width: '90%',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <DateTimePickerModal
                              style={styles.datePickerStyle}
                              mode="date"
                              // hideText
                              showIcon={false}
                              placeholder={
                                date.length == 0
                                  ? strings.POSTTASK.SELECTDATE
                                  : engShowDate
                              }
                              customStyles={{
                                dateInput: {
                                  borderWidth: 0,
                                  paddingHorizontal: '3%',
                                  alignItems:
                                    language == 'en'
                                      ? 'flex-start'
                                      : 'flex-end',
                                },
                                placeholderText: {
                                  fontSize: Normalize(13),
                                  color: Colors.grey,
                                  fontFamily: fontfmliy.regular,
                                },
                              }}
                              format="DD MMM,YYYY"
                              confirmBtnText="Confirm"
                              minDate={
                                date_type == 'B'
                                  ? englishTommorow
                                  : englishToday
                              }
                              maxDate={after6Month}
                              cancelBtnText="Cancel"
                              onDateChange={date => {
                                setTime('');
                                dateEnglish(date);
                              }}
                            />
                          </View>
                        </View>
                        {/* optional time */}

                        <Text style={[styles.h5, { textAlign: leftOrRight(language) }]}>
                        Time
                        </Text>
                        <Text
                          style={[
                            styles.smallTxt,
                            {
                              textAlign: leftOrRight(language),
                              marginTop: Normalize(1),
                            },
                          ]}>
                          {strings.LMS.WHATTIMESDO}
                        </Text>
                        <View style={globalstyles.textinput_onlyBox_Style}>
                          {Platform.OS == 'ios' ? (
                            show ? null : (
                              <View
                                style={{
                                  height: '100%',
                                  width: Normalize(18),
                                  marginLeft: Normalize(5),
                                }}>
                                <Image
                                  source={images.clock_new}
                                  style={{
                                    height: '100%',
                                    width: '100%',
                                    resizeMode: 'contain',
                                  }}
                                />
                              </View>
                            )
                          ) : (
                            <View
                              style={{
                                height: '100%',
                                width: Normalize(18),
                                marginLeft: Normalize(5),
                              }}>
                              <Image
                                source={images.clock_new}
                                style={{
                                  height: '100%',
                                  width: '100%',
                                  resizeMode: 'contain',
                                }}
                              />
                            </View>
                          )}

                          <Pressable
                            onPress={showTimepicker}
                            style={{
                              flex: 1,
                              flexDirection: language == 'en' ? 'row' : 'row-reverse',
                            }}>
                            {show && (
                              <DateTimePicker
                                testID="dateTimePicker"
                                value={test}
                                mode={mode}
                                is24Hour={false}
                                display={Platform.OS == 'ios' ? 'spinner' : 'clock'}
                                onChange={onChange}
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'flex-start',
                                  width: Normalize(260),
                                  height: Normalize(150),
                                }}
                              />
                            )}
                            {Platform.OS == 'ios' ? (
                              !show ? (
                                <View style={{ justifyContent: 'center' }}>
                                  <Text
                                    style={{
                                      fontSize: Normalize(12),
                                      fontFamily: fontfmliy.regular,
                                      color: Colors.textinput_inner_text,
                                      paddingHorizontal: Normalize(12),
                                      color: '#666',
                                    }}>
                                    {time.length == 0
                                      ? strings.POSTTASK.ENTERTIME
                                      : viewTime}
                                  </Text>
                                </View>
                              ) : null
                            ) : (
                              <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text
                                  style={[
                                    globalstyles.textinput_onlyText_Style,
                                    { color: '#666' },
                                  ]}>
                                  {time.length == 0
                                    ? strings.POSTTASK.ENTERTIME
                                    : viewTime}
                                </Text>
                              </View>
                            )}
                            {Platform.OS == 'ios' ? (
                              show ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    setShow(false);
                                  }}
                                  style={{
                                    height: '100%',
                                    width: Normalize(18),
                                    marginLeft: Normalize(5),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Image
                                    source={images.cross}
                                    style={{
                                      height: '80%',
                                      width: '80%',
                                      resizeMode: 'contain',
                                    }}
                                  />
                                </TouchableOpacity>
                              ) : null
                            ) : null}
                          </Pressable>
                        </View>
                      </>
                    )}
                  </View>
                  {Platform.OS == 'ios' && show ? null : (
                    <View>
                      {/* message */}
                      <Text
                        style={[styles.h5, { textAlign: leftOrRight(language) }]}>
                        {strings.LMS.PRIVATEMSG}
                      </Text>
                      <Text
                        style={[
                          styles.smallTxt,
                          {
                            textAlign: leftOrRight(language),
                            marginTop: Normalize(1),
                          },
                        ]}>
                        {strings.LMS.INTRODUCEYOURSELF}
                      </Text>
                      <TextInput
                        style={[globalstyles.multiline_textinputStyle, { marginBottom: Normalize(35) }]}
                        placeholder={strings.LMS.ENTERYOURMESSAGE}
                        placeholderTextColor={Colors.textinput_inner_text}
                        multiline
                        value={pvt_Message}
                        color={Colors.greyText}
                        onChangeText={e => setPvt_Message(e)}
                        onSubmitEditing={() => {
                          Keyboard.dismiss();
                        }}
                      />
                    </View>
                  )}

                  {afterBookingmodal && (
                    <AfterBooking
                      onPress={onPressAfterbooking}
                      onPressViewBooking={onPressViewBooking}
                      ispress={afterBookingmodal}
                      slugName={aftbookingdetails.slug}
                      name={aftbookingdetails.name}
                    />
                  )}
                </View>
              </View>
            </ScrollView>
            <Button
              disabled={loader}
              onPress={onpresSendButton}
              style={{
                marginBottom: Normalize(10),
              }}
              name={strings.LMS.SENDBOOKING} />
          </View>
        </CurveDesing_Component>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default withRtl(ContinueToBook);
