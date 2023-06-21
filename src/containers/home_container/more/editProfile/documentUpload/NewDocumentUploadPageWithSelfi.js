import { View, Text, ScrollView, Platform, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../../../../components/Header'
import { useNavigation } from '@react-navigation/native'
import Normalize from '../../../../../helpers/Dimens';
import globalStyle_esyPay from '../../../../../constants/globalStyles/GlobalStyle_esyPay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Colors } from '../../../../../constants/colors';
import Button from '../../../../../components/Button';
import { Pressable } from 'react-native';
import { androidCameraPermission } from '../../../../../constants/permissions/Permissions';
import { launchCamera } from 'react-native-image-picker';
import { Image } from 'react-native';
import { useContext } from 'react';
import { myContext } from '../../../../../constants/ContextApi';
import Entypo from 'react-native-vector-icons/Entypo';
import { width } from 'styled-system';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import Toast from "react-native-simple-toast";
import axiosInstance from '../../../../../constants/AxiosCallPage';
import NewLoaderPage from '../../../../../components/NewLoaderPage';
import axios from 'axios';
import { axiosUrl, ImageLink } from '../../../../../constants/LinkPage';
import { testingText } from '../../../../../constants/TestingConstant';
import { BackHandler } from 'react-native';
import { fontfmliy } from '../../../../../components/WhichFontFamily';
export default function NewDocumentUploadPageWithSelfi() {
    const navigation = useNavigation()
    const {
        slugName,
        document_selection, setDocument_selection,
        front_uri, setFront_uri,
        back_uri, setBack_uri,
        front_details, setFront_details,
        back_details, setBack_details,
        front_details_prev, setFront_details_prev,
        back_details_prev, setBack_details_prev,
    } = useContext(myContext)
    const bulletPoint = [
        {
            id: 1,
            text: "Upload a clear photo of a valid proof of identification which includes a picture of yourself.(If you choose an I.D. card, please upload a picture of both sides of the card)."
        },
        {
            id: 2,
            text: "Take a selfi without anything covering your face(e.g. Please remove sunglassess or hats)."
        },
        {
            id: 3,
            text: "Upload a professional picture of yourself in your profile and make sure it matchs your I.D. You might asked to show your I.D. during tasks."
        },
    ]
    const [selfie_uri, setSelfie_uri] = useState("");
    const [selfie_details, setSelfie_details] = useState(null);
    const [loader, setLoader] = useState(false);
    const get_prevImageDetails = async () => {
        try {
            setLoader(true)
            const data = await axios.post(`${axiosUrl.URL}public-profile`, {
                jsonrpc: '2.0',
                params: {
                    slug: `${slugName}`,
                },
            });
            // console.log("----------------", data.data.result.user_to_documents)
            if (data.data.result) {
                if (data.data.result.selfie_image != null) {
                    setSelfie_uri(data.data.result.selfie_image)
                }
                if ((data.data.result.user_to_documents).length > 0) {
                    let doc = data.data.result.user_to_documents
                    setDocument_selection(findPasswordOrNric(doc[0]))
                    if (doc.length == 2) {

                        if (doc[0].is_verify == "N" && doc[1].is_verify == "N") {
                            setFront_uri("")
                            setBack_uri("")
                            setFront_details(null)
                            setBack_details(null)
                            setFront_details_prev(null)
                            setBack_details_prev(null)
                        } else {
                            if (findFrontOrBack(doc[0]) == 'front') {
                                setFront_details_prev(doc[0])
                                setBack_details_prev(doc[1])
                                if (doc[0].is_verify != "N") {
                                    setFront_uri(doc[0].file_name)
                                }
                                if (doc[1].is_verify != "N") {
                                    setBack_uri(doc[1].file_name)
                                }
                            } else {
                                setFront_details_prev(doc[1])
                                setBack_details_prev(doc[0])
                                if (doc[1].is_verify != "N") {
                                    setFront_uri(doc[1].file_name)
                                }
                                if (doc[0].is_verify != "N") {
                                    setBack_uri(doc[0].file_name)
                                }
                            }
                        }
                    } else if (doc.length == 1) {

                        if (doc[0].is_verify != "N") {
                            setFront_uri(doc[0].file_name)
                        }
                        setFront_details_prev(doc[0])
                    }
                }
            }
            setLoader(false);
        } catch (error) {
            setLoader(false)
            console.log('get_prevImageDetails', error);
        }
    };
    useEffect(() => {
        get_prevImageDetails()
    }, [])
    const findFrontOrBack = (val) => {
        if (val.file_type == 1 || val.file_type == 3) {
            return "front";
        } else if (val.file_type == 4 || val.file_type == 6) {
            return "back";
        }
    }
    const findPasswordOrNric = (val) => {
        if (val.file_type == 1 || val.file_type == 4) {
            return "Passport";
        } else if (val.file_type == 3 || val.file_type == 6) {
            return "National Identity Card/Driving Licence";
        }
    }
    const iscameraPermission = async () => {
        const permissionStatus = await androidCameraPermission();
        console.log(permissionStatus)
        if (permissionStatus || Platform.OS == 'ios') {
            takingSelfie();
        } else {
            if (Platform.OS === 'ios') {
                Toast.show('Please give camera permission');
            } else {
                // Toast.show("Please give camera permission")
                Linking.openSettings();
            }
        }
    };
    const takingSelfie = () => {
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
                        setSelfie_details(response.assets[0]);
                        setSelfie_uri(response.assets[0].uri);
                        console.log(response.assets[0].uri);
                    } else {
                        if (Platform.OS === 'ios') {
                            Toast.show('Please give camera permission');
                        }
                    }
                }
            },
        );
    };
    const whichImageDelete = (val) => {
        try {
            if (val == "1") {
                setFront_uri("")
                setFront_details(null)
            } else if (val == "2") {
                setBack_uri("")
                setBack_details(null)
            }
        } catch (error) {
            console.log("whichImageActive", error)
        }
    }
    const onPressNext = () => {
        try {
            if (document_selection == "") {
                Toast.show("Please select I.D. Type")
            } {
                if (document_selection == "Passport") {
                    if (front_uri == "") {
                        Toast.show("Please upload an image of the front side of your passport")
                    } else {
                        if (selfie_uri == "") {
                            Toast.show("Please submit your Selfie")
                        } else {
                            howToNavigate()
                        }
                    }
                } else {
                    if (front_uri == "" || back_uri == "") {
                        Toast.show("Submit your I.D's both images")
                    } else {
                        if (selfie_uri == "") {
                            Toast.show("Please submit your Selfie")
                        } else {
                            howToNavigate()
                        }
                    }
                }
            }
        } catch (error) {
            console.log("onPressNext", error)
        }
    }
    const howToNavigate = () => {
        if (isnavigateTO(front_details_prev, back_details_prev)) {
            // console.log(front_details_prev,back_details_prev)
            navigation.navigate("BecomeTasker_Agree", { imageFormData: "" })
        } else {
            if (front_details_prev == null && back_details_prev == null) {
                finalApiCall_for_NewSubmition()
            } else {
                finalApiCall_for_RejectionSubmition()
            }
        }
    }
    const finalApiCall_for_NewSubmition = async () => {
        try {
            setLoader(true)
            let finalFormData = new FormData();
            finalFormData.append('file_type_front', document_selection == "Passport" ? "1" : "3");
            finalFormData.append('file_type_back', document_selection == "Passport" ? "4" : "6");
            finalFormData.append('file_front_id', "");
            finalFormData.append('file_back_id', "");

            if (front_details != null) {
                finalFormData.append('file_name_front', {
                    uri: front_details.uri,
                    type: front_details.type,
                    name: front_details.fileName,
                });
            }


            if (back_details != null) {
                finalFormData.append('file_name_back', {
                    uri: back_details.uri,
                    type: back_details.type,
                    name: back_details.fileName,
                });
            }
            if (selfie_details != null) {
                // console.log("cccccccccccccccccccc")
                finalFormData.append('image', {
                    uri: selfie_details.uri,
                    type: selfie_details.type,
                    name: selfie_details.fileName,
                });
            }
            let data = finalFormData
            // console.log(data)

            setLoader(false)
            navigation.navigate("BecomeTasker_Agree", { imageFormData: data })

        } catch (error) {
            setLoader(false)
            console.log("finalApiCall_for_NewSubmition", error)
        }
    }
    // console.log(front_details_prev)
    // console.log(back_details_prev)
    const finalApiCall_for_RejectionSubmition = async () => {
        try {
            setLoader(true)

            let finalFormData = new FormData();

            // if (front_details_prev != null) {
            //     finalFormData.append('file_type_front', front_details_prev.file_type);
            //     finalFormData.append('file_front_id', front_details_prev.id);
            // }



            // if (back_details_prev != null) {
            //     finalFormData.append('file_type_back', back_details_prev.file_type);
            //     finalFormData.append('file_back_id', back_details_prev.id);
            // }



            if (front_details_prev.is_verify == "N") {
                if (front_details != null) {

                    if (front_details_prev != null) {
                        finalFormData.append('file_type_front', front_details_prev.file_type);
                        finalFormData.append('file_front_id', front_details_prev.id);
                    }
        

                    finalFormData.append('file_name_front', {
                        uri: front_details.uri,
                        type: front_details.type,
                        name: front_details.fileName,
                    });
                }
            }
          
            if (back_details_prev != null) {
            if (back_details_prev.is_verify == "N") {
                if (back_details != null) {

                    if (back_details_prev != null) {
                        finalFormData.append('file_type_back', back_details_prev.file_type);
                        finalFormData.append('file_back_id', back_details_prev.id);
                    }

                    finalFormData.append('file_name_back', {
                        uri: back_details.uri,
                        type: back_details.type,
                        name: back_details.fileName,
                    });
                }
            }
        }


            let data = finalFormData
            // console.log(data)
            navigation.navigate("BecomeTasker_Agree", { imageFormData: data })
            setLoader(false)
        } catch (error) {
            setLoader(false)
            console.log("finalApiCall_for_RejectionSubmition", error)
        }
    }
    const imageFromapiORph = (val) => {
        let a = val.split("/")
        return a.length > 1 ? "phone" : "api"
    }








    const isnavigateTO = (front, back) => {

        let f = false;
        let b = false

        // console.log(front)
        // console.log(back)

        if (front != null || back != null) {


            if (findPasswordOrNric(front) == "Passport") {

                if (front != null && back != null) {
                    if (front.is_verify != "N" && back.is_verify != "N") {
                        f = true;
                        b = true
                    }
                } else if (front != null && back == null) {
                    if (front.is_verify != "N") {
                        f = true;
                        b = true
                    }
                }
            } else {
                if (front.is_verify != "N" && back.is_verify != "N") {
                    f = true;
                    b = true
                }
            }
        }
        return f && b ? true : false
    }
    const document_status = (val) => {
        // val = "I";
        switch (val) {
            case "I": return ["In progress\n", Colors.primary];
            case "N": return ["Privious image\nwas rejected", Colors.red_old];
            case "Y": return ["Approved\n", Colors.green_new];
            default: return ["Error", Colors.violet]
        }
    }

    // console.log(front_details_prev)
    // console.log(imageFromapiORph(front_uri))


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
        <View style={{ flex: 1 }} >
            <Header back name={'Identity Verification'} navigation={navigation} />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={{ flex: 1 }} >
                    <View style={{ flex: 1, marginHorizontal: Normalize(16), marginTop: Normalize(10) }} >
                        <Text style={[globalStyle_esyPay.inputHeader, {
                            marginBottom: Normalize(10),
                            textAlign: "left",
                            fontSize: Normalize(12),
                            lineHeight: Normalize(15)
                        }]}>To verify your identity, please read and carry out the following steps carefully:</Text>
                        {
                            bulletPoint.map((item, index) => (
                                <View key={index} style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: Normalize(12) }} >
                                    <FontAwesome
                                        name='circle'
                                        color={Colors.black}
                                        size={Normalize(12)}
                                        style={{ marginRight: Normalize(5), marginTop: Normalize(2) }}
                                    />
                                    <View style={{ flex: 1, justifyContent: "center" }} >
                                        <Text style={[globalStyle_esyPay.inputHeader, {
                                            textAlign: "left",
                                            lineHeight: Normalize(14),
                                        }]}>{item.text}</Text>
                                    </View>
                                </View>))}
                        <Text style={[globalStyle_esyPay.inputHeader, {
                            marginBottom: Normalize(10),
                            textAlign: "left",
                            fontSize: Normalize(12),
                            lineHeight: Normalize(14)
                        }]}>If you have a problem submitting the above documents, please contact us at <Text style={{ color: "blue", textDecorationLine: "underline" }} >support@eazypay.com</Text></Text>
                        <View style={{ marginTop: Normalize(14), }} >
                            <View style={{ flexDirection: "row", marginBottom: Normalize(10), alignItems: "center", justifyContent: "space-between" }} >
                                <Text style={[globalStyle_esyPay.inputHeader, {
                                    fontSize: Normalize(13),
                                    lineHeight: Normalize(15)
                                }]}>I.D. Document</Text>
                                {
                                    (front_uri != "" || back_uri != "") &&
                                    <Pressable
                                        disabled={isnavigateTO(front_details_prev, back_details_prev)}
                                        onPress={() => { navigation.navigate("DocumentUpload") }}
                                        style={{ flexDirection: "row", alignItems: "center" }} >
                                        <Text numberOfLines={1} style={[globalstyles.plantext_bold, {
                                            fontSize: Normalize(13),
                                            lineHeight: Normalize(15),
                                            width: Normalize(160),
                                        }]}>{document_selection}</Text>
                                        {
                                            !isnavigateTO(front_details_prev, back_details_prev) &&
                                            <Entypo
                                                name='chevron-thin-right'
                                                size={Normalize(18)}
                                                color={Colors.grey}
                                            />
                                        }
                                    </Pressable>
                                }
                            </View>
                            {front_uri != "" || back_uri != "" ?
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} >
                                    <View style={{ marginRight: Normalize(15) }} >
                                        <Pressable
                                            disabled={front_uri != "" ? true : false}

                                            onPress={() => front_uri == "" && navigation.navigate("DocumentUpload")}

                                            style={{ height: Normalize(100), width: Normalize(100), borderColor: Colors.borderColor, borderWidth: Normalize(1), justifyContent: "center", alignItems: "center" }} >
                                            <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center", overflow: "hidden" }} >
                                                {
                                                    front_uri == "" ?
                                                        <SimpleLineIcons
                                                            name='picture'
                                                            color={Colors.grey}
                                                            size={Normalize(25)}
                                                            style={{}}
                                                        />
                                                        :
                                                        imageFromapiORph(front_uri) == "phone" ?
                                                            <Image
                                                                source={{ uri: front_uri }}
                                                                style={{ height: "100%", width: "100%", resizeMode: 'cover' }}
                                                            />
                                                            :
                                                            <Image
                                                                source={{ uri: ImageLink.Document + front_uri }}
                                                                style={{ height: "100%", width: "100%", resizeMode: 'cover' }}
                                                            />
                                                }
                                            </View>
                                            {(front_uri != "" && imageFromapiORph(front_uri) == "phone") &&
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
                                        {imageFromapiORph(front_uri) != "phone" && front_details_prev != null ?
                                            <Text numberOfLines={2} style={[globalstyles.plantext_bold, {
                                                fontSize: Normalize(12),
                                                color: document_status(front_details_prev.is_verify)[1],
                                                textAlign: "center"

                                            }]}>{document_status(front_details_prev.is_verify)[0]}</Text>
                                            :
                                            <Text numberOfLines={2} style={[globalstyles.plantext_bold, {
                                                fontSize: Normalize(12),
                                                color: Colors.white,
                                                textAlign: "center"
                                            }]}>{"\n"}{"\n"}</Text>
                                        }
                                    </View>

                                    {
                                        document_selection != "Passport" &&
                                        <View style={{}} >
                                            <Pressable
                                                disabled={back_uri != "" ? true : false}
                                                onPress={() => back_uri == "" && navigation.navigate("DocumentUpload")}
                                                style={{ height: Normalize(100), width: Normalize(100), borderColor: Colors.borderColor, borderWidth: Normalize(1), justifyContent: "center", alignItems: "center" }} >
                                                <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center", overflow: "hidden" }} >
                                                    {
                                                        back_uri == "" ?
                                                            <SimpleLineIcons
                                                                name='picture'
                                                                color={Colors.grey}
                                                                size={Normalize(25)}
                                                                style={{}}
                                                            />
                                                            :
                                                            imageFromapiORph(back_uri) == "phone" ?
                                                                < Image
                                                                    source={{ uri: back_uri }}
                                                                    style={{ height: "100%", width: "100%", resizeMode: 'cover' }}
                                                                />
                                                                :
                                                                < Image
                                                                    source={{ uri: ImageLink.Document + back_uri }}
                                                                    style={{ height: "100%", width: "100%", resizeMode: 'cover' }}
                                                                />
                                                    }
                                                </View>
                                                {(back_uri != "" && imageFromapiORph(back_uri) == "phone") &&
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
                                            {imageFromapiORph(back_uri) != "phone" && back_details_prev != null ?
                                                <Text numberOfLines={2} style={[globalstyles.plantext_bold, {
                                                    fontSize: Normalize(12),
                                                    color: document_status(back_details_prev.is_verify)[1],
                                                    textAlign: "center",
                                                }]}>{document_status(back_details_prev.is_verify)[0]}</Text>
                                                :
                                                <Text numberOfLines={2} style={[globalstyles.plantext_bold, {
                                                    fontSize: Normalize(12),
                                                    color: Colors.white,
                                                    textAlign: "center"

                                                }]}>{"\n"}{"\n"}</Text>
                                            }
                                        </View>}
                                </View>
                                :
                                <Pressable
                                    onPress={() => { navigation.navigate("DocumentUpload") }}
                                    style={{ height: Normalize(100), width: Normalize(100), borderColor: Colors.borderColor, borderWidth: Normalize(1), justifyContent: "center", alignItems: "center" }} >
                                    <SimpleLineIcons
                                        name='picture'
                                        color={Colors.grey}
                                        size={Normalize(25)}
                                        style={{ marginRight: Normalize(5), marginTop: Normalize(2) }}
                                    />
                                </Pressable>
                            }
                        </View>
                        <View style={{ marginTop: Normalize(14), }} >
                            <Text style={[globalStyle_esyPay.inputHeader, {
                                marginBottom: Normalize(10),
                                textAlign: "left",
                                fontSize: Normalize(13),
                                lineHeight: Normalize(15)
                            }]}>Your Selfie</Text>

                            <Pressable
                                disabled={(selfie_uri != "" && imageFromapiORph(selfie_uri) == "api")}
                                onPress={iscameraPermission}
                                style={{ height: Normalize(100), width: Normalize(100), borderColor: Colors.borderColor, borderWidth: Normalize(1), justifyContent: "center", alignItems: "center" }} >
                                {
                                    selfie_uri != "" ?
                                        imageFromapiORph(selfie_uri) == "phone" ?
                                            <Image source={{ uri: selfie_uri }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                                            :
                                            <Image source={{ uri: ImageLink.selfie + selfie_uri }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                                        :
                                        <SimpleLineIcons
                                            name='picture'
                                            color={Colors.grey}
                                            size={Normalize(25)}
                                            style={{ marginRight: Normalize(5), marginTop: Normalize(2) }}
                                        />
                                }
                                {(selfie_uri != "" && imageFromapiORph(selfie_uri) == "phone") &&
                                    <Pressable
                                        onPress={() => {
                                            setSelfie_details(null)
                                            setSelfie_uri("")
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

                    </View>

                    {
                        loader &&
                        <NewLoaderPage />
                    }

                </View>
                {(testingText.lastupdateDate).length > 0 && <Text style={{ textAlign: "center", color: Colors.green_new, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{testingText.lastupdateDate}</Text>}
                {(testingText.text).length > 0 && <Text style={{ textAlign: "center", color: Colors.red_old, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{testingText.text}</Text>}
                <Button
                    onPress={onPressNext}
                    style={{
                        marginHorizontal: Normalize(16),
                        marginVertical: Normalize(20)
                    }}
                    nextarrow
                    name={"Next"}
                />
            </ScrollView >
        </View >
    )
}