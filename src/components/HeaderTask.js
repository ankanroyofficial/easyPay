import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../constants/colors';
import Normalize from '../helpers/Dimens';
import images from '../constants/images';

export default function HeaderTask({ navigation, backFunc, name, back, cross, handleCross, menuButton, shareButton, loader }) {

  const whichBack = (val) => {
    if (val == undefined) {
      navigation.goBack()
    } else {
      backFunc()
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* back button */}
        <View style={styles.view1}>
          {back ? (
            <TouchableOpacity
              onPress={() => whichBack(backFunc)}

            >
              <Image source={images.back}
                color={Colors.white}
                style={{ height: Normalize(16), width: Normalize(20), marginLeft: 5 }}
              />
            </TouchableOpacity>
          ) : null}
          {cross ? (
            <TouchableOpacity onPress={() => handleCross()}>
              <Entypo name="cross" color={Colors.white} size={Normalize(20)} />
            </TouchableOpacity>
          ) : null}
        </View>
        {/* Heading */}
        <View style={styles.view2}>
          <Text numberOfLines={1} style={styles.headingText}>{name}</Text>
        </View>
        {/* 2nd icon */}
        <View style={styles.view3}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={shareButton} >
            {!loader && <Image source={images.share}
              style={{ height: Normalize(16), width: Normalize(16) }}
            />}
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={menuButton} >
            {!loader && <Image source={images.moremenu}
              style={{ height: Normalize(16), width: Normalize(16), marginRight: 5 }}
            />}
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
    paddingHorizontal: Normalize(10),
  },
  headingText: {
    fontSize: Normalize(15),
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'Outfit-Medium',
  },
  view1: {
    flex: 2
  },
  view2: {
    flex: 6,
    alignItems: 'center',
  },
  view3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 2,
  },
});
