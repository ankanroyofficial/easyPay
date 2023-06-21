import { View, Text, SafeAreaView, TouchableOpacity, Image, Pressable, StyleSheet, ScrollView, BackHandler } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Colors } from '../../../../constants/colors'
import Header from '../../../../components/Header'
import { useNavigation } from '@react-navigation/native'
import globalstyles from '../../../../constants/globalStyles/Global_Styles'
import CurveDesing_Component from '../../../../constants/CurveDesing_Component'
import images from '../../../../constants/images'
import { myContext } from '../../../../constants/ContextApi'
import strings from '../../../../constants/lng/LocalizedStrings'
import { numberWithCommas } from '../../../../constants/NumberWithComma'
import Category_Choose_Page from '../../../../components/Category_Choose_Page'
import Entypo from 'react-native-vector-icons/Entypo';
import Normalize from "../../../../helpers/Dimens"
import { GooglePlacesAutocomplete, geocodeByAddress } from 'react-native-google-places-autocomplete';
import { Constant_apis } from '../../../../constants/Constant_api'
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Slider from '@react-native-community/slider';
import Button from '../../../../components/Button'
import axiosInstance from '../../../../constants/AxiosCallPage'
import { isArrDataEmpty } from '../../../../constants/KeyWordSearch'
import Toast from 'react-native-simple-toast';
import { axiosUrl } from '../../../../constants/LinkPage'
import axios from 'axios';
import LoaderPage from '../../../../components/LoaderPage'
import NewLoaderPage from '../../../../components/NewLoaderPage'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SucessModalDesign from '../../../../components/SucessModalDesign'
export default function NotificationPreferences() {
    const navigation = useNavigation()
    const { choose_Categories, setChoose_Categories, slugName, isNotifyPrefLoad, setIsNotifyPrefLoad } = useContext(myContext)
    const [loader, setLoader] = useState(false)
    const [to_be_Done_Type, setTo_be_Done_Type] = useState("3")
    const [distance, setDistance] = useState(1)
    const [temp_Distance, setTemp_Distance] = useState(1);
    const [isSelected, setSelection] = useState(true);
    const [isSelected2, setSelection2] = useState(false);
    const [isSubmitSucessModal, setIsSubmitSucessModal] = useState(false);
    const {
        location, setLocation,
        setLat, lat,
        setLng, lng
    } = useContext(myContext);
    const getNotificationData = async () => {
        try {
            setLoader(true)
            setIsNotifyPrefLoad(true)
            const data = await axios.post(`${axiosUrl.URL}public-profile`, {
                "jsonrpc": "2.0",
                "params": {
                    "slug": `${slugName}`
                }
            })
            // console.log(data.data.result.UserToNotificationSetting)
            if (data.data.result.user) {
                var databaseSaved_category = data.data.result.UserToNotificationCategory
                var saved_setting = data.data.result.UserToNotificationSetting
                if (databaseSaved_category.length > 0) {
                    modify_category_as_database(choose_Categories, databaseSaved_category)
                }
                if (saved_setting) {
                    setTo_be_Done_Type(saved_setting.notification_type_id)

                    if (saved_setting.lat != null && saved_setting.lng != null && saved_setting.location != null) {
                        setLocation(saved_setting.location)
                        setLat(parseFloat(saved_setting.lat))
                        setLng(parseFloat(saved_setting.lng))
                    }
                    if (saved_setting.email_notification == "true") {
                        setSelection(true)
                    } else {
                        setSelection(false)
                    }
                    if (saved_setting.push_notification == "true") {
                        setSelection2(saved_setting.push_notification)
                    } else {
                        setSelection2(false)
                    }

                    if (saved_setting.distance != null) {
                        setDistance(parseInt(saved_setting.distance))
                        setTemp_Distance(parseInt(parseInt(saved_setting.distance)))
                    }
                }
                setLoader(false)
            }
            setLoader(false)
        } catch (error) {
            console.log("getNotificationData----", error)
        }
    }
    const isGetNotificationDataLoad = () => {
        if (!isNotifyPrefLoad) {
            getNotificationData()
        }
    }
    useEffect(() => {
        isGetNotificationDataLoad()
    }, [])
    const modify_category_as_database = (all_category, selectedCategory) => {
        try {
            var new_array = [];
            all_category.map((item, index) => {
                if (testt(item.name, selectedCategory)) {
                    new_array.push({ name: item.name, isSelected: true, id: item.id })
                } else {
                    new_array.push(item)
                }
            })
            setChoose_Categories(new_array)
        } catch (error) {
            console.log("modify_category_as_database", error)
        }
    }
    const testt = (val, selectedCategory) => {
        const a = selectedCategory.some(item => item.categories_to_language.name === val)
        return a
    }

    const handleBackButtonClick = () => {
        navigation.navigate({
            name: "Get it done",
            params: {
                screen: "Getitdone",
            },
        })
        setIsNotifyPrefLoad(false)
        return true;
    }
    useEffect(() => {
        const a = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            a.remove();
        };
    }, []);



    const onpressSubmit = async () => {
        try {
            if (isArrDataEmpty(choose_Categories)) {
                Toast.show("Select atleast 1 category")
            } else {
                if (to_be_Done_Type == "1") {
                    if (location == "" || lat == "" || lng == "") {
                        Toast.show("Select location")
                    } else {
                        onNotificationOn()
                    }
                } else {
                    onNotificationOn()
                }
            }
        } catch (error) {
            console.log("onpressSubmit-------", error)
        }
    }
    const onNotificationOn = async () => {
        try {
            setLoader(true)
            const finalFormData = new FormData();
            // finalFormData.append('is_notification', isNotificationOn ? "on" : "off");
            finalFormData.append('email_notification', isSelected ? "true" : "false");
            finalFormData.append('push_notification', isSelected2 ? "true" : "false");
            var a = 0
            choose_Categories.map((item, index) => {
                if (item.isSelected) {
                    finalFormData.append(`notification_category_id[${a}]`, item.id);
                    ++a;
                }
            })
            finalFormData.append('notification_type_id', to_be_Done_Type);
            finalFormData.append('distance', distance);
            finalFormData.append('location', location);
            finalFormData.append('lat', lat);
            finalFormData.append('lng', lng);
            finalFormData.append('from', "notification");

            const data = finalFormData

            const res = await axiosInstance.post("Notification-preference", data)
            if (res.data.result) {
                setLoader(false)
                // Toast.show(res.data.result.meaning)
                setIsSubmitSucessModal(true)
            } else {
                setLoader(false)
                Toast.show(res.data.error.meaning)
            }
        } catch (error) {
            setLoader(false)
            console.log("onNotificationOn---------", error)
        }
    }
    return (
        <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
            <Header backFunc={handleBackButtonClick} back name={"Notification Preferences"} navigation={navigation} />
            <View style={{ flex: 1, backgroundColor: Colors.white }}  >
                <CurveDesing_Component   >
                    <View style={{ flex: 1, marginHorizontal: Normalize(15) }} >
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="always"
                        >
                            {/* {
                                        isNotificationOn && */}
                            <View style={{ flex: 1, marginBottom: Normalize(20) }}  >
                                {/* choose category */}
                                <View>
                                    <Text style={[globalstyles.plantext_Outfit_Medium, { fontSize: Normalize(13), color: Colors.greyText }]} >New task posted alert</Text>
                                    <Text style={[globalstyles.plantext_outfit_regular, { fontSize: Normalize(11.5), color: Colors.greyText, marginTop: Normalize(7) }]} >Be instantly notified about new work opportunities</Text>
                                    <Text style={[globalstyles.plantext_outfit_regular, { fontSize: Normalize(11.5), marginTop: Normalize(12) }]} >How do you to be notified?</Text>
                                    <View style={{ flexDirection: 'row', marginTop: Normalize(10) }}>
                                        <View style={{ flexDirection: 'row', marginBottom: 20, }}>
                                            <TouchableOpacity
                                                onPress={() => setSelection(!isSelected)}
                                                style={{ height: Normalize(20), width: Normalize(20), alignSelf: 'center' }} >
                                                <Image source={isSelected ? images.checked : images.unchecked} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                                            </TouchableOpacity>
                                            <Text style={{ margin: 8 }}>Email</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 20, marginLeft: Normalize(20) }}>
                                            <TouchableOpacity
                                                onPress={() => setSelection2(!isSelected2)}
                                                style={{ height: Normalize(20), width: Normalize(20), alignSelf: 'center' }} >
                                                <Image source={isSelected2 ? images.checked : images.unchecked} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                                            </TouchableOpacity>
                                            <Text style={{ margin: 8 }}>Push Notification</Text>
                                        </View>
                                    </View>
                                    {/* {to_be_Done_Type == "1" && */}
                                    <View style={{}} >
                                        {/* location */}
                                        <Text style={globalstyles.textinput_Header_Style}>Which location do you want to be notified?</Text>

                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={{
                                                width: '95%',
                                                alignSelf: 'center',
                                                borderBottomWidth: Normalize(0.5),
                                                borderBottomColor: Colors.borderColor,
                                                marginVertical: Normalize(5),
                                                height: Normalize(42),
                                                flexDirection: "row",
                                                alignItems: "center"
                                            }}
                                            onPress={() =>
                                                navigation.navigate('Noti_Location_selectPage')
                                            }>

                                            <View style={{ flex: 1 }} >
                                                <Text
                                                    numberOfLines={1}
                                                    style={{
                                                        fontSize: Normalize(12),
                                                        fontFamily: 'Lato-Bold',
                                                        color: Colors.greyText,
                                                    }}>
                                                    {location ? location : "Choose notification location"}
                                                </Text>
                                            </View>


                                            <View
                                                style={{
                                                    height: '100%',
                                                    width: Normalize(20),
                                                    justifyContent: "center", alignItems: "center"
                                                }}>
                                                <Entypo
                                                    name="location-pin"
                                                    size={Normalize(15)}
                                                    color={Colors.greyText}
                                                />
                                            </View>


                                        </TouchableOpacity>


                                        <View>
                                            <View style={[styles.rowView]}>
                                                <Text style={globalstyles.textinput_Header_Style}>Radius</Text>
                                                <Text
                                                    style={[globalstyles.plantext_roboto_regular, { color: Colors.greyText, fontSize: Normalize(15) }]}>
                                                    {distance ? distance : 50} {strings.BROWSEFILTER.KM}
                                                </Text>
                                            </View>
                                            <View style={{}} >
                                                <Slider
                                                    value={temp_Distance}
                                                    minimumValue={1}
                                                    maximumValue={50}
                                                    step={1}
                                                    minimumTrackTintColor={Colors.secondary}
                                                    maximumTrackTintColor={Colors.borderColor}
                                                    onValueChange={(val) => {
                                                        setDistance(Math.round(val))
                                                    }}
                                                    onSlidingComplete={val => {
                                                        setTemp_Distance(Math.round(val))
                                                    }}

                                                    style={{ height: 30, width: "100%" }}
                                                    thumbTintColor={Colors.secondary}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    {/* } */}
                                    <View
                                        style={{
                                            width: '100%',
                                            alignSelf: 'center',
                                            marginVertical: Normalize(5),
                                            height: Normalize(42),
                                            flexDirection: "row",
                                            overflow: "hidden",
                                            justifyContent: 'space-between'
                                        }} >
                                        <Text style={[globalstyles.plantext_outfit_regular, { fontSize: Normalize(11), alignSelf: 'center' }]}>Which Categories do you want to be notified about?</Text>

                                        <Pressable
                                            onPress={() => navigation.navigate("Category_Choose_Page", { from: "NotificationPreferences" })}
                                            style={{
                                                height: Normalize(20), width: Normalize(20), marginRight: Normalize(5), backgroundColor: Colors.blue,
                                                alignSelf: 'center', borderRadius: Normalize(10), alignItems: 'center', justifyContent: 'center'
                                            }}>
                                            <Entypo
                                                name="edit"
                                                size={Normalize(10)}
                                                color={Colors.white}
                                            />
                                        </Pressable>
                                    </View>

                                    <View style={{ flexDirection: "row", flexWrap: "wrap" }} >
                                        {
                                            choose_Categories.map((item, index) => (
                                                item.isSelected &&
                                                <View
                                                    key={index} style={{ flexDirection: "row", alignItems: "center", backgroundColor: Colors.secondaryBackground, borderWidth: Normalize(1), borderColor: Colors.secondary, margin: Normalize(2), borderRadius: Normalize(5) }} >
                                                    <Text style={{
                                                        padding: Normalize(5), fontSize: Normalize(12), color: Colors.greyText, borderRadius: Normalize(3), margin: Normalize(1),
                                                    }}>{item.name}</Text>
                                                </View>
                                            ))
                                        }
                                    </View>
                                    {/* ******************to be done tabs****************** */}
                                    <View>
                                        <Text style={globalstyles.textinput_Header_Style}>Type of task</Text>
                                        <View style={styles.customtab}>
                                            <Pressable activeOpacity={0.8} onPress={() => setTo_be_Done_Type("1")}
                                                style={[styles.newtobedone]} >
                                                <View style={{ height: Normalize(17), width: Normalize(17), borderRadius: Normalize(17) / 2, borderColor: to_be_Done_Type == "1" ? Colors.secondary : Colors.borderColor, borderWidth: 1, justifyContent: "center", alignItems: "center" }} >
                                                    {
                                                        to_be_Done_Type == "1" &&
                                                        <FontAwesome
                                                            name={"circle"}
                                                            color={Colors.secondary}
                                                            size={Normalize(12)}
                                                        />
                                                    }
                                                </View>
                                                <Text
                                                    style={[globalstyles.plantext_outfit_regular, { paddingLeft: Normalize(4), color: Colors.greyText, }]}>
                                                    {strings.BROWSEFILTER.INPERSON}
                                                </Text>
                                            </Pressable>
                                            <Pressable activeOpacity={0.8} onPress={() => setTo_be_Done_Type("2")}
                                                style={[styles.newtobedone]} >
                                                <View style={{ height: Normalize(17), width: Normalize(17), borderRadius: Normalize(17) / 2, borderColor: to_be_Done_Type == "2" ? Colors.secondary : Colors.borderColor, borderWidth: 1, justifyContent: "center", alignItems: "center" }} >
                                                    {
                                                        to_be_Done_Type == "2" &&
                                                        <FontAwesome
                                                            name={"circle"}
                                                            color={Colors.secondary}
                                                            size={Normalize(12)}
                                                        />
                                                    }
                                                </View>
                                                <Text
                                                    style={[globalstyles.plantext_outfit_regular, { paddingLeft: Normalize(4), color: Colors.greyText, }]}>
                                                    {strings.BROWSEFILTER.REMOTELY}
                                                </Text>
                                            </Pressable>
                                            <Pressable activeOpacity={0.8} onPress={() => setTo_be_Done_Type("3")}
                                                style={[styles.newtobedone]} >
                                                <View style={{ height: Normalize(17), width: Normalize(17), borderRadius: Normalize(17) / 2, borderColor: to_be_Done_Type == "3" ? Colors.secondary : Colors.borderColor, borderWidth: 1, justifyContent: "center", alignItems: "center" }} >
                                                    {
                                                        to_be_Done_Type == "3" &&
                                                        <FontAwesome
                                                            name={"circle"}
                                                            color={Colors.secondary}
                                                            size={Normalize(12)}
                                                        />
                                                    }
                                                </View>
                                                <Text style={[globalstyles.plantext_outfit_regular, { paddingLeft: Normalize(4), color: Colors.greyText, }]}>
                                                    {strings.BROWSEFILTER.ALL}
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>

                                </View>
                            </View>
                            {/* } */}
                        </ScrollView>
                        <Button
                            onPress={onpressSubmit}
                            style={{ marginBottom: Normalize(5), marginTop: Normalize(5) }}
                            name="Submit"
                        />
                    </View>

                    {
                        isSubmitSucessModal &&
                        <SucessModalDesign
                            ispress={isSubmitSucessModal}
                            onpress={() => { setIsSubmitSucessModal(false) }}
                            title={"Sucess!"}
                            subTitle={"Notification preferences update sucessfully"}
                        />
                    }


                    {
                        loader && <NewLoaderPage />
                    }
                </CurveDesing_Component>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    input: {
        fontSize: Normalize(12),
        fontFamily: 'roboto-regular',
        color: Colors.greyText,
    },
    uploadBtn: {
        width: Normalize(80),
        height: Normalize(80),
        overflow: "hidden",
    },
    uploadBtnImg: {
        width: "100%",
        height: "100%",
    },
    galleryorcamera_icon: {
        height: Normalize(75), width: Normalize(75), borderRadius: Normalize(75) / 2, backgroundColor: Colors.disable_textinput_background, marginBottom: Normalize(5), justifyContent: "center", alignItems: "center"
    },
    tobedone: {
        height: "100%", width: "30%", justifyContent: "center", alignItems: "center",
        borderWidth: 0.9,
        borderColor: Colors.borderColor,
        borderRadius: 6,
    },
    newtobedone: {
        height: "100%", width: "33%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"

    },
    customtab: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '92%',

        marginBottom: Normalize(5),
        width: '100%',
        marginVertical: Normalize(5),
        height: Normalize(40),
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Normalize(5)
    },
    imageUploadBtn: {
        borderWidth: 0.8,
        borderColor: Colors.primary,
        backgroundColor: Colors.disable_textinput_background,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
        width: '100%',
        marginTop: Normalize(5),
        marginBottom: Normalize(15),
    },
    iconStyle: {
        height: Normalize(25),
        width: Normalize(25),
    },
    saveBtn: {
        marginBottom: Normalize(20),
        marginTop: Normalize(5)
    },

    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Normalize(5)
    },

});