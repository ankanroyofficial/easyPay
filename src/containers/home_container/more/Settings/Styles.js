import React from 'react';
import {StyleSheet,Dimensions} from 'react-native';
import Normalize from '../../../../helpers/Dimens';
import {Colors} from '../../../../constants/colors';
const {width}=Dimensions.get("window")
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  cardContainer: {
    paddingVertical: Normalize(14),
    borderBottomWidth: width*0.00135,
    borderBottomColor: Colors.lightGrey,
    paddingHorizontal: Normalize(10),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: Normalize(13),
    color: Colors.primary,
    // textAlign: 'left',
    fontFamily: 'roboto-regular',
  },
});

export default styles;
