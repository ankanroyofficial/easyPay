import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import {View, Text, Modal, ScrollView, Image, TouchableOpacity} from 'react-native'
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import Button from "../../../../components/Button"
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
export default GuidelinesModal = ({ ispress, onpress }) => {
    const navigation = useNavigation()
    const [inWhichPage, setInWhichPage] = useState("InitialStep")

    const InitialStep = () => {
        return (
            <View style={{ width: "100%" }}>

                <View style={{ height: Normalize(120), width: "100%" }} >
                    <Image source={images.guidline} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                </View>

                <View style={{ paddingVertical: Normalize(8) }} >
                    <Text style={[globalstyles.plantext_regular, { fontSize: Normalize(12), color: Colors.grey, textAlign: "center", lineHeight: Normalize(14) }]} >Guildlines are in place on EazyPay, not only to grow and maintain the community but also to ensure quality work and the safty of all members.</Text>
                    <Text style={[globalstyles.plantext_regular, { fontSize: Normalize(12), color: Colors.grey, textAlign: "center", lineHeight: Normalize(14), paddingVertical: Normalize(15) }]} >Not following the guidelines will lead to EazyPay deleting offers,posted tasks and suspending accounts.</Text>
                    <Text style={[globalstyles.plantext_regular, { fontSize: Normalize(12), color: Colors.grey, textAlign: "center", lineHeight: Normalize(14) }]} >Here are some of the important guidlines to keep in mind when applying for tasks.</Text>
                </View>


                <Button
                    style={{ backgroundColor: Colors.secondary }}
                    onPress={() => { setInWhichPage("FirstStep") }}
                    name={"Let's Go"}
                />
            </View >
        )
    }

    const firstStepData = [
        {
            text: "Please do not share personal information or 3rd party links before being officially booked: E.G phone numbers,full addresses,email addresses,social media accounts and websites."
        },
        {
            text: "Please do not ask to be paid via cash, partial cash payments or other payment methods outside of the platform: All payments must be sent in full through the app."
        },
        {
            text: "Please do not go to the task location,or start work,before being booked for your services."
        },
    ]
    const secondStepData = [
        {
            text: "Ask question and request photos to understand the task further. Then send an estimated quote and get booked. If necessary,your payment can be increased/decreased once you visit the task location."
        },
        {
            text: "Ask for further details(such as full address) after the booking."
        },
        {
            text: "Always communicate effectively professionally and respectfully."
        },
    ]
    const FirstStep = () => {
        return (
            <View style={{ width: "100%" }}>

                {
                    firstStepData.map((item, index) => {
                        return (
                            <View key={index} style={{ marginBottom: Normalize(10), padding: Normalize(8), borderRadius: Normalize(10), borderWidth: 1, borderColor: Colors.red_old, backgroundColor: Colors.red_old_background }} >
                                <Text style={[globalstyles.plantext_regular, { fontSize: Normalize(12), color: Colors.greylightText, textAlign: "center", lineHeight: Normalize(14) }]} >{item.text}</Text>
                                <View style={{ height: Normalize(30), width: Normalize(30), borderRadius: Normalize(30) / 2, backgroundColor: Colors.red_old, position: "absolute", justifyContent: "center", alignItems: "center", top: 0,bottom:0, left: -Normalize(15) }} >
                                    <Entypo name="cross" color={Colors.white} size={Normalize(20)} />
                                </View>
                            </View>
                        )
                    })
                }

                <Text style={[globalstyles.plantext_regular, { fontSize: Normalize(12), color: Colors.greylightText, textAlign: "center", marginBottom: Normalize(10) }]} >1/3</Text>
                <Button
                    style={{ backgroundColor: Colors.secondary }}
                    onPress={() => { setInWhichPage("SecondStep") }}
                    name={"Next"}
                    nextarrow
                />
            </View >
        )
    }
    const SecondStep = () => {
        return (
            <View style={{ width: "100%" }}>

                {
                    secondStepData.map((item, index) => {
                        return (
                            <View key={index} style={{ marginBottom: Normalize(10), padding: Normalize(8), borderRadius: Normalize(10), borderWidth: 1, borderColor: Colors.green2, backgroundColor: Colors.green2_background }} >
                                <Text style={[globalstyles.plantext_regular, { fontSize: Normalize(12), color: Colors.greylightText, textAlign: "center", lineHeight: Normalize(14) }]} >{item.text}</Text>
                                <View style={{ height: Normalize(30), width: Normalize(30), borderRadius: Normalize(30) / 2, backgroundColor: Colors.green2, position: "absolute", justifyContent: "center", alignItems: "center", top: "30%", left: -Normalize(15) }} >
                                    <Entypo name="check" color={Colors.white} size={Normalize(20)} />
                                </View>
                            </View>
                        )
                    })
                }

                <Text style={[globalstyles.plantext_regular, { fontSize: Normalize(12), color: Colors.greylightText, textAlign: "center", marginBottom: Normalize(10) }]} >2/3</Text>

                <Button
                    style={{ backgroundColor: Colors.secondary }}
                    onPress={() => { setInWhichPage("FinalStep") }}
                    name={"Next"}
                    nextarrow
                />
            </View >
        )
    }
    const FinalStep = () => {
        return (
            <View style={{ width: "100%" }}>
                <View style={{ paddingVertical: Normalize(8) }} >
                    <Text style={[globalstyles.plantext_regular, { fontSize: Normalize(12), color: Colors.grey, textAlign: "center", lineHeight: Normalize(14) }]} >Want to learn more about our Community Guidelines for EasyPayer?YOu can read the full guide <Text onPress={() => {
                        onpress()
                        navigation.navigate("CommunityGuidelines")
                    }} style={{ color: Colors.primary, textDecorationLine: "underline" }} >here</Text>.</Text>
                    <Text style={[globalstyles.plantext_regular, { fontSize: Normalize(12), color: Colors.grey, textAlign: "center", lineHeight: Normalize(14), paddingTop: Normalize(15) }]} ><Text style={{ color: Colors.secondary }} >Please note: </Text> Completeing the task and getting paid outside of the platform will mean that the T&C's and Task Contract are not applied, EazyPayer will not be able to assit with the task and both parties may face account restrictions.</Text>
                </View>

                <Text style={[globalstyles.plantext_regular, { fontSize: Normalize(12), color: Colors.greylightText, textAlign: "center", marginBottom: Normalize(10) }]} >3/3</Text>

                <Button
                    style={{ backgroundColor: Colors.secondary }}
                    onPress={onpress}
                    name={"Got it"}
                />
            </View >
        )
    }
    const whichPageShow = (val) => {
        switch (val) {
            case "InitialStep": return <InitialStep />;
            case "FirstStep": return <FirstStep />;
            case "SecondStep": return <SecondStep />;
            case "FinalStep": return <FinalStep />;
            default: return <InitialStep />;
        }
    }
    return (
        <Modal
            visible={ispress}
            transparent
        >
            <View style={{ backgroundColor: Colors.transparent, flex: 1, justifyContent: "center", alignItems: "center" }} >
                <View style={{ padding: Normalize(20), width: "80%", backgroundColor: Colors.white, elevation: 10, borderRadius: Normalize(8) }} >
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
                                    <Image source={images.logo_white} style={{ height: "58%", width: "58%" }} />
                                </View>
                            </View>
                            <View style={{ width: "100%", alignItems: "center" }} >
                                <Text style={[globalstyles.page_Header_Text, { fontSize: Normalize(17) }]} >Community Guidelines</Text>

                                <View style={{ width: "100%" }}>
                                    {whichPageShow(inWhichPage)}
                                </View>

                            </View>
                        </View>
                    </Fragment>
                </View>
                <TouchableOpacity
                    onPress={onpress}
                    style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.white, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(10) }} >
                    <Entypo name="cross" color={Colors.textinput_inner_text} size={Normalize(35)} />
                </TouchableOpacity>
            </View>

        </Modal>
    )
}