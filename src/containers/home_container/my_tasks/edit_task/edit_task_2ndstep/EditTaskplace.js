import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Pressable,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Header from '../../../../../components/Header';
import Button from '../../../../../components/Button';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import strings from './../../../../../constants/lng/LocalizedStrings';
import styles from './Style';
import DateTimePickerModal from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from './../../../../../constants/colors';
import { myContext } from '../../../../../constants/ContextApi';
import moment from 'moment';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import PostTask_header_button from '../../../../../components/PostTask_header_button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { fontfmliy } from '../../../../../components/WhichFontFamily';
const EditTaskplace = ({ navigation }) => {
  const {
    date_type,
    setDate_type,
    time,
    setTime,
    date,
    setDate,
    y2,
    setY2,
    m2,
    setM2,
    d2,
    setD2,
    engShowDate,
    setEngShowDate,
    viewTime,
    setViewTime,
    editOrpostsimilar,
  } = useContext(myContext);
  const [test, setTest] = useState(new Date());
  const [month, setMonth] = useState();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  var englishToday = new Date();
  var englishTommorow = new Date();
  englishTommorow.setDate(englishTommorow.getDate() + 1);

  var d = new Date();
  d.setMonth(d.getMonth() + 6);
  var dd = d.toJSON().slice(0, 10);
  var after6Month = moment(dd, 'YYYY-MM-DD').format('DD MMM, YYYY');
  const dateEnglish = val => {
    let m = moment(val, 'DD MMM, YYYY').format('DD-MM-YYYY');
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
    setTime("")
    // console.log(val)
  };
  const addZero = i => {
    if (i < 10) {
      i = '0' + i;
    } else {
      i = i;
    }
    return i;
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
  // console.log(date_type)
  const nextButton = () => {
    if (date_type != '') {
      if (date_type == 'B') {
        // setDate("")
        navigation.navigate('EditTaskBudget');
      } else {
        if (date.length != 0 && time.length != 0) {
          // console.log(time)
          navigation.navigate('EditTaskBudget');
        } else {
          Toast.show("Enter both Date and Time");
        }
      }
    } else {
      Toast.show(strings.POSTTASK.CHOOSEANYDATETYPE);
    }
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
      return addZero(splittime2[0]) + ':' + splittime2[1] + ' ' + splittime[1];
    } else {
      var splittime = newtime.split(' ');
      if (splittime.length == 5) {
        var splittime2 = splittime[3].split(':');
        return (
          addZero(splittime2[0]) + ':' + splittime2[1] + ' ' + splittime[4]
        );
      } else if (splittime.length == 3) {
        var splittime2 = splittime[1].split(':');
        return (
          addZero(splittime2[0]) + ':' + splittime2[1] + ' ' + splittime[2]
        );
      } else if (splittime.length == 4) {
        var splittime2 = splittime[3].split(':');
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
  const greaterThan12 = val => {
    if (val >= 12) {
      return val - 12;
    } else {
      return val;
    }
  };
  const am_or_pm = val => {
    if (val >= 12) {
      return 'pm';
    } else {
      return 'am';
    }
  };

  const takeTime = val => {
    // console.log(val)
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
        } else if (h == h2) {
          if (m < m2) {
            setViewTime(am_pm_time(val));
            setTime(t2);
          } else {
            Toast.show(strings.POSTTASK.SELECTMUCHMORETIME);
          }
        } else {
          Toast.show(strings.POSTTASK.SELECTMUCHMORETIME);
        }
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
      }
    } else {
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
  const lastText = "If you didn't book a EazyPay by this date and time,\nyour task ad will expire and you will lose your offer.\n\nYou can always give yourself more time by editing the date/time of your task ad before it expires"

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
      <View style={styles.container}>
        <Header
          back
          name={
            editOrpostsimilar == 'edit'
              ? strings.POSTTASK.EDITTASK
              :
              editOrpostsimilar == 'repostTask' ?
                "Repost a Task" :
                strings.POSTTASK.SIMILARTASK
          }
          navigation={navigation}
        />
        <View>
          <PostTask_header_button active="postplacetime" />
        </View>
        <View style={globalstyles.container_only_padding}>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <View>
              <Text
                style={[
                  globalstyles.plantext_Outfit_Medium,
                  { textAlign: "left", color: Colors.grey },
                ]}>
                When do you need it done?
              </Text>
              <View style={{ flex: 1 }}>
                <TwoBoxs />
                {(date_type == 'O' || date_type == '') && (
                  <View>
                    <View style={{ marginTop: Normalize(10) }}>
                      <View style={[globalstyles.textinput_onlyBox_Style, { borderWidth: Normalize(0), }]}>
                        <View
                          style={{
                            justifyContent: "center",
                            marginLeft: Normalize(7)
                          }}>
                          <MaterialCommunityIcons
                            name="calendar-month"
                            size={Normalize(21)}
                            color={Colors.primary}
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <DateTimePickerModal
                            style={styles.datePickerStyle}
                            mode="date"
                            hideText={false}
                            showIcon={false}
                            placeholder={"Choose your task date"}

                            date={engShowDate}
                            customStyles={{
                              dateInput: [
                                globalstyles.textinput_onlyBox_Style,
                                {
                                  justifyContent: 'flex-start',
                                  borderWidth: Normalize(0)
                                },
                              ],
                              dateText: {
                                fontSize: Normalize(12),
                                fontFamily: fontfmliy.bold,
                                color: Colors.primary,
                                paddingLeft: Normalize(12),
                              },
                              placeholderText: {
                                fontSize: Normalize(12),
                                fontFamily: fontfmliy.bold,
                                color: Colors.primary,
                                paddingLeft: Normalize(12),
                              },
                            }}
                            format="DD MMM, YYYY"
                            confirmBtnText="Confirm"
                            minDate={
                              date_type == 'B' ? englishTommorow : englishToday
                            }
                            maxDate={after6Month}
                            cancelBtnText="Cancel"
                            onDateChange={date => {
                              setEngShowDate(date)
                              // console.log(date)
                              dateEnglish(date)
                            }}
                          />
                        </View>
                        <View
                          style={{
                            marginRight: Normalize(5),
                            justifyContent: "center"
                          }}>
                          <Entypo
                            name="chevron-thin-right"
                            size={Normalize(16)}
                            color={Colors.grey}
                          />
                        </View>
                      </View>
                    </View>
                    {/* time picker  */}
                    <View style={[globalstyles.textinput_onlyBox_Style, { borderWidth: 0, marginTop: Normalize(18) }]}>
                      <View
                        style={{
                          marginLeft: Normalize(7),
                          justifyContent: "center"
                        }}>
                        <MaterialCommunityIcons
                          name="clock-outline"
                          size={Normalize(19)}
                          color={Colors.primary}
                        />
                      </View>
                      <Pressable
                        onPress={showTimepicker}
                        style={{
                          flex: 1,
                          flexDirection:'row'
                        }}>
                        {Platform.OS == 'ios' ? (
                          <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text
                              style={{
                                fontSize: Normalize(12),
                                fontFamily: 'Outfit-Regular',
                                color: Colors.textinput_inner_text,
                                paddingHorizontal: Normalize(12),
                                color: '#666',
                              }}>
                              {time.length == 0
                                ? strings.POSTTASK.ENTERTIME
                                : viewTime}
                            </Text>
                          </View>
                        ) : (
                          <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text
                              style={{
                                fontSize: Normalize(12),
                                color: Colors.textinput_inner_text,
                                paddingHorizontal: Normalize(12),
                                fontFamily: fontfmliy.bold,
                                color: Colors.primary,
                              }}>
                              {time.length == 0
                                ? strings.POSTTASK.ENTERTIME
                                : viewTime}
                            </Text>
                          </View>
                        )}
                        <View
                          style={{
                            marginRight: Normalize(5),
                            justifyContent: "center"
                          }}>
                          <Entypo
                            name="chevron-thin-right"
                            size={Normalize(16)}
                            color={Colors.grey}
                          />
                        </View>
                      </Pressable>
                    </View>
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
                        }}
                      />
                    )}
                    {Platform.OS == 'ios' && time.length != 0 && show && (
                      <Text
                        style={[
                          globalstyles.textinput_onlyText_Style,
                          {
                            color: '#666',
                            textAlign: 'center',
                            backgroundColor: '#e1e5e8',
                            height: 40,
                          },
                        ]}>
                        {viewTime}
                      </Text>
                    )}
                  </View>
                )}
              </View>
              {date_type == "O" && <View>
                <Text style={{ textAlign: "center", fontSize: Normalize(12), color: Colors.greyText, fontFamily: fontfmliy.bold, marginBottom: Normalize(20) }} >{lastText}</Text>
              </View>}
            </View>
          </ScrollView>
          <Text
            style={[
              globalstyles.plantext_Outfit_Medium,
              { textAlign: 'center' },
            ]}>
            Step 2/3
          </Text>

          <Button
            nextarrow
            onPress={nextButton}
            style={{
              marginTop: Normalize(10),
              marginBottom: Normalize(15),
            }}
            name={'Continue'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default withRtl(EditTaskplace);

// navigation.navigate('EditTaskImage')
