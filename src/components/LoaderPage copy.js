import React from 'react'
import { Image } from 'react-native';
import { View, Text, ActivityIndicator } from 'react-native'
import { Colors } from '../constants/colors';
import images from '../constants/images';
import Normalize from './../helpers/Dimens';
export default function LoaderPage() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white, justifyContent: "center", alignItems: "center" }} >
      <View style={{ height: Normalize(50), width: Normalize(50), backgroundColor: Colors.white, justifyContent: "center", alignItems: "center", borderRadius: Normalize(50) / 2, elevation:Normalize(2) }}>
        {/* <Image source={images.taskicon} style={{ height: "50%", width: "50%", resizeMode: "contain" }} /> */}
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={{ position: "absolute" }}
        />
      </View>
    </View>
  )
}
