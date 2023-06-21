import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, FlatList, Pressable, Dimensions, BackHandler, TextInput, Modal, Platform } from 'react-native';
import { withRtl } from 'react-native-easy-localization-and-rtl';
import { Colors } from './../../../../constants/colors';
import images from './../../../../constants/images';
import Normalize from './../../../../helpers/Dimens';
import Header from './../../../../components/ProfileHeader';
import styles from './Styles';
import strings from './../../../../constants/lng/LocalizedStrings';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nameShorting } from '../../../../constants/NameShorting';
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import { myContext } from '../../../../constants/ContextApi';
import axiosInstance from '../../../../constants/AxiosCallPage';
import Toast from 'react-native-simple-toast';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import { useNavigation } from '@react-navigation/native';
import Button from '../../../../components/Button';
import Button2 from '../../../../components/Button2';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
const { height, width } = Dimensions.get("window")
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { androidCameraPermission } from '../../../../constants/permissions/Permissions';
import NewLoaderPage from '../../../../components/NewLoaderPage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WarningPage from '../../../../components/WarningPage';
import { accountStatus } from '../../../../constants/AccoutStatus';
function SimpleEditProfile(props) {

  const { from } = props.route.params
  const navigation = useNavigation()
  const scrollRef = useRef();
  const scrollToEnd = () => scrollRef.current.scrollToEnd({ animated: true });
  const {
    userSlugName,
    profileData,
    getAround, setGetAround,
    setAlllanguage, alllanguage,
    allSkill, setAllSkill,
    setCertificateList,
    user_Certificate, setUser_Certificate,
    about_meForEditProfile, setAbout_meForEditProfile,
    storageDataForEditProfile, setStorageDataForEditProfile,
    selectProfilegallaryForEditProfile, setSelectProfilegallaryForEditProfile,
    profile_pictureForEditProfile, setProfile_pictureForEditProfile
  } = useContext(myContext);
  const [loader, setLoader] = useState(false)
  const [ispress, setispress] = useState(false);
  const [modalval, setmodalval] = useState(null);
  const [fromWhereModal_profile, setFromWhereModal_profile] = useState(false);
  const [fromWhereModal_portfolio, setFromWhereModal_portfolio] = useState(false);
  const [isPortfolioDeleteModal, setIsPortfolioDeleteModal] = React.useState(false);
  const [tempPortfolioDeleteID, setTempPortfolioDeleteID] = React.useState("");

  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = React.useState(false);
  const [portfolioOpenImageUrl, setPortfolioOpenImageUrl] = React.useState("");

  const onpressPortfolioImage = () => {
    if (isPortfolioModalOpen) {
      setIsPortfolioModalOpen(!isPortfolioModalOpen)
      setPortfolioOpenImageUrl("")
    } else {
      setIsPortfolioModalOpen(!isPortfolioModalOpen)
    }
  }


  const modify_GetAround_as_database = (allGetAround, selectedGetAround) => {
    try {
      var new_array = [];
      allGetAround.map((item, index) => {
        if (getaroundFind(item.name, selectedGetAround)) {
          item.isSelected = true;
          new_array.push(item);
        } else {
          item.isSelected = false
          new_array.push(item);
        }
      });
      setGetAround(new_array);
    } catch (error) {
      console.log('modify_GetAround_as_database', error);
    }
  };
  const onpressPortfolioCross = () => {
    setIsPortfolioDeleteModal(!isPortfolioDeleteModal)
  }
  const getaroundFind = (val, selectedGetAround) => {
    const a = selectedGetAround.some(item => item == val);
    return a;
  };
  const modify_Languages_as_database = (allLang, selectedLanguage) => {
    try {
      let new_array = [];
      allLang.map((item, index) => {
        // console.log(item)
        if (languageFind(item.id, selectedLanguage)) {
          item.isSelected = true;
          new_array.push(item);
        } else {
          item.isSelected = false
          new_array.push(item);
        }
      });
      setAlllanguage(new_array);
    } catch (error) {
      console.log('modify_GetAround_as_database', error);
    }
  };
  const storeProfileData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@profiledata', jsonValue)
    } catch (error) {
      console.log("storeProfileData", error)
    }
  }
  const onpressCross = async (val) => {
    try {
      setispress(true)
      setmodalval(val)
    } catch (error) {
      console.log("onpressCross", error)
    }
  }
  const deleteCertificate = async (val) => {
    let data = {
      "id": modalval.id
    }
    let res = await axiosInstance.post("delete-certificate", data)
    // console.log(res.data)
    if (res.data.error) {
      Toast.show(res.data.error.meaning)
    } else {
      // Toast.show(res.data.result.meaning)
      removeCertificate_fromArr(modalval)
    }
  }
  const removeCertificate_fromArr = async (val) => {
    try {

      let old_certificateArr = user_Certificate
      let new_certificateArr = []

      old_certificateArr.map((item) => {
        if (val.id != item.id) {
          new_certificateArr.push(item)
        }
      })
      setUser_Certificate(new_certificateArr)
      setCertificateList(new_certificateArr)
      setispress(false)
    } catch (error) {
      console.log("removeCertificate_fromArr", error)
    }
  }
  const get_profileDetails = async () => {
    try {
      setLoader(true)
      let propsUserAllData = await AsyncStorage.getItem('propsUserAllData');
      let userAllData = JSON.parse(propsUserAllData);
      setStorageDataForEditProfile(userAllData.user)
      storeProfileData(userAllData.user);
      setUser_Certificate(userAllData.UserToCertificate)
      if (userAllData.user.about_me) {
        setAbout_meForEditProfile(userAllData.user.about_me)
      }
      if (userAllData.user.get_user_skill.length > 0) {
        modify_Skill_as_database(allSkill, userAllData.user.get_user_skill);
      }
      if (userAllData.user.get_around_by != null) {
        let g = JSON.parse(userAllData.user.get_around_by);
        modify_GetAround_as_database(getAround, g);
      }
      if (userAllData.user.get_language != null) {
        modify_Languages_as_database(alllanguage, userAllData.user.get_language);
      }
      setLoader(false);
      scrollToEnd()
    } catch (error) {
      setLoader(false)
      console.log('get_profileDetails', error);
    }
  };
  const isGet_profileDetailsLoad = () => {
    if (from != "SkillSelect") {
      get_profileDetails()
    }
  }
  useEffect(() => {
    isGet_profileDetailsLoad()
  }, [])
  const modify_Skill_as_database = (allskill, selectedSkill) => {
    try {
      var new_array = [];
      allskill.map((item, index) => {
        if (skillFind(item.id, selectedSkill)) {
          item.isSelected = true;
          new_array.push(item);
        } else {
          item.isSelected = false
          new_array.push(item);
        }
      });
      setAllSkill(new_array);
    } catch (error) {
      console.log('modify_Skill_as_database', error);
    }
  };
  const skillFind = (val, selectedSkill) => {
    const a = selectedSkill.some(item => item.get_skill.category_id == val);
    return a;
  };
  const languageFind = (val, selectedLanguage) => {
    const a = selectedLanguage.some(item => item.language_id == val);
    return a;
  };
  const isArrDataEmpty = val => {
    var count = 0;
    val.map(item => {
      if (item.isSelected) {
        ++count;
      }
    });
    return count > 0 ? true : false;
  };
  const selectprofileimage_gallery = () => {
    if (Platform.OS == 'android') {
      onpressUploadButton();
    }
    launchImageLibrary(
      { mediaType: 'photo', maxWidth: 250, maxHeight: 250 },
      response => {
        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        } else {
          if (Platform.OS == 'ios') {
            onpressUploadButton();
          }
          setSelectProfilegallaryForEditProfile(response.assets[0].uri);
          setProfile_pictureForEditProfile(response.assets[0]);
        }
      },
    );
  };
  const onpressUploadButton = () => {
    setFromWhereModal_profile(!fromWhereModal_profile);
  };
  const iscameraPermission = async () => {
    const permissionStatus = await androidCameraPermission();
    // console.log(permissionStatus)
    if (permissionStatus || Platform.OS == 'ios') {
      selectprofileimage_camera();
    } else {
      if (Platform.OS === 'ios') {
        Toast.show('Please give camera permission');
      } else {
        // Toast.show("Please give camera permission")
        Linking.openSettings();
      }
    }
  };
  const selectprofileimage_camera = () => {
    if (Platform.OS == 'android') {
      onpressUploadButton();
    }
    launchCamera(
      { mediaType: 'photo', maxWidth: 250, maxHeight: 250 },
      response => {
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
            setSelectProfilegallaryForEditProfile(response.assets[0].uri);
            setProfile_pictureForEditProfile(response.assets[0]);
          } else {
            if (Platform.OS === 'ios') {
              Toast.show('Please give camera permission');
            }
          }
        }
      },
    );
  };
  const ChoosefromWhereModal_profileImage = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={fromWhereModal_profile}
        onRequestClose={() => {
          onpressUploadButton();
        }}>
        <View style={{ flex: 1 }}>
          <Pressable
            onPressIn={onpressUploadButton}
            style={{
              flex: 3,
              backgroundColor: 'rgba(52,52,52,0.5)',
            }} />
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
                  onPressIn={selectprofileimage_gallery}
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
  const onpressUpdate = async () => {
    try {
      if (
        storageDataForEditProfile.profile_picture == null && selectProfilegallaryForEditProfile == undefined) {
        Toast.show('Please choose profile picture');
      } else {
        if (about_meForEditProfile.trim().length == 0) {
          Toast.show('say something about you!');
        } else {
          if (!isArrDataEmpty(alllanguage)) {
            Toast.show('Select Languages');
          } else {
            if (!isArrDataEmpty(allSkill)) {
              Toast.show('Select atleast 1 skill');
            } else {
              let getAroundvalue = [];
              let selectedLang = [];
              let selectedSkill = [];

              getAround.map(item => {
                if (item.isSelected) {
                  getAroundvalue.push(item.name);
                }
              });
              alllanguage.map((item, index) => {
                if (item.isSelected) {
                  selectedLang.push(item.id);
                }
              });
              allSkill.map((item, index) => {
                if (item.isSelected) {
                  selectedSkill.push(item.id);
                }
              });
              const finalFormData = new FormData();
              {
                if (profile_pictureForEditProfile.fileName == undefined) {
                  null;
                } else {
                  finalFormData.append('profile_picture', {
                    uri: profile_pictureForEditProfile.uri,
                    type: profile_pictureForEditProfile.type,
                    name: profile_pictureForEditProfile.fileName,
                  });
                }
              }
              finalFormData.append('about_me', about_meForEditProfile);
              finalFormData.append('lang', selectedLang.toString());
              finalFormData.append('skill', selectedSkill.toString());
              {
                if (getAroundvalue.length > 0) {
                  finalFormData.append('get_around_by', getAroundvalue.toString());
                }
              }
              const data = finalFormData;
              // console.log(data)
              finalApicall(data)
            }
          }
        }
      }
    } catch (error) {
      console.log("onpressUpdate", error)
    }
  };
  const finalApicall = async (val) => {
    try {
      setLoader(true)
      const res = await axiosInstance.post('update-edit-profile-info', val);
      // console.log(res.data)
      if (res.data.error) {
        setLoader(false)
        Toast.showWithGravity(res.data.error.meaning, Toast.LONG, Toast.BOTTOM);
      } else {
        setLoader(false)
        await AsyncStorage.setItem('isMyProfile', 'true');
        await AsyncStorage.removeItem('propsUserAllData')
        navigation.replace("MyProfile", { from: "SimpleEditProfile" });

        setAbout_meForEditProfile('')
        setStorageDataForEditProfile()
        setSelectProfilegallaryForEditProfile()
        setProfile_pictureForEditProfile('')

      }
    } catch (error) {
      setLoader(false)
      console.log('finalApicall_step2', error);
    }
  };
  const selectPortfolioImage_gallery = () => {
    if (Platform.OS == 'android') {
      onpressUploadButton_portfolio();
    }
    launchImageLibrary(
      { mediaType: 'photo', },
      response => {
        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        } else {
          if (Platform.OS == 'ios') {
            onpressUploadButton();
          }
          portfolioImages(response.assets[0]);
        }
      },
    );
  };
  const onpressUploadButton_portfolio = () => {
    setFromWhereModal_portfolio(!fromWhereModal_portfolio);
  };
  const iscameraPermission_portfolio = async () => {
    const permissionStatus = await androidCameraPermission();
    // console.log(permissionStatus)
    if (permissionStatus || Platform.OS == 'ios') {
      selectportfolioImage_camera();
    } else {
      if (Platform.OS === 'ios') {
        Toast.show('Please give camera permission');
      } else {
        // Toast.show("Please give camera permission")
        Linking.openSettings();
      }
    }
  };
  const selectportfolioImage_camera = () => {
    if (Platform.OS == 'android') {
      onpressUploadButton_portfolio();
    }
    launchCamera(
      { mediaType: 'photo' },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          if (response.assets) {
            if (Platform.OS == 'ios') {
              onpressUploadButton_portfolio();
            }
            portfolioImages(response.assets[0]);
          } else {
            if (Platform.OS === 'ios') {
              Toast.show('Please give camera permission');
            }
          }
        }
      },
    );
  };
  const ChoosefromWhereModal_portfolioImage = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={fromWhereModal_portfolio}
        onRequestClose={() => {
          onpressUploadButton_portfolio();
        }}>
        <View style={{ flex: 1 }}>
          <Pressable
            onPressIn={onpressUploadButton_portfolio}
            style={{
              flex: 3,
              backgroundColor: 'rgba(52,52,52,0.5)',
            }} />
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
                  onPressIn={iscameraPermission_portfolio}
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
                  onPressIn={selectPortfolioImage_gallery}
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
  const portfolioImages = (images) => {
    try {
      const imageData = new FormData();

      imageData.append("portfolio[]", {
        uri: images.uri,
        name: images.fileName,
        type: images.type
      });
      uploadPortFolioImages(imageData)

    } catch (error) {
      console.log("portfolioImages", error)
    }
  }
  const uploadPortFolioImages = async (portfolioImage) => {
    try {
      setLoader(true)
      const data = portfolioImage
      const res = await axiosInstance.post("edit-profile-portfolio-images-3", data)
      // console.log(res.data)

      if (res.data.result) {
        await AsyncStorage.setItem('isMyProfile', 'true');
        profile_Refresh()
      } else {
        setLoader(false)
        console.log(res.data.error)
      }
    } catch (error) {
      setLoader(false)
      console.log("uploadPortFolioImages", error)
    }
  }
  const deletePortfolioImage = async (val) => {
    try {
      onpressPortfolioCross()
      setLoader(true)
      const data = {
        "jsonrpc": "2.0",
        "params": {
          "id": val
        }
      }
      const res = await axiosInstance.post("delete-portfolio-image", data)

      // console.log(res.data)

      if (res.data.result) {
        await AsyncStorage.setItem('isMyProfile', 'true');
        profile_Refresh()
      } else {
        setLoader(false)
        console.log(res.data.error)
      }
    } catch (error) {
      console.log("deletePortfolioImage", error)
    }
  }
  const profile_Refresh = async () => {
    try {
      setLoader(true)
      const res = await axios.post(`${axiosUrl.URL}public-profile`, {
        jsonrpc: '2.0',
        params: {
          slug: userSlugName,
        },
      });

      // console.log(res.data.result.user.get_user_to_portfolio.length)

      if (res.data.result) {
        let userData = res.data.result.user
        setStorageDataForEditProfile(userData)
        storeProfileData(userData)
        setLoader(false);
      }
      scrollToEnd()
    } catch (error) {
      setLoader(false)
      console.log("profile_Refresh", error)
    }
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);
  const handleBackButtonClick = () => {
    navigation.navigate("MyProfile");
    setAbout_meForEditProfile('')
    setStorageDataForEditProfile()
    setSelectProfilegallaryForEditProfile()
    setProfile_pictureForEditProfile('')
    return true;
  }


  const PortfolioImageModal = ({ imageUrl, item }) => {
    return (
      <Modal
        transparent
        visible={isPortfolioModalOpen}
        onRequestClose={onpressPortfolioImage}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.9)" }} >
          <View style={{ flex: 1 }} >
            <Image source={{ uri: ImageLink.portfolio + imageUrl }} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: Normalize(5) }} >
            <Button name={"Back"} onPress={onpressPortfolioImage} style={{ backgroundColor: Colors.primary, height: Normalize(40), width: "48%" }} />
            <Button name={"Delete"}
              onPress={() => {
                setTempPortfolioDeleteID(item.id)
                onpressPortfolioImage()
                onpressPortfolioCross()
              }}
              style={{ backgroundColor: Colors.secondary, height: Normalize(40), width: "48%" }} />
          </View>
        </View>
      </Modal>
    )
  }


  const sortTransport = (val) => {

    let new_array = []

    val.map((item, index) => {
      if (item.isSelected) {
        new_array.push(item.id);
      }
    });
    return new_array;
  }

  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1 }}>
      <View style={[styles.container, { backgroundColor: Colors.grayf8 }]}>
        <Header
          backFunc={handleBackButtonClick}
          navigation={navigation}
          back
          name={"Edit Profile"}
        />
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false} >
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.grayf8
              }}>
              {/* name and profile pic */}
              <View style={{ height: Normalize(10), width: "100%", backgroundColor: Colors.primary }} />
              <View style={{
                width: width,
                height: Normalize(100),
                backgroundColor: Colors.primary,
                flexDirection: "row",
                alignItems: "center",
              }}>
                {/* profile picture */}
                <View style={{ height: Normalize(90), width: Normalize(90), marginHorizontal: Normalize(10) }} >
                  <View style={{ height: "100%", width: "100%", borderRadius: Normalize(7), backgroundColor: Colors.white, overflow: "hidden" }} >
                    {
                      storageDataForEditProfile != null ? (
                        storageDataForEditProfile.profile_picture != null ||
                          selectProfilegallaryForEditProfile != undefined ? (
                          <Image
                            source={
                              selectProfilegallaryForEditProfile != undefined
                                ? { uri: selectProfilegallaryForEditProfile }
                                : {
                                  uri: `${ImageLink.ProfilePhoto}${storageDataForEditProfile.profile_picture}`,
                                }
                            }
                            style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                          />
                        ) : (
                          <Image
                            source={{ uri: ImageLink.BlankProfileImage }}
                            style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                          />
                        )
                      ) : (
                        <Image
                          source={{ uri: ImageLink.BlankProfileImage }}
                          style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                        />
                      )}
                  </View>
                  <Pressable onPress={onpressUploadButton} style={{
                    height: Normalize(21),
                    width: Normalize(21),
                    borderRadius: Normalize(21) / 2,
                    position: "absolute",
                    bottom: -Normalize(5),
                    right: -Normalize(5),
                    borderColor: Colors.secondary,
                    justifyContent: "center", alignItems: "center",
                    backgroundColor: Colors.white,
                    borderWidth: 1
                  }} >
                    <Ionicons
                      name={"ios-camera"}
                      color={Colors.secondary}
                      size={Normalize(14)}
                    />
                  </Pressable>
                </View>
                {fromWhereModal_profile && (
                  <ChoosefromWhereModal_profileImage />
                )}

                <View style={{ flex: 1, marginRight: Normalize(10) }} >
                  <Text style={[globalstyles.plantext_bold, { color: Colors.white, fontSize: Normalize(16), marginBottom: Normalize(1) }]}>{nameShorting(profileData.fname + " " + profileData.lname)}</Text>


                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: Normalize(4) }} >
                    <View style={{ height: Normalize(16), width: Normalize(16), borderRadius: Normalize(16) / 2 }} >
                      <Image
                        source={accountStatus(profileData.be_a_fixer_approval)[1]}
                        style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                      />
                    </View>
                    <Text style={[globalstyles.plantext_bold, { color: Colors.white, fontSize: Normalize(12), paddingLeft: Normalize(4) }]}>{accountStatus(profileData.be_a_fixer_approval)[0]}</Text>
                  </View>
                  {profileData.be_a_fixer_approval != "accepted" &&
                    <Pressable
                      onPress={() => navigation.navigate("BasicInfo_intro")}
                      style={{ paddingVertical: Normalize(6), width: Normalize(130), borderRadius: Normalize(9), backgroundColor: Colors.white, justifyContent: "center", alignItems: "center" }} >
                      <Text style={[globalstyles.plantext_bold, { color: Colors.primary, fontSize: Normalize(12) }]}>Become a Eazypayer</Text>
                    </Pressable>}

                </View>

              </View>

              {/* About section */}
              <View style={{ width: width, height: Normalize(150), alignItems: "center" }} >
                <View style={{ height: "40%", width: "100%", backgroundColor: Colors.primary }} ></View>
                <View style={{ paddingTop: Normalize(10), paddingHorizontal: Normalize(8), backgroundColor: Colors.white, height: Normalize(130), width: width * 0.9, borderColor: Colors.boxBorder, borderWidth: Normalize(1), borderRadius: Normalize(8), position: "absolute", top: Normalize(10), overflow: "hidden" }} >
                  <Text style={[styles.newBoxTitle, { paddingBottom: Normalize(0) }]}>{strings.BASICINFO.ABOUTME}</Text>

                  <View style={{ height: "79%", width: "100%", justifyContent: "flex-end" }} >
                    <TextInput
                      multiline
                      placeholder={"Please write a small introduction about yourself"}
                      placeholderTextColor={Colors.lightGrey}
                      style={{ color: Colors.greyText, height: "94%", width: "100%", borderRadius: Normalize(8), textAlignVertical: "top", padding: Normalize(5), borderColor: Colors.disableText, borderWidth: Normalize(1) }}
                      value={about_meForEditProfile}
                      keyboardType="default"
                      autoCapitalize="words"
                      onChangeText={e => setAbout_meForEditProfile(e)}
                    />
                  </View>
                </View>
              </View>

              {/* Certified Qualifications */}

              <View style={[styles.borderwithpaddingForeditpage, { backgroundColor: Colors.white }]} >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                  <Text style={styles.newBoxTitle}>
                    Certified Qualifications
                  </Text>
                  <Pressable
                    onPress={() => navigation.navigate("CertificatedSelection")}
                    style={{ height: Normalize(16), width: Normalize(16), backgroundColor: Colors.primary, borderRadius: Normalize(16) / 2, justifyContent: "center", alignItems: "center" }} >
                    <AntDesign
                      name="plus"
                      size={Normalize(12)}
                      color={Colors.white}
                    />
                  </Pressable>
                </View>
                {
                  user_Certificate.length > 0 ?
                    user_Certificate.map((item, index) => (
                      item.is_verify != "N" &&
                      <View key={index} style={{ width: "100%", paddingVertical: Normalize(4), flexDirection: "row", alignItems: "center" }} >
                        <View style={{ height: Normalize(15), width: Normalize(15), borderRadius: Normalize(15) / 2 }} >
                          <Image source={images.greycross_new} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                        </View>
                        <View style={{ flex: 1 }} >
                          <Text numberOfLines={1} style={{
                            fontSize: Normalize(12),
                            color: Colors.greyText,
                            fontFamily: fontfmliy.regular,
                            paddingHorizontal: Normalize(12)
                          }} >{item.qualification_title}</Text>
                        </View>
                        <Pressable
                          onPress={() => onpressCross(item)}
                        >
                          <MaterialIcons
                            name={"cancel"}
                            color={Colors.secondary}
                            size={Normalize(16)}
                          />
                        </Pressable>
                      </View>
                    ))
                    :
                    <Text style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(5) }]} >E.G Certifications,Degrees or Business Registertions</Text>
                }
              </View>

              {/* Langauge */}
              <View style={[styles.borderwithpaddingForeditpage, { backgroundColor: Colors.white }]} >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                  <Text style={styles.newBoxTitle}>
                    {strings.MYPROFILE.LANGUAGE}
                  </Text>
                  <Pressable
                    onPress={() => navigation.navigate("LanguageSelect")} style={{ height: Normalize(16), width: Normalize(16), backgroundColor: Colors.primary, borderRadius: Normalize(16) / 2, justifyContent: "center", alignItems: "center" }} >
                    <EvilIcons
                      name="pencil"
                      size={Normalize(12)}
                      color={Colors.white}
                    />
                  </Pressable>
                </View>
                {isArrDataEmpty(alllanguage) ?
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }} >
                    {alllanguage.map(
                      (item, index) =>
                        item.isSelected && (
                          <View
                            key={index}
                            style={styles.smallBox}>
                            <Text
                              style={styles.smallBoxText}>
                              {item.language}
                            </Text>
                          </View>
                        ))}
                  </View>
                  :
                  <Text style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(5) }]} >What languages do you speak?</Text>
                }
              </View>
              {/* Portfolio section */}

              <View>
                <View style={[styles.borderwithpaddingForeditpage, { backgroundColor: Colors.white }]} >
                  <Text style={styles.newBoxTitle}>
                    {strings.MYPROFILE.PORTFOLIO}
                  </Text>
                  <Text style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(0) }]}>Press below to add examples of your past work</Text>
                  {
                    <FlatList
                      ref={scrollRef}
                      data={storageDataForEditProfile != undefined ? storageDataForEditProfile.get_user_to_portfolio : []}
                      style={{ marginVertical: Normalize(10) }}
                      horizontal={true}
                      renderItem={({ item, index }) => (
                        item.portfolio_status != "rejected" &&
                        <Pressable
                          onPress={() => {
                            setPortfolioOpenImageUrl(item.image)
                            setIsPortfolioModalOpen(true)
                          }}
                          key={index} style={{ width: Normalize(95), height: Normalize(100), backgroundColor: Colors.grayf5, marginRight: width * 0.025, borderRadius: 8, overflow: "hidden", borderWidth: 1, borderColor: Colors.boxBorder }}>
                          <Image source={{ uri: ImageLink.portfolio + item.image }} style={{ height: "100%", width: "100%", resizeMode: "cover", opacity: item.portfolio_status == "awaiting_approval" ? 0.4 : 1 }} />
                          {
                            item.portfolio_status == "awaiting_approval" &&
                            <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center", position: "absolute" }} >
                              <Text style={{
                                fontFamily: fontfmliy.bold,
                                color: Colors.primary,
                                fontSize: Normalize(12),
                              }} >Pending</Text>
                            </View>}

                          <Pressable
                            onPress={() => {
                              setTempPortfolioDeleteID(item.id)
                              onpressPortfolioCross()
                            }}
                            style={{ position: "absolute", right: Normalize(2), top: Normalize(2) }} >
                            <View style={{ height: Normalize(18), width: Normalize(18), borderRadius: Normalize(18) / 2, backgroundColor: Colors.red_old, justifyContent: "center", alignItems: "center" }} >
                              <Entypo
                                name="cross"
                                size={Normalize(15)}
                                color={Colors.white}
                              />
                            </View>
                          </Pressable>
                          {isPortfolioModalOpen && portfolioOpenImageUrl == item.image &&
                            <PortfolioImageModal imageUrl={portfolioOpenImageUrl} item={item} />
                          }
                        </Pressable>
                      )}
                      ListFooterComponent={() => {
                        return (
                          <Pressable
                            onPress={onpressUploadButton_portfolio}
                            style={{ backgroundColor: Colors.secondaryBackground, width: Normalize(95), height: Normalize(100), marginRight: width * 0.025, borderRadius: 8, overflow: "hidden", justifyContent: "center", alignItems: "center" }}>
                            <View style={{ width: Normalize(40), height: Normalize(40), backgroundColor: Colors.secondaryBorder, borderRadius: Normalize(5), justifyContent: "center", alignItems: "center" }}>
                              <MaterialCommunityIcons
                                name="image-plus"
                                size={Normalize(20)}
                                color={Colors.white}
                              />
                            </View>
                            <Text style={[globalstyles.plantext_outfit_regular, { fontSize: Normalize(9), color: "#4D4E50", marginTop: Normalize(2) }]}>Add New</Text>
                          </Pressable>
                        )
                      }}
                      keyExtractor={item => item.id}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                    />
                  }
                </View>
                {fromWhereModal_portfolio && (
                  <ChoosefromWhereModal_portfolioImage />
                )}

                {isPortfolioDeleteModal &&
                  <WarningPage
                    onPress={onpressPortfolioCross}
                    ispress={isPortfolioDeleteModal}
                    warningTitle={"Delete Image"}
                    warningSubTitle={'Are you Sure you want to delete this image?'}
                    okOnpress={() => deletePortfolioImage(tempPortfolioDeleteID)}
                    cancelOnpress={onpressPortfolioCross}
                  />
                }

              </View>

              {/* Transportation */}

              <View style={[styles.borderwithpaddingForeditpage, { backgroundColor: Colors.white }]} >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                  <Text style={styles.newBoxTitle}>
                    {strings.MYPROFILE.GETAROUNDBY}
                  </Text>
                  <Pressable
                    onPress={() => navigation.navigate("TransPortSelect", { prevSelected: sortTransport(getAround) })}
                    style={{ height: Normalize(16), width: Normalize(16), backgroundColor: Colors.primary, borderRadius: Normalize(16) / 2, justifyContent: "center", alignItems: "center" }} >
                    <EvilIcons
                      name="pencil"
                      size={Normalize(12)}
                      color={Colors.white}
                    />
                  </Pressable>
                </View>
                {isArrDataEmpty(getAround) ?
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }} >
                    {getAround.map(
                      (item, index) =>
                        item.isSelected && (
                          <View
                            key={index}
                            style={styles.smallBox}>
                            <Text
                              style={styles.smallBoxText}>
                              {item.name}
                            </Text>
                          </View>
                        )
                    )}
                  </View>
                  :
                  <Text style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(5) }]}>What vechical do you own/drive?</Text>
                }
              </View>

              {/* Skills section */}
              <View style={[styles.borderwithpaddingForeditpage, { backgroundColor: Colors.white }]} >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                  <Text style={styles.newBoxTitle}>
                    {strings.MYPROFILE.SKILLS}
                  </Text>

                  <Pressable
                    onPress={() => navigation.navigate("SkillSelect", { from: "SimpleEditProfile" })} style={{ height: Normalize(16), width: Normalize(16), backgroundColor: Colors.primary, borderRadius: Normalize(16) / 2, justifyContent: "center", alignItems: "center" }} >
                    <EvilIcons
                      name="pencil"
                      size={Normalize(12)}
                      color={Colors.white}
                    />
                  </Pressable>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {isArrDataEmpty(allSkill) ?
                    allSkill.map(
                      (item, index) =>
                        item.isSelected && (
                          <View
                            key={index}
                            style={styles.smallBox}>
                            <Text
                              style={styles.smallBoxText}>
                              {item.name}
                            </Text>
                          </View>
                        ))
                    : <Text style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(5) }]} >Please list your skills you would like to offer</Text>
                  }
                </View>
              </View>
            </View>
          </ScrollView>
          <Button
            onPress={onpressUpdate}
            name={"Update"}
            style={{ marginHorizontal: Normalize(15), marginBottom: Normalize(5), marginTop: Normalize(3) }}
          />
          {
            loader && <NewLoaderPage />
          }
        </View>
      </View>

      <Modal
        visible={ispress}
        onRequestClose={() => setispress(false)}
        animationType="fade"
        transparent
      >
        <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", justifyContent: "center", alignItems: "center" }} >
          <View style={{ padding: Normalize(20), width: "80%", backgroundColor: Colors.white, elevation: 10, borderRadius: Normalize(8) }} >

            <Fragment>
              <View style={{ alignItems: "center" }}>
                <View style={{
                  height: Normalize(60), width: Normalize(60), backgroundColor: Colors.white, marginTop: Normalize(-50),
                  borderRadius: Normalize(30), alignItems: 'center', justifyContent: 'center'
                }}>
                  <View style={{
                    height: Normalize(50), width: Normalize(50), backgroundColor: 'red',
                    borderRadius: Normalize(25), alignSelf: 'center', justifyContent: 'center', alignItems: 'center'
                  }} >
                    <FontAwesome
                      name="trash"
                      size={Normalize(30)}
                      color={Colors.white}
                    />
                    {/* <Image source={images.de} style={{ height: "50%", width: "50%", resizeMode: "contain" ,alignSelf:'center'}} /> */}
                  </View>
                </View>
                <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(14), marginTop: Normalize(15), fontFamily: "Lato-Bold" }]}>Delete Qualification</Text>
                <Text style={[globalStyle_esyPay.detailsText, {
                  fontSize: Normalize(13), marginVertical: Normalize(15),
                  marginHorizontal: Normalize(20), textAlign: 'center'
                }]}>Are you sure you want to delete this qualification?</Text>
              </View>
              <Button2
                onPress={deleteCertificate}
                name={"Delete"}
              />
            </Fragment>



          </View>
          <TouchableOpacity
            onPress={() => setispress(false)}
            style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.white, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(10) }} >
            <Entypo name="cross" color={Colors.textinput_inner_text} size={Normalize(35)} />
          </TouchableOpacity>
        </View>
      </Modal>

    </SafeAreaView >

  );
}

export default withRtl(SimpleEditProfile);


