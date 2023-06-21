import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import {
    View, Text, Modal, ScrollView, Image, TouchableOpacity, Alert, Platform,
    TextInput, ActivityIndicator, SafeAreaView
} from 'react-native'
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Toast from 'react-native-simple-toast';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import { useNavigation } from "@react-navigation/native"
import moment from 'moment';
import Pusher from 'pusher-js';
import strings from '../../../../constants/lng/LocalizedStrings';
import { engToPersian } from '../../../../constants/EnglishToPersian';
import { myContext } from '../../../../constants/ContextApi';
import Button from "../../../../components/Button"
import { numberWithCommas } from '../../../../constants/NumberWithComma';
import pusherConfig from '../../../../../pusher.json';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import LoaderPage from '../../../../components/LoaderPage';
import { WebView } from 'react-native-webview';
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import { rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import { nameShorting } from '../../../../constants/NameShorting';

function WebView_PaymentModal({ ispress, onPress, apiUrl, prev_func, prev_Summary_func }) {

    const navigation = useNavigation()
    const webref = useRef()
    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();

    const onNavigationStateChangeHandle = async({ url }) => {
        // console.log("********", url)
        if (url == `${axiosUrl.URL}payment-fail`) {
            onPress()
            prev_Summary_func()
            prev_func()

            if (Platform.OS == "ios") {
                Alert.alert(
                    "Fail!",
                    "Payment Failed",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            } else {
                Toast.show(strings.ERROR.PAYMENTCANCEL)
            }
        } else if (url == `${axiosUrl.URL}payment-cancel`) {
            onPress()
            prev_Summary_func()
            prev_func()

            if (Platform.OS == "ios") {
                Alert.alert(
                    "Cancel!",
                    "Payment Cancelled",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            } else {
                Toast.show(strings.ERROR.PAYMENTCANCEL)
            }
        }
        else if (url == `${axiosUrl.URL}payment-success`) {
            onPress()
            prev_Summary_func()
            prev_func()
            // await AsyncStorage.setItem("isMyTaskloader", "true")
            // await AsyncStorage.setItem("isBrowserTaskloader", "true")
            if (Platform.OS == "ios") {
                Alert.alert(
                    "Success!",
                    "Payment Done Sucessfully",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            } else {
                Toast.show(strings.ERROR.PRICEINCREASESUCESSFULLY)
            }
        } else if (url == `${axiosUrl.URL}payment-in-progress`) {
            onPress()
            prev_Summary_func()
            prev_func()
            if (Platform.OS == "ios") {
                Alert.alert(
                    "Success!",
                    "Payment in progress",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            } else {
                Toast.show("Payment in progress")
            }
        } else {
            // console.log(url)
        }
    }
    const renderLoadingView = () => {
        return (
            <View style={{
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                position: "absolute"
            }} >
                <LoaderPage />
            </View>
        );
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ispress}
            onRequestClose={() => {
                Toast.show(strings.ERROR.PAYMENTCANCEL)
                onPress()
                // prev_func()
                prev_Summary_func()
            }}
        >
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>

                <View style={{ flex: 1, backgroundColor: Colors.white }} >
                    <View style={{ height: Normalize(50), width: "100%", flexDirection: rowOrRowreverse(language), justifyContent: "space-between", alignItems: "center", borderBottomColor: "#E8E8E8", borderBottomWidth: 1, backgroundColor: Colors.primary }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                            <Text style={{
                                fontSize: Normalize(14),
                                fontFamily: 'roboto-bold',
                                color: Colors.white
                            }}>{strings.MAKEANOFFER.PAYMENT}</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.5}
                            onPress={() => {
                                Toast.show(strings.ERROR.PAYMENTCANCEL)
                                onPress()
                                // prev_func()
                                prev_Summary_func()

                            }}
                            style={{ height: Normalize(50), width: Normalize(50), justifyContent: "center", alignItems: "center" }} >
                            <Image source={images.crossWhite} style={{ height: Normalize(12), width: Normalize(12), resizeMode: "contain" }} />
                        </TouchableOpacity>
                    </View>
                    {/* <WebView
                    ref={webref}
                    // source={{ uri: "https://api.payping.ir/v1/pay/gotoipg/5f97e41" }}
                    source={{ uri: apiUrl }}
                    style={{ flex: 1 }}
                    onLoad={console.log("loaded")}
                    onNavigationStateChange={onNavigationStateChangeHandle}
                    renderLoading={renderLoadingView}
                    startInLoadingState={true}
                    cacheEnabled={false}
                // incognito={true}
                // onLoadEnd={()=>{console.log("load end")}}
                /> */}

                    <WebView
                        ref={webref}
                        source={{ uri: apiUrl }}
                        style={{ flex: 1 }}
                        onLoad={() => console.log("Loading...")}
                        onNavigationStateChange={onNavigationStateChangeHandle}
                        renderLoading={renderLoadingView}
                        startInLoadingState={true}

                    />
                </View>
            </SafeAreaView>
        </Modal>

    )
}
export default withRtl(WebView_PaymentModal);
