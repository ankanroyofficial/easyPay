import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Pressable,
    Keyboard
} from 'react-native';
import Header from '../../../../components/Header';
import { useNavigation } from "@react-navigation/native";
import { myContext } from '../../../../constants/ContextApi';
import { Colors } from '../../../../constants/colors';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import { is_search } from '../../../../constants/KeyWordSearch';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import NewLoaderPage from '../../../../components/NewLoaderPage';
export default function LmsCategorySelection() {

    const {

        lMS_category_title, setLMS_category_title,
        lMS_category_id, setLMS_category_id,
        catagory
    } = useContext(myContext)

    const navigation = useNavigation();
    const [skill_search_keyword, setSkill_search_keyword] = useState('');
    const [loader, setLoader] = useState(false);
    const [tempCategoryList, setTempCategoryList] = useState(catagory);

    useEffect(() => {
        Keyboard.addListener('keyboardDidHide', () => {
            Keyboard.dismiss();
        })
    }, [])
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors.white,
            }}>
            <View
                style={{ flex: 1 }}>
                <Header
                    name={"Category"}
                    back
                />

                <View style={{ flex: 1 }} >

                    <View
                        style={[
                            globalstyles.textinput_onlyBox_Style,
                            { width: '90%', height: Normalize(35) },
                        ]}>
                        <TextInput
                            value={skill_search_keyword}
                            onChangeText={e => {
                                setSkill_search_keyword(e);
                            }}
                            style={[
                                globalstyles.textinput_onlyText_Style_No_textAlignVertical,
                                { flex: 1, paddingHorizontal: Normalize(10) },
                            ]}
                            placeholder="Search Category"
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
                        keyboardShouldPersistTaps="always">
                        {tempCategoryList.map((item, index) =>
                            is_search(skill_search_keyword, item.name) && (
                                <Pressable
                                    key={index}
                                    onPress={() => {
                                        setLMS_category_id(item.id);
                                        setLMS_category_title(item.name)
                                        navigation.goBack()
                                    }}
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
                                        borderColor: (item.id == lMS_category_id) ? Colors.secondary : Colors.lightGrey,
                                        borderWidth: 1,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}  >
                                        {(item.id == lMS_category_id) && <FontAwesome
                                            name="circle"
                                            color={Colors.secondary}
                                            size={Normalize(13)}
                                        />}
                                    </View>
                                </Pressable>
                            )
                        )}
                    </ScrollView>

                    {
                        loader && <NewLoaderPage />
                    }

                </View>
            </View>
        </View>
    )
}