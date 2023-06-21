import React, { useContext, useEffect, useState } from 'react';
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
  StyleSheet,
  Dimensions
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Header from '../../../../components/Header';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import strings from './../../../../constants/lng/LocalizedStrings';
import { Colors } from '../../../../constants/colors';
import Button from './../../../../components/Button';
import { myContext } from '../../../../constants/ContextApi';
import LoaderPage from '../../../../components/LoaderPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import PostTask_header_button from '../../../../components/PostTask_header_button';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import images from '../../../../constants/images';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { androidCameraPermission } from '../../../../constants/permissions/Permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useRef } from 'react';
import { ImageLink } from '../../../../constants/LinkPage';
import TwoHorizantalLine from '../../../../components/TwoHorizantalLine';
import NewLoaderPage from '../../../../components/NewLoaderPage';
import { fontfmliy } from '../../../../components/WhichFontFamily';

const { width } = Dimensions.get("window")

const PostTaskDetails = ({ route }) => {
  const navigation = useNavigation();

  const scrollRef = useRef();
  const scrollToEnd = () => scrollRef.current.scrollToEnd({ animated: true });

  const { item } = route.params;
  const {
    token,
    category_id,
    type,
    setType,
    setCategory_id,
    setSubcategory_id,
    title,
    setTitle,
    description,
    setDescription,
    location,
    lat,
    lng,
    must_have_New,
    setMust_have_New,
    imageFinalArray,
    setImageFinalArray,
    setImage,
    setCategory_image,
    category_image,
    taskDetailsTitle,
    catagory, setcatagory,
    taskCatagoryName, setTaskCatagoryName,
    setId,
    setTime,
    setDate,
    setBudget_type,
    setBudget,
    setHourly_rate,
    setNumber_of_hour,
    setLocation,
    setLat,
    setLng,
    setDate_type,
    setY2,
    setD2,
    setM2,
    setPerShowDate,
    setViewTime,
    setEngShowDate,


  } = useContext(myContext);
  const [openModel, setOpenModel] = useState(false);
  const [titleIsFocused, setTitleIsFocused] = useState(false);
  const [aboutIsFocused, setAboutIsFocused] = useState(false);
  const [mustHaveIsFocused, setmustHaveIsFocused] = useState(false);

  const [fromWhereModal, setFromWhereModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const cleanContext = () => {
    setLoader(true),
      setId(''),
      setCategory_id(''),
      setSubcategory_id(''),
      setTitle(''),
      setDescription(''),
      setType('P'),
      setTime(''),
      setDate(''),
      setBudget_type('T'),
      setBudget(''),
      setHourly_rate(''),
      setNumber_of_hour(''),
      setLocation(''),
      setLat(''),
      setLng(''),
      setImage([]),
      setMust_have_New(""),
      setDate_type('B'),
      setImageFinalArray([]),
      setY2(),
      setD2(),
      setM2(),
      setPerShowDate(''),
      setViewTime(''),
      setEngShowDate(''),
      setLoader(false)
  };
  const getCategoryauto = item => {
    if (item.category_by_language_api == undefined) {
      setCategory_id('');
    } else {
      setCategory_id(item.category_by_language_api.category_id);
    }
  };
  useEffect(() => {
    cleanContext()
    aa()
    getCategoryauto(item);
  }, []);

  const aa = () => {
    if (item.category_by_language_api == undefined) {
      setTaskCatagoryName("")
    } else {
      setTaskCatagoryName(item.category_by_language_api.name)
    }
  }
  const get_category = async () => {
    try {
      const data = await axiosInstance.post('get-category');
      if (data.data.result) {
        setcatagory(data.data.result.get_category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(async () => {
    await get_category();
  }, [token]);
  const selectCatagory = async (id, name, item) => {
    setCategory_id(id);
    setTaskCatagoryName(name);
    setCategory_image(item.image);
    // console.log(item)
    setOpenModel(!openModel);
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
                  navigation.navigate('PostTaskplace');
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

    if (val.image == undefined) {
      // console.log(val)
      newArr = array.filter(item => item.fileName != val.fileName);
      // Toast.show(strings.POSTTASK.DELETETASKIMAGE);
      setImageFinalArray(newArr);
      profileImage(newArr);
      scrollToEnd();
    } else {
      // console.log(val.id)
    }
  };
  const profileImage = images => {
    setImage(images);
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
              <Pressable
                onPressIn={iscameraPermission}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <View
                  style={styles.galleryorcamera_icon}>
                  <FontAwesome5
                    name="camera"
                    size={Normalize(30)}
                    color={Colors.primary}
                  />
                </View>
                <Text
                  style={[
                    globalstyles.plantext_Outfit_Medium,
                    { color: Colors.primary },
                  ]}>
                  Camera
                </Text>
              </Pressable>

              <Pressable
                onPressIn={imageSelect_by_gallery}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <View
                  style={styles.galleryorcamera_icon}>
                  <FontAwesome5
                    name="images"
                    size={Normalize(30)}
                    color={Colors.primary}
                  />
                </View>
                <Text
                  style={[
                    globalstyles.plantext_Outfit_Medium,
                    { color: Colors.primary },
                  ]}>
                  Gallery
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss();
    })
  }, [])

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
          name={strings.POSTTASK.HEADERTEXT2}
          navigation={navigation}
        />
        <View style={{ flex: 1 }} >
          <View>
            <PostTask_header_button active="postdetailspage" />
          </View>
          {/* <View style={globalstyles.container_only_padding}> */}
          <View style={{ flex: 1 }}>
            <ScrollView
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
                // returnKeyType={"send"}
                // onSubmitEditing={() => {
                //   Keyboard.dismiss();
                // }}
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

                {lat != '' && lng != '' && (
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
                  </View>
                )}
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
                  <View style={{ flex: 1, justifyContent: "center" }}>
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
                // onSubmitEditing={() => {
                //   Keyboard.dismiss();
                // }}
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

          {loader && <NewLoaderPage />}

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default withRtl(PostTaskDetails);

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
