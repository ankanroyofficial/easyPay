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
  SafeAreaView,
  Dimensions,
  Pressable,
  Modal,
  Platform,
  Linking
} from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Header from '../../../../../components/Header';
import strings from '../../../../../constants/lng/LocalizedStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from "react-native-simple-toast"
import Button from './../../../../../components/Button';
import styles from './Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../../../../constants/colors';
import { myContext } from '../../../../../constants/ContextApi';
import axios from 'axios';
import { axiosUrl } from '../../../../../constants/LinkPage';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import { leftOrRight } from '../../../../../constants/RowOrRowreverse';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import PostTask_header_button from '../../../../../components/PostTask_header_button';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import { androidCameraPermission } from '../../../../../constants/permissions/Permissions';

const EditTaskImage = ({ navigation }) => {
  const { image, setImage, imageFinalArray, setImageFinalArray, apiImages, setApiImages, editOrpostsimilar } = useContext(myContext)
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [layoutVisible, setLayoutVisible] = useState(false);

  const [loader2, setLoader2] = useState(false)

  const [fromWhereModal, setFromWhereModal] = useState(false)



  useEffect(async () => {
    await AsyncStorage.removeItem('langType');
  }, []);
  const scrollRef = useRef();
  const scrollToEnd = () => scrollRef.current.scrollToEnd({ animated: false });


  const imageSelect_by_gallery = () => {

    onpressUploadButton()

    launchImageLibrary({ mediaType: "photo", selectionLimit: 15 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        profileImage(response.assets)
        imageArray(response.assets)
      }
    })
  }




  const imageSelect_by_camera = () => {
    if (Platform.OS == "android") {
      onpressUploadButton()
    }
    launchCamera({ mediaType: "photo", quality: 0.7 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        if (response.assets) {
          if (Platform.OS == "ios") {
            onpressUploadButton()
          }
          profileImage(response.assets)
          imageArray(response.assets)
        } else {
          if (Platform.OS === 'ios') {
            Toast.show("Please give camera permission")
          }
          // else {
          //   Toast.show("Please give camera permission")
          //   Linking.openSettings();
          // }
        }
      }
    })
  }



  const onpressUploadButton = () => {
    setFromWhereModal(!fromWhereModal)
  }
  const iscameraPermission = async () => {
    const permissionStatus = await androidCameraPermission()
    if (permissionStatus || Platform.OS == "ios") {
      imageSelect_by_camera()
    } else {
      if (Platform.OS === 'ios') {
        Toast.show("Please give camera permission")
      }
      else {
        // Toast.show("Please give camera permission")
        Linking.openSettings();
      }
    }
  }


  const imageArray = async (val) => {
    setLoader2(true)

    if (val != undefined) {
      // console.log(val)
      // console.log(val.length)
      // console.log(typeof (val))
      let array = imageFinalArray
      val.map((item) => {
        array.push(item)
      })
      setImageFinalArray(array)
      profileImage(array)
      setLoader2(false)
    } else {
      Toast.show("Please give camera permission")
    }
  }

  const deleteImage = async (val) => {
    let array = imageFinalArray;
    let newArr = []

    if (val.image == undefined) {
      // console.log(val)
      newArr = array.filter(item => item.fileName != val.fileName);
      // Toast.show(strings.PORTFOLIO.PORTFOLIODELETE)
      Toast.show(strings.POSTTASK.DELETETASKIMAGE)
      setImageFinalArray(newArr);
      profileImage(newArr);
    } else {
      // console.log(val.id)

    }
  }

  const profileImage = (images) => {
    setImage(images)
  }
  const nextButton = () => {
    if (image.length > 15) {
      Toast.show("Please select maximum 15 images")
    } else {
      navigation.navigate('EditTaskBudget')
    }
  }


  const ChoosefromWhereModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={fromWhereModal}
        onRequestClose={() => {
          onpressUploadButton()
        }}
      >
        <View style={{ flex: 1 }} >
          <Pressable onPressIn={onpressUploadButton} style={{ flex: 3, backgroundColor: "rgba(52,52,52,0.5)" }} ></Pressable>
          <View style={{ flex: 1, backgroundColor: Colors.white, padding: Normalize(15) }} >
            <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.primary, fontSize: Normalize(16), textAlign: "center" }]} >Select images from</Text>
            <View style={{ flex: 1, flexDirection: "row" }} >
              <View style={{ alignItems: "center", justifyContent: "center", flex: 1, }} >
                <Pressable
                  onPressIn={iscameraPermission}
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
                  onPressIn={imageSelect_by_gallery}
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



  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

      <View style={styles.container}>
        <Header back name={editOrpostsimilar == "edit" ? strings.POSTTASK.EDITTASK : strings.POSTTASK.SIMILARTASK} navigation={navigation} />
        <CurveDesing_Component  >

          <View>
            <PostTask_header_button
              postdetailspage="green_border"
              postplacetime="green_border"
              postimage="red_background"
              postbudget="gray_border"
            />
          </View>

          <View style={globalstyles.container_only_padding}>
            <ScrollView showsVerticalScrollIndicator={false} >
              <View>

                <Text style={[globalstyles.page_Header_Text, { marginVertical: Normalize(15), fontSize: Normalize(17) }]}>{strings.POSTTASK.ADDYOURTASKIMAGE}</Text>
                <Text style={[globalstyles.plantext_roboto_regular, { color: "#070C18", lineHeight: Normalize(15), fontSize: Normalize(12), marginBottom: Normalize(10) }]}>{strings.POSTTASK.SUBTITLETASKIMAGE}</Text>
                <TouchableOpacity onPress={onpressUploadButton} style={{
                  borderWidth: 0.8,
                  borderColor: Colors.primary,
                  backgroundColor: Colors.disable_textinput_background,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  borderRadius: 8,
                  width: '100%',
                  marginVertical: Normalize(15),
                  height: Normalize(120),
                }}>
                  <Image
                    style={styles.iconStyle}
                    source={images.upload_image}
                    resizeMode="contain"
                  />
                  <Text style={[globalstyles.blue_Text, { fontFamily: "Outfit-Regular", fontSize: Normalize(14), lineHeight: Normalize(17) }]}>Click here to upload your task images</Text>
                  <Text style={[globalstyles.plantext_outfit_regular, { paddingVertical: Normalize(5) }]}>Supported files: jpg, jpeg, png,</Text>
                  <Text style={[globalstyles.plantext_outfit_regular, {}]}>(Max file size: 10MB)</Text>
                </TouchableOpacity>
                {
                  fromWhereModal && <ChoosefromWhereModal />
                }
              </View>

              <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }} >
                {
                  imageFinalArray.map((item, index) => (
                    <View key={index} style={{ width: Normalize(80), height: Normalize(80), margin: Normalize(3), justifyContent: "center", alignItems: "center" }}>
                      <View style={{ height: "84%", width: "84%", borderRadius: 8, overflow: "hidden" }} >
                        <Image source={{ uri: item.uri }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                      </View>
                      <Pressable
                        onPress={() => {
                          deleteImage(item)
                        }}
                        style={{ height: "32%", width: "32%", position: "absolute", top: 0, right: 0, backgroundColor: Colors.secondary, borderRadius: 50, justifyContent: "center", alignItems: "center" }} >
                        <Entypo
                          name="cross"
                          size={Normalize(20)}
                          color={Colors.white}
                        />
                      </Pressable>
                    </View>
                  ))
                }

              </View>
              <Button
                nextarrow
                onPress={nextButton}
                style={styles.btnStyle}
                name={"Continue"}
              />
            </ScrollView>
          </View>
        </CurveDesing_Component>
      </View >
    </SafeAreaView >
  );
};

export default withRtl(EditTaskImage);