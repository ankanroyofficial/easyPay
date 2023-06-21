import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity, Modal, Pressable, TextInput,
  Keyboard, ActivityIndicator, SafeAreaView, Linking, KeyboardAvoidingView, Platform, BackHandler, Share
} from 'react-native';
import styles from './Styles';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import HeaderTask from '../../../../components/HeaderTask';
import images from '../../../../constants/images';
import strings from '../../../../constants/lng/LocalizedStrings';
import { Colors } from '../../../../constants/colors';
import LoaderPage from '../../../../components/LoaderPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { myContext } from '../../../../constants/ContextApi';
import { engToPersian } from '../../../../constants/EnglishToPersian';
import { numberWithCommas, numberWithCommasinParsian } from '../../../../constants/NumberWithComma';
import moment from "moment";
import { axiosUrl, configUrl, ImageLink } from '../../../../constants/LinkPage';
import ImageModal from '../../../../components/ImageModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { RefreshControl } from 'react-native';
import ReviewOfferModal from '../make_an_offer/ReviewOfferModal';
import Pusher from 'pusher-js';
import { LogBox } from 'react-native';
import pusherConfig from './../../../../../pusher.json';
import ReviewOfferModalforSingle from '../make_an_offer/ReviewOfferModalforSingle';
import AcceptOfferinProposal from '../make_an_offer/AcceptOfferinProposal old';
import { nameShorting } from '../../../../constants/NameShorting';
import { isInt, reviewShowinGraystar, reviewShowinStar, lastStar } from '../../../../constants/RatingCount';
import ReportTaskPage from '../../../../components/ReportTaskPage';
import WarningPage from '../../../../components/WarningPage';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import IncreasepriceModal_For_Tasker from '../make_an_offer/IncreasepriceModal_For_Tasker';
import IncreasepriceModal_For_Poster from '../make_an_offer/IncreasepriceModal_For_Poster';
import ReviewRequestModal from '../make_an_offer/ReviewRequestModal';
import Reschedule_Schedule from '../make_an_offer/Reschedule_Schedule';
import { leftOrRight, rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import GiveReviewModal from '../make_an_offer/GiveReviewModal';
import axiosInstance from '../../../../constants/AxiosCallPage';
import axios from 'axios';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { androidCameraPermission } from '../../../../constants/permissions/Permissions';
import MapView, { Marker } from 'react-native-maps';
import TwoHorizantalLine from '../../../../components/TwoHorizantalLine';
import { testingText } from '../../../../constants/TestingConstant';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import CancelTask from '../make_an_offer/CancelTask';
import SucessModalDesign from '../../../../components/SucessModalDesign';
import { countPage } from '../../../../components/BrowserTaskPageCount';
import WarningPage2 from '../../../../components/WarningPage2';
import ReviewScheduleRequestModal from '../make_an_offer/ReviewScheduleRequestModal';
import { getdate_day_English, timeFunc } from '../../../../constants/DateShow';
import Button from '../../../../components/Button';
import RescheduleRequestModal from '../make_an_offer/RescheduleRequestModal';

// task status details
// 1=>Draf,2=>Open,3=>Awarded,4=>InProgress,5=>Completed,6=>Canceled,7=>Closed,8=>admin Canceled,9=>Block,10=>Deleted,11=>expired

function TaskDetails({ navigation, route }) {

  const textInptRef = useRef();
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
    taskdetailsData, setTaskdetailsData,
    taskdetailsLoader, setTaskdetailsLoader,
    setNewOfferPageMessageArry,
    newOfferPageMessageWithTaskerArry,
    setNewOfferPageMessageWithTaskerArry,
    cancelOfferSucessModal, setCancelOfferSucessModal,
    makeAnOfferInitialPopupModal, setMakeAnOfferInitialPopupModal,
    tierData, setTierData, setAllNewMyTask, setTaskDataForMap,
    setBrowserTaskFooterText,
    setBrowsertaskCurrentPage,
    setBrowsertaskTotalPage,
    setTaskData,

    filter_Categories,
    keyWord,
    cateIds,
    browserLat,
    browserLng,
    distance,
    browsertype,
    order_by,
    isOpenOfferin_filter, drawerTabNaviData, setDrawerTabNaviData,
    userId
  } = useContext(myContext)
  const tomorrowDate = moment(new Date()).add(1, 'days').format("YYYY-MM-DD");
  const scrollView = useRef();
  const { show, from, browserslug, tab } = route.params;
  const [loader, setLoader] = useState(false)
  const [menuModal, setMenuModal] = useState(false)
  const [imageToggle, setImageToggle] = useState(false)
  const [userid, setUserid] = useState(userId);
  const [imageModal, setImageModal] = useState(false);
  const [reviewOfferModal, setReviewOfferModal] = useState(false);
  const [reviewmodalforsingle, setReviewmodalforsingle] = useState(false);
  const [imageUri, setImageUri] = useState("")
  const [questionFileName, setQuestionFileName] = useState("")
  const [dateConvert, setDateConvert] = useState("")
  const [allquestion, setAllquestion] = useState([])
  const [questionImage, setQuestionImage] = useState(false)
  const [userSlugName, setUserSlugName] = useState("")
  const [questionMessage, setQuestionMessage] = useState("")
  const [questionSelectedImage, setQuestionSelectedImage] = useState(false)
  const [mainquestionMessage, setmainquestionMessage] = useState("")
  const [mainquestionSelectedImage, setMainquestionSelectedImage] = useState(false)
  const [replyToggle, setReplyToggle] = useState(false)
  const [questionId, setQuestionId] = useState()
  const [profileImageName, setProfileImageName] = useState("")
  const [refreshing, setRefreshing] = React.useState(false);
  const [proposalTextToggle, setProposalTextToggle] = React.useState({ id: 0, expand: false });
  const [proposalReplyTextToggle, setProposalReplyTextToggle] = React.useState({ id: 0, expand: false });
  const [withdrawButtonLoader, setWithdrawButtonLoader] = React.useState(false)
  const [questionLength, setQuestionLength] = React.useState({ id: 0, expand: false })
  const [proposal_Ques_Length, setProposal_Ques_Length] = React.useState({ id: 0, expand: false })
  const [replyLength, setReplyLength] = React.useState({ id: 0, expand: false })
  const [taskDescriptionExpand, setTaskDescriptionExpand] = React.useState(false)
  const [singleProposalReplyID, setSingleProposalReplyID] = React.useState(0)
  const [otherJobNumber, setOtherJobNumber] = React.useState({ count: 5, expand: false })
  const [paymentRequired, setPaymentRequired] = React.useState(false);
  const [itemId, setItemId] = useState()
  const [taskReportModal, setTaskReportModal] = React.useState(false);
  const [warningModal, setWarningModal] = useState(false)
  const [cancelTaskModal, setCancelTaskModal] = useState(false)
  const [increasepriceModal_tasker, setIncreasepriceModal_tasker] = useState(false)
  const [increasepriceModal_poster, setIncreasepriceModal_poster] = useState(false)
  const [reviewRequestModal_poster, setReviewRequestModal_poster] = useState(false)
  const [scheduleModal, setScheduleModal] = useState(false)
  const [reviewScheduleModal, setReviewScheduleModal] = useState(false)
  const [releaseModal, setReleaseModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [releaseRequestModal, setReleaseRequestModal] = useState(false)
  const [reviewModal, setReviewModal] = useState(false)
  const [fromWhereModal_mainQuestion, setFromWhereModal_mainQuestion] = useState(false)
  const [fromWhereModal_replyQuestion, setFromWhereModal_replyQuestion] = useState(false)
  const [func, setFunc] = useState(false)
  const [opentab, setopentab] = useState("2")
  const [isTaxId, setIsTaxId] = useState(false)
  const [isAllVerificatonNotComplete, setIsAllVerificatonNotComplete] = useState(false)
  const [myOffersDetails, setMyOffersDetails] = useState({
    highest_offers: [],
    lowest_offers: [],
    nearbyfixeroffer: [],
    recommended_fixer_sort_based_on_rating: []
  })
  const [myOfferSortByWhichType, setMyOfferSortByWhichType] = useState("Highest Offers")
  const [isMyOfferSortingModal, setIsMyOfferSortingModal] = useState(false)
  const [isAllVerificatonNotCompleteforquestion, setIsAllVerificatonNotCompleteforquestion] = useState(false)
  const [isVerificatonpendingforquestion, setIsVerificatonpendingforquestion] = useState(false)
  const [replyQuestionDetails, setReplyQuestionDetails] = useState({
    parent_id: 0,
    lastMessage: "",
    replyTo: ""
  })
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const [isRescheduleRequestModal, setIsRescheduleRequestModal] = useState(false)
  const [questionLoader, setQuestionLoader] = useState(false)

  const onpressRescheduleRequestModal = () => {
    setIsRescheduleRequestModal(!isRescheduleRequestModal)
  }

  // const onpressRescheduleRequestModal = () => {
  //   if(isRescheduleRequestModal){
  //     setIsRescheduleRequestModal(false)
  //     autoLoad()
  //   }else{
  //     setIsRescheduleRequestModal(true)

  //   }
  // }




  const myOfferSortingOption = [
    {
      name: "Highest Offers",
    },
    {
      name: "Lowest Offers",
    },
    {
      name: "Near by fixer offer",
    },
    {
      name: "Based on rating",
    }
  ]

  // console.log(taskdetailsData.highest_offers)

  const myOfferWhichArry = (val) => {
    try {

      // console.log(val)

      let allarry = taskdetailsData;
      switch (val) {
        case "All": return [];
        case "Highest Offers": return allarry.highest_offers;
        case "Lowest Offers": return allarry.lowest_offers;
        case "Near by fixer offer": return allarry.nearbyfixeroffer;
        case "Based on rating": return allarry.recommended_fixer_sort_based_on_rating;
        default: return allarry.highest_offers;
      }
    } catch (error) {
      console.log("myOfferWhichArry", error)
    }
  }
  LogBox.ignoreLogs(['Setting a timer for a long period of time'])

  const onPressSortingButton = () => {
    setIsMyOfferSortingModal(!isMyOfferSortingModal)
  }

  const ModalMyOfferSorting = () => {
    return (
      <Modal
        visible={isMyOfferSortingModal}
        transparent
        onRequestClose={onPressSortingButton}
      >
        <Pressable
          onPress={onPressSortingButton}
          style={{ flex: 1, paddingRight: Normalize(15) }} >
          <View style={{ backgroundColor: Colors.white, padding: Normalize(5), width: Normalize(130), marginTop: Normalize(273), alignSelf: "flex-end", borderRadius: Normalize(5), borderColor: Colors.secondaryBorder, borderWidth: Normalize(1), elevation: 2 }}  >
            {myOfferSortingOption.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    onPressSortingButton()
                    setMyOfferSortByWhichType(item.name)
                  }}
                  key={index} activeOpacity={0.8} style={{ paddingVertical: Normalize(4), alignItems: "center", justifyContent: "center" }}>
                  <Text style={globalstyles.plantext_outfit_regular}>{item.name}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </Pressable>
      </Modal>
    )
  }
  const onRefresh = () => {
    setRefreshing(true);
    autoLoad1()
    Toast.show(strings.ERROR.REFRESHING)
    setRefreshing(false)
  };
  const getData2 = async () => {
    try {
      let userid = await AsyncStorage.getItem("userid");
      let slug = await AsyncStorage.getItem("slug");
      setUserSlugName(slug)
      setUserid(userid)
      const data = await axios.post(`${axiosUrl.URL}public-profile`, {
        "jsonrpc": "2.0",
        "params": {
          "slug": slug
        }
      })
      if (data.data.result) {
        const res = data.data.result.user
        if (res.tax_id != null && res.tax_id != "") {
          setIsTaxId(true)
        }
      }
    } catch (error) {
      console.log("getData2_taskdetails------", error)
    }
  }
  useEffect(() => {
    getData2()
    getData()
  }, []);
  const getTireData = async () => {
    try {
      const res = await axiosInstance.post("my-dashboard")
      if (res.data.result) {
        setTierData(res.data.result.tier)
      }
    } catch (error) {
      console.log("getTireData_taskdeatails----------", error)
    }
  }

  const isRescheduleRequestModalOpenFromUseEffect = (item) => {
    try {
      if (item.task != null) {
        if (taskdetailsData.status == 3 && item.task.get_reschedule_request != null && item.task.get_reschedule_request.confirmation_status == "awaiting_approval" && userid == show.task.get_bid[0].get_user.id) {
          onpressRescheduleRequestModal()
        }
      }
    } catch (error) {
      console.log("isRescheduleRequestModalOpenFromUseEffect -", error)
    }
  }
  const getData = async () => {
    try {

      if (browserslug == undefined) {
        let a = show;
        let oldTaskdata = show.task;

        // oldTaskdata.lowest_offers = a.lowest_offers;
        //   oldTaskdata.highest_offers = a.highest_offers;
        //   oldTaskdata.nearbyfixeroffer = a.nearbyfixeroffer;
        //   oldTaskdata.recommended_fixer_sort_based_on_rating = a.recommended_fixer_sort_based_on_rating

        setTaskdetailsData(show)
        isRescheduleRequestModalOpenFromUseEffect(show)

        // console.log("????", show)


        setMyOffersDetails({
          highest_offers: show.highest_offers,
          lowest_offers: show.lowest_offers,
          nearbyfixeroffer: show.nearbyfixeroffer,
          recommended_fixer_sort_based_on_rating: show.recommended_fixer_sort_based_on_rating
        })
        const date = show.due_date
        if (date != null) {
          englishDate(date)
        }
        setAllquestion(show.get_question)
      } else {
        const res = {
          "jsonrpc": "2.0",
          "params": {
            "slug": browserslug
          }
        }
        const data = await axiosInstance.post("get-task-details", res)
        if (data.data.result) {
          console.log("task id -- 1", data.data.result.task.id)
          let a = data.data.result;
          let oldTaskdata = data.data.result.task;
          oldTaskdata.lowest_offers = a.lowest_offers;
          oldTaskdata.highest_offers = a.highest_offers;
          oldTaskdata.nearbyfixeroffer = a.nearbyfixeroffer;
          oldTaskdata.recommended_fixer_sort_based_on_rating = a.recommended_fixer_sort_based_on_rating

          // console.log(oldTaskdata)

          setTaskdetailsData(oldTaskdata)
          const date = data.data.result.task.due_date
          if (date != null) {
            englishDate(date)
          }
          setAllquestion(data.data.result.task.get_question)
        }
      }
    } catch (error) {
      console.log("getData---------", error)
    }
  }
  const getData_after_similarTask = async (data) => {
    try {


      let a = data;
      let oldTaskdata = data.task;

      oldTaskdata.lowest_offers = a.lowest_offers;
      oldTaskdata.highest_offers = a.highest_offers;
      oldTaskdata.nearbyfixeroffer = a.nearbyfixeroffer;
      oldTaskdata.recommended_fixer_sort_based_on_rating = a.recommended_fixer_sort_based_on_rating

      setTaskdetailsData(oldTaskdata)
      const date = data.task.due_date
      if (date != null) {
        englishDate(date)
      }
      setAllquestion(data.task.get_question)
      setTaskdetailsLoader(false)
      AsyncStorage.removeItem("similartaskSlug")
    } catch (error) {
      console.log("getData_after_similarTask---------- ", error)
    }
  }

  useEffect(() => {

    autoLoad1()

  }, [
    reviewOfferModal,
    reviewmodalforsingle,
    paymentRequired,
    refreshing,
    increasepriceModal_tasker,
    reviewRequestModal_poster,
    increasepriceModal_poster,
    scheduleModal,
    reviewScheduleModal,
    releaseRequestModal,
    releaseModal,
    reviewModal,
    warningModal,
    isRescheduleRequestModal
  ])



  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      if (tab == undefined) {
        setopentab("2")
      } else if (tab == "offer") {
        setopentab("3")
      } else if (tab == "question") {
        setopentab("1")
        msgScrollDown()
      }


      getTireData()
      loadAfterSimilarTask()
      isOpenReschedule_Schedule()
    });
    return willFocusSubscription;
  }, [])

  const isOpenReschedule_Schedule = async () => {
    let rescheduleOpen = await AsyncStorage.getItem("rescheduleOpen")
    // console.log("rescheduleOpen>>>>>>>>", rescheduleOpen)
    if (rescheduleOpen != null) {
      onpressScheduleButton()
      await AsyncStorage.removeItem("rescheduleOpen")
    }
  }


  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      isloadAferCameBackLoad()
    });
    return willFocusSubscription;
  }, [userSlugName])


  const isloadAferCameBackLoad = async () => {
    try {
      let offerReload = await AsyncStorage.getItem("offerReload")
      // console.log("is load-------->", offerReload)
      if (offerReload != null) {
        autoLoad()
      }
    } catch (error) {
      console.log("isloadAferCameBackLoad", error)
    }
  }
  const loadAfterSimilarTask = async () => {
    let a = await AsyncStorage.getItem("similartaskSlug")
    // console.log("new slug-------->", a)
    if (a != null) {
      getData_after_similarTask(JSON.parse(a))
    }
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
  const contextClean = () => {
    setId(""),
      setCategory_id(""),
      setCategory_image(""),
      setSubcategory_id(""),
      setTitle(""),
      setDescription(""),
      setType("P"),
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
      setDate_type("B")
    setImageFinalArray([]),
      setY2(),
      setD2(),
      setM2(),
      setPerShowDate(""),
      setApiImages([]),
      setMust_Have([])
  }
  const editTask = async () => {
    setTaskDetails(taskdetailsData.slug)
    setMenuModal(!menuModal)
    setEditOrpostsimilar("edit")
    contextClean()
    const data = {
      jsonrpc: '2.0',
      params: {
        slug: taskdetailsData.slug,
      },
    };
    const res = await axiosInstance.post('get-edit-task', data);
    // console.log(res.data.result.task.time)
    if (res.data.result) {
      navigation.navigate("EditTaskDetails", { slug_name: res.data.result.task })
    }
  }

  // console.log("taskdetailsData.slug---",taskdetailsData.slug)
  const similarTask = async () => {
    setTaskDetails(taskdetailsData.slug)
    setMenuModal(!menuModal)
    contextClean()
    setEditOrpostsimilar("similarpost")
    const data = {
      jsonrpc: '2.0',
      params: {
        slug: taskdetailsData.slug,
      },
    };
    const res = await axiosInstance.post('get-similar-task', data);
    // console.log(res.data)
    if (res.data.result) {
      navigation.navigate("EditTaskDetails", { slug_name: res.data.result.task })
    }
  }
  const repostTask = async () => {
    setTaskDetails(taskdetailsData.slug)
    contextClean()
    setEditOrpostsimilar("repostTask")
    const data = {
      jsonrpc: '2.0',
      params: {
        slug: taskdetailsData.slug,
      },
    };
    const res = await axiosInstance.post('get-similar-task', data);
    // console.log(res.data)
    if (res.data.result) {
      navigation.navigate("EditTaskDetails", { slug_name: res.data.result.task })
    }
  }
  const imagesModalOpen = (val) => {
    setImageModal(!imageModal)
    setImageUri(val)
  }
  const cancelTask = async () => {
    try {
      setMenuModal(!menuModal)
      // setLoader(true)
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "slug": taskdetailsData.slug
        }
      }
      const data = await axiosInstance.post("cancel-task", res)
      if (data.data.error == undefined) {
        Toast.show(data.data.result.status.meaning)
        await AsyncStorage.setItem("isMyTaskloader", "true")
        await AsyncStorage.setItem("isBrowserTaskloader", "true")
        // setLoader(false)
        navigation.goBack()
      } else {
        Toast.show(data.data.error.meaning)
      }
    } catch (error) {
      console.log("cancelTask", error)
    }
  }
  const deleteTask = async () => {
    try {
      setMenuModal(!menuModal)
      // setLoader(true)
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "slug": taskdetailsData.slug
        }
      }
      const data = await axiosInstance.post("delete-task-by-user", res)

      // console.log(data.data)

      if (data.data.result) {
        Toast.show(data.data.result.meaning)
        await AsyncStorage.setItem("isMyTaskloader", "true")
        await AsyncStorage.setItem("isBrowserTaskloader", "true")
        navigation.goBack()
      } else {
        Toast.show(data.data.error.meaning)
      }
    } catch (error) {
      console.log("deleteTask", error)
    }
  }
  const englishDate = (val) => {
    let m = moment(val).format('Do MMM,YYYY');
    setDateConvert(m)
  }
  const onPressAllNotverify = () => {
    setIsAllVerificatonNotComplete(!isAllVerificatonNotComplete)
  }
  const onPressDeleteTask = () => {
    setDeleteModal(!deleteModal)
  }
  const onPressreviewOffer = () => {
    setReviewOfferModal(!reviewOfferModal)
  }
  const onPressTaskReport = () => {
    setTaskReportModal(!taskReportModal)
  }
  const onPressreviewforsingle = () => {
    setReviewmodalforsingle(!reviewmodalforsingle)
  }
  const onPresspaymentRequired = () => {
    setPaymentRequired(!paymentRequired)
  }
  const withdrawOnpress = () => {
    setWarningModal(!warningModal)
  }
  const releaseRequestOnpress = () => {
    setReleaseRequestModal(!releaseRequestModal)
  }
  const releaseOnpress = () => {
    setReleaseModal(!releaseModal)
  }
  const cancelTaskOnpress = () => {
    setCancelTaskModal(!cancelTaskModal)
  }
  const withdrawCancelOnpress = () => {
    withdrawOnpress()
  }
  const onpressShare = async () => {
    try {

      const result = await Share.share({
        message: 'https://eazypay.com/taskdetails/' + taskdetailsData.slug,
        // message:"eazypay://taskdetails/noooooo-nooo-466",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  }


  const onpressScheduleButton = () => {
    setScheduleModal(!scheduleModal)
  }

  // const onpressScheduleButton = () => {
  //   if(scheduleModal){
  //     setScheduleModal(false)
  //     autoLoad()
  //   }else{
  //     setScheduleModal(true)
  //   }
  // }




  const onpressReviewScheduleButton = () => {
    setReviewScheduleModal(!reviewScheduleModal)
  }
  const newMessageSendButton = async () => {
    try {
      setQuestionLoader(true)
      let msgDetails = {
        parent_id: replyQuestionDetails.parent_id,
        lastMessage: replyQuestionDetails.lastMessage,
        replyTo: replyQuestionDetails.replyTo
      }
      setReplyQuestionDetails({
        parent_id: 0,
        lastMessage: "",
        replyTo: ""
      })

      const message = mainquestionMessage.trim()
      setmainquestionMessage("")

      const parent_id = parseInt(msgDetails.parent_id)
      const socket_id = parseFloat(socketId)
      let isScrollDown = msgDetails.parent_id ? false : true
      const finalFormData = new FormData();
      finalFormData.append('slug', taskdetailsData.slug);
      finalFormData.append('parent_id', parent_id);
      finalFormData.append('message', message);
      socketId.length == 0 ?
        finalFormData.append('socket_id', "7534.23627811") :
        finalFormData.append('socket_id', socket_id);
      const data = finalFormData
      const res = await axiosInstance.post("ask-question", data)

      console.log("task id -- 5", res.data.result.task.id)

      if (res.data.task_question) {
        setAllquestion(res.data.result.task.get_question)
        setQuestionLoader(false)
        if (isScrollDown) {
          scrollView.current.scrollToEnd()
        }
      } else {
        setQuestionLoader(false)
        Toast.showWithGravity(res.data.error.meaning, Toast.LONG, Toast.BOTTOM);
      }
    } catch (error) {
      setQuestionLoader(false)
      console.log("newMessageSendButton", error)
    }
  }

  const msgScrollDown = () => {
    scrollView.current.scrollToEnd()
  }

  // console.log(taskdetailsData.id," ",taskdetailsData.title)

  const onpressReplyButton = (item, message, name) => {
    setReplyQuestionDetails({
      parent_id: item.id,
      lastMessage: message,
      replyTo: name
    })
    if (!isKeyboardVisible) {
      textInptRef.current.focus()
    }
  }
  // console.log(replyQuestionDetails)
  // console.log(isKeyboardVisible)



  const getAllMessage = async () => {
    try {
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "slug": taskdetailsData.slug
        }
      }
      const data = await axiosInstance.post("get-task-details", res)
      if (data.data.result) {
        console.log("task id -- 2", data.data.result.task.id)
        setAllquestion(data.data.result.task.get_question)


        let a = data.data.result;
        let oldTaskdata = data.data.result.task;

        oldTaskdata.lowest_offers = a.lowest_offers;
        oldTaskdata.highest_offers = a.highest_offers;
        oldTaskdata.nearbyfixeroffer = a.nearbyfixeroffer;
        oldTaskdata.recommended_fixer_sort_based_on_rating = a.recommended_fixer_sort_based_on_rating

        setTaskdetailsData(oldTaskdata)

        const date = data.data.result.task.date
        if (date != null) {
          englishDate(date)
        }
      }
    } catch (error) {
      console.log("getAllMessage", error)
    }
  }
  const questionEnglishTimeShow = (val) => {
    const a = moment(val, 'YYYY-MM-DD HH:mm:ss',).format('Do MMM YYYY hh:mm A')
    return a
  }
  const questionPersianTimeShow = (val) => {
    const a = val.substr(0, 10)
    let datemonthyear = moment(a, 'YYYY-MM-DD').locale('fa').format('YYYY/M/D');
    return engToPersian(datemonthyear)
  }
  const MakeanofferButton = ({ onPress, disabled, title, color, textColor }) => {
    // console.log(color, textColor)
    return (
      <TouchableOpacity activeOpacity={0.8}
        onPress={onPress}
        style={{ height: "61%", width: "90%", backgroundColor: disabled ? "#e7ebfb" : Colors.secondary, borderRadius: Normalize(5), justifyContent: "center", alignItems: "center", marginBottom: Normalize(12) }}>
        <Text style={{ fontFamily: fontfmliy.bold, fontSize: Normalize(14), color: disabled ? "#bbc2dc" : Colors.white, }}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }
  const isMyBid = (val) => {
    var myBid = false
    val.map((item) => {
      if (userid == item.get_user.id) {
        myBid = true
      }
    })
    return myBid
  }
  const isMyBidRejected = (val) => {
    let myBidRejected = false
    val.map((item) => {
      // console.log(">>><<<", item)
      if (userid == item.get_user.id) {
        if (item.bid_status == "Reject") {
          myBidRejected = true
        }
      }
    })
    return myBidRejected
  }

  // console.log("isMyBidRejected>>>",isMyBidRejected(taskdetailsData.highest_offers))

  const myBidAmount = (val) => {
    var a;
    val.map((item) => {
      if (userid == item.get_user.id) {
        a = Math.round(item.amount)
      }
    })
    return a
  }
  const youllRecived = (val) => {
    var a;
    val.map((item) => {
      if (userid == item.get_user.id) {
        a = Math.round(item.recive_amount)
      }
    })
    return a
  }
  const myBidId = (val) => {
    var a;
    val.map((item) => {
      if (userid == item.get_user.id) {
        a = item.id
      }
    })
    return a
  }
  const withdraw = async () => {
    setWithdrawButtonLoader(true)
    try {
      setLoader(true)
      const data = {
        "jsonrpc": "2.0",
        "params": {
          "slug": taskdetailsData.slug,
          "id": myBidId(taskdetailsData.get_bid),
          "socket_id": socketId == "" ? "7533.23472117" : socketId
        }
      }
      const res = await axiosInstance.post("withdraw-an-offer", data)

      // console.log(res.data)
      if (res.data.result) {
        withdrawOnpress()
        Toast.show(res.data.result.status.meaning)
        // getData()
        setLoader(false)
      } else {
        Toast.show("Withdraw cancel")
        withdrawOnpress()
        // getData()
      }

      // console.log(res.data)

    } catch (error) {
      console.log("withdraw", error)
      setLoader(false)
    }
    setWithdrawButtonLoader(false)
  }
  const withdrawBotton = () => {
    withdrawOnpress()
  }
  const OfferTypeBox = () => (
    <View style={{
      width: '99%',
      height: Normalize(155),
      alignSelf: 'center',
      backgroundColor: Colors.white,

    }}>
      <View style={{ flex: 1.3, justifyContent: "center", alignItems: "center" }}>
        {
          taskdetailsData.budget <= 0 ?
            <Text style={{
              fontSize: Normalize(17),
              color: Colors.green_new_2,
              fontFamily: fontfmliy.bold,
              paddingHorizontal: "1.5%"
            }}>Open Offer</Text>
            :
            <Text style={styles.priceText}>{strings.BROWSEFILTER.TOMAN} {numberWithCommas(taskdetailsData.budget)}</Text>
        }

        <Text style={{ fontSize: Normalize(12), marginTop: Normalize(10), fontFamily: fontfmliy.bold, color: Colors.grey }}>
          {/* {strings.TASKDETAILS.BUDGET} */}
          Estimated Task Price
        </Text>

      </View>
      <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", justifyContent: "center" }}>
        {
          taskdetailsData.status == 2 ?

            taskdetailsData.get_user.id == userid ?

              taskdetailsData.get_bid.length > 0 ?
                <MakeanofferButton
                  // onPress={onPressreviewOffer}
                  onPress={() => setopentab("3")}

                  disabled={false}
                  title={"View Offers"}
                /> :
                <MakeanofferButton
                  // color={Colors.secondary}
                  // textColor={Colors.white}
                  onPress={() => setopentab('3')}
                  // disabled={true}
                  title={"View Offers"}
                // title={strings.TASKDETAILS.AWAITINGREPLY}
                />
              :
              taskdetailsData.get_bid.length > 0 ?
                isMyBid(taskdetailsData.get_bid) ?

                  <MakeanofferButton
                    disabled={isMyBidRejected(taskdetailsData.highest_offers)}
                    title={isMyBidRejected(taskdetailsData.highest_offers) ? "Your offer rejected" : "update offer"}
                  /> :
                  <MakeanofferButton
                    onPress={makeAnOfferOnpress}
                    disabled={isMyBidRejected(taskdetailsData.highest_offers)}
                    title={isMyBidRejected(taskdetailsData.highest_offers) ? "Your offer rejected" : strings.TASKDETAILS.MAKEANOFFER}
                  /> :
                <MakeanofferButton
                  onPress={makeAnOfferOnpress}
                  disabled={isMyBidRejected(taskdetailsData.highest_offers)}
                  title={isMyBidRejected(taskdetailsData.highest_offers) ? "Your offer rejected" : strings.TASKDETAILS.MAKEANOFFER}
                /> :
            taskdetailsData.status == 6 ?
              <MakeanofferButton
                // color={Colors.lightGrey}
                onPress={repostTask}
                // title={strings.TASKDETAILS.CANCELLED}
                title={"Repost this task"}
              /> :
              taskdetailsData.status == 3 ?
                taskdetailsData.user_id == userid || taskdetailsData.get_bid.user_id == userid ?
                  <MakeanofferButton
                    onPress={() => {
                      navigation.navigate('ChatPage', {
                        show: taskdetailsData.slug,
                      })
                    }}
                    title={strings.TASKDETAILS.PRIVATEMESSAGE}
                  />
                  :
                  <MakeanofferButton
                    // color={Colors.lightGrey}
                    // onPress={() => console.log("assign task")}
                    disabled={true}
                    title={strings.TASKDETAILS.ASSIGNTASK}
                  />
                :
                taskdetailsData.status == 4 ?

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
    pusher.connection.bind("connected", () => {
      var socketId = pusher.connection.socket_id;
      setSocketId(socketId)
    });
  }
  const autoLoad1 = async () => {
    try {
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "slug": taskdetailsData.slug
        }
      }
      // console.log("is autoLoad run", res)
      const data = await axiosInstance.post("get-task-details", res)
      // console.log("is autoLoad run", data.data)
      if (data.data.result) {
        console.log("task id -- 3", data.data.result.task.id)
        let a = data.data.result;
        let oldTaskdata = data.data.result.task;

        oldTaskdata.lowest_offers = a.lowest_offers;
        oldTaskdata.highest_offers = a.highest_offers;
        oldTaskdata.nearbyfixeroffer = a.nearbyfixeroffer;
        oldTaskdata.recommended_fixer_sort_based_on_rating = a.recommended_fixer_sort_based_on_rating

        setTaskdetailsData(oldTaskdata)
        const date = data.data.result.task.date
        if (date != null) {
          englishDate(date)
        }
        setAllquestion(data.data.result.task.get_question)

      } else {

      }
    } catch (error) {
      console.log("autoLoad1 - ", error)
    }
  }
  const autoLoad = async () => {
    try {
      setFunc(true)
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "slug": taskdetailsData.slug
        }
      }
      // console.log("is autoLoad run", res)
      const data = await axiosInstance.post("get-task-details", res)
      if (data.data.result) {
        console.log("task id -- 4", data.data.result.task.id)
        let a = data.data.result;
        let oldTaskdata = data.data.result.task;
        oldTaskdata.lowest_offers = a.lowest_offers;
        oldTaskdata.highest_offers = a.highest_offers;
        oldTaskdata.nearbyfixeroffer = a.nearbyfixeroffer;
        oldTaskdata.recommended_fixer_sort_based_on_rating = a.recommended_fixer_sort_based_on_rating
        setTaskdetailsData(oldTaskdata)
        const date = data.data.result.task.date
        if (date != null) {
          englishDate(date)
        }
        setAllquestion(data.data.result.task.get_question)
        setFunc(false)
      } else {
        setFunc(false)
      }
    } catch (error) {
      console.log("autoLoad - ", error)
    }
  }
  const getAutoMessage = async () => {
    try {
      setFunc(true)
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "slug": taskdetailsData.slug
        }
      }
      // console.log("is autoLoad run", res)
      const data = await axiosInstance.post("get-task-details", res)
      if (data.data.result) {
        console.log("task id -- 6", data.data.result.task.id)
        setAllquestion(data.data.result.task.get_question)
        setFunc(false)
      } else {
        console.log(data.data)
      }
    } catch (error) {
      console.log("getAutoMessage - ", error)
    }
  }

  const getAutoMsgPusher = () => {
    const pusher = new Pusher(pusherConfig.key, pusherConfig);
    let channel = pusher.subscribe("eazypay-development");

    // pusher.connection.bind("connected", () => {
    //   var socketid = pusher.connection.socket_id;
    //   setSocketId(socketid)
    // });



    let userAccountId = userid
    channel.bind('send-notification-count', function (data) {
      if (data) {
        if (parseInt(data.user_id) == parseInt(userAccountId)) {
          setDrawerTabNaviData(data)
        }
      }
    })
    channel.bind('question-event', function (data) {
      getAutoMessage()
    })
  }


  // const getAllData = () => {
  //   const pusher = new Pusher(pusherConfig.key, pusherConfig);
  //   let channel = pusher.subscribe("eazypay-development");
  //   pusher.connection.bind("connected", () => {
  //     var socketid = pusher.connection.socket_id;
  //     // console.log("****", socketId)
  //     setSocketId(socketid)
  //   });



  //   channel.bind('bid-apply-event', function (data) {
  //     if (data) {
  //       !func && autoLoad()
  //     }
  //   })
  //   channel.bind('bid-withdraw-event', function (data) {
  //     if (data) {
  //       !func && autoLoad()
  //     }
  //   })
  //   channel.bind('bid-update-event', function (data) {
  //     if (data) {
  //       !func && autoLoad()
  //     }
  //   })
  //   channel.bind('bid-reply-event', function (data) {
  //     if (data) {
  //       !func && autoLoad()
  //     }
  //   })
  //   channel.bind('task-assign-event', function (data) {
  //     if (data) {
  //       !func && autoLoad()
  //     }
  //   })
  // }

  useEffect(() => {
    pusherFunc()
  }, [])
  const pusherFunc = () => {
    getSocketId()
    // getAllData()
    getAutoMsgPusher()
  }
  const replyReadMore = (val) => {
    if (replyLength.id == val && replyLength.expand == true) {
      setReplyLength({ id: val, expand: false })
    } else {
      setReplyLength({ id: val, expand: true })
    }
  }
  const questionReadMore = (val) => {
    if (questionLength.id == val && questionLength.expand == true) {
      setQuestionLength({ id: val, expand: false })
    } else {
      setQuestionLength({ id: val, expand: true })
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
          "slug": taskdetailsData.slug
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
        releaseRequestOnpress()
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
      const data = {
        "params": {
          "slug": taskdetailsData.slug,
          "socket_id": socketId == "" ? "7533.23472117" : socketId
        }
      }
      const res = await axiosInstance.post("release-payment", data)

      if (res.data.status == "1") {
        // await AsyncStorage.setItem("isMyTaskloader", "true")
        // await AsyncStorage.setItem("isBrowserTaskloader", "true")
        releaseOnpress()
      } else {
        Toast.show(res.data.error.message)
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log("onpressRelease", error)
    }
  }
  const getServicesFees = (val) => {
    try {
      var a = 0
      if (val.length == 1) {
        a = val[0].amount - val[0].recive_amount
        // return Math.round(a)
      } else {
        val.map((item) => {
          if (item.user_id == userid) {
            a = item.amount - item.recive_amount
          }
        })
      }
      return Math.round(a)
    } catch (error) {
      console.log(error)
    }
  }
  const three_boxData = [
    {
      "title": strings.TASKDETAILS.TOTALOFFERSUBMITTED,
      // "data": taskdetailsData == null ? "0" : taskdetailsData.tot_bids
      "data": taskdetailsData == null ? "0" : (taskdetailsData.highest_offers).length
    },
    {
      "title": strings.TASKDETAILS.TOTALVIEWS,
      "data": taskdetailsData == null ? "0" : taskdetailsData.tot_view
    },
    {
      "title": strings.TASKDETAILS.TASKSTATUS,
      "data": getstatus(taskdetailsData == null ? 2 : taskdetailsData.status)
    },
  ]

  // console.log(taskdetailsData)

  const Three_grayBox = ({ title, val, index }) => {
    return (
      <View key={index} style={{ height: "100%", width: "31%", backgroundColor: "#9CA3AC", justifyContent: "center", alignItems: "center", borderRadius: Normalize(3) }} >
        <Text style={{ fontSize: Normalize(10), fontFamily: fontfmliy.regular, color: Colors.white, marginBottom: Normalize(3) }} >{title}</Text>
        <Text style={{ fontSize: Normalize(10), fontFamily: fontfmliy.bold, color: Colors.white }} >{val}</Text>
      </View>
    )
  }
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setIsKeyboardVisible(true))
    Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss();
      setIsKeyboardVisible(false)
    })
  }, [])
  const handleBackButtonClick = () => {
    if (from == undefined) {
      navigation.goBack()
    } else {
      navigation.navigate({
        name: "My tasks",
        params: {
          screen: "MyTasks",
        },
      })
    }
    return true;
  }
  useEffect(() => {
    const a = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      a.remove();
    };
  }, []);
  const loaderON = () => {
    setTimeout(loaderTrue, 0);
  }
  const loaderTrue = () => {
    setLoader(true)
  }
  useEffect(() => {
    loaderON()
  }, [])
  const loaderOFF = () => {
    setTimeout(loaderFalse, 800);
  }
  const loaderFalse = () => {
    setLoader(false)
    // console.log("OFFFF!");
  }
  useEffect(() => {
    loaderOFF()
  }, [])
  const questionpress = () => {
    if (parseInt(drawerTabNaviData.user_id) == parseInt(taskdetailsData.user_id)) {
      setopentab('1')
      msgScrollDown()
    } else {
      if (drawerTabNaviData.be_a_fixer_approval == "pending") {
        setIsVerificatonpendingforquestion(!isVerificatonpendingforquestion)
      } else if (drawerTabNaviData.be_a_fixer_approval == "not_verified") {
        setIsAllVerificatonNotCompleteforquestion(!isAllVerificatonNotCompleteforquestion);
      } else if (drawerTabNaviData.be_a_fixer_approval == "accepted") {
        setopentab('1')
        msgScrollDown()
      } else if (drawerTabNaviData.be_a_fixer_approval == "rejected") {
        setIsAllVerificatonNotCompleteforquestion(!isAllVerificatonNotCompleteforquestion);
      } else {
        setIsAllVerificatonNotCompleteforquestion(!isAllVerificatonNotCompleteforquestion);
      }
    }
  }
  const makeAnOfferOnpress = () => {
    if (drawerTabNaviData.be_a_fixer_approval == "pending") {
      setIsVerificatonpendingforquestion(!isVerificatonpendingforquestion)
    } else if (drawerTabNaviData.be_a_fixer_approval == "not_verified") {
      setIsAllVerificatonNotCompleteforquestion(!isAllVerificatonNotCompleteforquestion);
    } else if (drawerTabNaviData.be_a_fixer_approval == "accepted") {
      navigation.navigate("MakingMoneyModal", { taskSlugname: taskdetailsData.slug, taskBudget: taskdetailsData.budget, tierData: tierData, isTaxId: isTaxId })
    } else if (drawerTabNaviData.be_a_fixer_approval == "rejected") {
      setIsAllVerificatonNotCompleteforquestion(!isAllVerificatonNotCompleteforquestion);
    } else {
      setIsAllVerificatonNotCompleteforquestion(!isAllVerificatonNotCompleteforquestion);
    }
  }
  const englishDate2 = (val) => {
    let m = moment(val, 'YYYY-MM-DD').format('DD MMM, YYYY');
    return m
  }
  const showWhichDate = () => {
    try {
      if (taskdetailsData.get_reschedule_request != null) {
        if (taskdetailsData.get_reschedule_request.confirmation_status == "awaiting_approval") {
          return taskdetailsData.get_reschedule_request.reschedule_date + " " + taskdetailsData.get_reschedule_request.reschedule_time
        } else if (taskdetailsData.get_reschedule_request.confirmation_status == "Accepted") {
          return taskdetailsData.after_rescheduled_date + " " + taskdetailsData.after_rescheduled_time
        } else if (taskdetailsData.get_reschedule_request.confirmation_status == "Rejected") {
          if (taskdetailsData.date_type == "B" || taskdetailsData.date_type == null) {
            return "As soon as possible"
          } else {
            return dateConvert
          }
        } else {
          return "testing error"
        }
      } else {
        if (taskdetailsData.date_type == "B" || taskdetailsData.date_type == null) {
          return "As soon as possible"
        } else {
          return dateConvert
        }
      }
    } catch (error) {
      console.log("showWhichDate", error)
    }
  }

  // rrrrrrrr

  // console.log(taskdetailsData.req_incr_pay_count, taskdetailsData.get_tasker_increase_payment)
  // console.log(taskdetailsData.user_id, userId)

  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
      <KeyboardAvoidingView
        behavior={(Platform.OS === 'ios') ? "padding" : null} style={styles.container}>
        <HeaderTask
          navigation={navigation}
          back
          name={strings.TASKDETAILS.HEADERTEXT}
          menuButton={() => setMenuModal(!menuModal)}
          shareButton={onpressShare}
          loader={loader}
          backFunc={handleBackButtonClick}
        />
        {(testingText.lastupdateDate).length > 0 && <Text style={{ textAlign: "center", color: Colors.green_new, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{testingText.lastupdateDate}</Text>}
        {(testingText.text).length > 0 && <Text style={{ textAlign: "center", color: Colors.red_old, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{testingText.text}</Text>}
        {taskdetailsData != null && <Text style={{ textAlign: "center", color: Colors.red_old, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{drawerTabNaviData.be_a_fixer_approval} (taskid - {taskdetailsData.id})</Text>}
        {loader || taskdetailsData == null || tierData == "" || taskdetailsLoader ?
          <LoaderPage />
          :
          <View style={{ flex: 1 }} >
            {
              menuModal &&
              <Modal
                animationType="fade"
                transparent={true}
                visible={menuModal}
                onRequestClose={() => {
                  setMenuModal(!menuModal);
                }}
              >
                <TouchableOpacity activeOpacity={1} onPress={() => setMenuModal(!menuModal)} style={{ flex: 1, }} >
                  <View style={{ padding: 2, backgroundColor: Colors.white, right: 0, position: "absolute", top: Normalize(35), right: Normalize(25), elevation: Normalize(3), borderTopLeftRadius: 7, borderBottomLeftRadius: 7, borderBottomRightRadius: 7 }} >
                    {
                      taskdetailsData.status == 2 ?
                        taskdetailsData.get_user.id == userid ?
                          <TouchableOpacity activeOpacity={0.8} onPress={editTask} style={{ height: Normalize(26.7), width: Normalize(140), alignItems: "center", justifyContent: "center", flex: 1 }}>
                            <Text style={globalstyles.plantext_outfit_regular} >{strings.POSTTASK.EDIT}</Text>
                          </TouchableOpacity> : null : null
                    }
                    {
                      taskdetailsData.status == 2 ?
                        taskdetailsData.get_user.id == userid &&
                        <TouchableOpacity activeOpacity={0.8} onPress={cancelTaskOnpress} style={{ height: Normalize(26.7), width: Normalize(140), alignItems: "center", justifyContent: "center", flex: 1 }} >
                          <Text style={globalstyles.plantext_outfit_regular}>{strings.POSTTASK.CANCEL}</Text>
                        </TouchableOpacity> : null
                    }
                    {
                      (taskdetailsData.status != 6 && taskdetailsData.status != 8) &&
                      <TouchableOpacity activeOpacity={0.8} onPress={similarTask} style={{ height: Normalize(26.7), width: Normalize(140), alignItems: "center", justifyContent: "center", flex: 1 }}>
                        <Text style={globalstyles.plantext_outfit_regular}>{strings.POSTTASK.POSTSIMILARTASK}</Text>
                      </TouchableOpacity>
                    }
                    {
                      taskdetailsData.status == 2 && (taskdetailsData.get_user.slug != userSlugName && taskdetailsData.report_chk == false &&
                        <TouchableOpacity activeOpacity={0.8}
                          onPress={onPressTaskReport}
                          style={{ height: Normalize(26.7), width: Normalize(140), alignItems: "center", justifyContent: "center", flex: 1 }}>
                          <Text style={globalstyles.plantext_outfit_regular}>{strings.POSTTASK.REPORTHISTASK}</Text>
                        </TouchableOpacity>)
                    }

                    {
                      (taskdetailsData.status == 6 || taskdetailsData.status == 8) &&
                      (<TouchableOpacity
                        onPress={onPressDeleteTask}
                        activeOpacity={0.8}
                        style={{ height: Normalize(26.7), width: Normalize(140), alignItems: "center", justifyContent: "center", flex: 1 }}>
                        <Text style={globalstyles.plantext_outfit_regular}>Delete task</Text>
                      </TouchableOpacity>)
                    }
                    {deleteModal &&
                      <WarningPage
                        onPress={onPressDeleteTask}
                        ispress={deleteModal}
                        warningSubTitle={"Are you want to delete task?"}
                        warningTitle={'Delete'}
                        okOnpress={deleteTask}
                        cancelOnpress={onPressDeleteTask}
                        TopIcon={() => {
                          return (
                            <FontAwesome
                              name="trash"
                              size={Normalize(30)}
                              color={Colors.white}
                            />
                          )
                        }}
                      />
                    }
                    {
                      cancelTaskModal &&
                      <CancelTask
                        menuOff={() => setMenuModal(false)}
                        ispress={cancelTaskModal}
                        onPress={cancelTaskOnpress}
                        taskSlugname={taskdetailsData.slug}
                      />
                    }
                    {/* {menuModal} */}
                    <ReportTaskPage
                      ispress={taskReportModal}
                      onPress={onPressTaskReport}
                      slug={taskdetailsData.slug}
                      token={token}
                      getAllMessage={getAllMessage}
                    />

                  </View>
                </TouchableOpacity>
              </Modal>
            }

            {
              (taskdetailsData.status == 1 || taskdetailsData.status == 2) &&
              <View style={{
                flexDirection: 'row',
                borderRadius: 100,
                height: Normalize(40),
                width: '80%',
                alignSelf: 'center',
                overflow: 'hidden',
                backgroundColor: '#e1e4e9',
                marginTop: Normalize(10),
                marginBottom: Normalize(10),
              }}>
                <TouchableOpacity style={{
                  flex: opentab == 1 ? 1 : 0.85, justifyContent: 'center', alignItems: 'center',
                  backgroundColor: opentab == 1 ? Colors.secondary : 'transparent', borderRadius: Normalize(100),
                }}
                  onPress={questionpress}>
                  <Text style={{ fontSize: Normalize(13), color: opentab == 1 ? Colors.white : Colors.grey, fontFamily: fontfmliy.bold }} >Questions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  flex: opentab == 2 ? 1 : 0.85, justifyContent: 'center', alignItems: 'center',
                  backgroundColor: opentab == 2 ? Colors.secondary : 'transparent', borderRadius: Normalize(100),
                }}
                  onPress={() => setopentab('2')}>
                  <Text style={{ fontSize: Normalize(13), color: opentab == 2 ? Colors.white : Colors.grey, fontFamily: fontfmliy.bold }} >Task Details</Text>
                </TouchableOpacity>
                {
                  taskdetailsData.get_user.id == userid &&
                  <TouchableOpacity style={{
                    flex: opentab == 3 ? 1 : 0.85, justifyContent: 'center', alignItems: 'center',
                    backgroundColor: opentab == 3 ? Colors.secondary : 'transparent', borderRadius: Normalize(100),
                  }}
                    onPress={() => setopentab('3')}>
                    <Text style={{ fontSize: Normalize(13), color: opentab == 3 ? Colors.white : Colors.grey, fontFamily: fontfmliy.bold }} >Offers</Text>
                  </TouchableOpacity>}
              </View>}




            <View style={{ flex: 1 }} >
              <View style={{
                flexDirection: "row",
                paddingRight: Normalize(5),
                justifyContent: 'space-between',
                alignItems: "center",
              }}>

                <View style={{ flex: 1 }} >
                  <Text style={[globalstyles.blue_Text, {
                    marginRight: Normalize(12), borderTopRightRadius: 10, borderBottomRightRadius: 10, fontFamily: "Outfit-Medium", fontSize: Normalize(14),
                    backgroundColor: Colors.blue, paddingVertical: Normalize(5), paddingHorizontal: Normalize(10), color: Colors.white
                  }]}>
                    {taskdetailsData.title}
                  </Text>
                </View>
                <View>
                  <Text style={[globalstyles.blue_Text, {
                    fontFamily: "Outfit-Medium",
                    fontSize: Normalize(11),
                    color: Colors.secondary
                  }]}>
                    {getstatus(taskdetailsData.status)}
                  </Text>
                </View>
              </View>

              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                contentContainerStyle={{}}
                ref={scrollView}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
              >
                <View style={{ flexDirection: 'column' }}>
                  {opentab == 2 &&
                    <>
                      <Text numberOfLines={50} style={[globalstyles.plantext_Outfit_Medium, {
                        paddingHorizontal: Normalize(16),
                        marginRight: Normalize(10), borderRadius: 10, marginLeft: Normalize(0),
                        paddingVertical: Normalize(5), fontSize: Normalize(12), paddingHorizontal: Normalize(10), marginTop: 5
                      }]}>
                        {taskdetailsData.description}
                      </Text>
                      <TwoHorizantalLine />
                      <Text style={[globalstyles.plantext_Outfit_Medium, {
                        marginRight: Normalize(10), borderRadius: 10, marginLeft: Normalize(0),
                        paddingVertical: Normalize(5), fontSize: Normalize(11), paddingHorizontal: Normalize(10), marginTop: 0
                      }]}>
                        This task need to be done on
                      </Text>

                      <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", paddingHorizontal: Normalize(10), marginVertical: Normalize(3) }}>
                        <Image source={images.task_D}
                          style={styles.iconStyle2}
                        />

                        <View style={{ flexDirection: 'column', marginRight: Normalize(15), marginLeft: Normalize(5) }}>
                          <View style={{ flexDirection: "column" }} >
                            <Text style={[globalstyles.taskdetails_category_subcate, { color: "#343535" }]}>
                              {showWhichDate()}
                            </Text>
                            {
                              taskdetailsData.get_reschedule_request != null &&
                              (taskdetailsData.get_reschedule_request.confirmation_status == "awaiting_approval" ?
                                (taskdetailsData.user_id == userid ?
                                  <Text style={{ color: Colors.red_old, fontSize: Normalize(11), fontFamily: fontfmliy.bold }}>Waiting for {taskdetailsData.get_bid[0].get_user.fname + " " + taskdetailsData.get_bid[0].get_user.lname} to confirm</Text>
                                  :
                                  <Text onPress={onpressRescheduleRequestModal} style={{ color: Colors.red_old, fontSize: Normalize(11), fontFamily: fontfmliy.bold }}>Waiting for your confirmation</Text>)
                                :
                                taskdetailsData.get_reschedule_request.confirmation_status == "Accepted" ?
                                  (taskdetailsData.user_id == userid ?
                                    <Text style={{ color: Colors.green_new_2, fontSize: Normalize(11), fontFamily: fontfmliy.bold }}>{taskdetailsData.get_bid[0].get_user.fname + " " + taskdetailsData.get_bid[0].get_user.lname} confirmed your request</Text>
                                    :
                                    <Text style={{ color: Colors.green_new_2, fontSize: Normalize(11), fontFamily: fontfmliy.bold }}>You confirmed the request</Text>)
                                  :
                                  taskdetailsData.get_reschedule_request.confirmation_status == "Rejected" ?
                                    (taskdetailsData.user_id == userid ?
                                      <Text style={{ color: Colors.red_old, fontSize: Normalize(11), fontFamily: fontfmliy.bold }}>{taskdetailsData.get_bid[0].get_user.fname + " " + taskdetailsData.get_bid[0].get_user.lname} rejected your request</Text>
                                      :
                                      <Text style={{ color: Colors.secondary, fontSize: Normalize(11), fontFamily: fontfmliy.bold }}>You rejected the request</Text>)
                                    :
                                    <Text style={{ color: Colors.red_old, fontSize: Normalize(11), fontFamily: fontfmliy.bold }}>Error Error Error</Text>
                              )
                            }
                            {scheduleModal &&
                              (taskdetailsData.get_all_bid != undefined &&
                                <Reschedule_Schedule
                                  ispress={scheduleModal}
                                  onPress={onpressScheduleButton}
                                  taskSlugname={taskdetailsData.slug}
                                  dueDate={taskdetailsData.date != null ? taskdetailsData.date : tomorrowDate}
                                  reschedule_request_by={taskdetailsData.user_id == userid ? "poster" : "tasker"}
                                  item={taskdetailsData.get_tasker_reschedule_request}
                                />)
                            }
                          </View>
                        </View>
                        <View style={{ flex: 1 }} />
                        {
                          taskdetailsData.status == 3 &&
                          (taskdetailsData.is_dispute != "Y" &&
                            (taskdetailsData.get_all_bid != undefined &&
                              (taskdetailsData.user_id == userid &&
                                <Pressable
                                  onPress={onpressScheduleButton}
                                  style={{ height: Normalize(25), width: Normalize(25), borderRadius: Normalize(25) / 2, backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center" }} >
                                  <Entypo
                                    name="edit"
                                    size={Normalize(13)}
                                    color={Colors.white}
                                  />
                                </Pressable>)))}
                      </View>
                      {/* *******************top warning box for reschulde time************ */}
                      {taskdetailsData.status == 3 &&
                        (taskdetailsData.get_all_bid != undefined && taskdetailsData.get_tasker_reschedule_request != null &&
                          (
                            taskdetailsData.get_tasker_reschedule_request.status &&
                            (
                              taskdetailsData.get_tasker_reschedule_request.status == "I" ?
                                taskdetailsData.user_id == userid ?
                                  <>
                                    <View style={{ padding: Normalize(10), marginTop: 15, backgroundColor: "#fbedd5", borderRadius: 6 }} >
                                      <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center", alignItems: "center", }} >
                                        <View style={{ height: Normalize(38), width: Normalize(38) }} >
                                          <Image source={images.yellow_info} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                        </View>
                                        <View style={{ flex: 1 }} >

                                          {
                                            language == "en" &&
                                            <Text style={[globalstyles.plantext_outfit_regular, { textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: Normalize(11), color: "#434648" }]}>
                                              <Text style={[globalstyles.plantext_outfit_regular, { color: Colors.yellow }]} >{nameShorting(taskdetailsData.get_bid[0].get_user.fname + " " + taskdetailsData.get_bid[0].get_user.lname)}</Text> {`Your rescheduled date of ${getdate_day_English(taskdetailsData.get_tasker_reschedule_request.reschedule_date)[0]}, ${getdate_day_English(taskdetailsData.get_tasker_reschedule_request.reschedule_date)[1]} ${getdate_day_English(taskdetailsData.get_tasker_reschedule_request.reschedule_date)[2]} for this task`}
                                            </Text>}
                                          {
                                            language == "pr" &&
                                            <View style={{ flexDirection: rowOrRowreverse(language) }} >
                                              <Text style={[globalstyles.plantext_Outfit_Medium, { textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: Normalize(11), color: Colors.greyText }]}>یک درخواست زمانبندی مجدد از طرف مجری کار برای شما ارسال شده است.</Text>

                                              {/* <Text style={{ textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: Colors.yellow }}>{nameShorting(taskdetailsData.get_bid[0].get_user.fname + " " + taskdetailsData.get_bid[0].get_user.lname)}</Text> */}
                                              {/* <Text style={{ textAlign: language == "en" ? "left" : "right", fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: "#434648" }}>{`زمانبندی جدید شما چهارشنبه, ۲۱ اردیبهشت برای این کار`}</Text> */}
                                            </View>
                                          }
                                        </View>
                                      </View>
                                      <TouchableOpacity
                                        onPress={onpressReviewScheduleButton}
                                        style={{ height: Normalize(25), backgroundColor: "#e9a52c", borderRadius: 20, marginTop: 15, justifyContent: "center", alignItems: "center", alignSelf: language == "pr" ? "flex-start" : "flex-end" }} >
                                        <Text style={[globalstyles.plantext_Outfit_Medium, { fontSize: Normalize(10), color: Colors.white, paddingHorizontal: Normalize(8) }]}>{strings.TASKDETAILS.VIEWRESCHEDULEREQUEST}</Text>
                                      </TouchableOpacity>
                                    </View>

                                    {reviewScheduleModal && <ReviewScheduleRequestModal
                                      ispress={reviewScheduleModal}
                                      onPress={onpressReviewScheduleButton}
                                      taskSlugname={taskdetailsData.slug}
                                      name={nameShorting(taskdetailsData.get_all_bid[0].get_user.fname + " " + taskdetailsData.get_all_bid[0].get_user.lname)}
                                      imageName={taskdetailsData.get_all_bid[0].get_user.profile_picture}
                                      reason={taskdetailsData.get_tasker_reschedule_request.reschedule_reason}
                                      oldDate={taskdetailsData.date != null ? taskdetailsData.date : tomorrowDate}
                                      requesteddate={taskdetailsData.get_tasker_reschedule_request.reschedule_date}

                                    />}
                                  </>
                                  :
                                  <View style={{ padding: Normalize(10), marginTop: 15, backgroundColor: "#fbedd5", borderRadius: 6 }} >

                                    <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center", alignItems: "center", }} >
                                      <View style={{ height: Normalize(38), width: Normalize(38) }} >
                                        <Image source={images.yellow_info} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                      </View>
                                      <View style={{ flex: 1 }} >
                                        <Text style={[globalstyles.plantext_Outfit_Medium, { textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: Normalize(11), color: "#434648" }]}>
                                          {
                                            language == "en" ?

                                              `Your rescheduled date ${englishDate2(taskdetailsData.get_tasker_reschedule_request.reschedule_date)} is pending confirmation`
                                              :
                                              `زمانبندی جدید شما سه شنبه ${questionPersianTimeShow(taskdetailsData.get_tasker_reschedule_request.reschedule_date)} در انتظار تأیید است`
                                            // edit**************
                                          }
                                        </Text>
                                      </View>
                                    </View>
                                    <TouchableOpacity
                                      onPress={onpressScheduleButton}
                                      style={{ height: Normalize(25), backgroundColor: "#e9a52c", width: language == "en" ? Normalize(100) : Normalize(110), borderRadius: 20, marginTop: 15, justifyContent: "center", alignItems: "center", alignSelf: language == "pr" ? "flex-start" : "flex-end" }} >
                                      <Text style={[globalstyles.plantext_Outfit_Medium, { fontSize: Normalize(11), color: Colors.white, paddingHorizontal: Normalize(15) }]}>{strings.TASKDETAILS.EDITREQUEST}</Text>
                                    </TouchableOpacity>
                                  </View>
                                :
                                // ***************************for reject**************
                                taskdetailsData.user_id != userid &&
                                  taskdetailsData.get_tasker_reschedule_request.status == "R" ?
                                  <View style={{ padding: Normalize(10), margin: Normalize(15), flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center", alignItems: "center", backgroundColor: Colors.red_old_background, borderRadius: 6 }} >
                                    <View style={{ height: Normalize(38), width: Normalize(38), justifyContent: "center", alignItems: "center" }} >
                                      <Image source={images.crosinf} style={{ height: "90%", width: "90%", resizeMode: "contain" }} />
                                    </View>
                                    <View style={{ flex: 1 }} >
                                      <Text style={[globalstyles.plantext_Outfit_Medium, { textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: Normalize(11), color: Colors.red_old }]}>
                                        {
                                          language == "en" ?
                                            `Your reschedule request was not accepted. Please get in touch with ${nameShorting(taskdetailsData.get_user.fname + " " + taskdetailsData.get_user.lname)} and talk through the next steps to help complete the task.`
                                            :
                                            "درخواست زمانبندی مجدد شما از طرف کارفرما پذیرفته نشد. لطفا در ارتباط با مراحل بعدی انجام کار و تکمیل آن با کارفرمای مربوطه در تماس باشید."
                                        }
                                      </Text>
                                    </View>
                                  </View>
                                  :
                                  // ******************for complete************************
                                  taskdetailsData.user_id != userid &&
                                  <View style={{ padding: Normalize(10), marginTop: 15, flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center", alignItems: "center", backgroundColor: Colors.red_old_background, borderRadius: 6 }} >
                                    <View style={{ height: Normalize(38), width: Normalize(38), justifyContent: "center", alignItems: "center" }} >
                                      <Image source={images.crosinf} style={{ height: "90%", width: "90%", resizeMode: "contain" }} />
                                    </View>
                                    <View style={{ flex: 1 }} >
                                      <Text style={[globalstyles.plantext_Outfit_Medium, { textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: Normalize(11), color: Colors.red_old }]}>
                                        {language == "en" ?
                                          `Your reschedule request limit is over. Please get in touch with ${nameShorting(taskdetailsData.get_user.fname + " " + taskdetailsData.get_user.lname)} and talk through the next steps to help complete the task.`
                                          :
                                          // `محدودیت درخواست زمان‌بندی مجدد شما به پایان رسیده است. لطفاً با ${nameShorting(taskdetailsData.get_user.fname + " " + taskdetailsData.get_user.lname)} تماس بگیرید و مراحل بعدی را برای کمک به تکمیل کار صحبت کنید.`}
                                          `تبریک ، درخواست زمانبندی جدید از طرف کارفرما پذیرفته شد. لطفا در ارتباط با مراحل بعدی انجام کار و تکمیل آن با کارفرمای مربوطه در تماس باشید.`}
                                      </Text>
                                    </View>
                                  </View>
                            )

                          ))
                      }
                      <TwoHorizantalLine />
                      <Text style={[globalstyles.plantext_Outfit_Medium, {
                        marginRight: Normalize(10), borderRadius: 10, marginLeft: Normalize(0),
                        paddingVertical: Normalize(5), fontSize: Normalize(11), paddingHorizontal: Normalize(10), marginTop: 0
                      }]}>
                        Task Location
                      </Text>
                      <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", marginVertical: Normalize(0), paddingLeft: Normalize(10), width: '100%', alignItems: "flex-start" }}>
                        <Image source={images.task_L}
                          style={{
                            width: Normalize(15),
                            height: Normalize(15),
                            marginRight: 5,
                            marginTop: 5,
                            opacity: 0.9
                          }}
                          resizeMode="contain"
                        />
                        <View style={{
                          flex: 1, flexDirection: 'column', marginRight: Normalize(15), marginLeft: Normalize(5), alignSelf: 'center'
                        }} >
                          <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center" }}  >
                            <Text style={[globalstyles.taskdetails_category_subcate, { color: "#343535" }]}>
                              {taskdetailsData.location != null ? taskdetailsData.location : strings.MYTASKSCREEN.REMOTE}
                            </Text>
                          </View>
                        </View>
                      </View>
                      {taskdetailsData.lat ?
                        <View
                          style={{
                            height: Normalize(130),
                            width: '100%',
                            alignSelf: 'center',
                            backgroundColor: Colors.grayf5,
                            borderRadius: Normalize(4),
                            marginTop: Normalize(6),
                            overflow: 'hidden',
                          }}>
                          <MapView
                            mapType="standard"
                            region={{
                              latitude: taskdetailsData.lat,
                              longitude: taskdetailsData.lng,
                              latitudeDelta: 0.009,
                              longitudeDelta: 0.009,
                            }}
                            style={{ flex: 1 }}
                            accessible={false}
                            zoomEnabled={false}
                            scrollEnabled={false}>
                            <Marker
                              title={taskdetailsData.title}
                              coordinate={{
                                latitude: taskdetailsData.lat,
                                longitude: taskdetailsData.lng,
                              }}>
                              <Image
                                source={images.appLogo_mapMarker}
                                style={{
                                  height: Normalize(30),
                                  width: Normalize(30),
                                }}
                                resizeMode="contain"
                              />
                            </Marker>
                          </MapView>
                        </View>
                        : null}

                      <View style={{ width: "100%", height: .5, backgroundColor: "#ddd", marginTop: Normalize(3) }} />


                      {
                        taskdetailsData.get_images.length > 0 &&
                        <Fragment>
                          <Text style={[globalstyles.plantext_Outfit_Medium, {
                            marginRight: Normalize(10), borderRadius: 10, marginLeft: Normalize(0),
                            paddingVertical: Normalize(5), fontSize: Normalize(11), paddingHorizontal: Normalize(10), marginTop: 0
                          }]}>
                            Task images
                          </Text>
                          <View style={{ flexDirection: 'row', alignItems: "center", marginVertical: Normalize(3), marginHorizontal: 10, flexWrap: "wrap", justifyContent: "flex-start" }}>


                            {taskdetailsData.get_images.length > 0 &&
                              taskdetailsData.get_images.map((item, index) => (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => imagesModalOpen(item.image)}
                                >

                                  <Image
                                    key={index}
                                    source={{ uri: ImageLink.taskimage + `${item.image}` }}
                                    style={{
                                      width: Normalize(90),
                                      height: Normalize(90),
                                      alignSelf: 'center',
                                      borderRadius: Normalize(5),
                                      resizeMode: "cover",
                                      margin: 5,
                                      backgroundColor: Colors.grayf5
                                    }}
                                  />
                                </TouchableOpacity>
                              ))}
                          </View>
                          <TwoHorizantalLine />
                        </Fragment>}
                      {
                        taskdetailsData.must_have != null && taskdetailsData.must_have != "" &&
                        <Fragment>
                          <Text style={[globalstyles.plantext_Outfit_Medium, {
                            marginRight: Normalize(10), borderRadius: 10, marginLeft: Normalize(0),
                            paddingVertical: Normalize(5), fontSize: Normalize(11), paddingHorizontal: Normalize(10), marginTop: 0
                          }]}>
                            Must-haves
                          </Text>
                          <View style={{ flexDirection: 'row', alignItems: "center", marginVertical: Normalize(3), }}>
                            {taskdetailsData.must_have != null && <View style={{
                              width: Normalize(8),
                              height: Normalize(8),
                              borderRadius: Normalize(4),
                              backgroundColor: Colors.yellow,
                              marginLeft: Normalize(10),
                              marginRight: Normalize(5),
                            }} />}


                            <Text
                              style={[globalstyles.plantext_Outfit_Medium, {
                                fontSize: Normalize(11),
                                width: "90%",
                              }]}>
                              {taskdetailsData.must_have != null && taskdetailsData.must_have != "" ? taskdetailsData.must_have : ""}
                            </Text>
                          </View>
                          <TwoHorizantalLine />
                        </Fragment>
                      }



                      <Text style={[globalstyles.plantext_Outfit_Medium, {
                        marginRight: Normalize(10), borderRadius: 10, marginLeft: Normalize(0),
                        paddingVertical: Normalize(5), fontSize: Normalize(11), paddingHorizontal: Normalize(10), marginTop: 0
                      }]}>
                        Task posted by
                      </Text>

                      <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", padding: Normalize(15) }}>
                        {
                          taskdetailsData.get_user.profile_picture != null ?
                            <Image
                              source={{ uri: ImageLink.ProfilePhoto + `${taskdetailsData.get_user.profile_picture}` }}
                              style={{
                                width: Normalize(35),
                                height: Normalize(35),
                                alignSelf: 'center',
                                borderRadius: (Normalize(35) / 2),
                                resizeMode: "cover"
                              }}
                            />
                            :
                            <Image
                              source={{ uri: ImageLink.BlankProfileImage }}
                              style={{
                                width: Normalize(35),
                                height: Normalize(35),
                                alignSelf: 'center',
                                borderRadius: (Normalize(35) / 2),
                                resizeMode: "cover"
                              }}
                            />
                        }
                        <View style={{ flexDirection: 'column', marginHorizontal: Normalize(15), alignSelf: 'center' }}>

                          <Text
                            // onPress={() => {
                            //   taskdetailsData.get_user.slug == userSlugName ?
                            //     navigation.navigate("MyProfile", { PublicSlug: taskdetailsData.get_user.slug }) :
                            //     navigation.navigate("PublicProfile", { PublicSlug: taskdetailsData.get_user.slug })
                            // }}
                            onPress={() => {
                              navigation.navigate("PublicProfile", { PublicSlug: taskdetailsData.get_user.slug })
                            }}


                            style={[globalstyles.blue_Text, { marginVertical: Normalize(0) }]}>{nameShorting(taskdetailsData.get_user.fname + " " + taskdetailsData.get_user.lname)}</Text>
                        </View>
                      </View>
                      <TwoHorizantalLine />
                    </>
                  }


                  {/* ***************Three Box for total views,total offer, status************** */}
                  {opentab == 3 &&

                    <View style={{ paddingHorizontal: Normalize(16), height: Normalize(40), flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", marginTop: Normalize(20) }} >
                      {
                        three_boxData.map((item, index) => (
                          <Three_grayBox key={index} title={item.title} val={item.data} />
                        ))
                      }
                    </View>
                  }







                  {/* ********make an offer******* */}
                  {opentab == 2 &&
                    <>
                      {
                        taskdetailsData.status == 2 ?
                          taskdetailsData.get_user.id == userid ?
                            taskdetailsData.tot_bids > 0 ? <OfferTypeBox /> : <OfferTypeBox /> : taskdetailsData.get_bid.length > 0 ? isMyBid(taskdetailsData.get_bid) ?
                              // ********  UPDATE OFFER  SECTION *********
                              <View style={{
                                width: '99%',
                                height: Normalize(210),
                                marginTop: Normalize(10),
                                alignSelf: 'center',
                                borderRadius: Normalize(8),
                                backgroundColor: Colors.white,
                              }}>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                  <Text style={{ fontSize: Normalize(14), marginBottom: Normalize(10), fontFamily: fontfmliy.regular, color: Colors.primary }}>
                                    {strings.TASKDETAILS.BUDGET}
                                  </Text>
                                  {
                                    taskdetailsData.budget <= 0 ?
                                      <View style={{ flexDirection: 'row-reverse', alignItems: "center" }}>
                                        <Text style={{ color: Colors.green_new_2, fontSize: Normalize(18), fontFamily: fontfmliy.bold, }}>Open Offer</Text>
                                      </View> :
                                      <View style={{ alignItems: "center" }}>
                                        <Text style={styles.priceText}>{strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian(taskdetailsData.budget, language)}</Text>
                                      </View>
                                  }
                                </View>
                                <View style={{ height: Normalize(77), width: "100%", marginBottom: Normalize(3) }} >
                                  <View style={{ flex: 1.3, flexDirection: language == "en" ? "row" : "row-reverse", backgroundColor: Colors.primary }} >
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                      <Text style={{ fontSize: Normalize(13), fontFamily: fontfmliy.bold, color: Colors.white }} >{strings.MAKEANOFFER.YOUOFFERED}</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                      <View style={{ flexDirection: "row" }}>
                                        <Text style={{ fontSize: Normalize(13), fontFamily: fontfmliy.bold, color: Colors.white, paddingHorizontal: Normalize(2) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                        <Text style={{ fontSize: Normalize(13), fontFamily: fontfmliy.bold, color: Colors.white }} >{addCommaAndTranslateInPersian(myBidAmount(taskdetailsData.get_bid), language)}</Text>
                                      </View>
                                    </View>
                                  </View>
                                  <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                      <View style={{ flexDirection: rowOrRowreverse(language) }} >
                                        <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.regular, color: Colors.greyText }} >{tierData.level} {strings.MAKEANOFFER.SERVICEFEE}</Text>
                                      </View>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                      <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.regular, color: Colors.greyText, paddingHorizontal: Normalize(2) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                        <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.regular, color: Colors.greyText }} >
                                          {getServicesFees(taskdetailsData.get_bid) == null ? 0 : addCommaAndTranslateInPersian(getServicesFees(taskdetailsData.get_bid), language)}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                  <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                      <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.bold, color: Colors.greyText }} >{strings.MAKEANOFFER.YOULLRECEIVE}</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                      <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.regular, color: Colors.greyText, paddingHorizontal: Normalize(2) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                        <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.regular, color: Colors.greyText }} >
                                          {addCommaAndTranslateInPersian(youllRecived(taskdetailsData.get_bid), language)}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", justifyContent: "center" }}>
                                  <MakeanofferButton
                                    onPress={() =>
                                      navigation.navigate("NewOfferPage", {
                                        taskSlug: taskdetailsData.slug,
                                        alloffers: taskdetailsData.get_bid,
                                        posterName: nameShorting(taskdetailsData.get_user.fname + " " + taskdetailsData.get_user.lname),
                                        taskTitle: taskdetailsData.title,
                                        myOffer: myBidAmount(taskdetailsData.get_bid),
                                        offerDate: taskdetailsData.date_type == "B" ? "As soon as possible" : dateConvert,
                                        photo: taskdetailsData.get_user.profile_picture,
                                        tierData: tierData,
                                        isTaxId: isTaxId
                                      })
                                    }
                                    title={"Your offer"}
                                  />
                                </View>
                              </View>
                              : <OfferTypeBox /> : <OfferTypeBox /> :
                          taskdetailsData.status == 3 ?
                            taskdetailsData.user_id == userid ?
                              // ***********  PRIVATE MESSAGE   ************
                              // issue 123 
                              !(taskdetailsData.get_tasker_increase_payment != null &&
                                taskdetailsData.get_tasker_increase_payment.tasker_id != userid &&
                                taskdetailsData.get_tasker_increase_payment.status == "I") ?
                                <Fragment>
                                  <View style={{ flexDirection: "row", alignItems: "center", marginVertical: Normalize(5), width: "90%", alignSelf: "center" }} >
                                    <Text style={{ fontSize: Normalize(14), fontFamily: fontfmliy.regular, color: '#818181', marginRight: Normalize(4) }}>My reserved payment</Text>
                                    <Entypo
                                      name="info-with-circle"
                                      size={Normalize(13)}
                                      color={Colors.primary}
                                    />
                                  </View>
                                  <View style={{
                                    width: '90%',
                                    padding: Normalize(10),
                                    marginTop: Normalize(3),
                                    alignSelf: 'center',
                                    backgroundColor: Colors.secondaryBackground,
                                    borderColor: Colors.secondary,
                                    borderRadius: Normalize(8),
                                    borderWidth: .5
                                  }}>
                                    <View style={{ height: Normalize(40), width: "100%", flexDirection: "row" }} >
                                      <View style={{ height: Normalize(40), width: Normalize(40), borderRadius: Normalize(40) / 2, overflow: "hidden" }} >
                                        <Image source={{ uri: ImageLink.ProfilePhoto + taskdetailsData.get_bid[0].get_user.profile_picture }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                                      </View>
                                      <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center", flexDirection: "row", paddingLeft: Normalize(10) }} >
                                        <Text style={{ fontSize: Normalize(13), fontFamily: fontfmliy.bold, color: Colors.primary, marginHorizontal: Normalize(3) }} >{taskdetailsData.get_bid[0].get_user.fname + " " + taskdetailsData.get_bid[0].get_user.lname}</Text>
                                        <Text style={{ fontSize: Normalize(13), fontFamily: fontfmliy.bold, color: Colors.primary }} >$ {numberWithCommas(Math.round(taskdetailsData.amount) + Math.round(taskdetailsData.booking_fees))}</Text>
                                      </View>
                                    </View>
                                  </View>
                                </Fragment>
                                :
                                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: Normalize(5), width: "90%", alignSelf: "center" }} >
                                  <Text style={{ fontSize: Normalize(14), fontFamily: fontfmliy.regular, color: '#818181', marginRight: Normalize(4) }}>Extra payment request</Text>
                                </View>

                              :
                              taskdetailsData.get_tasker_increase_payment != null ?
                              <Fragment>
                              <View style={{ flexDirection: "row", alignItems: "center", marginVertical: Normalize(5), width: "90%", alignSelf: "center" }} >
                                <Text style={{ fontSize: Normalize(14), fontFamily: fontfmliy.regular, color: '#818181', marginRight: Normalize(4) }}>My reserved payment70</Text>
                                <Entypo
                                  name="info-with-circle"
                                  size={Normalize(13)}
                                  color={Colors.primary}
                                />
                              </View>
                              <View style={{
                                width: '90%',
                                padding: Normalize(10),
                                marginTop: Normalize(3),
                                alignSelf: 'center',
                                backgroundColor: Colors.secondaryBackground,
                                borderColor: Colors.secondary,
                                borderRadius: Normalize(8),
                                borderWidth: .5
                              }}>
                                <View style={{ height: Normalize(40), width: "100%", flexDirection: "row" }} >
                                  <View style={{ height: Normalize(40), width: Normalize(40), borderRadius: Normalize(40) / 2, overflow: "hidden" }} >
                                    <Image source={{ uri: ImageLink.ProfilePhoto + taskdetailsData.get_bid[0].get_user.profile_picture }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                                  </View>
                                  <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center", flexDirection: "row", paddingLeft: Normalize(10) }} >
                                    <Text style={{ fontSize: Normalize(13), fontFamily: fontfmliy.bold, color: Colors.primary, marginHorizontal: Normalize(3) }} >{taskdetailsData.get_bid[0].get_user.fname + " " + taskdetailsData.get_bid[0].get_user.lname}</Text>
                                    <Text style={{ fontSize: Normalize(13), fontFamily: fontfmliy.bold, color: Colors.primary }} >$ {numberWithCommas(Math.round(taskdetailsData.amount) + Math.round(taskdetailsData.booking_fees))}</Text>
                                  </View>
                                </View>
                              </View>
                              <View style={{
                                width: '90%',
                                padding: Normalize(10),
                                marginTop: Normalize(3),
                                alignSelf: 'center',
                                backgroundColor: Colors.secondaryBackground,
                                borderColor: Colors.secondary,
                                borderRadius: Normalize(8),
                                borderWidth: .5,
                                flexDirection: "row", justifyContent: "space-between", alignItems: "center"
                              }}>
                                {taskdetailsData.get_tasker_increase_payment != null && <Text style={{ fontSize: Normalize(13), fontFamily: fontfmliy.bold, color: Colors.primary }} >$ {Math.round(taskdetailsData.get_tasker_increase_payment.amount)}</Text>}
                                <Text style={{ fontSize: Normalize(13), fontFamily: fontfmliy.regular, color: Colors.secondary }} >Requested2</Text>
                              </View>
                            </Fragment>
                            :
<Fragment>
                                  <View style={{ flexDirection: "row", alignItems: "center", marginVertical: Normalize(5), width: "90%", alignSelf: "center" }} >
                                    <Text style={{ fontSize: Normalize(14), fontFamily: fontfmliy.regular, color: '#818181', marginRight: Normalize(4) }}>My reserved payment</Text>
                                    <Entypo
                                      name="info-with-circle"
                                      size={Normalize(13)}
                                      color={Colors.primary}
                                    />
                                  </View>
                                  <View style={{
                                    width: '90%',
                                    padding: Normalize(10),
                                    marginTop: Normalize(3),
                                    alignSelf: 'center',
                                    backgroundColor: Colors.secondaryBackground,
                                    borderColor: Colors.secondary,
                                    borderRadius: Normalize(8),
                                    borderWidth: .5
                                  }}>
                                    <View style={{ height: Normalize(40), width: "100%", flexDirection: "row" }} >
                                      <View style={{ height: Normalize(40), width: Normalize(40), borderRadius: Normalize(40) / 2, overflow: "hidden" }} >
                                        <Image source={{ uri: ImageLink.ProfilePhoto + taskdetailsData.get_bid[0].get_user.profile_picture }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                                      </View>
                                      <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center", flexDirection: "row", paddingLeft: Normalize(10) }} >
                                        <Text style={{ fontSize: Normalize(13), fontFamily: fontfmliy.bold, color: Colors.primary, marginHorizontal: Normalize(3) }} >{taskdetailsData.get_bid[0].get_user.fname + " " + taskdetailsData.get_bid[0].get_user.lname}</Text>
                                        <Text style={{ fontSize: Normalize(13), fontFamily: fontfmliy.bold, color: Colors.primary }} >$ {numberWithCommas(Math.round(taskdetailsData.amount) + Math.round(taskdetailsData.booking_fees))}</Text>
                                      </View>
                                    </View>
                                  </View>
                                </Fragment>
                            : taskdetailsData.status == 4 ?
                              taskdetailsData.user_id == userid ?
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
                                      <Text style={{ fontSize: Normalize(14), fontFamily: fontfmliy.regular, color: '#818181' }}>{strings.TASKDETAILS.PAYMENTSECURE}3</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                      <Text style={[styles.priceText, { paddingHorizontal: "1.5%" }]}> {strings.BROWSEFILTER.TOMAN}</Text>
                                      <Text style={styles.priceText}> {addCommaAndTranslateInPersian(Math.round(taskdetailsData.amount), language)}</Text>
                                    </View>
                                  </View>
                                  <View style={{ height: Normalize(77), width: "100%", marginBottom: Normalize(3) }} >
                                    <View style={{ flex: 1.3, backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center", flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                      <Text style={{ fontSize: Normalize(13), fontFamily: fontfmliy.bold, color: Colors.white, marginHorizontal: Normalize(3) }} >{strings.TASKDETAILS.YOUPAID}</Text>
                                      <View style={{ flexDirection: "row" }} >
                                        <Text style={{ fontSize: Normalize(13), fontFamily: fontfmliy.bold, color: Colors.white, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                        <Text style={{ fontSize: Normalize(13), fontFamily: fontfmliy.bold, color: Colors.white }} >{numberWithCommas(Math.round(taskdetailsData.amount) + Math.round(taskdetailsData.booking_fees))}</Text>
                                      </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                        <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.regular, color: Colors.greyText }} >{strings.MAKEANOFFER.BOOKINGFEE}</Text>
                                      </View>
                                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: 'row' }} >
                                        <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.regular, color: Colors.greyText, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                        <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.regular, color: Colors.greyText }} >{language == "en" ? numberWithCommas(Math.round(taskdetailsData.booking_fees)) : engToPersian(numberWithCommasinParsian(Math.round(taskdetailsData.booking_fees)))}</Text>
                                      </View>
                                    </View>
                                  </View>
                                  <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", justifyContent: "center" }}>
                                    {
                                      taskdetailsData.user_id == userid ?
                                        taskdetailsData.get_poster_review == null ?
                                          <MakeanofferButton
                                            onPress={onpressReviewButton}
                                            title={strings.TASKDETAILS.REVIEW}
                                          /> :
                                          <MakeanofferButton
                                            disabled={true}
                                            title={strings.TASKDETAILS.REVIEWED}
                                          />
                                        :
                                        taskdetailsData.get_tasker_review == null ?
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
                                      <Text style={{ fontSize: Normalize(14), fontFamily: fontfmliy.regular, color: '#818181' }}>{strings.TASKDETAILS.PAYMENTSECURE}4</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                      <Text style={[styles.priceText, { paddingHorizontal: "1.5%" }]}> {strings.BROWSEFILTER.TOMAN}</Text>
                                      <Text style={styles.priceText}> {language == "pr" ? engToPersian(numberWithCommasinParsian((Math.round(taskdetailsData.amount - taskdetailsData.recive_amount)) + (Math.round(taskdetailsData.recive_amount)))) : numberWithCommas((Math.round(taskdetailsData.amount - taskdetailsData.recive_amount)) + (Math.round(taskdetailsData.recive_amount)))}</Text>
                                    </View>
                                  </View>
                                  <View style={{ height: Normalize(50), width: "100%", marginBottom: Normalize(3) }} >
                                    <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                        <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.regular, color: Colors.greyText }} >{language === "en" ? tierData.level : tierData.level_fa} {strings.MAKEANOFFER.SERVICEFEE}</Text>
                                      </View>
                                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                        <View style={{ flexDirection: 'row' }}>
                                          <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.regular, color: Colors.greyText, paddingHorizontal: Normalize(2) }} > {strings.BROWSEFILTER.TOMAN}</Text>
                                          <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.regular, color: Colors.greyText }} >{addCommaAndTranslateInPersian((Math.round(taskdetailsData.amount - taskdetailsData.recive_amount)), language)}</Text>
                                        </View>
                                      </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                        <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.bold, color: Colors.greyText }} >{strings.MAKEANOFFER.YOULLRECEIVE}</Text>
                                      </View>
                                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                        <View style={{ flexDirection: 'row' }}>
                                          <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.bold, color: Colors.greyText, paddingHorizontal: Normalize(2) }} > {strings.BROWSEFILTER.TOMAN}</Text>
                                          <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.bold, color: Colors.greyText }} >{addCommaAndTranslateInPersian(Math.round(taskdetailsData.recive_amount), language)}</Text>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                  <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", justifyContent: "center" }}>
                                    {
                                      taskdetailsData.user_id == userid ?

                                        taskdetailsData.get_poster_review == null ?

                                          <MakeanofferButton
                                            onPress={onpressReviewButton}
                                            title={strings.TASKDETAILS.REVIEW}
                                          /> :
                                          <MakeanofferButton
                                            disabled={true}
                                            title={strings.TASKDETAILS.REVIEWED}
                                          />
                                        :
                                        taskdetailsData.get_tasker_review == null ?
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
                              : taskdetailsData.status == 5 ?
                                taskdetailsData.user_id == userid ?
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
                                        <Text style={{ fontSize: Normalize(14), fontFamily: fontfmliy.regular, color: '#818181' }}>{strings.TASKDETAILS.PAYMENTSECURE}5</Text>
                                      </View>
                                      <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                        <Text style={[styles.priceText, { paddingHorizontal: "1.5%" }]}> {strings.BROWSEFILTER.TOMAN}</Text>
                                        <Text style={styles.priceText}>{addCommaAndTranslateInPersian(Math.round(taskdetailsData.amount), language)}</Text>
                                      </View>
                                    </View>
                                    <View style={{ height: Normalize(77), width: "100%", marginBottom: Normalize(3) }} >
                                      <View style={{ flex: 1.3, backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center", flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                        <Text style={{ fontSize: Normalize(13), fontFamily: fontfmliy.bold, color: Colors.white, marginHorizontal: Normalize(3) }} >{strings.TASKDETAILS.YOUPAID}</Text>
                                        <View style={{ flexDirection: "row" }} >
                                          <Text style={{ fontSize: Normalize(13), fontFamily: fontfmliy.bold, color: Colors.white, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                          <Text style={{ fontSize: Normalize(13), fontFamily: fontfmliy.bold, color: Colors.white }} >{numberWithCommas(Math.round(taskdetailsData.amount) + Math.round(taskdetailsData.booking_fees))}</Text>
                                        </View>
                                      </View>
                                      <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                          <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.regular, color: Colors.greyText }} >{strings.MAKEANOFFER.BOOKINGFEE}</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: 'row' }} >
                                          <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.regular, color: Colors.greyText, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                          <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.regular, color: Colors.greyText }} >{language == "en" ? numberWithCommas(Math.round(taskdetailsData.booking_fees)) : engToPersian(numberWithCommasinParsian(Math.round(taskdetailsData.booking_fees)))}</Text>
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
                                        <Text style={{ fontSize: Normalize(14), fontFamily: fontfmliy.regular, color: '#818181' }}>{strings.TASKDETAILS.PAYMENTSECURE}6</Text>
                                      </View>
                                      <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                        <Text style={[styles.priceText, { paddingHorizontal: "1.5%" }]}> {strings.BROWSEFILTER.TOMAN}</Text>
                                        <Text style={styles.priceText}> {language == "pr" ? engToPersian(numberWithCommasinParsian((Math.round(taskdetailsData.amount - taskdetailsData.recive_amount)) + (Math.round(taskdetailsData.recive_amount)))) : numberWithCommas((Math.round(taskdetailsData.amount - taskdetailsData.recive_amount)) + (Math.round(taskdetailsData.recive_amount)))}</Text>
                                      </View>
                                    </View>
                                    <View style={{ height: Normalize(50), width: "100%", marginBottom: Normalize(3) }} >
                                      <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                          <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.regular, color: Colors.greyText }} >{language === "en" ? tierData.level : tierData.level_fa} {strings.MAKEANOFFER.SERVICEFEE}</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.regular, color: Colors.greyText, paddingHorizontal: Normalize(2) }} > {strings.BROWSEFILTER.TOMAN}</Text>
                                            <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.regular, color: Colors.greyText }} >{addCommaAndTranslateInPersian((Math.round(taskdetailsData.amount - taskdetailsData.recive_amount)), language)}</Text>
                                          </View>
                                        </View>
                                      </View>
                                      <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                          <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.bold, color: Colors.greyText }} >{strings.MAKEANOFFER.YOULLRECEIVE}</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.bold, color: Colors.greyText, paddingHorizontal: Normalize(2) }} > {strings.BROWSEFILTER.TOMAN}</Text>
                                            <Text style={{ fontSize: Normalize(11), fontFamily: fontfmliy.bold, color: Colors.greyText }} >{addCommaAndTranslateInPersian(Math.round(taskdetailsData.recive_amount), language)}</Text>
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

                      <View style={{ height: Normalize(10) }} />

                    </>}


                  {/* ***********************Review Modal***************** */}
                  {
                    reviewModal && (taskdetailsData.status == 4 &&
                      <GiveReviewModal
                        ispress={reviewModal}
                        onPress={onpressReviewButton}
                        taskSlugname={taskdetailsData.slug}
                        name={taskdetailsData.user_id != userid ? nameShorting(taskdetailsData.get_user.fname + " " + taskdetailsData.get_user.lname) : nameShorting(taskdetailsData.get_bid[0].get_user.fname + " " + taskdetailsData.get_bid[0].get_user.lname)}
                        image={taskdetailsData.user_id != userid ? taskdetailsData.get_user.profile_picture : taskdetailsData.get_bid[0].get_user.profile_picture}
                      />)
                  }
                  {
                    taskdetailsData.req_incr_pay_count < 2 &&
                    taskdetailsData.get_tasker_increase_payment != null &&
                    taskdetailsData.get_tasker_increase_payment.tasker_id != userid &&
                    taskdetailsData.get_tasker_increase_payment.status == "I" &&
                    <View style={{
                      width: '90%',
                      padding: Normalize(10),
                      marginTop: Normalize(3),
                      alignSelf: 'center',
                      backgroundColor: Colors.secondaryBackground,
                      borderColor: Colors.secondary,
                      borderRadius: Normalize(8),
                      borderWidth: .5,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <Text style={{ fontSize: Normalize(13), fontFamily: fontfmliy.bold, color: Colors.primary }} >$ {Math.round(taskdetailsData.get_tasker_increase_payment.amount)}</Text>
                      <Text style={{ fontSize: Normalize(13), fontFamily: fontfmliy.regular, color: Colors.secondary }} >Requested1</Text>
                    </View>
                  }
                  {
                    taskdetailsData.get_all_bid != undefined && taskdetailsData.status == 3 &&
                    <View style={{ marginHorizontal: 15, paddingVertical: Normalize(5), marginTop: Normalize(8) }} >
                      {
                        taskdetailsData.get_tasker_increase_payment != null && taskdetailsData.get_tasker_increase_payment.tasker_id == userid ?
                          <Fragment>
                            <View
                              style={{ flexDirection: "row", alignItems: "center", alignSelf: "flex-start", marginBottom: Normalize(5) }} >
                              <View style={{ height: Normalize(30), width: Normalize(30), borderRadius: Normalize(30) / 2, backgroundColor: Colors.grey, justifyContent: "center", alignItems: "center", marginRight: Normalize(5) }} >
                                <Feather
                                  name="plus"
                                  color={Colors.white}
                                  size={Normalize(25)}
                                />
                              </View>
                              <Text style={{ color: Colors.grey, fontSize: Normalize(12), fontFamily: fontfmliy.bold }}>{strings.TASKDETAILS.INCREASEPRICE}11</Text>
                            </View>
                            {/* *******************top warning box for increase price************ */}
                            {taskdetailsData.status == 3 &&
                              (taskdetailsData.get_tasker_increase_payment != null && taskdetailsData.get_tasker_increase_payment.tasker_id == userid ?
                                taskdetailsData.status == 3 & taskdetailsData.get_tasker_increase_payment.status == "R" ?
                                  <View style={{ padding: Normalize(10), marginVertical: Normalize(15), flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center", alignItems: "center", backgroundColor: Colors.red_old_background, borderRadius: 6 }} >
                                    <View style={{ height: Normalize(35), width: Normalize(35), justifyContent: "center", alignItems: "center" }} >
                                      <Image source={images.crosinf} style={{ height: "90%", width: "90%", resizeMode: "contain" }} />
                                    </View>
                                    <View style={{ flex: 1 }} >
                                      <Text style={[globalstyles.plantext_Outfit_Medium, { textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: Normalize(11), color: Colors.red_old }]}>
                                        {`Your price increase was not accepted. Please get in touch with ${nameShorting(taskdetailsData.get_user.fname + " " + taskdetailsData.get_user.lname)} and talk through the next steps to help complete the task.`}
                                      </Text>
                                    </View>
                                  </View>
                                  : taskdetailsData.get_tasker_increase_payment.status == "I" &&
                                  // <View style={{ padding: Normalize(10), marginVertical: Normalize(15), flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center", alignItems: "center", backgroundColor: "#fbedd5", borderRadius: 6 }} >
                                  //   <View style={{ height: Normalize(35), width: Normalize(35) }} >
                                  //     <Image source={images.yellow_info} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                  //   </View>
                                  //   <View style={{ flex: 1 }} >
                                  //     <Text style={[globalstyles.plantext_Outfit_Medium, { textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: Normalize(11), color: Colors.primary }]}>
                                  //       {
                                  //         `Your price increase request of $ ${addCommaAndTranslateInPersian((Math.round(taskdetailsData.get_tasker_increase_payment.amount)), language)} is pending. Please get in touch with ${nameShorting(taskdetailsData.get_user.fname + " " + taskdetailsData.get_user.lname)} and talk through the next steps to help complete the task.`
                                  //       }
                                  //     </Text>
                                  //   </View>
                                  // </View>
                                  null
                                :
                                null)
                            }
                          </Fragment>
                          :
                          taskdetailsData.is_dispute == "Y" ?
                            <View
                              style={{ flexDirection: "row", alignItems: "center", alignSelf: "flex-start", marginBottom: Normalize(5) }} >
                              <View style={{ height: Normalize(30), width: Normalize(30), borderRadius: Normalize(30) / 2, backgroundColor: Colors.grey, justifyContent: "center", alignItems: "center", marginRight: Normalize(5) }} >
                                <Feather
                                  name="plus"
                                  color={Colors.white}
                                  size={Normalize(25)}
                                />
                              </View>
                              <Text style={{ color: Colors.grey, fontSize: Normalize(12), fontFamily: fontfmliy.bold }}>{strings.TASKDETAILS.INCREASEPRICE}22</Text>
                            </View>
                            :
                            <>
                              {
                                taskdetailsData.get_tasker_increase_payment != null ?
                                  taskdetailsData.user_id != userid && taskdetailsData.get_tasker_increase_payment.status != "I" &&
                                  // <TouchableOpacity
                                  //   onPress={() => {
                                  //     taskdetailsData.user_id == userid ? null : onpressincreasepriceModal_For_Tasker()
                                  //   }}
                                  //   style={{ flexDirection: "row", alignItems: "center", alignSelf: "flex-start", marginBottom: Normalize(15) }} >
                                  //   <View style={{ height: Normalize(30), width: Normalize(30), borderRadius: Normalize(30) / 2, backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center", marginHorizontal: Normalize(5) }} >
                                  //     <Feather
                                  //       name="plus"
                                  //       color={Colors.white}
                                  //       size={Normalize(25)}
                                  //     />
                                  //   </View>
                                  //   <Text style={{ color: Colors.primary, fontSize: Normalize(12), fontFamily: fontfmliy.bold }}>{strings.TASKDETAILS.INCREASEPRICE}33</Text>
                                  // </TouchableOpacity>

                                  null
                                  :
                                  taskdetailsData.user_id != userid && (taskdetailsData.req_incr_pay_count < 2) &&
                                  <TouchableOpacity
                                    onPress={() => {
                                      // onpressincreasepriceModal_For_Poster()
                                      taskdetailsData.user_id == userid ? null : onpressincreasepriceModal_For_Tasker()
                                    }}
                                    style={{ flexDirection: "row", alignItems: "center", alignSelf: "flex-start", marginBottom: Normalize(15) }} >
                                    <View style={{ height: Normalize(30), width: Normalize(30), borderRadius: Normalize(30) / 2, backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center", marginRight: Normalize(5) }} >
                                      <Feather
                                        name="plus"
                                        color={Colors.white}
                                        size={Normalize(25)}
                                      />
                                    </View>
                                    <Text style={{ color: Colors.primary, fontSize: Normalize(12), fontFamily: fontfmliy.bold }}>{strings.TASKDETAILS.INCREASEPRICE}44</Text>
                                  </TouchableOpacity>

                              }

                              {/* *********************review Request and rise dispute********************* */}

                              {/* 
                              {
                                !(taskdetailsData.is_dispute != "Y" && !(taskdetailsData.get_tasker_increase_payment == null || taskdetailsData.get_tasker_increase_payment.status == "R" || taskdetailsData.get_tasker_increase_payment.status == "C")) &&
                                <View style={{ height: Normalize(40), width: "100%", marginVertical: Normalize(10), flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-around" }} >
                                  {
                                    taskdetailsData.is_dispute == "Y"
                                      ?
                                      <View
                                        style={{ height: "100%", width: "40%", backgroundColor: "#e7ebfb", justifyContent: "center", alignItems: "center", borderRadius: 50 }} >
                                        <Text style={{ fontFamily: 'Outfit-SemiBold', fontSize: Normalize(12), color: "#bbc2dc", }}>
                                          {strings.TASKDETAILS.RELEASE}
                                        </Text>
                                      </View>
                                      :
                                      taskdetailsData.user_id == userid ?
                                        taskdetailsData.get_tasker_increase_payment == null || taskdetailsData.get_tasker_increase_payment.status == "R" || taskdetailsData.get_tasker_increase_payment.status == "C" ?
                                          <>
                                            <TouchableOpacity
                                              onPress={releaseOnpress}
                                              style={{ height: "100%", width: "40%", backgroundColor: Colors.secondary, justifyContent: "center", alignItems: "center", borderRadius: 50 }} >
                                              <Text style={{ fontFamily: 'Outfit-SemiBold', fontSize: Normalize(12), color: Colors.white, }}>
                                                {taskdetailsData.release_request_date == null ? strings.TASKDETAILS.RELEASE : strings.TASKDETAILS.TASKERREQUEST}
                                              </Text>
                                            </TouchableOpacity>

                                            {releaseModal &&
                                              <WarningPage
                                                onPress={releaseOnpress}
                                                ispress={releaseModal}
                                                warningSubTitle={strings.TASKDETAILS.AREYOUSURERELEASEPAYMENT}
                                                warningTitle={language == 'en' ? 'Are you Sure?' : "آیا مطمئن هستید؟"}
                                                okOnpress={onpressRelease}
                                                cancelOnpress={releaseOnpress} />
                                            }
                                          </>
                                          :
                                          null
                                        :
                                        taskdetailsData.release_request_date == null ?
                                          <>
                                            <TouchableOpacity
                                              onPress={releaseRequestOnpress}
                                              style={{ height: "100%", width: "40%", backgroundColor: Colors.secondary, justifyContent: "center", alignItems: "center", borderRadius: 50 }} >
                                              <Text style={{ fontFamily: 'Outfit-SemiBold', fontSize: Normalize(12), color: Colors.white, }}>
                                                {strings.TASKDETAILS.RELEASEREQUEST}
                                              </Text>
                                            </TouchableOpacity>

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
                                          <View
                                            style={{ height: "100%", width: "40%", backgroundColor: "#e7ebfb", justifyContent: "center", alignItems: "center", borderRadius: 50 }} >
                                            <Text style={{ fontFamily: 'Outfit-SemiBold', fontSize: Normalize(12), color: "#bbc2dc", }}>
                                              {strings.TASKDETAILS.RELEASEREQUEST}
                                            </Text>
                                          </View>
                                  }

                                  {
                                    taskdetailsData.is_dispute == "N" ?
                                      // <TouchableOpacity
                                      //   onPress={() => navigation.navigate("DisputesAdd", { slug: taskdetailsData.slug, id: taskdetailsData.id })}
                                      //   style={{ height: "100%", width: "50%", backgroundColor: Colors.primary, borderRadius: 50, justifyContent: "center", alignItems: "center", }} >
                                      //   <Text style={{ fontFamily: 'Outfit-SemiBold', fontSize: Normalize(12), color: Colors.white, }}>
                                      //     {strings.TASKDETAILS.RISEDISPUTE}
                                      //   </Text>
                                      // </TouchableOpacity>
                                      null
                                      :
                                      <TouchableOpacity
                                        onPress={() => navigation.navigate("DisputesDetails", { slug: taskdetailsData.slug, id: taskdetailsData.id })}
                                        style={{ height: "100%", width: "50%", backgroundColor: Colors.primary, borderRadius: 50, justifyContent: "center", alignItems: "center", }} >
                                        <Text style={{ fontFamily: 'Outfit-SemiBold', fontSize: Normalize(12), color: Colors.white, }}>
                                          {strings.TASKDETAILS.VIEWDISPUTE}
                                        </Text>
                                      </TouchableOpacity>
                                  }
                                </View>}

                                 */}

                              {/* ********************increase price ****************** */}
                              {/* {(taskdetailsData.get_poster_all_increase_payment).length > 0 &&
                                <View style={{ width: "100%", alignSelf: "center", marginTop: Normalize(5), backgroundColor: Colors.secondaryBackground, borderWidth: 0.5, borderColor: Colors.secondary, padding: Normalize(10), borderRadius: Normalize(8) }} >
                                  <Text style={[styles.headingservice, { color: Colors.primary, textAlign: leftOrRight(language) }]}>{strings.TASKDETAILS.INCREASEBYPOSTER}</Text>
                                  {
                                    (taskdetailsData.get_poster_all_increase_payment).map((item, index) => (
                                      <View key={index} style={{ flexDirection: rowOrRowreverse(language), alignItems: "center", paddingBottom: Normalize(3) }} >
                                        <View style={{ flex: 1, paddingHorizontal: "2%", justifyContent: "center" }} >
                                          <Text numberOfLines={2} style={[globalstyles.plantext_regular, { fontSize: Normalize(13), color: Colors.primary, textAlign: leftOrRight(language) }]} >{item.description}{item.requested_by != "P" && `${"\n"} ${strings.TASKDETAILS.REQUESTBYTASKER}`}</Text>
                                        </View>
                                        <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(12), color: Colors.primary, textAlign: leftOrRight(language) }]}>{strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian(Math.round(item.amount), language)}</Text>
                                      </View>
                                    ))
                                  }
                                </View>
                              } */}
                              {increasepriceModal_tasker &&
                                <IncreasepriceModal_For_Tasker
                                  ispress={increasepriceModal_tasker}
                                  onPress={onpressincreasepriceModal_For_Tasker}
                                  taskSlugname={taskdetailsData.slug}
                                  posterName={nameShorting(taskdetailsData.get_user.fname + " " + taskdetailsData.get_user.lname)}
                                  tierData={tierData}
                                  isTaxId={isTaxId}
                                />
                              }
                              {
                                increasepriceModal_poster &&
                                (taskdetailsData.status == 3 &&
                                  <IncreasepriceModal_For_Poster
                                    ispress={increasepriceModal_poster}
                                    onPress={onpressincreasepriceModal_For_Poster}
                                    taskSlugname={taskdetailsData.slug}
                                    item={taskdetailsData.get_tasker_increase_payment}
                                    taskername={nameShorting(taskdetailsData.get_bid[0].get_user.fname + " " + taskdetailsData.get_bid[0].get_user.lname)}
                                    taskerImage={taskdetailsData.get_bid[0].get_user.profile_picture}
                                    imageName={taskdetailsData.get_user.profile_picture}
                                    taskTitle={taskdetailsData.title}
                                    name={nameShorting(taskdetailsData.get_user.fname + " " + taskdetailsData.get_user.lname)}
                                  />)
                              }
                            </>
                      }
                    </View>
                  }

                  {/* **************review modal*********** */}

                  {reviewOfferModal &&
                    <ReviewOfferModal
                      ispress={reviewOfferModal}
                      setReviewOfferModal={setReviewOfferModal}
                      onPress={onPressreviewOffer}
                      value={taskdetailsData.get_bid}
                      taskSlugname={taskdetailsData.slug}
                      taskData={taskdetailsData}
                      setTaskData={setTaskdetailsData}
                      getData={getData}
                      show={show}
                      userid={userid}
                      slug={taskdetailsData.slug}
                    />
                  }



                  {reviewmodalforsingle &&
                    <ReviewOfferModalforSingle
                      slug={taskdetailsData.slug}
                      ispress={reviewmodalforsingle}
                      setReviewmodalforsingle={setReviewmodalforsingle}
                      onPress={onPressreviewforsingle}
                      value={taskdetailsData.get_bid}
                      id={singleProposalReplyID}
                      taskSlugname={taskdetailsData.slug}
                      taskdetailsData={taskdetailsData}
                      setTaskdetailsData={setTaskdetailsData}
                      getData={getData}
                      show={show}
                      userid={userid} />}



                  {/* ************************* review *******************/}

                  {
                    (taskdetailsData.status == 4 || taskdetailsData.status == 5) &&
                    <>
                      <Text style={[styles.headingservice, { textAlign: language == "pr" ? "right" : "left", paddingHorizontal: 15, }]}>
                        {language === "en" ? "Reviews" : "نظرات و دیدگاه ها"}
                      </Text>

                      <View style={{ paddingVertical: Normalize(15), width: "99%", alignSelf: "center", backgroundColor: '#ffffff' }}>

                        {
                          taskdetailsData.get_poster_review == null ?

                            <View style={{ flexDirection: rowOrRowreverse(language) }} >
                              {/* <Text style={{ color: Colors.primary, fontFamily: fontfmliy.bold, fontSize: Normalize(12), }} ></Text> */}

                              {
                                language === "en" ?
                                  <Text style={{
                                    fontSize: Normalize(12),
                                    color: '#38393e',
                                    fontFamily: fontfmliy.bold,
                                    textAlign: leftOrRight(language),
                                    marginBottom: Normalize(5)
                                  }} ><Text style={{ color: Colors.primary, fontFamily: fontfmliy.bold, fontSize: Normalize(12), }} >{nameShorting(taskdetailsData.get_user.fname + " " + taskdetailsData.get_user.lname)}</Text> {strings.TASKDETAILS.DIDNOTLEAVEAREVIEW} </Text>
                                  :
                                  <Text style={{
                                    fontSize: Normalize(12),
                                    color: '#38393e',
                                    fontFamily: fontfmliy.bold,
                                    textAlign: leftOrRight(language),
                                    marginBottom: Normalize(5)
                                  }} >هنوز دیدگاهی از طرف <Text style={{ color: Colors.primary, fontFamily: fontfmliy.bold, fontSize: Normalize(12), }} >{nameShorting(taskdetailsData.get_user.fname + " " + taskdetailsData.get_user.lname)}</Text> اضافه نشده است</Text>
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
                                      fontFamily: fontfmliy.bold,
                                      textAlign: leftOrRight(language)
                                    }} ><Text style={{ color: Colors.primary }} >{nameShorting(taskdetailsData.get_user.fname + " " + taskdetailsData.get_user.lname)}</Text> left a review for <Text style={{ color: Colors.primary }} >{nameShorting(taskdetailsData.get_bid[0].get_user.fname + " " + taskdetailsData.get_bid[0].get_user.lname)}</Text></Text>
                                  :
                                  <Text
                                    style={{
                                      fontSize: Normalize(12),
                                      color: '#38393e',
                                      fontFamily: fontfmliy.bold,
                                      textAlign: leftOrRight(language)
                                    }} >

                                    <Text style={{ color: Colors.primary }} >{nameShorting(taskdetailsData.get_bid[0].get_user.fname + " " + taskdetailsData.get_bid[0].get_user.lname)}</Text> یک دیدگاه گذاشته شده برای <Text style={{ color: Colors.primary }} >{nameShorting(taskdetailsData.get_user.fname + " " + taskdetailsData.get_user.lname)}</Text>
                                  </Text>
                              }





                              <Text numberOfLines={1} style={{
                                color: Colors.secondary, fontFamily: fontfmliy.bold, fontSize: Normalize(10), textAlign: language == "en" ? "left" : "right", opacity: 0.9
                              }}>
                                {language == "en" ?
                                  questionEnglishTimeShow(taskdetailsData.get_poster_review.created_at) : questionPersianTimeShow(taskdetailsData.get_poster_review.created_at)
                                }
                              </Text>

                              <View style={{ width: "100%", paddingVertical: "1%", flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                <View style={{ height: Normalize(60), width: "20%", justifyContent: "center", alignItems: language == "en" ? "flex-start" : "flex-end" }} >
                                  <View style={{ width: Normalize(50), height: Normalize(50), borderRadius: Normalize(50) / 2, overflow: "hidden", backgroundColor: "#f5f5f5" }} >
                                    {
                                      taskdetailsData.get_user.profile_picture != null ?
                                        <Image
                                          source={{ uri: ImageLink.ProfilePhoto + `${taskdetailsData.get_user.profile_picture}` }}
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
                                      reviewShowinStar(taskdetailsData.get_poster_review.rating).map((item, index) => (

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
                                      reviewShowinGraystar(reviewShowinStar(taskdetailsData.get_poster_review.rating)).map((item, index) => (
                                        <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                          <Image source={images.stargray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                        </View>
                                      ))
                                    }
                                  </View>
                                  <Text>" {taskdetailsData.get_poster_review.description} "</Text>
                                </View>
                              </View>
                            </>
                        }
                        {
                          taskdetailsData.get_tasker_review == null ?
                            language === "en" ?
                              <Text style={{
                                fontSize: Normalize(12),
                                color: '#38393e',
                                fontFamily: fontfmliy.bold,
                                textAlign: leftOrRight(language),
                                marginBottom: Normalize(5)
                              }} ><Text style={{ color: Colors.primary, fontFamily: fontfmliy.bold, fontSize: Normalize(12), }} >{nameShorting(taskdetailsData.get_bid[0].get_user.fname + " " + taskdetailsData.get_bid[0].get_user.lname)}</Text> {strings.TASKDETAILS.DIDNOTLEAVEAREVIEW} </Text>
                              :
                              <Text style={{
                                fontSize: Normalize(12),
                                color: '#38393e',
                                fontFamily: fontfmliy.bold,
                                textAlign: leftOrRight(language),
                                marginBottom: Normalize(5)
                              }} >هنوز دیدگاهی از طرف <Text style={{ color: Colors.primary, fontFamily: fontfmliy.bold, fontSize: Normalize(12), }} >{nameShorting(taskdetailsData.get_bid[0].get_user.fname + " " + taskdetailsData.get_bid[0].get_user.lname)}</Text> اضافه نشده است</Text>



                            :
                            <>
                              {
                                language == "en" ?
                                  <Text
                                    style={{
                                      fontSize: Normalize(12),
                                      color: '#38393e',
                                      fontFamily: fontfmliy.bold,
                                      textAlign: language == "en" ? "left" : "right",
                                    }} ><Text style={{ color: Colors.primary }} >{nameShorting(taskdetailsData.get_bid[0].get_user.fname + " " + taskdetailsData.get_bid[0].get_user.lname)}</Text> left a review for <Text style={{ color: Colors.primary }} >{nameShorting(taskdetailsData.get_user.fname + " " + taskdetailsData.get_user.lname)}</Text></Text>
                                  :
                                  <View style={{ flexDirection: "row", alignSelf: "flex-end" }} >
                                    <Text
                                      style={{
                                        fontSize: Normalize(12),
                                        color: '#38393e',
                                        fontFamily: fontfmliy.bold,
                                        textAlign: language == "en" ? "left" : "right",
                                      }} >ثبت کرده است</Text>
                                    <Text
                                      style={{
                                        fontSize: Normalize(12),
                                        color: Colors.primary,
                                        fontFamily: fontfmliy.bold,
                                        textAlign: language == "en" ? "left" : "right",
                                      }} > {nameShorting(taskdetailsData.get_user.fname + " " + taskdetailsData.get_user.lname)} </Text>
                                    <Text
                                      style={{
                                        fontSize: Normalize(12),
                                        color: '#38393e',
                                        fontFamily: fontfmliy.bold,
                                        textAlign: language == "en" ? "left" : "right",
                                      }} > یک دیدگاه برای</Text>
                                    <Text
                                      style={{
                                        fontSize: Normalize(12),
                                        color: Colors.primary,
                                        fontFamily: fontfmliy.bold,
                                        textAlign: language == "en" ? "left" : "right",
                                      }} >{nameShorting(taskdetailsData.get_bid[0].get_user.fname + " " + taskdetailsData.get_bid[0].get_user.lname)}</Text>
                                  </View>
                              }
                              <Text numberOfLines={1} style={{
                                color: Colors.secondary, fontFamily: fontfmliy.bold, fontSize: Normalize(10), textAlign: language == "en" ? "left" : "right", opacity: 0.9
                              }}>
                                {language == "en" ?
                                  questionEnglishTimeShow(taskdetailsData.get_tasker_review.created_at) : questionPersianTimeShow(taskdetailsData.get_tasker_review.created_at)
                                }
                              </Text>

                              <View style={{ width: "100%", paddingVertical: "1%", flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                <View style={{ height: Normalize(60), width: "20%", justifyContent: "center", alignItems: language == "en" ? "flex-start" : "flex-end" }} >
                                  <View style={{ width: Normalize(50), height: Normalize(50), borderRadius: Normalize(50) / 2, overflow: "hidden", backgroundColor: "#f5f5f5" }} >
                                    {
                                      taskdetailsData.get_bid[0].get_user.profile_picture != null ?
                                        <Image
                                          source={{ uri: ImageLink.ProfilePhoto + `${taskdetailsData.get_bid[0].get_user.profile_picture}` }}
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
                                      reviewShowinStar(taskdetailsData.get_tasker_review.rating).map((item, index) => (

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
                                      reviewShowinGraystar(reviewShowinStar(taskdetailsData.get_tasker_review.rating)).map((item, index) => (
                                        <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                          <Image source={images.stargray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                        </View>
                                      ))
                                    }
                                  </View>
                                  <Text>" {taskdetailsData.get_tasker_review.description} "</Text>
                                </View>
                              </View>
                            </>
                        }
                      </View>
                    </>
                  }


                  {reviewRequestModal_poster &&
                    <ReviewRequestModal
                      ispress={reviewRequestModal_poster}
                      onPress={onpressreviewRequestModal}
                      taskSlugname={taskdetailsData.slug}
                      taskBudget={taskdetailsData.budget}
                      name={nameShorting(taskdetailsData.get_all_bid[0].get_user.fname + " " + taskdetailsData.get_all_bid[0].get_user.lname)}
                      imageName={taskdetailsData.get_all_bid[0].get_user.profile_picture}
                      previousAmount={Math.round(taskdetailsData.get_all_bid[0].amount)}
                      description={taskdetailsData.get_tasker_increase_payment.description}
                      item={taskdetailsData.get_tasker_increase_payment}
                    />}


                  {/* **************Images****************** */}
                  {
                    taskdetailsData ?
                      taskdetailsData.get_images.length != 0 ?
                        <>
                          {imageToggle &&
                            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginBottom: 15 }} >
                              {
                                taskdetailsData.get_images.map((item, index) => (
                                  <Pressable key={index} onPress={() => imagesModalOpen(item.image)} style={{ width: Normalize(85), height: Normalize(85), borderColor: Colors.primary, borderWidth: 0.8, borderRadius: 5, overflow: "hidden", marginVertical: "2%", marginHorizontal: "1%", padding: Normalize(3) }}>
                                    <Image source={{ uri: `https://changicourt.com/eazypay/storage/app/public/images/task/${item.image}` }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                                  </Pressable>
                                ))
                              }
                            </View>}
                          <Modal
                            animationType="none"
                            transparent={true}
                            visible={imageModal}
                            onRequestClose={() => {
                              setImageModal(!imageModal);
                            }}
                          >
                            <TouchableOpacity onPress={() => setImageModal(!imageModal)} style={{ flex: 1, backgroundColor: "rgba(52, 52, 52, 0.8)", padding: "8%" }}>
                              {imageUri &&
                                <Image source={{ uri: `https://changicourt.com/eazypay/storage/app/public/images/task/${imageUri}` }} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                              }
                            </TouchableOpacity>
                          </Modal>
                        </> : null : null}

                  {/* ************************* proposal or assign *******************/}
                  {opentab == 3 &&
                    <Fragment>

                      {(taskdetailsData.highest_offers).length > 0 &&
                        <View style={[styles.elevtion_view, { width: "99%", alignSelf: "center", }]} >
                          <View style={{ paddingHorizontal: Normalize(12), paddingVertical: Normalize(10), width: "99%", alignSelf: "center", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(15) }]}>My offer</Text>
                            <TouchableOpacity
                              onPress={() => setIsMyOfferSortingModal(true)}
                              style={{ paddingRight: Normalize(3), height: Normalize(28), width: Normalize(130), borderRadius: Normalize(5), borderColor: Colors.secondary, borderWidth: Normalize(1), flexDirection: "row", alignItems: "center", justifyContent: "space-around" }} >
                              <View style={{ flex: 1, alignItems: "center" }}>
                                <Text style={globalstyles.plantext_outfit_regular} >{myOfferSortByWhichType}</Text>
                              </View>
                              <Entypo
                                name="chevron-down"
                                color={Colors.secondary}
                                size={Normalize(14)}
                              />
                            </TouchableOpacity>
                          </View>
                          {
                            myOfferWhichArry(myOfferSortByWhichType).map((item, index) => (
                              <View key={index} style={{
                                backgroundColor: Colors.secondaryBackground, flexDirection: 'column',
                                padding: Normalize(15), borderWidth: Normalize(1),
                                borderColor: Colors.secondaryBorder, marginHorizontal: Normalize(10),
                                borderRadius: 10,
                                marginBottom: Normalize(5),
                                opacity: item.bid_status != "Placed" ? 0.5 : 1
                              }}>
                                <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row" }}>
                                  <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row" }}>
                                    <View style={{
                                      width: Normalize(50), height: Normalize(50), borderRadius: Normalize(50) / 2,
                                      overflow: "hidden"
                                    }} >
                                      <Image style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                        source={{ uri: item.get_user.profile_picture ? ImageLink.ProfilePhoto + `${item.get_user.profile_picture}` : ImageLink.BlankProfileImage }}
                                      />
                                    </View>
                                    <View style={{ flexDirection: 'column', marginHorizontal: 15, width: "70%", alignSelf: "center" }}>
                                      <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>

                                        <Text style={{ color: Colors.primary, marginLeft: 2, fontFamily: fontfmliy.bold, fontSize: Normalize(12), textAlign: language == "en" ? "left" : "right" }}>{nameShorting(item.get_user.fname + " " + item.get_user.lname)}</Text>

                                        <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.greyText }]}>{strings.BROWSEFILTER.TOMAN} {numberWithCommas(Math.round(item.amount))}</Text>
                                      </View>
                                      {
                                        userid == taskdetailsData.user_id && taskdetailsData.status == 2 &&
                                        <TouchableOpacity
                                          disabled={item.bid_status != "Placed" ? true : false}
                                          activeOpacity={item.bid_status != "Placed" ? 1 : 0}
                                          onPress={() => {

                                            //  console.log(item.bid_status)

                                            setNewOfferPageMessageArry([])
                                            setNewOfferPageMessageWithTaskerArry([])
                                            navigation.navigate("NewOfferPage_chatWithTasker", {
                                              taskSlug: taskdetailsData.slug,
                                              alloffers: taskdetailsData.get_bid,
                                              taskerName: nameShorting(item.get_user.fname + " " + item.get_user.lname),
                                              tasker1stName: item.get_user.fname,
                                              taskTitle: taskdetailsData.title,
                                              offerDate: taskdetailsData.date_type == "B" ? "As soon as possible" : dateConvert,
                                              photo: item.get_user.profile_picture,
                                              taskerId: item.get_user.id,
                                            })



                                          }}
                                          style={{ marginTop: "2%", width: "100%", }}>
                                          <Text style={[styles.textcategory22,]}>{item.bid_status != "Placed" ? "This offer was rejected by you" : "Press here to accept offer"}</Text>
                                        </TouchableOpacity>
                                      }
                                    </View>
                                  </View>
                                </View>
                                {paymentRequired &&
                                  (item.id == itemId &&
                                    <AcceptOfferinProposal
                                      ispress={paymentRequired}
                                      onPress={onPresspaymentRequired}
                                      name={nameShorting(item.get_user.fname + " " + item.get_user.lname)}
                                      imageName={item.get_user.profile_picture}
                                      taskTitle={taskdetailsData.title}
                                      bid_id={item.id}
                                      taskSlugname={taskdetailsData.slug}
                                    />)
                                }
                                {
                                  userid == item.user_id && taskdetailsData.status == 2 &&
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
                                        cancelOnpress={withdrawCancelOnpress}
                                        TopIcon={() => {
                                          return (
                                            <FontAwesome
                                              name="trash"
                                              size={Normalize(30)}
                                              color={Colors.white}
                                            />
                                          )
                                        }}
                                      />}

                                  </View>
                                }
                              </View>
                            ))
                          }
                        </View>}

                      {isMyOfferSortingModal && <ModalMyOfferSorting />}
                    </Fragment>
                  }



                  {/* issue 123 */}
                  {
                    taskdetailsData.user_id == userid && taskdetailsData.req_incr_pay_count < 2 &&
                    opentab == 2 &&
                    taskdetailsData.is_dispute != "Y" &&
                    !(taskdetailsData.get_tasker_increase_payment == null ||
                      taskdetailsData.get_tasker_increase_payment.status == "R" ||
                      taskdetailsData.get_tasker_increase_payment.status == "C") &&
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ fontSize: Normalize(18), fontFamily: fontfmliy.bold, color: Colors.primary }} >$ {numberWithCommas(Math.round(taskdetailsData.amount) + Math.round(taskdetailsData.booking_fees))}</Text>
                      <Text style={{ fontSize: Normalize(16), fontFamily: fontfmliy.bold, color: Colors.primary, marginVertical: Normalize(5) }} >Reserved payment</Text>
                      <Text onPress={onpressreviewRequestModal} style={{ fontSize: Normalize(14), fontFamily: fontfmliy.regular, color: Colors.grey }} >Press here for more info</Text>
                    </View>
                  }





                  {/* *****************Question Section************* */}
                  {opentab == 1 &&
                    <Fragment>
                      {/* **************Question Show************** */}
                      {
                        allquestion.length > 0 ?
                          <View style={{ width: "99%", alignSelf: "center", }} >
                            {
                              allquestion.map((item, index) => (
                                <View key={index} style={{
                                  flexDirection: 'column', marginRight: 20,
                                  paddingVertical: Normalize(12), paddingHorizontal: Normalize(15), width: '100%', borderBottomColor: Colors.boxBorder, borderBottomWidth: index + 1 == allquestion.length ? 0 : 1
                                }}>
                                  <View style={{ flexDirection: 'row', width: '100%' }}>
                                    <View style={{ flexDirection: language == "en" ? "row" : 'row-reverse' }}>
                                      <View style={{ height: Normalize(35), width: Normalize(35), borderRadius: Normalize(35) / 2, backgroundColor: "#f5f5f5", overflow: "hidden" }}>
                                        {
                                          item.get_user.profile_picture == null ?
                                            <Image
                                              source={{ uri: ImageLink.BlankProfileImage }}
                                              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                                            /> :
                                            <Image style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                                              source={{ uri: ImageLink.ProfilePhoto + `${item.get_user.profile_picture}` }}
                                              resizeMode="cover" />
                                        }
                                      </View>
                                      <View style={{ flexDirection: 'column', marginLeft: 15, marginRight: 15, width: '80%' }}>
                                        <View style={{ flexDirection: language == "en" ? "row" : 'row-reverse', justifyContent: 'space-between' }}>
                                          <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center" }} >
                                            <Text
                                              onPress={() => {
                                                item.get_user.slug == userSlugName ?
                                                  navigation.navigate("MyProfile", { PublicSlug: item.get_user.slug }) :
                                                  navigation.navigate("PublicProfile", { PublicSlug: item.get_user.slug })
                                              }}
                                              style={{
                                                color: Colors.greylightText, marginLeft: 2, fontFamily: fontfmliy.bold,
                                                fontSize: Normalize(12)
                                              }}>{nameShorting(item.get_user.fname + " " + item.get_user.lname)}</Text>
                                            {
                                              item.get_user.slug == taskdetailsData.get_user.slug &&
                                              <View style={{ paddingVertical: Normalize(1.5), paddingHorizontal: Normalize(2), backgroundColor: Colors.primary, marginHorizontal: Normalize(2), borderRadius: 15, justifyContent: "center", alignItems: "center" }} >
                                                <Text style={{
                                                  color: Colors.white, fontFamily: fontfmliy.bold,
                                                  fontSize: Normalize(6)
                                                }}>{strings.MAKEANOFFER.POSTER}</Text>
                                              </View>
                                            }
                                          </View>
                                        </View>
                                        <View style={{ flexDirection: language == "en" ? "row" : 'row-reverse', alignItems: "center" }}>
                                          <Text numberOfLines={1} style={{
                                            color: Colors.grey, fontFamily: fontfmliy.regular, fontSize: Normalize(10), textAlign: language == "en" ? "left" : "right", opacity: 0.9
                                          }}>{timeFunc(item.created_at)} {timeFunc(item.created_at) != "now" && "ago"}</Text>
                                        </View>
                                        <Text
                                          numberOfLines={questionLength.id == item.id && questionLength.expand ? 1000 : 3}
                                          style={{
                                            color: Colors.primary,
                                            fontFamily: fontfmliy.regular,
                                            fontSize: Normalize(12),
                                            textAlign: language == "en" ? "left" : "right", marginTop: Normalize(2), lineHeight: Normalize(12),
                                          }}>{item.message}</Text>
                                        {(item.message).length > 150 &&
                                          <Text onPress={() => questionReadMore(item.id)}
                                            style={{
                                              fontSize: Normalize(11),
                                              fontFamily: fontfmliy.regular,
                                              color: questionLength.id == item.id && questionLength.expand ? Colors.secondary : Colors.primary,
                                              textAlign: language == "en" ? "left" : "right", marginVertical: "2%"
                                            }}>
                                            {questionLength.id == item.id && questionLength.expand ? strings.POSTTASK.READLESS : strings.POSTTASK.READMORE}
                                          </Text>}
                                      </View>
                                    </View>
                                  </View>
                                  <View style={{ width: "100%", alignItems: language == "en" ? "flex-start" : "flex-end" }} >
                                    {/* **************Subquestion section************** */}
                                    {
                                      taskdetailsData.status == 2 &&
                                      (item.get_child.length == 0) &&
                                      <TouchableOpacity
                                        onPress={() => {
                                          onpressReplyButton(item, item.message, item.get_user.fname)
                                        }}
                                        style={{ height: Normalize(15), width: Normalize(50), flexDirection: "row", alignItems: "center", marginTop: "2%", marginHorizontal: Normalize(50) }}>
                                        <FontAwesome5
                                          name='reply'
                                          size={Normalize(10)}
                                          color={Colors.primary}
                                        />
                                        <Text style={{
                                          color: Colors.primary, fontFamily: fontfmliy.bold, fontSize: Normalize(10),
                                          marginHorizontal: Normalize(3)
                                        }}>
                                          {strings.TASKDETAILS.REPLY}
                                        </Text>
                                      </TouchableOpacity>
                                    }
                                  </View>
                                  {
                                    item.get_child.map((childItem, childIndex) => (
                                      <View key={childIndex}  >
                                        <View style={{ paddingVertical: Normalize(10), flexDirection: language == "en" ? 'row' : "row-reverse", marginLeft: Normalize(50), paddingRight: Normalize(8) }}>
                                          <View style={{ flex: 1, alignItems: "center" }}>
                                            <View style={{ height: Normalize(24), width: Normalize(24), borderRadius: Normalize(24) / 2, backgroundColor: "#f5f5f5", overflow: "hidden" }}>
                                              {
                                                childItem.get_user.profile_picture == null ?
                                                  <Image
                                                    source={{ uri: ImageLink.BlankProfileImage }}
                                                    style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                                                  /> :
                                                  <Image style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                                                    source={{ uri: ImageLink.ProfilePhoto + `${childItem.get_user.profile_picture}` }}
                                                  />
                                              }

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
                                                    color: Colors.greylightText,
                                                    color: Colors.primary,
                                                    fontFamily: fontfmliy.bold,
                                                    fontSize: Normalize(12), textAlign: language == "pr" ? "right" : "left"
                                                  }}>{nameShorting(childItem.get_user.fname + " " + childItem.get_user.lname)}</Text>
                                                {
                                                  childItem.get_user.slug == taskdetailsData.get_user.slug &&
                                                  <View style={{ paddingVertical: Normalize(1.5), paddingHorizontal: Normalize(2), backgroundColor: Colors.primary, marginHorizontal: Normalize(2), borderRadius: 15, justifyContent: "center", alignItems: "center" }} >
                                                    <Text style={{
                                                      color: Colors.white, fontFamily: fontfmliy.bold,
                                                      fontSize: Normalize(6)
                                                    }}>{strings.MAKEANOFFER.POSTER}</Text>
                                                  </View>
                                                }
                                              </View>
                                              <View style={{}}>
                                                <Text numberOfLines={1} style={{
                                                  color: Colors.grey, fontFamily: fontfmliy.regular, fontSize: Normalize(10), textAlign: language == "en" ? "left" : "right", opacity: 0.9
                                                }}>
                                                  {timeFunc(childItem.created_at)} {timeFunc(childItem.created_at) != "now" && "ago"}
                                                </Text>
                                              </View>
                                              <Text
                                                numberOfLines={replyLength.id == childItem.id && replyLength.expand ? 1000 : 3}
                                                style={{
                                                  color: Colors.primary,
                                                  fontFamily: fontfmliy.regular,
                                                  lineHeight: Normalize(13),
                                                  marginTop: Normalize(2),
                                                  fontSize: Normalize(12),
                                                  textAlign: language == "en" ? "left" : "right"
                                                }}>{childItem.message}</Text>
                                              {(childItem.message).length > 120 &&
                                                <Text
                                                  onPress={() => {
                                                    replyReadMore(childItem.id)
                                                  }}
                                                  style={{ fontSize: Normalize(11), fontFamily: fontfmliy.regular, color: replyLength.id == childItem.id && replyLength.expand ? Colors.secondary : Colors.primary, textAlign: language == "en" ? "left" : "right", marginVertical: "2%" }}>{replyLength.id == childItem.id && replyLength.expand ? strings.POSTTASK.READLESS : strings.POSTTASK.READMORE}</Text>}
                                            </View>
                                            <View style={{ flex: 1, justifyContent: "flex-end", alignItems: language == "pr" ? "flex-end" : null }}>
                                              {taskdetailsData.status == 2 && (item.get_child.length == (childIndex + 1)) &&
                                                <TouchableOpacity
                                                  onPress={() => {
                                                    onpressReplyButton(item, childItem.message, childItem.get_user.fname)
                                                  }}
                                                  style={{ height: Normalize(15), width: Normalize(50), flexDirection: "row", alignItems: "center", marginTop: "2%" }}>
                                                  <FontAwesome5
                                                    name='reply'
                                                    size={Normalize(10)}
                                                    color={Colors.primary}
                                                  />
                                                  <Text style={{
                                                    color: Colors.primary, fontFamily: fontfmliy.bold, fontSize: Normalize(10),
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
                                    ))
                                  }
                                </View>
                              ))
                            }
                          </View>
                          :
                          <View style={{ marginTop: Normalize(200) }} >
                            <Text style={[globalstyles.page_Header_Text, { color: Colors.disableText, fontSize: Normalize(13), textAlign: "center" }]} >No questions yet 🤔</Text>
                          </View>
                      }
                    </Fragment>
                  }
                  {
                    isAllVerificatonNotComplete &&
                    <WarningPage
                      onPress={onPressAllNotverify}
                      ispress={isAllVerificatonNotComplete}
                      warningTitle={"To start making money"}
                      warningSubTitle={"Please verify all the necessary information and documents first"}
                      okOnpress={() => {
                        onPressAllNotverify()
                        navigation.navigate("BasicInfo_intro")
                      }}
                      cancelOnpress={onPressAllNotverify}
                      buttonTitle={"Continue"}
                      color={Colors.secondary}
                    />
                  }
                </View>
                {
                  opentab == 2 && taskdetailsData.status == 3 &&
                  <View style={{ flexDirection: "row", justifyContent: "space-between", margin: Normalize(15) }} >
                    <Button
                      onPress={() => {
                        navigation.navigate('ChatPage', {
                          show: taskdetailsData.slug,
                        })
                      }}
                      style={{ backgroundColor: Colors.secondary, width: "99%" }}
                      name={strings.TASKDETAILS.PRIVATEMESSAGE}
                    />
                    {/* <Button
                      onPress={() => {
                        Toast.show("In Progress")
                      }}
                      style={{ backgroundColor: Colors.secondary, width: "48%" }}
                      name={"Start work"}
                    /> */}
                  </View>
                }
              </ScrollView>

              {
                (taskdetailsData.status == 2 && opentab == 1) &&
                <View style={{ borderTopColor: Colors.boxBorder, borderTopWidth: replyQuestionDetails.parent_id != "" ? 0.6 : 0, paddingBottom: Normalize(3) }}>

                  {
                    (replyQuestionDetails.parent_id != "" && replyQuestionDetails.replyTo != "" && replyQuestionDetails.lastMessage != "") &&
                    <View style={{ paddingVertical: Normalize(6), paddingHorizontal: Normalize(8), backgroundColor: Colors.grayf8, borderWidth: 1, borderColor: Colors.boxBorder, marginHorizontal: Normalize(15), marginTop: Normalize(8), marginBottom: Normalize(5), borderRadius: Normalize(5), elevation: 0.5 }}>
                      <Text style={[globalstyles.plantext_regular, { color: Colors.primary }]}>Reply to <Text style={[globalstyles.plantext_bold, { color: Colors.primary }]}>{replyQuestionDetails.replyTo}</Text></Text>
                      <Text numberOfLines={2} style={[globalstyles.plantext_regular, { color: Colors.primary }]}>{replyQuestionDetails.lastMessage}</Text>
                      <Pressable
                        onPress={() => {
                          setReplyQuestionDetails({
                            parent_id: 0,
                            lastMessage: "",
                            replyTo: ""
                          })
                        }}
                        style={{ marginTop: Normalize(2), height: Normalize(18), width: Normalize(18), position: "absolute", right: Normalize(2), top: Normalize(2), justifyContent: "center", alignItems: "center" }} >
                        <Entypo
                          name="cross"
                          color={Colors.red_old}
                          size={Normalize(16)}
                        />
                      </Pressable>
                    </View>}

                  <View style={{ flexDirection: "row", marginHorizontal: Normalize(10), alignItems: "center", marginVertical: Normalize(5), }}>
                    <View style={{ height: Normalize(30), width: Normalize(30), borderRadius: Normalize(30) / 2, overflow: "hidden", marginRight: Normalize(5), backgroundColor: "#f5f5f5" }}>
                      <Image
                        resizeMode="contain"
                        source={{ uri: drawerTabNaviData.profile_image != null ? ImageLink.ProfilePhoto + `${drawerTabNaviData.profile_image}` : ImageLink.BlankProfileImage }}
                        style={{
                          width: "100%",
                          height: "100%",
                          resizeMode: "cover",
                        }}
                      />
                    </View>

                    <View style={{ flex: 1 }} >
                      <View style={{
                        marginLeft: Normalize(5),
                        height: Normalize(40),
                        borderWidth: 1,
                        borderColor: Colors.boxBorder,
                        borderRadius: Normalize(10),
                        flexDirection: "row",
                        padding: Normalize(3)
                      }} >
                        <View style={{ flex: 1 }} >
                          <TextInput
                            ref={textInptRef}
                            placeholderTextColor={Colors.disableText}
                            placeholder='Ask a question...'
                            value={mainquestionMessage}
                            onChangeText={(e) => setmainquestionMessage(e)}
                            onSubmitEditing={() => { Keyboard.dismiss() }}
                            style={{ color: Colors.textinput_inner_text, paddingLeft: Normalize(3) }}
                          />
                        </View>
                        <Pressable
                          disabled={mainquestionMessage == "" ? true : false}
                          onPress={newMessageSendButton}
                          style={{ height: "100%", width: "15%", justifyContent: "center", alignItems: "center", borderLeftColor: Colors.boxBorder, borderLeftWidth: 1 }} >
                          <FontAwesome name="send" color={mainquestionMessage == "" ? Colors.disableText : Colors.secondary} size={Normalize(18)} />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </View>
              }
              {
                cancelOfferSucessModal &&
                <SucessModalDesign
                  ispress={cancelOfferSucessModal}
                  onpress={() => { setCancelOfferSucessModal(false) }}
                  title={"Sucess!"}
                  subTitle={"Your Offer Withdrawn Successfully"}
                />
              }
              {
                isAllVerificatonNotCompleteforquestion &&
                <WarningPage
                  onPress={() => setIsAllVerificatonNotCompleteforquestion(!isAllVerificatonNotCompleteforquestion)}
                  ispress={isAllVerificatonNotCompleteforquestion}
                  warningTitle={"Become a Eazypayer"}
                  warningSubTitle={drawerTabNaviData.be_a_fixer_approval == "rejected" ? "Your account is rejected, So Please resubmit now" : "Apply to become a Eazypayer to ask questions on the task ads, complete task and start earning money"}
                  okOnpress={() => {
                    setIsAllVerificatonNotCompleteforquestion(false)
                    navigation.navigate("BasicInfo_intro")
                  }}
                  cancelOnpress={() => setIsAllVerificatonNotCompleteforquestion(false)}
                  buttonTitle={"Start"}
                  color={Colors.secondary}
                />
              }
              {
                isVerificatonpendingforquestion &&
                <WarningPage2
                  onPress={() => setIsVerificatonpendingforquestion(!isVerificatonpendingforquestion)}
                  ispress={isVerificatonpendingforquestion}
                  warningTitle={"Verification Pending"}
                  warningSubTitle={"We are currently reviewing your I.D. Documents\n\nThis feature will be available for you soon"}
                  cancelOnpress={() => setIsVerificatonpendingforquestion(!isVerificatonpendingforquestion)}
                  color={Colors.secondary}
                />

              }
            </View>
            {isRescheduleRequestModal &&
              <RescheduleRequestModal
                ispress={isRescheduleRequestModal}
                onPress={onpressRescheduleRequestModal}
                taskTitle={taskdetailsData.title}
                date={taskdetailsData.get_reschedule_request.reschedule_date}
                time={taskdetailsData.get_reschedule_request.reschedule_time}
                posterName={nameShorting(taskdetailsData.get_user.fname + " " + taskdetailsData.get_user.lname)}
                reschedule_id={taskdetailsData.get_reschedule_request.id}
                get_reschedule_request={taskdetailsData.get_reschedule_request}
              />
            }
            {
              opentab == "1" && questionLoader &&
              <View style={{ height: "100%", width: "100%", position: "absolute", justifyContent: "center", alignItems: "center" }} >
                <ActivityIndicator
                  size={"large"}
                  color={Colors.primary}
                />
              </View>
            }

          </View>
        }
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export default withRtl(TaskDetails);