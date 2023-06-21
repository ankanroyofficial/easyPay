import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Keyboard, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { is_search } from '../../../../../constants/KeyWordSearch'
import { myContext } from '../../../../../constants/ContextApi'
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../../../../constants/colors';
import { ImageLink } from '../../../../../constants/LinkPage';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../../../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function CountrySelect(props) {

    const { residenceORnationality } = props.route.params
    const {
        all_country_code,
        country_id, setCountry_id, setCountry_value,
        nationality_id, setNationality_id,
        setNationality_value
    } = useContext(myContext);

    const navigation = useNavigation()
    const [search_phone_Code, setSearch_Phone_Code] = useState("")

    const selectCountry = (id, name) => {
        if (residenceORnationality == "nationality") {
            setNationality_id(id);
            setNationality_value(name);
        } else {
            setCountry_id(id);
            setCountry_value(name);
        }
        navigation.goBack()
    };

    const whichPage = (val) => {
        if (residenceORnationality == "residence") {
            if (val == country_id) {
                return true
            } else {
                return false
            }
        } else {
            if (val == nationality_id) {
                return true
            } else {
                return false
            }
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white, marginVertical: Normalize(0), marginHorizontal: Normalize(0), borderRadius: Normalize(5) }} >
            <Header back name={'Select Country'} navigation={navigation} />
            <View style={{ flex: 1, paddingVertical: Normalize(10) }} >

                <View style={[globalstyles.textinput_onlyBox_Style, { width: "90%", height: Normalize(35) }]} >
                    <TextInput
                        value={search_phone_Code}
                        onChangeText={(e) => { setSearch_Phone_Code(e) }}
                        style={[globalstyles.textinput_onlyText_Style_No_textAlignVertical, { flex: 1, paddingHorizontal: Normalize(10),padding:0 }]}
                        placeholder="Search for your country"
                        placeholderTextColor={Colors.textinput_inner_text}
                        underlineColorAndroid="#FAFAFA"

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
                            is_search(search_phone_Code, item.name) &&
                            <Pressable
                                onPress={() =>
                                    selectCountry(item.id, item.name)
                                }
                                key={index}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: Normalize(13),
                                    borderBottomWidth: 1,
                                    borderBottomColor: Colors.lightGrey,
                                    flexDirection: "row", justifyContent: "space-between", alignItems: "center"
                                }} >
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
                                    borderColor: whichPage(item.id) ? Colors.secondary : Colors.lightGrey,
                                    borderWidth: 1,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}  >
                                    {whichPage(item.id) && <FontAwesome
                                        name="circle"
                                        color={Colors.secondary}
                                        size={Normalize(13)}
                                    />}
                                </View>




                            </Pressable>
                        ))
                    }
                </ScrollView>
            </View>

        </View>
    )
}