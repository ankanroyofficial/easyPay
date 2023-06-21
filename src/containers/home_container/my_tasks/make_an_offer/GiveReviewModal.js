import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState } from 'react'
import {
    View, Text, Modal, Image, TouchableOpacity, TextInput, StyleSheet,
    Dimensions, RefreshControl, ActivityIndicator, Keyboard,KeyboardAvoidingView,Platform
} from 'react-native'
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Toast from 'react-native-simple-toast';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import strings from '../../../../constants/lng/LocalizedStrings';
import { ImageLink } from '../../../../constants/LinkPage';
import Button from '../../../../components/Button';
import { rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import axiosInstance from '../../../../constants/AxiosCallPage';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
const { height } = Dimensions.get("window")

function GiveReviewModal({ ispress, onPress, taskSlugname, name, image }) {

    const { language, setLanguage } = useRtlContext();
    const [token, setToken] = useState("");
    const [slugName, setSlugName] = useState("")
    const [star, setStar] = React.useState(0)
    const [description, setDescription] = useState("")
    const [submitButtonLoader, setSubmitButtonLoader] = useState(false)

    const getTokon = async () => {
        try {
            let token = await AsyncStorage.getItem("token");
            let slug = await AsyncStorage.getItem("slug");
            setToken(token)
            setSlugName(slug)
        } catch (error) {
            console.log(error)
        }
    }


    const postReviewsButton = async () => {
        try {
            if (star == 0) {
                Toast.show(strings.MAKEANOFFER.PLEASEPROVIDERATING)
            } else {
                if (description.length == 0 || description.trim("") == 0) {
                    Toast.show(strings.MAKEANOFFER.ENTERYOURREVIEW)
                } else {
                    var d = description.trim("")
                    setSubmitButtonLoader(true)
                    const data = {
                        "params": {
                            "slug": taskSlugname,
                            "rating": star,
                            "description": d
                        }
                    }
                    const res = await axiosInstance.post("post-review", data)

                    if (res.data.status == 1) {
                        setSubmitButtonLoader(false)
                        Toast.show(strings.MAKEANOFFER.REVIEWSEND)
                        onPress()
                        setStar(0)
                        setDescription("")
                    } else {
                        Toast.show(res.data.error.meaning)
                        setSubmitButtonLoader(false)
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
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
            <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", padding: Normalize(15), justifyContent: "center" }} >
                <View style={{ height: height * 0.07, width: "100%", flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#E8E8E8", borderBottomWidth: 1, backgroundColor: Colors.white }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                        <Text style={{
                            fontSize: Normalize(14),
                            fontFamily: 'Outfit-SemiBold',
                            color: '#38393e'
                        }}>{strings.MAKEANOFFER.POSTREVIEWS}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => {
                            onPress()
                        }}
                        style={{ height: Normalize(50), width: Normalize(50), justifyContent: "center", alignItems: "center" }}  >
                        <Image source={images.cross} style={{ height: Normalize(12), width: Normalize(12), resizeMode: "contain" }} />
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: Colors.white, padding: 15 }} >
                    <View style={{ paddingVertical: "2%", backgroundColor: "#fafbfd", flexDirection: language == "en" ? "row" : "row-reverse" }} >
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                            <View style={{ height: Normalize(52), width: Normalize(52), backgroundColor: "#f5f5f5", borderRadius: Normalize(52) / 2, overflow: "hidden" }} >
                                <Image style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                    source={{ uri: ImageLink.ProfilePhoto + `${image}` }}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 2.8, justifyContent: "center", alignItems: language == "en" ? "flex-start" : "flex-end" }} >
                            <Text numberOfLines={1} style={{ fontSize: 15, fontFamily: 'Outfit-Medium', color: Colors.greyText, textAlign: language == "pr" ? "right" : "left" }}>{name}</Text>
                        </View>
                    </View>
                    <View>
                        <Text numberOfLines={1} style={{ fontSize: 15, fontFamily: 'Outfit-Medium', color: Colors.greyText, textAlign: language == "pr" ? "right" : "left" }}>{strings.MAKEANOFFER.RATING}</Text>
                        <View style={{ flexDirection: rowOrRowreverse(language), marginTop: Normalize(10) }} >
                            {[1, 2, 3, 4, 5].map((item, index) => (
                                <TouchableOpacity key={index}
                                    onPress={() => {
                                        setStar(index + 1)
                                    }}
                                    style={{ height: Normalize(30), width: Normalize(30), marginHorizontal: Normalize(5), borderColor: Colors.lightGrey, borderWidth: Normalize(1), borderRadius: 5, justifyContent: "center", alignItems: "center" }} >
                                    <Image
                                        source={star >= index + 1 ? images.stargolden : images.stargray}
                                        style={{ height: "50%", width: "50%" }}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <View  >
                        <Text numberOfLines={1} style={{ fontSize: 15, fontFamily: 'Outfit-Medium', color: Colors.greyText, textAlign: language == "pr" ? "right" : "left", marginVertical: Normalize(10) }}>{strings.MAKEANOFFER.YOURREVIEW}</Text>
                        <TextInput
                            value={description}
                            onChangeText={(e) => setDescription(e)}
                            placeholder={strings.MAKEANOFFER.ENTERHERE}
                            multiline
                            style={globalstyles.multiline_textinputStyle}
                            onSubmitEditing={() => { Keyboard.dismiss() }}
                        />
                    </View>
                    <Button
                        style={{ marginTop: Normalize(10) }}
                        disabled={submitButtonLoader ? true : false}
                        name={submitButtonLoader ? "" : strings.MAKEANOFFER.POSTREVIEWS}
                        onPress={postReviewsButton}
                    >
                        {
                            submitButtonLoader &&
                            <ActivityIndicator
                                size="small"
                                color={Colors.white}
                            />
                        }
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}
export default withRtl(GiveReviewModal);






