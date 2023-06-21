import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from './../../../../../constants/colors';
import Normalize from './../../../../../helpers/Dimens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageUploadBtn: {
    borderWidth: 0.8,
    borderColor: Colors.secondaryBorder,
    backgroundColor: Colors.secondaryBackground,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    width: '100%',
    marginTop: Normalize(5),
    marginBottom: Normalize(15),
  },
  iconStyle: {
    height: Normalize(25),
    width: Normalize(25),
  },
  saveBtn: {
    marginBottom: Normalize(20),
    marginTop: Normalize(5)
  },
});

export default styles;
