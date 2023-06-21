import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../colors';
import Normalize from '../../helpers/Dimens';
import { fontfmliy } from '../../components/WhichFontFamily';

const globalStyle_esyPay = StyleSheet.create({

    inputHeader: {
        color: Colors.greyText,
        fontSize: Normalize(12),
        fontFamily: fontfmliy.regular
    },
    simpleText: {
        color: Colors.greyText,
        fontSize: Normalize(12),
        fontFamily: fontfmliy.regular,
        textAlign: "center",
        lineHeight: Normalize(15)
    },
    input_noIcon: {
        borderBottomColor: Colors.textinput_bottomBorder,
        borderBottomWidth: Normalize(1),
        paddingVertical: Normalize(7),
        fontSize: Normalize(11.5),
        color: Colors.greyText,
        fontFamily: fontfmliy.regular
    },
    detailsText: { fontSize: Normalize(11.5), fontFamily: fontfmliy.regular, lineHeight: Normalize(17), color: Colors.detailsText },
    pageHeading: { color: Colors.white, fontSize: Normalize(20), fontFamily: fontfmliy.bold }

});
export default globalStyle_esyPay;
