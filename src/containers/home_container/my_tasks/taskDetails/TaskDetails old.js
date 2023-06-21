import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity, Modal, Pressable, TextInput,
  Keyboard, ActivityIndicator, SafeAreaView, Linking, KeyboardAvoidingView, Platform
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
import moment from 'moment';
import MakingMoneyModal from '../make_an_offer/MakingMoneyModal';
import { axiosUrl, configUrl, ImageLink } from '../../../../constants/LinkPage';
import ImageModal from '../../../../components/ImageModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { RefreshControl } from 'react-native';
import UpdateOfferModal from '../make_an_offer/UpdateOfferModal';
import ReviewOfferModal from '../make_an_offer/ReviewOfferModal';
import Pusher from 'pusher-js';
import { LogBox } from 'react-native';
import pusherConfig from '../../../../../pusher.json';
import ReviewOfferModalforSingle from '../make_an_offer/ReviewOfferModalforSingle';
import AcceptOfferinProposal from '../make_an_offer/AcceptOfferinProposal';
import { nameShorting } from '../../../../constants/NameShorting';
import { isInt, reviewShowinGraystar, reviewShowinStar, lastStar } from '../../../../constants/RatingCount';
import ReportTaskPage from '../../../../components/ReportTaskPage';
import WarningPage from '../../../../components/WarningPage';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import IncreasepriceModal_For_Tasker from '../make_an_offer/IncreasepriceModal_For_Tasker';
import IncreasepriceModal_For_Poster from '../make_an_offer/IncreasepriceModal_For_Poster';
import ReviewRequestModal from '../make_an_offer/ReviewRequestModal';
import Reschedule_Schedule from '../make_an_offer/Reschedule_Schedule';
import ReviewScheduleRequestModal from '../make_an_offer/ReviewScheduleRequestModal';
import { leftOrRight, rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import GiveReviewModal from '../make_an_offer/GiveReviewModal';
import axiosInstance from '../../../../constants/AxiosCallPage';
import axios from 'axios';
import { getdate_day_English } from '../../../../constants/DateShow';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { androidCameraPermission } from '../../../../constants/permissions/Permissions';
function TaskDetails({ navigation, route }) {

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
    socketId, setSocketId
  } = useContext(myContext)

  const tomorrowDate = moment(new Date()).add(1, 'days').format("YYYY-MM-DD")
  // console.log("...", tomorrowDate)

  const scrollView = useRef();
  const { show } = route.params;
  const [taskData, setTaskData] = useState(null)
  const [othertaskData, setOthertaskData] = useState([])
  const [loader, setLoader] = useState(false)
  const [bottonLoader, setBottonLoader] = useState(false)
  const [menuModal, setMenuModal] = useState(false)
  const [shareModal, setShareModal] = useState(false)
  const [imageToggle, setImageToggle] = useState(false)
  const [userid, setUserid] = useState("");
  const [imageModal, setImageModal] = useState(false);
  const [makingmoneyModal, setMakingmoneyModal] = useState(false);
  const [updateOfferModal, setUpdateOfferModal] = useState(false);
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
  const [tierData, setTierData] = useState(null)
  const [questionButtonLoader, setQuestionButtonLoader] = React.useState({
    reply: false,
    loader: false
  });
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
  const [releaseRequestModal, setReleaseRequestModal] = useState(false)
  const [reviewModal, setReviewModal] = useState(false)
  const [fromWhereModal_mainQuestion, setFromWhereModal_mainQuestion] = useState(false)
  const [fromWhereModal_replyQuestion, setFromWhereModal_replyQuestion] = useState(false)
  const [func, setFunc] = useState(false)

  LogBox.ignoreLogs(['Setting a timer for a long period of time'])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    autoLoad()
    Toast.show(strings.ERROR.REFRESHING)
    setRefreshing(false)
  }, [refreshing]);
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
        if (res.profile_picture != null && res.location != null && res.date_of_birth != null && res.is_phone_verified != "N" && res.is_email_verified != "N" && res.is_verify_document != "N") {
          setAllVerified(true)
        } else {
          setAllVerified(false)
        }


        if (res.profile_picture != null) {
          setProfileImageName(res.profile_picture)
        }
      }
    } catch (error) {
      console.log("getData2_taskdetails------", error)
      autoLoad()
    }
  }
  useEffect(() => {
    getData2()
    return () => {
      getData2()
    }
  }, []);
  const getTireData = async () => {
    try {
      const res = await axiosInstance.post("my-dashboard")
      if (res.data.result) {
        setTierData(res.data.result.tier)
      }
    } catch (error) {
      console.log("getTireData_taskdeatails----------", error)
      autoLoad()
    }
  }
  const getData = async () => {
    try {
      setLoader(true)
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "slug": show
        }
      }
      const data = await axiosInstance.post("get-task-details", res)
      // console.log(data.data)
      if (data.data.result) {
        setTaskData(data.data.result.task)
        setOthertaskData(data.data.result.other_task)
        const date = data.data.result.task.date
        if (date != null) {
          englishDate(date)
        }

        setAllquestion(data.data.result.task.get_question)
        createDateEnglish(data.data.result.task.created_at)
        createDatePersian(data.data.result.task.created_at)
        setLoader(false)
      } else {
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
      console.log("getData_taskdetails---------- ", error)
      autoLoad()
    }
  }
  useEffect(() => {
    const unsubscribe = tryWarningSolve_1()
    const willFocusSubscription = navigation.addListener('focus', () => {
      unsubscribe
    });
    return willFocusSubscription;
  }, [makingmoneyModal,
    updateOfferModal,
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
  const editTask = () => {
    setTaskDetails(taskData.slug)
    setMenuModal(!menuModal)
    setEditOrpostsimilar("edit")
    contextClean()
    navigation.navigate("EditTaskDetails", { slug_name: taskData.slug })
  }
  const similarTask = () => {
    setTaskDetails(taskData.slug)
    setMenuModal(!menuModal)
    contextClean()
    setEditOrpostsimilar("similarpost")
    navigation.navigate("EditTaskDetails", { slug_name: taskData.slug })
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
          "slug": show
        }
      }
      const data = await axiosInstance.post("cancel-task", res)
      if (data.data.error == undefined) {
        Toast.show(data.data.result.status.meaning)
        await AsyncStorage.setItem("isMyTaskloader", "true")
        // setLoader(false)
        navigation.goBack()
      } else {
        Toast.show(data.data.error.meaning)
      }
    } catch (error) {
      console.log("cancelTask", error)
    }
  }
  const englishDate = (val) => {
    // console.log(val, m)
    let m = moment(val, 'YYYY-MM-DD').format('DD MMM, YYYY');
    setDateConvert(m)

  }
  const englishDate2 = (val) => {
    let m = moment(val, 'YYYY-MM-DD').format('DD MMM, YYYY');
    return m
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
  const onPressMakeOffer = () => {
    setMakingmoneyModal(!makingmoneyModal)
  }
  const onPressupdateOffer = () => {
    setUpdateOfferModal(!updateOfferModal)
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
  const imageOnpress = () => {
    setQuestionImage(!questionImage)
  }
  const onpressShare = () => {
    setShareModal(!shareModal)
  }
  const onpressScheduleButton = () => {
    setScheduleModal(!scheduleModal)
  }
  const onpressReviewScheduleButton = () => {
    setReviewScheduleModal(!reviewScheduleModal)
  }
  const onpressattechButton_mainQuestion = () => {
    setFromWhereModal_mainQuestion(!fromWhereModal_mainQuestion)
  }
  const onpressattechButton_replyQuestion = () => {
    setFromWhereModal_replyQuestion(!fromWhereModal_replyQuestion)
  }
  const iscameraPermission_replyQuestion = async () => {
    const permissionStatus = await androidCameraPermission()
    if (permissionStatus || Platform.OS == "ios") {
      selectImageForQuestion_camera()
    } else {
      if (Platform.OS === 'ios') {
        Toast.show("Please give camera permission")
      }
      else {
        Linking.openSettings();
      }
    }
  }
  const iscameraPermission_mainQuestion = async () => {
    const permissionStatus = await androidCameraPermission()
    if (permissionStatus || Platform.OS == "ios") {
      selectImageForMainQuestion_camera()
    } else {
      if (Platform.OS === 'ios') {
        Toast.show("Please give camera permission")
      }
      else {
        Linking.openSettings();
      }
    }
  }
  const ChoosefromWhereModal_replyQuestion = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={fromWhereModal_replyQuestion}
        onRequestClose={() => {
          onpressattechButton_replyQuestion()
        }}
      >
        <View style={{ flex: 1 }} >
          <Pressable onPressIn={onpressattechButton_replyQuestion} style={{ flex: 3, backgroundColor: "rgba(52,52,52,0.5)" }} ></Pressable>
          <View style={{ flex: 1, backgroundColor: Colors.white, padding: Normalize(15) }} >
            <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.primary, fontSize: Normalize(16), textAlign: "center" }]} >Select images from</Text>
            <View style={{ flex: 1, flexDirection: "row" }} >
              <View style={{ alignItems: "center", justifyContent: "center", flex: 1, }} >
                <Pressable
                  onPressIn={iscameraPermission_replyQuestion}
                  style={styles.galleryorcamera_icon} >
                  <FontAwesome5
                    name='camera'
                    size={Normalize(30)}
                    color={Colors.primary}
                  />
                </Pressable>
                <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.primary }]} >Camera</Text>
              </View>

              <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }} >
                <Pressable
                  onPressIn={selectImageForQuestion_gallary}
                  style={styles.galleryorcamera_icon} >
                  <FontAwesome5
                    name='images'
                    size={Normalize(30)}
                    color={Colors.primary}
                  />
                </Pressable>
                <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.primary }]} >Gallery</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
  const ChoosefromWhereModal_mainQuestion = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={fromWhereModal_mainQuestion}
        onRequestClose={() => {
          onpressattechButton_mainQuestion()
        }}
      >
        <View style={{ flex: 1 }} >
          <Pressable onPressIn={onpressattechButton_mainQuestion} style={{ flex: 3, backgroundColor: "rgba(52,52,52,0.5)" }} ></Pressable>
          <View style={{ flex: 1, backgroundColor: Colors.white, padding: Normalize(15) }} >
            <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.primary, fontSize: Normalize(16), textAlign: "center" }]} >Select images from</Text>
            <View style={{ flex: 1, flexDirection: "row" }} >
              <View style={{ alignItems: "center", justifyContent: "center", flex: 1, }} >
                <Pressable
                  onPressIn={iscameraPermission_mainQuestion}
                  style={styles.galleryorcamera_icon} >
                  <FontAwesome5
                    name='camera'
                    size={Normalize(30)}
                    color={Colors.primary}
                  />
                </Pressable>
                <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.primary }]} >Camera</Text>
              </View>

              <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }} >
                <Pressable
                  onPressIn={selectImageForMainQuestion_gallery}
                  style={styles.galleryorcamera_icon} >
                  <FontAwesome5
                    name='images'
                    size={Normalize(30)}
                    color={Colors.primary}
                  />
                </Pressable>
                <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.primary }]} >Gallery</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
  const selectImageForQuestion_gallary = () => {
    onpressattechButton_replyQuestion()
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        // console.log(response.assets[0])
        setQuestionSelectedImage(response.assets[0])
      }
    })
  }
  const selectImageForQuestion_camera = () => {
    if (Platform.OS == "android") {
      onpressattechButton_replyQuestion()
    }
    launchCamera({
      mediaType: "photo",
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.7
    }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        if (response.assets) {
          if (Platform.OS == "ios") {
            onpressattechButton_replyQuestion()
          }
          setQuestionSelectedImage(response.assets[0])
        } else {
          if (Platform.OS === 'ios') {
            Toast.show("Please give camera permission")
          }
        }
      }
    })
  }
  const selectImageForMainQuestion_gallery = () => {
    onpressattechButton_mainQuestion()
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        // console.log(response.assets[0])
        setMainquestionSelectedImage(response.assets[0])
      }
    })
  }
  const selectImageForMainQuestion_camera = () => {
    if (Platform.OS == "android") {
      onpressattechButton_mainQuestion()
    }
    launchCamera({
      mediaType: "photo",
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.7
    }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {

        if (response.assets) {
          if (Platform.OS == "ios") {
            onpressattechButton_mainQuestion()
          }
          setMainquestionSelectedImage(response.assets[0])
        } else {
          if (Platform.OS === 'ios') {
            Toast.show("Please give camera permission")
          }
        }
      }
    })
  }
  const messageSendButtonforMainQuestion = async (val) => {
    try {
      if (allVerified || taskData.get_user.slug == userSlugName) {
        if (mainquestionMessage.length != 0 && mainquestionMessage.trim() != "") {
          setQuestionButtonLoader({ reply: false, loader: true })
          const parent_id = parseInt(val)
          const message = mainquestionMessage.trim()
          const socket_id = parseFloat(socketId)
          const finalFormData = new FormData();
          finalFormData.append('slug', taskData.slug);
          finalFormData.append('parent_id', parent_id);
          finalFormData.append('message', message);
          socketId.length == 0 ?
            finalFormData.append('socket_id', "7534.23627811") :
            finalFormData.append('socket_id', socket_id);
          {
            if (mainquestionSelectedImage.fileName == undefined) {
              null
            } else {
              finalFormData.append('file', {
                uri: mainquestionSelectedImage.uri,
                type: mainquestionSelectedImage.type,
                name: mainquestionSelectedImage.fileName,
              });
            }
          }
          const data = finalFormData
          const res = await axiosInstance.post("ask-question", data)
          if (res.data.task_question) {
            aftersendquestion()
            setQuestionId()
          } else {
            Toast.showWithGravity(res.data.error.meaning, Toast.LONG, Toast.BOTTOM);
            setQuestionButtonLoader({ reply: false, loader: false })
          }
        } else {
          Toast.show(language == "en" ? "At first add a question" : "در ابتدا یک سوال اضافه کنید")
        }
      } else {
        onPressMakeOffer()
      }
    } catch (error) {
      setQuestionButtonLoader({ reply: false, loader: false })
      console.log("messageSendButtonforMainQuestion", error)
    }
  }
  const messageSendButton = async (val) => {
    try {
      if (allVerified || taskData.get_user.slug == userSlugName) {
        if (questionMessage.length != 0 && questionMessage.trim() != "") {
          setQuestionButtonLoader({ reply: true, loader: true })
          const parent_id = parseInt(val)
          const message = questionMessage.trim()
          // const socket_id = parseFloat(7534.23627811)
          const socket_id = parseFloat(socketId)
          const finalFormData = new FormData();
          finalFormData.append('slug', taskData.slug);
          finalFormData.append('parent_id', parent_id);
          finalFormData.append('message', message);
          socketId.length == 0 ?
            finalFormData.append('socket_id', "7534.23627811") :
            finalFormData.append('socket_id', socket_id);
          {
            if (questionSelectedImage.fileName == undefined) {
              null
            } else {
              finalFormData.append('file', {
                uri: questionSelectedImage.uri,
                type: questionSelectedImage.type,
                name: questionSelectedImage.fileName,
              });
            }
          }
          const data = finalFormData
          const res = await axiosInstance.post("ask-question", data)
          // console.log(res.data)
          if (res.data.task_question) {
            setReplyToggle(!replyToggle)
            setQuestionMessage("")
            setQuestionSelectedImage("")
            aftersendquestionReply()
            setQuestionId()
          } else {
            Toast.showWithGravity(res.data.error.meaning, Toast.LONG, Toast.BOTTOM);
            setQuestionButtonLoader({ reply: false, loader: false })
          }
        } else {
          Toast.show(language == "en" ? "At first add a question" : "در ابتدا یک سوال اضافه کنید")
        }
      } else {
        onPressMakeOffer()
      }
    } catch (error) {
      setQuestionButtonLoader({ reply: false, loader: false })
      console.log("messageSendButton", error)
    }
  }
  const replyButton = (val) => {
    if (val == questionId) {
      setQuestionId(val)
      setReplyToggle(!replyToggle)
      setQuestionMessage("")
      setQuestionSelectedImage(false)

    } else {
      setQuestionId(val)
      setReplyToggle(true)
      setQuestionMessage("")
      setQuestionSelectedImage(false)
    }
  }
  const getAllMessage = async () => {
    try {
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "slug": show
        }
      }
      const data = await axiosInstance.post("get-task-details", res)
      if (data.data.result) {
        setAllquestion(data.data.result.task.get_question)
        setTaskData(data.data.result.task)
        setOthertaskData(data.data.result.other_task)
        const date = data.data.result.task.date
        if (date != null) {
          englishDate(date)
        }
        createDateEnglish(data.data.result.task.created_at)
        createDatePersian(data.data.result.task.created_at)
      }
    } catch (error) {
      console.log("getAllMessage", error)
    }
  }
  const aftersendquestion = async () => {
    try {
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "slug": show
        }
      }
      const data = await axiosInstance.post("get-task-details", res)
      if (data.data.result) {
        Keyboard.dismiss()
        setmainquestionMessage("")
        setMainquestionSelectedImage("")
        setAllquestion(data.data.result.task.get_question)
        setQuestionButtonLoader({ reply: false, loader: false })
        scrollView.current.scrollToEnd()
      }
    } catch (error) {
      console.log("getAllMessage", error)
    }
  }
  const aftersendquestionReply = async () => {
    try {
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "slug": show
        }
      }
      const data = await axiosInstance.post("get-task-details", res)
      if (data.data.result) {
        setReplyToggle(false)
        setQuestionButtonLoader({ reply: false, loader: false })
        setQuestionId()
        setAllquestion(data.data.result.task.get_question)
        setQuestionMessage("")
        setQuestionSelectedImage("")
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
  const MakeanofferButton = ({ onPress, disabled, title }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} disabled={bottonLoader ? true : disabled}
        onPress={onPress}
        style={{ height: "61%", width: "90%", backgroundColor: disabled ? "#e7ebfb" : Colors.secondary, borderRadius: Normalize(5), justifyContent: "center", alignItems: "center", marginBottom: Normalize(12) }}>
        {
          bottonLoader ?
            <ActivityIndicator
              size={"small"}
              color={Colors.white}
            />
            :
            <Text style={{ fontFamily: 'Outfit-SemiBold', fontSize: Normalize(14), color: disabled ? "#bbc2dc" : Colors.white, }}>
              {title}
            </Text>
        }


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
          "slug": taskData.slug,
          "id": myBidId(taskData.get_bid),
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
    <View style={[styles.containermakeoffer]}>
      <View style={{ flex: 1.3, justifyContent: "center", alignItems: "center" }}>

        <Text style={{ fontSize: Normalize(14), marginBottom: Normalize(8), fontFamily: 'Outfit-Medium', color: Colors.primary }}>
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

            taskData.get_user.id == userid ?

              taskData.get_bid.length > 0 ?
                <MakeanofferButton
                  onPress={onPressreviewOffer}
                  disabled={false}
                  title={strings.TASKDETAILS.REVIEWOFFER}
                /> :
                <MakeanofferButton
                  // color={Colors.lightGrey}
                  // onPress={() => console.log("pkkkk")}
                  disabled={true}
                  title={strings.TASKDETAILS.AWAITINGREPLY}
                />
              :
              taskData.get_bid.length > 0 ?
                isMyBid(taskData.get_bid) ?
                  <MakeanofferButton
                    onPress={onPressupdateOffer}
                    // disabled={true}
                    title={"update offer"}
                  /> :
                  <MakeanofferButton
                    onPress={onPressMakeOffer}
                    // disabled={true}
                    title={strings.TASKDETAILS.MAKEANOFFER}
                  /> :
                <MakeanofferButton
                  onPress={onPressMakeOffer}
                  // disabled={true}
                  title={strings.TASKDETAILS.MAKEANOFFER}
                /> :
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
                    // onPress={() => { navigation.navigate('ChatPage', { taskName: taskData.title, show: taskData.slug, data: { "fname": taskData.get_user.fname, "id": taskData.user_id, "lname": taskData.get_user.lname, "profile_picture": taskData.get_user.profile_picture, "slug": taskData.slug } }) }}
                    onPress={() => {
                      navigation.navigate('ChatPage', {
                        show: taskData.slug,
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
  const percentageCalculate = (val) => {
    if (tierData) {
      if (val == "") {
        var a = 0
      } else {
        if (tierData.commission_type == "P") {
          var totalcommision = val * (Math.round(tierData.commission) / 100)
          var b = val - totalcommision
          if (b < 1000) {
            var a = 1000
          } else {
            var c = Math.round(b)
            if (c < 2000 || totalcommision < 1000) {
              var d = val - 1000
              var a = d.toString()
              return a
            } else {
              var a = c
            }
          }
        } else {
          var a = val - tierData.fix_commission
        }
      }
      return a;
    } else {
      getTireData()
      return 0;
    }
  }
  const getSocketId = () => {
    const pusher = new Pusher(pusherConfig.key, pusherConfig);
    pusher.connection.bind("connected", () => {
      var socketId = pusher.connection.socket_id;
      // console.log("///", socketId)
      setSocketId(socketId)
    });

  }
  const autoLoad = async () => {
    try {
      setFunc(true)
      // setQuestionButtonLoader({ reply: false, loader: false })
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "slug": show
        }
      }
      // console.log(res)
      const data = await axiosInstance.post("get-task-details", res)
      if (data.data.result) {
        setTaskData(data.data.result.task)
        setOthertaskData(data.data.result.other_task)
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
  const getAllData = () => {
    const pusher = new Pusher(pusherConfig.key, pusherConfig);
    let channel = pusher.subscribe("eazypay-development");
    pusher.connection.bind("connected", () => {
      var socketid = pusher.connection.socket_id;
      // console.log("****", socketId)
      setSocketId(socketid)
    });
    channel.bind('question-event', function (data) {
      func ? null : autoLoad()
    })
    channel.bind('bid-apply-event', function (data) {
      if (data) {
        func ? null : autoLoad()
      }
    })
    channel.bind('bid-withdraw-event', function (data) {
      if (data) {
        func ? null : autoLoad()
      }
    })
    channel.bind('bid-update-event', function (data) {
      if (data) {
        func ? null : autoLoad()
      }
    })
    channel.bind('bid-reply-event', function (data) {
      if (data) {
        func ? null : autoLoad()
      }
    })
    channel.bind('task-assign-event', function (data) {
      if (data) {
        func ? null : autoLoad()
      }
    })
  }
  useEffect(() => {
    const a = pusherFunc()
    return a
  }, [])
  const pusherFunc = () => {
    getSocketId()
    getAllData()
  }
  const replyReadMore = (val) => {
    if (replyLength.id == val && replyLength.expand == true) {
      setReplyLength({ id: val, expand: false })
    } else {
      setReplyLength({ id: val, expand: true })
    }
  }
  const readMore_proposal = (val) => {
    if (proposal_Ques_Length.id == val && proposal_Ques_Length.expand == true) {
      setProposal_Ques_Length({ id: val, expand: false })
    } else {
      setProposal_Ques_Length({ id: val, expand: true })
    }
  }
  const questionReadMore = (val) => {
    if (questionLength.id == val && questionLength.expand == true) {
      setQuestionLength({ id: val, expand: false })
    } else {
      setQuestionLength({ id: val, expand: true })
    }
  }
  const assigneeeDescriptionReadMore = (val) => {
    if (proposalTextToggle.id == val && proposalTextToggle.expand == true) {
      setProposalTextToggle({ id: val, expand: false })
    } else {
      setProposalTextToggle({ id: val, expand: true })
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
          "slug": taskData.slug,
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
  const data = [
    {
      image: images.linkdin,
      onpress: () => onpressLinkdinShare()
    },
    {
      image: images.facebook_min,
      onpress: () => onpressFacebookShare()
    },
    {
      image: images.twiter_min,
      onpress: () => onpresstwitterShare()
    },
  ]
  const onpressFacebookShare = async () => {
    let slugAndrequest = `my-task/${taskData.slug}`
    const url =
      "https://www.facebook.com/sharer/sharer.php?" + "u=" + encodeURI(configUrl.URL) + encodeURI(slugAndrequest);


    Linking.openURL(url)
      .then((data) => {
        console.log("Facebook Opened", data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };
  const onpresstwitterShare = async () => {
    let slugAndrequest = configUrl.URL + `my-task/${taskData.slug}`
    let name = nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)
    Linking.openURL(
      `https://www.twitter.com/intent/tweet?text=${name}&url=${slugAndrequest}`
    );
  };
  const onpressLinkdinShare = async () => {
    let slugAndrequest = configUrl.URL + 'my-task/' + taskData.slug
    let name = nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)
    Linking.openURL(`https://www.linkedin.com/shareArticle?mini=true&summary=&title=&url=https://changicourt.com/dev/my-task/${taskData.slug}`);
  };
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
  const detect_SpanTag = (val) => {
    let a = val
    let b = a.split(`<span style="color:#0e148b">`)
    if (b.length === 1) {
      return val
    } else {
      let c = b[1].split("</span>")
      return <Text>{b[0]} <Text style={{ color: Colors.primary }} >{c[0]}</Text> {c[1]}</Text>
    }
  }
  const three_boxData = [
    {
      "title": strings.TASKDETAILS.TOTALOFFERSUBMITTED,
      "data": taskData == null ? "0" : taskData.tot_bids
    },
    {
      "title": strings.TASKDETAILS.TOTALVIEWS,
      "data": taskData == null ? "0" : taskData.tot_view
    },
    {
      "title": strings.TASKDETAILS.TASKSTATUS,
      "data": getstatus(taskData == null ? 2 : taskData.status)
    },
  ]
  const Three_grayBox = ({ title, val, index }) => {
    return (
      <View key={index} style={{ height: "100%", width: "31%", backgroundColor: "#9CA3AC", justifyContent: "center", alignItems: "center", borderRadius: Normalize(3) }} >
        <Text style={{ fontSize: Normalize(10), fontFamily: 'Outfit-Regular', color: Colors.white, marginBottom: Normalize(3) }} >{title}</Text>
        <Text style={{ fontSize: Normalize(10), fontFamily: 'Outfit-Medium', color: Colors.white }} >{val}</Text>
      </View>
    )
  }


  // console.log(taskData != null ? `${taskData.date} ${taskData.date_type} ` : "load")
  // console.log(taskData.slug)






  return (
    <>
      {/* {
        loader ? <LoaderPage />
          : */}
      {taskData == null || percentageCalculate(myBidAmount(taskData.get_bid)) == 0 ?
        <LoaderPage />
        :
        <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
          <KeyboardAvoidingView
            behavior={(Platform.OS === 'ios') ? "padding" : null} style={styles.container}>
            <HeaderTask
              navigation={navigation}
              back
              name={strings.TASKDETAILS.HEADERTEXT}
              menuButton={() => setMenuModal(!menuModal)}
              shareButton={onpressShare}
            />

            {shareModal &&
              <Modal
                animationType="none"
                transparent={true}
                visible={shareModal}
                onRequestClose={onpressShare}
              >
                <TouchableOpacity activeOpacity={1} onPress={onpressShare} style={{ flex: 1, }} >
                  <View style={{ paddingHorizontal: 2, backgroundColor: Colors.white, right: 0, position: "absolute", top: Normalize(38), right: Normalize(60), elevation: Normalize(3), borderTopLeftRadius: 7, borderBottomLeftRadius: 7, borderBottomRightRadius: 7, paddingVertical: Normalize(2) }} >
                    {
                      data.map((item, index) => (
                        <View key={index} activeOpacity={0.8} style={{ height: Normalize(30), width: Normalize(40), alignItems: "center", justifyContent: "center", marginVertical: Normalize(2) }}>
                          <TouchableOpacity onPress={item.onpress} activeOpacity={0.8} style={{ height: Normalize(30), width: Normalize(30) }}>
                            <Image source={item.image} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                          </TouchableOpacity>
                        </View>
                      ))
                    }
                  </View>
                </TouchableOpacity>
              </Modal>
            }

            {
              menuModal &&
              <Modal
                animationType="none"
                transparent={true}
                visible={menuModal}
                onRequestClose={() => {
                  setMenuModal(!menuModal);
                }}
              >
                <TouchableOpacity activeOpacity={1} onPress={() => setMenuModal(!menuModal)} style={{ flex: 1, }} >
                  <View style={{ padding: 2, backgroundColor: Colors.white, right: 0, position: "absolute", top: Normalize(35), right: Normalize(25), elevation: Normalize(3), borderTopLeftRadius: 7, borderBottomLeftRadius: 7, borderBottomRightRadius: 7 }} >
                    {
                      taskData.status == 2 ?
                        taskData.get_user.id == userid ?
                          <TouchableOpacity activeOpacity={0.8} onPress={editTask} style={{ height: Normalize(26.7), width: Normalize(140), alignItems: "center", justifyContent: "center", flex: 1 }}>
                            <Text style={globalstyles.plantext_outfit_regular} >{strings.POSTTASK.EDIT}</Text>
                          </TouchableOpacity> : null : null
                    }
                    {
                      taskData.status == 2 ?
                        taskData.get_user.id == userid &&
                        <TouchableOpacity activeOpacity={0.8} onPress={cancelTaskOnpress} style={{ height: Normalize(26.7), width: Normalize(140), alignItems: "center", justifyContent: "center", flex: 1 }} >
                          <Text style={globalstyles.plantext_outfit_regular}>{strings.POSTTASK.CANCEL}</Text>
                        </TouchableOpacity> : null
                    }
                    <TouchableOpacity activeOpacity={0.8} onPress={similarTask} style={{ height: Normalize(26.7), width: Normalize(140), alignItems: "center", justifyContent: "center", flex: 1 }}>
                      <Text style={globalstyles.plantext_outfit_regular}>{strings.POSTTASK.POSTSIMILARTASK}</Text>
                    </TouchableOpacity>
                    {
                      taskData.status == 2 && (taskData.get_user.slug != userSlugName && taskData.report_chk == false &&
                        <TouchableOpacity activeOpacity={0.8}
                          onPress={onPressTaskReport}
                          style={{ height: Normalize(26.7), width: Normalize(140), alignItems: "center", justifyContent: "center", flex: 1 }}>
                          <Text style={globalstyles.plantext_outfit_regular}>{strings.POSTTASK.REPORTHISTASK}</Text>
                        </TouchableOpacity>)
                    }

                    {
                      cancelTaskModal && <WarningPage
                        onPress={cancelTaskOnpress}
                        ispress={cancelTaskModal}
                        warningTitle={language == 'en' ? 'Cancel task' : 'لغو کار'}
                        warningSubTitle={language == 'en' ? 'Are you Sure?' : "آیا مطمئن هستید؟"}
                        okOnpress={cancelTask}
                        cancelOnpress={cancelTaskOnpress} />
                    }
                    {menuModal}
                    <ReportTaskPage
                      ispress={taskReportModal}
                      onPress={onPressTaskReport}
                      slug={taskData.slug}
                      token={token}
                      getAllMessage={getAllMessage}
                    />

                  </View>
                </TouchableOpacity>
              </Modal>
            }
            <CurveDesing_Component  >

              <View style={{ flex: 1, paddingHorizontal: Normalize(16) }} >
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  ref={scrollView}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="always"
                >
                  {/* *******************top warning box for reschulde time************ */}
                  {taskData.status == 3 &&
                    (taskData.get_all_bid != undefined && taskData.get_tasker_reschedule_request != null &&
                      (
                        taskData.get_tasker_reschedule_request.status &&
                        (
                          taskData.get_tasker_reschedule_request.status == "I" ?
                            taskData.user_id == userid ?
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
                                          <Text style={[globalstyles.plantext_outfit_regular, { color: Colors.yellow }]} >{nameShorting(taskData.get_bid[0].get_user.fname + " " + taskData.get_bid[0].get_user.lname)}</Text> {`Your rescheduled date of ${getdate_day_English(taskData.get_tasker_reschedule_request.reschedule_date)[0]}, ${getdate_day_English(taskData.get_tasker_reschedule_request.reschedule_date)[1]} ${getdate_day_English(taskData.get_tasker_reschedule_request.reschedule_date)[2]} for this task`}
                                        </Text>}
                                      {
                                        language == "pr" &&
                                        <View style={{ flexDirection: rowOrRowreverse(language) }} >
                                          <Text style={[globalstyles.plantext_Outfit_Medium, { textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: Normalize(11), color: Colors.greyText }]}>یک درخواست زمانبندی مجدد از طرف مجری کار برای شما ارسال شده است.</Text>

                                          {/* <Text style={{ textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: Colors.yellow }}>{nameShorting(taskData.get_bid[0].get_user.fname + " " + taskData.get_bid[0].get_user.lname)}</Text> */}
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
                                  taskSlugname={taskData.slug}
                                  name={nameShorting(taskData.get_all_bid[0].get_user.fname + " " + taskData.get_all_bid[0].get_user.lname)}
                                  imageName={taskData.get_all_bid[0].get_user.profile_picture}
                                  reason={taskData.get_tasker_reschedule_request.reschedule_reason}
                                  oldDate={taskData.date != null ? taskData.date : tomorrowDate}
                                  requesteddate={taskData.get_tasker_reschedule_request.reschedule_date}

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

                                          `Your rescheduled date ${englishDate2(taskData.get_tasker_reschedule_request.reschedule_date)} is pending confirmation`
                                          :
                                          `زمانبندی جدید شما سه شنبه ${questionPersianTimeShow(taskData.get_tasker_reschedule_request.reschedule_date)} در انتظار تأیید است`
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
                            taskData.user_id != userid &&
                              taskData.get_tasker_reschedule_request.status == "R" ?
                              <View style={{ padding: Normalize(10), marginTop: 15, flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center", alignItems: "center", backgroundColor: "#fadcda", borderRadius: 6 }} >
                                <View style={{ height: Normalize(38), width: Normalize(38), justifyContent: "center", alignItems: "center" }} >
                                  <Image source={images.crosinf} style={{ height: "90%", width: "90%", resizeMode: "contain" }} />
                                </View>
                                <View style={{ flex: 1 }} >
                                  <Text style={[globalstyles.plantext_Outfit_Medium, { textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: Normalize(11), color: "#434648" }]}>
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
                              <View style={{ padding: Normalize(10), marginTop: 15, flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center", alignItems: "center", backgroundColor: "#fadcda", borderRadius: 6 }} >
                                <View style={{ height: Normalize(38), width: Normalize(38), justifyContent: "center", alignItems: "center" }} >
                                  <Image source={images.crosinf} style={{ height: "90%", width: "90%", resizeMode: "contain" }} />
                                </View>
                                <View style={{ flex: 1 }} >
                                  <Text style={[globalstyles.plantext_Outfit_Medium, { textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: Normalize(11), color: "#434648" }]}>
                                    {language == "en" ?
                                      `Your reschedule request limit is over. Please get in touch with ${nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)} and talk through the next steps to help complete the task.`
                                      :
                                      // `محدودیت درخواست زمان‌بندی مجدد شما به پایان رسیده است. لطفاً با ${nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)} تماس بگیرید و مراحل بعدی را برای کمک به تکمیل کار صحبت کنید.`}
                                      `تبریک ، درخواست زمانبندی جدید از طرف کارفرما پذیرفته شد. لطفا در ارتباط با مراحل بعدی انجام کار و تکمیل آن با کارفرمای مربوطه در تماس باشید.`}
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
                        <View style={{ padding: Normalize(10), marginTop: 15, flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center", alignItems: "center", backgroundColor: "#fadcda", borderRadius: 6 }} >
                          <View style={{ height: Normalize(38), width: Normalize(38), justifyContent: "center", alignItems: "center" }} >
                            <Image source={images.crosinf} style={{ height: "90%", width: "90%", resizeMode: "contain" }} />
                          </View>
                          <View style={{ flex: 1 }} >
                            <Text style={[globalstyles.plantext_Outfit_Medium, { textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: Normalize(11), color: "#434648" }]}>

                              {
                                language == "en" ?
                                  `Your price increase was not accepted. Please get in touch with ${nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)} and talk through the next steps to help complete the task.`
                                  :
                                  `درخواست افزایش قیمت شما پذیرفته نشد. لطفا با کارفرمای مربوطه در تماس باشید و در مورد مراحل بعدی انجام کار و تکمیل آن صحبت کنید.`
                              }


                            </Text>
                          </View>
                        </View>
                        : taskData.get_tasker_increase_payment.status == "I" &&
                        <View style={{ padding: Normalize(10), marginTop: 15, flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center", alignItems: "center", backgroundColor: "#fbedd5", borderRadius: 6 }} >
                          <View style={{ height: Normalize(38), width: Normalize(38) }} >
                            <Image source={images.yellow_info} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                          </View>
                          <View style={{ flex: 1 }} >
                            <Text style={[globalstyles.plantext_Outfit_Medium, { textAlign: language == "en" ? "left" : "right", paddingHorizontal: "2%", fontSize: Normalize(11), color: "#434648" }]}>
                              {
                                language == "en" ?
                                  `Your price increase request of $ ${addCommaAndTranslateInPersian((Math.round(taskData.get_tasker_increase_payment.amount)), language)} is pending. Please get in touch with ${nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)} and talk through the next steps to help complete the task.`
                                  :
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

                          <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center", justifyContent: "space-around" }} >
                            <Text style={[globalstyles.taskdetails_category_subcate, { color: "#343535" }]}>
                              {taskData.date != null ? dateConvert : taskData.date_type == "F" ? "Flexible" : taskData.date_type == "B" ? "As soon as possible" : "error in date"}
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


                    {/* ***************Three Box for total views,total offer, status************** */}
                    <View style={{ height: Normalize(40), flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", marginTop: Normalize(20) }} >
                      {
                        three_boxData.map((item, index) => (
                          <Three_grayBox key={index} title={item.title} val={item.data} />
                        ))
                      }
                    </View>







                    {/* ********make an offer******* */}
                    {
                      taskData.status == 2 ?
                        taskData.get_user.id == userid ?
                          taskData.tot_bids > 0 ? <OfferTypeBox /> : <OfferTypeBox /> : taskData.get_bid.length > 0 ? isMyBid(taskData.get_bid) ?
                            // ********  UPDATE OFFER  SECTION *********
                            <View style={{
                              width: '99%',
                              height: Normalize(210),
                              marginTop: Normalize(20),
                              alignSelf: 'center',
                              backgroundColor: '#ffffff',
                              borderColor: Colors.disable_textinput_border,
                              borderRadius: Normalize(8),
                              borderWidth: Normalize(1),
                              elevation: Normalize(1.5)
                            }}>
                              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: Normalize(14), marginBottom: Normalize(10), fontFamily: 'Outfit-Regular', color: Colors.primary }}>
                                  {strings.TASKDETAILS.BUDGET}
                                </Text>
                                {
                                  taskData.budget <= 0 ?
                                    <View style={{ flexDirection: 'row-reverse', alignItems: "center" }}>
                                      <Text style={{ color: Colors.green_new_2, fontSize: Normalize(18), fontFamily: 'Outfit-Medium', }}>Open Offer</Text>
                                    </View> :
                                    <View style={{ alignItems: "center" }}>
                                      <Text style={styles.priceText}>{strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian(taskData.budget, language)}</Text>
                                    </View>
                                }
                              </View>
                              <View style={{ height: Normalize(77), width: "100%", marginBottom: Normalize(3) }} >
                                <View style={{ flex: 1.3, flexDirection: language == "en" ? "row" : "row-reverse", backgroundColor: Colors.primary }} >
                                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                    <Text style={{ fontSize: Normalize(13), fontFamily: 'Outfit-Medium', color: Colors.white }} >{strings.MAKEANOFFER.YOUOFFERED}</Text>
                                  </View>
                                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                    <View style={{ flexDirection: "row" }}>
                                      <Text style={{ fontSize: Normalize(13), fontFamily: 'Outfit-Medium', color: Colors.white, paddingHorizontal: Normalize(2) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                      <Text style={{ fontSize: Normalize(13), fontFamily: 'Outfit-Medium', color: Colors.white }} >{addCommaAndTranslateInPersian(myBidAmount(taskData.get_bid), language)}</Text>
                                    </View>
                                  </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                    <View style={{ flexDirection: rowOrRowreverse(language) }} >
                                      <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{tierData.level} {strings.MAKEANOFFER.SERVICEFEE}</Text>
                                    </View>

                                  </View>
                                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                    <View style={{ flexDirection: 'row' }}>
                                      <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText, paddingHorizontal: Normalize(2) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                      <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText }} >
                                        {getServicesFees(taskData.get_bid) == null ? 0 : addCommaAndTranslateInPersian(getServicesFees(taskData.get_bid), language)}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                    <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: Colors.greyText }} >{strings.MAKEANOFFER.YOULLRECEIVE}</Text>
                                  </View>
                                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                    <View style={{ flexDirection: 'row' }}>
                                      <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText, paddingHorizontal: Normalize(2) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                      <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText }} >
                                        {addCommaAndTranslateInPersian(youllRecived(taskData.get_bid), language)}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              </View>
                              <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", justifyContent: "center" }}>
                                <MakeanofferButton
                                  onPress={onPressupdateOffer}
                                  // disabled={true}
                                  title={strings.TASKDETAILS.UPDATEOFFER}
                                />
                              </View>
                            </View>
                            : <OfferTypeBox /> : <OfferTypeBox /> :

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
                                <View style={{ flex: 1.3, backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center", flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                  <Text style={{ fontSize: Normalize(13), fontFamily: 'Outfit-Medium', color: Colors.white, marginHorizontal: Normalize(3) }} >{strings.TASKDETAILS.YOUPAID}</Text>
                                  <View style={{ flexDirection: "row" }} >
                                    <Text style={{ fontSize: Normalize(13), fontFamily: 'Outfit-Medium', color: Colors.white, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                    <Text style={{ fontSize: Normalize(13), fontFamily: 'Outfit-Medium', color: Colors.white }} >{numberWithCommas(Math.round(taskData.amount) + Math.round(taskData.booking_fees))}</Text>
                                  </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                    <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{strings.MAKEANOFFER.BOOKINGFEE}</Text>
                                  </View>
                                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: 'row' }} >
                                    <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                    <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{language == "en" ? numberWithCommas(Math.round(taskData.booking_fees)) : engToPersian(numberWithCommasinParsian(Math.round(taskData.booking_fees)))}</Text>
                                  </View>
                                </View>
                                {/* <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                  <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: Colors.greyText }} >{strings.TASKDETAILS.TASKERWILLRECEIVE}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: language == "en" ? "row-reverse" : "row" }} >
                                  <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: Colors.greyText, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                  <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: Colors.greyText }} >{language == "en" ? numberWithCommas(Math.round(taskData.amount)) : engToPersian(numberWithCommasinParsian(Math.round(taskData.amount)))}</Text>
                                </View>
                              </View> */}
                              </View>
                              <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", justifyContent: "center" }}>
                                <MakeanofferButton
                                  onPress={() => {
                                    navigation.navigate('ChatPage', {
                                      show: taskData.slug,
                                    })
                                  }}
                                  title={strings.TASKDETAILS.PRIVATEMESSAGE}
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
                                    <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{language === "en" ? tierData.level : tierData.level_fa} {strings.MAKEANOFFER.SERVICEFEE}</Text>
                                  </View>
                                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                    <View style={{ flexDirection: 'row' }}>
                                      <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText, paddingHorizontal: Normalize(2) }} > {strings.BROWSEFILTER.TOMAN}</Text>
                                      <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{addCommaAndTranslateInPersian((Math.round(taskData.amount - taskData.recive_amount)), language)}</Text>
                                    </View>
                                  </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                    <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: Colors.greyText }} >{strings.MAKEANOFFER.YOULLRECEIVE}</Text>
                                  </View>
                                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                    <View style={{ flexDirection: 'row' }}>
                                      <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: Colors.greyText, paddingHorizontal: Normalize(2) }} > {strings.BROWSEFILTER.TOMAN}</Text>
                                      <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: Colors.greyText }} >{addCommaAndTranslateInPersian(Math.round(taskData.recive_amount), language)}</Text>
                                    </View>
                                  </View>
                                </View>
                              </View>
                              <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", justifyContent: "center" }}>
                                <MakeanofferButton
                                  onPress={() => {
                                    navigation.navigate('ChatPage', {
                                      show: taskData.slug,
                                    })
                                  }}
                                  title={strings.TASKDETAILS.PRIVATEMESSAGE}
                                />
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
                                    <Text style={{ fontSize: Normalize(13), fontFamily: 'Outfit-Medium', color: Colors.white, marginHorizontal: Normalize(3) }} >{strings.TASKDETAILS.YOUPAID}</Text>
                                    <View style={{ flexDirection: "row" }} >
                                      <Text style={{ fontSize: Normalize(13), fontFamily: 'Outfit-Medium', color: Colors.white, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                      <Text style={{ fontSize: Normalize(13), fontFamily: 'Outfit-Medium', color: Colors.white }} >{numberWithCommas(Math.round(taskData.amount) + Math.round(taskData.booking_fees))}</Text>
                                    </View>
                                  </View>
                                  <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                      <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{strings.MAKEANOFFER.BOOKINGFEE}</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: 'row' }} >
                                      <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                      <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{language == "en" ? numberWithCommas(Math.round(taskData.booking_fees)) : engToPersian(numberWithCommasinParsian(Math.round(taskData.booking_fees)))}</Text>
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
                                      <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{language === "en" ? tierData.level : tierData.level_fa} {strings.MAKEANOFFER.SERVICEFEE}</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                      <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText, paddingHorizontal: Normalize(2) }} > {strings.BROWSEFILTER.TOMAN}</Text>
                                        <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{addCommaAndTranslateInPersian((Math.round(taskData.amount - taskData.recive_amount)), language)}</Text>
                                      </View>
                                    </View>
                                  </View>
                                  <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                      <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: Colors.greyText }} >{strings.MAKEANOFFER.YOULLRECEIVE}</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                      <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: Colors.greyText, paddingHorizontal: Normalize(2) }} > {strings.BROWSEFILTER.TOMAN}</Text>
                                        <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: Colors.greyText }} >{addCommaAndTranslateInPersian(Math.round(taskData.recive_amount), language)}</Text>
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
                                      <Text style={styles.priceText}>{addCommaAndTranslateInPersian(Math.round(taskData.amount), language)}</Text>
                                    </View>
                                  </View>
                                  <View style={{ height: Normalize(77), width: "100%", marginBottom: Normalize(3) }} >
                                    <View style={{ flex: 1.3, backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center", flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                      <Text style={{ fontSize: Normalize(13), fontFamily: 'Outfit-Medium', color: Colors.white, marginHorizontal: Normalize(3) }} >{strings.TASKDETAILS.YOUPAID}</Text>
                                      <View style={{ flexDirection: "row" }} >
                                        <Text style={{ fontSize: Normalize(13), fontFamily: 'Outfit-Medium', color: Colors.white, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                        <Text style={{ fontSize: Normalize(13), fontFamily: 'Outfit-Medium', color: Colors.white }} >{numberWithCommas(Math.round(taskData.amount) + Math.round(taskData.booking_fees))}</Text>
                                      </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                        <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{strings.MAKEANOFFER.BOOKINGFEE}</Text>
                                      </View>
                                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: 'row' }} >
                                        <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                        <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{language == "en" ? numberWithCommas(Math.round(taskData.booking_fees)) : engToPersian(numberWithCommasinParsian(Math.round(taskData.booking_fees)))}</Text>
                                      </View>
                                    </View>
                                    {/* <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: Colors.greyText }} >{strings.TASKDETAILS.TASKERWILLRECEIVE}</Text>
                              </View>
                              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: language == "en" ? "row-reverse" : "row" }} >
                                <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: Colors.greyText, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                                <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: Colors.greyText }} >{language == "en" ? numberWithCommas(Math.round(taskData.amount)) : engToPersian(numberWithCommasinParsian(Math.round(taskData.amount)))}</Text>
                              </View>
                            </View> */}
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
                                        <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{language === "en" ? tierData.level : tierData.level_fa} {strings.MAKEANOFFER.SERVICEFEE}</Text>
                                      </View>
                                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                        <View style={{ flexDirection: 'row' }}>
                                          <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText, paddingHorizontal: Normalize(2) }} > {strings.BROWSEFILTER.TOMAN}</Text>
                                          <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: Colors.greyText }} >{addCommaAndTranslateInPersian((Math.round(taskData.amount - taskData.recive_amount)), language)}</Text>
                                        </View>
                                      </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                        <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: Colors.greyText }} >{strings.MAKEANOFFER.YOULLRECEIVE}</Text>
                                      </View>
                                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                        <View style={{ flexDirection: 'row' }}>
                                          <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: Colors.greyText, paddingHorizontal: Normalize(2) }} > {strings.BROWSEFILTER.TOMAN}</Text>
                                          <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Medium', color: Colors.greyText }} >{addCommaAndTranslateInPersian(Math.round(taskData.recive_amount), language)}</Text>
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
                    {
                      makingmoneyModal && <MakingMoneyModal ispress={makingmoneyModal} onPress={onPressMakeOffer} setProfileImageName={setProfileImageName} taskSlugname={taskData.slug} taskBudget={taskData.budget} />
                    }

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

                      taskData.get_tasker_increase_payment != null && taskData.get_tasker_increase_payment.tasker_id != userid &&
                      taskData.get_tasker_increase_payment.status == "I" &&
                      <View style={{ padding: Normalize(10), marginHorizontal: 15, marginTop: 15, flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "#fbedd5", borderRadius: 6 }} >
                        <Text style={{ fontSize: Normalize(13), fontFamily: 'Outfit-Medium', color: Colors.greyText, marginHorizontal: Normalize(3) }} >{strings.MAKEANOFFER.WAITINGFORINCREASE}</Text>
                        <View style={{ flexDirection: "row" }} >
                          <Text style={{ fontSize: Normalize(13), fontFamily: 'Outfit-Medium', color: Colors.greyText, marginHorizontal: Normalize(3) }} >{strings.BROWSEFILTER.TOMAN}</Text>
                          <Text style={{ fontSize: Normalize(13), fontFamily: 'Outfit-Medium', color: Colors.greyText }} >{addCommaAndTranslateInPersian(Math.round(taskData.get_tasker_increase_payment.amount), language)}</Text>
                        </View>
                      </View>
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
                                {increasepriceModal_tasker && <IncreasepriceModal_For_Tasker
                                  ispress={increasepriceModal_tasker}
                                  onPress={onpressincreasepriceModal_For_Tasker}
                                  taskSlugname={taskData.slug}
                                  posterName={nameShorting(taskData.get_user.fname + " " + taskData.get_user.lname)}
                                />}
                                {
                                  increasepriceModal_poster &&
                                  (taskData.status == 3 &&
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
                                    />)
                                }
                              </>
                        }
                        <View style={{ height: Normalize(40), width: "100%", marginTop: Normalize(10), flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-around" }} >
                          {
                            taskData.is_dispute == "Y"
                              ?
                              <View
                                style={{ height: "100%", width: "40%", backgroundColor: "#e7ebfb", justifyContent: "center", alignItems: "center", borderRadius: 50 }} >
                                <Text style={{ fontFamily: 'Outfit-SemiBold', fontSize: Normalize(12), color: "#bbc2dc", }}>
                                  {strings.TASKDETAILS.RELEASE}
                                </Text>
                              </View>
                              :
                              taskData.user_id == userid ?

                                taskData.get_tasker_increase_payment == null || taskData.get_tasker_increase_payment.status == "R" || taskData.get_tasker_increase_payment.status == "C" ?
                                  <>
                                    <TouchableOpacity
                                      onPress={releaseOnpress}
                                      style={{ height: "100%", width: "40%", backgroundColor: Colors.secondary, justifyContent: "center", alignItems: "center", borderRadius: 50 }} >
                                      <Text style={{ fontFamily: 'Outfit-SemiBold', fontSize: Normalize(12), color: Colors.white, }}>
                                        {/* {taskData.release_request_date == null ? strings.TASKDETAILS.RELEASE : "Tasker requested"} */}
                                        {taskData.release_request_date == null ? strings.TASKDETAILS.RELEASE : strings.TASKDETAILS.TASKERREQUEST}
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
                                  <>
                                    <TouchableOpacity
                                      onPress={() => {
                                        onpressreviewRequestModal()
                                      }}
                                      style={{ height: "100%", width: "40%", backgroundColor: Colors.secondary, justifyContent: "center", alignItems: "center", borderRadius: 50 }} >
                                      <Text style={{ fontFamily: 'Outfit-SemiBold', fontSize: Normalize(12), color: Colors.white, }}>
                                        {strings.TASKDETAILS.REVIEWREQUEST}
                                      </Text>
                                    </TouchableOpacity>
                                    {reviewRequestModal_poster &&
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
                                      />}
                                  </>
                                :
                                taskData.release_request_date == null ?
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
                            taskData.is_dispute == "N" ?
                              <TouchableOpacity
                                onPress={() => navigation.navigate("DisputesAdd", { slug: taskData.slug, id: taskData.id })}
                                style={{ height: "100%", width: "50%", backgroundColor: Colors.primary, borderRadius: 50, justifyContent: "center", alignItems: "center", }} >
                                <Text style={{ fontFamily: 'Outfit-SemiBold', fontSize: Normalize(12), color: Colors.white, }}>
                                  {strings.TASKDETAILS.RISEDISPUTE}
                                </Text>
                              </TouchableOpacity> :
                              <TouchableOpacity
                                onPress={() => navigation.navigate("DisputesDetails", { slug: taskData.slug, id: taskData.id })}
                                style={{ height: "100%", width: "50%", backgroundColor: Colors.primary, borderRadius: 50, justifyContent: "center", alignItems: "center", }} >
                                <Text style={{ fontFamily: 'Outfit-SemiBold', fontSize: Normalize(12), color: Colors.white, }}>
                                  {strings.TASKDETAILS.VIEWDISPUTE}
                                </Text>
                              </TouchableOpacity>
                          }
                        </View>

                      </View>
                    }
                    {
                      taskData.status == 2 && taskData.get_bid.length > 0 &&
                      isMyBid(taskData.get_bid) &&
                      <UpdateOfferModal ispress={updateOfferModal} onPress={onPressupdateOffer} taskSlugname={taskData.slug} taskOfferamount={myBidAmount(taskData.get_bid)} taskOfferId={myBidId(taskData.get_bid)} />
                    }
                    {/* **************review modal*********** */}

                    {reviewOfferModal &&
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
                    }



                    {reviewmodalforsingle && <ReviewOfferModalforSingle slug={taskData.slug} ispress={reviewmodalforsingle} setReviewmodalforsingle={setReviewmodalforsingle} onPress={onPressreviewforsingle} value={taskData.get_bid} id={singleProposalReplyID} taskSlugname={taskData.slug} taskData={taskData} setTaskData={setTaskData} getData={getData} show={show} userid={userid} />}


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
                                    </View>
                                    <Text>" {taskData.get_poster_review.description} "</Text>
                                  </View>
                                </View>
                              </>
                          }
                          {
                            taskData.get_tasker_review == null ?
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
                                // Alert.alert("Modal has been closed.");
                                setImageModal(!imageModal);
                              }}
                            >
                              <TouchableOpacity onPress={() => setImageModal(!imageModal)} style={{ flex: 1, backgroundColor: "rgba(52, 52, 52, 0.8)", padding: "8%" }}>
                                {imageUri &&
                                  <Image source={{ uri: `https://changicourt.com/eazypay/storage/app/public/images/task/${imageUri}` }} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                }
                              </TouchableOpacity>

                            </Modal>
                            <Text onPress={() => setImageToggle(!imageToggle)} style={{ padding: 15, fontSize: Normalize(13), fontFamily: 'Outfit-Regular', color: imageToggle ? Colors.secondary : Colors.primary, textAlign: language == "en" ? "left" : "right" }}>{imageToggle ? strings.POSTTASK.READLESS : strings.POSTTASK.READMORE}</Text>
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
                                  <Text style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: '#818181', lineHeight: Normalize(14) }}>{item.must_have}</Text>
                                </View>
                              ))
                            }
                          </View>
                        </> : null
                    }
                    {/* *************Other Jobs********** */}

                    {taskData.status == 2 && taskData.user_id != userid &&
                      (<View style={{ paddingVertical: Normalize(15), width: "99%", alignSelf: "center", }}>
                        <Text style={[styles.headingservice, { textAlign: language == "pr" ? "right" : "left" }]}>
                          {strings.TASKDETAILS.OTHEROPENJOBSBY}{`(${language == "en" ? othertaskData.length : engToPersian(othertaskData.length)})`}
                        </Text>
                        {othertaskData.length > 0 &&
                          <View style={[styles.elevtion_view, { padding: Normalize(5) }]} >

                            {
                              othertaskData.map((item, index) => (
                                index < otherJobNumber.count &&
                                <View
                                  key={index} style={{ paddingVertical: Normalize(3), width: "100%", flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                    <View style={{ height: 15, width: 15 }} >
                                      <Image source={images.bag} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                    </View>
                                  </View>
                                  <TouchableOpacity
                                    onPress={() => {
                                      navigation.push('TaskDetails', { show: item.slug })
                                    }}
                                    style={{ flex: 6, justifyContent: "center" }} >
                                    <Text
                                      numberOfLines={1}
                                      style={{
                                        fontSize: Normalize(12),
                                        fontFamily: 'Outfit-Medium', color: Colors.primary,
                                        textAlign: language == "en" ? "left" : "right"
                                      }}>{item.title}</Text>
                                  </TouchableOpacity>
                                  <View style={{ flex: 2.5, justifyContent: "center", alignItems: "center", flexDirection: 'row' }} >
                                    {
                                      item.budget <= 0 ?
                                        <Text
                                          numberOfLines={1}
                                          style={{
                                            fontSize: Normalize(11),
                                            fontFamily: "Outfit-Regular",
                                            color: Colors.green_new_2
                                          }}>Open Offer</Text>
                                        :
                                        <Text
                                          numberOfLines={1}
                                          style={{
                                            fontSize: Normalize(11),
                                            fontFamily: "Outfit-Regular",
                                            color: Colors.greyText
                                          }}>{strings.BROWSEFILTER.TOMAN} {numberWithCommas(item.budget)}</Text>
                                    }
                                  </View>
                                </View>
                              ))
                            }
                            {othertaskData.length > 5 && <Text onPress={() => setOtherJobNumber({ expand: !otherJobNumber.expand, count: otherJobNumber.expand == false ? othertaskData.length : 5 })}
                              style={{ fontSize: Normalize(13), fontFamily: 'Outfit-Medium', color: otherJobNumber.expand ? Colors.secondary : Colors.primary, textAlign: language == "en" ? "left" : "right", margin: Normalize(6) }}>{otherJobNumber.expand ? strings.POSTTASK.READLESS : strings.POSTTASK.READMORE}</Text>}
                          </View>}
                      </View>)
                    }
                    {/* ********************increase price ****************** */}
                    {(taskData.get_poster_all_increase_payment).length > 0 &&
                      <View>
                        <Text style={[styles.headingservice, { textAlign: leftOrRight(language), paddingHorizontal: 15 }]}>{strings.TASKDETAILS.INCREASEBYPOSTER}</Text>
                        <View style={{ marginHorizontal: 15 }} >
                          {
                            (taskData.get_poster_all_increase_payment).map((item, index) => (
                              <View key={index} style={{ flexDirection: rowOrRowreverse(language), alignItems: "center" }} >
                                <View style={{ flex: 1, paddingHorizontal: "2%", justifyContent: "center" }} >
                                  <Text numberOfLines={2} style={[styles.textfurniture, { textAlign: leftOrRight(language) }]} >{item.description}{item.requested_by != "P" && `${"\n"} ${strings.TASKDETAILS.REQUESTBYTASKER}`}</Text>
                                </View>
                                <Text style={[styles.textfurniture, { textAlign: leftOrRight(language) }]}>{strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian(Math.round(item.amount), language)}</Text>
                              </View>
                            ))
                          }
                        </View>
                      </View>
                    }
                    {/* ************************* proposal or assign *******************/}
                    <View style={{ paddingVertical: Normalize(15), width: "99%", alignSelf: "center", }}>
                      <Text style={[styles.headingservice, { textAlign: language == "pr" ? "right" : "left" }]}>
                        {/* {taskData.get_all_bid == undefined ? strings.TASKDETAILS.PROPOSAL : strings.TASKDETAILS.ASSIGNEE}  ( {taskData.get_all_bid == undefined ?addCommaAndTranslateInPersian(taskData.tot_bids,language) : addCommaAndTranslateInPersian(taskData.get_bid.length,language)} )</Text> */}
                        {taskData.get_all_bid == undefined ? strings.TASKDETAILS.PROPOSAL : strings.TASKDETAILS.ASSIGNEE}</Text>
                    </View>
                    {(taskData.get_bid).length > 0 &&
                      <View style={[styles.elevtion_view, { width: "99%", alignSelf: "center", }]} >
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
                                    onPress={() => {
                                      setSingleProposalReplyID(item.id)
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


                              {paymentRequired &&

                                (item.id == itemId &&
                                  <AcceptOfferinProposal
                                    ispress={paymentRequired}
                                    onPress={onPresspaymentRequired}
                                    name={nameShorting(item.get_user.fname + " " + item.get_user.lname)}
                                    imageName={item.get_user.profile_picture}
                                    taskTitle={taskData.title}
                                    bid_id={item.id}
                                    taskSlugname={taskData.slug}
                                  />)

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


                    <View style={{ paddingVertical: Normalize(15), width: "99%", alignSelf: "center", }}>
                      <Text style={[styles.headingservice, { marginTop: 20, textAlign: language == "pr" ? "right" : "left" }]}>
                        {strings.TASKDETAILS.QUESTION} ( {`${allquestion.length}`} )  </Text>
                    </View>
                    {
                      taskData.get_all_bid == undefined &&
                      <View>
                        <Text style={[styles.textcategory22, { paddingHorizontal: 15, }]}>{strings.TASKDETAILS.PLEASEDONTSHARE}</Text>
                        <View style={{}}>
                          <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", paddingVertical: Normalize(12) }}>
                            <View style={{ height: Normalize(41), width: Normalize(41), borderRadius: Normalize(41) / 2, overflow: "hidden", marginHorizontal: Normalize(5), backgroundColor: "#f5f5f5" }}>
                              <Image
                                resizeMode="contain"
                                source={{ uri: profileImageName ? ImageLink.ProfilePhoto + `${profileImageName}` : ImageLink.BlankProfileImage }}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  resizeMode: "cover",
                                }}
                              />
                            </View>
                            <View style={{
                              width: '80%',
                              height: Normalize(110),
                              alignSelf: 'center',
                              borderColor: Colors.lightGrey,
                              borderRadius: Normalize(8),
                              borderWidth: Normalize(.9),
                              // justifyContent: "space-between"
                            }}>
                              <View style={{ flex: 1, paddingHorizontal: Normalize(12) }} >
                                <TextInput
                                  value={mainquestionMessage}
                                  onChangeText={(e) => setmainquestionMessage(e)}
                                  multiline
                                  placeholder={strings.TASKDETAILS.ASKAQUESTION}
                                  style={globalstyles.multiline_only_text}
                                  onSubmitEditing={() => { Keyboard.dismiss() }} />
                              </View>

                              <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", padding: Normalize(4) }} >
                                {
                                  mainquestionSelectedImage.fileName ?
                                    <TouchableOpacity
                                      activeOpacity={0.8}
                                      onPress={() => {
                                        setMainquestionSelectedImage("")
                                      }}
                                      style={{ flex: 1, backgroundColor: Colors.primary, marginRight: language == "en" ? Normalize(50) : null, marginLeft: language == "en" ? null : Normalize(50), borderRadius: 4, paddingHorizontal: Normalize(10), flexDirection: "row", alignItems: "center" }} >
                                      <Text numberOfLines={1} style={{ color: Colors.white }} >{mainquestionSelectedImage.fileName}</Text>
                                      <Image source={images.cross} style={{ height: Normalize(10), width: Normalize(10), resizeMode: "cover" }} />
                                    </TouchableOpacity>
                                    : <View style={{ flex: 1 }} />
                                }
                                {mainquestionSelectedImage.fileName == undefined &&
                                  <TouchableOpacity
                                    onPress={onpressattechButton_mainQuestion}
                                    style={{ width: Normalize(18), height: Normalize(18) }}>
                                    <Image
                                      resizeMode="contain"
                                      source={images.clip}
                                      style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                                    />
                                  </TouchableOpacity>
                                }
                                {fromWhereModal_mainQuestion && <ChoosefromWhereModal_mainQuestion />}
                              </View>
                            </View>
                          </View>
                          <View style={{ marginLeft: '22%', marginRight: "22%", alignItems: language == "pr" ? "flex-end" : "flex-start" }}>
                            <TouchableOpacity
                              disabled={questionButtonLoader.loader == true ? true : false}
                              onPress={() => messageSendButtonforMainQuestion(0)}
                              style={{ height: Normalize(28), width: Normalize(67), backgroundColor: Colors.secondary, borderRadius: Normalize(5), justifyContent: "center", alignItems: "center" }}>
                              {
                                questionButtonLoader.reply == false && questionButtonLoader.loader == true ?
                                  <View style={{ height: Normalize(13), width: Normalize(13), justifyContent: "center", alignItems: "center" }} >
                                    <ActivityIndicator
                                      size="small"
                                      color={Colors.white}
                                    />
                                  </View>
                                  : <Text style={{ color: '#ffffff', fontFamily: 'Outfit-Medium', fontSize: Normalize(13) }}>
                                    {strings.TASKDETAILS.SEND}
                                  </Text>
                              }
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={{ height: Normalize(10) }} />
                      </View>
                    }

                    {/* **************Question Show************** */}
                    {
                      allquestion.length > 0 &&
                      <View style={[styles.elevtion_view, { paddingVertical: Normalize(15), width: "99%", alignSelf: "center", }]} >
                        {
                          allquestion.map((item, index) => (
                            <View key={index} style={{
                              flexDirection: 'column', marginRight: 20,
                              paddingVertical: Normalize(25), paddingHorizontal: 15, width: '100%', borderBottomColor: Colors.lightGrey, borderBottomWidth: index + 1 == allquestion.length ? 0 : 0.2
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
                                            color: Colors.primary, marginLeft: 2, fontFamily: 'Outfit-SemiBold',
                                            fontSize: Normalize(12)
                                          }}>{nameShorting(item.get_user.fname + " " + item.get_user.lname)}</Text>
                                        {
                                          item.get_user.slug == taskData.get_user.slug &&
                                          <View style={{ paddingVertical: Normalize(1.5), paddingHorizontal: Normalize(2), backgroundColor: Colors.primary, marginHorizontal: Normalize(2), borderRadius: 15, justifyContent: "center", alignItems: "center" }} >
                                            <Text style={{
                                              color: Colors.white, fontFamily: 'Outfit-SemiBold',
                                              fontSize: Normalize(6)
                                            }}>{strings.MAKEANOFFER.POSTER}</Text>
                                          </View>
                                        }
                                      </View>
                                    </View>
                                    <View style={{ flexDirection: language == "en" ? "row" : 'row-reverse', alignItems: "center" }}>
                                      {/* <Image
                                    style={{ width: Normalize(10), height: Normalize(10), opacity: .8, resizeMode: "contain", marginHorizontal: Normalize(2.5) }}
                                    source={images.clockIcon}
                                    resizeMode="contain" /> */}
                                      <Text numberOfLines={1} style={{
                                        color: Colors.secondary, fontFamily: 'Outfit-Medium', fontSize: Normalize(10), opacity: 0.9,
                                        alignSelf: 'center',
                                      }}>{language == "en" ?
                                        questionEnglishTimeShow(item.created_at) : questionPersianTimeShow(item.created_at)
                                        }</Text>
                                    </View>
                                    <Text
                                      numberOfLines={questionLength.id == item.id && questionLength.expand ? 1000 : 3}
                                      style={{
                                        color: '#818181', fontFamily: 'Outfit-Regular',
                                        fontSize: Normalize(9), textAlign: language == "en" ? "left" : "right", marginTop: Normalize(2), lineHeight: Normalize(12),
                                      }}>{item.message}</Text>
                                    {(item.message).length > 150 &&
                                      <Text onPress={() => questionReadMore(item.id)}
                                        style={{
                                          fontSize: Normalize(11),
                                          fontFamily: 'Outfit-Regular',
                                          color: questionLength.id == item.id && questionLength.expand ? Colors.secondary : Colors.primary,
                                          textAlign: language == "en" ? "left" : "right", marginVertical: "2%"
                                        }}>
                                        {questionLength.id == item.id && questionLength.expand ? strings.POSTTASK.READLESS : strings.POSTTASK.READMORE}
                                      </Text>}
                                    <View style={{ width: "100%", marginTop: Normalize(3), alignItems: language == "en" ? "flex-start" : "flex-end" }} >
                                      {
                                        item.filename &&
                                        <>
                                          <TouchableOpacity
                                            onPress={() => {
                                              setQuestionFileName(item.filename)
                                              setQuestionImage(!questionImage)
                                            }}
                                            activeOpacity={1} style={{ height: Normalize(60), width: Normalize(100), backgroundColor: "#f5f5f5", borderRadius: 4, overflow: "hidden" }} >
                                            <Image
                                              source={{ uri: ImageLink.Question + `${item.filename}` }}
                                              style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                            />
                                          </TouchableOpacity>
                                          {/* {questionImage && <ImageModal Onpress={imageOnpress} filename={questionFileName} questionImage={questionImage}  test="+++++" />} */}
                                        </>
                                      }
                                    </View>
                                  </View>
                                </View>
                              </View>
                              <View style={{ width: "100%", alignItems: language == "en" ? "flex-start" : "flex-end" }} >
                                {/* **************Subquestion section************** */}
                                {
                                  taskData.get_all_bid == undefined &&
                                  (item.get_child.length == 0) &&
                                  <TouchableOpacity
                                    onPress={() => replyButton(item.id)}
                                    // onPress={() => console.log(item.id)}
                                    style={{ height: Normalize(15), width: Normalize(50), flexDirection: language == "pr" ? "row-reverse" : "row", alignItems: "center", marginTop: "2%", marginHorizontal: Normalize(50) }}>

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
                                {
                                  questionId && questionId == item.id && replyToggle && item.get_child.length == 0 &&
                                  <View style={{}}>
                                    <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", paddingVertical: Normalize(12) }}>
                                      <View style={{ height: Normalize(41), width: Normalize(41), borderRadius: Normalize(41) / 2, overflow: "hidden", marginHorizontal: Normalize(5), backgroundColor: "#f5f5f5" }}>
                                        <Image
                                          resizeMode="contain"
                                          source={{ uri: profileImageName ? ImageLink.ProfilePhoto + `${profileImageName}` : ImageLink.BlankProfileImage }}
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                            resizeMode: "cover",
                                          }}
                                        />
                                      </View>
                                      <View style={{
                                        width: '80%',
                                        height: Normalize(101),
                                        alignSelf: 'center',
                                        borderColor: Colors.greylightText,
                                        borderRadius: Normalize(8),
                                        borderWidth: .5,
                                        justifyContent: "space-between"
                                      }}>
                                        <View style={{ flex: 1, paddingHorizontal: Normalize(12) }} >
                                          <TextInput
                                            value={questionMessage}
                                            onChangeText={(e) => setQuestionMessage(e)}
                                            multiline
                                            placeholder={strings.TASKDETAILS.TYPEYOURANS}
                                            style={globalstyles.multiline_only_text}
                                            onSubmitEditing={() => { Keyboard.dismiss() }}
                                          />
                                        </View>
                                        <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", padding: Normalize(4) }} >
                                          {
                                            questionSelectedImage.fileName ?
                                              <TouchableOpacity
                                                activeOpacity={0.8}
                                                onPress={() => {
                                                  setQuestionSelectedImage("")
                                                }}
                                                style={{ flex: 1, backgroundColor: Colors.primary, marginRight: language == "en" ? Normalize(50) : null, marginLeft: language == "en" ? null : Normalize(50), borderRadius: 4, paddingHorizontal: Normalize(10), flexDirection: "row", alignItems: "center" }} >
                                                <Text numberOfLines={1} style={{ color: Colors.white }} >{questionSelectedImage.fileName}</Text>
                                                <Image source={images.cross} style={{ height: Normalize(10), width: Normalize(10), resizeMode: "cover" }} />
                                              </TouchableOpacity>
                                              : <View style={{ flex: 1 }} />
                                          }
                                          {questionSelectedImage.fileName == undefined &&
                                            <TouchableOpacity
                                              onPress={onpressattechButton_replyQuestion}
                                              style={{ width: Normalize(18), height: Normalize(18) }}>
                                              <Image
                                                resizeMode="contain"
                                                source={images.clip}
                                                style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                                              />
                                            </TouchableOpacity>}
                                        </View>
                                      </View>
                                    </View>
                                    <View style={{ marginLeft: '22%', marginRight: "22%", alignItems: language == "pr" ? "flex-end" : "flex-start" }}>
                                      <TouchableOpacity
                                        disabled={questionButtonLoader.loader == true ? true : false}
                                        onPress={() => messageSendButton(item.id)}
                                        style={{ height: Normalize(28), width: Normalize(67), backgroundColor: Colors.secondary, borderRadius: Normalize(5), justifyContent: "center", alignItems: "center" }}>
                                        {
                                          questionButtonLoader.reply == true && questionButtonLoader.loader == true ?
                                            <View style={{ height: Normalize(13), width: Normalize(13), justifyContent: "center", alignItems: "center" }} >
                                              <ActivityIndicator
                                                size="small"
                                                color={Colors.white}
                                              />
                                            </View>
                                            : <Text style={{ color: '#ffffff', fontFamily: 'Outfit-Medium', fontSize: Normalize(13) }}>
                                              {strings.TASKDETAILS.SEND}
                                            </Text>
                                        }
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                }
                              </View>
                              {
                                item.get_child.map((childItem, childIndex) => (
                                  <View key={childIndex}  >
                                    <View style={{ paddingVertical: Normalize(10), flexDirection: language == "en" ? 'row' : "row-reverse", marginLeft: Normalize(50), paddingRight: Normalize(10) }}>
                                      <View style={{ flex: 1, alignItems: "center" }}>
                                        <View style={{ height: Normalize(33), width: Normalize(33), borderRadius: Normalize(33) / 2, backgroundColor: "#f5f5f5", overflow: "hidden" }}>
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
                                          <View style={{}}>
                                            <Text numberOfLines={1} style={{
                                              color: Colors.secondary, fontFamily: 'Outfit-Medium', fontSize: Normalize(10), textAlign: language == "en" ? "left" : "right", opacity: 0.9
                                            }}>
                                              {language == "en" ?
                                                questionEnglishTimeShow(childItem.created_at) : questionPersianTimeShow(childItem.created_at)
                                              }
                                            </Text>
                                          </View>
                                          <Text
                                            numberOfLines={replyLength.id == childItem.id && replyLength.expand ? 1000 : 3}
                                            style={{
                                              color: '#818181', fontFamily: 'Outfit-Regular', lineHeight: Normalize(13), marginTop: Normalize(2),
                                              fontSize: Normalize(10), textAlign: language == "en" ? "left" : "right"
                                            }}>{childItem.message}</Text>
                                          {(childItem.message).length > 120 &&
                                            <Text
                                              onPress={() => {

                                                replyReadMore(childItem.id)
                                              }}

                                              style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: replyLength.id == childItem.id && replyLength.expand ? Colors.secondary : Colors.primary, textAlign: language == "en" ? "left" : "right", marginVertical: "2%" }}>{replyLength.id == childItem.id && replyLength.expand ? strings.POSTTASK.READLESS : strings.POSTTASK.READMORE}</Text>}
                                          <View style={{ width: "100%", marginTop: Normalize(3), alignItems: language == "en" ? "flex-start" : "flex-end" }} >
                                            {
                                              childItem.filename &&
                                              <>
                                                <TouchableOpacity
                                                  onPress={() => {
                                                    // console.log("............",childItem.filename)
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
                                          </View>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: "flex-end", alignItems: language == "pr" ? "flex-end" : null }}>
                                          {taskData.get_all_bid == undefined &&
                                            (item.get_child.length == (childIndex + 1)) &&
                                            <TouchableOpacity
                                              onPress={() => replyButton(item.id)}
                                              // onPress={() => console.log(item.id)}
                                              style={{ height: Normalize(15), width: Normalize(50), flexDirection: language == "pr" ? "row-reverse" : "row", alignItems: "center", marginTop: "2%" }}>
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
                                    {
                                      questionId && questionId == item.id && replyToggle && item.get_child.length > 0 && item.get_child.length == (childIndex + 1) &&
                                      <View style={{}}>
                                        <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", paddingVertical: Normalize(12) }}>
                                          <View style={{ height: Normalize(41), width: Normalize(41), borderRadius: Normalize(41) / 2, overflow: "hidden", marginHorizontal: Normalize(5), backgroundColor: "#f5f5f5" }}>
                                            <Image
                                              resizeMode="contain"
                                              source={{ uri: profileImageName ? ImageLink.ProfilePhoto + `${profileImageName}` : ImageLink.BlankProfileImage }}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                resizeMode: "cover",
                                              }}
                                            />
                                          </View>
                                          <View style={{
                                            width: '80%',
                                            height: Normalize(101),
                                            alignSelf: 'center',
                                            borderColor: Colors.grey,
                                            borderRadius: Normalize(8),
                                            borderWidth: .5,
                                            justifyContent: "space-between"
                                          }}>
                                            <View style={{ flex: 1, paddingHorizontal: Normalize(12) }} >
                                              <TextInput
                                                value={questionMessage}
                                                onChangeText={(e) => setQuestionMessage(e)}
                                                multiline
                                                placeholder={strings.TASKDETAILS.TYPEYOURANS}
                                                style={globalstyles.multiline_only_text}
                                                onSubmitEditing={() => { Keyboard.dismiss() }}
                                              />
                                            </View>
                                            <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", padding: Normalize(4) }} >
                                              {
                                                questionSelectedImage.fileName ?
                                                  <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    onPress={() => {
                                                      setQuestionSelectedImage("")
                                                    }}
                                                    style={{ flex: 1, backgroundColor: Colors.primary, marginRight: language == "en" ? Normalize(50) : null, marginLeft: language == "en" ? null : Normalize(50), borderRadius: 4, paddingHorizontal: Normalize(10), flexDirection: "row", alignItems: "center" }} >
                                                    <Text numberOfLines={1} style={{ color: Colors.white }} >{questionSelectedImage.fileName}</Text>
                                                    <Image source={images.cross} style={{ height: Normalize(10), width: Normalize(10), resizeMode: "cover" }} />
                                                  </TouchableOpacity>
                                                  : <View style={{ flex: 1 }} />
                                              }
                                              {questionSelectedImage.fileName == undefined &&
                                                <TouchableOpacity
                                                  onPress={onpressattechButton_replyQuestion}
                                                  style={{ width: Normalize(18), height: Normalize(18) }}>
                                                  <Image
                                                    resizeMode="contain"
                                                    source={images.clip}
                                                    style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                                                  />
                                                </TouchableOpacity>}
                                            </View>
                                          </View>
                                        </View>
                                        <View style={{ marginLeft: '22%', marginRight: "22%", alignItems: language == "pr" ? "flex-end" : "flex-start" }}>
                                          <TouchableOpacity
                                            disabled={questionButtonLoader.loader == true ? true : false}
                                            onPress={() => messageSendButton(item.id)}
                                            style={{ height: Normalize(28), width: Normalize(67), backgroundColor: Colors.secondary, borderRadius: Normalize(5), justifyContent: "center", alignItems: "center" }}>
                                            {
                                              questionButtonLoader.reply == true && questionButtonLoader.loader == true ?
                                                <View style={{ height: Normalize(13), width: Normalize(13), justifyContent: "center", alignItems: "center" }} >
                                                  <ActivityIndicator
                                                    size="small"
                                                    color={Colors.white}
                                                  />
                                                </View>
                                                : <Text style={{ color: '#ffffff', fontFamily: 'Outfit-Medium', fontSize: Normalize(13) }}>
                                                  {strings.TASKDETAILS.SEND}
                                                </Text>
                                            }
                                          </TouchableOpacity>
                                        </View>
                                      </View>
                                    }
                                  </View>
                                ))
                              }
                            </View>
                          ))
                        }
                      </View>}
                    {questionImage && <ImageModal Onpress={imageOnpress} filename={questionFileName} questionImage={questionImage} />}
                    <View style={{ height: Normalize(30) }} />
                    {fromWhereModal_replyQuestion && <ChoosefromWhereModal_replyQuestion />}
                  </View>
                </ScrollView>
              </View>
            </CurveDesing_Component>
          </KeyboardAvoidingView>
        </SafeAreaView>
      }
    </>
  );
}
export default withRtl(TaskDetails);