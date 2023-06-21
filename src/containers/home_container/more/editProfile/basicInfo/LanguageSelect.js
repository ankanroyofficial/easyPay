import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
    Dimensions,
} from 'react-native';
import { Colors } from '../../../../../constants/colors';
import Normalize from '../../../../../helpers/Dimens';
import { myContext } from '../../../../../constants/ContextApi';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../../../../../components/Header';
import Button from '../../../../../components/Button';
import { isArrDataEmpty } from '../../../../../constants/KeyWordSearch';
import { BackHandler } from 'react-native';
import { useEffect } from 'react';
const { height, width } = Dimensions.get("window")
export default function LanguageSelect({ navigation }) {
    const {
        setAlllanguage, alllanguage
    } = useContext(myContext);

    const tempData = alllanguage


    const [alllanguage_temp, setAlllanguage_temp] = useState(tempData)



    const onpress_language_name = val => {
        var old_category = alllanguage_temp;
        var new_category = [];
        old_category.map((item, index) => {
            if (item.id == val.id) {
                new_category.push({ "created_at": item.created_at, "flag": item.flag, "id": item.id, "isSelected": !item.isSelected, "language": item.language, "status": item.status, "updated_at": item.updated_at });
            } else {
                new_category.push(item);
            }
        });
        setAlllanguage_temp(new_category);
    };
    const handleBackButtonClick = () => {
        navigation.goBack(null);
        return true;
    }
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors.white,
            }}>
            <Header
                backFunc={handleBackButtonClick}
                back={isArrDataEmpty(alllanguage_temp)}
                name={"Languages"}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Normalize(15) }}
            >
                {alllanguage_temp.map((item, index) => {
                    return (
                        <Pressable
                            onPress={() => {
                                onpress_language_name(item);
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
                                {item.language}
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
                    );
                })}

            </ScrollView>
            <Button
                onPress={() => {
                    setAlllanguage(alllanguage_temp)
                    navigation.goBack()
                }}
                name='Save'
                style={{ backgroundColor: Colors.primary, marginHorizontal: Normalize(16), marginBottom: height * 0.02 }}
            />
        </View>
    )
}