import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
  Platform,
  Linking,
  StyleSheet
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Header from '../../../../components/Header';
import { withRtl } from 'react-native-easy-localization-and-rtl';
import strings from './../../../../constants/lng/LocalizedStrings';
import { Colors } from '../../../../constants/colors';
import Button from './../../../../components/Button';
import { myContext } from '../../../../constants/ContextApi';
import moment from 'moment';
import axiosInstance from '../../../../constants/AxiosCallPage';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import PostTask_header_button from '../../../../components/PostTask_header_button';
import MapView, { Marker } from 'react-native-maps';
import { ImageLink } from '../../../../constants/LinkPage';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { androidCameraPermission } from '../../../../constants/permissions/Permissions';
import TwoHorizantalLine from '../../../../components/TwoHorizantalLine';
import NewLoaderPage from '../../../../components/NewLoaderPage';
import { fontfmliy } from '../../../../components/WhichFontFamily';
const EditTaskDetails = ({ navigation, route }) => {
  const mainscrollRef = useRef();
  const scrollRef = useRef();
  const scrollToEnd = () => scrollRef.current.scrollToEnd({ animated: true });
  const {
    id,
    setId,
    category_id,
    setCategory_id,
    subcategory_id,
    setSubcategory_id,
    title,
    setTitle,
    description,
    setDescription,
    type,
    setType,
    setTime,
    setDate,
    setBudget_type,
    setBudget,
    setHourly_rate,
    setNumber_of_hour,
    location,
    setLocation,
    lat,
    setLat,
    lng,
    setLng,
    setApiImages,
    apiImages,
    setM2,
    setD2,
    setEngShowDate,
    editOrpostsimilar,
    setViewTime,
    setIsopenOffer,
    setDate_type,
    setCategory_image,
    category_image,

    must_have_New,
    setMust_have_New,
    imageFinalArray,
    setImageFinalArray,
    setImage,
    taskCatagoryName, setTaskCatagoryName,
    taskDetailsTitle, setTaskDetailsTitle,
    setGetSimililarTaskId,
  } = useContext(myContext);
  const { slug_name } = route.params;
  const [loader, setLoader] = useState(false);
  const [titleIsFocused, setTitleIsFocused] = useState(false);
  const [aboutIsFocused, setAboutIsFocused] = useState(false);
  const [mustHaveIsFocused, setmustHaveIsFocused] = useState(false);
  const [fromWhereModal, setFromWhereModal] = useState(false);
  const editTask = async () => {
    try {
      setLoader(true);
      const editData = slug_name;
      var finalDate = '';
      var apiDate = editData.date;

      let apiImages_temp = []

      setApiImages([])
      setId(editData.id);
      // console.log(editData.date_type)
      if (editData.date_type != null) {
        setDate_type(editData.date_type);
        if (editData.date_type == "B") {
          setDate('');
          setEngShowDate('');
          setM2('');
          setD2('');
        } else {
          if (apiDate != null) {
            var parts = apiDate.split('-');
            finalDate = parts[2] + '-' + parts[1] + '-' + parts[0];
            setDate(finalDate);
            var parts = apiDate.split('-');
            const mydate = new Date(parts[0], parts[1] - 1, parts[2]);
            const date = mydate.toDateString();
            const tarik = date.split(' ');
            const date2 = tarik[2] + ' ' + tarik[1] + ' ' + ',' + ' ' + tarik[3];
            setEngShowDate(date2);
            setM2(tarik[1]);
            setD2(tarik[2]);
          }
          // console.log("time", editData.time)
          if (editData.time != null) {
            const splitTime = editData.time.split(':');
            setViewTime(moment(`2012-11-12 ${editData.time}`).format('hh:mm a'));
            setTime(splitTime[0] + ':' + splitTime[1] + ':' + splitTime[2]);
          }
        }
      }
      setCategory_id(editData.category_id);
      setTitle(editData.title);
      setDescription(editData.description);
      setTaskCatagoryName(editData.get_category.name);
      setTaskDetailsTitle(editData.get_category.category_placeholder);
      setType(editData.type);

      // console.log(">>>>>>>>>>>>>>>>", editData);

      setCategory_image(editData.get_category.image)

      if (editData.budget == 0) {
        setIsopenOffer(true);
        setBudget_type("");
      } else {
        setIsopenOffer(false);
        setBudget_type(editData.budget_type);
      }
      { editData.budget > 0 && setBudget(editData.budget); }
      { Math.round(editData.hourly_rate) > 0 && setHourly_rate((Math.round(editData.hourly_rate)).toString()); }
      { editData.number_of_hour > 0 && setNumber_of_hour(editData.number_of_hour); }
      if (
        editData.location != null ||
        editData.lat != null ||
        editData.lng != null
      ) {
        setLocation(editData.location);
        setLat(editData.lat);
        setLng(editData.lng);
      }
      { editData.must_have != null && setMust_have_New(editData.must_have) }

      {
        editData.get_images.length != 0 &&
          editData.get_images.map(item => {
            apiImages_temp.push(item);
          });
      }
      setApiImages(apiImages_temp)

      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log('editTask_error', error);
    }
  };
  const similarTask = async () => {
    try {
      setLoader(true);
      let apiImages_temp_S = []
      const similarPostData = slug_name;
      // console.log('..................................................');

      var finalDate = '';
      var apiDate = similarPostData.date;
      setId('');
      setGetSimililarTaskId(similarPostData.id)
      setApiImages([])

      if (similarPostData.date_type != null) {
        setDate_type(similarPostData.date_type);
        if (similarPostData.date_type == "B") {
          setDate('');
          setEngShowDate('');
          setM2('');
          setD2('');
        } else {
          if (apiDate != null) {
            var parts = apiDate.split('-');
            finalDate = parts[2] + '-' + parts[1] + '-' + parts[0];
            setDate(finalDate);
            const mydate = new Date(parts[0], parts[1] - 1, parts[2]);
            const date = mydate.toDateString();
            const tarik = date.split(' ');
            const date2 = tarik[2] + ' ' + tarik[1] + ' ' + ',' + ' ' + tarik[3];
            setEngShowDate(date2);
            setM2(tarik[1]);
            setD2(tarik[2]);
          }
          if (similarPostData.time != null) {
            const splitTime = similarPostData.time.split(':');
            setViewTime(
              moment(`2012-11-12 ${similarPostData.time}`).format('hh:mm a'),
            );
            setTime(splitTime[0] + ':' + splitTime[1] + ':' + splitTime[2]);
          }
        }
      }



      { similarPostData.must_have != null && setMust_have_New(similarPostData.must_have) }
      setCategory_id(similarPostData.category_id);
      setCategory_image(similarPostData.get_category.image)
      setSubcategory_id(similarPostData.subcategory_id);
      setTitle(similarPostData.title);
      setDescription(similarPostData.description);
      setTaskCatagoryName(similarPostData.get_category.name);
      setTaskDetailsTitle(similarPostData.get_category.category_placeholder);
      setType(similarPostData.type);

      { similarPostData.budget > 0 && setBudget(similarPostData.budget) }
      { Math.round(similarPostData.hourly_rate) > 0 && setHourly_rate(Math.round(similarPostData.hourly_rate)); }
      { similarPostData.number_of_hour > 0 && setNumber_of_hour(similarPostData.number_of_hour); }

      if (similarPostData.budget == 0) {
        setIsopenOffer(true);
        setBudget_type("");
      } else {
        setIsopenOffer(false);
        setBudget_type(similarPostData.budget_type);
      }

      if (similarPostData.location != null && similarPostData.lat != null && similarPostData.lng != null) {
        setLocation(similarPostData.location);
        setLat(similarPostData.lat);
        setLng(similarPostData.lng);
      }
      {
        similarPostData.get_images.length != 0 &&
          similarPostData.get_images.map(item => {
            apiImages_temp_S.push(item);
          });
      }
      setApiImages(apiImages_temp_S)
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log('similarTask_error', error);
    }
  };
  const scrollToTop = () => {
    mainscrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }
  const runEditTaskDetails = () => {
    scrollToTop()
    if (editOrpostsimilar == 'edit') {
      editTask();
    } else {
      similarTask();
    }
  }
  useEffect(() => {
    runEditTaskDetails();
  }, [slug_name]);
  const nextButton = () => {

    if (title.length != 0) {
      if (title.trim('').length >= 10) {
        if (title.length > 100) {
          Toast.show('Title no more than 100 characters');
        } else {
          if (description.length != 0) {
            if (description.trim('').length >= 25) {
              if (location.length != 0 && lat != '' && lng != '') {
                if (category_id != "" && taskCatagoryName.length != 0) {
                  navigation.navigate('EditTaskplace');
                } else {
                  Toast.show(strings.POSTTASK.ENTERCATAGORY);
                }
              } else {
                Toast.show(strings.POSTTASK.SELECTLOCATION);
              }
            } else {
              Toast.show(strings.POSTTASK.DESCRIPTION25CHAR);
            }
          } else {
            Toast.show(strings.POSTTASK.ENTERDESCRIPTION);
          }
        }
      } else {
        Toast.show(strings.POSTTASK.TITLE10CHAR);
      }
    } else {
      Toast.show(strings.POSTTASK.ENTERTITLE);
    }
  };
  const TwoButton = () => {
    return (
      <View style={[styles.twoButton_totalview]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setType('P');
          }}
          style={[
            styles.twoButton_view,
            {
              // borderWidth: type == 'P' ? 0 : 0.8,
              backgroundColor: type == 'P' ? Colors.secondary : Colors.grayf5,
            },
          ]}>
          {type == 'P' && (
            <View
              style={{
                height: Normalize(15),
                width: Normalize(15),
                marginRight: Normalize(2),
              }}>
              <Image
                source={images.plan_white_tick}
                style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
              />
            </View>
          )}
          <Text
            style={[
              styles.O_P_Buttontext,
              { color: type == 'P' ? Colors.white : Colors.greyText },
            ]}>
            {strings.POSTTASK.INPERSON}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setType('O');
          }}
          style={[
            styles.twoButton_view,
            {
              backgroundColor: type == 'O' ? Colors.secondary : Colors.grayf5,
            },
          ]}>
          {type == 'O' && (
            <View
              style={{
                height: Normalize(15),
                width: Normalize(15),
                marginRight: Normalize(2),
              }}>
              <Image
                source={images.plan_white_tick}
                style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
              />
            </View>
          )}
          <Text
            style={[
              styles.O_P_Buttontext,
              { color: type == 'O' ? Colors.white : Colors.greyText },
            ]}>
            {strings.POSTTASK.ONLINE}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const ChoosefromWhereModal = () => {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={fromWhereModal}
        onRequestClose={() => {
          onpressUploadButton();
        }}>
        <View style={{ flex: 1 }}>
          <Pressable
            onPressIn={onpressUploadButton}
            style={{
              flex: 3,
              backgroundColor: 'rgba(52,52,52,0.5)',
            }}></Pressable>
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.white,
              padding: Normalize(15),
            }}>
            <Text
              style={[
                globalstyles.plantext_Outfit_Medium,
                {
                  color: Colors.primary,
                  fontSize: Normalize(16),
                  textAlign: 'center',
                },
              ]}>
              Select images from
            </Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Pressable
                  onPressIn={iscameraPermission}
                  style={styles.galleryorcamera_icon}>
                  <FontAwesome5
                    name="camera"
                    size={Normalize(30)}
                    color={Colors.primary}
                  />
                </Pressable>
                <Text
                  style={[
                    globalstyles.plantext_Outfit_Medium,
                    { color: Colors.primary },
                  ]}>
                  Camera
                </Text>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Pressable
                  onPressIn={imageSelect_by_gallery}
                  style={styles.galleryorcamera_icon}>
                  <FontAwesome5
                    name="images"
                    size={Normalize(30)}
                    color={Colors.primary}
                  />
                </Pressable>
                <Text
                  style={[
                    globalstyles.plantext_Outfit_Medium,
                    { color: Colors.primary },
                  ]}>
                  Gallery
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const imageSelect_by_gallery = () => {
    onpressUploadButton();
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 15 }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        profileImage(response.assets);
        imageArray(response.assets);
        scrollToEnd()
      }
    });

  };
  const onpressUploadButton = () => {
    setFromWhereModal(!fromWhereModal);
  };
  const iscameraPermission = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      imageSelect_by_camera();
    } else {
      if (Platform.OS === 'ios') {
        Toast.show('Please give camera permission');
      } else {
        Linking.openSettings();
      }
    }
  };
  const imageSelect_by_camera = () => {
    if (Platform.OS == 'android') {
      onpressUploadButton();
    }
    launchCamera({ mediaType: 'photo', quality: 0.7 }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        if (response.assets) {
          if (Platform.OS == 'ios') {
            onpressUploadButton();
          }
          profileImage(response.assets);
          imageArray(response.assets);
          scrollToEnd()
        } else {
          if (Platform.OS === 'ios') {
            Toast.show('Please give camera permission');
          }
          // else {
          //   Toast.show("Please give camera permission")
          //   Linking.openSettings();
          // }
        }
      }
    });
  };
  const imageArray = async val => {
    if (val != undefined) {
      let array = imageFinalArray;
      val.map(item => {
        array.push(item);
      });
      setImageFinalArray(array);
      profileImage(array);
    } else {
      Toast.show('Please give camera permission');
    }
  };
  const deleteImage = async val => {
    let array = imageFinalArray;
    let newArr = [];
    if (editOrpostsimilar == "edit") {
      if (val.image == undefined) {
        // console.log(val)
        newArr = array.filter(item => item.fileName != val.fileName);
        // Toast.show(strings.POSTTASK.DELETETASKIMAGE);
        setImageFinalArray(newArr);
        profileImage(newArr);
        scrollToEnd();
      } else {
        deletePreviousImage(val.id)
      }
    } else {
      if (val.image == undefined) {
        // console.log(val)
        newArr = array.filter(item => item.fileName != val.fileName);
        // Toast.show(strings.POSTTASK.DELETETASKIMAGE);
        setImageFinalArray(newArr);
        profileImage(newArr);
        scrollToEnd();
      } else {


        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",val)

        let s = apiImages;
        let new_s = [];
        s.map((item, index) => {
          if (item.id != val.id) {
            new_s.push(item)
          }
        })
        setApiImages(new_s)
      }
    }



  };
  const deletePreviousImage = async (val) => {
    try {
      let data = {
        "params": {
          "id": val
        }
      }
      let res = await axiosInstance.post('delete-task-image', data);
      if (res.data.result) {
        Toast.show(res.data.result.status.meaning)

        let a = apiImages;
        let new_a = [];
        a.map((item, index) => {
          if (item.id != val) {
            new_a.push(item)
          }
        })
        setApiImages(new_a)
      } else {
        Toast.show(res.data.error.meaning)
      }




    } catch (error) {
      console.log("deletePreviousImage", error)
    }
  }
  const profileImage = images => {
    setImage(images);
  };
  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss();
    })
  }, [])






  const loaderON = () => {
    setTimeout(loaderTrue, 0);
  }
  const loaderTrue = () => {
    // console.log("ONNNN!");
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
  // console.log('similarPostData >>>>>>>>>>>>>', slug_name);
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{
          backgroundColor: Colors.white,
          flex: 1,
        }}>
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
        <View style={{ flex: 1 }} >
          <View>
            <PostTask_header_button active="postdetailspage" />
          </View>
          {/* <View style={globalstyles.container_only_padding}> */}
          <View style={{ flex: 1 }}>
            <ScrollView
              ref={mainscrollRef}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always">

              {/* ********************what do you need done******************* */}
              <View style={{ paddingHorizontal: Normalize(16) }} >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                  <Text style={globalstyles.textinput_Header_Style}>
                    Task title
                  </Text>

                  {title.trim('').length < 10 &&

                    <Text style={[globalstyles.textinput_Header_Style, { fontSize: Normalize(10), }]}>
                      Min. 10 characters
                    </Text>}

                </View>


                <TextInput
                  style={[
                    globalstyles.textinputStyle,
                    {
                      borderColor: titleIsFocused
                        ? Colors.primary
                        : Colors.disable_textinput_border,
                      backgroundColor: titleIsFocused
                        ? Colors.white
                        : Colors.disable_textinput_background,
                    },
                  ]}
                  value={title}
                  // placeholder={
                  //   taskCatagoryName.length != 0
                  //     ? `e.g. ${taskCatagoryName} related work`
                  //     : strings.POSTTASK.PLACETEXT1
                  // }
                  placeholder={taskDetailsTitle}
                  placeholderTextColor={Colors.textinput_inner_text}
                  onChangeText={e => setTitle(e)}
                  onFocus={() => setTitleIsFocused(true)}
                  onBlur={() => setTitleIsFocused(false)}
                />
              </View>
              {/* ********************what are the details******************* */}
              <View style={{ paddingHorizontal: Normalize(16) }} >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                  <Text style={globalstyles.textinput_Header_Style}>
                    Task description
                  </Text>

                  {description.trim('').length < 25 &&

                    <Text style={[globalstyles.textinput_Header_Style, { fontSize: Normalize(10), }]}>
                      Min. 25 characters
                    </Text>}
                </View>



                <TextInput
                  placeholderTextColor={Colors.textinput_inner_text}
                  style={[
                    globalstyles.multiline_textinputStyle,
                    {
                      borderColor: aboutIsFocused
                        ? Colors.primary
                        : Colors.disable_textinput_border,
                      backgroundColor: aboutIsFocused
                        ? Colors.white
                        : Colors.disable_textinput_background,
                    },
                  ]}
                  placeholder={strings.POSTTASK.PLACETEXT2}
                  multiline
                  value={description}
                  onChangeText={e => setDescription(e)}
                  onFocus={() => setAboutIsFocused(true)}
                  onBlur={() => setAboutIsFocused(false)}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                />
              </View>

              <TwoHorizantalLine />

              <View style={{ paddingHorizontal: Normalize(16) }} >

                <Text style={globalstyles.textinput_Header_Style}>
                  Type of task
                </Text>
                <TwoButton />
              </View>

              <TwoHorizantalLine />

              {/* *************LOCATION***************** */}
              <View style={{ paddingHorizontal: Normalize(16) }} >
                <Text style={[globalstyles.textinput_Header_Style]}>
                  To be complete at
                </Text>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    borderBottomWidth: Normalize(0.5),
                    borderBottomColor: Colors.borderColor,
                    marginVertical: Normalize(5),
                    height: Normalize(42),
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                  onPress={() =>
                    navigation.navigate('PostTask_Location_selectPage')
                  }>
                  <View
                    style={{
                      height: '100%',
                      width: Normalize(18),
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <View style={{
                      height: Normalize(24),
                      width: "100%",
                    }} >
                      <Entypo
                        name="location-pin"
                        size={Normalize(23)}
                        color={Colors.greyText}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 1 }} >
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: Normalize(11.5),
                        fontFamily: fontfmliy.regular,
                        color: Colors.greyText,
                        paddingHorizontal: Normalize(12),
                      }}>
                      {location ? location : "Choose task location"}
                    </Text>
                  </View>


                  <View
                    style={{
                      height: '100%',
                      width: Normalize(20),
                      marginRight: Normalize(5),
                      justifyContent: "center", alignItems: "center"
                    }}>
                    <Entypo
                      name="chevron-small-right"
                      size={Normalize(23)}
                      color={Colors.greyText}
                    />
                  </View>


                </TouchableOpacity>


                <View
                  style={{
                    height: Normalize(130),
                    width: '100%',
                    alignSelf: 'center',
                    backgroundColor: Colors.grayf5,
                    borderRadius: Normalize(8),
                    marginTop: Normalize(6),
                    overflow: 'hidden',
                  }}>
                  {lat != '' && lng != '' && (

                    <MapView
                      mapType="standard"
                      region={{
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.009,
                        longitudeDelta: 0.009,
                      }}
                      style={{ flex: 1 }}
                      accessible={false}
                      zoomEnabled={false}
                      scrollEnabled={false}>
                      <Marker
                        title="EazyPay"
                        coordinate={{
                          latitude: lat,
                          longitude: lng,
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
                  )}
                </View>

              </View>
              {/* category */}

              <View style={{ paddingHorizontal: Normalize(16) }} >
                <Text style={globalstyles.textinput_Header_Style}>
                  Category
                </Text>
                <Pressable
                  onPress={() => navigation.navigate("CategorySelect")}
                  style={[
                    globalstyles.textinput_onlyBox_Style,
                    {
                      backgroundColor: Colors.primary,
                      borderRadius: Normalize(10)
                    },
                  ]}>
                  <View
                    style={{
                      height: '100%',
                      width: Normalize(24),
                      marginLeft: Normalize(10),
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <View style={{
                      height: Normalize(24),
                      width: "100%",
                    }} >
                      <Image
                        source={{ uri: ImageLink.homeCategory + category_image }}
                        style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                    </View>
                  </View>
                  <View style={{ flex: 1,justifyContent:"center" }}>
                    <Text style={[globalstyles.plantext_roboto_regular, {
                      marginLeft: Normalize(10), color: Colors.white, fontFamily: fontfmliy.bold,
                    }]}>
                      {category_id != ''
                        ? taskCatagoryName
                        : strings.BROWSEFILTER.CHOOSECATEGORY}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: '100%',
                      width: Normalize(20),
                      marginRight: Normalize(5),
                      justifyContent: "center", alignItems: "center"
                    }}>
                    <Entypo
                      name="chevron-small-down"
                      size={Normalize(23)}
                      color={Colors.white}
                    />
                  </View>
                </Pressable>
              </View>

              <TwoHorizantalLine />
              {/* add must have */}
              <View style={{ paddingHorizontal: Normalize(16) }} >
                <Text style={[globalstyles.textinput_Header_Style]}>
                  {strings.POSTTASK.MUSTHAVES}{' '}
                  <Text
                    style={{
                      color: Colors.primary,
                      fontSize: Normalize(11),
                      fontWeight: '600',
                    }}>
                    (Optional)
                  </Text>
                </Text>
                <TextInput
                  placeholderTextColor={Colors.textinput_inner_text}
                  style={[
                    globalstyles.multiline_textinputStyle,
                    {
                      borderColor: mustHaveIsFocused
                        ? Colors.primary
                        : Colors.disable_textinput_border,
                      backgroundColor: mustHaveIsFocused
                        ? Colors.white
                        : Colors.disable_textinput_background,
                    },
                  ]}
                  placeholder={"Tell EazyPay what they need to bring in order to complete the task. E.G. Tools, Cleaning Products"}
                  multiline
                  value={must_have_New}
                  onChangeText={e => setMust_have_New(e)}
                  onFocus={() => setmustHaveIsFocused(true)}
                  onBlur={() => setmustHaveIsFocused(false)}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                />
              </View>

              <TwoHorizantalLine />
              {/* images */}

              <View style={{ paddingHorizontal: Normalize(16) }} >
                <Text style={globalstyles.textinput_Header_Style}>
                  Upload task images
                </Text>
                {fromWhereModal && <ChoosefromWhereModal />}
                {/* show images */}
                <ScrollView
                  ref={scrollRef}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  contentContainerStyle={{ marginTop: Normalize(8) }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>

                    {apiImages.map((item, index) => (
                      <View
                        key={index}
                        style={{
                          height: Normalize(93),
                          width: Normalize(93),
                          marginRight: Normalize(7),
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: Colors.textinput_bottomBorder,
                          borderWidth: 1,
                          borderRadius: Normalize(10),
                          overflow: "hidden"
                        }}>
                        <Image
                          source={{ uri: `https://changicourt.com/eazypay/storage/app/public/images/task/${item.image}` }}
                          style={{
                            height: '100%',
                            width: '100%',
                            resizeMode: 'cover',
                          }}
                        />
                        <Pressable
                          onPress={() => {
                            deleteImage(item);
                          }}
                          style={{
                            height: '17%',
                            width: '17%',
                            position: 'absolute',
                            top: Normalize(5),
                            right: Normalize(5),
                            backgroundColor: Colors.red_old,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Entypo
                            name="cross"
                            size={Normalize(13)}
                            color={Colors.white}
                          />
                        </Pressable>
                      </View>
                    ))}
                    {imageFinalArray.map((item, index) => (
                      <View
                        key={index}
                        style={{
                          height: Normalize(93),
                          width: Normalize(93),
                          marginRight: Normalize(7),
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: Colors.textinput_bottomBorder,
                          borderWidth: 1,
                          borderRadius: Normalize(10),
                          overflow: "hidden"
                        }}>
                        <Image
                          source={{ uri: item.uri }}
                          style={{
                            height: '100%',
                            width: '100%',
                            resizeMode: 'cover',
                          }}
                        />
                        <Pressable
                          onPress={() => {
                            deleteImage(item);
                          }}
                          style={{
                            height: '17%',
                            width: '17%',
                            position: 'absolute',
                            top: Normalize(5),
                            right: Normalize(5),
                            backgroundColor: Colors.red_old,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Entypo
                            name="cross"
                            size={Normalize(13)}
                            color={Colors.white}
                          />
                        </Pressable>
                      </View>
                    ))}

                    <TouchableOpacity
                      onPress={onpressUploadButton}
                      style={{ height: Normalize(93), width: Normalize(93), backgroundColor: "#ffead9", borderRadius: Normalize(10), justifyContent: "center", alignItems: "center" }} >
                      <View style={{ height: Normalize(45), width: Normalize(45), backgroundColor: "#ffb173", borderRadius: Normalize(10), justifyContent: "center", alignItems: "center" }} >
                        <Ionicons
                          name="image"
                          size={Normalize(24)}
                          color={Colors.white}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </ScrollView>

              </View>
              <View style={{ paddingHorizontal: Normalize(16) }} >
                <Text
                  style={[
                    globalstyles.plantext_Outfit_Medium,
                    { textAlign: 'center', marginTop: Normalize(20) },
                  ]}>
                  Step 1/3
                </Text>
                <Button
                  nextarrow
                  onPress={nextButton}
                  name="Continue"
                  style={{ marginVertical: Normalize(10) }}
                />
              </View>
            </ScrollView>
          </View>
          {loader &&
            <NewLoaderPage />
          }
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default withRtl(EditTaskDetails);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  datePickerStyle: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  dateSmallBox: {
    height: '100%',
    width: '31%',
    borderColor: Colors.borderColor,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  twoButton_totalview: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    width: '75%',
    height: Normalize(38),
    marginTop: Normalize(2),
    marginBottom: Normalize(8),
    borderRadius: Normalize(10),
    overflow: "hidden"

  },
  twoButton_view: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  O_P_Buttontext: {
    fontSize: Normalize(12),
    fontFamily: 'AvenirNextLTPro-Regular',
  },
  timePickerText: {
    fontFamily: 'AvenirNextLTPro-Regular',
    color: Colors.greyText,
    fontSize: Normalize(18),
    marginVertical: Normalize(3),
    textAlign: 'center',
  },
  timepickerTextView: {
    height: Normalize(130),
    width: '30%',
    backgroundColor: Colors.grayf5,
    elevation: Normalize(2),
    borderRadius: 10,
    paddingVertical: Normalize(3),
  },
  galleryorcamera_icon: {
    height: Normalize(75), width: Normalize(75), borderRadius: Normalize(75) / 2, backgroundColor: Colors.grayf5, marginBottom: Normalize(5), justifyContent: "center", alignItems: "center"
  }
});