import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../../constants/colors';
import Normalize from '../../../../helpers/Dimens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6f9",
  },

  heading: {
    fontSize: 15,
    fontFamily: 'roboto-bold',
    width: '85%',
    color: '#38393e'
  },
  textRight: {
    backgroundColor: Colors.primary,
    width: '70%',
    alignSelf: 'flex-end',
    marginHorizontal: Normalize(10),
    padding: Normalize(10),
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    marginVertical: Normalize(5),
    borderBottomLeftRadius: 20,
  },
  textLeft: {
    backgroundColor:"#F0F0F0",
    width: '70%',
    alignSelf: "flex-start",
    marginHorizontal: Normalize(10),
    padding: Normalize(10),
    marginVertical: Normalize(5),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  }
});
export default styles;
