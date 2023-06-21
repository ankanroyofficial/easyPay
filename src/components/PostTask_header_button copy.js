import React, { useContext, useState, } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';
import strings from '../constants/lng/LocalizedStrings';
import { Colors } from '../constants/colors';
import Normalize from '../helpers/Dimens';
export default function PostTask_header_button({ postdetailspage, postplacetime, postimage }) {
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
            "title": strings.POSTTASK.DETAILS,
            "style": postdetailspage
        },
        {
            "title": strings.POSTTASK.WHEN,
            "style": postplacetime
        },
        {
            "title": strings.POSTTASK.IMAGE,
            "style": postimage
        },
        // {
        //     "title": strings.POSTTASK.BUDGET,
        //     "style": postbudget
        // },
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
                            style={whichStyle(item.style)}
                        >{item.title}</Text>
                    ))
                }
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    subContainer: {
        marginTop: Normalize(15),
        marginBottom: Normalize(10),
        alignItems: "center"
    },
    redBackGround: {
        fontSize: Normalize(11.5),
        color: Colors.white,
        marginRight: Normalize(10),
        fontFamily: 'roboto-medium',
        backgroundColor: Colors.secondary,
        borderRadius: Normalize(5),
        padding: Normalize(6.5)

    },
    grayborder: {
        fontSize: Normalize(11.5),
        color: "#070C18",
        marginRight: Normalize(10),
        fontFamily: 'roboto-regular',
        borderRadius: Normalize(5),
        padding: Normalize(6),
        borderColor: "#A0A1A1",
        borderWidth: Normalize(1)
    },
    greenborder: {
        fontSize: Normalize(11.5),
        color: "#22BC85",
        marginRight: Normalize(10),
        fontFamily: 'roboto-regular',
        padding: Normalize(6),
        borderRadius: Normalize(5),
        borderColor: "#22BC85",
        borderWidth: Normalize(1)
    }
});
