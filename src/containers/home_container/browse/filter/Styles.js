import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import Normalize from './../../../../helpers/Dimens';
import { Colors } from './../../../../constants/colors';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  plus_minus_view: { height: "100%", width: "10%", justifyContent: "center", alignItems: "center", borderRadius: 5 },
  h5: {
    fontSize: Normalize(13),
    color: Colors.greyText,
    marginVertical: Normalize(8),
    marginHorizontal: Normalize(10),
    fontFamily: 'roboto-regular',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginVertical: Normalize(5)
  },
  input: {
    justifyContent: 'space-between',
    borderWidth: Normalize(1),
    borderColor: Colors.primary,
    borderRadius: 4,
    marginBottom: Normalize(5),
    paddingHorizontal: Normalize(5),
    alignSelf: 'center',
    height: Normalize(35),
    width: '92%',
    fontFamily: 'roboto-regular',
  },
  pickerInput: {
    justifyContent: 'space-between',
    borderWidth: Normalize(1),
    borderColor: Colors.primary,
    borderRadius: 4,
    marginBottom: Normalize(5),
    paddingHorizontal: Normalize(5),
    alignSelf: 'center',
    width: '92%',
  },
  dropDownStyle: {
    borderWidth: Normalize(1),
    borderColor: Colors.primary,
    borderRadius: 4,
    // marginBottom: Normalize(5),
    alignSelf: 'center',
    width: '92%',
  },
  pickerContainer: {
    height: Normalize(40),
    marginBottom: 10
  },
  customtab: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '92%',
    width: '100%',
    height: Normalize(40),
    flexDirection: "row",
    justifyContent:"space-between"
  },
  tobedone: {
    height: "100%", width: "30%", justifyContent: "center", alignItems: "center"
  },
  tabStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: `100%`,
    height: Normalize(40),
  },
  activeTabStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: `100%`,
    height: Normalize(40),
    backgroundColor: Colors.primary,
  },
  tab1: {
    width: `${100 / 3}%`,
    borderRightWidth: 1,
    borderRightColor: Colors.grey,
    height: Normalize(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab2: {
    width: `${100 / 3}%`,
    height: Normalize(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: Normalize(11),
    color: Colors.primary,
    fontFamily: 'roboto-regular',
  },
  activeTabText: {
    fontSize: Normalize(11),
    color: Colors.white,
    fontFamily: 'roboto-regular',
  },
  datePickerStyle: {
    alignSelf: 'center',
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  dateIcon: {
    position: 'absolute',
    left: 0,
    top: "20%",
    marginLeft: Normalize(10),
    height: Normalize(20),
    width: Normalize(20),
  },
  dateIconRTL: {
    position: 'absolute',
    right: 0,
    top: "20%",
    marginRight: Normalize(10),
    height: Normalize(20),
    width: Normalize(20),
  },
  dateInput: {
    borderRadius: 4,
    height: Normalize(40),
    borderWidth: Normalize(1),
    borderColor: Colors.primary,
    fontFamily: 'roboto-regular',
  },
  btnstyle: {
    height: Normalize(40),
    marginVertical: Normalize(10),
    marginTop: Normalize(20),
    backgroundColor: '#7EB243',
    marginTop: 50,

  },
  iconrial: {
    height: 20, width: 20, marginTop: 2, marginRight: 5, opacity: .4
  },
  iconrial1: {
    height: 20, width: 20, marginTop: 15,
  }
});

export default styles;
