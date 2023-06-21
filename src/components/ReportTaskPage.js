import React, { useState } from 'react'
import {
    View, Text, Modal, Image, TouchableOpacity, TextInput, Pressable, Keyboard
} from 'react-native'
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Toast from 'react-native-simple-toast';
import { useNavigation } from "@react-navigation/native"
import { Colors } from '../constants/colors';
import strings from '../constants/lng/LocalizedStrings';
import images from '../constants/images';
import { axiosUrl } from '../constants/LinkPage';
import { rowOrRowreverse } from '../constants/RowOrRowreverse';
import globalstyles from '../constants/globalStyles/Global_Styles';
import axiosInstance from '../constants/AxiosCallPage';

import globalStyle_esyPay from '../constants/globalStyles/GlobalStyle_esyPay';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function ReportTaskPage({ ispress, onPress, slug, token, getAllMessage }) {

    const navigation = useNavigation()
    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
    const [reportList, setReportList] = useState(false)
    const [reportsuccess, setreportsuccess] = useState(false)
    const [tempListName, setTempListName] = useState("")
    const [listName, setListName] = useState("")
    const [reason, setReason] = useState("")
    const [successText, setsuccessText] = useState("")


    const reportListData = [
        {
            id: 1,
            Title: language == "en" ? "Spam" : "کار/ پروژه غیر واقعی"
        },
        {
            id: 2,
            Title: language == "en" ? "Rude or Offensive" : "هنجار شکن و‌توهین آمیز"
        },
        {
            id: 3,
            Title: language == "en" ? "Branch of marketplace rules" : "نقض قوانین ایران تسکر- نقض قوانین جمهوری اسلامی ایران"
        },
        {
            id: 4,
            Title: language == "en" ? "Others" : "موارد دیگر"
        },

    ]


    const reportListModal = () => {
        setReportList(!reportList)
    }

    const sendButton = async () => {
        try {
            if (listName.length != 0) {
                if (reason.length != 0 && reason.trim() != "") {

                    const data = {
                        "params": {
                            "slug": slug,
                            "type": "T",
                            "comment": reason,
                            "category": listName
                        }
                    }
                    console.log("jhkjk")
                    const dataa = await axiosInstance.post("create-report", data)

                    console.log("fffffffff", dataa.data)
                    if (dataa.data.result) {

                        setsuccessText(dataa.data.result.status.meaning)

                        //    {"result": {"status": {"code": "-10045", "meaning": "Report added successfully.", "message": "Success!"}}}

                        setreportsuccess(true)

                    } else {
                        Toast.show(dataa.data.error.message.meaning)
                    }
                } else {
                    Toast.show(language == "en" ? "Enter a short description" : "یک توضیح کوتاه وارد کنید")
                }

            } else {
                Toast.show(language == "en" ? "Select one option" : "یک گزینه را انتخاب کنید")
            }
        } catch (error) {
            console.log("hghg", error, slug, " ln- ", listName)
        }
    }

    const cancelButton = () => {
        onPress()
        setTempListName("")
        setListName("")
        setReason("")
    }


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ispress}
            onRequestClose={() => {
                onPress()
            }}
        >
            <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", padding: Normalize(15), justifyContent: "center", alignItems: "center" }} >
                <View style={{ backgroundColor: Colors.white, borderRadius: 4, paddingBottom: "2%" }} >


                    <View style={{ height: Normalize(50), width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: Colors.primary }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                            <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.white, fontSize: Normalize(14), }]}>What would you like to report?</Text>
                        </View>
                    </View>


                    <View style={{ backgroundColor: "#fafbfd", padding: Normalize(8) }} >
                        <View style={{ width: "100%", }}>
                            <Text style={[globalstyles.page_SubHeader_Text, { paddingVertical: Normalize(8), color: Colors.greyText }]}  >Please give us more information regarding this report</Text>
                            <View style={[globalstyles.textinput_onlyBox_Style, { borderColor: Colors.borderColor }]} >
                                <TouchableOpacity
                                    onPress={reportListModal}
                                    style={{ flex: 1, flexDirection: "row" }} >
                                    <View style={{ flex: 8 }} >
                                        <Text style={globalstyles.textinput_onlyText_Style} >{listName.length != 0 ? listName : "Please select a category"}</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                        <View style={{ height: Normalize(15), width: Normalize(15) }}>
                                            <Image source={images.downlinearrow} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                        </View>
                                    </View>


                                    {reportList &&
                                        <Modal
                                            animationType="fade"
                                            transparent={true}
                                            visible={reportList}
                                            onRequestClose={reportListModal}
                                        >
                                            <Pressable
                                                onPress={reportListModal}
                                                style={{ flex: 1, backgroundColor: "rgba(52,52,52,0)", alignItems: "center", paddingHorizontal: Normalize(25) }} >

                                                <View style={{ marginTop: Normalize(260), backgroundColor: Colors.white, justifyContent: "center", alignItems: "center", elevation: 5 }} >

                                                    <View style={{ paddingVertical: Normalize(13), paddingHorizontal: Normalize(10) }} >

                                                        {
                                                            reportListData.map((item, index) => {
                                                                return (
                                                                    <TouchableOpacity key={index}
                                                                        onPress={() => {
                                                                            setTempListName(item.Title)
                                                                            reportListModal()
                                                                            setListName(item.Title)
                                                                        }
                                                                        }

                                                                    >
                                                                        <Text style={[globalstyles.plantext_outfit_regular, {
                                                                            marginBottom: Normalize(6),
                                                                            textAlign: "center",
                                                                            backgroundColor: tempListName.length != 0 ? tempListName == item.Title ? Colors.primary : null : listName.length != 0 ? item.Title == listName ? Colors.primary : null : null,
                                                                            color: tempListName.length != 0 ? tempListName == item.Title ? Colors.white : Colors.greyText : listName.length != 0 ? item.Title == listName ? Colors.white : Colors.greyText : Colors.greyText,
                                                                            padding: "1%"
                                                                        }]} >{item.Title}</Text>
                                                                    </TouchableOpacity>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                            </Pressable>
                                        </Modal >

                                        // <Modal
                                        //     animationType="none"
                                        //     transparent={true}
                                        //     visible={reportList}
                                        //     onRequestClose={reportListModal}
                                        // >
                                        //     <View style={{ flex: 1, backgroundColor: "rgba(52, 52, 52, 0.8)", justifyContent: "center" }}>
                                        //         <View style={{ marginHorizontal: "5%", backgroundColor: Colors.white, marginVertical: "30%", borderRadius: 5, overflow: "hidden" }} >
                                        //             <View style={{ backgroundColor: Colors.primary }} >
                                        //                 <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.white, textAlign: "center", paddingVertical: Normalize(10) }]}>Choose any one</Text>
                                        //             </View>
                                        //             <ScrollView 
                                        //             keyboardShouldPersistTaps="always"
                                        //             style={{ marginVertical: 10 }} showsVerticalScrollIndicator={false} >
                                        //                 {
                                        //                     reportListData.map((item, index) => {
                                        //                         return (
                                        //                             <TouchableOpacity key={index} onPress={() => setTempListName(item.Title)}>
                                        //                                 <Text style={[globalstyles.plantext_outfit_regular, {
                                        //                                     marginBottom: Normalize(6),
                                        //                                     textAlign: "center",
                                        //                                     backgroundColor: tempListName.length != 0 ? tempListName == item.Title ? Colors.primary : null : listName.length != 0 ? item.Title == listName ? Colors.primary : null : null,
                                        //                                     color: tempListName.length != 0 ? tempListName == item.Title ? Colors.white : Colors.greyText : listName.length != 0 ? item.Title == listName ? Colors.white : Colors.greyText : Colors.greyText,
                                        //                                     padding: "1%"
                                        //                                 }]} >{item.Title}</Text>
                                        //                             </TouchableOpacity>
                                        //                         )
                                        //                     })
                                        //                 }
                                        //             </ScrollView>
                                        //             <View style={{ flexDirection: rowOrRowreverse(language), borderTopColor: "#d8d8d8", borderTopWidth: 1, paddingVertical: Normalize(6), }} >
                                        //                 <TouchableOpacity
                                        //                     onPress={() => {
                                        //                         reportListModal()
                                        //                         setTempListName("")
                                        //                     }}
                                        //                     style={{ flex: 1, justifyContent: "center", alignItems: "center", borderColor: "#d8d8d8", borderRightWidth: language == "en" ? 1 : 0 }} >
                                        //                     <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.greyText }]}>{language == "en" ? 'Cancel' : "لغو"}</Text>
                                        //                 </TouchableOpacity>
                                        //                 <TouchableOpacity
                                        //                     onPress={() => {
                                        //                         reportListModal()
                                        //                         { listName.length != 0 && tempListName.length == 0 ? setListName(listName) : setListName(tempListName) }
                                        //                         setTempListName("")
                                        //                     }} style={{ flex: 1, justifyContent: "center", alignItems: "center", borderColor: "#d8d8d8", borderRightWidth: language == "en" ? 0 : 1 }} >
                                        //                     <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.greyText }]}>{language == "en" ? "OK" : "خوب"}</Text>
                                        //                 </TouchableOpacity>
                                        //             </View>
                                        //         </View>
                                        //     </View>
                                        // </Modal >

                                    }
                                </TouchableOpacity>
                            </View>
                            <View >
                                <TextInput
                                    placeholderTextColor={Colors.textinput_inner_text}
                                    value={reason}
                                    placeholder="Enter Reason"
                                    multiline
                                    style={[globalstyles.multiline_textinputStyle, { borderColor: Colors.borderColor }]}
                                    onChangeText={(e) => { setReason(e) }}
                                    onSubmitEditing={() => { Keyboard.dismiss() }}

                                />
                            </View>
                            <View style={{ flexDirection: rowOrRowreverse(language), alignItems: "center", justifyContent: "space-between", marginTop: Normalize(18) }} >
                                <TouchableOpacity
                                    onPress={cancelButton}
                                    style={{ height: Normalize(40), width: "48%", borderColor: Colors.primary, borderWidth: Normalize(1), borderRadius: 50, justifyContent: "center", alignItems: "center" }} >
                                    <Text style={{
                                        fontSize: Normalize(14),
                                        fontFamily: 'roboto-bold',
                                        color: Colors.primary
                                    }}>{language == "en" ? 'Cancel' : "لغو"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={sendButton}
                                    style={{ height: Normalize(40), width: "48%", backgroundColor: Colors.secondary, borderRadius: 50, justifyContent: "center", alignItems: "center" }} >
                                    <Text style={{
                                        fontSize: Normalize(14),
                                        fontFamily: 'roboto-bold',
                                        color: Colors.white
                                    }}>{language == "en" ? 'Send Report' : "ارسال گزارش"}</Text>
                                </TouchableOpacity>

                            </View>


                        </View>
                    </View>
                </View>
                <Modal
                    visible={reportsuccess}
                    onRequestClose={() => setreportsuccess(false)}
                    animationType="fade"
                    transparent
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", justifyContent: "center", alignItems: "center" }} >
                        <View style={{ padding: Normalize(20), width: "80%", backgroundColor: Colors.white, elevation: 10, borderRadius: Normalize(8) }} >

                            <View style={{ alignItems: "center" }}>
                                <View style={{
                                    height: Normalize(60), width: Normalize(60), backgroundColor: Colors.white, marginTop: Normalize(-50),
                                    borderRadius: Normalize(30), alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <View style={{
                                        height: Normalize(50), width: Normalize(50), backgroundColor: Colors.green2,
                                        borderRadius: Normalize(25), alignSelf: 'center', justifyContent: 'center', alignItems: 'center'
                                    }} >
                                        <FontAwesome
                                            name="check"
                                            size={Normalize(30)}
                                            color={Colors.white}
                                        />
                                        {/* <Image source={images.de} style={{ height: "50%", width: "50%", resizeMode: "contain" ,alignSelf:'center'}} /> */}
                                    </View>
                                </View>
                                <Text style={[globalStyle_esyPay.detailsText, {
                                    fontSize: Normalize(13), marginVertical: Normalize(15),
                                    marginHorizontal: Normalize(20), textAlign: 'center', fontFamily: 'Lato-Bold'
                                }]}>{successText}</Text>

                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                onPress()
                                setTempListName("")
                                setListName("")
                                setReason("")
                                getAllMessage()
                                setreportsuccess(false)
                            }}
                            style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.white, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(10) }} >
                            <Entypo name="cross" color={Colors.textinput_inner_text} size={Normalize(35)} />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </Modal>

    )
}
export default withRtl(ReportTaskPage);