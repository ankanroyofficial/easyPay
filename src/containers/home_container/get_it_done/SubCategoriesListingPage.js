import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    ImageBackground,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    RefreshControl,
    Dimensions,
    Pressable,
} from 'react-native';
import Header2 from '../../../components/Header2';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import strings from './../../../constants/lng/LocalizedStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles';
import images from './../../../constants/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axiosInstance from '../../../constants/AxiosCallPage';
import Button from '../../../components/Button';
import { myContext } from '../../../constants/ContextApi';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import LoaderPage from '../../../components/LoaderPage';
import { Colors } from '../../../constants/colors';
import Toast from 'react-native-simple-toast';
import { engToPersian } from '../../../constants/EnglishToPersian';
import { addCommaAndTranslateInPersian } from '../../../constants/NumberWithCommaAndInPersian';
import { leftOrRight, rowOrRowreverse } from '../../../constants/RowOrRowreverse';
import { axiosUrl, ImageLink } from '../../../constants/LinkPage';
import globalstyles from '../../../constants/globalStyles/Global_Styles';
import Header from '../../../components/Header';
import CurveDesing_Component from '../../../constants/CurveDesing_Component';
const { width } = Dimensions.get("window")
function SubCategoriesListingPage({ navigation, route }) {
    library.add(fab, fas, far)
    const {
        token,
        ph_email_verify,
    } = useContext(myContext)
    const { item } = route.params
    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
    const [listData, setListData] = useState(null)
    const [loader, setLoader] = useState(false)
    useEffect(async () => {
        getData(token)
        return () => {
            getData(token)
        }
    }, []);
    const valueamount = val => {
        var v = "";
        const listAmount = val.split('.');
        v = listAmount[0]
        return v;
    }
    const getData = async (token) => {
        try {
            setLoader(true)
            const res = {
                "params": {
                    "slug": item.slug,
                    "page": 1
                }
            }

            const data = await axiosInstance.post("category-listing-for-services", res)
            if (data.data.result) {
                setListData(data.data.result.listing)
                setLoader(false)
            }
        } catch (error) {
            console.log("getData", error)
        }
    }
    const categoryButton2 = () => {
        if (ph_email_verify) {
            navigation.navigate('PostTaskDetails', { item: {} })
        } else {
            Toast.show(strings.ERROR.ATFIRSTPHEMAILVERIFIED)
        }
    }

    const renderItem = ({ item, index }) => {
        return (
            <Pressable
                onPress={() => navigation.navigate("ViewListing", { slugName: item.slug })}
                key={index} style={{
                    width: "48%",
                    height: Normalize(140),
                    borderRadius: Normalize(5),
                    backgroundColor: Colors.white,
                    marginVertical: width * 0.015,
                    elevation:Normalize(1),
                    marginHorizontal:"1%"
                }}>
                <View
                    style={{ flex: 1, margin: Normalize(4) }} >
                    <View style={{ height: width * 0.25, width: "100%", backgroundColor: "#f5f5f5", borderRadius: Normalize(5), overflow: "hidden" }} >
                        <Image
                            resizeMode="cover"
                            style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                            source={{ uri: ImageLink.ListingImage + item.image }}
                        />
                    </View>
                    <View
                        style={{ flex: 1, marginTop: "3%", padding: Normalize(3), justifyContent: "space-evenly" }} >
                        <View style={{ flexDirection: rowOrRowreverse(language), alignItems: "center" }} >
                            <View style={{ height: Normalize(11), width: Normalize(11) }} >
                                <Image
                                    resizeMode="cover"
                                    style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                                    source={images.stargolden}
                                />
                            </View>
                            <Text style={{ fontSize: Normalize(11), color: Colors.greylightText, fontFamily: 'Outfit-Medium', textAlign: leftOrRight(language), marginHorizontal: "2%" }}>{addCommaAndTranslateInPersian(Math.round(item.get_user.avg_review_as_tasker), language)}</Text>
                        </View>
                        <Text numberOfLines={2} style={{ fontSize: Normalize(10), color: Colors.greylightText, fontFamily: 'Outfit-Medium', textAlign: leftOrRight(language), lineHeight: Normalize(13) }}>{item.title}</Text>
                        <Text numberOfLines={1} style={{
                            fontSize: Normalize(11), color: Colors.greylightText, fontFamily: 'Outfit-Medium', textAlign: leftOrRight(language)
                        }}>{strings.GETITDONE.CARDTEXT}  <Text style={{ fontFamily: 'Outfit-SemiBold', color: Colors.primary }}>{strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian(valueamount(item.min_amount_package), language)}</Text></Text>
                    </View>
                </View>
            </Pressable>
        );
    };
    return (
        <>
            {loader ?
                <LoaderPage />
                :
                <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

                    <View style={{
                        backgroundColor: Colors.grayf8,
                        flex: 1
                    }}>
                        <Header navigation={navigation} back
                            name={item.name} />
                        <CurveDesing_Component  >
                            <View style={[globalstyles.container_only_padding, {}]} >
                                <FlatList
                                    numColumns={2}
                                    data={listData}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id}
                                    showsVerticalScrollIndicator={false}
                                    ListFooterComponent={() => {
                                        return (
                                            <View style={{ alignItems: "center", marginTop: Normalize(15), marginBottom: Normalize(180) }} >
                                                <Text style={[globalstyles.plantext_Outfit_Medium, { marginBottom: Normalize(5), fontSize: Normalize(14), color: Colors.greyText }]}>
                                                    {strings.GETITDONE.CANTFIND}
                                                </Text>
                                                <Button
                                                    activeOpacity={0.5}
                                                    onPress={categoryButton2}
                                                    style={{ paddingHorizontal: "5%" }}
                                                    name={strings.GETITDONE.POSTATASKANDGETOFFERS}
                                                />
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                        </CurveDesing_Component>
                    </View>
                </SafeAreaView>
            }
        </>
    );
}
export default withRtl(SubCategoriesListingPage);