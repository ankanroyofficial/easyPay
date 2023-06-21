import React from 'react';
import { StyleSheet } from 'react-native';
import Normalize from './../../../helpers/Dimens';
import { Colors } from './../../../constants/colors';
import { Dimensions } from 'react-native';
const {width}=Dimensions.get("window")
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  cardContainer: {
    paddingVertical: Normalize(14),
    // borderBottomWidth: width*0.00135,
    // borderBottomColor: Colors.lightGrey,
    paddingHorizontal: Normalize(10),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowView2: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: Normalize(13),
    color: Colors.primary,
    fontFamily: 'roboto-regular',
  },
});

export default styles;

