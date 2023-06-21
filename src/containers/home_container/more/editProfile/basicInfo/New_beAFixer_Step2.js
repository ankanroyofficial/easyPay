import React, { useEffect, useRef, useState, useContext, Fragment } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Pressable,
    Modal,
    Platform,
    KeyboardAvoidingView,
    Linking,
    BackHandler,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { withRtl } from 'react-native-easy-localization-and-rtl';
import axios from 'axios';
import { Colors } from '../../../../../constants/colors';
import Normalize from '../../../../../helpers/Dimens';
import Header from '../../../../../components/Header';
import styles from './Styles';
import Button from '../../../../../components/Button';
import Button2 from '../../../../../components/Button2';
import strings from '../../../../../constants/lng/LocalizedStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderPage from '../../../../../components/LoaderPage';
import { myContext } from '../../../../../constants/ContextApi';
import { axiosUrl, ImageLink } from '../../../../../constants/LinkPage';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import globalStyle_esyPay from '../../../../../constants/globalStyles/GlobalStyle_esyPay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { androidCameraPermission } from '../../../../../constants/permissions/Permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import NewLoaderPage from '../../../../../components/NewLoaderPage';
import { fontfmliy } from '../../../../../components/WhichFontFamily';
import images from '../../../../../constants/images';
function New_beAFixer_Step2({ navigation }) {
    const {
        setAlllanguage, alllanguage,
        allSkill, setAllSkill,
        getAround, setGetAround,
        slugName,
        user_Certificate, setUser_Certificate,
        isNewbeAFixerStep2load, setIsNewbeAFixerStep2Load,
        storageData, setStorageData,
        beAFixerAbout_me, setBeAFixerAbout_me,
        beAFixerSelectProfilegallary, setBeAFixerSelectProfilegallary,
        beAFixerProfile_picture, setBeAFixerProfile_picture, getAround_temporary, setGetAround_temporary
    } = useContext(myContext);
    const [loader, setLoader] = useState(false);
    const [aboutIsFocused, setAboutIsFocused] = useState(false);
    const [fromWhereModal_profile, setFromWhereModal_profile] = useState(false);

    const [ispress, setispress] = useState(false);
    const [modalval, setmodalval] = useState(null);
    const onpressCross = async (val) => {
        try {
            setispress(true)
            setmodalval(val)
        } catch (error) {
            console.log("onpressCross", error)
        }
    }

    const onpressVerify = async (val) => {
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
            setispress(false)
        } catch (error) {
            console.log("removeCertificate_fromArr", error)
        }
    }
    const get_profileDetails = async () => {
        try {
            setLoader(true)
            setIsNewbeAFixerStep2Load(true)
            const data = await axios.post(`${axiosUrl.URL}public-profile`, {
                jsonrpc: '2.0',
                params: {
                    slug: `${slugName}`,
                },
            });
            // console.log(data.data.result.UserToCertificate)
            if (data.data.result.user) {
                let userData = data.data.result.user
                storeProfileData(userData);
                setUser_Certificate(data.data.result.UserToCertificate)
                if (userData.get_user_skill.length > 0) {
                    modify_Skill_as_database(allSkill, userData.get_user_skill);
                }
                if (userData.get_around_by != null) {
                    let g = JSON.parse(userData.get_around_by);
                    modify_GetAround_as_database(getAround, g);
                }
                if (userData.about_me) {
                    setBeAFixerAbout_me(userData.about_me)
                }

                if (userData.get_language != null) {
                    // let l = JSON.parse(userData.get_language);
                    modify_Languages_as_database(alllanguage, userData.get_language);
                }
                setLoader(false);
            }
            setLoader(false);
        } catch (error) {
            setLoader(false)
            console.log('reload_after_comeBack', error);
        }
    };
    const reload_after_comeBack = async () => {
        try {

            const data = await axios.post(`${axiosUrl.URL}public-profile`, {
                jsonrpc: '2.0',
                params: {
                    slug: `${slugName}`,
                },
            });

            // console.log(data.data.result.UserToCertificate)


            if (data.data.result.user) {
                let userData = data.data.result.user

                storeProfileData(userData);

                setBeAFixerAbout_me(userData.about_me)
                setUser_Certificate(data.data.result.UserToCertificate)
                if (userData.get_user_skill.length > 0) {
                    modify_Skill_as_database(allSkill, userData.get_user_skill);
                }
                if (userData.get_around_by != null) {
                    let g = JSON.parse(userData.get_around_by);
                    modify_GetAround_as_database(getAround, g);
                }

                if (userData.get_language != null) {
                    // let l = JSON.parse(userData.get_language);
                    modify_Languages_as_database(alllanguage, userData.get_language);
                }
            }
        } catch (error) {
            console.log('reload_after_comeBack', error);
        }
    };
    const storeProfileData = async value => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@profiledata', jsonValue);
        } catch (error) {
            console.log('storeProfileData', error);
        }
    };
    // useEffect(async () => {
    //     reload_after_comeBack();
    //     const willFocusSubscription = navigation.addListener('focus', () => {
    //         reload_after_comeBack();
    //     });
    //     return willFocusSubscription;
    // }, []);


    const isBothAreLoad = () => {
        if (!isNewbeAFixerStep2load) {
            get_profileDetails()
            getProfileData();
        }
    }
    useEffect(() => {
        isBothAreLoad()
        return () => {
            isBothAreLoad()
        }
    }, [])

    const getProfileData = async () => {
        // console.log("---------------------------")
        var data = {};
        try {
            let profiledata = await AsyncStorage.getItem('@profiledata');
            if (profiledata) {
                data = JSON.parse(profiledata);

                setStorageData(data);

            } else {
                console.log('no data');
            }
        } catch (error) {
            console.log('getProfileData---1', error);
        }
    };
    const onpress_getaround = val => {
        var old_category = getAround;
        var new_category = [];
        old_category.map((item, index) => {
            if (item.id == val.id) {
                item.isSelected = !item.isSelected;
                new_category.push(item);
            } else {
                new_category.push(item);
            }
        });
        setGetAround(new_category);
    };
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
    const getaroundFind = (val, selectedGetAround) => {
        const a = selectedGetAround.some(item => item == val);
        return a;
    };
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


    const modify_Languages_as_database = (allLang, selectedLanguage) => {
        try {
            let new_array = [];
            allLang.map((item, index) => {
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
    const languageFind = (val, selectedLanguage) => {
        const a = selectedLanguage.some(item => item.language_id == val);
        return a;
    };
    const onpress_language_name = val => {
        var old_category = alllanguage;
        var new_category = [];
        old_category.map((item, index) => {
            if (item.id == val.id) {
                item.isSelected = !item.isSelected;
                new_category.push(item);
            } else {
                new_category.push(item);
            }
        });
        setAlllanguage(new_category);
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
    const onpress_skill = val => {
        var old_category = allSkill;
        var new_category = [];
        old_category.map((item, index) => {
            if (item.id == val.id) {
                item.isSelected = !item.isSelected;
                new_category.push(item);
            } else {
                new_category.push(item);
            }
        });
        setAllSkill(new_category);
    };




    // profile picture section

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
                    setBeAFixerSelectProfilegallary(response.assets[0].uri);
                    setBeAFixerProfile_picture(response.assets[0]);
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
                        setBeAFixerSelectProfilegallary(response.assets[0].uri);
                        setBeAFixerProfile_picture(response.assets[0]);
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
    const onpressSave_Continue_Button = () => {
        try {
            if (
                storageData.profile_picture == null && beAFixerSelectProfilegallary == undefined) {
                Toast.show('Please choose profile picture');
            } else {
                if (beAFixerAbout_me.trim().length == 0) {
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
                                if (beAFixerProfile_picture.fileName == undefined) {
                                    null;
                                } else {
                                    finalFormData.append('profile_picture', {
                                        uri: beAFixerProfile_picture.uri,
                                        type: beAFixerProfile_picture.type,
                                        name: beAFixerProfile_picture.fileName,
                                    });
                                }
                            }
                            finalFormData.append('about_me', beAFixerAbout_me);
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
            console.log("onpressSave_Continue_Button", error)
        }
    };
    const finalApicall = async (val) => {
        try {

            // console.log(val)

            const res = await axiosInstance.post('new-profile-step2', val);
            // console.log(res.data)
            if (res.data.error) {
                Toast.showWithGravity(res.data.error.meaning, Toast.LONG, Toast.BOTTOM);
            } else {
                await AsyncStorage.setItem('isMyProfile', 'true');
                navigation.navigate('NewDocumentUploadPageWithSelfi');
            }
        } catch (error) {
            console.log('finalApicall_step2', error);
        }
    };
    const handleBackButtonClick = () => {
        navigation.navigate("BasicInfo")
        setIsNewbeAFixerStep2Load(false)
        return true;
    }
    useEffect(() => {
        const a = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            a.remove();
        };
    }, []);


    const sortseletedItem = (val) => {
        let oldArr = val;
        let newArr = [];
        oldArr.map(item => {
            if (item.isSelected) {
                newArr.push(item.id);
            }
        });
        return newArr
    }
    return (

        <SafeAreaView
            style={{
                backgroundColor: Colors.primary,
                flex: 1,
            }}>
            <Header back name={'Become a EazyPayer'} navigation={navigation} backFunc={handleBackButtonClick} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={styles.container}>
                <View
                    style={[
                        globalstyles.container,
                        {
                            marginTop: Normalize(10),
                        },
                    ]}>
                    <ScrollView
                        style={{}}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="always"
                    >
                        <Text style={[globalStyle_esyPay.inputHeader, {
                            // marginTop: Normalize(30),
                            marginBottom: Normalize(10),
                            textAlign: "left",
                            fontSize: Normalize(13),
                            lineHeight: Normalize(15),
                            fontFamily: fontfmliy.bold,
                            color: Colors.grey
                        }]}>Clients want to know who they're working with.{"\n"}Complete your profile to get more accepted offers!</Text>

                        {/* profile picture */}
                        <View style={{ marginTop: Normalize(18) }}>
                            <Text style={[globalStyle_esyPay.inputHeader, { fontSize: Normalize(13) }]}>Profile Picture</Text>
                            <Text style={[globalStyle_esyPay.inputHeader, { color: Colors.grey }]}>Add a profile to get more accepted affers!</Text>
                            <View style={{
                                height: Normalize(115),
                                width: Normalize(115),
                                backgroundColor: Colors.grayf5,
                                alignSelf: "center",
                                marginVertical: Normalize(25),
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: Normalize(115) / 2,
                            }} >
                                <View style={{
                                    height: "85%",
                                    width: "85%",
                                    backgroundColor: Colors.white,
                                    borderRadius: Normalize(100),
                                    justifyContent: "center",
                                    alignItems: "center",
                                    overflow: "hidden"
                                }} >
                                    {
                                        storageData != null ? (
                                            storageData.profile_picture != null ||
                                                beAFixerSelectProfilegallary != undefined ? (
                                                <Image
                                                    source={
                                                        beAFixerSelectProfilegallary != undefined
                                                            ? { uri: beAFixerSelectProfilegallary }
                                                            : {
                                                                uri: `${ImageLink.ProfilePhoto}${storageData.profile_picture}`,
                                                            }
                                                    }
                                                    style={[
                                                        styles.uploadBtnImg,
                                                        { resizeMode: 'cover' },
                                                    ]}
                                                />
                                            ) : (
                                                <Image
                                                    source={{ uri: ImageLink.BlankProfileImage }}
                                                    style={[
                                                        styles.uploadBtnImg,
                                                        { resizeMode: 'cover' },
                                                    ]}
                                                />
                                            )
                                        ) : (
                                            <Image
                                                source={{ uri: ImageLink.BlankProfileImage }}
                                                style={[styles.uploadBtnImg, { resizeMode: 'cover' }]}
                                            />
                                        )
                                    }
                                </View>
                                <Pressable onPress={onpressUploadButton} style={{
                                    height: Normalize(25),
                                    width: Normalize(25),
                                    borderRadius: Normalize(25) / 2,
                                    position: "absolute",
                                    bottom: Normalize(15),
                                    right: Normalize(0),
                                    borderColor: Colors.borderColor,
                                    justifyContent: "center", alignItems: "center",
                                    backgroundColor: Colors.white,
                                    borderWidth: 1
                                }} >
                                    <Ionicons
                                        name={"ios-camera"}
                                        color={Colors.secondary}
                                        size={Normalize(16)}
                                    />
                                </Pressable>
                            </View>
                            {fromWhereModal_profile && (
                                <ChoosefromWhereModal_profileImage />
                            )}
                        </View>

                        {/* About me */}
                        <View style={{ marginTop: Normalize(18) }}>
                            <Text style={globalStyle_esyPay.inputHeader}>{strings.BASICINFO.ABOUTME}</Text>
                            <Text style={[globalStyle_esyPay.inputHeader, { color: Colors.grey }]}>{strings.BASICINFO.ABOUTMEPLACEHOLDER}</Text>
                            <TextInput
                                multiline
                                placeholder={"Enter here"}
                                placeholderTextColor={Colors.lightGrey}
                                style={[
                                    globalStyle_esyPay.input_noIcon,
                                    {
                                        borderBottomColor: aboutIsFocused
                                            ? Colors.greyText
                                            : Colors.textinput_bottomBorder,
                                        paddingBottom: Normalize(20)
                                    },
                                ]}
                                value={beAFixerAbout_me}
                                keyboardType="default"
                                autoCapitalize="words"
                                onChangeText={e => setBeAFixerAbout_me(e)}
                                onFocus={() => setAboutIsFocused(true)}
                                onBlur={() => setAboutIsFocused(false)}
                            />
                        </View>


                        {/* languages */}
                        <View style={{ marginTop: Normalize(18) }}>
                            <Text style={globalStyle_esyPay.inputHeader}>
                                Languages
                            </Text>
                            <Pressable
                                onPress={() => navigation.navigate("LanguageSelect",{ prevSelected: sortseletedItem(alllanguage) })}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    borderBottomWidth: Normalize(1),
                                    borderBottomColor: Colors.textinput_bottomBorder,
                                }}>
                                <View
                                    style={{
                                        borderBottomColor: Colors.textinput_bottomBorder,
                                        borderBottomWidth: Normalize(1),
                                        paddingVertical: Normalize(7),
                                        height: '100%',
                                        borderBottomWidth: 0,
                                        width: '88%',
                                    }}>



                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {isArrDataEmpty(alllanguage) ?

                                            alllanguage.map(
                                                (item, index) =>
                                                    item.isSelected && (
                                                        <View
                                                            // onPress={() => onpress_language_name(item)}
                                                            key={index}
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                backgroundColor: Colors.secondaryboxBackground,
                                                                borderWidth: Normalize(0.5),
                                                                borderColor: Colors.secondary,
                                                                margin: Normalize(4),
                                                                borderRadius: Normalize(5),
                                                            }}>
                                                            <Text
                                                                style={{
                                                                    padding: Normalize(2),
                                                                    fontSize: Normalize(10),
                                                                    color: Colors.greyText,
                                                                    borderRadius: Normalize(3),
                                                                    margin: Normalize(3),
                                                                }}>
                                                                {item.language}
                                                            </Text>
                                                        </View>
                                                    ),
                                            )
                                            :
                                            <Text style={{
                                                paddingVertical: Normalize(5),
                                                fontSize: Normalize(11.5),
                                                color: Colors.lightGrey,
                                                fontFamily: fontfmliy.bold,
                                            }}>Select Languages</Text>
                                        }
                                    </View>
                                </View>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Entypo
                                        name={'chevron-small-right'}
                                        color={Colors.grey}
                                        size={Normalize(22)}
                                    />
                                </View>
                            </Pressable>
                        </View>


                        {/* Skill */}
                        <View style={{ marginTop: Normalize(18) }}>
                            <Text style={globalStyle_esyPay.inputHeader}>
                                Skills
                            </Text>
                            <Pressable
                                onPress={() => navigation.navigate("SkillSelect", { from: "New_beAFixer_Step2" })}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    borderBottomWidth: Normalize(1),
                                    borderBottomColor: Colors.textinput_bottomBorder,
                                }}>
                                <View
                                    style={{
                                        borderBottomColor: Colors.textinput_bottomBorder,
                                        borderBottomWidth: Normalize(1),
                                        paddingVertical: Normalize(7),
                                        height: '100%',
                                        borderBottomWidth: 0,
                                        width: '88%',
                                    }}>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {isArrDataEmpty(allSkill) ?
                                            allSkill.map(
                                                (item, index) =>
                                                    item.isSelected && (
                                                        <View
                                                            // onPress={() => onpress_skill(item)}
                                                            key={index}
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                backgroundColor: Colors.secondaryboxBackground,
                                                                borderWidth: Normalize(0.5),
                                                                borderColor: Colors.secondary,
                                                                margin: Normalize(4),
                                                                borderRadius: Normalize(5),
                                                            }}>
                                                            <Text
                                                                style={{
                                                                    padding: Normalize(2),
                                                                    fontSize: Normalize(10),
                                                                    color: Colors.greyText,
                                                                    borderRadius: Normalize(3),
                                                                    margin: Normalize(3),
                                                                }}>
                                                                {item.name}
                                                            </Text>
                                                        </View>
                                                    ),
                                            )
                                            :
                                            <Text style={{
                                                paddingVertical: Normalize(5),
                                                fontSize: Normalize(11.5),
                                                color: Colors.lightGrey,
                                                fontFamily: fontfmliy.bold,
                                            }}>Select Skills</Text>
                                        }
                                    </View>
                                </View>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Entypo
                                        name={'chevron-small-right'}
                                        color={Colors.grey}
                                        size={Normalize(22)}
                                    />
                                </View>
                            </Pressable>
                        </View>

                        {/* Certificate */}
                        <View style={{ marginTop: Normalize(18) }}>
                            <Pressable
                                onPress={() => navigation.navigate("CertificatedSelection")}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                <Text style={globalStyle_esyPay.inputHeader}>Certificated Qualification (Optional*)</Text>
                                <FontAwesome
                                    name={'plus-circle'}
                                    color={Colors.primary}
                                    size={Normalize(17)}
                                />
                            </Pressable>
                            <View>

                                {
                                    user_Certificate.length > 0 ?

                                        <View style={{ marginVertical: Normalize(8) }} >
                                            {user_Certificate.map((item, index) => (
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
                                            ))}
                                        </View>
                                        :
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={{
                                                borderBottomWidth: Normalize(1),
                                                borderBottomColor: Colors.textinput_bottomBorder,
                                            }}>
                                            <View
                                                style={{
                                                    borderBottomColor: Colors.textinput_bottomBorder,
                                                    borderBottomWidth: Normalize(1),
                                                    paddingVertical: Normalize(7),
                                                    borderBottomWidth: 0,
                                                    width: '88%',
                                                }}>
                                                <Text
                                                    style={{
                                                        paddingVertical: Normalize(5),
                                                        fontSize: Normalize(11.5),
                                                        color: Colors.lightGrey,
                                                        fontFamily: fontfmliy.bold,
                                                    }}>E.G. Certifications, Degrees or Business Registertions</Text>
                                            </View>
                                        </TouchableOpacity>
                                }

                            </View>

                        </View>

                        {/* Transport */}
                        <View style={{ marginTop: Normalize(18) }}>
                            <Text style={globalStyle_esyPay.inputHeader}>
                                Transport (Optional*)
                            </Text>
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("TransPortSelect", { prevSelected: sortseletedItem(getAround) })
                                }}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    borderBottomWidth: Normalize(1),
                                    borderBottomColor: Colors.textinput_bottomBorder,
                                }}>
                                <View
                                    style={{
                                        borderBottomColor: Colors.textinput_bottomBorder,
                                        borderBottomWidth: Normalize(1),
                                        paddingVertical: Normalize(7),
                                        height: '100%',
                                        borderBottomWidth: 0,
                                        width: '88%',
                                    }}>

                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {isArrDataEmpty(getAround) ?

                                            getAround.map(
                                                (item, index) =>
                                                    item.isSelected && (
                                                        <View
                                                            // onPress={() => onpress_getaround(item)}
                                                            key={index}
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                backgroundColor: Colors.secondaryboxBackground,
                                                                borderWidth: Normalize(0.5),
                                                                borderColor: Colors.secondary,
                                                                margin: Normalize(4),
                                                                borderRadius: Normalize(5),
                                                            }}>
                                                            <Text
                                                                style={{
                                                                    padding: Normalize(2),
                                                                    fontSize: Normalize(10),
                                                                    color: Colors.greyText,
                                                                    borderRadius: Normalize(3),
                                                                    margin: Normalize(3),
                                                                }}>
                                                                {item.name}
                                                            </Text>
                                                        </View>
                                                    ),
                                            )
                                            :
                                            <Text style={{
                                                paddingVertical: Normalize(5),
                                                fontSize: Normalize(11.5),
                                                color: Colors.lightGrey,
                                                fontFamily: fontfmliy.bold,
                                            }}>What veichle do you own/drive</Text>
                                        }
                                    </View>
                                </View>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Entypo
                                        name={'chevron-small-right'}
                                        color={Colors.grey}
                                        size={Normalize(22)}
                                    />
                                </View>
                            </Pressable>
                        </View>

                        <Text style={[globalStyle_esyPay.inputHeader, {
                            marginTop: Normalize(30),
                            marginBottom: Normalize(10),
                            textAlign: "center",
                            fontSize: Normalize(12),
                            lineHeight: Normalize(15)
                        }]}>*This can be added later from your profile</Text>
                        {/* save button */}
                        <Button
                            style={{
                                marginBottom: Normalize(10),
                            }}
                            nextarrow
                            // onPress={savecontinueButton}
                            onPress={onpressSave_Continue_Button}
                            name={"Next"}
                        />
                    </ScrollView>
                </View>
                {
                    loader &&
                    <NewLoaderPage />
                }
            </KeyboardAvoidingView>
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
                                onPress={onpressVerify}
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
        </SafeAreaView>

    );
}

export default withRtl(New_beAFixer_Step2);
