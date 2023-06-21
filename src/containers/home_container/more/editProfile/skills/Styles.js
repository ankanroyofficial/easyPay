import React from 'react';
import { StyleSheet } from 'react-native';
import { fontfmliy } from '../../../../../components/WhichFontFamily';
import { Colors } from './../../../../../constants/colors';
import Normalize from './../../../../../helpers/Dimens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  h1: {
    fontSize: Normalize(15),
    fontFamily: fontfmliy.bold,
    color: "#070C18",
    marginVertical: Normalize(5),
  },
  h2: {
    fontSize: Normalize(11),
    fontFamily: fontfmliy.regular,
    color: Colors.grey,
  },
  addBtnText: {
    fontSize: Normalize(13),
    fontFamily: fontfmliy.bold,
    color: Colors.white,
  },
  skillsContainer: {
    marginTop: Normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  //..
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Normalize(1),
    borderColor: "#9CA3AC",
    borderRadius: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: Normalize(5),
    paddingVertical: Normalize(2),
    margin: Normalize(5),
  },
  //..
  saveBtn: {
    marginBottom: Normalize(8),
  },
});

export default styles;
