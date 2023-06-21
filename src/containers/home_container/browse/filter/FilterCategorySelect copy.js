import React, { useEffect, useRef, useState, useContext, Fragment } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Pressable,
    Dimensions
} from 'react-native';
import { Colors } from '../../../../constants/colors';
import Normalize from '../../../../helpers/Dimens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { myContext } from '../../../../constants/ContextApi';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import { isArrDataEmpty, is_search } from '../../../../constants/KeyWordSearch';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../../../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Button from '../../../../components/Button';

const { height, width } = Dimensions.get("window")
export default function FilterCategorySelect() {
    const {
        filter_Categories,
        setFilter_Categories,
    } = useContext(myContext);

    const navigation = useNavigation()
    const [skill_search_keyword, setSkill_search_keyword] = useState('');

const [filter_Categories_temp,setFilter_Categories__temp]=useState(filter_Categories)


    const onpress_skill = (val) => {
        let old_category = filter_Categories;
        let new_category = [];
        old_category.map((item, index) => {
            if (item.id == val) {
                console.log(item, val)
                item.isSelected = !item.isSelected;
                new_category.push(item)
            } else {
                new_category.push(item);
            }
        })
        setFilter_Categories(new_category);
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
                    name={"Category"}
                    back={isArrDataEmpty(filter_Categories)}
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
                    <View>
                        {filter_Categories.map((item, index) => (
                            <View key={index}>
                                {is_search(
                                    skill_search_keyword,
                                    item.name,
                                ) && (
                                        <Pressable
                                            onPress={() =>onpress_skill(item.id)}
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
                                    )}
                            </View>
                        )

                        )}
                    </View>
                </ScrollView>
                {
                    !isArrDataEmpty(filter_Categories) &&
                    <Button
                        onPress={() => navigation.goBack()}
                        name='Save'
                        style={{ backgroundColor: Colors.primary, marginHorizontal: Normalize(16), marginBottom: height * 0.02 }}
                    />
                }
            </View>
        </View>
    )
}