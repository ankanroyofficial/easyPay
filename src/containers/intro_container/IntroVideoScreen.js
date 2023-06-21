import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity, Platform, ImageBackground } from 'react-native';
import Button from '../../components/Button'
import Normalize from './../../helpers/Dimens';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import { Image } from 'react-native';
import images from '../../constants/images';
import { Colors } from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { myContext } from '../../constants/ContextApi';
import Header_Transparent from '../../components/Header_Transparent';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native';
const { height, width } = Dimensions.get("window")
const windowHeight = Dimensions.get('window').height;
export default function IntroVideoScreen() {
  const navigation = useNavigation()
  const { fcmToken, setFcmToken,
    setPassword,
    setConfirmPassword,
    setLoginPassword
  } = useContext(myContext)
  const videoPath = require('../../../assets/mov_bbb.mp4');

  const [isVideoEnd, setIsVideoEnd] = useState(false)
  const [isVideoEndText, setIsVideoEndText] = useState("Start")

  // console.log(isVideoEndText)

  const onBuffer = value => {
    console.log(value);
  };

  const videoError = value => {
    console.log(value);
    setIsVideoEnd(true)
    setIsVideoEndText("error")
  };


  const getfCMToken = async () => {
    // const newFCMToken = await messaging().getToken();
    const fcm = await AsyncStorage.getItem("fcmtoken")
    if (fcm === null) {
      const newFCMToken = await messaging().getToken();
      // console.log("newFCMToken..................",newFCMToken)
      if (newFCMToken) {
        // console.log("newFCMToken", newFCMToken)
        await AsyncStorage.setItem("fcmtoken", newFCMToken)
        // console.log("fcm login null", newFCMToken)
        setFcmToken(newFCMToken)
      }
    } else {
      // console.log("fcm login not null", fcm)
      setFcmToken(fcm)
    }
  }

  useEffect(() => {
    getfCMToken();
  }, [])
  const introButton = async () => {
    await AsyncStorage.removeItem('isIntroShown');
    navigation.replace("QuickIntro_SkipIntro")
  }


  // console.log("------------------>",isVideoEnd)

  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1 }}>

    <View style={styles.container}>
      <ImageBackground source={images.AfterVideo} style={{ height: "100%", width: "100%", resizeMode: "stretch" }}  >
        {
          isVideoEnd ?
            <View style={{ flex: 1 }} />
            :
            <Video
              muted={true}
              repeat={false}
              resizeMode="cover"
              source={videoPath}
              onBuffer={onBuffer}
              onError={videoError}
              style={styles.backgroundVideo}
              onEnd={() => {
                setIsVideoEnd(true)
                setIsVideoEndText("Stop")
              }}
              playInBackground
              playWhenInactive={true}
            // pictureInPicture={true}
            // fullscreen={true}
            />
        }
        <View style={{ height: height, width: width, position: "absolute", paddingHorizontal: Normalize(15) }} >
          <Header_Transparent
            backButtonText
            iswhitebackground={false}
            backFunc={introButton}
          />
          <View style={{ flex: 1, justifyContent: 'space-between', paddingBottom: Normalize(30) }} >

            {
              isVideoEnd ?
                <View style={{ height: Normalize(100), width: Normalize(140), marginTop: Normalize(35), alignSelf: "center" }} >

                  <Image source={images.logo} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                </View>
                :
                <View style={{ height: Normalize(70), width: Normalize(135), marginTop: Normalize(18), alignSelf: "center" }} >
                  <Image source={images.easypay_white} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                </View>
            }

            <View style={{ marginBottom: Platform.OS == "ios" ? Normalize(50) : Normalize(0) }} >
              <Text style={{ textAlign: "center", fontWeight: "bold", color: Colors.red_old, paddingBottom: Normalize(10) }} >Video {isVideoEndText}</Text>
              <Button
                onPress={() => {
                  setLoginPassword("")
                  navigation.navigate("TakingEmailForLogin")
                }}
                name={"Login"}
                style={{ backgroundColor: Colors.primary, borderWidth: Normalize(1), borderColor: Colors.white }}
              />
              <View style={{ height: 20 }} />
              <Button
                onPress={() => {
                  setPassword("")
                  setConfirmPassword("")
                  navigation.navigate("TakingEmail")
                }}
                name={"Register"}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundVideo: {
    height: windowHeight,
    width: width,
    position: 'absolute',
  },
});