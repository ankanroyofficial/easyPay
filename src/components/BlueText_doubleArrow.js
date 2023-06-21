import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import images from '../constants/images'
import Normalize from '../helpers/Dimens'
import { Colors } from '../constants/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fontfmliy } from './WhichFontFamily'
export default function BlueText_doubleArrow({ title, onpress }) {
    return (
        <TouchableOpacity
            onPress={onpress}
            style={{ flexDirection: "row", alignItems: "center" }} >
            <Text
                style={{
                    fontSize: Normalize(13),
                    fontFamily: fontfmliy.bold,
                    color: Colors.primary,
                    fontSize: Normalize(13),
                    marginRight: Normalize(1)
                }}>{title}</Text>
            <MaterialCommunityIcons name="chevron-double-right" color={Colors.primary} size={Normalize(16)} />
        </TouchableOpacity>
    )
}