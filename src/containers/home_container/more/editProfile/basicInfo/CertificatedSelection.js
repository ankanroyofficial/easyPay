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
    Keyboard,
    KeyboardAvoidingView,
    Linking,
    BackHandler,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { withRtl } from 'react-native-easy-localization-and-rtl';
import { Colors } from '../../../../../constants/colors';
import images from '../../../../../constants/images';
import Normalize from '../../../../../helpers/Dimens';
import Header from '../../../../../components/Header';
import styles from './Styles';
import Button from '../../../../../components/Button';
import { myContext } from '../../../../../constants/ContextApi';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyle_esyPay from '../../../../../constants/globalStyles/GlobalStyle_esyPay';
import NewLoaderPage from '../../../../../components/NewLoaderPage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { androidCameraPermission } from '../../../../../constants/permissions/Permissions';
function CertificatedSelection({ navigation }) {
    const {
        setUser_Certificate
    } = useContext(myContext);
    const [loader, setLoader] = useState(false);
    const [qualificationTitle, setQualificationTitle] = useState('');
    const [qualificationIsFocused, setQualificationIsFocused] = useState(false);
    const [experienceYr, setExperienceYr] = useState('');
    const [experienceYrIsFocused, setExperienceYrIsFocused] = useState(false);
    const [experienceDetails, setExperienceDetails] = useState('');
    const [experienceDetailsIsFocused, setEexperienceDetailsIsFocused] = useState(false);
    const [fromWhereModal_profile, setFromWhereModal_profile] = useState(false);
    const [image1_uri, setImage1_uri] = useState("");
    const [image2_uri, setImage2_uri] = useState("");
    const [image3_uri, setImage3_uri] = useState("");
    const [image1_details, setImage1_details] = useState(null);
    const [image2_details, setImage2_details] = useState(null);
    const [image3_details, setImage3_details] = useState(null);
    const [whichImage, setWhichImage] = useState("");
    const [ispress, setispress] = useState(false);
    const check_Valid_no = (val) => {
        return parseInt(val) == val
    }
    const onpressSave_Continue_Button = () => {
        try {
            if (qualificationTitle == "") {
                Toast.show("Enter your qualification Title")
            } else {
                if (image1_uri == "" && image2_uri == "" && image3_uri == "") {
                    Toast.show("Please add a scan of your qualification")
                } else {
                    if (experienceYr == "") {
                        Toast.show("Enter years of experience")
                    } else {
                        if (experienceDetails == "") {
                            Toast.show("Enter your information")
                        } else {

                            if (!check_Valid_no(experienceYr)) {
                                Toast.show("Enter a valid experience year")
                            } else {
                                let finalFormData = new FormData();
                                finalFormData.append('qualification_title', qualificationTitle);
                                finalFormData.append('years_of_experience', parseInt(experienceYr));
                                finalFormData.append('more_information', experienceDetails);
                                {
                                    if (image1_details != null) {
                                        finalFormData.append('image1', {
                                            uri: image1_details.uri,
                                            type: image1_details.type,
                                            name: image1_details.fileName,
                                        });
                                    }
                                }
                                {
                                    if (image2_details != null) {
                                        finalFormData.append('image2', {
                                            uri: image2_details.uri,
                                            type: image2_details.type,
                                            name: image2_details.fileName,
                                        });
                                    }
                                }
                                {
                                    if (image3_details != null) {
                                        finalFormData.append('image3', {
                                            uri: image3_details.uri,
                                            type: image3_details.type,
                                            name: image3_details.fileName,
                                        });
                                    }
                                }
                                let data = finalFormData;
                                finalApicall_certificate(data)
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.log("onpressSave_Continue_Button", error)
        }
    };
    const finalApicall_certificate = async (val) => {
        try {
            setLoader(true)
            const res = await axiosInstance.post('save-certificate', val);
            // console.log(res.data.result.certificate)
            if (res.data.error) {
                setLoader(false)
                Toast.show(res.data.error.meaning);
                // console.log(res.data.error.meaning);
            } else {
                setLoader(false)
                setispress(true)
                // console.log(res.data.result.certificate)
                setUser_Certificate(res.data.result.certificate)
            }
        } catch (error) {
            setLoader(false)
            console.log('finalApicall_step2', error);
        }
    };
    const onpressVerify = () => {
        setispress(false)
        navigation.goBack()
    };
    const selectprofileimage_gallery = () => {
        if (Platform.OS == 'android') {
            onpressSelectionMOdalOff();
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
                        onpressSelectionMOdalOff();
                    }
                    whichImageActive(response.assets[0])

                }
            },
        );
    };
    const onpressSelectionMOdalON = (val) => {
        setWhichImage(val)
        setFromWhereModal_profile(true);
    };
    const onpressSelectionMOdalOff = () => {
        setFromWhereModal_profile(false);
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
            onpressSelectionMOdalOff();
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
                            onpressSelectionMOdalOff();
                        }
                        whichImageActive(response.assets[0]);
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
                animationType="none"
                transparent={true}
                visible={fromWhereModal_profile}
                onRequestClose={onpressSelectionMOdalOff}>
                <View style={{ flex: 1 }}>
                    <Pressable
                        onPress={onpressSelectionMOdalOff}
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
    const whichImageActive = (val) => {
        try {
            if (whichImage == "1") {
                setImage1_uri(val.uri);
                setImage1_details(val);
            } else if (whichImage == "2") {
                setImage2_uri(val.uri);
                setImage2_details(val);
            } else if (whichImage == "3") {
                setImage3_uri(val.uri);
                setImage3_details(val);
            } else {
                setImage1_uri(val.uri);
                setImage1_details(val);
            }
        } catch (error) {
            console.log("whichImageActive", error)
        }
    }
    useEffect(() => {
        Keyboard.addListener('keyboardDidHide', () => {
            Keyboard.dismiss();
        })
    }, [])


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

        <SafeAreaView
            style={{
                backgroundColor: Colors.primary,
                flex: 1,
                flexDirection: 'column',
            }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={styles.container}>
                <Header backFunc={handleBackButtonClick} back name={'Submit Qualification'} navigation={navigation} />
                <View
                    style={[
                        globalstyles.container,
                        {
                            paddingHorizontal: Normalize(0)
                        },
                    ]}>


                        
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="always"
                    >

                        {/* qualification title */}
                        <View style={{  marginTop: Normalize(10), paddingHorizontal: Normalize(16) }}>
                            <Text style={globalStyle_esyPay.inputHeader}>Write a title for your qualification</Text>
                            <TextInput
                                placeholder="Enter title"
                                placeholderTextColor={Colors.textinput_placeholder}
                                style={[
                                    globalStyle_esyPay.input_noIcon,
                                    {
                                        borderBottomColor: qualificationIsFocused
                                            ? Colors.greyText
                                            : Colors.textinput_bottomBorder,
                                    },
                                ]}
                                value={qualificationTitle}
                                keyboardType="default"
                                autoCapitalize="words"
                                onChangeText={e => setQualificationTitle(e)}
                                onFocus={() => setQualificationIsFocused(true)}
                                onBlur={() => setQualificationIsFocused(false)}
                            />
                        </View>



                        {/* images */}

                        <View style={{ marginTop: Normalize(18) }}>
                            <Text style={[globalStyle_esyPay.inputHeader, { paddingHorizontal: Normalize(16) }]}>Submit high resolution scans of your certificate</Text>

                            <View style={{
                                height: Normalize(95),
                                width: "96%",
                                alignSelf: "center",
                                marginVertical: Normalize(7),
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }} >


                                {/* 1st image */}

                                <Pressable
                                    disabled={image1_uri != "" ? true : false}
                                    onPress={() => {
                                        onpressSelectionMOdalON("1")
                                    }} style={{ height: "100%", width: "31%", backgroundColor: "#ffead9", borderRadius: Normalize(10) }} >

                                    <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center", overflow: "hidden", borderRadius: Normalize(10) }} >
                                        {
                                            image1_uri == "" ?
                                                <View style={{ height: Normalize(45), width: Normalize(45), backgroundColor: "#ffb173", borderRadius: Normalize(10), justifyContent: "center", alignItems: "center" }} >
                                                    <MaterialCommunityIcons
                                                        name="image-edit"
                                                        size={Normalize(24)}
                                                        color={Colors.white}
                                                    />
                                                </View>
                                                :
                                                <Image
                                                    source={{ uri: image1_uri }}
                                                    style={[
                                                        styles.uploadBtnImg,
                                                        { resizeMode: 'cover' },
                                                    ]}
                                                />}
                                    </View>

                                    {image1_uri != "" &&
                                        <Pressable
                                            onPress={() => {
                                                setImage1_uri("")
                                                setImage1_details(null)
                                            }}
                                            style={{ height: Normalize(20), width: Normalize(20), borderRadius: Normalize(20) / 2, backgroundColor: Colors.crossRed, position: "absolute", top: -Normalize(8), right: -Normalize(8), justifyContent: "center", alignItems: 'center' }} >
                                            <Entypo
                                                name='cross'
                                                size={Normalize(15)}
                                                color={Colors.white}
                                            />
                                        </Pressable>
                                    }
                                </Pressable>




                                {/* 2nd image */}
                                <Pressable
                                    disabled={image2_uri != "" ? true : false}
                                    onPress={() => {
                                        onpressSelectionMOdalON("2")
                                    }} style={{ height: "100%", width: "31%", backgroundColor: "#ffead9", borderRadius: Normalize(10) }} >

                                    <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center", overflow: "hidden", borderRadius: Normalize(10) }} >
                                        {
                                            image2_uri == "" ?
                                                <View style={{ height: Normalize(45), width: Normalize(45), backgroundColor: "#ffb173", borderRadius: Normalize(10), justifyContent: "center", alignItems: "center" }} >
                                                    <MaterialCommunityIcons
                                                        name="image-edit"
                                                        size={Normalize(24)}
                                                        color={Colors.white}
                                                    />
                                                </View>
                                                :
                                                <Image
                                                    source={{ uri: image2_uri }}
                                                    style={[
                                                        styles.uploadBtnImg,
                                                        { resizeMode: 'cover' },
                                                    ]}
                                                />}
                                    </View>

                                    {image2_uri != "" &&
                                        <Pressable
                                            onPress={() => {
                                                setImage2_details(null)
                                                setImage2_uri("")
                                            }}
                                            style={{ height: Normalize(20), width: Normalize(20), borderRadius: Normalize(20) / 2, backgroundColor: Colors.crossRed, position: "absolute", top: -Normalize(8), right: -Normalize(8), justifyContent: "center", alignItems: 'center' }} >
                                            <Entypo
                                                name='cross'
                                                size={Normalize(15)}
                                                color={Colors.white}
                                            />
                                        </Pressable>
                                    }
                                </Pressable>


                                {/* 3rd image */}
                                <Pressable
                                    disabled={image3_uri != "" ? true : false}
                                    onPress={() => {
                                        onpressSelectionMOdalON("3")
                                    }} style={{ height: "100%", width: "31%", backgroundColor: "#ffead9", borderRadius: Normalize(10) }} >

                                    <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center", overflow: "hidden", borderRadius: Normalize(10) }} >
                                        {
                                            image3_uri == "" ?
                                                <View style={{ height: Normalize(45), width: Normalize(45), backgroundColor: "#ffb173", borderRadius: Normalize(10), justifyContent: "center", alignItems: "center" }} >
                                                    <MaterialCommunityIcons
                                                        name="image-edit"
                                                        size={Normalize(24)}
                                                        color={Colors.white}
                                                    />
                                                </View>
                                                :
                                                <Image
                                                    source={{ uri: image3_uri }}
                                                    style={[
                                                        styles.uploadBtnImg,
                                                        { resizeMode: 'cover' },
                                                    ]}
                                                />}
                                    </View>

                                    {image3_uri != "" &&
                                        <Pressable
                                            onPress={() => {
                                                setImage3_uri("")
                                                setImage3_details(null)
                                            }}
                                            style={{ height: Normalize(20), width: Normalize(20), borderRadius: Normalize(20) / 2, backgroundColor: Colors.crossRed, position: "absolute", top: -Normalize(8), right: -Normalize(8), justifyContent: "center", alignItems: 'center' }} >
                                            <Entypo
                                                name='cross'
                                                size={Normalize(15)}
                                                color={Colors.white}
                                            />
                                        </Pressable>
                                    }
                                </Pressable>

                            </View>


                            {fromWhereModal_profile &&
                                <ChoosefromWhereModal_profileImage />
                            }

                        </View>



                        {/* year of experience */}
                        <View style={{ marginTop: Normalize(18), paddingHorizontal: Normalize(16) }}>
                            <Text style={globalStyle_esyPay.inputHeader}>How many years experience do you have?</Text>
                            <TextInput
                                placeholder="Enter years of experience"
                                placeholderTextColor={Colors.textinput_placeholder}
                                style={[
                                    globalStyle_esyPay.input_noIcon,
                                    {
                                        borderBottomColor: experienceYrIsFocused
                                            ? Colors.greyText
                                            : Colors.textinput_bottomBorder,
                                    },
                                ]}
                                value={experienceYr}
                                keyboardType="number-pad"
                                onChangeText={e => setExperienceYr(e)}
                                onFocus={() => setExperienceYrIsFocused(true)}
                                onBlur={() => setExperienceYrIsFocused(false)}
                            />
                        </View>

                        {/* Experience details*/}
                        <View style={{ marginTop: Normalize(18), paddingHorizontal: Normalize(16) }}>
                            <Text style={globalStyle_esyPay.inputHeader}>Share with us more information about your experience.You can also insert links to support your submission.</Text>
                            <TextInput
                                placeholder={"Enter Information"}
                                style={[
                                    globalstyles.multiline_textinputStyle,
                                    {
                                        marginTop: Normalize(12),
                                        borderColor: experienceDetailsIsFocused
                                            ? Colors.primary
                                            : Colors.disable_textinput_border,
                                        backgroundColor: experienceDetailsIsFocused
                                            ? Colors.white
                                            : Colors.disable_textinput_background,
                                    },
                                ]}
                                value={experienceDetails}
                                multiline
                                keyboardType="default"
                                onChangeText={e => setExperienceDetails(e)}
                                onFocus={() => setEexperienceDetailsIsFocused(true)}
                                onBlur={() => setEexperienceDetailsIsFocused(false)}
                            />
                        </View>
                        {/* <View style={{ height: Normalize(10),}} /> */}
                        <Button
                            style={{
                                marginVertical: Normalize(20),
                                marginHorizontal: Normalize(16)
                            }}
                            onPress={onpressSave_Continue_Button}
                            name={"Submit"}
                        />
                    </ScrollView>

                    {
                    loader &&
                    <NewLoaderPage />
                }
                </View>
                
            </KeyboardAvoidingView>

            <Modal
                visible={ispress}
                onRequestClose={onpressVerify}
                animationType="none"
                transparent
            >
                <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", justifyContent: "center", alignItems: "center" }} >
                    <View style={{ paddingVertical: Normalize(20), width: "80%", backgroundColor: Colors.white, elevation: 10, borderRadius: Normalize(8) }} >

                        <Fragment>
                            <View style={{ alignItems: "center" }}>
                                <View style={{
                                    height: Normalize(60), width: Normalize(60), backgroundColor: Colors.white, marginTop: Normalize(-50),
                                    borderRadius: Normalize(30), alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <View style={{
                                        height: Normalize(50), width: Normalize(50), backgroundColor: Colors.secondary,
                                        borderRadius: Normalize(25), alignSelf: 'center', justifyContent: 'center', alignItems: 'center'
                                    }} >
                                        <Image source={images.white_tik} style={{ height: "50%", width: "50%", resizeMode: "contain", alignSelf: 'center' }} />
                                    </View>
                                </View>
                                <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(14), marginTop: Normalize(15), fontFamily: "Lato-Bold" }]}>Sent for review</Text>
                                <Text style={[globalStyle_esyPay.detailsText, {
                                    fontSize: Normalize(13), marginTop: Normalize(15),
                                    marginHorizontal: Normalize(20), textAlign: 'center'
                                }]}>Your documents have been sent to EazyPay's Communication Team for review</Text>
                                <Text style={[globalStyle_esyPay.detailsText, {
                                    fontSize: Normalize(13),
                                    marginHorizontal: Normalize(20), textAlign: 'center', marginTop: Normalize(10)
                                }]}>If your documents are accepted,your qualifications will be verified on your profile</Text>
                                <Text style={[globalStyle_esyPay.detailsText, {
                                    fontSize: Normalize(13), marginBottom: Normalize(15),
                                    marginHorizontal: Normalize(20), textAlign: 'center', marginTop: Normalize(10)
                                }]}>Your documents will be reviewed soon and we will come back to you shortly</Text>
                            </View>



                        </Fragment>



                    </View>
                    <TouchableOpacity
                        onPress={onpressVerify}
                        style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.white, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(10) }} >
                        <Entypo name="cross" color={Colors.textinput_inner_text} size={Normalize(35)} />
                    </TouchableOpacity>
                </View>
            </Modal>

        </SafeAreaView>

    );
}

export default withRtl(CertificatedSelection);

