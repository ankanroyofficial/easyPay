import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Pressable,
    Modal,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Platform,
    ActivityIndicator,
    Linking
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../../../../constants/colors'
import globalstyles from '../../../../../constants/globalStyles/Global_Styles'
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component'
import Normalize from './../../../../../helpers/Dimens';
import Button from '../../../../../components/Button'
import images from '../../../../../constants/images'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from "react-native-simple-toast";
import { androidCameraPermission } from '../../../../../constants/permissions/Permissions'
import { useContext } from 'react'
import { myContext } from '../../../../../constants/ContextApi'
import Header from '../../../../../components/Header'
import globalStyle_esyPay from '../../../../../constants/globalStyles/GlobalStyle_esyPay'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Dimensions } from 'react-native'
import { ImageLink } from '../../../../../constants/LinkPage'
import { testingText } from '../../../../../constants/TestingConstant'
import { fontfmliy } from '../../../../../components/WhichFontFamily'

const { height, width } = Dimensions.get("window")

export default function DocumentUpload({ navigation }) {

    const { document_selection, setDocument_selection,
        front_uri, setFront_uri,
        back_uri, setBack_uri,
        front_details, setFront_details,
        back_details, setBack_details,
        front_details_prev, setFront_details_prev,
        back_details_prev, setBack_details_prev,
    } = useContext(myContext)
    const [chooseDocumentModal_front, setChooseDocumentModal_front] = useState(false);
    const [fromWhereModal_profile, setFromWhereModal_profile] = useState(false);
    const [document_selection_temp, setDocument_selection_temp] = useState(document_selection)
    const [front_uri_temp, setFront_uri_temp] = useState(front_uri);
    const [back_uri_temp, setBack_uri_temp] = useState(back_uri);
    const [front_details_temp, setFront_details_temp] = useState(front_details);
    const [back_details_temp, setBack_details_temp] = useState(back_details);

    const [whichImage, setWhichImage] = useState("");

    const documentData = [
        {
            id: 1,
            "title": "National Identity Card/Driving Licence",
        },
        {
            id: 2,
            "title": "Passport",
        },
    ]
    const onpress_ChooseDocoment_front = () => {
        setChooseDocumentModal_front(!chooseDocumentModal_front)
    }
    const ChooseAnyoneDocument_front = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={chooseDocumentModal_front}
                onRequestClose={() => {
                    onpress_ChooseDocoment_front()
                }}
            >
                <Pressable
                    onPress={() => { onpress_ChooseDocoment_front() }}
                    style={{ flex: 1, backgroundColor: "rgba(52,52,52,0)", alignItems: "center", paddingHorizontal: Normalize(25) }} >
                    <View style={{ marginTop: Normalize(120), backgroundColor: Colors.white, justifyContent: "center", alignItems: "center", elevation: 5 }} >
                        <View style={{ paddingVertical: Normalize(13), paddingHorizontal: Normalize(10) }} >
                            {documentData.map((item, index) => (
                                <TouchableOpacity key={index}
                                    onPress={() => {
                                        clearData()
                                        setDocument_selection_temp(item.title)
                                        onpress_ChooseDocoment_front()
                                    }}
                                    style={{ alignItems: "center", paddingVertical: Normalize(5) }} >
                                    <Text style={[globalstyles.plantext_outfit_regular, { color: Colors.greyText, fontSize: Normalize(13) }]} >{item.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </Pressable>
            </Modal>
        )
    }
    const bulletPoint = [
        {
            id: 1,
            text: "Please take a whole photo of your I.D."
        },
        {
            id: 2,
            text: "Make sure there is no light reflection on your card (turn-off flash)"
        },
        {
            id: 3,
            text: "Make sure the images is focused and that there is nothing covering the information on the card"
        },
    ]


    const clearData = () => {
        setFront_uri_temp("")
        setBack_uri_temp("")
        setFront_details_temp(null)
        setBack_details_temp(null)
    }



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
    const ChoosefromWhereModal = () => {
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
    const imageFromapiORph = (val) => {
        if (val.length > 0) {
            let a = val.split("/")
            return a.length > 1 ? "phone" : "api"
        } else if (val.length == 0) {
            return "blank"
        }
    }
    const whichImageActive = (val) => {
        try {
            // console.log(val.uri);
            if (whichImage == "1") {
                setFront_uri_temp(val.uri);
                setFront_details_temp(val);
            } else if (whichImage == "2") {
                setBack_uri_temp(val.uri);
                setBack_details_temp(val);
            } else {
                setFront_uri_temp(val.uri);
                setFront_details_temp(val);
            }
        } catch (error) {
            console.log("whichImageActive", error)
        }
    }
    const whichImageDelete = (val) => {
        try {
            if (val == "1") {
                setFront_uri_temp("")
                setFront_details_temp(null)
            } else if (val == "2") {
                setBack_uri_temp("")
                setBack_details_temp(null)
            } else {
                setFront_uri_temp("")
                setFront_details_temp(null)
            }
        } catch (error) {
            console.log("whichImageActive", error)
        }
    }
    const onpressSave = () => {
        console.log("*********")
        if (document_selection_temp == "") {
            Toast.show("Please select I.D. Type")
        } else {
            if (document_selection_temp == "Passport") {
                if (front_uri_temp == "") {
                    Toast.show("Please upload an image of the front side of your passport")
                } else {
                    enteringValue()
                }
            } else {
                if (front_uri_temp == "" || back_uri_temp == "") {
                    Toast.show("Enter both images")
                } else {
                    enteringValue()
                }
            }
        }
    }

    const enteringValue = () => {
        setDocument_selection(document_selection_temp)
        setFront_uri(front_uri_temp)
        setBack_uri(back_uri_temp)
        setFront_details(front_details_temp)
        setBack_details(back_details_temp)
        navigation.goBack()
    }

    dummyNricImage = [
        {
            id: 1,
            images: images.nricFront
        },
        {
            id: 1,
            images: images.nricBack
        },
    ]
    dummyPassportImage = [
        {
            id: 1,
            images: images.passportFront
        }
    ]
    const whichImageArr = (val) => {
        if (val == "Passport") {
            return dummyPassportImage;
        } else {
            return dummyNricImage;
        }
    }

    const isDoctypeCanSelect = (front, back) => {


        // return false

        if (front != null || back != null) {
            // disable
            return true;
        } else {
            return false;
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1, backgroundColor: Colors.white }} >
                <Header back name={'Photo I.D.'} navigation={navigation} />
                <View style={globalstyles.container_only_padding} >
                    <View style={{ flex: 1 }} >
                        {/* document type selection box */}
                        <View style={{}} >

                            <ScrollView showsVerticalScrollIndicator={false} >
                                <Text style={[globalStyle_esyPay.inputHeader, {
                                    marginVertical: Normalize(10),
                                    textAlign: "left",
                                    fontSize: Normalize(13),
                                    lineHeight: Normalize(15)
                                }]}>Photo I.D.</Text>
                                <Pressable
                                    disabled={isDoctypeCanSelect(front_details_prev, back_details_prev)}
                                    onPress={() => onpress_ChooseDocoment_front()}
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
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                paddingVertical: Normalize(5),
                                                fontSize: Normalize(11.5),
                                                color: Colors.textinput_placeholder,
                                                fontFamily: fontfmliy.bold,
                                            }}>
                                            {document_selection_temp == "" ? "Choose any one" : document_selection_temp}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Entypo
                                            name={'chevron-small-down'}
                                            color={Colors.grey}
                                            size={Normalize(22)}
                                        />
                                    </View>
                                </Pressable>

                                {chooseDocumentModal_front && <ChooseAnyoneDocument_front />}


                                <Text style={[globalstyles.plantext_bold, { color: Colors.grey, fontSize: Normalize(12), marginVertical: Normalize(15) }]} >Please take a photo of your I.D. as shown below</Text>

                                {
                                    bulletPoint.map((item, index) => (
                                        <View key={index} style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: Normalize(8) }} >
                                            <FontAwesome
                                                name='circle'
                                                color={Colors.black}
                                                size={Normalize(12)}
                                                style={{ marginRight: Normalize(5), marginTop: Normalize(1) }}
                                            />
                                            <View style={{ flex: 1, justifyContent: "center" }} >
                                                <Text style={[globalStyle_esyPay.inputHeader, {
                                                    textAlign: "left",
                                                    lineHeight: Normalize(14),
                                                }]}>{item.text}</Text>
                                            </View>
                                        </View>))}

                                <View style={{ height: height * 0.12, flexDirection: "row" }} >
                                    {whichImageArr(document_selection_temp).map((item, index) => (
                                        <View key={index} style={{ height: "100%", width: width * 0.35, backgroundColor: Colors.grayf5, marginRight: Normalize(10), borderRadius: Normalize(5), overflow: "hidden" }} >
                                            <Image source={item.images} style={{ height: "100%", width: "100%", resizeMode: "stretch" }} />
                                        </View>
                                    ))}
                                </View>

                                <Text
                                    numberOfLines={1}
                                    style={[globalStyle_esyPay.inputHeader, {
                                        marginVertical: Normalize(10),
                                        textAlign: "left",
                                        fontSize: Normalize(13),
                                        lineHeight: Normalize(15)
                                    }]}>Images of {document_selection_temp != "" ? document_selection_temp : "I.D."}</Text>


                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} >

                                    <View style={{ marginRight: Normalize(15) }} >
                                        <Pressable

                                            disabled={front_uri_temp != "" ? true : false}
                                            onPress={() => {
                                                onpressSelectionMOdalON("1")
                                            }}


                                            style={{ height: height * 0.16, width: height * 0.16, borderColor: Colors.borderColor, borderWidth: Normalize(1), justifyContent: "center", alignItems: "center" }} >
                                            <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center", overflow: "hidden" }} >
                                                {
                                                    front_uri_temp == "" ?
                                                        <SimpleLineIcons
                                                            name='picture'
                                                            color={Colors.grey}
                                                            size={Normalize(25)}
                                                            style={{}}
                                                        />
                                                        :

                                                        imageFromapiORph(front_uri_temp) == "phone" ?
                                                            <Image
                                                                source={{ uri: front_uri_temp }}
                                                                style={{ height: "100%", width: "100%", resizeMode: 'cover' }}
                                                            />
                                                            :
                                                            <Image
                                                                source={{ uri: ImageLink.Document + front_uri_temp }}
                                                                style={{ height: "100%", width: "100%", resizeMode: 'cover' }}
                                                            />
                                                }
                                            </View>
                                            {imageFromapiORph(front_uri_temp) == "phone" &&
                                                <Pressable
                                                    onPress={() => {
                                                        whichImageDelete("1")
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
                                        <Text style={[globalStyle_esyPay.inputHeader, {
                                            marginTop: Normalize(10),
                                            textAlign: "left",
                                            fontSize: Normalize(13), color: Colors.grey
                                        }]}>Front</Text>
                                    </View>



                                    {
                                        document_selection_temp != "Passport" &&
                                        <View style={{}} >
                                            <Pressable

                                                disabled={back_uri_temp != "" ? true : false}
                                                onPress={() => {
                                                    onpressSelectionMOdalON("2")
                                                }}


                                                style={{ height: height * 0.16, width: height * 0.16, borderColor: Colors.borderColor, borderWidth: Normalize(1), justifyContent: "center", alignItems: "center" }} >
                                                <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center", overflow: "hidden" }} >
                                                    {
                                                        back_uri_temp == "" ?
                                                            <SimpleLineIcons
                                                                name='picture'
                                                                color={Colors.grey}
                                                                size={Normalize(25)}
                                                                style={{}}
                                                            />
                                                            :
                                                            imageFromapiORph(back_uri_temp) == "phone" ?
                                                                <Image
                                                                    source={{ uri: back_uri_temp }}
                                                                    style={{ height: "100%", width: "100%", resizeMode: 'cover' }}
                                                                />
                                                                :
                                                                <Image
                                                                    source={{ uri: ImageLink.Document + back_uri_temp }}
                                                                    style={{ height: "100%", width: "100%", resizeMode: 'cover' }}
                                                                />

                                                    }
                                                </View>
                                                {imageFromapiORph(back_uri_temp) == "phone" &&
                                                    <Pressable
                                                        onPress={() => {
                                                            whichImageDelete("2")
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
                                            <Text style={[globalStyle_esyPay.inputHeader, {
                                                marginTop: Normalize(10),
                                                textAlign: "left",
                                                fontSize: Normalize(13), color: Colors.grey
                                            }]}>Back</Text>
                                        </View>}


                                </View>
                                {(testingText.lastupdateDate).length > 0 && <Text style={{ textAlign: "center", color: Colors.green_new, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{testingText.lastupdateDate}</Text>}
                                {(testingText.text).length > 0 && <Text style={{ textAlign: "center", color: Colors.red_old, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{testingText.text}</Text>}
                                <Button
                                    onPress={onpressSave}
                                    name={"Save"}
                                    style={{ marginVertical: width * 0.05 }}
                                />

                            </ScrollView>
                        </View>
                        {fromWhereModal_profile &&
                            <ChoosefromWhereModal />
                        }

                    </View>
                </View >
            </View >
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    galleryorcamera_icon: {
        height: Normalize(75), width: Normalize(75), borderRadius: Normalize(75) / 2, backgroundColor: Colors.disable_textinput_background, marginBottom: Normalize(5), justifyContent: "center", alignItems: "center"
    }
})