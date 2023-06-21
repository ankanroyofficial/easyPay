import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { Value } from 'react-native-reanimated';
import { Colors } from './../constants/colors';
import Normalize from './../helpers/Dimens';

// function CheckBox({ label, style, textStyle, onChange, value }) {
function CheckBox({ label, style, textStyle, onChange }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();

  const [isActive, setIsActive] = useState(false);

  const handlePress = () => {
    setIsActive(!isActive);
    onChange(!isActive);

  };
  // useEffect(() => {
  //   console.log(value)
  //   if (value) {
  //     setIsActive(true)
  //   }else{
  //     setIsActive(false)
  //   }
  // }, [])

  return (
    <View
      style={[
        styles.container,
        style,
        language == 'pr'
          ? { ...RtlStyles.containerRowInverse }
          : { ...RtlStyles.containerRow },
      ]}>
      <TouchableOpacity style={styles.outerView} onPress={handlePress}>
        {isActive ? <View style={styles.innerView} /> : null}
      </TouchableOpacity>
      {label ? (
        <Text style={[styles.labelText, textStyle]}>{label}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerView: {
    height: Normalize(16),
    width: Normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Normalize(1),
    borderColor: Colors.greyText,
    borderRadius: Normalize(4),
  },
  innerView: {
    height: Normalize(13),
    width: Normalize(13),
    backgroundColor: Colors.primary,
    borderRadius: Normalize(4),
  },
  labelText: {  
    paddingHorizontal: 10,
    fontSize: Normalize(13),
    color: Colors.greyText,
    fontFamily: 'roboto-regular',
  },
}); 

export default withRtl(CheckBox);
