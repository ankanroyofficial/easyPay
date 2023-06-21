import React, { useContext, useState, useEffect } from 'react'
import {
    Image, ScrollView, TouchableOpacity, View, Text, TextInput, SafeAreaView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Toast from "react-native-simple-toast";
import Button from '../../../../components/Button';
import Header from '../../../../components/Header'
import { Colors } from '../../../../constants/colors';
import strings from '../../../../constants/lng/LocalizedStrings'
import Normalize from '../../../../helpers/Dimens';
import styles from './Styles'
import { myContext } from "../../../../constants/ContextApi"
import LoaderPage from '../../../../components/LoaderPage';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';

export default function EditAddMustHave({ navigation }) {
    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
    const { must_have, setMust_Have, editOrpostsimilar } = useContext(myContext)


    const [second_one, setsecond_one] = useState([]);
    const [whatOrdo, setWhatOrdo] = useState("")
    const [loader, setLoader] = useState(true)
    const bulletPoint = [
        {
            id: 1,
            point: "Must be available on Sunday morning",
            point1: "مدرک معتبر"
        },
        {
            id: 2,
            point: "Must have own van or truck",
            point1: "سابقه کار مرتبط"
        }
    ]

    useEffect(() => {
        // setsecond_one(must_have);
        must_have.map((item) => {
            second_one.push(item)
        })
        setLoader(false)
        //  alert(JSON.stringify(must_have)+"ooo"+JSON.stringify(second_one))

        return () => {
        }
    }, []);


    const addButton = () => {

        const data = {
            id: new Date().toString(),
            title: whatOrdo,
        };
        if (whatOrdo.length != 0 && whatOrdo.trim().length != 0) {
            second_one.push(data)
            setWhatOrdo("")
            // alert(JSON.stringify(must_have))
        } else {
            Toast.show(strings.POSTTASK.ATFIRSTENTER)
        }
    }
    const deleteButton = (idx) => {
        var arr = second_one
        var newArr = [];
        newArr = arr.filter(item => item.id != idx)
        setsecond_one(newArr)

    }
    const saveButton = () => {
        //   console.log(must_have)
        if (whatOrdo.length == 0) {
            setMust_Have(second_one);
            navigation.goBack();
        } else {
            Toast.show(strings.POSTTASK.PRESSADD)
        }
    }
    const second_onef = () => {

        // setTimeout(() => {
        return second_one;

        // }, 5000);
    }
    return (
        <>
            {
                loader ?
                    <LoaderPage /> :
                    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

                        <KeyboardAvoidingView
                            behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ flex: 1 }}>
                            <Header back name={editOrpostsimilar == "edit" ? strings.POSTTASK.EDITTASK : strings.POSTTASK.SIMILARTASK} navigation={navigation} />
                            <CurveDesing_Component  >
                                <View style={globalstyles.container} >
                                    <ScrollView showsVerticalScrollIndicator={false}  >
                                        <Text style={[globalstyles.page_Header_Text, { marginTop: Normalize(15), }]}>{strings.POSTTASK.MUSTHAVES}</Text>
                                        <Text style={[globalstyles.page_SubHeader_Text, { marginBottom: Normalize(20), color: "#070C18", lineHeight: Normalize(15), fontSize: Normalize(13) }]}>{strings.POSTTASK.MUSTHAVESHEADING}</Text>
                                        {
                                            bulletPoint.map((item, index) => (
                                                <View key={index} style={{ flexDirection: "row", alignItems: "center", paddingBottom: Normalize(5) }}>
                                                    <View style={{ height: Normalize(11), width: Normalize(11), justifyContent: "center", alignItems: "center", marginHorizontal: Normalize(6) }}>
                                                        <Image source={require("../../../../../assets/bullet-grey.png")} style={{ height: "63%", width: "63%", resizeMode: "cover" }} />
                                                    </View>
                                                    <Text style={[globalstyles.plantext_outfit_regular]}>{language == "en" ? item.point : item.point1}</Text>
                                                </View>
                                            ))
                                        }
                                        <View style={[globalstyles.textinput_onlyBox_Style, { borderColor: Colors.primary, backgroundColor: Colors.white, overflow: "hidden", marginVertical: Normalize(15) }]} >
                                            <View style={{ flex: 1 }}>
                                                <TextInput
                                                    value={whatOrdo}
                                                    style={[
                                                        globalstyles.textinput_onlyText_Style
                                                    ]}
                                                    placeholder={strings.SKILLS.SKILLPLACEHOLDER}
                                                    placeholderTextColor={Colors.textinput_inner_text}
                                                    onChangeText={(e) => setWhatOrdo(e)}
                                                />
                                            </View>
                                            <TouchableOpacity
                                                disabled={second_one.length == 3 ? true : false}
                                                onPress={addButton}
                                                style={{ height: "100%", width: Normalize(55), backgroundColor: second_one.length == 3 ? Colors.disableBackGround : Colors.secondary, justifyContent: "center", alignItems: "center" }}>
                                                <Text
                                                    style={{
                                                        color: second_one.length == 3 ? Colors.disableText : Colors.white,
                                                        fontSize: Normalize(13),
                                                        fontFamily: 'Outfit-SemiBold',
                                                    }}>
                                                    {strings.POSTTASK.ADD}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        {
                                            second_onef().map((item, index) => (
                                                <View key={index} style={{ flexDirection: language == "en" ? "row" : "row-reverse", width: "100%", alignItems: "center" }}>
                                                    <View style={{ height: Normalize(12), width: Normalize(12), justifyContent: "center", alignItems: "center", marginHorizontal: Normalize(6) }}>
                                                        <Image source={require("../../../../../assets/tick11.png")} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                    </View>
                                                    <Text style={{
                                                        fontSize: Normalize(13),
                                                        fontFamily: 'roboto-medium',
                                                        color: Colors.greyText,
                                                        lineHeight: Normalize(16),
                                                        width: "80%",
                                                        textAlign: language == "en" ? "left" : "right",
                                                        marginLeft: Normalize(5)
                                                    }}>
                                                        {item.title}
                                                    </Text>
                                                    <TouchableOpacity onPress={() => deleteButton(item.id)} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} style={{ height: Normalize(10), width: Normalize(11), justifyContent: "center", alignItems: "center", marginHorizontal: Normalize(6) }}>
                                                        <Image source={require("../../../../../assets/cross-red.png")} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                    </TouchableOpacity>
                                                </View>
                                            ))
                                        }
                                    </ScrollView>
                                    <Button
                                        onPress={saveButton}
                                        name={strings.POSTTASK.SAVE}
                                        style={{ marginVertical: Normalize(25) }}
                                    />
                                </View>

                            </CurveDesing_Component>
                        </KeyboardAvoidingView>
                    </SafeAreaView>
            }

        </>
    )
}
