import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from './../constants/colors';
import Normalize from './../helpers/Dimens';
import images from '../constants/images';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import globalstyles from '../constants/globalStyles/Global_Styles';
import { Pressable } from 'react-native';
import { fontfmliy } from './WhichFontFamily';

export default function Header({
  name,
  backFunc,
  back,
  cross,
  handleCross,
  isDrawer,
  guidelines
}) {
  const navigation = useNavigation()

  const whichBack = (val) => {
    if (val == undefined) {
      navigation.goBack()
    } else {
      backFunc()
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <View style={styles.innerContainer}>
        {/* back button */}
        <View style={styles.view1}>
          {back && (
            <TouchableOpacity
              onPress={() => whichBack(backFunc)}
              style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "flex-start", }}
            >
              <Ionicons name="chevron-back" color={Colors.white} size={Normalize(20)} />
            </TouchableOpacity>
          )}
          {cross && (
            <TouchableOpacity onPress={() => handleCross()}>
              <Entypo name="cross" color={Colors.white} size={Normalize(20)} />
            </TouchableOpacity>
          )}
          {
            isDrawer &&
            <TouchableOpacity
              onPress={() => {
                if(navigation.openDrawer==undefined){
                  navigation.goBack()
                }else{
                  navigation.openDrawer()
                }}}>
              <Ionicons name="menu" color={Colors.white} size={Normalize(25)} />
            </TouchableOpacity>
          }

        </View>
        {/* Heading */}
        <View style={styles.view2}>
          <Text numberOfLines={1} style={styles.headingText}>{name}</Text>
        </View>
        {/* 2nd icon */}

        {guidelines ?
          <Pressable
            onPress={guidelines}
            style={{}} >
            <View style={{ height: Normalize(30), paddingHorizontal: Normalize(5), borderColor: Colors.secondary, borderWidth: Normalize(1), borderRadius: Normalize(20), flexDirection: "row", alignItems: "center" }}>
              <View style={{ height: Normalize(20), width: Normalize(20), borderRadius: Normalize(20) / 2, marginRight: Normalize(3), borderColor: Colors.secondary, borderWidth: Normalize(1), justifyContent: "center", alignItems: "center" }} >
                <Image source={images.logo_secondary} style={{ height: "60%", resizeMode: "60%", resizeMode: "contain" }} />
              </View>
              <Text style={[globalstyles.plantext_regular, { color: Colors.white }]}>Guidelines</Text>
            </View>
          </Pressable>
          :
          <View style={[styles.view3, {}]} />
        }
        {/* 3rd icon */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: Normalize(50),
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Normalize(8)
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Normalize(10),
  },
  headingText: {
    fontSize: Normalize(17),
    color: Colors.white,
    textAlign: 'center',
    fontFamily: fontfmliy.bold,
  },
  view1: {
    flex: 2
  },
  view2: {
    flex: 6,
    alignItems: 'center',
  },
  view3: {
    flex: 2,
  },
});
