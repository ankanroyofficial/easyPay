import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Pressable,
  Modal,
  Platform,
  Linking,
} from 'react-native';
import {withRtl} from 'react-native-easy-localization-and-rtl';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Header from '../../../../../components/Header';
import strings from '../../../../../constants/lng/LocalizedStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import Button from './../../../../../components/Button';
import styles from './Styles';
import {Colors} from '../../../../../constants/colors';
import {myContext} from '../../../../../constants/ContextApi';
import images from '../../../../../constants/images';
import PostTask_header_button from '../../../../../components/PostTask_header_button';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import {androidCameraPermission} from '../../../../../constants/permissions/Permissions';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import { fontfmliy } from '../../../../../components/WhichFontFamily';
const PostTaskImage = ({navigation}) => {
  const {
    imageFinalArray,
    token,
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
    time,
    setTime,
    date,
    setDate,
    budget_type,
    setBudget_type,
    budget,
    setBudget,
    hourly_rate,
    setHourly_rate,
    number_of_hour,
    setNumber_of_hour,
    location,
    setLocation,
    lat,
    setLat,
    lng,
    setLng,
    image,
    setImage,
    must_have,
    setMust_Have,
    date_type,
    setDate_type,
    setImageFinalArray,
    setY2,
    setD2,
    setM2,
    perShowDate,
    setPerShowDate,
    socketId,
  } = useContext(myContext);
  const [fromWhereModal, setFromWhereModal] = useState(false);

  const [sucessPage, setSucessPage] = useState(false);
  const [loader, setLoader] = useState(false);
  const onpressSucessPage = () => {
    setSucessPage(!sucessPage);
  };
  useEffect(async () => {
    await AsyncStorage.removeItem('langType');
  }, []);
  const imageSelect_by_gallery = () => {
    onpressUploadButton();
    launchImageLibrary({mediaType: 'photo', selectionLimit: 15}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        profileImage(response.assets);
        imageArray(response.assets);
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
    launchCamera({mediaType: 'photo', quality: 0.7}, response => {
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
      // Toast.show(strings.PORTFOLIO.PORTFOLIODELETE)
      Toast.show(strings.POSTTASK.DELETETASKIMAGE);
      setImageFinalArray(newArr);
      profileImage(newArr);
    } else {
      // console.log(val.id)
    }
  };
  const profileImage = images => {
    setImage(images);
  };
  const nextButton = () => {
    if (image.length > 15) {
      Toast.show('Please select maximum 15 images');
    } else {
      navigation.navigate('postTaskBudget')
      // finalApicall();
    }
  };
  const ChoosefromWhereModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={fromWhereModal}
        onRequestClose={() => {
          onpressUploadButton();
        }}>
        <View style={{flex: 1}}>
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
            <View style={{flex: 1, flexDirection: 'row'}}>
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
                    {color: Colors.primary},
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
                    {color: Colors.primary},
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

  const finalApicall = async () => {
    try {
      setLoader(true);
      var mustHaveArray = [];

      must_have.map(item => {
        mustHaveArray.push(item.title);
      });
      const finalFormData = new FormData();
      finalFormData.append('id', id);
      finalFormData.append('category_id', category_id);
      finalFormData.append('subcategory_id', subcategory_id);
      finalFormData.append('title', title);
      finalFormData.append('description', description);
      finalFormData.append('type', type);
      finalFormData.append('time', time);
      finalFormData.append('date', date_type == 'O' ? date : '');
      finalFormData.append('due_date', date_type == 'O' ? date : '');
      finalFormData.append('budget_type', budget_type);
      finalFormData.append('budget', 0);
      finalFormData.append('hourly_rate', 0);
      finalFormData.append('number_of_hour', 0);
      finalFormData.append('location', location);
      finalFormData.append('lat', lat);
      finalFormData.append('lng', lng);

      image.map((item, index) => {
        finalFormData.append(`image[${index}]`, {
          uri: item.uri,
          name: item.fileName,
          type: item.type,
        });
      });

      must_have.map((item, index) => {
        mustHaveArray.push(item.title);
        finalFormData.append(`must_have[${index}]`, item.title);
      });
      finalFormData.append('date_type', date_type);
      console.log(finalFormData);
      const data = finalFormData;

      const res = await axiosInstance.post('post-task', data);
      // console.log(res.data)

      if (res.data.result == undefined) {
        setLoader(false);
        Toast.showWithGravity(res.data.error.meaning, Toast.LONG, Toast.BOTTOM);
      } else {
        setLoader(false);
        await AsyncStorage.setItem('isMyTaskloader', 'true');
        await AsyncStorage.setItem('isBrowserTaskloader', 'true');
        onpressSucessPage();
        // Toast.show(res.data.result.status.meaning)
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log('finalApicall', error);
    }
  };

  const onTaskSucess = () => {
    onpressSucessPage();
    navigation.navigate('GetItDone');
  };

  return (
    <SafeAreaView
      style={{backgroundColor: Colors.primary, flex: 1, flexDirection: 'column'}}>
      <View style={styles.container}>
        <Header
          back
          name={strings.POSTTASK.HEADERTEXT2}
          navigation={navigation}
        />
        <CurveDesing_Component  >
          <View>
            <PostTask_header_button active="postimage" />
          </View>
          <View style={globalstyles.container_only_padding}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <Text
                  style={[
                    globalstyles.page_Header_Text,
                    {marginVertical: Normalize(13), fontSize: Normalize(15.5)},
                  ]}>
                  {strings.POSTTASK.ADDYOURTASKIMAGE}
                </Text>
                <Text
                  style={[
                    globalstyles.plantext_roboto_regular,
                    {
                      color: '#070C18',
                      lineHeight: Normalize(15),
                      fontSize: Normalize(11.5),
                      marginBottom: Normalize(10),
                    },
                  ]}>
                  {strings.POSTTASK.SUBTITLETASKIMAGE}
                </Text>
                <TouchableOpacity
                  onPress={onpressUploadButton}
                  style={{
                    borderWidth: 0.8,
                    borderColor: Colors.primary,
                    backgroundColor: Colors.disable_textinput_background,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    borderRadius: 8,
                    width: '100%',
                    marginVertical: Normalize(15),
                    // height: Normalize(120),
                    paddingVertical: Normalize(15),
                  }}>
                  <Image
                    style={styles.iconStyle}
                    source={images.upload_image}
                    resizeMode="contain"
                  />
                  <Text
                    style={[
                      globalstyles.blue_Text,
                      {
                        fontFamily: fontfmliy.regular,
                        fontSize: Normalize(13),
                        lineHeight: Normalize(17),
                      },
                    ]}>
                    Click here to upload your task images
                  </Text>
                  <Text
                    style={[
                      globalstyles.plantext_outfit_regular,
                      {paddingVertical: Normalize(5)},
                    ]}>
                    Supported files: jpg, jpeg, png,
                  </Text>
                  <Text style={[globalstyles.plantext_outfit_regular, {}]}>
                    (Max file size: 10MB)
                  </Text>
                </TouchableOpacity>
                {fromWhereModal && <ChoosefromWhereModal />}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}>
                {imageFinalArray.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      width: Normalize(80),
                      height: Normalize(80),
                      margin: Normalize(3),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: '84%',
                        width: '84%',
                        borderRadius: 8,
                        overflow: 'hidden',
                      }}>
                      <Image
                        source={{uri: item.uri}}
                        style={{
                          height: '100%',
                          width: '100%',
                          resizeMode: 'cover',
                        }}
                      />
                    </View>
                    <Pressable
                      onPress={() => {
                        deleteImage(item);
                      }}
                      style={{
                        height: '32%',
                        width: '32%',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: Colors.secondary,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Entypo
                        name="cross"
                        size={Normalize(20)}
                        color={Colors.white}
                      />
                    </Pressable>
                  </View>
                ))}
              </View>

              {sucessPage && (
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
                            fontSize: Normalize(14),
                            color: Colors.greyText,
                            paddingHorizontal: Normalize(10),
                          },
                        ]}>
                        Task is posted successfully and sit down relax.
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
                            {color: Colors.white, letterSpacing: Normalize(1)},
                          ]}>
                          Continue
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              )}

              <Text
                style={[
                  globalstyles.plantext_Outfit_Medium,
                  {textAlign: 'center', marginTop: Normalize(20)},
                ]}>
                3/4
              </Text>
              <Button
                disabled={loader}
                nextarrow
                onPress={nextButton}
                style={styles.btnStyle}
                name={'Continue'}
              />
            </ScrollView>
          </View>
        </CurveDesing_Component>
      </View>
    </SafeAreaView>
  );
};

export default withRtl(PostTaskImage);
