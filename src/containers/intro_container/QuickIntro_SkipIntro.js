import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import Button from '../../components/Button'
import Normalize from './../../helpers/Dimens';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../constants/colors';
import images from '../../constants/images';
import globalstyles from '../../constants/globalStyles/Global_Styles';
import { fontfmliy } from '../../components/WhichFontFamily';
import { SafeAreaView } from 'react-native';
export default function QuickIntro_SkipIntro() {

    const navigation = useNavigation();


    const skipIntroButton = async () => {
        navigation.replace("IntroVideoScreen")
        await AsyncStorage.setItem('isIntroShown', "true");
    }


    return (
        <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: Colors.primary, }} >

            <View style={{ alignItems: "center", marginTop: Normalize(20) }} >
                <Text style={{ color: Colors.white, fontSize: Normalize(20), fontFamily: fontfmliy.bold }} >Welcome to</Text>
                <View style={{ height: Normalize(77), width: Normalize(115), marginTop: Normalize(8) }} >
                    <Image source={images.logo_white_name} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: "center" }} >
                <View style={{ alignItems: "center" }} >
                    <View style={{ height: Normalize(130), width: "90%" }}>
                        <Image source={images.startIntroSkipintro} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                    </View>
                    <Text style={{ color: Colors.white, fontSize: Normalize(18), marginTop: Normalize(25), fontFamily: 'AvenirNextLTPro-Demi', }} >Find best affordable help</Text>
                </View>
            </View>
            <View style={{ alignItems: "center",marginBottom:Normalize(23) }} >
                <Button
                    onPress={() => navigation.navigate("IntroCarouselPage")}
                    name={"Start quick intro"}

                    style={{ width: "70%" }}
                />
                <Pressable
                    onPress={skipIntroButton}
                >
                    <Text
                        style={{ color: Colors.white, fontSize: Normalize(13), marginTop: Normalize(13), fontFamily: fontfmliy.bold, }}
                    >Skip intro</Text>
                </Pressable>
            </View>

        </View>
        </SafeAreaView>
    )
}


