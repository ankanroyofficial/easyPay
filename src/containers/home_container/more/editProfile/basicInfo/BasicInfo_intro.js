import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Animated
} from 'react-native';
import { Colors } from '../../../../../constants/colors';
import Normalize from '../../../../../helpers/Dimens';
import Header from '../../../../../components/Header';
import Button from '../../../../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import globalStyle_esyPay from '../../../../../constants/globalStyles/GlobalStyle_esyPay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { fontfmliy } from '../../../../../components/WhichFontFamily';
import { TouchableOpacity } from 'react-native';

const { height, width } = Dimensions.get("window")

export default function BasicInfo_intro() {

    const navigation = useNavigation()
    const [curretPage, setCurretPage] = useState(1)

    const introDetails = [
        {
            id: 1,
            title: "Flexi-work",
            description: `You're the boss. You choose when,\nwhere and how you want to work.`,
            icon: <Ionicons name={"calendar-sharp"} color={Colors.primary} size={Normalize(65)} />
        },
        {
            id: 2,
            title: "Name your price",
            description: "Request the price you want to be paid.",
            icon: <FontAwesome5 name={"hand-holding-usd"} color={Colors.primary} size={Normalize(65)} />
        },
        {
            id: 3,
            title: `We sort out the rest.`,
            description: `Instant & secure payments,instant\ninvoices, and we bring the clients to you.`,
            icon: <MaterialCommunityIcons name={"calendar-check"} color={Colors.primary} size={Normalize(65)} />
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
    // useEffect(() => {
    //     startImageZoomIn();
    // }, []);



    return (
        <View style={{ flex: 1 }} >
            <Header
                name="Become a EazyPayer"
                back
            />
            <Text style={[globalStyle_esyPay.inputHeader, {
                marginTop: Normalize(10),
                marginBottom: Normalize(10),
                textAlign: "center",
                lineHeight: Normalize(15)
            }]}>Want to offer your professional services, help local people and earn money flexibly? You're in the right{"\n"}place!</Text>
            <View style={{ flex: 1 }} />
            <View style={{}} >
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    onScrollEndDrag={resetvalue}
                    onMomentumScrollEnd={handleScrollEnd}
                    pagingEnabled
                    horizontal={true} >

                    {introDetails.map((item, index) => {
                        return (
                            <View key={index} style={{ height: height * 0.45, width: width, justifyContent: "center", alignItems: "center" }} >
                                {item.icon}
                                <Text style={{ color: Colors.greyText, fontSize: width * 0.052, textAlign: "center", fontFamily: fontfmliy.bold, marginBottom: Normalize(15), marginTop: Normalize(5) }} >{item.title}</Text>
                                <Text style={{ color: Colors.greyText, fontSize: width * 0.039, textAlign: "center", fontFamily: fontfmliy.regular }} >{item.description}</Text>
                            </View>
                        )
                    })
                    }
                </ScrollView>
            </View>

            <View style={{ flex: 1 }} />

            <View style={{ height: height * 0.02, width: "100%" }} >
                <View style={{ width: width, height: "100%", justifyContent: "center", alignItems: "center" }} >
                    <View style={{ height: Normalize(20), flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                        {introDetails.map((item, index) => {
                            return (
                                <TouchableOpacity key={index}
                                    onPress={() => { console.log(item) }}
                                    style={{ width: Normalize(20) }}
                                >
                                    <FontAwesome name={'circle'} color={index >= curretPage ? Colors.lightGrey : Colors.primary} size={Normalize(7)} />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </View>
            <View style={{ paddingHorizontal: Normalize(16), marginBottom: Normalize(16) }} >
                <Text style={[globalStyle_esyPay.inputHeader, {
                    marginTop: Normalize(10),
                    marginBottom: Normalize(10),
                    textAlign: "center",
                    lineHeight: Normalize(15)
                }]}>Complete this quick verification to become a{"\n"}EazyPayer</Text>
                <Button
                    onPress={() => navigation.navigate("BasicInfo")}
                    name="Begin"
                    style={{ backgroundColor: Colors.primary }}
                />
            </View>
        </View>
    )
}




