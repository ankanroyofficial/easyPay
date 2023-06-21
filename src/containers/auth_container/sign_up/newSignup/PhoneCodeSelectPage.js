import { View, Text, TextInput, TouchableOpacity, Modal, Image, StyleSheet, ScrollView, Keyboard, BackHandler } from 'react-native'
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Colors } from '../../../../constants/colors'
import Normalize from '../../../../helpers/Dimens';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay'
import Button from '../../../../components/Button'
import Toast from 'react-native-simple-toast';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import strings from '../../../../constants/lng/LocalizedStrings';
import images from '../../../../constants/images';
import axios from 'axios';
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import { myContext } from '../../../../constants/ContextApi';
import { is_search } from '../../../../constants/KeyWordSearch';
import { StatusBar } from 'react-native';
import Header from '../../../../components/Header';
import { useNavigation } from '@react-navigation/native';
export default function PhoneCodeSelectPage() {
    const navigation = useNavigation()
    const { setToken,
        all_country_code,
        onPressOpenModalPh,
        phone_Code,
        setPhone_Code,
        takingPhoneNoModal,
        setTakingPhoneNoModal,
        signupPhoneNumer_details, setSignupPhoneNumer_details
    } = useContext(myContext)
    const [search_phone_Code, setSearch_Phone_Code] = useState("")

    const onpressSelect_CountryCode = () => {
        navigation.goBack();
        onPressOpenModalPh();
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);
    const handleBackButtonClick = () => {
        navigation.goBack(null);
        setTakingPhoneNoModal(true)
        // onPressOpenModalPh();
        return true;
    }


    const onpressOnCountry = async (item) => {
        onpressSelect_CountryCode()

        setPhone_Code(item.phonecode)
        setSignupPhoneNumer_details(item)

        let a = JSON.stringify(item)
        await AsyncStorage.setItem('signupPhoneNumer_details', a);
        await AsyncStorage.setItem("signupPhoneCode", (item.phonecode).toString())
    }

    return (
        <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", }} >
            <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
            <View style={{ flex: 1, backgroundColor: Colors.white, marginVertical: Normalize(0), marginHorizontal: Normalize(0), borderRadius: Normalize(5) }} >
                <Header name={"Select Country"} back />
                <View style={{ flex: 1, paddingVertical: Normalize(10) }} >

                    <View style={[globalstyles.textinput_onlyBox_Style, { width: "90%", height: Normalize(35) }]} >
                        <TextInput
                        underlineColorAndroid={"#FAFAFA"}
                            value={search_phone_Code}
                            onChangeText={(e) => { setSearch_Phone_Code(e) }}
                            style={[globalstyles.textinput_onlyText_Style_No_textAlignVertical, { flex: 1, paddingHorizontal: Normalize(10) }]}
                            placeholder="Search for your country"
                            placeholderTextColor={Colors.textinput_inner_text}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setSearch_Phone_Code("")
                                Keyboard.dismiss()
                            }}
                            style={{ width: "10%", height: "100%", justifyContent: "center", alignItems: "center" }}
                        >
                            {
                                search_phone_Code == "" ?
                                    <Feather name="search" color={Colors.textinput_inner_text} size={Normalize(16)} />
                                    :
                                    <Entypo name="cross" color={Colors.red_old} size={Normalize(16)} />
                            }
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="always"
                    >
                        {
                            all_country_code.map((item, index) => (
                                is_search(search_phone_Code, item.name) && <TouchableOpacity
                                    onPress={() => { onpressOnCountry(item) }}
                                    key={index}
                                    style={{ flexDirection: "row", marginBottom: Normalize(8), backgroundColor: item.phonecode == phone_Code ? Colors.primary : Colors.white, alignItems: "center", justifyContent: "space-between", paddingVertical: Normalize(5), paddingHorizontal: Normalize(20) }} >
                                    <View style={{ flexDirection: "row", alignItems: "center" }} >
                                        <View style={{ height: Normalize(20), width: Normalize(35), marginRight: Normalize(10) }} >
                                            <Image source={{ uri: ImageLink.flag + item.flag }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                                        </View>
                                        <Text style={[globalstyles.plantext_Outfit_Medium, { fontSize: Normalize(13), color: item.phonecode == phone_Code ? Colors.white : Colors.black }]}>{item.name}</Text>
                                    </View>

                                    <Text style={[globalstyles.plantext_outfit_semibold, { fontSize: Normalize(13), color: item.phonecode == phone_Code ? Colors.white : Colors.black, paddingRight: Normalize(5), }]}>+ {item.phonecode}</Text>

                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </View>

            </View>
        </View>
    )
}