import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from './../../../constants/colors';
import Normalize from './../../../helpers/Dimens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  taskCard: {
    width: '100%',
    height: Normalize(90),
    flexDirection: 'row',
    elevation:Normalize(2),
    backgroundColor: Colors.white,
  },
  leftLine: {
    width: '.6%',
    backgroundColor: '#369527',
  },
  cardBody: {
    width: '100%',
    padding: Normalize(10),
    justifyContent: 'center',
  },

});
export default styles;
