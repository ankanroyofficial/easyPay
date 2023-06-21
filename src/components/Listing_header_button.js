import React, { useContext, useState, } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Toast from "react-native-simple-toast";
import strings from '../constants/lng/LocalizedStrings';
import { Colors } from '../constants/colors';
import { myContext } from "../constants/ContextApi"
import Normalize from '../helpers/Dimens';
import { fontfmliy } from './WhichFontFamily';


const { height, width } = Dimensions.get("window")
export default function Listing_header_button({
    category,
    description,
    pricingPackaging,
    location,
    availability,
    images,
    bookingMessage }) {
    const whichStyle = (val) => {
        switch (val) {
            case "green_border": return styles.greenborder;
            case "gray_border": return styles.grayborder;
            case "red_background": return styles.redBackGround;
            default: return styles.grayborder;

        }
    }
    const [task_page_list, setTask_page_list] = useState([
        {
            "title": strings.LMS.CATEGORY,
            "style": category
        },
        {
            "title": strings.LMS.DESCRIPTION,
            "style": description
        },
        {
            "title": strings.LMS.PRICINGANDPACKAGING,
            "style": pricingPackaging
        },
        {
            "title": strings.LMS.LOCATION,
            "style": location
        },
        {
            "title": strings.LMS.AVAILABILITY,
            "style": availability
        },
        {
            "title": strings.LMS.IMAGES,
            "style": images
        },
        {
            "title": strings.LMS.BOOKINGMESSAGE,
            "style": bookingMessage
        },
    ])
    return (
        <ScrollView horizontal
            showsHorizontalScrollIndicator={false} >
            <View style={[styles.subContainer, { flexDirection: "row", marginLeft: Normalize(10) }]}>
                {
                    task_page_list.map((item, index) => (
                        <Text
                            // onPress={() => console.log(whichStyle(item.style))}
                            key={index}

                            // style={whichStyle(item.style)}
                            style={[whichStyle(item.style), { paddingVertical: 10 }]}
                        >{item.title}</Text>
                    ))
                }
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    subContainer: {
        marginTop: Normalize(5),
        marginBottom: Normalize(8),
        alignItems: "center"
    },
    redBackGround: {
        fontSize: Normalize(12),
        color: Colors.white,
        marginRight: Normalize(10),
        fontFamily: fontfmliy.bold,
        backgroundColor: Colors.secondary,
        paddingHorizontal: Normalize(20),
        borderRadius: Normalize(15),
    },
    grayborder: {
        fontSize: Normalize(12),
        color: Colors.grey,
        marginRight: Normalize(10),
        fontFamily: fontfmliy.bold,
        paddingHorizontal: Normalize(20),
        borderRadius: Normalize(15),
        textAlignVertical: "center",
        backgroundColor: Colors.grayf8
    },

    greenborder: {
        fontSize: Normalize(12),
        color: Colors.white,
        marginRight: Normalize(10),
        fontFamily: fontfmliy.bold,
        backgroundColor: Colors.green_new_2,
        paddingHorizontal: Normalize(20),
        borderRadius: Normalize(15),
    }
});
