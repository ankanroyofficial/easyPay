import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native'
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Toast from 'react-native-simple-toast';
import { Colors } from '../../../../constants/colors';
import { myContext } from '../../../../constants/ContextApi';
import Button2 from "../../../../components/Button2"
import Pusher from 'pusher-js';
import pusherConfig from '../../../../../pusher.json';
import axiosInstance from '../../../../constants/AxiosCallPage';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function CancelTask({ ispress, onPress, taskSlugname,menuOff }) {

    const navigation=useNavigation()

    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
    const { socketId, setSocketId } = useContext(myContext);

    const [loader, setLoader] = useState(false)

    const [canceltaskDetails, setCanceltaskDetails] = useState({
        "cancel_subject": "",
        "cancel_reason": ""
    })

    const [taskCancel_Subject, setTaskCancel_Subject] = useState("")
    const [taskCancel_Reason, setTaskCancel_Reason] = useState("")





    const getSocketId = () => {
        const pusher = new Pusher(pusherConfig.key, pusherConfig);
        //  let channel = pusher.subscribe("eazypay-development");
        //  console.log(channel)
        pusher.connection.bind("connected", () => {
            var socketId = pusher.connection.socket_id;
            // console.log("socket id",socketId)
            setSocketId(socketId)
        });
    }
    useEffect(() => {
        getSocketId()
    }, [ispress])

    const cancelTask = async () => {
        try {
            if (taskCancel_Subject == "") {
                Toast.show("Select any one point")
            } else {
                if (taskCancel_Reason.trim() == "") {
                    Toast.show("Enter your reason")
                } else {

                    setLoader(true)
                    const res = {
                        "jsonrpc": "2.0",
                        "params": {
                            "slug": taskSlugname,
                            "cancel_reason": taskCancel_Reason,
                            "cancel_subject": taskCancel_Subject
                        }
                    }
                    const data = await axiosInstance.post("cancel-task", res)
                    console.log(data.data)
                    if (data.data.error == undefined) {
                        Toast.show(data.data.result.meaning)
                        await AsyncStorage.setItem("isMyTaskloader", "true")
                        await AsyncStorage.setItem("isBrowserTaskloader", "true")
                        setLoader(false)
                        onPress()
                        menuOff()
                        navigation.navigate({
                            name: "My tasks",
                            params: {
                                screen: "MyTasks",
                            },
                        })
                    } else {
                        Toast.show(data.data.error.meaning)
                    }
                    setLoader(false)
                }
            }
        } catch (error) {
            setLoader(false)
            console.log("cancelTask", error)
        }
    }

    const subjectList = [
        {
            id: 0,
            topic: "I no longer need the service"
        },
        {
            id: 1,
            topic: "Ifound a better price outside"
        },
        {
            id: 2,
            topic: "A EazyPayer asked to work outside"
        },
        {
            id: 3,
            topic: "No suitable offers"
        },
        {
            id: 4,
            topic: "Technical issues"
        },
        {
            id: 5,
            topic: "Other"
        },

    ]

    return (
        <Modal
            visible={ispress}
            onRequestClose={onPress}
            animationType="none"
            transparent
        >
            <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", justifyContent: "center", alignItems: "center" }} >
                <View style={{ padding: Normalize(10), width: "85%", backgroundColor: Colors.white, elevation: 10, borderRadius: Normalize(8) }} >

                    <Fragment>
                        <View style={{ alignItems: "center" }}>
                            <View style={{
                                height: Normalize(60), width: Normalize(60), backgroundColor: Colors.white, marginTop: Normalize(-50),
                                borderRadius: Normalize(30), alignItems: 'center', justifyContent: 'center'
                            }}>
                                <View style={{
                                    height: Normalize(50), width: Normalize(50), backgroundColor: 'red',
                                    borderRadius: Normalize(25), alignSelf: 'center', justifyContent: 'center', alignItems: 'center'
                                }} >
                                    <Foundation
                                        name='page-delete'
                                        size={Normalize(30)}
                                        color={Colors.white}
                                    />
                                </View>
                            </View>
                            <Text style={[globalStyle_esyPay.pageHeading, { width: "60%", textAlign: "center", color: Colors.greyText, fontSize: Normalize(14.5), marginTop: Normalize(8), fontFamily: fontfmliy.bold }]}>why would you like to cancel your task ?</Text>

                            <View style={{ width: "90%", alignSelf: "center", marginTop: Normalize(10) }} >

                                {
                                    subjectList.map((item, index) => {
                                        return (

                                            <View key={index} style={{}} >


                                                <Pressable
                                                    onPress={() => setTaskCancel_Subject(item.topic)}
                                                    style={{
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                        width: "100%",
                                                        marginBottom: taskCancel_Subject == item.topic ? Normalize(5) : Normalize(15)
                                                    }} >
                                                    <Text style={[globalstyles.plantext_regular, {
                                                        fontSize: Normalize(13),
                                                    }]}>{item.topic}</Text>
                                                    <View style={{ height: Normalize(17), width: Normalize(17), borderRadius: Normalize(3), backgroundColor: taskCancel_Subject == item.topic ? Colors.primary : Colors.white, borderColor: Colors.primary, borderWidth: taskCancel_Subject == item.topic ? 0 : Normalize(1), justifyContent: "center", alignItems: "center" }}>
                                                        {taskCancel_Subject == item.topic && <Entypo name="check" color={Colors.white} size={Normalize(13)} />}
                                                    </View>
                                                </Pressable>
                                                {taskCancel_Subject == item.topic &&
                                                    <View style={[globalstyles.multiline_textinputStyle, { height: Normalize(80), width: "99%", alignSelf: "center", marginBottom: Normalize(10), borderColor: Colors.boxBorder }]} >
                                                        <TextInput
                                                            value={taskCancel_Reason}
                                                            onChangeText={(e) => { setTaskCancel_Reason(e) }}
                                                            placeholder='Please enter your reason'
                                                            style={globalstyles.multiline_only_text}
                                                        />
                                                    </View>}
                                            </View>
                                        )
                                    })
                                }
                            </View>



                            <Text style={[globalStyle_esyPay.detailsText, {
                                fontSize: Normalize(12),
                                marginTop: Normalize(5),
                                marginBottom: Normalize(15),
                                textAlign: "center"
                            }]}>Remember: if you faced a problem or have a question about the platform, the Support Team is here to help, just let's us know before cancelling</Text>
                        </View>

                        <View style={{ flexDirection: "row", marginBottom: Normalize(8), justifyContent: "space-around" }}>
                            <Button2
                                style={{ width: "48%", backgroundColor: Colors.primary }}
                                onPress={() => Toast.show("in progress")}
                                name={"Contact support"}
                            />
                            <Button2
                                disabled={loader}
                                style={{ width: "48%" }}
                                onPress={cancelTask}
                                name={"Cancel task"}
                            />
                        </View>
                    </Fragment>



                </View>
                <Pressable
                    onPress={onPress}
                    style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.white, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(10) }} >
                    <Entypo name="cross" color={Colors.textinput_inner_text} size={Normalize(35)} />
                </Pressable>
            </View>
        </Modal>

    )
}
export default withRtl(CancelTask);