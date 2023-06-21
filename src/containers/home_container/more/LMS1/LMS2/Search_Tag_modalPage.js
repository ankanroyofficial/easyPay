import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    KeyboardAvoidingView,
    Keyboard,
    Platform
} from 'react-native';
import Toast from "react-native-simple-toast";
import Header from '../../../../../components/Header';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import strings from './../../../../../constants/lng/LocalizedStrings';
import styles from './Styles';
import { Colors } from '../../../../../constants/colors';
import Button from './../../../../../components/Button';
import { myContext } from "../../../../../constants/ContextApi"
import { leftOrRight, rowOrRowreverse } from '../../../../../constants/RowOrRowreverse';
import images from '../../../../../constants/images';
import Entypo from 'react-native-vector-icons/Entypo';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import { fontfmliy } from '../../../../../components/WhichFontFamily';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';

export default function Search_Tag_modalPage(props) {

    const { prevData } = props.route.params

// console.log("=>>",prevData)

    const navigation = useNavigation()
    const { language } = useRtlContext();
    const {
        lMS_search_tag, setLMS_search_tag,
    } = useContext(myContext)
    const [tagText, setTagText] = useState("");
    const [skillArray, setSkillArray] = useState(prevData);

    const handleAddSkills = useCallback(() => {
        let array = skillArray;
        let skill = tagText;
        if (skill.length == 0 || skill.trim() == "") {
            Toast.show(strings.LMS.ENTERATAG)
        } else {

            let x = Math.random() * 100;

            const data = {
                id: `${new Date().toString()} ${x}`,
                name: skill,
            };

            // console.log(data.id)

            array.push(data);
            setSkillArray(array);
            setTagText('');
            return;
        }
    },[tagText]);
    const handleDeleteSkills = async (id) => {
        try {
            const idx = id.toString();
            let array = skillArray;
            let newArr = array.filter(item => item.id != idx);
            Toast.show(strings.LMS.TAGDELETED)
            setSkillArray(newArr);
        } catch (error) {
            console.log(error)
        }
    };
    const saveButton = () => {
        if (skillArray.length < 1) {
            Toast.show(strings.LMS.ATLEAST1TAG)
        } else {
            if (skillArray.length > 15) {
                Toast.show(strings.LMS.SEARCHTAGCANNOTBE15)
            } else {
                navigation.push("LMS2")
            }
        }
    }

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
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }} >
            <View style={{ flex: 1, backgroundColor: Colors.white }} >
                <Header back name={strings.LMS.LMS2_TEXT_6} navigation={navigation} backFunc={handleBackButtonClick} />
                <View style={{ flex: 1 }} >
                    <View style={styles.container}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="always"
                            style={{
                                flex: 1,
                                paddingVertical: Normalize(10),
                            }}>
                            <View style={{ flex: 1, }}>
                                <View style={{ marginHorizontal: Normalize(15), }}>
                                    <Text style={[globalstyles.page_SubHeader_Text, { fontSize: Normalize(12) }]}>{strings.LMS.LMS2_TEXT_7}</Text>

                                    {/* skill text box and add button */}

                                    <View style={[globalstyles.textinput_onlyBox_Style, { borderColor: Colors.borderColor, backgroundColor: Colors.white, overflow: "hidden" }]} >
                                        <View style={{ flex: 1 }}>
                                            <TextInput
                                                value={tagText}
                                                style={[
                                                    globalstyles.textinput_onlyText_Style
                                                ]}
                                                placeholder={strings.MAKEANOFFER.ENTERHERE}
                                                placeholderTextColor={Colors.textinput_inner_text}
                                                onChangeText={text => setTagText(text)}
                                            />
                                        </View>
                                        <TouchableOpacity
                                            disabled={skillArray.length == 15 ? true : false}
                                            onPress={handleAddSkills}
                                            style={{ height: "100%", width: Normalize(55), backgroundColor: skillArray.length == 15 ? Colors.disableBackGround : Colors.secondary, justifyContent: "center", alignItems: "center" }}>
                                            <Text
                                                style={{
                                                    fontSize: Normalize(13),
                                                    fontFamily: 'Outfit-SemiBold',
                                                    color: skillArray.length == 15 ? Colors.disableText : Colors.white,
                                                }}>
                                                {strings.SKILLS.ADDBTN}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    {
                                        skillArray.length != 0 &&
                                        <Text style={[globalstyles.plantext_roboto_regular, { color: "#070C18", marginTop: Normalize(20) }]}>{strings.LMS.LMS2_TEXT_6}</Text>
                                    }

                                    {skillArray.length !== 0 && (
                                        <View
                                            style={{
                                                marginTop: Normalize(10),
                                                flexDirection: rowOrRowreverse(language),
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                            }}>
                                            {skillArray.map(item => {
                                                return (
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            borderWidth: Normalize(1),
                                                            borderColor: "#9CA3AC",
                                                            borderRadius: 6,
                                                            alignSelf: 'flex-start',
                                                            paddingHorizontal: Normalize(5),
                                                            paddingVertical: Normalize(2),
                                                            margin: Normalize(5),
                                                        }}
                                                        key={item.id}>
                                                        <Text style={{
                                                            fontSize: Normalize(11),
                                                            fontFamily: 'Outfit-Regular',
                                                            color: Colors.grey,
                                                        }}>
                                                            {item.name ? item.name : item.get_skill.skill}
                                                        </Text>
                                                        <TouchableOpacity
                                                            style={{ marginLeft: Normalize(5) }}
                                                            onPress={() => handleDeleteSkills(item.id)}>
                                                            <Entypo
                                                                name="cross"
                                                                size={Normalize(17)}
                                                                color={Colors.red_old}
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                );
                                            })}
                                        </View>
                                    )}
                                </View>
                            </View>
                        </ScrollView>
                        <Button
                            onPress={saveButton}
                            style={{
                                marginHorizontal: Normalize(15),
                                marginVertical: Normalize(20),
                                backgroundColor: Colors.green_new_2
                            }}
                            nextarrow
                            name={strings.SKILLS.SAVE}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}