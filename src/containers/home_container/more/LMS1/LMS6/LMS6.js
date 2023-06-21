import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
  Linking
} from 'react-native';
import Toast from "react-native-simple-toast";
import Header from '../../../../../components/Header';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import strings from '../../../../../constants/lng/LocalizedStrings';
import styles from './Styles';
import { Colors } from '../../../../../constants/colors';
import Button from '../../../../../components/Button';
import { myContext } from "../../../../../constants/ContextApi"
import { leftOrRight, rowOrRowreverse } from '../../../../../constants/RowOrRowreverse';
import images from '../../../../../constants/images';
import Entypo from 'react-native-vector-icons/Entypo';
import { engToPersian } from '../../../../../constants/EnglishToPersian';
import { ImageLink } from '../../../../../constants/LinkPage';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import Listing_header_button from '../../../../../components/Listing_header_button';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import { androidCameraPermission } from '../../../../../constants/permissions/Permissions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { fontfmliy } from '../../../../../components/WhichFontFamily';
import { BackHandler } from 'react-native';
const LMS6 = ({ navigation }) => {
  const { language } = useRtlContext();
  const {
    lMS_Multi_Images, setLMS_Multi_Images,
    lMS_single_Images, setLMS_single_Images,
    lMS_prev_Multi_Images, setLMS_prev_Multi_Images,
  } = useContext(myContext)

  const [fromWhereModal_mainimage, setFromWhereModal_mainimage] = useState(false)
  const [fromWhereModal_multipleImages, setFromWhereModal_multipleImages] = useState(false)


  const onPressMainImageSelect = () => {
    setFromWhereModal_mainimage(!fromWhereModal_mainimage)
  }
  const onPressMultipleImagesSelect = () => {
    setFromWhereModal_multipleImages(!fromWhereModal_multipleImages)
  }
  const multipleimage_Select_gallery = () => {
    onPressMultipleImagesSelect()
    launchImageLibrary({ mediaType: "photo", selectionLimit: 15 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setLMS_Multi_Images(response.assets)
        imageArray(response.assets)
      }
    })
  }
  const multipleimage_Select_camera = () => {
    if (Platform.OS == "android") {
      onPressMultipleImagesSelect()
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
            onPressMultipleImagesSelect()
          }
          setLMS_Multi_Images(response.assets)
          imageArray(response.assets)
        } else {
          if (Platform.OS === 'ios') {
            Toast.show("Please give camera permission")
          }
        }
      }
    })
  }

  const iscameraPermission_mainImages = async () => {
    const permissionStatus = await androidCameraPermission()
    if (permissionStatus || Platform.OS == "ios") {
      mainImage_select_camera()
    } else {
      if (Platform.OS === 'ios') {
        Toast.show("Please give camera permission")
      }
      else {
        Linking.openSettings();
      }
    }
  }

  const iscameraPermission_multipleImages = async () => {
    const permissionStatus = await androidCameraPermission()
    if (permissionStatus || Platform.OS == "ios") {
      multipleimage_Select_camera()
    } else {
      if (Platform.OS === 'ios') {
        Toast.show("Please give camera permission")
      }
      else {
        Linking.openSettings();
      }
    }
  }

  const mainImage_select_gallery = () => {
    onPressMainImageSelect()
    launchImageLibrary({ mediaType: "photo", maxWidth: 250, maxHeight: 250 }, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        setLMS_single_Images(response.assets[0])
      }
    })
  }
  const mainImage_select_camera = () => {
    if (Platform.OS == "android") {
      onPressMainImageSelect()
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
            onPressMainImageSelect()
          }
          setLMS_single_Images(response.assets[0])
        } else {
          if (Platform.OS === 'ios') {
            Toast.show("Please give camera permission")
          }
        }
      }
    })
  }
  const ChoosefromWhereModal_main_image = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={fromWhereModal_mainimage}
        onRequestClose={() => {
          onPressMainImageSelect()
        }}
      >
        <View style={{ flex: 1 }} >
          <Pressable onPressIn={onPressMainImageSelect} style={{ flex: 3, backgroundColor: "rgba(52,52,52,0.5)" }} ></Pressable>
          <View style={{ flex: 1, backgroundColor: Colors.white, padding: Normalize(15) }} >
            <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.primary, fontSize: Normalize(16), textAlign: "center" }]} >Select images from</Text>
            <View style={{ flex: 1, flexDirection: "row" }} >
              <View style={{ alignItems: "center", justifyContent: "center", flex: 1, }} >
                <Pressable
                  onPressIn={iscameraPermission_mainImages}
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
                  onPressIn={mainImage_select_gallery}
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
  const ChoosefromWhereModal_multiple_image = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={fromWhereModal_multipleImages}
        onRequestClose={() => {
          onPressMultipleImagesSelect()
        }}
      >
        <View style={{ flex: 1 }} >
          <Pressable onPressIn={onPressMultipleImagesSelect} style={{ flex: 3, backgroundColor: "rgba(52,52,52,0.5)" }} ></Pressable>
          <View style={{ flex: 1, backgroundColor: Colors.white, padding: Normalize(15) }} >
            <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.primary, fontSize: Normalize(16), textAlign: "center" }]} >Select images from</Text>
            <View style={{ flex: 1, flexDirection: "row" }} >
              <View style={{ alignItems: "center", justifyContent: "center", flex: 1, }} >
                <Pressable
                  onPressIn={iscameraPermission_multipleImages}
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
                  onPressIn={multipleimage_Select_gallery}
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
  const imageArray = (val) => {
    let array = lMS_Multi_Images
    val.map((item) => {
      array.push(item)
    })
    setLMS_Multi_Images(array)
  }
  const deleteImage = async (val) => {
    let array = lMS_Multi_Images;
    let apiarray = lMS_prev_Multi_Images;
    let newArr = []
    if (val.image == undefined) {
      // console.log(val)
      newArr = array.filter(item => item.fileName != val.fileName);
      setLMS_Multi_Images(newArr);
    } else {
      const data = {
        "jsonrpc": "2.0",
        "params": {
          "id": val.id
        }
      }
      const res = await axiosInstance.post("delete-listing-image", data)

      newArrApi = apiarray.filter(item => item.id != val.id);

      setLMS_prev_Multi_Images(newArrApi)
    }
  }
  const deleteSingleImage = async (val) => {
    if (val == undefined) {

      Toast.show("from api")
    } else {
      setLMS_single_Images("")
    }
  }
  const nextButton = () => {
    if (lMS_single_Images.fileName == undefined) {
      if (lMS_single_Images.length > 0) {
        if ((lMS_Multi_Images.length) + (lMS_prev_Multi_Images.length) > 0) {
          if ((lMS_Multi_Images.length) + (lMS_prev_Multi_Images.length) > 15) {
            Toast.show(strings.LMS.CHOOSEUPTO15IMAGES)
          } else {
            navigation.navigate('LMS7')
          }
        } else {
          navigation.navigate('LMS7')
        }
      } else {
        Toast.show(strings.LMS.MAINIMAGEMUST)
      }
    } else {
      if ((lMS_Multi_Images.length) + (lMS_prev_Multi_Images.length) > 0) {
        if ((lMS_Multi_Images.length) + (lMS_prev_Multi_Images.length) > 15) {
          Toast.show(strings.LMS.CHOOSEUPTO15IMAGES)
        } else {
          navigation.navigate('LMS7')
        }
      } else {
        navigation.navigate('LMS7')
      }
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);
  const handleBackButtonClick = () => {
    navigation.goBack(null);
    return true;
  }

  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
      <View style={styles.container}>
        <Header back name={strings.LMS.HEADER} navigation={navigation} backFunc={handleBackButtonClick} />
        <CurveDesing_Component  >
          <View>
            <Listing_header_button
              category="green_border"
              description="green_border"
              pricingPackaging="green_border"
              location="green_border"
              availability="green_border"
              images="red_background"
              bookingMessage="gray_border"
            />
          </View>
          <KeyboardAvoidingView
            behavior={(Platform.OS === 'ios') ? "padding" : null}
            style={globalstyles.container_only_padding} >
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <Text style={[globalstyles.blue_Text, { textAlign: leftOrRight(language) }]}>{strings.LMS.ADDIMAGES}</Text>
              <Text style={[globalstyles.page_SubHeader_Text, { fontSize: Normalize(11.5) }]}>{strings.LMS.ADDHIGHQUALITYIMAGES}</Text>
              {/* ****************single images******************* */}
              <Text style={[globalstyles.textinput_Header_Style, { fontFamily: fontfmliy.bold, textAlign: leftOrRight(language) }]}>{strings.LMS.MAINIMAGE}</Text>
              <Text style={[globalstyles.textInput_SubHeader, { fontSize: Normalize(11), }]}>{strings.LMS.THISISFIRSTIMAGE}</Text>


              <View style={{ alignItems: "center" }}>
                <View style={{ width: Normalize(100), height: Normalize(100), margin: Normalize(3), justifyContent: "center", alignItems: "center", backgroundColor: Colors.secondaryBackground, borderRadius: Normalize(10) }}>

                  {
                    (lMS_single_Images.uri || lMS_single_Images.length > 0) ?


                      <View style={{ height: "100%", width: "100%", overflow: "hidden" }} >
                        {
                          lMS_single_Images.uri == undefined ?
                            <Image source={{ uri: ImageLink.ListingImage + lMS_single_Images }} style={{ height: "100%", width: "100%", resizeMode: "cover", borderRadius: Normalize(10), }} />
                            :
                            <Image source={{ uri: lMS_single_Images.uri }} style={{ height: "100%", width: "100%", resizeMode: "cover", borderRadius: Normalize(10), }} />
                        }
                      </View>
                      :
                      <View style={{ height: "100%", width: "100%", borderRadius: Normalize(10), justifyContent: "center", alignItems: "center" }} >
                        <Entypo
                          name="folder-images"
                          size={Normalize(23)}
                          color={Colors.secondary}
                        />
                        <Text style={[globalstyles.blue_Text, { color: Colors.secondary, fontFamily: fontfmliy.regular, fontSize: Normalize(9), marginTop: Normalize(3) }]}>Upload Image</Text>
                      </View>
                  }




                  {/* if no image, then add */}
                  {
                    (lMS_single_Images == undefined || lMS_single_Images.length == 0) &&
                    <Pressable
                      onPress={onPressMainImageSelect}
                      style={{ height: "25%", width: "25%", position: "absolute", bottom: -Normalize(3), right: -Normalize(8), backgroundColor: Colors.grayf8, borderRadius: 50, justifyContent: "center", alignItems: "center", elevation: 2 }} >
                      <Entypo
                        name="plus"
                        size={Normalize(19)}
                        color={Colors.secondary}
                      />
                    </Pressable>
                  }
                  {/* if image then cross */}
                  {
                    ((lMS_single_Images != undefined && lMS_single_Images != "") || lMS_single_Images.length > 0) &&
                    <Pressable
                      onPress={() => {
                        deleteSingleImage(lMS_single_Images)
                      }}
                      style={{ height: "25%", width: "25%", position: "absolute", top: -Normalize(5), right: -Normalize(5), backgroundColor: Colors.secondary, borderRadius: 50, justifyContent: "center", alignItems: "center", elevation: 2 }} >
                      <Entypo
                        name="cross"
                        size={Normalize(19)}
                        color={Colors.white}
                      />
                    </Pressable>
                  }
                </View>
              </View>
              {fromWhereModal_mainimage && <ChoosefromWhereModal_main_image />}
              {fromWhereModal_multipleImages && <ChoosefromWhereModal_multiple_image />}
              {/* multiple images */}
              <View style={{ flexDirection: rowOrRowreverse(language), marginTop: Normalize(10) }} >
                <Text style={[globalstyles.textinput_Header_Style, { fontFamily: fontfmliy.bold, textAlign: leftOrRight(language) }]}>{strings.LMS.GALLARYIMAGES} <Text style={{
                  fontSize: Normalize(11),
                  color: Colors.greylightText,
                  fontFamily: fontfmliy.regular,
                }} > {strings.LMS.OPTIONAL} </Text></Text>
              </View>
              <Text style={[globalstyles.textInput_SubHeader, { fontSize: Normalize(11), marginVertical: Normalize(0), }]}>{strings.LMS.CHOOSEUPTO15}</Text>
              <Pressable
                disabled={lMS_Multi_Images.length > 14 ? true : false}
                onPress={onPressMultipleImagesSelect}
                style={[globalstyles.imagesUploadBox, { marginTop: Normalize(8), backgroundColor: Colors.secondaryBackground, borderColor: Colors.secondaryBorder }]}>
                <Entypo
                  name="upload"
                  size={Normalize(23)}
                  color={Colors.secondary}
                />
                <Text style={[globalstyles.plantext_outfit_regular, { fontSize: Normalize(12), paddingVertical: Normalize(5), color: Colors.secondary }]}>Supported files: jpg, jpeg, png,</Text>
                <Text style={[globalstyles.plantext_outfit_regular, { color: Colors.secondary }]}>(Max file size: 10MB)</Text>
              </Pressable>
              {
                (lMS_Multi_Images.length) + (lMS_prev_Multi_Images.length) != 0 &&
                <Text style={{
                  fontSize: Normalize(11.5),
                  fontFamily: fontfmliy.bold,
                  color: Colors.primary,
                  textAlign: leftOrRight(language),
                  marginBottom: Normalize(3)
                }}>{strings.LMS.GALLARYIMAGES} ({`${(lMS_Multi_Images.length) + (lMS_prev_Multi_Images.length)}/15`})</Text>
              }

              <View style={{ flexWrap: 'wrap', flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center" }}>
                {
                  lMS_Multi_Images.map((item, index) => (
                    <View key={index} style={{ width: Normalize(80), height: Normalize(80), margin: Normalize(3), justifyContent: "center", alignItems: "center"}}>
                      <View style={{ height: "84%", width: "84%", borderRadius: 8, overflow: "hidden",borderColor:Colors.secondaryBorder,borderWidth:1 }} >
                        <Image source={{ uri: item.uri }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                      </View>
                      <Pressable onPress={() => {
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
                {
                  lMS_prev_Multi_Images.map((item, index) => (
                    <View key={index} style={{ width: Normalize(80), height: Normalize(80), margin: Normalize(3), justifyContent: "center", alignItems: "center" }}>
                      <View style={{ height: "84%", width: "84%", borderRadius: 8, overflow: "hidden" }} >
                        <Image source={{ uri: ImageLink.ListingImage + item.image }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                      </View>
                      <Pressable onPress={() => {
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
            </ScrollView >
            <Button
              onPress={nextButton}
              name={strings.POSTTASK.NEXT}
              style={styles.btnStyle}
              nextarrow
            />
          </KeyboardAvoidingView>
        </CurveDesing_Component>
      </View >
    </SafeAreaView>
  );
};

export default withRtl(LMS6);
