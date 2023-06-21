import React from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, Image } from 'react-native';
import { Colors } from '../constants/colors';
import images from '../constants/images';
import Normalize from './../helpers/Dimens';
import { fontfmliy } from './WhichFontFamily';

export default function Button(props) {
  return (
    <Pressable
      activeOpacity={props.activeOpacity ? props.activeOpacity : 0}
      disabled={props.disabled ? props.disabled : false}
      style={[styles.btnStyle, props.style]}
      onPressIn={props.onPress}>


      {
        props.disabled ?
          <ActivityIndicator
            size={"small"}
            color={Colors.white}

          /> :
          <>
            {props.children}
            <Text style={[styles.btnTextStyle, props.textStyle]}>{props.name}</Text>
            {
              props.nextarrow &&
              <View style={{ height: Normalize(17), width: Normalize(17), marginHorizontal: Normalize(4) }} >
                <Image source={images.double_arrow} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
              </View>
            }
          </>
      }
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: 'red',
    height: Normalize(38),
    borderRadius: Normalize(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextStyle: {
    color: Colors.white,
    fontSize: Normalize(14),
    fontFamily: fontfmliy.bold,
  },
});
