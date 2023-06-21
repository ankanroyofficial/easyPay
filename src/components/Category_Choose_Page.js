import { View, Text, Modal, TextInput, TouchableOpacity, ScrollView,Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import globalstyles from '../constants/globalStyles/Global_Styles'
import { Colors } from '../constants/colors'
import Normalize from '../helpers/Dimens';
import Entypo from 'react-native-vector-icons/Entypo';
import axiosInstance from '../constants/AxiosCallPage';
import { myContext } from '../constants/ContextApi';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Header from './Header';
import { isArrDataEmpty, is_search } from '../constants/KeyWordSearch';
import { Keyboard } from 'react-native';
import Button from './Button';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get("window")
export default function Category_Choose_Page(props) {
    const { choose_Categories, setChoose_Categories } = useContext(myContext)

    const { from } = props.route.params
    const navigation = useNavigation()
    const tempData = choose_Categories
    const [allSkill_temp, setAllSkill_temp] = useState(tempData)
    const [skill_search_keyword, setSkill_search_keyword] = useState('');
    const onpress_skill = val => {
        var old_category = allSkill_temp;
        var new_category = [];
        old_category.map((item, index) => {
            if (item.id == val.id) {
                item.isSelected = !item.isSelected;
                new_category.push(item);
            } else {
                new_category.push(item);
            }
        });
        setAllSkill_temp(new_category);
    };
    const onPressSave = (val) => {
        setChoose_Categories(val)
        navigation.replace(`${from}`)
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
        <View
            style={{
                flex: 1,
                backgroundColor: Colors.white,
            }}>
            <View
                style={{ flex: 1 }}>
                <Header
                    name={"Skills"}
                    back={isArrDataEmpty(allSkill_temp)}
                />
                <View
                    style={[
                        globalstyles.textinput_onlyBox_Style,
                        {
                            width: '90%',
                            height: Normalize(35),
                        },
                    ]}>
                    <TextInput
                        underlineColorAndroid="#FAFAFA"
                        value={skill_search_keyword}
                        onChangeText={e => {
                            setSkill_search_keyword(e);
                        }}
                        style={[
                            globalstyles.textinput_onlyText_Style_No_textAlignVertical,
                            {
                                flex: 1, paddingHorizontal: Normalize(10),
                            },
                        ]}
                        placeholder="Search Skill"
                        placeholderTextColor={
                            Colors.textinput_inner_text
                        }
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setSkill_search_keyword('');
                            Keyboard.dismiss();
                        }}
                        style={{
                            width: '10%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        {skill_search_keyword == '' ? (
                            <Feather
                                name="search"
                                color={Colors.textinput_inner_text}
                                size={Normalize(16)}
                            />
                        ) : (
                            <Entypo
                                name="cross"
                                color={Colors.red_old}
                                size={Normalize(16)}
                            />
                        )}
                    </TouchableOpacity>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                    contentContainerStyle={{ paddingBottom: Normalize(15) }}
                >
                    {allSkill_temp.map(
                        (item, index) =>
                            is_search(
                                skill_search_keyword,
                                item.name,
                            ) && (
                                <Pressable
                                    onPress={() => {
                                        // console.log(item);
                                        onpress_skill(item);
                                    }}
                                    key={index}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: Normalize(13),
                                        borderBottomWidth: 1,
                                        borderBottomColor: Colors.lightGrey,
                                        flexDirection: "row", justifyContent: "space-between", alignItems: "center"
                                    }}>
                                    <Text
                                        style={[
                                            globalstyles.plantext_Outfit_Medium,
                                            {
                                                fontSize: Normalize(13),
                                                color: Colors.black,
                                            },
                                        ]}>
                                        {item.name}
                                    </Text>
                                    <View style={{
                                        height: Normalize(17),
                                        width: Normalize(17),
                                        borderRadius: Normalize(17) / 2,
                                        borderColor: item.isSelected ? Colors.secondary : Colors.lightGrey,
                                        borderWidth: 1,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}  >
                                        {item.isSelected && <FontAwesome
                                            name="circle"
                                            color={Colors.secondary}
                                            size={Normalize(13)}
                                        />}
                                    </View>
                                </Pressable>
                            ),
                    )}
                </ScrollView>
                {
                    !isArrDataEmpty(allSkill_temp) &&
                    <Button
                        onPress={() => {
                            onPressSave(allSkill_temp)
                        }}
                        name='Save'
                        style={{ backgroundColor: Colors.primary, marginHorizontal: Normalize(16), marginBottom: height * 0.02 }}
                    />
                }
            </View>
        </View>
    )
}