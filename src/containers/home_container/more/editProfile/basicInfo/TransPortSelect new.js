import React, { useEffect, useRef, useState, useContext } from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
    Dimensions,
} from 'react-native';
import { Colors } from '../../../../../constants/colors';
import Normalize from '../../../../../helpers/Dimens';
import Header from '../../../../../components/Header';
import { myContext } from '../../../../../constants/ContextApi';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { isArrDataEmpty } from '../../../../../constants/KeyWordSearch';
import Button from '../../../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';
const { height, width } = Dimensions.get("window")
export default function TransPortSelect() {
    const navigation = useNavigation()
    const {
        getAround, setGetAround
    } = useContext(myContext);
    const tempData = getAround
    const [getAround_temp, setGetAround_temp] = useState(tempData)
    const onpress_getaround = val => {
        var old_getAround = getAround_temp;
        var new_getAround = [];
        old_getAround.map((item, index) => {
            if (item.id == val.id) {
                item.isSelected = !item.isSelected;
                new_getAround.push(item);
            } else {
                new_getAround.push(item);
            }
        });
        setGetAround_temp(new_getAround);
    };
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
            <Header
                backFunc={handleBackButtonClick}
                back
                name={"Transport"}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {getAround_temp.map((item, index) => (
                    <Pressable
                        onPress={() => {
                            // console.log(item)
                            onpress_getaround(item);
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
                                    fontSize: Normalize(11.5),
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
                ))}
            </ScrollView>
            <Button
                onPress={() => {
                    setGetAround(getAround_temp)
                    navigation.goBack()
                }}
                name='Save'
                style={{ backgroundColor: Colors.primary, marginHorizontal: Normalize(16), marginBottom: Normalize(10) }}
            />

        </View>
    )
}