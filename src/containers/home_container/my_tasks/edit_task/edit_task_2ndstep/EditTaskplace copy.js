import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Modal,
  SafeAreaView,
  Pressable
} from 'react-native';
import Toast from "react-native-simple-toast"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Header from '../../../../../components/Header';
import Button from '../../../../../components/Button';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import strings from './../../../../../constants/lng/LocalizedStrings';
import styles from './Style';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DateTimePickerModal from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from './../../../../../constants/colors';
import images from '../../../../../constants/images';
import { myContext } from '../../../../../constants/ContextApi';
import moment from 'moment';
import { leftOrRight, rowOrRowreverse } from '../../../../../constants/RowOrRowreverse';
import { engToPersian } from '../../../../../constants/EnglishToPersian';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import PostTask_header_button from '../../../../../components/PostTask_header_button';
import { Constant_apis } from '../../../../../constants/Constant_api';
const EditTaskplace = ({ navigation }) => {
  const {
    date_type, setDate_type,
    type, setType,
    location, setLocation,
    setLat,
    setLng,
    time, setTime,
    date, setDate,
    y2, setY2,
    m2, setM2,
    d2, setD2,
    engShowDate, setEngShowDate,
    perShowDate, setPerShowDate,
    viewTime, setViewTime,
    editOrpostsimilar
  } = useContext(myContext)
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [test, setTest] = useState(new Date())
  const [showTime, setShowTime] = useState(false)
  const [parsiandatePicker, setParsiandatePicker] = useState(false);
  const [month, setMonth] = useState()
  const [tempDate, setTempDate] = useState("")

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  var date2 = new Date();
  var today = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate();

  let a = new Date().toJSON().slice(0, 10).split('-').reverse().join('/');
  let todayPersian = moment(a, 'DD/MM/YYYY').locale('fa').format('YYYY-MM-DD');
  const tomorrow = moment().add(1, 'days');
  const persianTommorow = tomorrow.locale('fa').format('YYYY-MM-DD')
  // console.log(todayPersian)
  var englishToday = new Date();
  var englishTommorow = new Date();
  englishTommorow.setDate(englishTommorow.getDate() + 1);

  var d = new Date();
  d.setMonth(d.getMonth() + 6);
  var dd = d.toJSON().slice(0, 10);
  var after6Month = moment(dd, "YYYY-MM-DD").format("DD MMM, YYYY")
  let after6Month_pr = moment(dd, 'YYYY-MM-DD').locale('fa').format('YYYY-MM-DD');

  const scrollRef = useRef();
  const scrollToEnd = () => scrollRef.current.scrollToEnd({ animated: false });

  const dateEnglish = (val) => {
    let m = moment(val, 'DD MMM, YYYY').format('DD-MM-YYYY');
    setDate(m)
    const parts = m.split('-');
    const mydate = new Date(parts[2], parts[1] - 1, parts[0]);
    const meeeee = new Date(parts[2], parts[1] - 1, parts[0]).getMonth() + 1
    setMonth(meeeee)
    const date = (mydate.toDateString())
    const tarik = date.split(" ")
    setY2(tarik[3])
    setM2(tarik[1])
    setD2(tarik[2])

    const date2 = tarik[1] + " " + tarik[2] + " " + "," + " " + tarik[3]
    setEngShowDate(val)
  }
  const addZero = (i) => {
    if (i < 10) {
      i = "0" + i
    } else {
      i = i
    }
    return i;
  }
  const removeZero = (i) => {
    if (i < 10) {
      if (i.length > 1) {
        i = i[1]
      } else {
        i = i
      }

    } else {
      i = i
    }
    return i;
  }

  const persianConvert = (num, dontTrim) => {
    var i = 0,

      dontTrim = dontTrim || false,

      num = dontTrim ? num.toString() : num.toString().trim(),
      len = num.length,

      res = '',
      pos,

      persianNumbers = typeof persianNumber == 'undefined' ?
        ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] :
        persianNumbers;

    for (; i < len; i++)
      if ((pos = persianNumbers[num.charAt(i)]))
        res += pos;
      else
        res += num.charAt(i);
    return res;
  }
  const dateParsian = (val) => {
    if (val.length == 0) {
      Toast.show("لطفا تاریخ را انتخاب کنید")
    } else {
      let getDate = moment.from(val, 'fa', 'YYYY-MM-DD').format('DD-MM-YYYY'); //output:  1989/01/24
      let test = moment(getDate, 'DD-MM-YYYY').locale('fa').format('DD-MM-YYYY');
      let testDateMonth = moment(getDate, 'DD-MM-YYYY').locale('fa').format('jMMMM');


      let datemonthyear = moment(getDate, 'DD-MM-YYYY').locale('fa').format('YYYY/MM/D');


      setDate(getDate)
      let testdateSplit = test.split("-")
      setM2(testDateMonth)
      setD2(persianConvert(testdateSplit[0]))
      setTempDate("")
      setPerShowDate(engToPersian(datemonthyear))
      setParsiandatePicker(!parsiandatePicker)
    }
  }
  const nextButton = () => {

    // console.log(date)

    if (type == "O") {
      // *********ONLINE*********
      if (date.length != 0) {
        navigation.navigate('EditTaskImage')
      } else {
        Toast.show(strings.POSTTASK.SELECTDATE)
      }
    } else {
      // *********************IN-PERSON*****************
      if (location.length != 0) {
        if (date.length != 0) {
          navigation.navigate('EditTaskImage')
        } else {
          Toast.show(strings.POSTTASK.SELECTDATE)
        }
      } else {
        Toast.show(strings.POSTTASK.SELECTLOCATION)
      }
    }
  }
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (Platform.OS == 'ios') {
      setTest(selectedDate)
    } else {
      setShow(false);
    }
    takeTime(currentDate)
  };
  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const showTimepicker = () => {
    showMode('time');
  };
  const am_pm_time = (val) => {
    var time = new Date(val);
    var newtime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    // console.log(typeof (newtime))
    if (Platform.OS == "ios") {
      var splittime = newtime.split(" ")
      var splittime2 = splittime[0].split(":")
      setShowTime(false)
      return addZero(splittime2[0]) + ":" + splittime2[1] + " " + splittime[1];
    } else {
      var splittime = newtime.split(" ")
      if (splittime.length == 5) {
        var splittime2 = splittime[3].split(":")
        setShowTime(false)
        return addZero(splittime2[0]) + ":" + splittime2[1] + " " + splittime[4];
      } else if (splittime.length == 3) {
        var splittime2 = splittime[1].split(":")
        setShowTime(false)
        return addZero(splittime2[0]) + ":" + splittime2[1] + " " + splittime[2];
      } else if (splittime.length == 4) {

        var splittime2 = splittime[3].split(":")
        setShowTime(false)
        return removeZero(greaterThan12(splittime2[0])) + ":" + splittime2[1] + " " + am_or_pm(splittime2[0]);
      } else {
        return "specific devices problem";
      }
    }
  }
  const greaterThan12 = (val) => {
    if (val >= 12) {
      return val - 12
    } else {
      return val
    }
  }
  const am_or_pm = (val) => {
    if (val >= 12) {
      return "pm"
    } else {
      return "am"
    }
  }

  const takeTime = (val) => {
    // console.log(val)
    if (val != "") {
      var todayDate = new Date()
      var todayDate_year = todayDate.getFullYear()
      var todayDate_month = todayDate.getMonth() + 1
      var todayDate_date = todayDate.getDate()

      if (y2 == todayDate_year && month == todayDate_month && d2 == todayDate_date) {
        const data = new Date(val)
        const SelectTime = new Date(data);
        const currentTime = new Date();
        let h = addZero(currentTime.getHours());
        let m = addZero(currentTime.getMinutes());
        let s = addZero(currentTime.getSeconds());
        let t = h + ":" + m + ":" + s;


        let h2 = addZero(SelectTime.getHours());
        let m2 = addZero(SelectTime.getMinutes());
        let s2 = addZero(SelectTime.getSeconds());
        let t2 = h2 + ":" + m2;
        if (h < h2) {
          setViewTime(am_pm_time(val))
          setTime(t2)
          setShowTime(false)
        } else if (h == h2) {
          if (m < m2) {
            setViewTime(am_pm_time(val))
            setTime(t2)
            setShowTime(false)
          } else {
            Toast.show(strings.POSTTASK.SELECTMUCHMORETIME)
          }
        } else {
          Toast.show(strings.POSTTASK.SELECTMUCHMORETIME)
        }
        setShowTime(false)
      } else {
        const data = new Date(val)
        function addZero(i) {
          if (i < 10) { i = "0" + i }
          return i;
        }
        const d = new Date(val);
        let h = addZero(d.getHours());
        let m = addZero(d.getMinutes());
        let s = addZero(d.getSeconds());
        let t = h + ":" + m;
        setViewTime(am_pm_time(val))
        setTime(t)
        setShowTime(false)
      }
      setShowTime(false)
    } else {
      setShowTime(false)
    }
  }

  const ThreeSmallBox = () => {
    return (
      <View style={{ flexDirection: 'row', height: Normalize(38), marginVertical: Normalize(10), justifyContent: "space-between" }}>
        {/* ***************On date******** */}
        <TouchableOpacity onPress={() => {
          setDate_type("O")
          setTempDate(todayPersian)
        }} style={[styles.dateSmallBox, { backgroundColor: date_type == "O" ? Colors.primary : Colors.white, borderWidth: date_type == "O" ? 0 : 0.7 }]} >

          {date_type == "O" && <View style={{ height: Normalize(13), width: Normalize(13), marginRight: Normalize(2) }}>
            <Image source={images.plan_white_tick} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
          </View>
          }
          <Text style={[globalstyles.plantext_outfit_regular, { color: date_type == "O" ? Colors.white : "#383737" }]}>
            {strings.POSTTASK.ONDATE}
          </Text>
        </TouchableOpacity>
        {/* *****************Before date************ */}
        <TouchableOpacity
          onPress={() => {
            setDate_type("B")
            setTempDate("")
          }}
          style={[styles.dateSmallBox, { backgroundColor: date_type == "B" ? Colors.primary : Colors.white, borderWidth: date_type == "B" ? 0 : 0.7 }]}  >

          {date_type == "B" && <View style={{ height: Normalize(13), width: Normalize(13), marginRight: Normalize(2) }}>
            <Image source={images.plan_white_tick} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
          </View>
          }

          <Text style={[globalstyles.plantext_outfit_regular, { color: date_type == "B" ? Colors.white : "#383737", fontSize: date_type == "B" ? Normalize(11.5) : Normalize(12) }]}>
            {
                date_type == "B" ? m2 ? `${strings.POSTTASK.BEFORE} ${d2} ${m2}` : strings.POSTTASK.BEFOREDATE : strings.POSTTASK.BEFOREDATE 
            }
          </Text>
        </TouchableOpacity>
        {/* ********************I'm flexible****************** */}
        <TouchableOpacity
          onPress={() => {
            setDate("")
            setTime("")
            setD2("")
            setM2("")
            setY2("")
            setDate_type("F")
            setShow(false)
          }}

          style={[styles.dateSmallBox, { justifyContent: "center", backgroundColor: date_type == "F" ? Colors.primary : Colors.white, borderWidth: date_type == "F" ? 0 : 0.7 }]} >
          {date_type == "F" && <View style={{ height: Normalize(13), width: Normalize(13), marginRight: Normalize(2) }}>
            <Image source={images.plan_white_tick} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
          </View>
          }
          <Text style={[globalstyles.plantext_outfit_regular, { color: date_type == "F" ? Colors.white : "#383737", fontSize: date_type == "F" ? Normalize(11) : Normalize(12) }]}>{strings.POSTTASK.IMFLEXIBLE}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

      <View style={styles.container}>
        <Header back name={editOrpostsimilar == "edit" ? strings.POSTTASK.EDITTASK : strings.POSTTASK.SIMILARTASK} navigation={navigation} />
        <CurveDesing_Component  >
          <View>
            <PostTask_header_button
              postdetailspage="green_border"
              postplacetime="red_background"
              postimage="gray_border"
              postbudget="gray_border"

            />
          </View>
          <View style={globalstyles.container_only_padding} >
            <Text style={globalstyles.textinput_Header_Style}>{strings.POSTTASK.WHEREDOYOUNEED}</Text>
            {/* ***************ONLINE & PRESON  BUTTON************* */}

            <View style={[styles.twoButton_totalview]} >
              <TouchableOpacity activeOpacity={0.8}
                onPress={() => {
                  // setTime("")
                  setType("O")
                }}
                style={[styles.twoButton_view, { borderWidth: type == "O" ? 0 : 0.8, backgroundColor: type == "O" ? Colors.primary : Colors.white }]} >
                {type == "O" && <View style={{ height: Normalize(15), width: Normalize(15), marginRight: Normalize(2) }}>
                  <Image source={images.plan_white_tick} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                </View>
                }
                <Text style={[styles.O_P_Buttontext, { color: type == "O" ? Colors.white : Colors.greyText }]}
                >{strings.POSTTASK.ONLINE}</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8}
                onPress={() => {
                  // setTime("")
                  setType("P")
                }}
                style={[styles.twoButton_view, { borderWidth: type == "P" ? 0 : 0.8, backgroundColor: type == "P" ? Colors.primary : Colors.white }]} >
                {type == "P" && <View style={{ height: Normalize(15), width: Normalize(15), marginRight: Normalize(2) }}>
                  <Image source={images.plan_white_tick} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                </View>
                }
                <Text style={[styles.O_P_Buttontext, { color: type == "P" ? Colors.white : Colors.greyText, }]}>{strings.POSTTASK.INPERSON}</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
            keyboardShouldPersistTaps='always'
              showsVerticalScrollIndicator={false}
               >
              {
                type == "O" ?
                  // ***************************ONLINE****************
                  <View style={{ flex: 1 }} >
                    {/* <ThreeSmallBox /> */}
                    {
                      date_type != "F" ?
                        <>
                          <Text style={globalstyles.textinput_Header_Style}>{strings.POSTTASK.WHENDONE}</Text>
                          <View style={{}}>

                            <View style={globalstyles.textinput_onlyBox_Style} >
                              <View style={{ flex: 1, }} >
                                <DateTimePickerModal
                                  style={styles.datePickerStyle}
                                  mode="date"
                                  hideText={false}
                                  showIcon={false}
                                  placeholder={strings.POSTTASK.SELECTDATE}
                                  date={engShowDate}
                                  customStyles={{
                                    dateInput: [globalstyles.textinput_onlyBox_Style, { justifyContent: "flex-start" }],
                                    dateText: {
                                      fontSize: Normalize(12),
                                      fontFamily: 'Outfit-Regular',
                                      color: Colors.textinput_inner_text,
                                      paddingLeft:Normalize(12)
                                    },
                                    placeholderText: {
                                      fontSize: Normalize(12),
                                      fontFamily: 'Outfit-Regular',
                                      color: Colors.textinput_inner_text,
                                      paddingLeft:Normalize(12)
                                  }

                                  }}
                                  format="DD MMM, YYYY"
                                  confirmBtnText="Confirm"
                                  minDate={
                                    date_type == "B" ?
                                      englishTommorow : englishToday
                                  }
                                  maxDate={after6Month}
                                  cancelBtnText="Cancel"
                                  onDateChange={(date) => {
                                    setTime("")
                                    dateEnglish(date)
                                  }}
                                />
                              </View>
                              <View style={{ height: "100%", width: Normalize(18), marginRight: Normalize(5) }}>
                                <Image source={images.dob_icon} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                              </View>
                            </View>

                          </View>
                          <Text style={globalstyles.textinput_Header_Style}>{strings.POSTTASK.TIME} {strings.POSTTASK.OPTIONAL}</Text>

                          <View
                            style={globalstyles.textinput_onlyBox_Style}>
                            <Pressable
                              onPress={showTimepicker}
                              style={{
                                flex: 1,
                                flexDirection: language == "en" ? 'row' : "row-reverse",
                              }} >
                              {show && (
                                <DateTimePicker
                                  testID="dateTimePicker"
                                  value={test}
                                  mode={mode}
                                  is24Hour={false}
                                  display={Platform.OS == "ios" ? "spinner" : 'default'}
                                  onChange={onChange}
                                  style={{
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    width: Normalize(260),
                                    height: Normalize(150),

                                  }}
                                />
                              )}

                              {Platform.OS == "ios" ?
                                (!show ?
                                  <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text style={{
                              fontSize: Normalize(12),
                              fontFamily: 'Outfit-Regular',
                              color: Colors.textinput_inner_text,
                              paddingHorizontal: Normalize(12), color: '#666'
                            }}>
                                      {time.length == 0 ? strings.POSTTASK.ENTERTIME : viewTime}
                                    </Text>
                                  </View>
                                  : null)
                                :
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                  <Text style={[globalstyles.textinput_onlyText_Style,
                                  { color: '#666' }]} >
                                    {time.length == 0 ? strings.POSTTASK.ENTERTIME : viewTime}
                                  </Text>
                                </View>
                              }

{
                                  Platform.OS == "ios" ?
                                    show ?
                                      <TouchableOpacity
                                        onPress={() => { setShow(false) }}
                                        style={{ height: "100%", width: Normalize(18), marginRight: Normalize(5), justifyContent: "center", alignItems: "center" }}>
                                        <Image source={images.cross} style={{ height: "80%", width: "80%", resizeMode: "contain" }} />
                                      </TouchableOpacity>
                                      :
                                      <View style={{ height: "100%", width: Normalize(18), marginRight: Normalize(5) }}>
                                        <Image source={images.clock_new} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                      </View>
                                    :
                                    <View style={{ height: "100%", width: Normalize(18), marginRight: Normalize(5) }}>
                                      <Image source={images.clock_new} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                    </View>
                                }
                            </Pressable>
                          </View>

                        </>
                        :
                        null
                    }
                  </View>
                  :
                  // *************************IN-PERSON*********************
                  <View style={{ flex: 1 }} >
                    {/* *************LOCATION***************** */}
                    <Text style={globalstyles.textinput_Header_Style}>{strings.POSTTASK.LOCATION}</Text>




                    <GooglePlacesAutocomplete
                      placeholder={location ? location : strings.POSTTASK.ENTERYOURLOCATION}
                      fetchDetails
                      renderRow={results => {
                        if (results.isPredefinedPlace) {
                          return (
                            <View style={{ width: "100%", flexDirection: "row" }}  >
                              <Image source={images.graymarker} style={{ height: Normalize(15), width: Normalize(15), resizeMode: "contain" }} />
                              <Text style={{fontSize:Normalize(11), width: "100%", paddingHorizontal: Normalize(3) }} >{results.description}</Text>
                            </View>
                          );
                        } else {
                          return (
                            <View style={{ width: "100%", flexDirection: "row" }}  >
                              <Image source={images.graymarker} style={{ height: Normalize(15), width: Normalize(15), resizeMode: "contain" }} />
                              <Text style={{fontSize:Normalize(11), width: "100%", paddingHorizontal: Normalize(3) }} >{results.description}</Text>
                            </View>
                          )
                        }
                      }}
                      styles={{
                        textInput: [globalstyles.textinputStyle, {}],
                        row: {
                          padding: 13,
                          flexDirection: language == "en" ? "row" : "row-reverse",
                        },
                      }}
                      textInputProps={{
                        placeholderTextColor: Colors.textinput_inner_text,
                        textAlign: language == "en" ? "left" : "right"
                      }}
                      onPress={(data, details = null) => {
                        const { lat, lng } = details.geometry.location
                        setLocation(data.description)
                        setLat(lat)
                        setLng(lng)
                      }}
                      enablePoweredByContainer={false}
                      query={{
                        key: Constant_apis.Google_Location_api,
                        components: Constant_apis.Location_components
                      }}
                    />

                    <View>
                      {/* <ThreeSmallBox /> */}
                      {
                        date_type != "F" ?
                          <>
                            <Text style={globalstyles.textinput_Header_Style}>{strings.POSTTASK.WHENDONE}</Text>
                            <View style={{}}>
                              <View style={globalstyles.textinput_onlyBox_Style} >
                                <View style={{ flex: 1, }} >
                                <DateTimePickerModal
                                  style={styles.datePickerStyle}
                                  mode="date"
                                  hideText={false}
                                  showIcon={false}
                                  placeholder={strings.POSTTASK.SELECTDATE}
                                  date={engShowDate}
                                  customStyles={{
                                    dateInput: [globalstyles.textinput_onlyBox_Style, { justifyContent: "flex-start" }],
                                    dateText: {
                                      fontSize: Normalize(12),
                                      fontFamily: 'Outfit-Regular',
                                      color: Colors.textinput_inner_text,
                                      paddingLeft:Normalize(12)
                                    },
                                    placeholderText: {
                                      fontSize: Normalize(12),
                                      fontFamily: 'Outfit-Regular',
                                      color: Colors.textinput_inner_text,
                                      paddingLeft:Normalize(12)
                                  }

                                  }}
                                  format="DD MMM, YYYY"
                                  confirmBtnText="Confirm"
                                  minDate={
                                    date_type == "B" ?
                                      englishTommorow : englishToday
                                  }
                                  maxDate={after6Month}
                                  cancelBtnText="Cancel"
                                  onDateChange={(date) => {
                                    setTime("")
                                    dateEnglish(date)
                                  }}
                                />
                                </View>
                                <View style={{ height: "100%", width: Normalize(18), marginRight: Normalize(5) }}>
                                  <Image source={images.dob_icon} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                </View>
                              </View>
                            </View>
                            <Text style={globalstyles.textinput_Header_Style}>{strings.POSTTASK.TIME} {strings.POSTTASK.OPTIONAL}</Text>
                            <View
                              style={globalstyles.textinput_onlyBox_Style}>
                              <Pressable
                                onPress={showTimepicker}
                                style={{
                                  flex: 1,
                                  flexDirection: language == "en" ? 'row' : "row-reverse",
                                }} >
                                {show && (
                                  <DateTimePicker
                                    testID="dateTimePicker"
                                    value={test}
                                    mode={mode}
                                    is24Hour={false}
                                    display={Platform.OS == "ios" ? "spinner" : 'default'}
                                    onChange={onChange}
                                    style={{
                                      justifyContent: 'center',
                                      alignItems: 'flex-start',
                                      width: Normalize(260),
                                      height: Normalize(150),
  
                                    }}
                                  />
                                )}

                                {Platform.OS == "ios" ?
                                  (!show ?
                                    <View style={{ flex: 1, justifyContent: "center" }}>
                                     <Text style={{
                              fontSize: Normalize(12),
                              fontFamily: 'Outfit-Regular',
                              color: Colors.textinput_inner_text,
                              paddingHorizontal: Normalize(12), color: '#666'
                            }}>
                                        {time.length == 0 ? strings.POSTTASK.ENTERTIME : viewTime}
                                      </Text>
                                    </View>
                                    : null)
                                  :
                                  <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text style={[globalstyles.textinput_onlyText_Style,
                                    { color: '#666' }]} >
                                      {time.length == 0 ? strings.POSTTASK.ENTERTIME : viewTime}
                                    </Text>
                                  </View>
                                }

{
                                  Platform.OS == "ios" ?
                                    show ?
                                      <TouchableOpacity
                                        onPress={() => { setShow(false) }}
                                        style={{ height: "100%", width: Normalize(18), marginRight: Normalize(5), justifyContent: "center", alignItems: "center" }}>
                                        <Image source={images.cross} style={{ height: "80%", width: "80%", resizeMode: "contain" }} />
                                      </TouchableOpacity>
                                      :
                                      <View style={{ height: "100%", width: Normalize(18), marginRight: Normalize(5) }}>
                                        <Image source={images.clock_new} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                      </View>
                                    :
                                    <View style={{ height: "100%", width: Normalize(18), marginRight: Normalize(5) }}>
                                      <Image source={images.clock_new} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                    </View>
                                }
                              </Pressable>
                            </View>

                          </>
                          :
                          null
                      }
                    </View>

                  </View>
              }

              {Platform.OS == "ios" ?
                (!show ?
                  <Button
                    nextarrow
                    onPress={nextButton}
                    style={{ marginVertical: Normalize(25) }}
                    name={"Continue"}
                  />
                  : null)
                :
                <Button
                  nextarrow
                  onPress={nextButton}
                  style={{ marginVertical: Normalize(25) }}
                  name={"Continue"}
                />
              }
            </ScrollView>
          </View>
        </CurveDesing_Component>
      </View>
    </SafeAreaView>
  );
};

export default withRtl(EditTaskplace);



// navigation.navigate('EditTaskImage')