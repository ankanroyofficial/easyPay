import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { Colors } from '../constants/colors'

const { width } = Dimensions.get("window")
export default function TwoHorizantalLine() {
    return (
        <View style={{ marginVertical: Normalize(4), height: Normalize(3), backgroundColor: "#F5F5F5" }} >
            {/* <View style={{ height: Normalize(1), backgroundColor: Colors.borderColor,opacity:0.35, width: width,marginBottom:Normalize(3) }} />
            <View style={{ height: Normalize(1), backgroundColor: Colors.borderColor,opacity:0.35, width: width }} /> */}
        </View>
    )
}