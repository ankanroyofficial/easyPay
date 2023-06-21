import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, Pressable, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import styles from './Styles';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import images from '../../../../constants/images';
import strings from '../../../../constants/lng/LocalizedStrings';
import { Colors } from '../../../../constants/colors';
import LoaderPage from '../../../../components/LoaderPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { engToPersian } from '../../../../constants/EnglishToPersian';
import { numberWithCommas, numberWithCommasinParsian } from '../../../../constants/NumberWithComma';
import moment from 'moment';
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import ImageModal from '../../../../components/ImageModal';
import { RefreshControl } from 'react-native';
import Pusher from 'pusher-js';
import { LogBox } from 'react-native';
import pusherConfig from './../../../../../pusher.json';
import { nameShorting } from '../../../../constants/NameShorting';
import { isInt, reviewShowinGraystar, reviewShowinStar, lastStar } from '../../../../constants/RatingCount';
import WarningPage from '../../../../components/WarningPage';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import ReviewOfferModal from '../../my_tasks/make_an_offer/ReviewOfferModal';
import ReviewOfferModalforSingle from '../../my_tasks/make_an_offer/ReviewOfferModalforSingle';
import IncreasepriceModal_For_Tasker from '../../my_tasks/make_an_offer/IncreasepriceModal_For_Tasker';
import IncreasepriceModal_For_Poster from '../../my_tasks/make_an_offer/IncreasepriceModal_For_Poster';
import ReviewRequestModal from '../../my_tasks/make_an_offer/ReviewRequestModal';
import Reschedule_Schedule from '../../my_tasks/make_an_offer/Reschedule_Schedule';
import ReviewScheduleRequestModal from '../../my_tasks/make_an_offer/ReviewScheduleRequestModal';
import GiveReviewModal from '../../my_tasks/make_an_offer/GiveReviewModal';
import { leftOrRight, rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import { myContext } from '../../../../constants/ContextApi';
import axiosInstance from '../../../../constants/AxiosCallPage';
import { whichFontFamily } from '../../../../constants/WhichFontFamily';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
function TaskDetailsinMsg({ navigation, show, master_id }) {

  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const {
    token, setToken,
    taskDetails,
    setTaskDetails,
    setApiImages,
    setMust_Have,
    setEditOrpostsimilar,
    allVerified,
    setAllVerified,
    setId,
    setCategory_id,
    setCategory_image,
    setSubcategory_id,
    setTitle,
    setDescription,
    setType,
    setTime,
    setDate,
    setBudget_type,
    setBudget,
    setHourly_rate,
    setNumber_of_hour,
    setLocation,
    setLat,
    setLng,
    setImage,
    setDate_type,
    setImageFinalArray,
    setY2,
    setD2,
    setM2,
    setPerShowDate,
    socketId, setSocketId,
    allMsg, setAllMsg
  } = useContext(myContext)
  const tomorrowDate = moment(new Date()).add(1, 'days').format("YYYY-MM-DD")
  // console.log("...", tomorrowDate)
  const scrollView = useRef();
  const [taskData, setTaskData] = useState(null)
  const [loader, setLoader] = useState(false)
  const [imageToggle, setImageToggle] = useState(false)
  const [userid, setUserid] = useState("");
  const [imageModal, setImageModal] = useState(false);
  const [reviewOfferModal, setReviewOfferModal] = useState(false);
  const [reviewmodalforsingle, setReviewmodalforsingle] = useState(false);
  const [imageUri, setImageUri] = useState("")
  const [questionFileName, setQuestionFileName] = useState("")
  const [dateConvert, setDateConvert] = useState("")
  const [assignee_Ques_Length, setAssignee_Ques_Length] = React.useState({ id: 0, expand: false })
  const [proposal_Ques_Length, setProposal_Ques_Length] = React.useState({ id: 0, expand: false })
  const [allquestion, setAllquestion] = useState([])
  const [questionImage, setQuestionImage] = useState(false)
  const [userSlugName, setUserSlugName] = useState("")
  const [refreshing, setRefreshing] = React.useState(false);
  const [proposalTextToggle, setProposalTextToggle] = React.useState({ id: 0, expand: false });
  const [proposalReplyTextToggle, setProposalReplyTextToggle] = React.useState({ id: 0, expand: false });
  const [taskDescriptionExpand, setTaskDescriptionExpand] = React.useState(false)
  const [singleProposalReplyID, setSingleProposalReplyID] = React.useState(0)
  const [warningModal, setWarningModal] = useState(false)
  const [increasepriceModal_tasker, setIncreasepriceModal_tasker] = useState(false)
  const [increasepriceModal_poster, setIncreasepriceModal_poster] = useState(false)
  const [reviewRequestModal_poster, setReviewRequestModal_poster] = useState(false)
  const [scheduleModal, setScheduleModal] = useState(false)
  const [reviewScheduleModal, setReviewScheduleModal] = useState(false)
  const [releaseModal, setReleaseModal] = useState(false)
  const [releaseRequestModal, setReleaseRequestModal] = useState(false)
  const [reviewModal, setReviewModal] = useState(false)
  const [func, setFunc] = useState(false)
  const [tierData, setTierData] = useState(null)

  LogBox.ignoreLogs(['Setting a timer for a long period of time'])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    autoLoad()
    Toast.show(strings.ERROR.REFRESHING)
    setRefreshing(false)
  }, [refreshing]);
  const getData2 = async () => {
    try {
      // let token = await AsyncStorage.getItem("token");
      let userid = await AsyncStorage.getItem("userid");
      let slug = await AsyncStorage.getItem("slug");
      setUserSlugName(slug)
      // setToken(token)
      setUserid(userid)
    } catch (error) {
      console.log("getData2", error)
    }
  }
  useEffect(() => {
    getData2()

    return () => {
      getData2()
    }
  }, []);

  const getData = async () => {
    try {
      setLoader(true)
      const res = {
        "params": {
          "slug": show,
        }
      }

      const data = await axiosInstance.post("get-message-details", res)

      if (data.data.task) {
        setTaskData(data.data.task)
        const date = data.data.task.date
        if (date != null) {
          englishDate(date)
        }
        setAllquestion(data.data.task.get_question)
        createDateEnglish(data.data.task.created_at)
        createDatePersian(data.data.task.created_at)
        setLoader(false)
      } else {
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
      console.log("getData - ", error)
    }
  }
  const getTireData = async () => {
    try {
      const res = await axiosInstance.post("my-dashboard")
      if (res.data.result) {
        setTierData(res.data.result.tier)
      }
    } catch (error) {
      console.log("getTireData", error)
      // setFunc3(false)
    }
  }
  useEffect(() => {
    const unsubscribe = tryWarningSolve_1()
    const willFocusSubscription = navigation.addListener('focus', () => {
      unsubscribe
    });
    return willFocusSubscription;
  }, [
    reviewOfferModal,
    reviewmodalforsingle,
    refreshing,
    increasepriceModal_tasker,
    reviewRequestModal_poster,
    increasepriceModal_poster,
    scheduleModal,
    reviewScheduleModal,
    releaseRequestModal,
    releaseModal,
    reviewModal,
    warningModal])

  const tryWarningSolve_1 = () => {
    getTireData()
    getData()
  }
  const getstatus = val => {
    var stat = "";
    if (val == 1) {
      stat = strings.BROWSEFILTER.DRAFT
    } else if (val == 2) {
      stat = strings.BROWSEFILTER.OPEN
    } else if (val == 3) {
      stat = strings.BROWSEFILTER.ASSIGNED
    } else if (val == 4) {
      stat = strings.BROWSEFILTER.COMPLETED
    } else if (val == 5) {
      stat = strings.BROWSEFILTER.COMPLETED
    } else if (val == 6 || val == 8) {
      stat = strings.BROWSEFILTER.CANCELLED
    }
    return stat;
  };
  const takeTime = (val) => {
    const dateParams = val.split(" ")
    const timeParams = dateParams[1].split(":")
    function addZero(i) {
      if (i < 10) { i = "0" + i }
      return i;
    }
    let h = addZero(timeParams[0]);
    let m = addZero(timeParams[1]);
    let s = addZero(timeParams[2]);
    let t = h + ":" + m + ":" + s;
    return timeformat(t)
  }
  const timeformat = val => {
    var time = "";
    var hour = 0;
    var min = 0;
    var f = "am";
    if (val.substr(0, 2) > 12) {
      hour = parseInt(val.substr(0, 2)) - 12
      if (hour < 10) {
        hour = "0" + hour
      } else {
        hour = hour
      }
      min = val.substr(3, 2)
      time = hour.toString() + ":" + min.toString() + " "
    } else {
      hour = val.substr(0, 2)
      min = val.substr(3, 2)
      time = hour.toString() + ":" + min.toString() + " "
    }
    if (val.substr(0, 2) > 11) {
      f = "pm"
    } else {
      f = "am"
    }
    return time + f;
  }
  const contextClean = () => {
    setId(""),
      setCategory_id(""),
      setCategory_image(""),
      setSubcategory_id(""),
      setTitle(""),
      setDescription(""),
      setType("O"),
      setTime(""),
      setDate(""),
      setBudget_type("T"),
      setBudget(""),
      setHourly_rate(""),
      setNumber_of_hour(""),
      setLocation(""),
      setLat(""),
      setLng(""),
      setImage([]),
      setDate_type("")
    setImageFinalArray([]),
      setY2(),
      setD2(),
      setM2(),
      setPerShowDate(""),
      setApiImages([]),
      setMust_Have([])
  }
  const imagesModalOpen = (val) => {
    setImageModal(!imageModal)
    setImageUri(val)
  }
  const englishDate = (val) => {
    let m = moment(val, 'YYYY-MM-DD').format('DD MMM, YYYY');
    setDateConvert(m)
  }
  const englishDate2 = (val) => {
    let m = moment(val, 'YYYY-MM-DD').format('DD MMM, YYYY');
    return m
  }
  const persianDate1 = (val) => {
    let test = moment(val, 'YYYY-MM-DD').locale('fa').format('DD-MM-YYYY');
    let testDateMonth = moment(val, 'DD-MM-YYYY').locale('fa').format('jMMMM');
    let testdateSplit = test.split("-")
    var removeZero = testdateSplit[0]

    if (removeZero[0] == 0) {
      var finalDate = engToPersian(removeZero[1]) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
      setDateConvert(finalDate)
    } else {
      var finalDate = engToPersian(testdateSplit[0]) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
      setDateConvert(finalDate)
    }
  }

  const persianDate = (val) => {
    let datemonthyear = moment(val, 'YYYY-MM-DD').locale('fa').format('YYYY/M/D');
    setDateConvert(engToPersian(datemonthyear))
  }



  const createDatePersian1 = (val) => {
    const a = val.substr(0, 10)
    let test = moment(a, 'YYYY-MM-DD').locale('fa').format('DD-MM-YYYY');
    let testDateMonth = moment(a, 'DD-MM-YYYY').locale('fa').format('jMMMM');
    let testdateSplit = test.split("-")
    var removeZero = testdateSplit[0]

    if (removeZero[0] == 0) {
      var finalDate = engToPersian(removeZero[1]) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
      return finalDate
    } else {
      var finalDate = engToPersian(testdateSplit[0]) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
      return finalDate
    }
  }

  const createDatePersian = (val) => {
    let datemonthyear = moment(val, 'YYYY-MM-DD').locale('fa').format('YYYY/M/D');
    return engToPersian(datemonthyear)
  }


  const createDateEnglish = (val) => {
    const a = val.substr(0, 10)
    let m = moment(a, 'YYYY-MM-DD').format('DD MMM, YYYY');
    return m
  }
  const onPressreviewOffer = () => {
    setReviewOfferModal(!reviewOfferModal)
  }
  const onPressreviewforsingle = () => {
    setReviewmodalforsingle(!reviewmodalforsingle)
  }
  const releaseRequestOnpress = () => {
    setReleaseRequestModal(!releaseRequestModal)
  }
  const releaseOnpress = () => {
    setReleaseModal(!releaseModal)
  }
  const imageOnpress = () => {
    setQuestionImage(!questionImage)
  }
  const onpressScheduleButton = () => {
    setScheduleModal(!scheduleModal)
  }
  const onpressReviewScheduleButton = () => {
    setReviewScheduleModal(!reviewScheduleModal)
  }
  const questionEnglishTimeShow = (val) => {
    const a = moment(val, "YYYY-MM-DD").format("Do MMM YYYY")
    const final_time = a + " " + "," + " " + takeTime(val)
    return final_time
  }
  const questionPersianTimeShow1 = (val) => {
    // console.log(val)
    const a = val.substr(0, 10)
    let test = moment(a, 'YYYY-MM-DD').locale('fa').format('DD-MM-YYYY');

    let testDateMonth = moment(a, 'DD-MM-YYYY').locale('fa').format('jMMMM');
    let testdateSplit = test.split("-")

    var final_time = ""

    var removeZero = testdateSplit[0]

    if (removeZero[0] == 0) {
      final_time = engToPersian(removeZero[1]) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
      return final_time
    } else {
      final_time = engToPersian(testdateSplit[0]) + " " + testDateMonth + " " + engToPersian(testdateSplit[2])
      return final_time
    }
  }

  const questionPersianTimeShow = (val) => {
    const a = val.substr(0, 10)
    let datemonthyear = moment(a, 'YYYY-MM-DD').locale('fa').format('YYYY/M/D');
    return engToPersian(datemonthyear)
  }





  const MakeanofferButton = ({ onPress, disabled, title }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} disabled={disabled}
        onPress={onPress}
        // onPress={onPressMakeOffer}
        style={{ height: "63%", width: "90%", backgroundColor: disabled ? Colors.disableBackGround : Colors.secondary, borderRadius: Normalize(20), justifyContent: "center", alignItems: "center", marginBottom: Normalize(12) }}>
        <Text style={{ fontFamily: 'Outfit-SemiBold', fontSize: Normalize(15), color: disabled ? Colors.disableText : Colors.white, }}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }
  const OfferTypeBox = () => (
    <View style={[styles.containermakeoffer]}>
      <View style={{ flex: 1.3, justifyContent: "center", alignItems: "center" }}>

        <Text style={{ fontSize: Normalize(14), marginBottom: Normalize(10), fontFamily: 'Outfit-Regular', color: '#818181' }}>
          {strings.TASKDETAILS.BUDGET}
        </Text>
        {
          taskData.budget <= 0 ?
            <Text style={{
              fontSize: Normalize(20),
              color: Colors.green_new_2,
              fontFamily: 'Outfit-Medium',
              paddingHorizontal: "1.5%"
            }}>Open Offer</Text>
            :
            <Text style={styles.priceText}>{strings.BROWSEFILTER.TOMAN} {numberWithCommas(taskData.budget)}</Text>
        }
      </View>
      <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", justifyContent: "center" }}>
        {
          taskData.status == 2 ?
            null
            :
            taskData.status == 6 ?
              <MakeanofferButton
                color={Colors.lightGrey}
                // onPress={() => console.log("pkkkk")}
                disabled={true}
                title={strings.TASKDETAILS.CANCELLED}
              /> :
              taskData.status == 3 ?
                taskData.user_id == userid || taskData.get_bid.user_id == userid ?
                  <MakeanofferButton
                    // title={strings.TASKDETAILS.PRIVATEMESSAGE}
                    title={"cccccccccccccc"}
                  />
                  :
                  <MakeanofferButton
                    // color={Colors.lightGrey}
                    // onPress={() => console.log("assign task")}
                    disabled={true}
                    title={strings.TASKDETAILS.ASSIGNTASK}
                  />
                :
                taskData.status == 4 ?
                  <MakeanofferButton
                    disabled={false}
                    // color={Colors.secondary}
                    title={strings.TASKDETAILS.REVIEW}
                  />
                  :
                  <MakeanofferButton
                    disabled={true}
                    title={strings.BROWSEFILTER.COMPLETED}
                  />
        }
      </View>
    </View>
  )
  const getSocketId = () => {
    const pusher = new Pusher(pusherConfig.key, pusherConfig);

    //  let channel = pusher.subscribe("eazypay-development");
    //  console.log(channel)
    pusher.connection.bind("connected", () => {
      var socketId = pusher.connection.socket_id;
      setSocketId(socketId)
      // console.log(socketId)
    });

  }
  const autoLoad = async () => {
    try {
      setFunc(true)
      // let token2 = await AsyncStorage.getItem("token");
      const res = {
        "params": {
          "slug": show,
        }
      }

      const data = await axiosInstance.post("get-message-details", res)
      // console.log("data.data.result",data.data.result.task.slug)
      if (data.data.task) {
        setTaskData(data.data.task)
        setAllquestion(data.data.task.get_question)
        setFunc(false)
      } else {
        setFunc(false)
      }
    } catch (error) {
      setFunc(false)
      console.log("autoLoad - ", error)
    }
  }
  const getAllData = () => {
    const pusher = new Pusher(pusherConfig.key, pusherConfig);
    let channel = pusher.subscribe("eazypay-development");
    pusher.connection.bind("connected", () => {
      var socketid = pusher.connection.socket_id;
      setSocketId(socketid)
    });
    channel.bind('question-event', function (data) {
      // console.log("taskDetails0",data)
      func ? null : autoLoad()

    })
    channel.bind('bid-apply-event', function (data) {
      if (data) {
        // console.log("taskDetails1",data)
        func ? null : autoLoad()
      }
    })
    channel.bind('bid-withdraw-event', function (data) {
      if (data) {
        // console.log("taskDetails2",data)
        func ? null : autoLoad()
      }
    })
    channel.bind('bid-update-event', function (data) {
      if (data) {
        // console.log("taskDetails3",data)
        func ? null : autoLoad()
      }
    })
    channel.bind('bid-reply-event', function (data) {
      if (data) {
        // console.log("taskDetails4",data)
        func ? null : autoLoad()
      }
    })
    channel.bind('task-assign-event', function (data) {
      if (data) {
        // console.log("taskDetails5",data)
        func ? null : autoLoad()
      }
    })
    // channel.bind('message-event', function (data) {
    //   console.log("message3", data)
    //   if (data) {
    //     console.log("message4", data)
    //   }
    // })
  }
  useEffect(() => {
    getSocketId()
    getAllData()
  }, [])
  const assigneeeDescriptionReadMore = (val) => {
    if (proposalTextToggle.id == val && proposalTextToggle.expand == true) {
      setProposalTextToggle({ id: val, expand: false })
    } else {
      setProposalTextToggle({ id: val, expand: true })
    }
  }


  const readMore_assignee = (val) => {
    if (assignee_Ques_Length.id == val && assignee_Ques_Length.expand == true) {
      setAssignee_Ques_Length({ id: val, expand: false })
    } else {
      setAssignee_Ques_Length({ id: val, expand: true })
    }
  }

  const readMore_proposal = (val) => {
    if (proposal_Ques_Length.id == val && proposal_Ques_Length.expand == true) {
      setProposal_Ques_Length({ id: val, expand: false })
    } else {
      setProposal_Ques_Length({ id: val, expand: true })
    }
  }


  const assigneeeReplyReadMore = (val) => {
    if (proposalReplyTextToggle.id == val && proposalReplyTextToggle.expand == true) {
      setProposalReplyTextToggle({ id: val, expand: false })
    } else {
      setProposalReplyTextToggle({ id: val, expand: true })
    }
  }
  const onpressincreasepriceModal_For_Tasker = () => {
    setIncreasepriceModal_tasker(!increasepriceModal_tasker)
  }
  const onpressincreasepriceModal_For_Poster = () => {
    setIncreasepriceModal_poster(!increasepriceModal_poster)
  }
  const onpressreviewRequestModal = () => {
    setReviewRequestModal_poster(!reviewRequestModal_poster)
  }
  const onpressReviewButton = () => {
    setReviewModal(!reviewModal)
  }
  const onpressReleaseRequest = async () => {
    try {
      setLoader(true)
      const data = {
        "params": {
          "slug": taskData.slug
        }
      }

      const res = await axiosInstance.post("release-request", data)

      // console.log(res.data)
      if (res.data.status == "1") {
        releaseRequestOnpress()
        setLoader(false)
        // Toast.show("Release request send successfully")       
        Toast.show(res.data.result.status.meaning)
      } else {
        Toast.show(res.data.error.message)
        setLoader(false)
      }
    } catch (error) {
      console.log("onpressReleaseRequest", error)
      setLoader(false)
    }
  }
  const onpressRelease = async () => {
    try {
      setLoader(true)
      const socket_id = parseFloat(socketId)
      const data = {
        "params": {
          "slug": taskData.slug,
          "socket_id": socket_id
        }
      }
      const res = await axiosInstance.post("release-payment", data)

      if (res.data.status == "1") {
        releaseOnpress()
        // Toast.show("Release payment successfully")
      } else {
        Toast.show(res.data.error.message)
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log("onpressRelease", error)
    }
  }


  const detect_SpanTag = (val) => {

    // let a = val
    // let b = a.split(`<span style="color:#0e148b">`)

    // console.log(val)
    let a = val
    let b = a.split(`<span style="color:#0e148b">`)
    // console.log("after split length", b.length)
    if (b.length === 1) {
      return val
    } else {
      let c = b[1].split("</span>")
      // console.log("**********", c)
      return <Text>{b[0]} <Text style={{ color: Colors.primary }} >{c[0]}</Text> {c[1]}</Text>
    }
  }
  return (
    <>
      {
        loader ? <LoaderPage />
          :
          taskData == null || tierData === null ?
            <LoaderPage />
            :
            <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
              <View style={{ flex: 1, backgroundColor: Colors.white }} >
                <CurveDesing_Component  >
                  <View style={[globalstyles.container_only_padding, {}]}>
                    <View >
                      <ScrollView
                        refreshControl={
                          <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                          />
                        }
                        ref={scrollView}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Normalize(20) }}
                      >


                        {/* *******************top warning box for reschulde time************ */}

                        {taskData.status == 3 &&
                          (taskData.get_all_bid != undefined && taskData.get_tasker_reschedule_request != null &&
                            (
                              taskData.get_tasker_reschedule_request.status &&
                              (
                                taskData.get_tasker_reschedule_request.status == "I" ?             //   for this if condition,   (taskData.user_id != userid &&) added
                                  taskData.user_id == userid ?
                                    <>
                                      <View style={{ padding: Normalize(10), marginHorizontal: 15, marginTop: 15, backgroundColor: "#fbedd5", borderRadius: 6 }} >
                                        <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center", alignItems: "center", }} >
                                          <View style={{ height: Normalize(38), width: Normalize(38) }} >
                                            <Image source={images.yellow_info} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                          </View>
                                          <View style={{ flex: 1 }} >

                                            {
                                              language == "en" &&
                                              <Text style={{ textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: 13, fontFamily: 'Outfit-Medium', color: "#434648" }}>
                                                {`${nameShorting(taskData.get_bid[0].get_user.fname + " " + taskData.get_bid[0].get_user.lname)} Your rescheduled  ${englishDate2(taskData.get_tasker_reschedule_request.reschedule_date)} for this task`}
                                              </Text>
                                            }

                                            {
                                              language == "pr" &&
                                              <View style={{ flexDirection: rowOrRowreverse(language) }} >
                                                <Text style={{ textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: 13, fontFamily: 'Outfit-Medium', color: Colors.greyText }}>یک درخواست زمانبندی مجدد از طرف مجری کار برای شما ارسال شده است.</Text>

                                                {/* <Text style={{ textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: 13, fontFamily: 'Outfit-Medium', color: "#434648" }}>{nameShorting(taskData.get_bid[0].get_user.fname + " " + taskData.get_bid[0].get_user.lname)}</Text> */}
                                                {/* <Text style={{ textAlign: language == "en" ? "left" : "right", fontSize: 13, fontFamily: 'Outfit-Medium', color: "#434648" }}>{`شما برای این کار ${questionPersianTimeShow(taskData.get_tasker_reschedule_request.reschedule_date)} برنامه ریزی کردید`}</Text> */}
                                              </View>
                                            }
                                          </View>
                                        </View>
                                        <TouchableOpacity
                                          onPress={onpressReviewScheduleButton}
                                          style={{ height: Normalize(25), backgroundColor: "#e9a52c", borderRadius: 20, marginTop: 15, justifyContent: "center", alignItems: "center", alignSelf: language == "pr" ? "flex-start" : "flex-end" }} >
                                          <Text style={{ fontSize: Normalize(10), fontFamily: 'Outfit-Medium', color: Colors.white, paddingHorizontal: Normalize(8) }}>{strings.TASKDETAILS.VIEWRESCHEDULEREQUEST}</Text>
                                        </TouchableOpacity>
                                      </View>

                                      <ReviewScheduleRequestModal
                                        ispress={reviewScheduleModal}
                                        onPress={onpressReviewScheduleButton}
                                        taskSlugname={taskData.slug}
                                        name={nameShorting(taskData.get_all_bid[0].get_user.fname + " " + taskData.get_all_bid[0].get_user.lname)}
                                        imageName={taskData.get_all_bid[0].get_user.profile_picture}
                                        reason={taskData.get_tasker_reschedule_request.reschedule_reason}
                                        oldDate={taskData.date != null ? taskData.date : tomorrowDate}
                                        requesteddate={taskData.get_tasker_reschedule_request.reschedule_date}

                                      />
                                    </>
                                    :
                                    <View style={{ padding: Normalize(10), marginHorizontal: 15, marginTop: 15, backgroundColor: "#fbedd5", borderRadius: 6 }} >

                                      <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center", alignItems: "center", }} >
                                        <View style={{ height: Normalize(38), width: Normalize(38) }} >
                                          <Image source={images.yellow_info} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                        </View>
                                        <View style={{ flex: 1 }} >
                                          <Text style={{ textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: 13, fontFamily: 'Outfit-Medium', color: "#434648" }}>
                                            {
                                              language == "en" ?

                                                `Your rescheduled date ${englishDate2(taskData.get_tasker_reschedule_request.reschedule_date)} is pending confirmation`
                                                :
                                                `تاریخ تجدید برنامه ریزی شده شما ${questionPersianTimeShow(taskData.get_tasker_reschedule_request.reschedule_date)} در انتظار تأیید است`

                                            }
                                          </Text>
                                        </View>
                                      </View>
                                      <TouchableOpacity
                                        onPress={onpressScheduleButton}
                                        style={{ height: Normalize(25), backgroundColor: "#e9a52c", width: language == "en" ? Normalize(100) : Normalize(110), borderRadius: 20, marginTop: 15, justifyContent: "center", alignItems: "center", alignSelf: language == "pr" ? "flex-start" : "flex-end" }} >
                                        <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: Colors.white, paddingHorizontal: Normalize(15) }}>{strings.TASKDETAILS.EDITREQUEST}</Text>
                                      </TouchableOpacity>
                                    </View>
                                  :
                                  // ***************************for reject**************
                                  taskData.user_id != userid &&
                                    taskData.get_tasker_reschedule_request.status == "R" ?
                                    <View style={{ padding: Normalize(10), marginHorizontal: 15, marginTop: 15, flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center", alignItems: "center", backgroundColor: "#fadcda", borderRadius: 6 }} >
                                      <View style={{ height: Normalize(38), width: Normalize(38), justifyContent: "center", alignItems: "center" }} >
                                        <Image source={images.crosinf} style={{ height: "90%", width: "90%", resizeMode: "contain" }} />
                                      </View>
                                      <View style={{ flex: 1 }} >
                                        <Text style={{ textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: 13, fontFamily: 'Outfit-Medium', color: "#434648" }}>
                                          {
                                            language == "en" ?
                                              `Your reschedule request was not accepted. Please get in touch with ${nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)} and talk through the next steps to help complete the task.`
                                              :
                                              "درخواست زمانبندی مجدد شما از طرف کارفرما پذیرفته نشد. لطفا در ارتباط با مراحل بعدی انجام کار و تکمیل آن با کارفرمای مربوطه در تماس باشید."
                                          }
                                        </Text>
                                      </View>
                                    </View>
                                    :
                                    // ******************for complete************************
                                    taskData.user_id != userid &&
                                    <View style={{ padding: Normalize(10), marginHorizontal: 15, marginTop: 15, flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center", alignItems: "center", backgroundColor: "#fadcda", borderRadius: 6 }} >
                                      <View style={{ height: Normalize(38), width: Normalize(38), justifyContent: "center", alignItems: "center" }} >
                                        <Image source={images.crosinf} style={{ height: "90%", width: "90%", resizeMode: "contain" }} />
                                      </View>
                                      <View style={{ flex: 1 }} >
                                        <Text style={{ textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: 13, fontFamily: 'Outfit-Medium', color: "#434648" }}>
                                          {language == "en" ?
                                            `Your reschedule request limit is over. Please get in touch with ${nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)} and talk through the next steps to help complete the task.`
                                            :
                                            // `محدودیت درخواست زمان‌بندی مجدد شما به پایان رسیده است. لطفاً با ${nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)} تماس بگیرید و مراحل بعدی را برای کمک به تکمیل کار صحبت کنید.`
                                            `تبریک ، درخواست زمانبندی جدید از طرف کارفرما پذیرفته شد. لطفا در ارتباط با مراحل بعدی انجام کار و تکمیل آن با کارفرمای مربوطه در تماس باشید.`
                                          }
                                        </Text>
                                      </View>
                                    </View>
                              )

                            ))
                        }


                        {/* *******************top warning box for increase price************ */}

                        {taskData.status == 3 &&
                          (taskData.get_tasker_increase_payment != null && taskData.get_tasker_increase_payment.tasker_id == userid ?
                            taskData.status == 3 & taskData.get_tasker_increase_payment.status == "R" ?
                              <View style={{ padding: Normalize(10), marginHorizontal: 15, marginTop: 15, flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center", alignItems: "center", backgroundColor: "#fadcda", borderRadius: 6 }} >
                                <View style={{ height: Normalize(38), width: Normalize(38), justifyContent: "center", alignItems: "center" }} >
                                  <Image source={images.crosinf} style={{ height: "90%", width: "90%", resizeMode: "contain" }} />
                                </View>
                                <View style={{ flex: 1 }} >
                                  <Text style={{ textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: 13, fontFamily: 'Outfit-Medium', color: "#434648" }}>
                                    {
                                      language == "en" ?
                                        `Your price increase was not accepted. Please get in touch with ${nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)} and talk through the next steps to help complete the task.`
                                        :
                                        // `درخواست افزایش قیمت شما پذیرفته نشد. لطفا با پیمانکار مربوطه در تماس باشید ${nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)} و در مورد مراحل بعدی انجام کار و تکمیل آن صحبت کنید.`
                                        `درخواست افزایش قیمت شما پذیرفته نشد. لطفا با کارفرمای مربوطه در تماس باشید و در مورد مراحل بعدی انجام کار و تکمیل آن صحبت کنید.`
                                    }
                                  </Text>
                                </View>
                              </View>
                              : taskData.get_tasker_increase_payment.status == "I" &&
                              <View style={{ padding: Normalize(10), marginHorizontal: 15, marginTop: 15, flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center", alignItems: "center", backgroundColor: "#fbedd5", borderRadius: 6 }} >
                                <View style={{ height: Normalize(38), width: Normalize(38) }} >
                                  <Image source={images.yellow_info} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                </View>
                                <View style={{ flex: 1 }} >
                                  <Text style={{ textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: 13, fontFamily: 'Outfit-Medium', color: "#434648" }}>
                                    {
                                      language == "en" ?
                                        `Your price increase request of $ ${addCommaAndTranslateInPersian((Math.round(taskData.get_tasker_increase_payment.amount)), language)} is pending. Please get in touch with ${nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)} and talk through the next steps to help complete the task.`
                                        :
                                        // `درخواست افزایش قیمت شما ${addCommaAndTranslateInPersian((Math.round(taskData.get_tasker_increase_payment.amount)), language)} تومان در انتظار است. لطفا در پیمانکار مربوطه در تماس باشید ${nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)} و در مورد مراحل بعدی انجام کار و تکمیل آن صحبت کنید.`
                                        "درخواست افزایش قیمت شما با موفقیت ارسال گردید. لطفا با کارفرمای مربوطه در تماس باشید و در مورد مراحل بعدی انجام کار و تکمیل آن صحبت کنید."
                                    }

                                  </Text>
                                </View>
                              </View>
                            :
                            null)
                        }
                        <View style={{ flexDirection: 'column' }}>
                          <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", paddingVertical: Normalize(15), justifyContent: 'space-between' }}>
                            <View style={{ flex: 1 }} >
                              <Text style={[globalstyles.blue_Text, { fontFamily: "Outfit-Medium", fontSize: Normalize(14) }]}>
                                {taskData.title}
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() => {
                                taskData.get_user.slug == userSlugName ?
                                  navigation.navigate("MyProfile", { PublicSlug: taskData.get_user.slug }) :
                                  navigation.navigate("PublicProfile", { PublicSlug: taskData.get_user.slug })
                              }}
                            >
                              <Image source={images.info_Red}
                                style={{ height: Normalize(15), width: Normalize(15), marginLeft: Normalize(3) }}
                              />
                            </TouchableOpacity>
                          </View>

                          <View style={{ width: '99%', alignSelf: "center", paddingBottom: Normalize(10), borderRadius: Normalize(8), elevation: Normalize(1.5), backgroundColor: Colors.white }} >

                            <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", padding: Normalize(15) }}>
                              {
                                taskData.get_user.profile_picture != null ?
                                  <Image
                                    source={{ uri: ImageLink.ProfilePhoto + `${taskData.get_user.profile_picture}` }}
                                    style={[styles.thumbIconStyle, { resizeMode: "cover" }]}
                                  />
                                  :
                                  <Image
                                    source={{ uri: ImageLink.BlankProfileImage }}
                                    style={[styles.thumbIconStyle, { resizeMode: "cover" }]}
                                  />
                              }
                              <View style={{ flexDirection: 'column', marginHorizontal: Normalize(15), alignSelf: 'center' }}>
                                <Text style={[globalstyles.grey_Text_Outfit_Regular, { color: "#343535", marginVertical: Normalize(0), fontSize: Normalize(13) }]}>
                                  {strings.TASKDETAILS.POSTEDBY}
                                </Text>
                                <Text
                                  onPress={() => {
                                    taskData.get_user.slug == userSlugName ?
                                      navigation.navigate("MyProfile", { PublicSlug: taskData.get_user.slug }) :
                                      navigation.navigate("PublicProfile", { PublicSlug: taskData.get_user.slug })
                                  }}
                                  style={[globalstyles.blue_Text, { marginVertical: Normalize(0) }]}>{nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)}</Text>


                                <Text style={[globalstyles.grey_Text_Outfit_Regular, { fontSize: Normalize(13) }]}>
                                  Posted on : {createDateEnglish(taskData.created_at)}
                                </Text>
                              </View>
                            </View>
                            <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", paddingLeft: Normalize(15), marginVertical: Normalize(7) }}>
                              <Image source={images.task_C}
                                style={styles.iconStyle3}
                              />
                              <View style={{ flexDirection: 'column', marginRight: Normalize(15), marginLeft: Normalize(15), marginLeft: Normalize(15), alignSelf: 'center' }}>
                                <Text style={globalstyles.taskdetails_category_subcate}>
                                  {strings.TASKDETAILS.CATEGORY}
                                </Text>
                                <Text style={[globalstyles.taskdetails_category_subcate, { color: "#343535" }]}>
                                  {taskData.get_category.name ? taskData.get_category.name : ""}
                                </Text>
                              </View>
                            </View>
                            <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", paddingLeft: Normalize(15), marginVertical: Normalize(7) }}>
                              <Image source={images.task_C}
                                style={styles.iconStyle3}
                              />
                              <View style={{ flexDirection: 'column', marginRight: Normalize(15), marginLeft: Normalize(15), marginLeft: Normalize(15), alignSelf: 'center' }}>
                                <Text style={globalstyles.taskdetails_category_subcate}>
                                  {strings.TASKDETAILS.SUBCATAGORY}
                                </Text>
                                <Text style={[globalstyles.taskdetails_category_subcate, { color: "#343535" }]}>
                                  {taskData.get_subcategory.name ? taskData.get_subcategory.name : ""}
                                </Text>
                              </View>
                            </View>
                            <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", marginVertical: Normalize(7), paddingLeft: Normalize(15), width: '100%', alignItems: "flex-start" }}>
                              <Image source={images.task_L}
                                style={{
                                  width: Normalize(22),
                                  height: Normalize(22),
                                  marginHorizontal: Normalize(5),
                                  marginRight: 8,
                                  opacity: 0.9
                                }}
                                resizeMode="contain"
                              />
                              <View style={{
                                flex: 1, flexDirection: 'column', marginHorizontal: Normalize(15), alignSelf: 'center'
                              }} >
                                <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center" }}  >
                                  <Text style={globalstyles.taskdetails_category_subcate}>
                                    {strings.BROWSEFILTER.LOCATION}
                                  </Text>
                                  {
                                    taskData.lat &&
                                    <Text
                                      onPress={() => {
                                        navigation.navigate('SingleBrowseMap', { lat: taskData.lat, lng: taskData.lng, slug: taskData.slug, item: taskData })
                                      }}
                                      style={[globalstyles.plantext_Outfit_Medium, { fontFamily: 'Outfit-SemiBold', color: Colors.primary, marginLeft: Normalize(4), fontSize: Normalize(12) }]} >{strings.TASKDETAILS.SHOWMAP}</Text>
                                  }
                                </View>
                                <Text style={[globalstyles.taskdetails_category_subcate, { color: "#343535" }]}>
                                  {taskData.location != null ? taskData.location : strings.MYTASKSCREEN.REMOTE}
                                </Text>
                              </View>
                            </View>
                            <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", paddingLeft: Normalize(15), marginVertical: Normalize(7) }}>
                              <Image source={images.task_D}
                                style={styles.iconStyle2}
                              />
                              <View style={{ flexDirection: 'column', marginRight: Normalize(15), marginLeft: Normalize(15) }}>
                                <Text style={globalstyles.taskdetails_category_subcate}>
                                  {strings.TASKDETAILS.DUEDATE}
                                </Text>
                                {/* {taskData.date == null &&
                                  <Text style={[globalstyles.taskdetails_category_subcate, { color: "#343535" }]}>
                                    {taskData.date_type == "F" ? "Flexible" : taskData.date_type == "B" ? "As soon as possible" : "error in date"}
                                  </Text>
                                } */}

                                  <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center", justifyContent: "space-between" }} >
                                    <Text style={[globalstyles.taskdetails_category_subcate, { color: "#343535" }]}>
                                    { taskData.date!=null? dateConvert:taskData.date_type == "F" ? "Flexible" : taskData.date_type == "B" ? "As soon as possible" : "error in date"}
                                    </Text>
                                    {taskData.status == 3 &&

                                      (taskData.is_dispute != "Y" &&

                                        (taskData.get_all_bid != undefined &&
                                          (taskData.user_id == userid ?
                                            taskData.get_tasker_reschedule_request == null ?
                                              <Text
                                                onPress={onpressScheduleButton}
                                                style={{ color: Colors.primary, fontSize: Normalize(11), paddingHorizontal: "2%", fontFamily: 'Outfit-Medium', marginHorizontal: Normalize(25) }}>{strings.TASKDETAILS.RESCHEDULE}</Text>
                                              :
                                              taskData.get_tasker_reschedule_request.status &&
                                              taskData.get_tasker_reschedule_request.status != "I" &&
                                              <Text
                                                onPress={onpressScheduleButton}
                                                style={{ color: Colors.primary, fontSize: Normalize(11), paddingHorizontal: "2%", fontFamily: 'Outfit-Medium', marginHorizontal: Normalize(25) }}>{strings.TASKDETAILS.RESCHEDULE}</Text>
                                            :
                                            taskData.get_tasker_reschedule_request == null &&
                                            <Text
                                              onPress={onpressScheduleButton}
                                              style={{ color: Colors.primary, fontSize: Normalize(11), paddingHorizontal: "2%", fontFamily: 'Outfit-Medium', marginHorizontal: Normalize(25) }}>{strings.TASKDETAILS.RECHEDULEREQUEST}</Text>
                                          )))

                                    }
                                    {scheduleModal &&
                                      (taskData.get_all_bid != undefined &&
                                        <Reschedule_Schedule
                                          ispress={scheduleModal}
                                          onPress={onpressScheduleButton}
                                          taskSlugname={taskData.slug}
                                          dueDate={taskData.date != null ? taskData.date : tomorrowDate}
                                          reschedule_request_by={taskData.user_id == userid ? "poster" : "tasker"}
                                          item={taskData.get_tasker_reschedule_request}
                                        />)
                                    }
                                  </View>
                                
                              </View>
                            </View>

                          </View>

                          {/* ********make an offer******* */}
                          {
                            taskData.status == 2 ?
                              null
                              :

                              taskData.status == 3 ?
                                taskData.user_id == userid ?
                                  // ***********  PRIVATE MESSAGE   ************
                                  <View style={{
                                    width: '99%',
                                    height: Normalize(210),
                                    marginTop: Normalize(20),
                                    alignSelf: 'center',
                                    backgroundColor: '#ffffff',
                                    borderColor: Colors.grey,
                                    borderRadius: Normalize(8),
                                    borderWidth: .5
                                  }}>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                      <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center", marginBottom: Normalize(10), }} >
                                        <View style={{ height: Normalize(14), width: Normalize(14), marginHorizontal: Normalize(5) }} >
                                          <Image source={images.paymentSecure} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                        </View>
                                        <Text style={{ fontSize: Normalize(14), fontFamily: 'Outfit-Regular', color: '#818181' }}>{strings.TASKDETAILS.PAYMENTSECURE}</Text>
                                      </View>
                                      <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                        <Text style={[styles.priceText, { paddingHorizontal: "1.5%" }]}> {strings.BROWSEFILTER.TOMAN}</Text>
                                        <Text style={styles.priceText}> {addCommaAndTranslateInPersian(Math.round(taskData.amount), language)}</Text>
                                      </View>
                                    </View>
                                    <View style={{ height: Normalize(77), width: "100%", marginBottom: Normalize(3) }} >

                                      {
                                        (taskData.get_tasker_increase_payment != null && taskData.get_tasker_increase_payment.tasker_id != userid &&
                                          taskData.get_tasker_increase_payment.status == "I") ?
                                          <View style={{ flex: 1 }} >
                                            <View style={{ flex: 1, backgroundColor: "#fbedd5", justifyContent: "space-evenly", alignItems: "center", flexDirection: language == "en" ? "row" : "row-reverse" }}>
                                              <Text style={{ fontSize: 15, fontFamily: 'Outfit-Medium', color: Colors.greyText, marginHorizontal: Normalize(3) }} >{strings.MAKEANOFFER.WAITINGFORINCREASE}</Text>
                                              <View style={{ flexDirection: rowOrRowreverse(language) }} >
                                                <Text style={{ fontSize: 15, fontFamily: 'Outfit-Medium', color: Colors.greyText }} >{addCommaAndTranslateInPersian(Math.round(taskData.get_tasker_increase_payment.amount), language)}</Text>
                                                <Text style={{ fontSize: 15, fontFamily: 'Outfit-Medium', color: Colors.greyText, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                              </View>
                                            </View>

                                            <View style={{ flex: 0.5, flexDirection: language == "en" ? "row" : "row-reverse" }} />
                                          </View>

                                          :
                                          <View style={{ flex: 1 }} >
                                            <View style={{ flex: 0.5, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                                <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{strings.MAKEANOFFER.BOOKINGFEE}</Text>
                                              </View>
                                              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: 'row' }} >
                                                <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                                <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{language == "en" ? numberWithCommas(Math.round(taskData.booking_fees)) : engToPersian(numberWithCommasinParsian(Math.round(taskData.booking_fees)))}</Text>
                                              </View>
                                            </View>
                                            <View style={{ flex: 0.7, backgroundColor: Colors.primary, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                                <Text style={{ fontSize: 15, fontFamily: 'Outfit-Medium', color: Colors.white, marginHorizontal: Normalize(3) }} >{strings.TASKDETAILS.YOUPAID}</Text>
                                              </View>
                                              <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", }} >
                                                <Text style={{ fontSize: 15, fontFamily: 'Outfit-Medium', color: Colors.white, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                                <Text style={{ fontSize: 15, fontFamily: 'Outfit-Medium', color: Colors.white }} >{numberWithCommas(Math.round(taskData.amount) + Math.round(taskData.booking_fees))}</Text>
                                              </View>
                                            </View>
                                          </View>
                                      }









                                    </View>
                                    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", justifyContent: "center" }}>
                                      {
                                        taskData.is_dispute == "Y"
                                          ?
                                          <MakeanofferButton
                                            disabled={true}
                                            title={strings.TASKDETAILS.RELEASE}
                                          />




                                          :
                                          taskData.user_id == userid ?
                                            taskData.get_tasker_increase_payment == null || taskData.get_tasker_increase_payment.status == "R" || taskData.get_tasker_increase_payment.status == "C" ?
                                              <>
                                                <MakeanofferButton
                                                  onPress={releaseOnpress}
                                                  // title={taskData.release_request_date == null ? strings.TASKDETAILS.RELEASE : "Tasker requested"}
                                                  title={taskData.release_request_date == null ? strings.TASKDETAILS.RELEASE : strings.TASKDETAILS.TASKERREQUEST}
                                                />

                                                {releaseModal &&
                                                  <WarningPage
                                                    onPress={releaseOnpress}
                                                    ispress={releaseModal}
                                                    warningSubTitle={strings.TASKDETAILS.AREYOUSURERELEASEPAYMENT}
                                                    warningTitle={language == 'en' ? 'Are you Sure?' : "آیا مطمئن هستید؟"}
                                                    okOnpress={onpressRelease}
                                                    cancelOnpress={releaseOnpress} />
                                                }

                                                {/* <WarningPage
                                            onPress={releaseOnpress}
                                            ispress={releaseModal}
                                            warningTitle={strings.TASKDETAILS.RELEASE}
                                            warningSubTitle={language == 'en' ? 'Are you Sure?' : "آیا مطمئن هستید؟"}
                                            okOnpress={onpressRelease}
                                            cancelOnpress={releaseOnpress} /> */}
                                              </>
                                              :
                                              <>
                                                <MakeanofferButton
                                                  onPress={onpressreviewRequestModal}
                                                  title={strings.TASKDETAILS.REVIEWREQUEST}
                                                />
                                                <ReviewRequestModal
                                                  ispress={reviewRequestModal_poster}
                                                  onPress={onpressreviewRequestModal}
                                                  taskSlugname={taskData.slug}
                                                  taskBudget={taskData.budget}
                                                  name={nameShorting(taskData.get_all_bid[0].get_user.fname + " " + taskData.get_all_bid[0].get_user.lname)}
                                                  imageName={taskData.get_all_bid[0].get_user.profile_picture}
                                                  previousAmount={Math.round(taskData.get_all_bid[0].amount)}
                                                  description={taskData.get_tasker_increase_payment.description}
                                                  item={taskData.get_tasker_increase_payment}
                                                />
                                              </>
                                            :
                                            taskData.release_request_date == null ?
                                              <>

                                                <MakeanofferButton
                                                  onPress={releaseRequestOnpress}
                                                  title={strings.TASKDETAILS.RELEASEREQUEST}
                                                />

                                                {/* <WarningPage
                                            onPress={releaseRequestOnpress}
                                            ispress={releaseRequestModal}
                                            warningTitle={language === "en" ? "Are you sure?" : "آیا مطمئن هستید؟"}
                                            warningSubTitle={language == 'en' ? 'Are you sure you want to release payment?' : "آیا مطمئن هستید که می خواهید آزاد سازی را اعمال کنید؟"}
                                            okOnpress={onpressReleaseRequest}
                                            cancelOnpress={releaseRequestOnpress} /> */}


                                                {releaseRequestModal &&
                                                  <WarningPage
                                                    onPress={releaseRequestOnpress}
                                                    ispress={releaseRequestModal}
                                                    warningTitle={language === "en" ? "Are you sure?" : "آیا مطمئن هستید؟"}
                                                    warningSubTitle={language == 'en' ? 'Are you sure you want to release payment?' : "آیا از ارسال درخواست آزادسازی مبلغ پروژه اطمینان دارید؟"}
                                                    okOnpress={onpressReleaseRequest}
                                                    cancelOnpress={releaseRequestOnpress} />
                                                }




                                              </>
                                              :

                                              <MakeanofferButton
                                                disabled={true}
                                                onPress={releaseRequestOnpress}
                                                title={strings.TASKDETAILS.RELEASEREQUEST}
                                              />
                                      }



                                    </View>
                                  </View>
                                  :
                                  <View style={{
                                    width: '88%',
                                    height: Normalize(180),
                                    marginTop: Normalize(20),
                                    alignSelf: 'center',
                                    backgroundColor: '#ffffff',
                                    borderColor: Colors.grey,
                                    borderRadius: Normalize(8),
                                    borderWidth: .5
                                  }}>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                      <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center", marginBottom: Normalize(10), }} >
                                        <View style={{ height: Normalize(14), width: Normalize(13), marginHorizontal: Normalize(5) }} >
                                          <Image source={images.paymentSecure} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                        </View>
                                        <Text style={{ fontSize: Normalize(14), fontFamily: 'Outfit-Regular', color: '#818181' }}>{strings.TASKDETAILS.PAYMENTSECURE}</Text>
                                      </View>
                                      <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                        <Text style={[styles.priceText, { paddingHorizontal: "1.5%" }]}> {strings.BROWSEFILTER.TOMAN}</Text>
                                        <Text style={styles.priceText}> {language == "pr" ? engToPersian(numberWithCommasinParsian((Math.round(taskData.amount - taskData.recive_amount)) + (Math.round(taskData.recive_amount)))) : numberWithCommas((Math.round(taskData.amount - taskData.recive_amount)) + (Math.round(taskData.recive_amount)))}</Text>
                                      </View>
                                    </View>
                                    <View style={{ height: Normalize(50), width: "100%", marginBottom: Normalize(3) }} >
                                      <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                          {
                                            language === "en" ?
                                              <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{language === "en" ? tierData.level : tierData.level_fa} {strings.MAKEANOFFER.SERVICEFEE}</Text>
                                              :
                                              <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{strings.MAKEANOFFER.SERVICEFEE} {tierData.level_fa}</Text>
                                          }

                                        </View>
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText, paddingHorizontal: Normalize(2) }} > {strings.BROWSEFILTER.TOMAN}</Text>
                                            <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{addCommaAndTranslateInPersian((Math.round(taskData.amount - taskData.recive_amount)), language)}</Text>
                                          </View>
                                        </View>
                                      </View>
                                      <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                          <Text style={{ fontSize: 13, fontFamily: 'Outfit-Medium', color: Colors.greyText }} >{strings.MAKEANOFFER.YOULLRECEIVE}</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 13, fontFamily: 'Outfit-Medium', color: Colors.greyText, paddingHorizontal: Normalize(2) }} > {strings.BROWSEFILTER.TOMAN}</Text>
                                            <Text style={{ fontSize: 13, fontFamily: 'Outfit-Medium', color: Colors.greyText }} >{addCommaAndTranslateInPersian(Math.round(taskData.recive_amount), language)}</Text>
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", justifyContent: "center" }}>
                                      {
                                        taskData.is_dispute == "Y"
                                          ?
                                          <MakeanofferButton
                                            disabled={true}
                                            title={strings.TASKDETAILS.RELEASE}
                                          />
                                          :
                                          taskData.user_id == userid ?
                                            taskData.get_tasker_increase_payment == null || taskData.get_tasker_increase_payment.status == "R" || taskData.get_tasker_increase_payment.status == "C" ?
                                              <>
                                                <MakeanofferButton
                                                  onPress={releaseOnpress}
                                                  title={taskData.release_request_date == null ? strings.TASKDETAILS.RELEASE : "Tasker requested"}
                                                />

                                                {releaseModal &&
                                                  <WarningPage
                                                    onPress={releaseOnpress}
                                                    ispress={releaseModal}
                                                    warningSubTitle={strings.TASKDETAILS.AREYOUSURERELEASEPAYMENT}
                                                    warningTitle={language == 'en' ? 'Are you Sure?' : "آیا مطمئن هستید؟"}
                                                    okOnpress={onpressRelease}
                                                    cancelOnpress={releaseOnpress} />
                                                }

                                                {/* <WarningPage
                                            onPress={releaseOnpress}
                                            ispress={releaseModal}
                                            warningTitle={strings.TASKDETAILS.RELEASE}
                                            warningSubTitle={language == 'en' ? 'Are you Sure?' : "آیا مطمئن هستید؟"}
                                            okOnpress={onpressRelease}
                                            cancelOnpress={releaseOnpress} /> */}
                                              </>
                                              :
                                              <>
                                                <MakeanofferButton
                                                  onPress={onpressreviewRequestModal}
                                                  title={strings.TASKDETAILS.REVIEWREQUEST}
                                                />
                                                <ReviewRequestModal
                                                  ispress={reviewRequestModal_poster}
                                                  onPress={onpressreviewRequestModal}
                                                  taskSlugname={taskData.slug}
                                                  taskBudget={taskData.budget}
                                                  name={nameShorting(taskData.get_all_bid[0].get_user.fname + " " + taskData.get_all_bid[0].get_user.lname)}
                                                  imageName={taskData.get_all_bid[0].get_user.profile_picture}
                                                  previousAmount={Math.round(taskData.get_all_bid[0].amount)}
                                                  description={taskData.get_tasker_increase_payment.description}
                                                  item={taskData.get_tasker_increase_payment}
                                                />
                                              </>
                                            :
                                            taskData.release_request_date == null ?
                                              <>
                                                <MakeanofferButton
                                                  onPress={releaseRequestOnpress}
                                                  title={strings.TASKDETAILS.RELEASEREQUEST}
                                                />
                                                {/* <WarningPage
                                            onPress={releaseRequestOnpress}
                                            ispress={releaseRequestModal}
                                            warningTitle={strings.TASKDETAILS.RELEASEREQUEST}
                                            warningSubTitle={language == 'en' ? 'Are you Sure?' : "آیا مطمئن هستید؟"}
                                            okOnpress={onpressReleaseRequest}
                                            cancelOnpress={releaseRequestOnpress} /> */}

                                                {releaseRequestModal &&
                                                  <WarningPage
                                                    onPress={releaseRequestOnpress}
                                                    ispress={releaseRequestModal}
                                                    warningTitle={language === "en" ? "Are you sure?" : "آیا مطمئن هستید؟"}
                                                    warningSubTitle={language == 'en' ? 'Are you sure you want to release payment?' : "آیا از ارسال درخواست آزادسازی مبلغ پروژه اطمینان دارید؟"}
                                                    okOnpress={onpressReleaseRequest}
                                                    cancelOnpress={releaseRequestOnpress} />
                                                }



                                              </>
                                              :
                                              <MakeanofferButton
                                                disabled={true}
                                                onPress={releaseRequestOnpress}
                                                title={strings.TASKDETAILS.RELEASEREQUEST}
                                              />
                                      }


                                    </View>
                                  </View>
                                : taskData.status == 4 ?
                                  // <OfferTypeBox /> 
                                  taskData.user_id == userid ?
                                    // *********** review  ************
                                    <View style={{
                                      width: '88%',
                                      height: Normalize(210),
                                      marginTop: Normalize(20),
                                      alignSelf: 'center',
                                      backgroundColor: '#ffffff',
                                      borderColor: Colors.grey,
                                      borderRadius: Normalize(8),
                                      borderWidth: .5
                                    }}>
                                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center", marginBottom: Normalize(10), }} >
                                          <View style={{ height: Normalize(14), width: Normalize(14), marginHorizontal: Normalize(5) }} >
                                            <Image source={images.paymentSecure} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                          </View>
                                          <Text style={{ fontSize: Normalize(14), fontFamily: 'Outfit-Regular', color: '#818181' }}>{strings.TASKDETAILS.PAYMENTSECURE}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                          <Text style={[styles.priceText, { paddingHorizontal: "1.5%" }]}> {strings.BROWSEFILTER.TOMAN}</Text>
                                          <Text style={styles.priceText}> {addCommaAndTranslateInPersian(Math.round(taskData.amount), language)}</Text>
                                        </View>
                                      </View>
                                      <View style={{ height: Normalize(77), width: "100%", marginBottom: Normalize(3) }} >
                                        <View style={{ flex: 1.3, backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center", flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                          <Text style={{ fontSize: 15, fontFamily: 'Outfit-Medium', color: Colors.white, marginHorizontal: Normalize(3) }} >{strings.TASKDETAILS.YOUPAID}</Text>
                                          <View style={{ flexDirection: "row" }} >
                                            <Text style={{ fontSize: 15, fontFamily: 'Outfit-Medium', color: Colors.white, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                            <Text style={{ fontSize: 15, fontFamily: 'Outfit-Medium', color: Colors.white }} >{numberWithCommas(Math.round(taskData.amount) + Math.round(taskData.booking_fees))}</Text>
                                          </View>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                            <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{strings.MAKEANOFFER.BOOKINGFEE}</Text>
                                          </View>
                                          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: 'row' }} >
                                            <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                            <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{language == "en" ? numberWithCommas(Math.round(taskData.booking_fees)) : engToPersian(numberWithCommasinParsian(Math.round(taskData.booking_fees)))}</Text>
                                          </View>
                                        </View>
                                      </View>
                                      <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", justifyContent: "center" }}>
                                        {
                                          taskData.user_id == userid ?

                                            taskData.get_poster_review == null ?

                                              <MakeanofferButton
                                                onPress={onpressReviewButton}
                                                title={strings.TASKDETAILS.REVIEW}
                                              /> :
                                              <MakeanofferButton
                                                disabled={true}
                                                title={strings.TASKDETAILS.REVIEWED}
                                              />
                                            :
                                            taskData.get_tasker_review == null ?
                                              <MakeanofferButton
                                                onPress={onpressReviewButton}
                                                title={strings.TASKDETAILS.REVIEW}
                                              />
                                              :
                                              <MakeanofferButton
                                                disabled={true}
                                                title={strings.TASKDETAILS.REVIEWED}
                                              />
                                        }
                                      </View>
                                    </View>
                                    :
                                    <View style={{
                                      width: '88%',
                                      height: Normalize(180),
                                      marginTop: Normalize(20),
                                      alignSelf: 'center',
                                      backgroundColor: '#ffffff',
                                      borderColor: Colors.grey,
                                      borderRadius: Normalize(8),
                                      borderWidth: .5
                                    }}>
                                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center", marginBottom: Normalize(10), }} >
                                          <View style={{ height: Normalize(14), width: Normalize(13), marginHorizontal: Normalize(5) }} >
                                            <Image source={images.paymentSecure} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                          </View>
                                          <Text style={{ fontSize: Normalize(14), fontFamily: 'Outfit-Regular', color: '#818181' }}>{strings.TASKDETAILS.PAYMENTSECURE}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                          <Text style={[styles.priceText, { paddingHorizontal: "1.5%" }]}> {strings.BROWSEFILTER.TOMAN}</Text>
                                          <Text style={styles.priceText}> {language == "pr" ? engToPersian(numberWithCommasinParsian((Math.round(taskData.amount - taskData.recive_amount)) + (Math.round(taskData.recive_amount)))) : numberWithCommas((Math.round(taskData.amount - taskData.recive_amount)) + (Math.round(taskData.recive_amount)))}</Text>
                                        </View>
                                      </View>
                                      <View style={{ height: Normalize(50), width: "100%", marginBottom: Normalize(3) }} >
                                        <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                            {/* <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{strings.MAKEANOFFER.BRONZESERVICEFEE}</Text> */}
                                            {
                                              language === "en" ?
                                                <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{language === "en" ? tierData.level : tierData.level_fa} {strings.MAKEANOFFER.SERVICEFEE}</Text>
                                                :
                                                <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{strings.MAKEANOFFER.SERVICEFEE} {language === "en" ? tierData.level : tierData.level_fa}</Text>
                                            }
                                          </View>
                                          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                            <View style={{ flexDirection: 'row' }}>
                                              <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText, paddingHorizontal: Normalize(2) }} > {strings.BROWSEFILTER.TOMAN}</Text>
                                              <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{addCommaAndTranslateInPersian((Math.round(taskData.amount - taskData.recive_amount)), language)}</Text>
                                            </View>
                                          </View>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                            <Text style={{ fontSize: 13, fontFamily: 'Outfit-Medium', color: Colors.greyText }} >{strings.MAKEANOFFER.YOULLRECEIVE}</Text>
                                          </View>
                                          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                            <View style={{ flexDirection: 'row' }}>
                                              <Text style={{ fontSize: 13, fontFamily: 'Outfit-Medium', color: Colors.greyText, paddingHorizontal: Normalize(2) }} > {strings.BROWSEFILTER.TOMAN}</Text>
                                              <Text style={{ fontSize: 13, fontFamily: 'Outfit-Medium', color: Colors.greyText }} >{addCommaAndTranslateInPersian(Math.round(taskData.recive_amount), language)}</Text>
                                            </View>
                                          </View>
                                        </View>
                                      </View>
                                      <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", justifyContent: "center" }}>
                                        {
                                          taskData.user_id == userid ?

                                            taskData.get_poster_review == null ?

                                              <MakeanofferButton
                                                onPress={onpressReviewButton}
                                                title={strings.TASKDETAILS.REVIEW}
                                              /> :
                                              <MakeanofferButton
                                                disabled={true}
                                                title={strings.TASKDETAILS.REVIEWED}
                                              />
                                            :
                                            taskData.get_tasker_review == null ?
                                              <MakeanofferButton
                                                onPress={onpressReviewButton}
                                                title={strings.TASKDETAILS.REVIEW}
                                              />


                                              :
                                              <MakeanofferButton
                                                disabled={true}
                                                title={strings.TASKDETAILS.REVIEWED}
                                              />
                                        }
                                      </View>
                                    </View>
                                  : taskData.status == 5 ?
                                    taskData.user_id == userid ?
                                      // *********** Completed  ************
                                      <View style={{
                                        width: '88%',
                                        height: Normalize(210),
                                        marginTop: Normalize(20),
                                        alignSelf: 'center',
                                        backgroundColor: '#ffffff',
                                        borderColor: Colors.grey,
                                        borderRadius: Normalize(8),
                                        borderWidth: .5
                                      }}>
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                          <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center", marginBottom: Normalize(10), }} >
                                            <View style={{ height: Normalize(14), width: Normalize(14), marginHorizontal: Normalize(5) }} >
                                              <Image source={images.paymentSecure} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                            </View>
                                            <Text style={{ fontSize: Normalize(14), fontFamily: 'Outfit-Regular', color: '#818181' }}>{strings.TASKDETAILS.PAYMENTSECURE}</Text>
                                          </View>
                                          <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                            <Text style={[styles.priceText, { paddingHorizontal: "1.5%" }]}> {strings.BROWSEFILTER.TOMAN}</Text>
                                            {/* <Text style={styles.priceText}> {language == "pr" ? engToPersian(numberWithCommasinParsian(taskData.budget)) : numberWithCommas(taskData.budget)}</Text> */}
                                            <Text style={styles.priceText}> {addCommaAndTranslateInPersian(Math.round(taskData.amount), language)}</Text>
                                          </View>
                                        </View>
                                        <View style={{ height: Normalize(77), width: "100%", marginBottom: Normalize(3) }} >
                                          <View style={{ flex: 1.3, backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center", flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                            <Text style={{ fontSize: 15, fontFamily: 'Outfit-Medium', color: Colors.white, marginHorizontal: Normalize(3) }} >{strings.TASKDETAILS.YOUPAID}</Text>
                                            <View style={{ flexDirection: language == "en" ? "row-reverse" : "row" }} >
                                              <Text style={{ fontSize: 15, fontFamily: 'Outfit-Medium', color: Colors.white, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                              <Text style={{ fontSize: 15, fontFamily: 'Outfit-Medium', color: Colors.white }} >{numberWithCommas(Math.round(taskData.amount) + Math.round(taskData.booking_fees))}</Text>
                                            </View>
                                          </View>
                                          <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                              <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{strings.MAKEANOFFER.BOOKINGFEE}</Text>
                                            </View>
                                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: 'row' }} >
                                              <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                              <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{language == "en" ? numberWithCommas(Math.round(taskData.booking_fees)) : engToPersian(numberWithCommasinParsian(Math.round(taskData.booking_fees)))}</Text>
                                            </View>
                                          </View>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", justifyContent: "center" }}>

                                          <MakeanofferButton
                                            // onPress={}
                                            title={strings.BROWSEFILTER.COMPLETED}
                                            disabled={true}
                                          />
                                        </View>
                                      </View>
                                      :
                                      <View style={{
                                        width: '88%',
                                        height: Normalize(180),
                                        marginTop: Normalize(20),
                                        alignSelf: 'center',
                                        backgroundColor: '#ffffff',
                                        borderColor: Colors.grey,
                                        borderRadius: Normalize(8),
                                        borderWidth: .5
                                      }}>
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                          <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center", marginBottom: Normalize(10), }} >
                                            <View style={{ height: Normalize(14), width: Normalize(13), marginHorizontal: Normalize(5) }} >
                                              <Image source={images.paymentSecure} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                            </View>
                                            <Text style={{ fontSize: Normalize(14), fontFamily: 'Outfit-Regular', color: '#818181' }}>{strings.TASKDETAILS.PAYMENTSECURE}</Text>
                                          </View>
                                          <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                            <Text style={[styles.priceText, { paddingHorizontal: "1.5%" }]}> {strings.BROWSEFILTER.TOMAN}</Text>
                                            <Text style={styles.priceText}> {language == "pr" ? engToPersian(numberWithCommasinParsian((Math.round(taskData.amount - taskData.recive_amount)) + (Math.round(taskData.recive_amount)))) : numberWithCommas((Math.round(taskData.amount - taskData.recive_amount)) + (Math.round(taskData.recive_amount)))}</Text>
                                          </View>
                                        </View>
                                        <View style={{ height: Normalize(50), width: "100%", marginBottom: Normalize(3) }} >
                                          <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                              {
                                                language === "en" ?
                                                  <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{language === "en" ? tierData.level : tierData.level_fa} {strings.MAKEANOFFER.SERVICEFEE}</Text>
                                                  :
                                                  <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{strings.MAKEANOFFER.SERVICEFEE} {language === "en" ? tierData.level : tierData.level_fa}</Text>
                                              }
                                            </View>
                                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                              <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText, paddingHorizontal: Normalize(2) }} > {strings.BROWSEFILTER.TOMAN}</Text>
                                                <Text style={{ fontSize: 13, fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{addCommaAndTranslateInPersian((Math.round(taskData.amount - taskData.recive_amount)), language)}</Text>
                                              </View>
                                            </View>
                                          </View>
                                          <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                              <Text style={{ fontSize: 13, fontFamily: 'Outfit-Medium', color: Colors.greyText }} >{strings.MAKEANOFFER.YOULLRECEIVE}</Text>
                                            </View>
                                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                              <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontSize: 13, fontFamily: 'Outfit-Medium', color: Colors.greyText, paddingHorizontal: Normalize(2) }} > {strings.BROWSEFILTER.TOMAN}</Text>
                                                <Text style={{ fontSize: 13, fontFamily: 'Outfit-Medium', color: Colors.greyText }} >{addCommaAndTranslateInPersian(Math.round(taskData.recive_amount), language)}</Text>
                                              </View>
                                            </View>
                                          </View>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", justifyContent: "center" }}>

                                          <MakeanofferButton
                                            // onPress={}
                                            title={strings.BROWSEFILTER.COMPLETED}
                                            disabled={true}
                                          />
                                        </View>
                                      </View>
                                    :
                                    <OfferTypeBox />
                          }
                          {/* *******************bottom warning box************ */}

                          {/* ***********************Review Modal***************** */}
                          {
                            reviewModal && (taskData.status == 4 &&
                              <GiveReviewModal
                                // ispress={GiveReviewModal}
                                ispress={reviewModal}
                                onPress={onpressReviewButton}
                                taskSlugname={taskData.slug}
                                name={taskData.user_id != userid ? nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname) : nameShorting(taskData.get_bid[0].get_user.fname + " " + taskData.get_bid[0].get_user.lname)}
                                image={taskData.user_id != userid ? taskData.get_user.profile_picture : taskData.get_bid[0].get_user.profile_picture}
                              />)
                          }
                          {
                            taskData.get_all_bid != undefined && taskData.status == 3 &&
                            <View style={{ marginHorizontal: 15, paddingVertical: Normalize(5), marginTop: Normalize(8) }} >
                              {

                                taskData.get_tasker_increase_payment != null && taskData.get_tasker_increase_payment.tasker_id == userid ?
                                  <TouchableOpacity
                                    disabled={true}
                                    style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center", alignSelf: "center" }} >
                                    <View style={{ height: Normalize(11), width: Normalize(12), marginHorizontal: Normalize(5) }} >
                                      <Image source={images.grayPlus} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                    </View>
                                    <Text style={{ color: Colors.grey, fontSize: Normalize(12), fontFamily: 'Outfit-Medium' }}>{strings.TASKDETAILS.INCREASEPRICE}</Text>
                                  </TouchableOpacity>
                                  :

                                  taskData.is_dispute == "Y" ?
                                    <View
                                      style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center", alignSelf: "center" }} >
                                      <View style={{ height: Normalize(11), width: Normalize(12), marginHorizontal: Normalize(5) }} >
                                        <Image source={images.grayPlus} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                      </View>
                                      <Text style={{ color: Colors.grey, fontSize: Normalize(12), fontFamily: 'Outfit-Medium' }}>{strings.TASKDETAILS.INCREASEPRICE}</Text>
                                    </View>
                                    :
                                    <>
                                      {
                                        taskData.get_tasker_increase_payment != null ?
                                          taskData.user_id == userid && taskData.get_tasker_increase_payment.status != "I" &&
                                          <TouchableOpacity
                                            onPress={() => {
                                              taskData.user_id == userid ? onpressincreasepriceModal_For_Poster() : onpressincreasepriceModal_For_Tasker()
                                            }}
                                            style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center", alignSelf: "center" }} >
                                            <View style={{ height: Normalize(11), width: Normalize(12), marginHorizontal: Normalize(5) }} >
                                              <Image source={images.bluePlus} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                            </View>
                                            <Text style={{ color: Colors.primary, fontSize: Normalize(12), fontFamily: 'Outfit-Medium' }}>{strings.TASKDETAILS.INCREASEPRICE}</Text>
                                          </TouchableOpacity>
                                          :
                                          <TouchableOpacity
                                            onPress={() => {
                                              taskData.user_id == userid ? onpressincreasepriceModal_For_Poster() : onpressincreasepriceModal_For_Tasker()
                                            }}
                                            style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center", alignSelf: "center" }} >
                                            <View style={{ height: Normalize(11), width: Normalize(12), marginHorizontal: Normalize(5) }} >
                                              <Image source={images.bluePlus} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                            </View>
                                            <Text style={{ color: Colors.primary, fontSize: Normalize(12), fontFamily: 'Outfit-Medium' }}>{strings.TASKDETAILS.INCREASEPRICE}</Text>
                                          </TouchableOpacity>
                                      }

                                      <IncreasepriceModal_For_Tasker
                                        ispress={increasepriceModal_tasker}
                                        onPress={onpressincreasepriceModal_For_Tasker}
                                        taskSlugname={taskData.slug}
                                        posterName={nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)}
                                      />

                                      {
                                        taskData.status == 3 &&
                                        // <IncreasepriceModal_For_Poster
                                        //   ispress={increasepriceModal_poster}
                                        //   onPress={onpressincreasepriceModal_For_Poster}
                                        //   taskSlugname={taskData.slug}
                                        //   item={taskData.get_tasker_increase_payment}
                                        //   taskername={nameShorting(taskData.get_bid[0].get_user.fname + " " + taskData.get_bid[0].get_user.lname)}
                                        // />

                                        <IncreasepriceModal_For_Poster
                                          ispress={increasepriceModal_poster}
                                          onPress={onpressincreasepriceModal_For_Poster}
                                          taskSlugname={taskData.slug}
                                          item={taskData.get_tasker_increase_payment}
                                          taskername={nameShorting(taskData.get_bid[0].get_user.fname + " " + taskData.get_bid[0].get_user.lname)}
                                          taskerImage={taskData.get_bid[0].get_user.profile_picture}
                                          imageName={taskData.get_user.profile_picture}
                                          taskTitle={taskData.title}
                                          name={nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)}
                                        />



                                      }

                                    </>
                              }
                              <View style={{ height: Normalize(40), width: "100%", marginTop: Normalize(10), flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-around" }} >
                                {/* *********************** release ************************  */}




                                {/* **************************Dispute******************* */}
                                {

                                  taskData.is_dispute == "N" ?
                                    <TouchableOpacity
                                      onPress={() => navigation.navigate("DisputesAdd", { slug: taskData.slug, id: taskData.id })}
                                      style={{ height: "100%", width: "70%", backgroundColor: Colors.primary, borderRadius: 50, justifyContent: "center", alignItems: "center", }} >
                                      <Text style={{ fontFamily: 'Outfit-SemiBold', fontSize: Normalize(14), color: Colors.white, }}>
                                        {strings.TASKDETAILS.RISEDISPUTE}
                                      </Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                      onPress={() => navigation.navigate("DisputesDetails", { slug: taskData.slug, id: taskData.id })}
                                      style={{ height: "100%", width: "65%", backgroundColor: Colors.primary, borderRadius: 50, justifyContent: "center", alignItems: "center", }} >
                                      <Text style={{ fontFamily: 'Outfit-SemiBold', fontSize: Normalize(14), color: Colors.white, }}>
                                        {strings.TASKDETAILS.VIEWDISPUTE}
                                      </Text>
                                    </TouchableOpacity>
                                }
                              </View>
                            </View>
                          }
                          {
                            taskData.status > 3 &&
                            taskData.is_dispute != "N" &&
                            <TouchableOpacity
                              onPress={() => navigation.navigate("DisputesDetails", { slug: taskData.slug, id: taskData.id })}
                              style={{ height: Normalize(40), width: "70%", marginTop: Normalize(10), backgroundColor: Colors.primary, borderRadius: 50, justifyContent: "center", alignItems: "center", alignSelf: "center" }} >
                              <Text style={{ fontFamily: 'Outfit-SemiBold', fontSize: Normalize(14), color: Colors.white, }}>
                                {strings.TASKDETAILS.VIEWDISPUTE}
                              </Text>
                            </TouchableOpacity>
                          }
                          {/* **************review modal*********** */}
                          <ReviewOfferModal
                            ispress={reviewOfferModal}
                            setReviewOfferModal={setReviewOfferModal}
                            onPress={onPressreviewOffer}
                            value={taskData.get_bid}
                            taskSlugname={taskData.slug}
                            taskData={taskData}
                            setTaskData={setTaskData}
                            getData={getData}
                            show={show}
                            userid={userid}
                            slug={taskData.slug}
                          />
                          <ReviewOfferModalforSingle slug={taskData.slug} ispress={reviewmodalforsingle} setReviewmodalforsingle={setReviewmodalforsingle} onPress={onPressreviewforsingle} value={taskData.get_bid} id={singleProposalReplyID} taskSlugname={taskData.slug} taskData={taskData} setTaskData={setTaskData} getData={getData} show={show} userid={userid} />
                          {/* ***************Three Box for total views,total offer, status************** */}
                          <View style={{ height: Normalize(40), marginHorizontal: 15, flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", marginTop: Normalize(20) }} >
                            <View style={{ height: "100%", width: "31%", borderColor: Colors.grey, borderRadius: 3, borderWidth: .5 }} >
                              <View style={{ flex: 1 }} >
                                <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                  <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }} >
                                    <Image source={images.clockIcon} style={{ height: "60%", width: "60%", resizeMode: "contain" }} />
                                  </View>
                                  <View style={{ flex: 2.4, justifyContent: "flex-end", alignItems: language == "en" ? "flex-start" : "flex-end", paddingHorizontal: "2%" }} >
                                    <Text style={{ fontSize: Normalize(10), fontFamily: 'Outfit-SemiBold', color: Colors.greyText }} >{language == "en" ? taskData.tot_bids : engToPersian(taskData.tot_bids)}</Text>
                                  </View>
                                </View>
                              </View>
                              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                <Text style={{ fontSize: Normalize(8), fontFamily: 'Outfit-Medium', color: Colors.primary }} >{strings.TASKDETAILS.TOTALOFFERSUBMITTED}</Text>
                              </View>
                            </View>
                            <View style={{ height: "100%", width: "31%", borderColor: Colors.grey, borderRadius: 3, borderWidth: .5 }} >
                              <View style={{ flex: 1 }} >
                                <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                  <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }} >
                                    <Image source={images.binocular} style={{ height: "70%", width: "70%", resizeMode: "contain" }} />
                                  </View>
                                  <View style={{ flex: 2.4, justifyContent: "flex-end", alignItems: language == "en" ? "flex-start" : "flex-end", paddingHorizontal: "2%" }} >
                                    <Text style={{ fontSize: Normalize(10), fontFamily: 'Outfit-SemiBold', color: Colors.greyText }} >{language == "en" ? taskData.tot_view : engToPersian(taskData.tot_view)}</Text>
                                  </View>
                                </View>
                              </View>
                              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                <Text style={{ fontSize: Normalize(8), fontFamily: 'Outfit-Medium', color: Colors.primary }} >{strings.TASKDETAILS.TOTALVIEWS}</Text>
                              </View>
                            </View>
                            <View style={{ height: "100%", width: "31%", borderColor: Colors.grey, borderRadius: 3, borderWidth: .5 }} >
                              <View style={{ flex: 1 }} >
                                <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                  <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }} >
                                    <Image source={images.tickcircle} style={{ height: "60%", width: "60%", resizeMode: "contain" }} />
                                  </View>
                                  <View style={{ flex: 2.4, justifyContent: "flex-end", alignItems: language == "en" ? "flex-start" : "flex-end", paddingHorizontal: "2%" }} >
                                    <Text style={{ fontSize: Normalize(10), fontFamily: 'Outfit-SemiBold', color: Colors.greyText }} >{getstatus(taskData.status)}</Text>
                                  </View>
                                </View>
                              </View>
                              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                <Text style={{ fontSize: Normalize(8), fontFamily: 'Outfit-Medium', color: Colors.primary }} >{strings.TASKDETAILS.TASKSTATUS}</Text>
                              </View>
                            </View>
                          </View>

                          {/* ************************task description*************** */}
                          <View style={{ flexDirection: 'column', paddingVertical: Normalize(15), width: "99%", alignSelf: "center", justifyContent: 'space-between', marginTop: Normalize(14) }}>
                            <Text style={[styles.headingservice, { textAlign: language == "pr" ? "right" : "left" }]}>
                              {strings.TASKDETAILS.TASKDESCRIPTION}
                            </Text>
                            <View style={{
                              padding: Normalize(15), borderRadius: Normalize(8),
                              elevation: Normalize(1.5),
                              backgroundColor: Colors.white
                            }} >
                              <Text
                                numberOfLines={taskDescriptionExpand ? 1000 : 8}
                                style={[styles.textcategory22, { textAlign: language == "en" ? "left" : "right" }]}>
                                {taskData.listing_id != 0 ? detect_SpanTag(taskData.description) : taskData.description}
                              </Text>
                              {taskData.description != null && (taskData.description).length > 400 && <Text onPress={() => setTaskDescriptionExpand(!taskDescriptionExpand)} style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: taskDescriptionExpand ? Colors.secondary : Colors.primary, textAlign: language == "en" ? "left" : "right", marginVertical: "2%" }}>{taskDescriptionExpand ? strings.POSTTASK.READLESS : strings.POSTTASK.READMORE}</Text>}

                            </View>
                          </View>

                          {/* ************************* review *******************/}

                          {
                            (taskData.status == 4 || taskData.status == 5) &&
                            <>
                              <Text style={[styles.headingservice, { textAlign: language == "pr" ? "right" : "left", paddingHorizontal: 15, }]}>
                                {language === "en" ? "Reviews" : "نظرات و دیدگاه ها"}
                              </Text>

                              <View style={{ paddingVertical: Normalize(15), width: "99%", alignSelf: "center", backgroundColor: '#ffffff' }}>

                                {
                                  taskData.get_poster_review == null ?

                                    <View style={{ flexDirection: rowOrRowreverse(language) }} >
                                      {/* <Text style={{ color: Colors.primary, fontFamily: 'Outfit-Medium', fontSize: Normalize(12), }} ></Text> */}

                                      {
                                        language === "en" ?
                                          <Text style={{
                                            fontSize: Normalize(12),
                                            color: '#38393e',
                                            fontFamily: 'Outfit-Medium',
                                            textAlign: leftOrRight(language),
                                            marginBottom: Normalize(5)
                                          }} ><Text style={{ color: Colors.primary, fontFamily: 'Outfit-Medium', fontSize: Normalize(12), }} >{nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)}</Text> {strings.TASKDETAILS.DIDNOTLEAVEAREVIEW} </Text>
                                          :
                                          <Text style={{
                                            fontSize: Normalize(12),
                                            color: '#38393e',
                                            fontFamily: 'Outfit-Medium',
                                            textAlign: leftOrRight(language),
                                            marginBottom: Normalize(5)
                                          }} >هنوز دیدگاهی از طرف <Text style={{ color: Colors.primary, fontFamily: 'Outfit-Medium', fontSize: Normalize(12), }} >{nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)}</Text> اضافه نشده است</Text>
                                      }




                                    </View>
                                    :
                                    <>
                                      {
                                        language == "en" ?
                                          <Text
                                            style={{
                                              fontSize: Normalize(12),
                                              color: '#38393e',
                                              fontFamily: 'Outfit-Medium',
                                              textAlign: leftOrRight(language)
                                            }} ><Text style={{ color: Colors.primary }} >{nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)}</Text> left a review for <Text style={{ color: Colors.primary }} >{nameShorting(taskData.get_bid[0].get_user.fname + " " + taskData.get_bid[0].get_user.lname)}</Text></Text>
                                          :
                                          <Text
                                            style={{
                                              fontSize: Normalize(12),
                                              color: '#38393e',
                                              fontFamily: 'Outfit-Medium',
                                              textAlign: leftOrRight(language)
                                            }} >

                                            <Text style={{ color: Colors.primary }} >{nameShorting(taskData.get_bid[0].get_user.fname + " " + taskData.get_bid[0].get_user.lname)}</Text> یک دیدگاه گذاشته شده برای <Text style={{ color: Colors.primary }} >{nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)}</Text>
                                            {/* Kartik C یک دیدگاه برای ankan R ثبت کرده است */}

                                          </Text>
                                      }





                                      <Text numberOfLines={1} style={{
                                        color: Colors.secondary, fontFamily: 'Outfit-Medium', fontSize: Normalize(10), textAlign: language == "en" ? "left" : "right", opacity: 0.9
                                      }}>
                                        {language == "en" ?
                                          questionEnglishTimeShow(taskData.get_poster_review.created_at) : questionPersianTimeShow(taskData.get_poster_review.created_at)
                                        }
                                      </Text>

                                      <View style={{ width: "100%", paddingVertical: "1%", flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                        <View style={{ height: Normalize(60), width: "20%", justifyContent: "center", alignItems: language == "en" ? "flex-start" : "flex-end" }} >
                                          <View style={{ width: Normalize(50), height: Normalize(50), borderRadius: Normalize(50) / 2, overflow: "hidden", backgroundColor: "#f5f5f5" }} >
                                            {
                                              taskData.get_user.profile_picture != null ?
                                                <Image
                                                  source={{ uri: ImageLink.ProfilePhoto + `${taskData.get_user.profile_picture}` }}
                                                  style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                                />
                                                :
                                                <Image
                                                  source={{ uri: ImageLink.BlankProfileImage }}
                                                  style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                                />
                                            }
                                          </View>
                                        </View>
                                        <View style={{ height: "100%", width: "80%", marginTop: Normalize(15), alignItems: language == "en" ? "flex-start" : "flex-end" }} >
                                          <View style={{ height: Normalize(15), width: Normalize(100), marginBottom: Normalize(5), flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center" }} >
                                            {
                                              reviewShowinStar(taskData.get_poster_review.rating).map((item, index) => (

                                                item == 0 ?
                                                  <View key={index} style={{ height: Normalize(10), width: Normalize(50), marginHorizontal: Normalize(2) }} >
                                                    <Image source={images.allgray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                  </View> :

                                                  isInt(item) == true ?
                                                    <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                                      <Image source={images.stargolden} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                    </View> :
                                                    <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >

                                                      <Image source={lastStar(item, language)} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                    </View>
                                              ))
                                            }
                                            {
                                              reviewShowinGraystar(reviewShowinStar(taskData.get_poster_review.rating)).map((item, index) => (
                                                <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                                  <Image source={images.stargray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                </View>
                                              ))
                                            }
                                            {/* <Text style={{ color: '#818181', marginLeft: 2, fontFamily: 'Outfit-Regular', fontSize: Normalize(11) }}>({language == "en" ? (reviewShowinStar(taskData.get_poster_review.rating)[(reviewShowinStar(taskData.get_poster_review.rating).length) - 1]) : engToPersian(reviewShowinStar(taskData.get_poster_review.rating)[(reviewShowinStar(taskData.get_poster_review.rating).length) - 1])})</Text> */}
                                          </View>
                                          <Text>" {taskData.get_poster_review.description} "</Text>
                                        </View>
                                      </View>
                                    </>
                                }
                                {
                                  taskData.get_tasker_review == null ?


                                    // <View style={{ flexDirection: rowOrRowreverse(language) }} >
                                    //   <Text style={{ color: Colors.primary, fontFamily: 'Outfit-Medium', fontSize: Normalize(12), }} >{nameShorting(taskData.get_bid[0].get_user.fname + " " + taskData.get_bid[0].get_user.lname)}</Text>
                                    //   <Text style={{
                                    //     fontSize: Normalize(12),
                                    //     color: '#38393e',
                                    //     fontFamily: 'Outfit-Medium',
                                    //     textAlign: leftOrRight(language),
                                    //     marginBottom: Normalize(5)
                                    //   }} > {strings.TASKDETAILS.DIDNOTLEAVEAREVIEW} </Text>
                                    // </View>

                                    language === "en" ?
                                      <Text style={{
                                        fontSize: Normalize(12),
                                        color: '#38393e',
                                        fontFamily: 'Outfit-Medium',
                                        textAlign: leftOrRight(language),
                                        marginBottom: Normalize(5)
                                      }} ><Text style={{ color: Colors.primary, fontFamily: 'Outfit-Medium', fontSize: Normalize(12), }} >{nameShorting(taskData.get_bid[0].get_user.fname + " " + taskData.get_bid[0].get_user.lname)}</Text> {strings.TASKDETAILS.DIDNOTLEAVEAREVIEW} </Text>
                                      :
                                      <Text style={{
                                        fontSize: Normalize(12),
                                        color: '#38393e',
                                        fontFamily: 'Outfit-Medium',
                                        textAlign: leftOrRight(language),
                                        marginBottom: Normalize(5)
                                      }} >هنوز دیدگاهی از طرف <Text style={{ color: Colors.primary, fontFamily: 'Outfit-Medium', fontSize: Normalize(12), }} >{nameShorting(taskData.get_bid[0].get_user.fname + " " + taskData.get_bid[0].get_user.lname)}</Text> اضافه نشده است</Text>



                                    :
                                    <>
                                      {
                                        language == "en" ?
                                          <Text
                                            style={{
                                              fontSize: Normalize(12),
                                              color: '#38393e',
                                              fontFamily: 'Outfit-Medium',
                                              textAlign: language == "en" ? "left" : "right",
                                            }} ><Text style={{ color: Colors.primary }} >{nameShorting(taskData.get_bid[0].get_user.fname + " " + taskData.get_bid[0].get_user.lname)}</Text> left a review for <Text style={{ color: Colors.primary }} >{nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)}</Text></Text>
                                          :
                                          <View style={{ flexDirection: "row", alignSelf: "flex-end" }} >
                                            <Text
                                              style={{
                                                fontSize: Normalize(12),
                                                color: '#38393e',
                                                fontFamily: 'Outfit-Medium',
                                                textAlign: language == "en" ? "left" : "right",
                                              }} >ثبت کرده است</Text>
                                            <Text
                                              style={{
                                                fontSize: Normalize(12),
                                                color: Colors.primary,
                                                fontFamily: 'Outfit-Medium',
                                                textAlign: language == "en" ? "left" : "right",
                                              }} > {nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)} </Text>
                                            <Text
                                              style={{
                                                fontSize: Normalize(12),
                                                color: '#38393e',
                                                fontFamily: 'Outfit-Medium',
                                                textAlign: language == "en" ? "left" : "right",
                                              }} > یک دیدگاه برای</Text>
                                            <Text
                                              style={{
                                                fontSize: Normalize(12),
                                                color: Colors.primary,
                                                fontFamily: 'Outfit-Medium',
                                                textAlign: language == "en" ? "left" : "right",
                                              }} >{nameShorting(taskData.get_bid[0].get_user.fname + " " + taskData.get_bid[0].get_user.lname)}</Text>


                                          </View>
                                        // <Text
                                        //   style={{
                                        //     fontSize: Normalize(12),
                                        //     color: '#38393e',
                                        //     fontFamily: 'Outfit-Medium',
                                        //     textAlign: language == "en" ? "left" : "right",
                                        //   }} >
                                        //   {/* <Text style={{ color: Colors.primary }} >{nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)}</Text> یک دیدگاه گذاشته شده برای <Text style={{ color: Colors.primary }} >{nameShorting(taskData.get_bid[0].get_user.fname + " " + taskData.get_bid[0].get_user.lname)}</Text> */}
                                        //   <Text style={{ color: Colors.primary }} >{nameShorting(taskData.get_bid[0].get_user.fname + " " + taskData.get_bid[0].get_user.lname)}</Text> یک دیدگاه برای <Text style={{ color: Colors.primary }} >{nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)}</Text> ثبت کرده است
                                        // </Text>

                                      }






                                      <Text numberOfLines={1} style={{
                                        color: Colors.secondary, fontFamily: 'Outfit-Medium', fontSize: Normalize(10), textAlign: language == "en" ? "left" : "right", opacity: 0.9
                                      }}>
                                        {language == "en" ?
                                          questionEnglishTimeShow(taskData.get_tasker_review.created_at) : questionPersianTimeShow(taskData.get_tasker_review.created_at)
                                        }
                                      </Text>

                                      <View style={{ width: "100%", paddingVertical: "1%", flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                        <View style={{ height: Normalize(60), width: "20%", justifyContent: "center", alignItems: language == "en" ? "flex-start" : "flex-end" }} >
                                          <View style={{ width: Normalize(50), height: Normalize(50), borderRadius: Normalize(50) / 2, overflow: "hidden", backgroundColor: "#f5f5f5" }} >
                                            {
                                              taskData.get_bid[0].get_user.profile_picture != null ?
                                                <Image
                                                  source={{ uri: ImageLink.ProfilePhoto + `${taskData.get_bid[0].get_user.profile_picture}` }}
                                                  style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                                />
                                                :
                                                <Image
                                                  source={{ uri: ImageLink.BlankProfileImage }}
                                                  style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                                />
                                            }
                                          </View>

                                        </View>
                                        <View style={{ height: "100%", width: "80%", marginTop: Normalize(15), alignItems: language == "en" ? "flex-start" : "flex-end" }} >
                                          <View style={{ height: Normalize(15), width: Normalize(100), marginBottom: Normalize(5), flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center" }} >
                                            {
                                              reviewShowinStar(taskData.get_tasker_review.rating).map((item, index) => (

                                                item == 0 ?
                                                  <View key={index} style={{ height: Normalize(10), width: Normalize(50), marginHorizontal: Normalize(2) }} >
                                                    <Image source={images.allgray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                  </View> :

                                                  isInt(item) == true ?
                                                    <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                                      <Image source={images.stargolden} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                    </View> :
                                                    <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                                      <Image source={lastStar(item, language)} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                    </View>
                                              ))
                                            }
                                            {
                                              reviewShowinGraystar(reviewShowinStar(taskData.get_tasker_review.rating)).map((item, index) => (
                                                <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                                  <Image source={images.stargray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                </View>
                                              ))
                                            }
                                            {/* <Text style={{ color: '#818181', marginLeft: 2, fontFamily: 'Outfit-Regular', fontSize: Normalize(11) }}>({language == "en" ? reviewShowinStar(taskData.get_tasker_review.rating)[(reviewShowinStar(taskData.get_tasker_review.rating).length) - 1] : engToPersian(reviewShowinStar(taskData.get_tasker_review.rating)[(reviewShowinStar(taskData.get_tasker_review.rating).length) - 1])})</Text> */}
                                          </View>
                                          <Text>" {taskData.get_tasker_review.description} "</Text>
                                        </View>
                                      </View>
                                    </>

                                }

                              </View>
                            </>
                          }
                          {/* **************Images****************** */}
                          {
                            taskData ?
                              taskData.get_images.length != 0 ?
                                <>
                                  {imageToggle &&
                                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginBottom: 15 }} >
                                      {
                                        taskData.get_images.map((item, index) => (
                                          <Pressable key={index} onPress={() => imagesModalOpen(item.image)} style={{ width: Normalize(85), height: Normalize(85), borderColor: Colors.primary, borderWidth: 0.8, borderRadius: 5, overflow: "hidden", marginVertical: "2%", marginHorizontal: "1%", padding: Normalize(3) }}>
                                            <Image source={{ uri: `https://changicourt.com/dev/storage/app/public/images/task/${item.image}` }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                                          </Pressable>

                                        ))
                                      }
                                    </View>}
                                  <Modal
                                    animationType="none"
                                    transparent={true}
                                    visible={imageModal}
                                    onRequestClose={() => {
                                      // Alert.alert("Modal has been closed.");
                                      setImageModal(!imageModal);
                                    }}
                                  >
                                    <TouchableOpacity onPress={() => setImageModal(!imageModal)} style={{ flex: 1, backgroundColor: "rgba(52, 52, 52, 0.8)", padding: "8%" }}>
                                      {imageUri &&
                                        <Image source={{ uri: `https://changicourt.com/dev/storage/app/public/images/task/${imageUri}` }} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                      }
                                    </TouchableOpacity>

                                  </Modal>
                                  <Text onPress={() => setImageToggle(!imageToggle)} style={{ padding: 15, fontSize: 15, fontFamily: 'Outfit-Regular', color: imageToggle ? Colors.secondary : Colors.primary, textAlign: language == "en" ? "left" : "right" }}>{imageToggle ? strings.POSTTASK.READLESS : strings.POSTTASK.READMORE}</Text>
                                </> : null : null}
                          {/* ***********Must-haves*********** */}
                          {
                            taskData ? taskData.get_must_have.length != 0 &&
                              <>
                                <Text style={[styles.headingservice, { textAlign: language == "pr" ? "right" : "left", paddingHorizontal: 15 }]}>{strings.POSTTASK.MUSTHAVESTITLE}</Text>
                                <View style={{ marginBottom: Normalize(10) }} >
                                  {
                                    taskData.get_must_have.map((item, index) => (
                                      <View key={index} style={{ marginHorizontal: 15, flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center" }}>
                                        <Image source={require("../../../../../assets/bullet-grey.png")} style={{ height: Normalize(5), width: Normalize(5), resizeMode: "contain", marginHorizontal: Normalize(5) }} />
                                        <Text style={{ fontSize: 12, fontFamily: 'Outfit-Regular', color: '#818181', lineHeight: 19 }}>{item.must_have}</Text>
                                      </View>
                                    ))
                                  }
                                </View>
                              </> : null
                          }
                          {/* *************Other Jobs********** */}

                          {/* ********************increase price ****************** */}

                          {(taskData.get_poster_all_increase_payment).length > 0 &&
                            <View>
                              <Text style={[styles.headingservice, { textAlign: leftOrRight(language), paddingHorizontal: 15 }]}>{strings.TASKDETAILS.INCREASEBYPOSTER}</Text>
                              <View style={{ marginHorizontal: 15 }} >
                                {
                                  (taskData.get_poster_all_increase_payment).map((item, index) => (
                                    <View key={index} style={{ flexDirection: "row", alignItems: "center" }} >
                                      <View style={{ flex: 1, paddingHorizontal: "2%", justifyContent: "center" }} >
                                        <Text numberOfLines={2} style={[styles.textfurniture, { textAlign: leftOrRight(language) }]} >{item.description}{item.requested_by != "P" && `${"\n"} ${strings.TASKDETAILS.REQUESTBYTASKER}`}</Text>
                                      </View>
                                      <Text style={[styles.textfurniture, { textAlign: leftOrRight(language) }]}>{strings.BROWSEFILTER.TOMAN} {Math.round(item.amount)}</Text>
                                    </View>
                                  ))
                                }
                              </View>
                            </View>
                          }

                          {/* ************************* proposal or assign *******************/}

                          <View style={{ paddingVertical: Normalize(15), width: "99%", alignSelf: "center", }}>
                            <Text style={[styles.headingservice, { textAlign: language == "pr" ? "right" : "left" }]}>
                              {taskData.get_all_bid == undefined ? strings.TASKDETAILS.PROPOSAL : strings.TASKDETAILS.ASSIGNEE}</Text>
                          </View>
                          {(taskData.get_bid).length > 0 && <View style={[styles.elevtion_view, { width: "99%", alignSelf: "center", }]} >
                            {
                              taskData.get_bid.map((item, index) => (
                                <View key={index} style={{ flexDirection: 'column', padding: Normalize(15), borderBottomColor: Colors.lightGrey, borderBottomWidth: index % (taskData.get_bid.length) - (taskData.get_bid.length - 1) == 0 ? 0 : 0.2 }}>
                                  <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row" }}>
                                    <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row" }}>
                                      <View style={{ width: Normalize(50), height: Normalize(50), borderRadius: Normalize(50) / 2, overflow: "hidden" }} >
                                        <Image style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                          source={{ uri: item.get_user.profile_picture ? ImageLink.ProfilePhoto + `${item.get_user.profile_picture}` : ImageLink.BlankProfileImage }}
                                        />
                                      </View>
                                      <View style={{ flexDirection: 'column', marginHorizontal: 15 }}>
                                        <Text
                                          onPress={() => {
                                            item.get_user.slug == userSlugName ?
                                              navigation.navigate("MyProfile", { PublicSlug: item.get_user.slug }) :
                                              navigation.navigate("PublicProfile", { PublicSlug: item.get_user.slug })
                                          }}

                                          style={{ color: Colors.primary, marginLeft: 2, fontFamily: 'Outfit-SemiBold', fontSize: Normalize(12), textAlign: language == "en" ? "left" : "right" }}>{nameShorting(item.get_user.fname + " " + item.get_user.lname)}</Text>
                                        <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", alignItems: "center" }} >
                                          {
                                            item.get_user.get_country_info.name &&
                                            <Text style={{ color: '#818181', marginLeft: 2, fontFamily: 'Outfit-Regular', fontSize: Normalize(11), marginTop: 3 }}>{item.get_user.get_country_info.name}</Text>
                                          }
                                          <View style={{ height: Normalize(11), width: 1, backgroundColor: "#818181", marginHorizontal: "5%", opacity: .8 }} />
                                          <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", marginVertical: Normalize(5) }}>
                                            <Image
                                              style={{ width: 13, height: 13, opacity: .8, alignSelf: 'center' }}
                                              source={images.clockIcon}
                                              resizeMode="contain" />
                                            <Text style={{
                                              color: "#818181", marginHorizontal: 8, fontFamily: 'Outfit-Regular', fontSize: Normalize(11),
                                              alignSelf: 'center',
                                            }}>
                                              {language == "en" ?
                                                questionEnglishTimeShow(item.created_at) : questionPersianTimeShow(item.created_at)
                                              }
                                            </Text>
                                          </View>
                                        </View>
                                        <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", }}>
                                          <View style={{ height: Normalize(15), width: Normalize(100), marginBottom: Normalize(5), flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center" }} >
                                            {
                                              reviewShowinStar(item.get_user.avg_review_as_tasker).map((item, index) => (
                                                item == 0 ?
                                                  <View key={index} style={{ height: Normalize(10), width: Normalize(50), marginHorizontal: Normalize(2) }} >
                                                    <Image source={images.allgray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                  </View> :

                                                  isInt(item) == true ?
                                                    <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                                      <Image source={images.stargolden} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                    </View> :
                                                    <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                                      <Image source={lastStar(item, language)} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                    </View>
                                              ))
                                            }
                                            {
                                              reviewShowinGraystar(reviewShowinStar(item.get_user.avg_review_as_tasker)).map((item, index) => (
                                                <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                                  <Image source={images.stargray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                </View>
                                              ))
                                            }
                                            <Text style={{ color: '#818181', marginLeft: 2, fontFamily: 'Outfit-Regular', fontSize: Normalize(11) }}>({language == "en" ? item.get_user.tot_review_as_tasker : engToPersian(item.get_user.tot_review_as_tasker)})</Text>
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                  <View style={{ marginLeft: language == "pr" ? 0 : 75, marginRight: language == "pr" ? 75 : 0 }} >
                                    <Text
                                      numberOfLines={item.id == proposalTextToggle.id && proposalTextToggle.expand ? 50 : 2}
                                      style={[
                                        styles.textcategory22,
                                        language == 'pr'
                                          ? { ...RtlStyles.textInverse }
                                          : { ...RtlStyles.text },
                                      ]}>
                                      {item.description}
                                    </Text>
                                    {(item.description).length > 120 &&
                                      <Text
                                        onPress={() => assigneeeDescriptionReadMore(item.id)}
                                        style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: item.id == proposalTextToggle.id && proposalTextToggle.expand ? Colors.secondary : Colors.primary, textAlign: language == "en" ? "left" : "right", marginTop: "2%" }}>{item.id == proposalTextToggle.id && proposalTextToggle.expand ? strings.POSTTASK.READLESS : strings.POSTTASK.READMORE}</Text>}
                                    {taskData.get_all_bid == undefined &&
                                      item.get_bid_comment.length == 0 &&
                                      <TouchableOpacity
                                        // onPress={onPressreviewforsingle}
                                        // onPress={onPressreviewOffer}
                                        onPress={() => {
                                          setSingleProposalReplyID(item.id)
                                          setSingleProposalReplyData([item])
                                          onPressreviewforsingle()
                                        }}
                                        style={{
                                          height: Normalize(15),
                                          width: Normalize(50),
                                          flexDirection: language == "pr" ? "row-reverse" : "row",
                                          alignItems: "center",
                                          marginTop: "2%",
                                          alignSelf: language == "en" ? "flex-start" : "flex-end"
                                        }}>
                                        <View style={{ height: Normalize(9), width: Normalize(9), justifyContent: "center", alignItems: "center" }}>
                                          <Image style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                                            source={images.reply} />
                                        </View>
                                        <Text style={{
                                          color: Colors.primary, fontFamily: 'Outfit-Medium', fontSize: Normalize(10),
                                          marginHorizontal: Normalize(3)
                                        }}>
                                          {strings.TASKDETAILS.REPLY}
                                        </Text>

                                      </TouchableOpacity>}
                                  </View>
                                  {item.get_bid_comment.length != 0 &&
                                    item.get_bid_comment.map((childItem, childIndex) => (
                                      <View key={childIndex}  >
                                        <View style={{ paddingVertical: Normalize(10), marginTop: 20, flexDirection: language == "en" ? 'row' : "row-reverse", marginLeft: Normalize(50), paddingRight: Normalize(10) }}>
                                          <View style={{ flex: 1, alignItems: "center" }}>
                                            <View style={{ height: Normalize(33), width: Normalize(33), borderRadius: Normalize(33) / 2, backgroundColor: "#f5f5f5", overflow: "hidden" }}>
                                              <Image style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                                                source={{ uri: childItem.get_user.profile_picture ? ImageLink.ProfilePhoto + `${childItem.get_user.profile_picture}` : ImageLink.BlankProfileImage }}

                                                resizeMode="cover" />
                                            </View>
                                          </View>
                                          <View style={{ flex: 4, }}>
                                            <View style={{ flex: 2.5 }}>
                                              <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center" }} >
                                                <Text
                                                  onPress={() => {
                                                    childItem.get_user.slug == userSlugName ?
                                                      navigation.navigate("MyProfile", { PublicSlug: childItem.get_user.slug }) :
                                                      navigation.navigate("PublicProfile", { PublicSlug: childItem.get_user.slug })
                                                  }}
                                                  numberOfLines={1} style={{
                                                    color: Colors.primary, fontFamily: 'Outfit-SemiBold',
                                                    fontSize: Normalize(12), textAlign: language == "pr" ? "right" : "left"
                                                  }}>{nameShorting(childItem.get_user.fname + " " + childItem.get_user.lname)}</Text>
                                                {
                                                  childItem.get_user.slug == taskData.get_user.slug &&
                                                  <View style={{ paddingVertical: Normalize(1.5), paddingHorizontal: Normalize(2), backgroundColor: Colors.primary, marginHorizontal: Normalize(2), borderRadius: 15, justifyContent: "center", alignItems: "center" }} >
                                                    <Text style={{
                                                      color: Colors.white, fontFamily: 'Outfit-SemiBold',
                                                      fontSize: Normalize(6)
                                                    }}>{strings.MAKEANOFFER.POSTER}</Text>
                                                  </View>
                                                }
                                              </View>
                                              <Text
                                                numberOfLines={childItem.id == proposalReplyTextToggle.id && proposalReplyTextToggle.expand ? 500 : 2}
                                                style={{
                                                  color: '#818181', fontFamily: 'Outfit-Regular', lineHeight: Normalize(13),
                                                  fontSize: Normalize(10), textAlign: language == "en" ? "left" : "right"
                                                }}>{childItem.message}</Text>
                                              {(childItem.message).length > 120 &&
                                                <Text
                                                  onPress={() =>
                                                    assigneeeReplyReadMore(childItem.id)
                                                  }
                                                  style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: childItem.id == proposalReplyTextToggle.id && proposalReplyTextToggle.expand ? Colors.secondary : Colors.primary, textAlign: language == "en" ? "left" : "right", marginTop: "2%" }}>{childItem.id == proposalReplyTextToggle.id && proposalReplyTextToggle.expand ? strings.POSTTASK.READLESS : strings.POSTTASK.READMORE}</Text>}
                                              <View style={{ marginVertical: Normalize(4) }}>
                                                <Text numberOfLines={1} style={{
                                                  color: "#818181", fontFamily: 'Outfit-Medium', fontSize: Normalize(10), textAlign: language == "en" ? "left" : "right"
                                                }}>
                                                  {language == "en" ?
                                                    questionEnglishTimeShow(childItem.created_at) : questionPersianTimeShow(childItem.created_at)
                                                  }
                                                </Text>
                                              </View>
                                              <View style={{ width: "100%", alignItems: language == "en" ? "flex-start" : "flex-end" }} >
                                                {taskData.get_all_bid == undefined &&
                                                  childIndex == (item.get_bid_comment.length - 1) &&
                                                  <TouchableOpacity
                                                    // onPress={onPressreviewforsingle}
                                                    // onPress={onPressreviewOffer}
                                                    onPress={() => {
                                                      setSingleProposalReplyID(item.id)
                                                      setSingleProposalReplyData([item])
                                                      onPressreviewforsingle()
                                                    }}
                                                    // onPress={() => console.log(item.id)}
                                                    style={{
                                                      height: Normalize(15),
                                                      width: Normalize(50),
                                                      flexDirection: language == "pr" ? "row-reverse" : "row",
                                                      alignItems: "center",
                                                      alignSelf: language == "en" ? "flex-start" : "flex-end"
                                                    }}>
                                                    <View style={{ height: Normalize(9), width: Normalize(9), justifyContent: "center", alignItems: "center" }}>
                                                      <Image style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                                                        source={images.reply} />
                                                    </View>
                                                    <Text style={{
                                                      color: Colors.primary, fontFamily: 'Outfit-Medium', fontSize: Normalize(10),
                                                      marginHorizontal: Normalize(3)
                                                    }}>
                                                      {strings.TASKDETAILS.REPLY}
                                                    </Text>
                                                  </TouchableOpacity>
                                                }
                                              </View>
                                            </View>
                                          </View>
                                        </View>
                                      </View>
                                    ))
                                  }

                                  {
                                    userid == taskData.user_id && taskData.status == 2 &&
                                    <TouchableOpacity
                                      onPress={() => {
                                        setItemId(item.id)
                                        onPresspaymentRequired()
                                      }}
                                      style={{ backgroundColor: "#7db343", borderRadius: Normalize(8), marginTop: "2%", width: "100%", justifyContent: "center", alignItems: "center", paddingVertical: Normalize(7) }}>
                                      <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.white }]}>{strings.MAKEANOFFER.ACCEPTOFFER} ( {strings.BROWSEFILTER.TOMAN} {numberWithCommas(Math.round(item.amount))} )</Text>
                                    </TouchableOpacity>
                                  }
                                  {
                                    userid == item.user_id && taskData.status == 2 &&
                                    <View style={{}}>
                                      <TouchableOpacity
                                        disabled={withdrawButtonLoader ? true : false}
                                        onPress={withdrawBotton}
                                        style={{ backgroundColor: Colors.secondary, borderRadius: Normalize(8), marginTop: "2%", width: "100%", justifyContent: "center", alignItems: "center", paddingVertical: Normalize(7) }}>
                                        {
                                          withdrawButtonLoader ?
                                            <ActivityIndicator
                                              size='small'
                                              color={Colors.white}
                                            /> :
                                            <View style={{ flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                              <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.white }]}>{strings.TASKDETAILS.WITHDRAW} ( {strings.BROWSEFILTER.TOMAN} {numberWithCommas(Math.round(item.amount))} )</Text>
                                            </View>

                                        }
                                      </TouchableOpacity>
                                      {
                                        warningModal &&
                                        <WarningPage
                                          onPress={withdrawOnpress}
                                          ispress={warningModal}
                                          warningTitle={language == 'en' ? 'Are you sure?' : 'آیا مطمئن هستید؟'}
                                          warningSubTitle={language == 'en' ? 'Are you sure you want to withdraw offer?' : "آیا از لغو پیشنهاد خود اطمینان دارید ؟"}
                                          okOnpress={withdraw}
                                          cancelOnpress={withdrawCancelOnpress} />}

                                    </View>
                                  }
                                </View>
                              ))
                            }
                          </View>}
                          {/* ************************* proposal or assign *******************/}
                          {taskData.get_all_bid != undefined &&
                            <>
                              <View style={{ paddingVertical: Normalize(15), width: "99%", alignSelf: "center", }}>
                                <Text style={[styles.headingservice, { textAlign: language == "pr" ? "right" : "left" }]}>
                                  {/* {strings.TASKDETAILS.PROPOSAL} ( {language == "en" ? taskData.get_all_bid.length : engToPersian(taskData.get_all_bid.length)} )</Text> */}
                                  {strings.TASKDETAILS.PROPOSAL}</Text>
                              </View>
                              {
                                (taskData.get_all_bid).length > 0 &&
                                <View style={[styles.elevtion_view, { width: "99%", alignSelf: "center", }]} >
                                  {
                                    taskData.get_all_bid.map((item, index) => (
                                      <View key={index} style={{ flexDirection: 'column', padding: Normalize(15), borderBottomColor: Colors.lightGrey, borderBottomWidth: index % (taskData.get_bid.length) - (taskData.get_bid.length - 1) == 0 ? 0 : 0.2 }}>
                                        <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row" }}>
                                          <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row" }}>
                                            <View style={{ width: Normalize(50), height: Normalize(50), borderRadius: Normalize(50) / 2, overflow: "hidden" }} >
                                              <Image style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                                source={{ uri: item.get_user.profile_picture ? ImageLink.ProfilePhoto + `${item.get_user.profile_picture}` : ImageLink.BlankProfileImage }}
                                              />
                                            </View>
                                            <View style={{ flexDirection: 'column', marginHorizontal: 15 }}>
                                              <Text
                                                onPress={() => {
                                                  item.get_user.slug == userSlugName ?
                                                    navigation.navigate("MyProfile", { PublicSlug: item.get_user.slug }) :
                                                    navigation.navigate("PublicProfile", { PublicSlug: item.get_user.slug })
                                                }}
                                                style={{ color: Colors.primary, marginLeft: 2, fontFamily: 'Outfit-SemiBold', fontSize: Normalize(12), textAlign: language == "en" ? "left" : "right" }}>{nameShorting(item.get_user.fname + " " + item.get_user.lname)}</Text>
                                              <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", alignItems: "center" }} >
                                                {
                                                  item.get_user.get_country_info.name &&
                                                  <Text style={{ color: '#818181', marginLeft: 2, fontFamily: 'Outfit-Regular', fontSize: Normalize(11), marginTop: 3 }}>{item.get_user.get_country_info.name}</Text>

                                                }

                                                <View style={{ height: Normalize(11), width: 1, backgroundColor: "#818181", marginHorizontal: "5%", opacity: .8 }} />
                                                <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", marginVertical: Normalize(5) }}>
                                                  <Image
                                                    style={{ width: 13, height: 13, opacity: .8, alignSelf: 'center' }}
                                                    source={images.clockIcon}
                                                    resizeMode="contain" />
                                                  <Text style={{
                                                    color: "#818181", marginHorizontal: 8, fontFamily: 'Outfit-Regular', fontSize: Normalize(11),
                                                    alignSelf: 'center',
                                                  }}>
                                                    {language == "en" ?
                                                      questionEnglishTimeShow(item.created_at) : questionPersianTimeShow(item.created_at)
                                                    }
                                                  </Text>
                                                </View>
                                              </View>
                                              <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", }}>
                                                <View style={{ height: Normalize(15), width: Normalize(100), marginBottom: Normalize(5), flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center" }} >
                                                  {
                                                    reviewShowinStar(item.get_user.avg_review_as_tasker).map((item, index) => (
                                                      item == 0 ?
                                                        <View key={index} style={{ height: Normalize(10), width: Normalize(50), marginHorizontal: Normalize(2) }} >
                                                          <Image source={images.allgray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                        </View> :
                                                        isInt(item) == true ?
                                                          <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                                            <Image source={images.stargolden} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                          </View> :
                                                          <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                                            <Image source={lastStar(item, language)} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                          </View>
                                                    ))
                                                  }
                                                  {
                                                    reviewShowinGraystar(reviewShowinStar(item.get_user.avg_review_as_tasker)).map((item, index) => (
                                                      <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                                        <Image source={images.stargray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                      </View>
                                                    ))
                                                  }
                                                  <Text style={{ color: '#818181', marginLeft: 2, fontFamily: 'Outfit-Regular', fontSize: Normalize(11) }}>({language == "en" ? item.get_user.tot_review_as_tasker : engToPersian(item.get_user.tot_review_as_tasker)})</Text>
                                                </View>
                                              </View>
                                            </View>
                                          </View>
                                        </View>

                                        <View style={{ marginLeft: language == "pr" ? 0 : 75, marginRight: language == "pr" ? 75 : 0 }} >
                                          <Text numberOfLines={proposal_Ques_Length.id == item.id && proposal_Ques_Length.expand ? 1000 : 2}
                                            style={[
                                              styles.textcategory22,
                                              language == 'pr'
                                                ? { ...RtlStyles.textInverse }
                                                : { ...RtlStyles.text },
                                            ]}>
                                            {item.description}
                                          </Text>
                                          {(item.description).length > 120 && <Text
                                            onPress={() => {
                                              readMore_proposal(item.id)
                                            }}
                                            style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: proposal_Ques_Length.id == item.id && proposal_Ques_Length.expand ? Colors.secondary : Colors.primary, textAlign: language == "en" ? "left" : "right", marginTop: "2%" }}>{proposal_Ques_Length.id == item.id && proposal_Ques_Length.expand ? strings.POSTTASK.READLESS : strings.POSTTASK.READMORE}</Text>}
                                          {taskData.get_all_bid == undefined &&
                                            item.get_bid_comment.length == 0 &&
                                            <TouchableOpacity
                                              onPress={onPressreviewOffer}
                                              // onPress={() => console.log(item.id)}
                                              style={{
                                                height: Normalize(15),
                                                width: Normalize(50),
                                                flexDirection: language == "pr" ? "row-reverse" : "row",
                                                alignItems: "center",
                                                marginTop: "2%",
                                                alignSelf: language == "en" ? "flex-start" : "flex-end"
                                              }}>
                                              <View style={{ height: Normalize(9), width: Normalize(9), justifyContent: "center", alignItems: "center" }}>
                                                <Image style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                                                  source={images.reply} />
                                              </View>
                                              <Text style={{
                                                color: Colors.primary, fontFamily: 'Outfit-Medium', fontSize: Normalize(10),
                                                marginHorizontal: Normalize(3)
                                              }}>
                                                {strings.TASKDETAILS.REPLY}
                                              </Text>
                                            </TouchableOpacity>}
                                        </View>
                                        {item.get_bid_comment.length != 0 &&
                                          item.get_bid_comment.map((childItem, childIndex) => (
                                            <View key={childIndex}  >
                                              <View style={{ paddingVertical: Normalize(10), marginTop: 20, flexDirection: language == "en" ? 'row' : "row-reverse", marginLeft: Normalize(50), paddingRight: Normalize(10) }}>
                                                <View style={{ flex: 1, alignItems: "center" }}>
                                                  <View style={{ height: Normalize(33), width: Normalize(33), borderRadius: Normalize(33) / 2, backgroundColor: "#f5f5f5", overflow: "hidden" }}>
                                                    <Image style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                                                      source={{ uri: ImageLink.ProfilePhoto + `${childItem.get_user.profile_picture}` }}
                                                      resizeMode="cover" />
                                                  </View>
                                                </View>
                                                <View style={{ flex: 4, }}>
                                                  <View style={{ flex: 2.5 }}>
                                                    <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center" }} >
                                                      <Text
                                                        onPress={() => {
                                                          childItem.get_user.slug == userSlugName ?
                                                            navigation.navigate("MyProfile", { PublicSlug: childItem.get_user.slug }) :
                                                            navigation.navigate("PublicProfile", { PublicSlug: childItem.get_user.slug })
                                                        }}
                                                        numberOfLines={1} style={{
                                                          color: Colors.primary, fontFamily: 'Outfit-SemiBold',
                                                          fontSize: Normalize(12), textAlign: language == "pr" ? "right" : "left"
                                                        }}>{nameShorting(childItem.get_user.fname + " " + childItem.get_user.lname)}</Text>
                                                      {
                                                        childItem.get_user.slug == taskData.get_user.slug &&
                                                        <View style={{ paddingVertical: Normalize(1.5), paddingHorizontal: Normalize(2), backgroundColor: Colors.primary, marginHorizontal: Normalize(2), borderRadius: 15, justifyContent: "center", alignItems: "center" }} >
                                                          <Text style={{
                                                            color: Colors.white, fontFamily: 'Outfit-SemiBold',
                                                            fontSize: Normalize(6)
                                                          }}>{strings.MAKEANOFFER.POSTER}</Text>
                                                        </View>
                                                      }
                                                    </View>
                                                    <Text style={{
                                                      color: '#818181', fontFamily: 'Outfit-Regular', lineHeight: Normalize(13),
                                                      fontSize: Normalize(10), textAlign: language == "en" ? "left" : "right"
                                                    }}>{childItem.message}</Text>


                                                    <View style={{ marginVertical: Normalize(4) }}>
                                                      <Text numberOfLines={1} style={{
                                                        color: "#818181", fontFamily: 'Outfit-Medium', fontSize: Normalize(10), textAlign: language == "en" ? "left" : "right"
                                                      }}>
                                                        {language == "en" ?
                                                          questionEnglishTimeShow(childItem.created_at) : questionPersianTimeShow(childItem.created_at)
                                                        }
                                                      </Text>

                                                    </View>
                                                    <View style={{ width: "100%", marginTop: Normalize(3), alignItems: language == "en" ? "flex-start" : "flex-end" }} >
                                                      {
                                                        childItem.filename &&
                                                        <>
                                                          <TouchableOpacity
                                                            onPress={() => {
                                                              setQuestionFileName(childItem.filename)
                                                              setQuestionImage(!questionImage)
                                                            }}
                                                            activeOpacity={1}
                                                            style={{ height: Normalize(60), width: Normalize(100), backgroundColor: "#f5f5f5", borderRadius: 4, overflow: "hidden" }} >
                                                            <Image
                                                              source={{ uri: ImageLink.Question + `${childItem.filename}` }}
                                                              style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                                            />
                                                          </TouchableOpacity>
                                                        </>
                                                      }
                                                      {taskData.get_all_bid == undefined &&
                                                        childIndex == (item.get_bid_comment.length - 1) &&
                                                        <TouchableOpacity
                                                          onPress={onPressreviewOffer}
                                                          style={{
                                                            height: Normalize(15),
                                                            width: Normalize(50),
                                                            flexDirection: language == "pr" ? "row-reverse" : "row",
                                                            alignItems: "center",
                                                            alignSelf: language == "en" ? "flex-start" : "flex-end"
                                                          }}>
                                                          <View style={{ height: Normalize(9), width: Normalize(9), justifyContent: "center", alignItems: "center" }}>
                                                            <Image style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                                                              source={images.reply} />
                                                          </View>
                                                          <Text style={{
                                                            color: Colors.primary, fontFamily: 'Outfit-Medium', fontSize: Normalize(10),
                                                            marginHorizontal: Normalize(3)
                                                          }}>
                                                            {strings.TASKDETAILS.REPLY}
                                                          </Text>
                                                        </TouchableOpacity>
                                                      }

                                                    </View>
                                                  </View>
                                                </View>
                                              </View>
                                            </View>
                                          ))
                                        }
                                        {
                                          userid == item.user_id && taskData.status == 2 &&
                                          <View style={{}}>
                                            <TouchableOpacity
                                              onPress={withdrawBotton}
                                              style={{ backgroundColor: "#7db343", borderRadius: 20, marginTop: "2%", width: "100%", justifyContent: "center", alignItems: "center", paddingVertical: Normalize(7) }}>
                                              <Text style={{
                                                fontSize: Normalize(12),
                                                color: Colors.white,
                                                fontFamily: 'Outfit-Medium'
                                              }}>{strings.TASKDETAILS.WITHDRAW}</Text>
                                            </TouchableOpacity>
                                          </View>
                                        }
                                      </View>

                                    ))
                                  }
                                </View>}
                            </>
                          }

                          {/* *****************Question Section************* */}

                          {/* **************Question Show************** */}

                        </View>
                      </ScrollView>
                    </View>
                  </View>
                </CurveDesing_Component>
              </View>
            </SafeAreaView>
      }
    </>
  );
}
export default withRtl(TaskDetailsinMsg);
