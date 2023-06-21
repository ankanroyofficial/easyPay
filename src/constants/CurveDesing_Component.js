import { View, Text, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { Colors } from './colors'
import Normalize from '../helpers/Dimens'

export default function CurveDesing_Component(props) {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
            {props.top && <View style={{ backgroundColor: Colors.primary, position: "absolute", height: Normalize(20), width: "100%", top: 0, }} >
                <View style={{ flex: 1, borderTopLeftRadius: Normalize(50), borderTopRightRadius: Normalize(50), backgroundColor: Colors.white, }} ></View>
            </View>}

            {props.bottom && <View style={{ backgroundColor: Colors.primary, position: "absolute", height: Normalize(20), width: "100%", bottom: 0, }} >
                <View style={{ flex: 1, borderBottomLeftRadius: Normalize(50), borderBottomRightRadius: Normalize(50), backgroundColor: Colors.white, }} ></View>
            </View>}

            {props.children}

        </View>
    )
}