import React, { useEffect, useState } from 'react'
import { Animated, Dimensions, Easing, Image } from 'react-native';
import { View, Text, ActivityIndicator } from 'react-native'
import images from '../constants/images';
import Normalize from './../helpers/Dimens';

const { height, width } = Dimensions.get("window")
export default function NewLoaderPage({full}) {
  const rotateValue = useState(new Animated.Value(0))[0]


  const RotateData = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const startImageRotate = () => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };
  useEffect(() => {
    startImageRotate();
  }, []);
  
  return (
    <View style={{
      height: full?height: (height - Normalize(50)), width: width, position: "absolute",
       backgroundColor: "#rgba(52,52,52,0.5)", 
      // backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center"
    }} >
      <Animated.View style={{ height: Normalize(40), width: Normalize(40), transform: [{ rotate: RotateData }] }} >
        <Image source={images.loader} style={{ height: "100%", width: "100%", resizeMode: "contain", }} />
      </Animated.View>
      
    </View>
  )
}
