import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  LogBox,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Toast from "react-native-simple-toast"
import styles from './Styles';
import Header from './../../../../components/Header';
import { Colors } from './../../../../constants/colors';
import strings from './../../../../constants/lng/LocalizedStrings';
import Normalize from './../../../../helpers/Dimens';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import images from '../../../../constants/images';
import { myContext } from '../../../../constants/ContextApi';
import LoaderPage from '../../../../components/LoaderPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import { engToPersian } from '../../../../constants/EnglishToPersian';
import { numberWithCommas } from '../../../../constants/NumberWithComma';
import moment from 'moment';
import { leftOrRight, rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import Entypo from 'react-native-vector-icons/Entypo';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import Button from '../../../../components/Button';
import { Constant_apis } from '../../../../constants/Constant_api';
function Filter({ isModal, onPressFilter, resetButton, distanceset }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  const {
    token,
    min_search_budget, setMin_search_budget,
    max_search_budget, setMax_search_budget,
    browserCategory_id, setBrowserCategory_id,
    browserSubcategory_id, setBrowserSubcategory_id,
    browserLat, setBrowserLat,
    browserLng, setBrowserLng,
    distance, setDistance,
    prevDistance, setPrevDistance,
    from_date, setFrom_date,
    to_date, setTo_date,
    order_by, setOrder_by,
    browsertype, setBrowsertype,
    browserLocation, setBrowserLocation,
    from_D, setFrom_D,
    from_M, setFrom_M,
    from_Y, setFrom_Y,
    to_D, setTo_D,
    to_M, setTo_M,
    to_Y, setTo_Y,
    min_budget, setMin_budget,
    max_budget, setMax_budget,
    taskData, setTaskData,
    catagoryName, setCatagoryName,
    subcatagoryName, setSubcatagoryName,
    keyWord, setKeyWord,
    isOpenOfferin_filter, setIsOpenOfferin_filter
  } = useContext(myContext)
  const [d, setD] = useState(0);
  const [loader, setLoader] = useState(false)
  const [catagory, setCatagory] = useState([]);
  const [min_search_budget2, setMin_search_budget2] = useState(0);
  const [max_search_budget2, setMax_search_budget2] = useState(0);
  const [openModel, setOpenModel] = useState(false)
  const [openSubcatagoryModel, setOpenSubcatagoryModel] = useState(false)
  const [subcatagoryValue, setSubcatagoryValue] = useState([])
  const [tempCategoryId, setTempCategoryId] = useState()
  const [tempCategoryName, setTempCategoryName] = useState("")
  const [tempSubcategoryId, setTempSubcategoryId] = useState()
  const [tempSubcategoryName, setTempSubcategoryName] = useState("")
  const [tempDate, setTempDate] = useState("")
  const [toDateShow, setToDateShow] = useState("")
  const [fromDateShow, setFromDateShow] = useState("")
  const [parsiandatePickerFrom, setParsiandatePickerFrom] = useState(false);
  const [parsiandatePickerTo, setParsiandatePickerTo] = useState(false);
  const [temp_showDistance, setTemp_showDistance] = useState(distanceset[1]);
  const [temp_Distance, setTemp_Distance] = useState(distanceset[0]);
  var date2 = new Date();
  var today = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate();

  let a = new Date().toJSON().slice(0, 10).split('-').reverse().join('/');
  let todayPersian = moment(a, 'DD/MM/YYYY').locale('fa').format('YYYY-MM-DD');
  const tomorrow = moment().add(1, 'days');
  const persianTommorow = tomorrow.locale('fa').format('YYYY-MM-DD')
  var englishToday = new Date();
  var englishTommorow = new Date();
  englishTommorow.setDate(englishTommorow.getDate() + 1);

  const getTokon = async () => {

    setMin_search_budget(5)
    setMax_search_budget(100000)

    setMin_search_budget2(100000)
    setMax_search_budget2(5)
  }
  useEffect(() => {
    getTokon()
    return getTokon()
  }, []);
  const selectCatagory = (id, name) => {
    setTempCategoryId(id)
    setTempCategoryName(name)
  }
  const get_SubCategory = async () => {
    const id = tempCategoryId
    const name = tempCategoryName
    setBrowserCategory_id(id)
    setCatagoryName(name)
    setOpenModel(!openModel)
    if (id) {
      const data = {
        "jsonrpc": "2.0",
        "params": {
          "parent_id": id
        }
      }
      const res = await axiosInstance.post("get-subcategory", data)
      if (res.data.result) {
        setSubcatagoryValue(res.data.result.get_subcategory)
      }
    }
    setTempCategoryId("")
    setTempCategoryName("")
  }
  const selectSubCatagory = () => {
    const id = tempSubcategoryId
    const name = tempSubcategoryName
    setBrowserSubcategory_id(id)
    setSubcatagoryName(name)
    setOpenSubcatagoryModel(!openSubcatagoryModel)
  }
  const handleClose = () => {
    distance_swap()
    onPressFilter();
  };

  const distance_swap = () => {
    setDistance(temp_Distance)
    // setTemp_Distance(1)
    setPrevDistance(temp_showDistance)
    // setTemp_showDistance(1)
  }


  const get_category = async () => {
    try {
      const data = await axiosInstance.post("get-category")
      if (data) {
        setCatagory(data.data.result.get_category)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(async () => {
    await get_category()
    return await get_category()
  }, [token]);

  const onPress_isOpenOfferin_filter = () => {
    setIsOpenOfferin_filter(!isOpenOfferin_filter)
  }
  const applyButton = async () => {
    try {

      if (from_date.length != 0) {

        if (to_date.length != 0) {
          setLoader(true)
          const res = {
            "jsonrpc": "2.0",
            "params": {
              "keyword": keyWord,
              "min_search_budget": isOpenOfferin_filter ? "0" : min_search_budget,
              "max_search_budget": isOpenOfferin_filter ? "0" : max_search_budget,
              "category_id": browserCategory_id,
              "subcategory_id": browserSubcategory_id,
              "lat": browserLat,
              "lng": browserLng,
              "distance": temp_Distance,
              "from_date": from_date,
              "to_date": to_date,
              "type": browsertype,
              "order_by": order_by == "1" ? "1" : isOpenOfferin_filter ? "" : order_by,
              "open_offer": isOpenOfferin_filter ? "true" : "false"
            }
          }
          console.log("browse-task====> not use",res)
          const data = await axiosInstance.post("browse-task", res)
          if (data.data) {
            var val = data.data.tasks
            var total_result = data.data.total_result
            setTaskData(data.data.tasks)
            setLoader(false)
            // onPressFilter()
            handleClose()
            Toast.show(total_result + " " + strings.BROWSEFILTER.TASKFOUND)
          }
        } else {
          Toast.show("select to date also")
        }
      } else {
        setLoader(true)
        const res = {
          "jsonrpc": "2.0",
          "params": {
            "keyword": keyWord,
            "min_search_budget": isOpenOfferin_filter ? "0" : min_search_budget,
            "max_search_budget": isOpenOfferin_filter ? "0" : max_search_budget,
            "category_id": browserCategory_id,
            "subcategory_id": browserSubcategory_id,
            "lat": browserLat,
            "lng": browserLng,
            "distance": temp_Distance,
            "type": browsertype,
            "order_by": order_by == "1" ? "1" : isOpenOfferin_filter ? "" : order_by,
            "open_offer": isOpenOfferin_filter ? "true" : "false"
          }
        }
        console.log("browse-task====> not use2",res)
        const data = await axiosInstance.post("browse-task", res)
        if (data.data) {
          var val = data.data.tasks
          var total_result = data.data.total_result
          setTaskData(data.data.tasks)
          setLoader(false)
          // onPressFilter()
          handleClose()
          Toast.show(`${language == "en" ? total_result : engToPersian(total_result)}` + " " + strings.BROWSEFILTER.TASKFOUND)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const from_date_select = (val) => {
    let m = moment(val, 'MMM DD, YYYY').format('DD-MM-YYYY');
    setFrom_date(m)
    setFromDateShow(val)
  }
  const to_date_select = (val) => {
    if (from_date.length == 0) {
      Toast.show("At first select From date")
    } else {
      let m = moment(val, 'MMM DD, YYYY').format('DD-MM-YYYY');
      setTo_date(m)
    }
  }
  const persianminvalue = (val) => {
    if (val == 1000) {
      return 100000
    } else if (val == 10000) {
      return 100000000

    } else if (val == 100000) {
      return 10000000

    } else if (val == 1000000) {
      return 1000000

    } else if (val == 10000000) {
      return 100000

    } else if (val == 100000000) {
      return 10000

    } else if (val == 100000) {
      return 1000
    }
  }
  const persianminvalue2 = (val) => {
    if (val == 1000) {
      return 100000
    } else if (val == 10000) {
      return 100000000
    } else if (val == 100000) {
      return 10000000
    } else if (val == 1000000) {
      return 1000000
    } else if (val == 10000000) {
      return 100000
    } else if (val == 100000000) {
      return 10000
    } else if (val == 100000) {
      return 1000
    }
  }

  const distance_increase = (val) => {
    let dis = val
    if (dis < 999) {
      dis = dis + 1
      // console.log("inc", dis)
      return dis
    } else {
      return dis
    }
  }
  const distance_decrease = (val) => {
    let dis = val
    if (dis > 1) {
      dis = dis - 1
      // console.log("dec", dis)
      return dis
    } else {
      return dis
    }
  }

  const subcategoryHeight = (val) => {
    var a = val.length
    // console.log("----", a)
    if (a == 1) {
      return Normalize(120)
    } else if (a == 2) {
      return Normalize(150)
    } else if (a == 3) {
      return Normalize(160)
    } else if (a == 4) {
      return Normalize(182)
    } else if (a == 5) {
      return Normalize(210)
    } else if (a == 6) {
      return Normalize(238)
    } else if (a == 7) {
      return Normalize(268)
    } else if (a == 8) {
      return Normalize(292)
    } else if (a == 9) {
      return Normalize(322)
    } else if (a >= 10) {
      return Normalize(350)
    }
  }

  return (
    <>
      <Modal
        animationType="fade"
        transparent={false}
        visible={isModal}
        onRequestClose={() => {
          handleClose();
        }}>
        {
          loader == true ? <LoaderPage /> :
            <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

              <KeyboardAvoidingView
                behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ flex: 1, backgroundColor: Colors.white }}>
                <Header cross name={strings.BROWSEFILTER.HEADERTEXT} handleCross={handleClose} />


                <View style={{ flex: 1, paddingHorizontal: Normalize(15) }} >
                  <View style={{ flex: 1, }} >
                    {/*  *******************location text input***************/}
                    <Text style={globalstyles.textinput_Header_Style}>{strings.BASICINFO.LOCATION}</Text>
                    <View>
                      {
                        browsertype == "O" ?
                          <TextInput
                            placeholderTextColor={Colors.textinput_inner_text}
                            editable={false} style={globalstyles.textinputStyle} placeholder={"Enter your location"} />
                          :
                          <GooglePlacesAutocomplete
                            enablePoweredByContainer={false}
                            textInputProps={{
                              placeholderTextColor: Colors.textinput_inner_text,
                              textAlign: language == "en" ? "left" : "right"
                            }}
                            styles={{
                              textInput: [globalstyles.textinputStyle, {}],
                              row: {
                                padding: 13,
                                flexDirection: language == "en" ? "row" : "row-reverse",
                              },
                            }}
                            fetchDetails
                            placeholder={browserLocation.length != 0 ? browserLocation : strings.POSTTASK.SEARCH}
                            onPress={(data, details = null) => {
                              const { lat, lng } = details.geometry.location
                              setBrowserLocation(data.description)
                              setBrowserLat(lat)
                              setBrowserLng(lng)
                            }}
                            renderRow={results => {
                              if (results.isPredefinedPlace) {
                                return (
                                  <Text style={{ fontSize: Normalize(11), width: "100%", paddingHorizontal: Normalize(3), textAlign: leftOrRight(language) }} >{results.description}</Text>
                                );
                              } else {
                                return (
                                  <Text style={{ fontSize: Normalize(11), width: "100%", paddingHorizontal: Normalize(3), textAlign: leftOrRight(language) }} >{results.description}</Text>
                                )
                              }
                            }}
                            onFail={(e) => console.log(e)}
                            query={{
                              key: Constant_apis.Google_Location_api,
                              language: 'en',
                            }}
                          />
                      }
                    </View>

                    {/* ******************distance slider****************** */}
                    <View
                      style={[styles.rowView]}>
                      <Text style={globalstyles.textinput_Header_Style}>{strings.BROWSEFILTER.DISTANCE}</Text>
                      <Text
                        style={[globalstyles.plantext_roboto_regular, { color: Colors.secondary }]}>
                        {distance ? language == "en" ? numberWithCommas(temp_showDistance) : engToPersian(temp_showDistance) : 0} {strings.BROWSEFILTER.KM}
                      </Text>
                    </View>
                    <View style={{}} >
                      <Slider
                        value={temp_Distance}
                        disabled={browsertype == "O" ? true : false}
                        minimumValue={1}
                        maximumValue={999}
                        step={1}
                        minimumTrackTintColor={Colors.primary}
                        maximumTrackTintColor={Colors.borderColor}
                        inverted={language == "en" ? false : true}
                        onValueChange={(val) => {
                          setTemp_showDistance(Math.round(val))
                        }}
                        onSlidingComplete={val =>
                          setTemp_Distance(Math.round(val))
                        }
                        style={{ height: 30, width: "100%" }}

                        thumbTintColor={browsertype == "O" ? Colors.lightGrey : Colors.primary}
                      />
                    </View>

                    <View style={{ height: Normalize(17), width: "100%", flexDirection: rowOrRowreverse(language), justifyContent: "space-between" }}>
                      <Pressable
                        disabled={browsertype == "O" ? true : false}
                        onPressIn={() => {
                          setTemp_Distance(distance_decrease(temp_showDistance))
                          setTemp_showDistance(distance_decrease(temp_showDistance))
                        }}
                        style={[styles.plus_minus_view, { backgroundColor: browsertype == "O" ? Colors.lightGrey : Colors.secondary }]} >
                        <Entypo
                          name="minus"
                          size={Normalize(14)}
                          color={Colors.white}
                          style={{ opacity: 0.8 }}
                        />
                      </Pressable>
                      <Pressable
                        disabled={browsertype == "O" ? true : false}
                        onPressIn={() => {
                          setTemp_Distance(distance_increase(temp_showDistance))
                          setTemp_showDistance(distance_increase(temp_showDistance))
                        }}
                        style={[styles.plus_minus_view, { backgroundColor: browsertype == "O" ? Colors.lightGrey : "#22BC85" }]} >
                        <Entypo
                          name="plus"
                          size={Normalize(14)}
                          color={Colors.white}
                          style={{ opacity: 0.8 }}
                        />
                      </Pressable>
                    </View>

                    {/* ************************category picker************************* */}
                    <Text style={globalstyles.textinput_Header_Style}>{strings.BROWSEFILTER.CATEGORY}</Text>
                    <Pressable onPress={() => {
                      setSubcatagoryName("")
                      setBrowserSubcategory_id("")
                      setOpenModel(!openModel)
                    }}
                      style={[globalstyles.textinput_onlyBox_Style, {
                        borderColor: openModel ? Colors.primary : Colors.disable_textinput_border,
                        backgroundColor: openModel ? Colors.white : Colors.disable_textinput_background
                      }]} >
                      <View style={{ flex: 1 }} >
                        <Text style={globalstyles.textinput_onlyText_Style}>
                          {
                            catagoryName ? catagoryName : strings.BROWSEFILTER.CHOOSECATEGORY
                          }
                        </Text>
                      </View>
                      <View style={{ height: "100%", width: Normalize(15), marginRight: Normalize(5) }}>
                        <Image source={images.downlinearrow} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                      </View>
                    </Pressable>
                    {
                      openModel &&
                      <Modal
                        animationType="none"
                        transparent={true}
                        visible={openModel}
                        onRequestClose={() => {
                          setOpenModel(!openModel);
                        }}
                      >
                        {catagory.length != 0 ?
                          <View style={{ flex: 1, backgroundColor: "rgba(52, 52, 52, 0.8)" }}>
                            <View style={{ flex: 1, marginHorizontal: "15%", backgroundColor: "white", marginVertical: "30%", borderRadius: 5 }} >
                              <Text
                                style={{ fontFamily: 'roboto-medium', fontSize: Normalize(15), color: Colors.white, backgroundColor: Colors.primary, textAlign: "center", borderBottomColor: "#d8d8d8", borderBottomWidth: 1, paddingVertical: Normalize(6) }}>{strings.POSTTASK.CATEGORIES}</Text>
                              <ScrollView style={{ marginVertical: 10 }} showsVerticalScrollIndicator={false} >
                                {
                                  catagory.map((item, index) => {
                                    return (
                                      <TouchableOpacity key={index} onPress={() => selectCatagory(item.id, item.name)}>
                                        <Text style={{
                                          fontSize: Normalize(12), marginBottom: Normalize(6), textAlign: "center", backgroundColor: tempCategoryName.length != 0 ? tempCategoryName == item.name ? Colors.primary : null : catagoryName.length != 0 ? item.name == catagoryName ? Colors.primary : null : null,
                                          color: tempCategoryName.length != 0 ? tempCategoryName == item.name ? Colors.white : Colors.greyText : catagoryName.length != 0 ? item.name == catagoryName ? Colors.white : Colors.greyText : Colors.greyText,
                                          padding: "0.5%"
                                        }} >{item.name}</Text>
                                      </TouchableOpacity>
                                    )
                                  })
                                }
                              </ScrollView>
                              <View
                                style={{ flexDirection: rowOrRowreverse(language), height: Normalize(34), justifyContent: 'space-evenly', marginBottom: Normalize(5) }} >
                                <TouchableOpacity onPress={() => {
                                  setOpenModel(!openModel)
                                  setTempCategoryId("")
                                  setTempCategoryName("")
                                }}
                                  style={{ height: "90%", width: "44%", justifyContent: "center", alignItems: "center", backgroundColor: Colors.secondary, paddingVertical: Normalize(6), borderRadius: 5 }}  >
                                  <Text style={{ fontFamily: 'roboto-medium', fontSize: Normalize(13), color: Colors.white }}>{strings.POSTTASK.CANCEL}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={get_SubCategory}
                                  style={{ height: "90%", width: "44%", justifyContent: "center", alignItems: "center", backgroundColor: Colors.primary, paddingVertical: Normalize(6), borderRadius: 5 }} >
                                  <Text style={{ fontFamily: 'roboto-medium', fontSize: Normalize(13), color: Colors.white }}>
                                    {strings.POSTTASK.OK}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View> :
                          <LoaderPage />
                        }
                      </Modal >}

                    {/* ******************to be done tabs****************** */}
                    <Text style={globalstyles.textinput_Header_Style}>{strings.BROWSEFILTER.TOBEDONE}</Text>
                    <View style={styles.customtab}>
                      <Pressable activeOpacity={0.8} onPress={() => setBrowsertype("P")}
                        style={[styles.tobedone, { backgroundColor: browsertype == "P" ? Colors.primary : null, borderWidth: browsertype == "P" ? 0 : 0.9 }]} >
                        <Text
                          style={[globalstyles.plantext_outfit_regular, { color: browsertype == "P" ? Colors.white : Colors.greyText, }]}>
                          {strings.BROWSEFILTER.INPERSON}
                        </Text>
                      </Pressable>
                      <Pressable activeOpacity={0.8}
                        onPress={() => {
                          console.log("**************55")
                          setBrowserLat("")
                          setBrowserLng("")
                          setBrowserLocation("")
                          setDistance(1)
                          setBrowsertype("O")
                        }}
                        style={[styles.tobedone, { backgroundColor: browsertype == "O" ? Colors.primary : null, borderWidth: browsertype == "O" ? 0 : 0.9 }]} >
                        <Text
                          style={[globalstyles.plantext_outfit_regular, { color: browsertype == "O" ? Colors.white : Colors.greyText, }]}>
                          {strings.BROWSEFILTER.REMOTELY}
                        </Text>
                      </Pressable>
                      <Pressable activeOpacity={0.8} onPress={() => setBrowsertype("")}
                        style={[styles.tobedone, { backgroundColor: browsertype == "" ? Colors.primary : null, borderWidth: browsertype == "" ? 0 : 0.9 }]} >
                        <Text style={[globalstyles.plantext_outfit_regular, { color: browsertype == "" ? Colors.white : Colors.greyText, }]}>
                          {strings.BROWSEFILTER.ALL}
                        </Text>
                      </Pressable>
                    </View>




                    <View style={{ flex: 1 }} />

                    <Pressable
                      onPress={resetButton}
                      style={{ flexDirection: "row", alignSelf: "center", marginVertical: Normalize(15) }} >
                      <Image source={images.reset_blue} style={{ height: Normalize(14), width: Normalize(14), resizeMode: "contain" }} />
                      <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.primary, marginLeft: Normalize(2) }]} >Reset</Text>
                    </Pressable>
                    <Button
                      name={"Apply your Filter"}
                      onPress={applyButton}
                      style={{ marginBottom: Normalize(15) }}
                    />



                  </View>
                </View>
              </KeyboardAvoidingView>
            </SafeAreaView>
        }
      </Modal>
    </>
  );
}

export default withRtl(Filter);