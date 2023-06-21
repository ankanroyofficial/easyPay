import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from './../constants/colors';
import Normalize from './../helpers/Dimens';
import images from './../constants/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { myContext } from '../constants/ContextApi';
import { useNavigation } from '@react-navigation/native';
export default function Header({ name, onPressSearch, }) {
  const navigation = useNavigation()

  const { taskOrMap, setTaskOrMap } = useContext(myContext)


  const onpress_taskOrMap = () => {
    setTaskOrMap(!taskOrMap)
  }
  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.primary,
      height: Normalize(50),
      paddingTop: Normalize(8),
    },
    innerContainer: {
      flexDirection: 'row',
      paddingHorizontal: Normalize(15),
      flex: 1
    },
    headingText: {
      fontSize: Normalize(15),
      fontFamily: 'Outfit-Medium',
      color: Colors.white,
    },
    commonView: {
      width: "12%", height: "100%", justifyContent: "center", alignItems: "flex-end"
    },
    commonicon: {
      height: Normalize(15), width: Normalize(15), resizeMode: "contain"
    }
  });
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Pressable
          style={[styles.commonView, { alignItems: "flex-start" }]}
          // onPress={() => navigation.goBack()}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu" color={Colors.white} size={Normalize(22)} />
        </Pressable>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
          <Text style={styles.headingText}>{name}</Text>
        </View>
        {/* ṣearch */}
        <Pressable
          style={[styles.commonView]}
          onPress={() => onPressSearch()}>
          <Fontisto name="search" color={Colors.white} size={Normalize(17)} />
        </Pressable>
        {/* map */}
        <Pressable
          style={[styles.commonView]}
          // onPress={() => onPressMap()}
          onPress={onpress_taskOrMap}
        >
          <Ionicons name={taskOrMap ? "ios-earth-outline" : "md-list-outline"} color={Colors.white} size={Normalize(21)} />
        </Pressable>
      </View>
    </View>
  );
}
