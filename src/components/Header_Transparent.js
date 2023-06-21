import { View, Pressable, StatusBar, Text } from 'react-native'
import React from 'react'
import Normalize from "../helpers/Dimens"
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../constants/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fontfmliy } from './WhichFontFamily'
export default function Header_Transparent({ iswhitebackground, backFunc, backButtonText }) {
    const navigation = useNavigation()
    const whichBack = (val) => {
        if (val == undefined) {
            navigation.goBack()
        } else {
            backFunc()
        }
    }
    return (
        <View style={{
            height: Normalize(50),
            paddingTop: Normalize(8)
        }} >
            <StatusBar barStyle={iswhitebackground ? "dark-content" : "light-content"} backgroundColor={iswhitebackground ? Colors.white : Colors.primary} />
            <Pressable
                onPress={() => whichBack(backFunc)}
                style={{ flexDirection: "row", alignItems: "center", }} >
                <View style={{ height: "100%", width: Normalize(28), }}
                >
                    <Ionicons name={"arrow-back-outline"} color={iswhitebackground ? Colors.greyText : Colors.white} size={Normalize(25)} />
                </View>
                {backButtonText && <Text
                    onPress={() => whichBack(backFunc)}
                    style={{
                        fontSize: Normalize(16),
                        color: Colors.white,
                        fontFamily: fontfmliy.bold,
                    }} >Intro</Text>}
            </Pressable>
        </View>
    )
}