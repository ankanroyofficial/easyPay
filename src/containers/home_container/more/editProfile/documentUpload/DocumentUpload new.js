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
    Platform
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../../../../constants/colors'
import globalstyles from '../../../../../constants/globalStyles/Global_Styles'
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component'
import Normalize from '../../../../../helpers/Dimens';
import Header_Transparent from '../../../../../components/Header_Transparent'
import Button from '../../../../../components/Button'
import images from '../../../../../constants/images'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from "react-native-simple-toast";
import axiosInstance from '../../../../../constants/AxiosCallPage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ImageLink } from '../../../../../constants/LinkPage'
import LoaderPage from '../../../../../components/LoaderPage'
import { androidCameraPermission } from '../../../../../constants/permissions/Permissions'
export default function DocumentUpload({ navigation }) {
    const [loader, setLoader] = useState(false)




    const [fromWhereModal_front, setFromWhereModal_front] = useState(false)
    const [fromWhereModal_back, setFromWhereModal_back] = useState(false)
    const [chooseDocumentModal_front, setChooseDocumentModal_front] = useState(false);
    const [document_selection, setDocument_selection] = useState({
        "title": "",
        "frontCode": "",
        "backcode": ""
    })
    const [api_frontImage, setApi_frontImage] = useState("")
    const [api_backImage, setApi_backImage] = useState("")
    const [show_frontImage, setShow_frontImage] = useState("")
    const [show_backImage, setShow_backImage] = useState("")
    const [document_details, setDocument_details] = useState("")
    const [front_document_details, setfront_document_details] = useState("")
    const [back_document_details, setBack_document_details] = useState("")
    const get_Document_details = async () => {
        try {
            setLoader(true)
            const data = {
                "params": {
                    "no": "3"
                }
            }
            const res = await axiosInstance.post("viewUploadDocuments")

            console.log("-----------", res.data.result)
            if ((res.data.result.user_to_documents).length == 2) {
                setDocument_details(res.data.result)
                if (check_frontORback(res.data.result.user_to_documents[0]) == "front") {
                    setfront_document_details(res.data.result.user_to_documents[0])
                    setBack_document_details(res.data.result.user_to_documents[1])
                    setDocument_selection({ "title": document_WhichType(res.data.result.user_to_documents[0].file_type), "frontCode": res.data.result.user_to_documents[0].file_type, "backcode": res.data.result.user_to_documents[1].file_type })
                } else {
                    setfront_document_details(res.data.result.user_to_documents[1])
                    setBack_document_details(res.data.result.user_to_documents[0])
                    setDocument_selection({ "title": document_WhichType(res.data.result.user_to_documents[1].file_type), "frontCode": res.data.result.user_to_documents[1].file_type, "backcode": res.data.result.user_to_documents[0].file_type })
                }
            }
            setLoader(false)
        } catch (error) {
            setLoader(false)
            console.log("get_Document_details", error)
        }
    }
    useEffect(() => {
        get_Document_details()
    }, [])

    const titleShort = (val) => {
        if (val == "National Registration Identity Card (NRIC)") {
            return "NRIC"
        } else {
            return val
        }
    }
    const onpressUploadButton_front = () => {
        setFromWhereModal_front(!fromWhereModal_front)
    }
    const onpressUploadButton_back = () => {
        setFromWhereModal_back(!fromWhereModal_back)
    }
    const ChoosefromWhereModal_front = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={fromWhereModal_front}
                onRequestClose={() => {
                    onpressUploadButton_front()
                }}
            >
                <View style={{ flex: 1 }} >
                    <Pressable onPress={() => onpressUploadButton_front()} style={{ flex: 3, backgroundColor: "rgba(52,52,52,0.5)" }} ></Pressable>
                    <View style={{ flex: 1, backgroundColor: Colors.white, padding: Normalize(15) }} >
                        <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.primary, fontSize: Normalize(16), textAlign: "center" }]} >Select {document_selection.title != "" ? titleShort(document_selection.title) : "document"}'s frontside from</Text>
                        <View style={{ flex: 1, flexDirection: "row" }} >
                            <View style={{ alignItems: "center", justifyContent: "center", flex: 1, }} >
                                <Pressable
                                    onPress={iscameraPermission_front}
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
                                    onPress={front_imageSelect_by_gallery}
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
    const ChoosefromWhereModal_back = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={fromWhereModal_back}
                onRequestClose={() => {
                    onpressUploadButton_back()
                }}
            >
                <View style={{ flex: 1 }} >
                    <Pressable onPress={() => onpressUploadButton_back()} style={{ flex: 3, backgroundColor: "rgba(52,52,52,0.5)" }} ></Pressable>
                    <View style={{ flex: 1, backgroundColor: Colors.white, padding: Normalize(15) }} >
                        <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.primary, fontSize: Normalize(16), textAlign: "center" }]} >Select {document_selection.title != "" ? titleShort(document_selection.title) : "document"}'s backside from</Text>
                        <View style={{ flex: 1, flexDirection: "row" }} >
                            <View style={{ alignItems: "center", justifyContent: "center", flex: 1, }} >
                                <Pressable
                                    onPress={iscameraPermission_back}
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
                                    onPress={back_imageSelect_by_gallery}
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
    const documentData = [
        {
            "title": "Passport ",
            "frontCode": "1",
            "backCode": "4"
        },
        {
            "title": "Driving Licence",
            "frontCode": "2",
            "backCode": "5"
        },
        {
            "title": "National Registration Identity Card (NRIC)",
            "frontCode": "3",
            "backCode": "6"
        }
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
                <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", justifyContent: "center", paddingHorizontal: Normalize(25) }} >
                    <View style={{ backgroundColor: Colors.white, borderRadius: 5, justifyContent: "center", alignItems: "center" }} >

                        <View style={{ flexDirection: "row", width: "100%", borderBottomColor: Colors.primary, borderBottomWidth: 0.5, padding: Normalize(10) }} >
                            <View style={{ flex: 1, alignItems: "center" }} >
                                <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.primary, fontSize: Normalize(16) }]}>Choose front image</Text>
                            </View>
                            <TouchableOpacity
                                onPress={onpress_ChooseDocoment_front}
                            >
                                <Entypo
                                    name='cross'
                                    size={Normalize(20)}
                                    color={Colors.primary}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ paddingVertical: Normalize(15), paddingHorizontal: Normalize(10) }} >
                            {documentData.map((item, index) => (
                                <TouchableOpacity key={index}
                                    onPress={() => {
                                        setDocument_selection({ "title": item.title, "frontCode": item.frontCode, "backcode": item.backCode })
                                        onpress_ChooseDocoment_front()
                                    }}
                                    style={{ alignItems: "center", paddingVertical: Normalize(5) }} >
                                    <Text style={[globalstyles.plantext_outfit_regular, { color: Colors.greyText, fontSize: Normalize(13) }]} >{item.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
    const front_imageSelect_by_gallery = () => {
        try {
            if (document_selection.title == "" || document_selection.frontCode == "" || document_selection.backcode == "") {
                Toast.show("Atfirst select document type")
            } else {
                setFromWhereModal_front(false)
                launchImageLibrary({ mediaType: "photo", selectionLimit: 15 }, (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                    } else {
                        setShow_frontImage(response.assets[0].uri)
                        setApi_frontImage(response.assets[0])
                    }
                })
            }
        } catch (error) {
            console.log("front_imageSelect_by_gallery", error)
        }
    }
    const iscameraPermission_front = async () => {

        const permissionStatus = await androidCameraPermission()
        if (permissionStatus || Platform.OS == "ios") {
            front_imageSelect_by_camera()
        } else {
            // Toast.show("camera permission deny")
        }
    }
    const iscameraPermission_back = async () => {

        const permissionStatus = await androidCameraPermission()
        if (permissionStatus || Platform.OS == "ios") {
            back_imageSelect_by_camera()
        } else {
            // Toast.show("camera permission deny")
        }
    }
    const front_imageSelect_by_camera = () => {
        try {
            if (document_selection.title == "" || document_selection.frontCode == "" || document_selection.backcode == "") {
                Toast.show("Atfirst select document type")
            } else {
                setFromWhereModal_front(false)
                launchCamera({ mediaType: "photo", selectionLimit: 15, quality: 0.2 }, (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                    } else {
                        setShow_frontImage(response.assets[0].uri)
                        setApi_frontImage(response.assets[0])
                    }
                })
            }
        } catch (error) {
            console.log("front_imageSelect_by_camera", error)
        }
    }
    const back_imageSelect_by_gallery = () => {
        try {
            if (document_selection.title == "" || document_selection.frontCode == "" || document_selection.backcode == "") {
                Toast.show("Atfirst select document type")
            } else {
                setFromWhereModal_back(false)
                launchImageLibrary({ mediaType: "photo", selectionLimit: 15 }, (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                    } else {
                        setShow_backImage(response.assets[0].uri)
                        setApi_backImage(response.assets[0])
                    }
                })
            }
        } catch (error) {
            console.log("back_imageSelect_by_gallery", error)
        }
    }
    const back_imageSelect_by_camera = () => {
        try {
            if (document_selection.title == "" || document_selection.frontCode == "" || document_selection.backcode == "") {
                Toast.show("Atfirst select document type")
            } else {
                setFromWhereModal_back(false)
                launchCamera({ mediaType: "photo", selectionLimit: 15, quality: 0.2 }, (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                    } else {
                        setShow_backImage(response.assets[0].uri)
                        setApi_backImage(response.assets[0])

                    }
                })
            }
        } catch (error) {
            console.log("back_imageSelect_by_camera", error)
        }
    }
    const fileuploadButton = async () => {
        try {
            if (document_selection.title == "" || document_selection.frontCode == "" || document_selection.backcode == "") {
                Toast.show("Atfirst select document type")
            } else {
                if (document_details != "") {
                    // console.log("1")
                    rejection_document_upload()
                } else {

                    if (show_frontImage == "" || show_backImage == "") {
                        Toast.show("It is compulsory to select both pictures")
                    } else {
                        // console.log( "2")
                        new_document_upload()
                    }

                }
            }
        } catch (error) {
            console.log("fileuploadButton", error)
        }
    }
    const onlynexttopage = () => {
        navigation.navigate("Skills")
    }
    const new_document_upload = async () => {
        try {
            // console.log(document_selection)
            setLoader(true)
            const finalFormData = new FormData();

            finalFormData.append('file_type_front', document_selection.frontCode);
            finalFormData.append('file_type_back', document_selection.backcode);
            finalFormData.append('file_front_id', "");
            finalFormData.append('file_back_id', "");

            if (api_frontImage.fileName != undefined) {
                finalFormData.append('file_name_front', {
                    uri: api_frontImage.uri,
                    type: api_frontImage.type,
                    name: api_frontImage.fileName,
                });
            }
            if (api_backImage.fileName != undefined) {
                finalFormData.append('file_name_back', {
                    uri: api_backImage.uri,
                    type: api_backImage.type,
                    name: api_backImage.fileName,
                });
            }

            // console.log(finalFormData)
            const data = finalFormData
            const res = await axiosInstance.post("upload-document-verification", data)
            // console.log(res.data)

            if (res.data.result != undefined) {
                if ((res.data.result.user_to_documents).length == 2) {
                    setDocument_details(res.data.result)
                    if (check_frontORback(res.data.result.user_to_documents[0]) == "front") {
                        setfront_document_details(res.data.result.user_to_documents[0])
                        setBack_document_details(res.data.result.user_to_documents[1])
                        setDocument_selection({ "title": document_WhichType(res.data.result.user_to_documents[0].file_type), "frontCode": res.data.result.user_to_documents[0].file_type, "backcode": res.data.result.user_to_documents[1].file_type })
                    } else {
                        setfront_document_details(res.data.result.user_to_documents[1])
                        setBack_document_details(res.data.result.user_to_documents[0])
                        setDocument_selection({ "title": document_WhichType(res.data.result.user_to_documents[1].file_type), "frontCode": res.data.result.user_to_documents[1].file_type, "backcode": res.data.result.user_to_documents[0].file_type })
                    }
                }

                Toast.show(res.data.result.meaning)
                setApi_frontImage("")
                setApi_backImage("")
                setShow_frontImage("")
                setShow_backImage("")
                navigation.navigate("Skills")

            } else {
                Toast.show(res.data.error.meaning)
            }
            setLoader(false)

        } catch (error) {
            setLoader(false)

            console.log("final_document_upload", error)
        }
    }
    const rejection_document_upload = async () => {
        try {
            setLoader(true)
            // console.log(front_document_details)
            // console.log(back_document_details)
            const finalFormData = new FormData();
            if (front_document_details.is_verify == "N" && back_document_details.is_verify == "N") {
                if (show_frontImage == "" || show_backImage == "") {
                    Toast.show(`Select ${document_selection.title != "" ? titleShort(document_selection.title) : "document"}'s both sides`)
                } else {
                    finalFormData.append('file_type_front', document_selection.frontCode);
                    finalFormData.append('file_type_back', document_selection.backcode);
                    finalFormData.append('file_front_id', front_document_details.id);
                    finalFormData.append('file_back_id', back_document_details.id);
                    if (api_frontImage.fileName != undefined) {
                        finalFormData.append('file_name_front', {
                            uri: api_frontImage.uri,
                            type: api_frontImage.type,
                            name: api_frontImage.fileName,
                        });
                    }
                    if (api_backImage.fileName != undefined) {
                        finalFormData.append('file_name_back', {
                            uri: api_backImage.uri,
                            type: api_backImage.type,
                            name: api_backImage.fileName,
                        });
                    }
                }
            } else if (front_document_details.is_verify == "N") {
                if (show_frontImage == "") {
                    Toast.show(`Select ${document_selection.title != "" ? titleShort(document_selection.title) : "document"}'s frontside`)
                } else {
                    finalFormData.append('file_type_front', document_selection.frontCode);
                    finalFormData.append('file_front_id', front_document_details.id);
                    if (api_frontImage.fileName != undefined) {
                        finalFormData.append('file_name_front', {
                            uri: api_frontImage.uri,
                            type: api_frontImage.type,
                            name: api_frontImage.fileName,
                        });
                    }
                }
            } else if (back_document_details.is_verify == "N") {
                if (show_backImage == "") {
                    Toast.show(`Select ${document_selection.title != "" ? titleShort(document_selection.title) : "document"}'s backside`)
                } else {
                    finalFormData.append('file_type_back', document_selection.backcode);
                    finalFormData.append('file_back_id', back_document_details.id);
                    if (api_backImage.fileName != undefined) {
                        finalFormData.append('file_name_back', {
                            uri: api_backImage.uri,
                            type: api_backImage.type,
                            name: api_backImage.fileName,
                        });
                    }
                }
            }
            // console.log(finalFormData)
            const data = finalFormData
            const res = await axiosInstance.post("upload-document-verification", data)
            // console.log(res.data)
            if (res.data.result != undefined) {
                if ((res.data.result.user_to_documents).length == 2) {
                    setDocument_details(res.data.result)
                    if (check_frontORback(res.data.result.user_to_documents[0]) == "front") {
                        setfront_document_details(res.data.result.user_to_documents[0])
                        setBack_document_details(res.data.result.user_to_documents[1])
                        setDocument_selection({ "title": document_WhichType(res.data.result.user_to_documents[0].file_type), "frontCode": res.data.result.user_to_documents[0].file_type, "backcode": res.data.result.user_to_documents[1].file_type })
                    } else {
                        setfront_document_details(res.data.result.user_to_documents[1])
                        setBack_document_details(res.data.result.user_to_documents[0])
                        setDocument_selection({ "title": document_WhichType(res.data.result.user_to_documents[1].file_type), "frontCode": res.data.result.user_to_documents[1].file_type, "backcode": res.data.result.user_to_documents[0].file_type })
                    }
                }

                Toast.show(res.data.result.meaning)
                setApi_frontImage("")
                setApi_backImage("")
                setShow_frontImage("")
                setShow_backImage("")
                navigation.navigate("Skills")

            } else {
                Toast.show(res.data.error.meaning)
            }
            setLoader(false)
        } catch (error) {
            setLoader(false)
            console.log("final_document_upload", error)
        }
    }
    const check_frontORback = (val) => {
        if (val.file_type == "1" || val.file_type == "2" || val.file_type == "3") {
            return "front"
        } else {
            return "back"
        }
    }
    const document_WhichType = (val) => {
        switch (val) {
            case "1": return "Passport";
            case "2": return "Driving Licence";
            case "3": return "National Registration Identity Card (NRIC)";
            default: return "error";
        }
    }
    const document_status = (val) => {
        switch (val) {
            case "I": return "In progress";
            case "N": return "Rejected";
            case "Y": return "Approved";
            default: return null
        }
    }
    const is_show_image_upload = (val) => {
        if (val == "") {
            return true
        } else {
            if (val.is_verify == "N") {
                return true
            } else if (val.is_verify == "I" || val.is_verify == "Y") {
                return false
            }
        }
    }
    const whichfunc = () => {
        if ((front_document_details.is_verify == "I" && back_document_details.is_verify == "I") || (front_document_details.is_verify == "Y" && back_document_details.is_verify == "Y")) {
            onlynexttopage()
        } else {
            fileuploadButton()
        }
    }
    const whichText = () => {

        if ((front_document_details.is_verify == "I" && back_document_details.is_verify == "I") || (front_document_details.is_verify == "Y" && back_document_details.is_verify == "Y")) {
            return "Continue"
        } else {
            return "Upload file & Continue"
        }
    }
    return (
        <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>


            <View style={{ flex: 1, backgroundColor: Colors.white }} >
                <CurveDesing_Component bottom>
                    {
                        loader ?
                            <LoaderPage />
                            :
                            <View style={globalstyles.container_only_padding} >
                                <Header_Transparent />
                                <ScrollView showsVerticalScrollIndicator={false} >

                                    <Text style={[globalstyles.page_Header_Text, { marginTop: Normalize(15) }]}>Upload document</Text>
                                    <Text style={[globalstyles.page_SubHeader_Text, { marginVertical: Normalize(10) }]}>It is compulsory to upload <Text style={{ color: Colors.primary, fontFamily: "Outfit-Medium" }} >document</Text>'s both side images.</Text>
                                    <View style={{ flex: 1 }} >

                                        {/* document type selection box */}
                                        <View style={{}} >
                                            <Text style={globalstyles.textinput_Header_Style} >Select document</Text>
                                            <View style={[globalstyles.textinput_onlyBox_Style, {

                                                borderColor: document_details != "" ? document_details.user_to_documents ? Colors.disable_textinput_border : Colors.primary : Colors.primary,
                                                borderWidth: Normalize(1)
                                            }]} >
                                                <TouchableOpacity
                                                    disabled={document_details != "" ? document_details.user_to_documents ? true : false : false}
                                                    onPress={() => onpress_ChooseDocoment_front()}
                                                    style={{ flex: 1, flexDirection: "row" }} >
                                                    <View style={{ flex: 1 }} >
                                                        <Text style={[globalstyles.textinput_onlyText_Style, { color: document_details == "" ? Colors.textinput_inner_text : Colors.greyText }]} >{document_selection.title == "" ? "Choose any one" : titleShort(document_selection.title)}</Text>
                                                    </View>
                                                    {
                                                        document_details == "" &&
                                                        <View style={{ height: "100%", width: "6%", justifyContent: "center", alignItems: "center", marginRight: Normalize(12) }} >
                                                            <Image source={images.downlinearrow} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                        </View>}
                                                </TouchableOpacity>
                                            </View>


                                            {/* front image */}

                                            <Text style={[globalstyles.plantext_Outfit_Medium, { fontSize: Normalize(15), marginTop: Normalize(15) }]} >Select {document_selection.title != "" ? titleShort(document_selection.title) : "document"}'s frontside</Text>

                                            <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", marginVertical: Normalize(10) }} >
                                                <View style={{ flex: 1 }} >
                                                    <View style={{ alignItems: "center" }} >
                                                        <View style={{}} >
                                                            <View style={{ height: Normalize(80), width: Normalize(80), backgroundColor: Colors.disable_textinput_background, borderRadius: 8, borderColor: Colors.primary, borderWidth: Normalize(1), overflow: "hidden" }} >
                                                                {show_frontImage != "" && <Image source={{ uri: show_frontImage }} style={[globalstyles.imageFit, { resizeMode: "cover" }]} />}
                                                                {
                                                                    show_frontImage == "" && front_document_details != "" && <Image source={{ uri: ImageLink.Document + front_document_details.file_name }} style={[globalstyles.imageFit, { resizeMode: "cover" }]} />
                                                                }
                                                            </View>
                                                            {
                                                                (front_document_details != "" && show_frontImage == "") &&
                                                                < Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.green_new_2, marginTop: Normalize(5), textAlign: "center" }]} >{document_status(front_document_details.is_verify)}</Text>
                                                            }

                                                        </View>
                                                    </View>
                                                </View>
                                                {
                                                    is_show_image_upload(front_document_details) &&

                                                    <View style={{ flex: 1, marginBottom: Normalize(5), }} >
                                                        <TouchableOpacity
                                                            onPress={onpressUploadButton_front}
                                                            style={{ flexDirection: "row", alignItems: "center" }} >
                                                            <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.primary, textAlign: "center" }]} >{show_frontImage != "" ? "Change image" : "Upload image"}</Text>
                                                            <View
                                                                style={{ height: Normalize(18), width: Normalize(18), justifyContent: "center", alignItems: "center", marginLeft: Normalize(3) }} >
                                                                <Image source={images.upload_image} style={{ height: "90%", width: "90%", resizeMode: "contain" }} />
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                }
                                            </View>
                                            {/* back image */}
                                            <Text style={[globalstyles.plantext_Outfit_Medium, { fontSize: Normalize(15), }]} >Select {document_selection.title != "" ? titleShort(document_selection.title) : "document"}'s backside</Text>
                                            <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", marginVertical: Normalize(10) }} >
                                                <View style={{ flex: 1 }} >
                                                    <View style={{ alignItems: "center" }} >
                                                        <View style={{}} >
                                                            <View style={{ height: Normalize(80), width: Normalize(80), backgroundColor: Colors.disable_textinput_background, borderRadius: 8, borderColor: Colors.primary, borderWidth: Normalize(1), overflow: "hidden" }} >
                                                                {show_backImage != "" && <Image source={{ uri: show_backImage }} style={[globalstyles.imageFit, { resizeMode: "cover" }]} />}
                                                                {
                                                                    show_backImage == "" && back_document_details != "" && <Image source={{ uri: ImageLink.Document + back_document_details.file_name }} style={[globalstyles.imageFit, { resizeMode: "cover" }]} />
                                                                }
                                                            </View>
                                                            {
                                                                (back_document_details != "" && show_backImage == "") &&
                                                                <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.green_new_2, marginTop: Normalize(5), textAlign: "center" }]} >{document_status(back_document_details.is_verify)}</Text>
                                                            }



                                                        </View>
                                                    </View>
                                                </View>
                                                {
                                                    is_show_image_upload(back_document_details) &&
                                                    <View style={{ flex: 1, marginBottom: Normalize(5), }} >
                                                        <TouchableOpacity
                                                            onPress={onpressUploadButton_back}
                                                            style={{ flexDirection: "row", alignItems: "center" }} >
                                                            <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.primary, textAlign: "center" }]} >{show_backImage != "" ? "Change image" : "Upload image"}</Text>
                                                            <View
                                                                style={{ height: Normalize(18), width: Normalize(18), justifyContent: "center", alignItems: "center", marginLeft: Normalize(3) }} >
                                                                <Image source={images.upload_image} style={{ height: "90%", width: "90%", resizeMode: "contain" }} />
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                }
                                            </View>
                                        </View>
                                        {chooseDocumentModal_front && <ChooseAnyoneDocument_front />}
                                        {fromWhereModal_front && <ChoosefromWhereModal_front />}
                                        {fromWhereModal_back && <ChoosefromWhereModal_back />}
                                    </View>
                                </ScrollView>
                                <Button
                                    nextarrow
                                    // disabled={(front_document_details.is_verify == "I" && back_document_details.is_verify == "I") || (front_document_details.is_verify == "Y" && back_document_details.is_verify == "Y") ? true : false}
                                    onPress={whichfunc}
                                    // onPress={fileuploadButton}
                                    name={whichText()}
                                    style={[styles.buttomStyle, {}]}
                                />
                            </View >
                    }
                </CurveDesing_Component >
            </View >
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttomStyle: {
        marginBottom: Normalize(15),
    },
    mainimageuploadContainer: {
        marginVertical: Normalize(5),
        padding: Normalize(10),
        borderRadius: 10,
        borderColor: Colors.primary,
        borderWidth: Normalize(1),
        flexDirection: "row"
    },
    smallimagebox: {
        width: Normalize(80),
        height: Normalize(80),
        overflow: "hidden",
        borderRadius: 8,
        backgroundColor: Colors.disable_textinput_background,
        borderWidth: Normalize(1),
        borderColor: Colors.primary
    },
    galleryorcamera_icon: {
        height: Normalize(75), width: Normalize(75), borderRadius: Normalize(75) / 2, backgroundColor: Colors.disable_textinput_background, marginBottom: Normalize(5), justifyContent: "center", alignItems: "center"
    }
})