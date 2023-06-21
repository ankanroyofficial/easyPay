import { View, Text, ScrollView, Dimensions, StatusBar, Animated } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Button from '../../components/Button'
import Normalize from './../../helpers/Dimens';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../constants/colors';
import images from '../../constants/images';
import globalstyles from '../../constants/globalStyles/Global_Styles';
import { Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Easing } from 'react-native';
import { SafeAreaView } from 'react-native';
const { height, width } = Dimensions.get("window")
export default function IntroCarouselPage() {
    const navigation = useNavigation()
    const [curretPage, setCurretPage] = useState(1)


    const introDetails = [
        {
            id: 1,
            title: `A community\nof instant solutions`,
            description: `Find local help and service instantly or make\nmoney by helping others flexibly`,
            image: images.splash_1
        },
        {
            id: 2,
            title: `Safety is at the core\nof our platform`,
            description: `We provide safety through ID. verifying all\nEazyPay, encouraging reviews and a\nsecure payment system`,
            image: images.splash_2
        },
        {
            id: 3,
            title: `We're here to help\nyou`,
            description: `Whether for personal or business use, we’re\nhere to support you with assistance\nthroughout`,
            image: images.splash_3
        }
    ]

    const imageValue = new Animated.Value(0)

    const startImageZoomIn = () => {
        Animated.timing(imageValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };
    const handleScrollEnd = (event) => {
        // imageValue.setValue(0)
        let contentOffsetX = event.nativeEvent.contentOffset.x + 10
        let curretPg = Math.round(contentOffsetX / width)
        setCurretPage(curretPg + 1)

        imageValue.setValue(0)
        startImageZoomIn()
    }
    const resetvalue = (event) => {
        // let contentOffsetX = event.nativeEvent.contentOffset.x + 10
        // let curretPg = Math.round(contentOffsetX / width)
        // setCurretPage(curretPg + 1)
        // setImageValue(0)
        imageValue.setValue(0)
        // startImageZoomIn()
    }

    const letsgoButton = async () => {
        await AsyncStorage.setItem('isIntroShown', "true");
        navigation.replace("IntroVideoScreen")
    }
    // useEffect(() => {
    //     startImageZoomIn();
    // }, []);
    return (
        <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: Colors.primary }} >
                {/* <StatusBar  /> */}
                <View style={{ flexDirection: "row", flex: 1 }} >
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        onScrollEndDrag={resetvalue}
                        onMomentumScrollEnd={handleScrollEnd}
                        pagingEnabled
                        horizontal={true}
                    >
                        {
                            introDetails.map((item, index) => {
                                return (
                                    <View key={index} style={{ width: width, height: "100%", alignItems: "center", justifyContent: "space-between", paddingTop: Normalize(40), paddingBottom: Normalize(15) }} >
                                        <Text style={{ color: Colors.white, fontSize: Normalize(19), lineHeight: Normalize(25), textAlign: "center", fontFamily: 'Lato-Bold' }} >{item.title}</Text>

                                        <View style={{ height: height * 0.4, width: "85%",}}>
                                            <Image source={item.image} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                        </View>
                                        <Text style={{ color: Colors.white, fontSize: Normalize(14), lineHeight: Normalize(18), textAlign: "center", fontFamily: 'Lato-Regular' }} >{item.description}</Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View >

                <View style={{ height: height * 0.2, width: "100%" }} >

                    {
                        curretPage == introDetails.length ?
                            <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} >

                                <Button
                                    onPress={letsgoButton}
                                    name="Let's Go"
                                    style={{ width: "70%" }}
                                />
                            </View>
                            :
                            <View style={{ width: width, height: "100%", justifyContent: "center", alignItems: "center" }} >
                                <View style={{ width: Normalize(33), height: Normalize(20), flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                                    {introDetails.map((item, index) => {
                                        return (
                                            <FontAwesome key={index} name={'circle'} color={index >= curretPage ? Colors.greylightText : "white"} size={Normalize(7)} />
                                        )
                                    })}
                                </View>
                            </View>
                    }
                </View>


            </View >
        </SafeAreaView>
    )
}