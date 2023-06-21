import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    Pressable,
} from 'react-native';
import strings from './../../../../../constants/lng/LocalizedStrings';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import { fontfmliy } from '../../../../../components/WhichFontFamily';
import { Colors } from '../../../../../constants/colors';
import { myContext } from '../../../../../constants/ContextApi';
import { useNavigation } from '@react-navigation/native';
import { ImageLink } from '../../../../../constants/LinkPage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
export default function ListingCardComponent() {
    const {
        listAllServicesData, setListAllServicesData,
    } = useContext(myContext)

    const navigation = useNavigation()

    const catagoryListingName = (val) => {
        return val.name
    }
    const catagoryListingItem = (val) => {
        return val.get_my_listing
    }
    const EachListCard = ({ item, index }) => {
        return (
            <Pressable
                onPress={() => navigation.navigate("ViewListing", { slugName: item.slug })}
                key={index} style={{
                    width: "99%",
                    alignSelf: "center",
                    height: Normalize(95),
                    borderRadius: Normalize(6),
                    backgroundColor: Colors.white,
                    marginBottom: Normalize(8),
                    elevation: Normalize(1),
                }}>
                <View
                    style={{ flex: 1, flexDirection: "row" }} >
                    <View style={{ height: "100%", width: Normalize(110), padding: Normalize(8) }} >
                        <View style={{ flex: 1, backgroundColor: Colors.secondaryBackground, borderRadius: Normalize(5), overflow: "hidden", borderColor: Colors.grayf5, borderWidth: Normalize(1) }} >
                            <Image
                                style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                source={{ uri: ImageLink.ListingImage + item.image }}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, paddingVertical: Normalize(8), paddingRight: Normalize(8), justifyContent: "space-around" }} >
                        <Text numberOfLines={1} style={[globalstyles.plantext_bold, { color: Colors.primary, fontSize: Normalize(13) }]}  >{item.title}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }} >
                            <AntDesign name="star" color={"#f4be36"} size={Normalize(11)} />
                            <Text style={{ fontSize: Normalize(11), color: Colors.greylightText, fontFamily: fontfmliy.bold, textAlign: "left", marginLeft: Normalize(3) }}>{Math.round(item.get_user.avg_review_as_tasker)}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }} >
                            <Entypo name={(item.lat == null || item.lng == null) ? "mobile" : "location-pin"} color={Colors.greylightText} size={Normalize(12)} />
                            <Text numberOfLines={1} style={{ fontSize: Normalize(11), color: Colors.primary, fontFamily: fontfmliy.bold, textAlign: "left", marginLeft: Normalize(3), paddingRight: Normalize(8) }}>{(item.lat == null || item.lng == null) ? "Online Service" : item.location}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }} >
                            <Text style={[globalstyles.plantext_bold, { color: Colors.primary, fontSize: Normalize(11) }]}>Starting budget : </Text>
                            <Text style={[globalstyles.plantext_bold, { color: Colors.secondaryBorder, fontSize: Normalize(11.5) }]}>$ {parseInt(item.min_amount_package)}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        );
    };
    const onpressCategoryTitle = (val) => {
        navigation.navigate("SubCategoriesListingPage", { item: val })
    }
    return (
        <View style={[globalstyles.container_only_padding, { backgroundColor: Colors.grayf8 }]} >

            {
                listAllServicesData.length != 0 ?
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={listAllServicesData}
                        ListHeaderComponent={() => {
                            return (
                                <View style={{ marginTop: Normalize(2), marginBottom: Normalize(8) }} >
                                    <Text style={{ fontSize: Normalize(13), color: Colors.primary, fontFamily: "roboto-bold" }} >{strings.MORESCREEN.LISTALLSERVICESHEADING}</Text>
                                    <Text style={{ fontSize: Normalize(12), color: Colors.primary, fontFamily: fontfmliy.bold, marginVertical: Normalize(5) }} >
                                        Click<Text onPress={() => navigation.navigate("Initial_listing_Page")} style={{ color: Colors.secondary }} > here </Text>to learn how lists work
                                    </Text>
                                    {
                                        listAllServicesData.length != 0 &&
                                        <Text style={{ fontSize: Normalize(11), color: Colors.greyText, fontFamily: fontfmliy.bold, marginTop: Normalize(3) }} >{strings.MORESCREEN.LISTALLSERVICESSUBHEADING}</Text>}
                                </View>
                            )
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <View key={index} >
                                    {
                                        catagoryListingItem(item).length != 0 &&
                                        <View>
                                            <Pressable
                                                onPress={() => onpressCategoryTitle(item)}
                                                style={{ backgroundColor: Colors.primary, alignItems: "center", borderRadius: Normalize(2), paddingLeft: Normalize(10), paddingVertical: Normalize(5), flexDirection: "row", marginBottom: Normalize(8), }}>
                                                <View style={{ height: Normalize(14), width: Normalize(14) }} >
                                                    <Image source={{ uri: ImageLink.homeCategory + item.image }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                                                </View>
                                                <Text style={[globalstyles.plantext_regular, { paddingLeft: Normalize(2), fontSize: Normalize(14), color: Colors.white }]} >{catagoryListingName(item)}</Text>
                                            </Pressable>
                                            <View style={{}}>
                                                <FlatList
                                                    data={catagoryListingItem(item)}
                                                    renderItem={EachListCard}
                                                    keyExtractor={item => item.id}
                                                    showsVerticalScrollIndicator={false}
                                                    showsHorizontalScrollIndicator={false}
                                                    inverted={false}
                                                />
                                            </View>
                                        </View>
                                    }
                                </View>
                            )
                        }}
                    />
                    :                
                                       <View style={{flex:1, marginTop: Normalize(2), marginBottom: Normalize(8) }} >
                    <Text style={{ fontSize: Normalize(13), color: Colors.primary, fontFamily: "roboto-bold" }} >{strings.MORESCREEN.LISTALLSERVICESHEADING}</Text>
                    <Text style={{ fontSize: Normalize(12), color: Colors.primary, fontFamily: fontfmliy.bold, marginVertical: Normalize(5) }} >
                        Click<Text onPress={() => navigation.navigate("Initial_listing_Page")} style={{ color: Colors.secondary }} > here </Text>to learn how lists work
                    </Text>
                   
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                        <Text style={{ fontSize: Normalize(14), color: Colors.lightGrey, fontFamily: fontfmliy.bold, marginTop: Normalize(3) }} >
                            No recommended package found
                        </Text>
                    </View>
                </View>
                   
                   
                   
                   
                   

            }


        </View>
    )
}