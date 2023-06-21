import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../constants/colors';
import Normalize from '../helpers/Dimens';
import images from '../constants/images';

export default function Header({ onPressFilter, name, onPressSearch, onPressList }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* search button */}
        <View style={styles.view1}>
          <TouchableOpacity onPress={() => { onPressSearch() }}>
            <Feather name="search" color={Colors.white} size={Normalize(20)} />
          </TouchableOpacity>
        </View>

        {/* Heading */}
        <View style={styles.view2}>
          <Text style={styles.headingText}>{name}</Text>
        </View>

        <View style={styles.view3}>
          {/* 2nd icon */}
          <TouchableOpacity onPress={() => { onPressList() }}>
            <Image source={images.reversemenu} style={{ height: 17, width: 25, alignSelf: 'center' }} name="map" color={Colors.white} size={Normalize(20)} />
          </TouchableOpacity>

          {/* 3rd icon */}
          <TouchableOpacity onPress={() => onPressFilter()}>
            <Image source={images.filter} style={{ height: 20, width: 22, }} name="filter" color={Colors.white} size={Normalize(20)} />
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 10,
  },
  view1: {
    width: '20%',
  },
  view2: {
    width: '60%',
    alignItems: 'center',
  },
  headingText: {
    fontSize: Normalize(15),
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'roboto-bold',
  },
  view3: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
