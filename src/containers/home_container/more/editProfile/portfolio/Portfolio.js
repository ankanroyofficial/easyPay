import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  Pressable
} from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Colors } from './../../../../../constants/colors';
import images from './../../../../../constants/images';
import Normalize from './../../../../../helpers/Dimens';
import Header from './../../../../../components/Header';
import styles from './Styles';
import Button from './../../../../../components/Button';
import strings from './../../../../../constants/lng/LocalizedStrings';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import { axiosUrl, ImageLink } from '../../../../../constants/LinkPage';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import LoaderPage from '../../../../../components/LoaderPage';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import { myContext } from '../../../../../constants/ContextApi';
const { height, width } = Dimensions.get("window")
function Portfolio({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const { slugName } = useContext(myContext)
  const [portfolioImages, setPortfolioImages] = useState(null)
  const [imageFinalArray, setImageFinalArray] = useState([])
  const [loader, setLoader] = useState(false)
  const [loader2, setLoader2] = useState(false)
  const [apiImages, setApiImages] = useState([])
  const portfoliodata = async () => {
    try {
      setLoader(true)
      var data = await axios.post(`${axiosUrl.URL}public-profile`, {
        "jsonrpc": "2.0",
        "params": {
          "slug": `${slugName}`
        }
      })
      if (data.data.result != undefined) {
        setApiImages(data.data.result.user.get_user_to_portfolio)
        setLoader(false)
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }
  useEffect(async () => {
    portfoliodata()
    return () => {
      portfoliodata()
    }
  }, [slugName]);

  const selectPortfolioimage = () => {
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
  const imageArray = (val) => {
    setLoader2(true)
    let array = imageFinalArray
    val.map((item) => {
      array.push(item)
    })
    setImageFinalArray(array)
    profileImage(array)
    setLoader2(false)
  }
  const deleteImage = async (val) => {
    let array = imageFinalArray;
    let newArr = []

    if (val.image == undefined) {
      // console.log(val)
      newArr = array.filter(item => item.fileName != val.fileName);
      Toast.show(strings.PORTFOLIO.PORTFOLIODELETE)
      setImageFinalArray(newArr);
      profileImage(newArr);
    } else {
      const data = {
        "jsonrpc": "2.0",
        "params": {
          "id": val.id
        }
      }
      const res = await axiosInstance.post("delete-portfolio-image", data)
      if (res.data.error == undefined) {
        Toast.show(res.data.result.status.meaning)
        portfoliodata()
      } else {
        Toast.show(res.data.error.meaning)
        portfoliodata()
      }
    }
  }
  const profileImage = (images) => {
    const imageData = new FormData()
    images.map((item, index) => {
      imageData.append("portfolio[]", {
        uri: item.uri,
        name: item.fileName,
        type: item.type
      })
    })
    setPortfolioImages(imageData)
  }
  const navigateTowhichPage = () => {
    navigation.navigate("Settings")
  }
  const whichButton = () => {
    return "Save"
  }
  const saveButton = async () => {
    if ((imageFinalArray.length + apiImages.length) > 15) {
      Toast.show("Choose up to 15 images")
    } else {
      try {
        setLoader(true)
        if (portfolioImages == null) {
          navigateTowhichPage()
          setLoader(false)
        } else {
          setLoader(true)
          const data = portfolioImages
          const res = await axiosInstance.post("edit-profile-portfolio-images-3", data)
          // console.log(res.data.error)
          if (res.data) {
            if (res.data.result == undefined) {
              setLoader(false)
              Toast.show(strings.ERROR.ENTERIMAGEIN_JPEGPNGJPG)
            } else {
              Toast.show(res.data.result.status.meaning)
              setPortfolioImages()
              setLoader(false)
              navigateTowhichPage()
            }
          } else {
            Toast.show("there is no response data")
          }
        }
      } catch (error) {
        console.log(error)
        setLoader(false)
      }
    }


  }
  return (
    <>
      {
        loader ?
          <LoaderPage />
          :
          <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

            <View style={{ backgroundColor: Colors.white, flexDirection: 'column', flex: 1 }}>
              <View style={styles.container}>
                <Header
                  back
                  name={strings.PORTFOLIO.HEADERTEXT}
                  navigation={navigation}
                />
                <CurveDesing_Component  >
                  <View style={{
                    flex: 1,
                    paddingHorizontal: Normalize(16)
                  }}>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      keyboardShouldPersistTaps="always"
                      style={{}}
                    >
                      <Text style={[globalstyles.page_Header_Text, { marginVertical: Normalize(15) }]}>{strings.SKILLS.INPUTHEADING}</Text>
                      <Text style={[globalstyles.plantext_roboto_regular, { color: Colors.greyText, lineHeight: Normalize(16), fontSize: Normalize(13), marginBottom: Normalize(8) }]}>Upload Portfolio images</Text>
                      <View style={{ paddingVertical: Normalize(1) }} >
                        <TouchableOpacity onPress={selectPortfolioimage}
                          style={[styles.imageUploadBtn, {
                            paddingVertical: Normalize(13)
                          }]}>
                          <Entypo
                            name="upload"
                            size={Normalize(20)}
                            color={Colors.secondary}
                          />
                          <Text style={[globalstyles.blue_Text, {marginTop:Normalize(2), fontFamily: "Outfit-Regular", fontSize: Normalize(14), lineHeight: Normalize(17), color: Colors.secondary }]}>{strings.PORTFOLIO.BTNTEXT1}</Text>
                          <Text style={[globalstyles.plantext_outfit_regular, { paddingVertical: Normalize(5), color: Colors.greylightText }]}>Supported files: jpg, jpeg, png,</Text>
                          <Text style={[globalstyles.plantext_outfit_regular, { color: Colors.greylightText }]}>(Max file size: 10MB)</Text>
                        </TouchableOpacity>
                      </View>
                      {
                        apiImages.length != 0 &&
                        <Text style={[globalstyles.plantext_roboto_regular, { color: "#070C18", marginBottom: Normalize(10) }]}>{strings.PORTFOLIO.PREVIMAGES}</Text>
                      }
                      {
                        loader2 ?
                          <View style={{ flex: 1 }}>
                            <Text style={{
                              fontSize: Normalize(13),
                              fontFamily: 'roboto-medium',
                              color: Colors.primary,
                              marginVertical: Normalize(5),
                            }}>Select Images</Text>
                          </View>
                          :
                          <View style={{ flexWrap: 'wrap', flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center" }}>
                            {
                              apiImages.map((item, index) => (
                                <View key={index} style={{ width: Normalize(80), height: Normalize(80), margin: Normalize(3), justifyContent: "center", alignItems: "center" }}>
                                  <View style={{ height: "86%", width: "86%", borderRadius: 8, overflow: "hidden", borderColor: Colors.secondaryBorder, borderWidth: Normalize(1), backgroundColor: Colors.secondaryBackground, }} >
                                    <Image source={{ uri: ImageLink.portfolio + item.image }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                                  </View>
                                  <Pressable
                                    onPress={() => {
                                      deleteImage(item)
                                    }}
                                    style={{ height: "30%", width: "30%", position: "absolute", top: 0, right: 0, backgroundColor: Colors.secondary, borderRadius: 50, justifyContent: "center", alignItems: "center" }} >
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
                      }
                      {
                        imageFinalArray.length != 0 &&
                        <Text style={[globalstyles.plantext_roboto_regular, { color: "#070C18", marginTop: Normalize(20), marginBottom: Normalize(10) }]}>{strings.PORTFOLIO.RECENTIMAGES}</Text>
                      }
                      {
                        loader2 ?
                          <View style={{ flex: 1 }}>
                            <Text>Select Images</Text>
                          </View>
                          :
                          <View style={{ flexWrap: 'wrap', flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "center" }}>
                            {
                              imageFinalArray.map((item, index) => (
                                <View key={index} style={{ width: Normalize(80), height: Normalize(80), margin: Normalize(3), justifyContent: "center", alignItems: "center" }}>
                                  <View style={{ height: "86%", width: "86%", borderColor: Colors.secondaryBorder, borderWidth: Normalize(1), backgroundColor: Colors.secondaryBackground, borderRadius: 8, overflow: "hidden" }} >
                                    <Image source={{ uri: item.uri }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                                  </View>
                                  <Pressable
                                    onPress={() => {
                                      deleteImage(item)
                                    }}
                                    style={{ height: "30%", width: "30%", position: "absolute", top: 0, right: 0, backgroundColor: Colors.secondary, borderRadius: 50, justifyContent: "center", alignItems: "center" }} >
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
                      }
                      <Button
                        onPress={saveButton}
                        style={styles.saveBtn}
                        // name={"Send for Verification"}
                        // name={activeTab == "Fixer" && documentStatus ? "Save" : "Apply for Verification"}
                        name={whichButton()}
                      />
                    </ScrollView>
                  </View>
                </CurveDesing_Component>
              </View>
            </View>
          </SafeAreaView>
      }
    </>
  );
}

export default withRtl(Portfolio);