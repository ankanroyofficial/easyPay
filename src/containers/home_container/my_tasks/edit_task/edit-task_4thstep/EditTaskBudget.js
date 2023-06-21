import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView,
  KeyboardAvoidingView, ActivityIndicator, Platform, Modal, Keyboard
} from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Toast from "react-native-simple-toast"
import Header from '../../../../../components/Header';
import strings from '../../../../../constants/lng/LocalizedStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from './../../../../../components/Button';
import styles from './Styles';
import { Colors } from '../../../../../constants/colors';
import { myContext } from '../../../../../constants/ContextApi';
import Normalize from './../../../../../helpers/Dimens';
import images from '../../../../../constants/images';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import LoaderPage from '../../../../../components/LoaderPage';
import { engToPersian } from '../../../../../constants/EnglishToPersian';
import PostTask_header_button from '../../../../../components/PostTask_header_button';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import { CheckBox as ChkBox } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { fontfmliy } from '../../../../../components/WhichFontFamily';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import NewLoaderPage from '../../../../../components/NewLoaderPage';
import { countPage } from '../../../../../components/BrowserTaskPageCount';
const EditTaskBudget = () => {

  const navigation = useNavigation()

  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const {
    id, setId,
    category_id, setCategory_id,
    subcategory_id, setSubcategory_id,
    title, setTitle,
    description, setDescription,
    type, setType,
    time, setTime,
    date, setDate,
    budget_type, setBudget_type,
    budget, setBudget,
    hourly_rate, setHourly_rate,
    number_of_hour, setNumber_of_hour,
    location, setLocation,
    lat, setLat,
    lng, setLng,
    image, setImage,
    must_have, setMust_Have,
    date_type,
    apiImages, setApiImages,
    editOrpostsimilar,
    perShowDate, setPerShowDate,
    setMytaskloader,
    isopenOffer, setIsopenOffer,
    getSimililarTaskId,
    must_have_New,
    browserLat,
    browserLng,
    order_by,
    browsertype, setTaskData,
    keyWord,
    isOpenOfferin_filter,
    filter_Categories, setBrowsertaskTotalPage,
    setBrowsertaskCurrentPage, setBrowserTaskFooterText, distance,
    setAllNewMyTask, setIsMyTaskLoad,
    setTaskdetailsLoader,
    setTaskDataForMap
  } = useContext(myContext)
  const [loader, setLoader] = useState(false)
  const [sucessPage, setSucessPage] = useState(false);
  const [taskSlug, setTaskSlug] = useState("");

  const onpressSucessPage = () => {
    setSucessPage(!sucessPage);
  };
  const onpress_isopenOffer_checkbox = () => {
    if (isopenOffer) {
      setBudget_type("T")
      setIsopenOffer(false)
    } else {
      setBudget("")
      setHourly_rate("")
      setNumber_of_hour("")
      setBudget_type("")
      setIsopenOffer(true)
    }
  }
  const checkNumberOrNot = (val) => {
    return parseInt(val) == val
  }
  const submitButton = async () => {
    try {
      if (isopenOffer) {
        finalApicall()
      } else {
        if (budget_type == "T") {
          if (checkNumberOrNot(budget)) {
            if (budget >= 5) {
              finalApicall()
            } else {
              // console.log(budget)
              Toast.show("Total budget must be $5 or greater than $5")
            }
          } else {
            Toast.show("Please enter a price for your task")
          }
        } else {
          if (checkNumberOrNot(hourly_rate) && checkNumberOrNot(number_of_hour)) {
            if (hourly_rate >= 1 && number_of_hour >= 1) {
              finalApicall()
            } else {
              Toast.show("Please enter amount and hours ")
            }
          } else {
            Toast.show("Please enter valid budget and number of hours")
          }
        }
      }
    } catch (error) {
      console.log("submitButton", error)
      setLoader(false)
    }
  }
  const finalApicall = async () => {
    try {
      setLoader(true)
      // console.log(time)
      var budgetInt = parseInt(budget)
      var hourlyrateInt = parseInt(hourly_rate)
      var numberofhourInt = parseInt(number_of_hour)
      var mustHaveArray = []
      must_have.map((item) => {
        mustHaveArray.push(item.title)
      })
      const finalFormData = new FormData();
      finalFormData.append('id', id);
      finalFormData.append('category_id', category_id);
      // finalFormData.append('subcategory_id', subcategory_id);
      finalFormData.append('title', title);
      finalFormData.append('description', description);
      finalFormData.append('type', type);
      finalFormData.append('time', time);
      finalFormData.append('date', date);
      finalFormData.append('due_date', perShowDate);
      finalFormData.append('budget_type', budget_type == "" ? "T" : budget_type);
      finalFormData.append('budget', isopenOffer ? 0 : budget_type == "T" ? budgetInt : (hourlyrateInt * numberofhourInt));
      finalFormData.append('hourly_rate', isopenOffer ? 0 : hourly_rate == "" ? 0 : hourlyrateInt);
      finalFormData.append('number_of_hour', isopenOffer ? 0 : number_of_hour == "" ? 0 : numberofhourInt);
      finalFormData.append('location', location);
      finalFormData.append('lat', lat);
      finalFormData.append('lng', lng);

      image.map((item, index) => {
        finalFormData.append(`image[${index}]`, {
          uri: item.uri,
          name: item.fileName,
          type: item.type
        })
      })
      finalFormData.append('must_have', must_have_New);
      finalFormData.append('date_type', date_type);
      finalFormData.append('similar', "Y");

      {
        editOrpostsimilar != "edit" &&
          finalFormData.append('get_simililar_task_id', getSimililarTaskId);
      }
      let similartaskIds = []
      apiImages.map((item) => {
        // console.log(item)
        similartaskIds.push(item.id)
      })
      // console.log(typeof (similartaskIds.toString()))
      // console.log(similartaskIds.toString())
      {
        (editOrpostsimilar != "edit" && apiImages.length > 0) &&
          finalFormData.append('similiar_images', similartaskIds.toString());
      }
      const data = finalFormData
      // console.log(data)
      const res = await axiosInstance.post("post-task", data)
      if (res.data.error) {
        setLoader(false)
        Toast.showWithGravity(res.data.error.meaning, Toast.LONG, Toast.BOTTOM)
      } else {
        setLoader(false)
        setTaskSlug(res.data.result.status.task.slug)
        // await AsyncStorage.setItem("isMyTaskloader", "true")
        // await AsyncStorage.setItem("isBrowserTaskloader", "true")
        setHourly_rate("")
        setNumber_of_hour("")
        onpressSucessPage()
      }
      setLoader(false)
    } catch (error) {
      console.log("finalApicall", error)
    }
  }
  const onTaskSucess = async () => {
    try {
      onpressSucessPage();
      console.log(taskSlug)
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "slug": taskSlug
        }
      }
      const data = await axiosInstance.post("get-task-details", res)
      // console.log(data.data)
      if (data.data.result) {
        AsyncStorage.setItem("similartaskSlug", JSON.stringify(data.data.result))
        navigation.push('TaskDetails', { show: data.data.result, from: "similartask" })
        // loadBrowserTask()
        // loadBrowserTask_ForMapPage()
        // loadMyTask()
        setTaskdetailsLoader(true)
      }
    } catch (error) {
      console.log("onTaskSucess---------- ", error)
    }
  };
  const getFilterCategoryIds = async (val) => {
    let a = val;
    let newArr = []
    a.map((item) => {
      if (item.isSelected) {
        newArr.push(item.id)
      }
    })
    return newArr.toString();
  }
  const loadBrowserTask = async () => {
    try {
      let cateIds = await getFilterCategoryIds(filter_Categories);
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "keyword": keyWord,
          "min_search_budget": "",
          "max_search_budget": "",
          "category_id": cateIds,
          "subcategory_id": "",
          "lat": browserLat,
          "lng": browserLng,
          "distance": distance,
          "type": browsertype,
          "order_by": order_by == "1" ? "1" : isOpenOfferin_filter ? "" : order_by,
          "open_offer": "false",
          "show_available_task_only": "Y",
          "page": 1
        }
      }
      console.log("browse-task====> 88", res.params)
      const data = await axiosInstance.post("browse-task", res)
      console.log(data.data.tasks.length)
      if (data.data) {
        setBrowserTaskFooterText("")
        setBrowsertaskCurrentPage(1)
        setBrowsertaskTotalPage(countPage(data.data.limit, data.data.total_result))
        setTaskData(data.data.tasks)
      }
    } catch (error) {
      console.log("loadBrowserTask.......", error)
    }
  }

  const loadBrowserTask_ForMapPage = async () => {
    try {
      let cateIds = await getFilterCategoryIds(filter_Categories);
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "keyword": keyWord,
          "min_search_budget": "",
          "max_search_budget": "",
          "category_id": cateIds,
          "subcategory_id": "",
          "lat": browserLat,
          "lng": browserLng,
          "distance": distance,
          "type": browsertype,
          "order_by": order_by == "1" ? "1" : isOpenOfferin_filter ? "" : order_by,
          "open_offer": "false",
          "show_available_task_only": "Y",
        }
      }
      // console.log("getTaskForMapPage====>", res)
      let data = await axiosInstance.post("browse-task-for-map", res)
      if (data.data) {
        //  console.log((data.data.tasks).length)
        setTaskDataForMap(data.data.tasks)
      }
    } catch (error) {
      setBrowserTaskloader(false)
      console.log("getBrowserData_afterGetLocation_ForMapPage", error)
    }
  }
  const loadMyTask = async () => {
    try {
      const data = await axiosInstance.post("new-my-task")
      if (data.data.as_a_client && data.data.as_a_eazypayer) {
        setAllNewMyTask({
          as_a_eazypayer: {
            "active_task": data.data.as_a_eazypayer.active_task,
            "complete_task": data.data.as_a_eazypayer.complete_task,
            "offers_or_questions": data.data.as_a_eazypayer.offers_or_questions
          },
          as_a_client: {
            "booked": data.data.as_a_client.booked,
            "completed": data.data.as_a_client.completed,
            "post_task": [...data.data.as_a_client.post_task, ...data.data.as_a_client.cancelled_task]
          }
        })
      }
    } catch (error) {
      console.log("loadMyTask", error)
    }
  }
  const DummyView = () => {
    return (
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: Normalize(20) }}>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }} >
            <Text style={{ fontSize: Normalize(14), paddingRight: Normalize(2), color: Colors.lightGrey, fontFamily: fontfmliy.bold }} >$</Text>
            <View style={{
              paddingHorizontal: Normalize(3),
              alignItems: "stretch",
              borderBottomColor: Colors.boxBorder,
              borderBottomWidth: 1, width: Normalize(18)
            }} >
              <TextInput
                editable={false}
                placeholder={"0"}
                placeholderTextColor={Colors.lightGrey}
                style={{
                  fontSize: Normalize(23),
                  fontFamily: fontfmliy.bold,
                  color: Colors.primary,
                  padding: 0,
                }}
              />
            </View>
            <Text style={{ fontSize: Normalize(14), paddingLeft: Normalize(2), color: Colors.lightGrey, fontFamily: fontfmliy.bold }} >p/h</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }} >
            <View style={{
              paddingHorizontal: Normalize(3),
              alignItems: "stretch",
              borderBottomColor: Colors.boxBorder,
              borderBottomWidth: 1, width: Normalize(18)
            }} >
              <TextInput
                editable={false}
                placeholderTextColor={Colors.lightGrey}
                placeholder={"0"}
                style={{
                  fontSize: Normalize(23),
                  fontFamily: fontfmliy.bold,
                  color: Colors.primary,
                  padding: 0,
                }}
              />
            </View>
            <Text style={{ fontSize: Normalize(14), paddingLeft: Normalize(2), color: Colors.lightGrey, fontFamily: fontfmliy.bold }} >hrs</Text>
          </View>
        </View>

        <View style={{ width: Normalize(150), paddingVertical: Normalize(3), marginTop: Normalize(35) }} />
      </View>
    )
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss();
    })
  }, [])
  // console.log(budget_type)
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
      <KeyboardAvoidingView
        behavior={(Platform.OS === 'ios') ? "padding" : null} style={styles.container}>
        <Header back
          name={
            editOrpostsimilar == 'edit'
              ? strings.POSTTASK.EDITTASK
              :
              editOrpostsimilar == 'repostTask' ?
                "Repost a Task" :
                strings.POSTTASK.SIMILARTASK
          }
          navigation={navigation} />
        <View style={{ flex: 1 }} >
          <View>
            <PostTask_header_button
              active={"Budget"}
            />
          </View>
          <View style={globalstyles.container_only_padding} >
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
            >
              <View style={{ flex: 1 }} >
                <Text style={[globalstyles.page_Header_Text, { marginBottom: Normalize(10), fontSize: Normalize(12) }]}>Set a budget for your task</Text>
                {/* if not open offer */}
                <View style={[styles.twoButton_totalview]} >
                  <TouchableOpacity activeOpacity={0.8}
                    onPress={() => {
                      setIsopenOffer(false)
                      setBudget("")
                      setBudget_type("T")
                    }}
                    style={[styles.twoButton_view, { backgroundColor: budget_type == "T" ? Colors.primary : Colors.grayf5 }]} >
                    <Text style={[styles.O_P_Buttontext, { color: budget_type == "T" ? Colors.white : Colors.greyText }]}
                    >Whole Price</Text>
                  </TouchableOpacity>
                  {isopenOffer &&
                    <View style={{ height: "100%", width: 1, paddingVertical: Normalize(7), backgroundColor: Colors.grayf5 }} >
                      <View style={{ height: "100%", width: "100%", backgroundColor: Colors.borderColor }} ></View>
                    </View>}
                  <TouchableOpacity activeOpacity={0.8}
                    onPress={() => {
                      setIsopenOffer(false)
                      setHourly_rate("")
                      setNumber_of_hour("")
                      setBudget_type("H")
                    }}
                    style={[styles.twoButton_view, { backgroundColor: budget_type == "H" ? Colors.primary : Colors.grayf5 }]} >
                    <Text style={[styles.O_P_Buttontext, { color: budget_type == "H" ? Colors.white : Colors.greyText, }]}>Price Per Hour</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }} >
                  {
                    // ****************************hourly_rate*************************
                    budget_type == "H" ?
                      <View style={{ flex: 1, }}>
                        {
                          isopenOffer
                            ?
                            <DummyView />
                            :
                            <View>
                              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: Normalize(20) }}>
                                <View style={{ flexDirection: "row", alignItems: "flex-end" }} >
                                  <Text style={{ fontSize: Normalize(14), paddingRight: Normalize(2), color: Colors.primary, fontFamily: fontfmliy.bold }} >$</Text>
                                  <View style={{
                                    alignItems: "center",
                                    borderBottomColor: Colors.boxBorder,
                                    flexDirection: 'column',
                                    borderBottomWidth: 1, width: (hourly_rate.toString()).length * Normalize(20), minWidth: Normalize(35)
                                  }} >
                                    <View style={{
                                      alignItems: "center",
                                      borderBottomColor: Colors.boxBorder,
                                      flexDirection: 'column',
                                      width: (hourly_rate.toString()).length * Normalize(15),
                                      minWidth: Normalize(23)
                                    }} >
                                      <TextInput
                                        value={hourly_rate.toString()}
                                        keyboardType="phone-pad"
                                        placeholder={"0"}
                                        placeholderTextColor={Colors.lightGrey}
                                        maxLength={5}
                                        onChangeText={(e) => { setHourly_rate(e) }}
                                        style={{
                                          alignSelf: 'center',
                                          marginLeft: Normalize(5),
                                          fontSize: Normalize(23),
                                          fontFamily: fontfmliy.bold,
                                          color: Colors.primary,
                                          padding: 0,
                                          width: '100%'
                                        }}
                                      />
                                    </View>
                                  </View>
                                  <Text style={{ fontSize: Normalize(14), paddingLeft: Normalize(2), color: Colors.primary, fontFamily: fontfmliy.bold }} >p/h</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "flex-end" }} >
                                  <View style={{
                                    alignItems: "center",
                                    borderBottomColor: Colors.boxBorder,
                                    flexDirection: 'column',
                                    borderBottomWidth: 1,
                                    width: (number_of_hour.toString()).length * Normalize(20), minWidth: Normalize(35)
                                  }} >
                                    <View style={{
                                      alignItems: "center",
                                      // borderBottomColor: Colors.boxBorder,
                                      // borderBottomWidth: 1,
                                      width: (number_of_hour.toString()).length * Normalize(16),
                                      minWidth: Normalize(18)
                                    }} >
                                      <TextInput
                                        value={number_of_hour.toString()}
                                        keyboardType="phone-pad"
                                        placeholderTextColor={Colors.lightGrey}
                                        placeholder={"0"}
                                        maxLength={2}
                                        onChangeText={(e) => { setNumber_of_hour(e) }}
                                        style={{
                                          fontSize: Normalize(23),
                                          fontFamily: fontfmliy.bold,
                                          color: Colors.primary,
                                          padding: 0,
                                          width: "100%"
                                        }}
                                      />
                                    </View>
                                  </View>
                                  <Text style={{ fontSize: Normalize(14), paddingLeft: Normalize(2), color: Colors.primary, fontFamily: fontfmliy.bold }} >hrs</Text>
                                </View>
                              </View>

                              <View style={{ width: Normalize(150), backgroundColor: "#ffead9", paddingVertical: Normalize(3), alignSelf: "center", alignItems: "center", borderRadius: Normalize(7), marginTop: Normalize(35) }} >
                                <Text style={{ fontSize: Normalize(23), fontFamily: fontfmliy.bold, color: Colors.primary }} >{(number_of_hour != "" && hourly_rate != "") ? `${hourly_rate * number_of_hour}` : 0}<Text style={{ fontSize: Normalize(20) }} >{(number_of_hour != "" && hourly_rate != "") && " $"}</Text></Text>
                              </View>
                              <Text style={[globalstyles.textinput_Header_Style, { alignSelf: "center", marginTop: Normalize(15) }]}>Estimated Budget</Text>
                            </View>
                        }
                      </View>
                      :
                      // ************************TOTAL budget********************
                      <View style={{ flex: 1 }} >

                        {
                          isopenOffer ?
                            <DummyView />
                            :

                            <View>
                              <View style={{ flexDirection: "row", alignSelf: "center", marginTop: Normalize(20) }} >
                                <Text style={{ fontSize: Normalize(15), padding: Normalize(8), color: Colors.primary, fontFamily: fontfmliy.bold }} >$</Text>
                                <TextInput
                                  value={budget.toString()}
                                  keyboardType="phone-pad"
                                  placeholderTextColor={Colors.lightGrey}
                                  placeholder={"0"}
                                  maxLength={5}
                                  onChangeText={(e) => { setBudget(e) }}
                                  style={{
                                    // padding: 0,
                                    fontSize: Normalize(15),
                                    paddingVertical: 0,
                                    paddingHorizontal: Normalize(10),
                                    fontFamily: fontfmliy.bold,
                                    borderBottomColor: Colors.boxBorder,
                                    borderBottomWidth: 1,
                                    color: Colors.primary,
                                    width: Normalize(80),
                                    // textAlign: 'center',
                                    alignSelf: "center"
                                  }}
                                />
                              </View>
                              <Text style={[globalstyles.textinput_Header_Style, { alignSelf: "center", marginTop: Normalize(30) }]}>Estimated Budget</Text>
                            </View>
                        }
                      </View>
                  }
                </View>
                {/* open offer */}
                <View>
                  <Text
                    style={[
                      globalstyles.plantext_Outfit_Medium,
                      { textAlign: "left", marginTop: Normalize(60), color: Colors.greyText },
                    ]}>
                    Want EazyPay to send prices instead?
                  </Text>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={onpress_isopenOffer_checkbox}
                    style={{ flexDirection: "row", alignItems: "center", marginTop: Normalize(20) }} >
                    <View style={{ height: Normalize(18), width: Normalize(18), justifyContent: "center", alignItems: "center" }} >
                      <AntDesign
                        name="questioncircleo"
                        size={Normalize(16)}
                        color={Colors.greylightText}
                      />
                    </View>
                    <View style={{ flex: 1 }} >
                      <Text
                        style={[
                          globalstyles.plantext_outfit_regular,
                          { textAlign: "left", fontSize: Normalize(13), paddingLeft: Normalize(10), color: Colors.greylightText },
                        ]}>
                        Open to offers
                      </Text>
                    </View>
                    <View style={{ height: Normalize(18), width: Normalize(18), borderRadius: Normalize(18) / 2, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: isopenOffer ? Colors.secondary : Colors.greylightText }} >
                      {
                        isopenOffer &&
                        <FontAwesome
                          name='circle'
                          size={Normalize(11)}
                          color={Colors.secondary}
                        />}
                    </View>

                  </TouchableOpacity>
                </View>



              </View>


              {
                sucessPage && (
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={sucessPage}
                    onRequestClose={onTaskSucess}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          paddingVertical: Normalize(10),
                          width: Normalize(250),
                          backgroundColor: 'white',
                          borderRadius: Normalize(8),
                          paddingVertical: Normalize(10),
                        }}>
                        <View
                          style={{
                            height: Normalize(80),
                            width: Normalize(80),
                            backgroundColor: Colors.green_new_2,
                            borderRadius: Normalize(80) / 2,
                            position: 'absolute',
                            alignSelf: 'center',
                            top: -Normalize(40),
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Entypo
                            name="check"
                            size={Normalize(50)}
                            color={Colors.white}
                          />
                        </View>
                        <Text
                          style={[
                            globalstyles.plantext_Outfit_Medium,
                            {
                              paddingTop: Normalize(40),
                              textAlign: 'center',
                              fontSize: Normalize(19),
                              color: Colors.greyText,
                            },
                          ]}>
                          Success!
                        </Text>
                        <Text
                          style={[
                            globalstyles.plantext_outfit_regular,
                            {
                              paddingTop: Normalize(5),
                              textAlign: 'center',
                              fontSize: Normalize(13),
                              color: Colors.greyText,
                              paddingHorizontal: Normalize(10),
                              lineHeight: Normalize(16)
                            },
                          ]}>
                          {editOrpostsimilar == "edit" ? "Your task has updated successfully." : "Your Task has been successfully posted. Now relax and wait for offer from local EazyPayer."}
                        </Text>
                        <TouchableOpacity
                          onPress={onTaskSucess}
                          style={{
                            height: Normalize(35),
                            width: '80%',
                            backgroundColor: Colors.primary,
                            borderRadius: Normalize(8),
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginTop: Normalize(15),
                          }}>
                          <Text
                            style={[
                              globalstyles.plantext_Outfit_Medium,
                              { color: Colors.white, letterSpacing: Normalize(1) },
                            ]}>
                            Continue
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                )
              }



            </ScrollView>
            <Text
              style={[
                globalstyles.plantext_Outfit_Medium,
                { textAlign: 'center', marginTop: Normalize(20) },
              ]}>
              Step 3/3
            </Text>
            <Button
              onPress={submitButton}
              style={[styles.btnStyle, { marginBottom: Normalize(15) }]}
              name={"Post"}
            />
          </View>
          {
            loader && <NewLoaderPage />
          }

        </View>
      </KeyboardAvoidingView>

    </SafeAreaView>

  );
};

export default withRtl(EditTaskBudget);










