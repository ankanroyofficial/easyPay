import React from 'react';
import { StyleSheet } from 'react-native';
import Normalize from './../../../helpers/Dimens';
import { Colors } from './../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,backgroundColor: Colors.white,
  },
  pickerStyle: {
    backgroundColor: Colors.disable_textinput_background,
    alignSelf: 'center',
    elevation: 4,
    borderWidth: Normalize(1),
    borderColor: Colors.primary
  },
  pickerContainerStyle: {
    height: Normalize(42),
    width: '100%',
    alignSelf: 'center',
    position: "absolute",
    zIndex: 1,
    borderRadius: 5
  },
  taskHeadingText: {
    fontSize: Normalize(13),
    color: Colors.black,
    fontFamily: 'roboto-bold'
  }
});

export default styles;
