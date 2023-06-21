import React from 'react';
import { StyleSheet } from 'react-native';
import Normalize from './../../../helpers/Dimens';
import { Colors } from './../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.white
  },
  pickerContainer: {
    // backgroundColor: Colors.white,
    // height: Normalize(40),
    // justifyContent: 'center',
    // alignItems: 'center',
    // elevation: 4,
    // zIndex: 999,
    // zIndex: 10,
  },
  pickerStyle: {
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderWidth: 0,
    elevation: 4,
  },
  pickerContainerStyle: {
    height: Normalize(40),
    width: '100%',
    alignSelf: 'center',
  },
  pickerDropDownStyle: {
    backgroundColor: Colors.white,
    // height:Normalize(150)

  },
  taskHeadingText: {
    fontSize: Normalize(13),
    color: Colors.black,
    fontFamily: 'roboto-bold'
  },
  taskCard: {
    // width: '98.5%',
    // height: Normalize(120),

    // marginBottom: Normalize(1.5),
    // flexDirection: 'row',
    // borderColor:Colors.grayf5,
    // borderWidth:1,  
    // borderRadius:3,
    // overflow:"hidden",
    // alignSelf:"center",



    width: '98.5%',
    height: Normalize(120),
    // marginBottom: Normalize(1.5),
    flexDirection: 'row',
    // backgroundColor: Colors.white,
    borderBottomWidth:Normalize(1.5),
    borderBottomColor:Colors.grayf5,
    borderTopWidth:0,
    borderColor:Colors.grayf5,
    borderWidth:Normalize(1),  
    borderRadius:Normalize(2),
    overflow:"hidden",
    alignSelf:"center"









  },
  leftLine: {
    width: '1.5%',
    backgroundColor: '#ccc',
  },
  cardBody: {
    width: '68%',
    padding: Normalize(10),
    justifyContent: 'center',
  },
  thumbContainer: {
    width: '30%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Normalize(10),
  },
  rowView: {
    alignItems: 'center',
  },
  iconStyle: {
    width: Normalize(14),
    height: Normalize(14),
    marginHorizontal: Normalize(5),
    borderRadius:7
  },
  dotIconStyle: {
    width: Normalize(5),
    height: Normalize(5),
    marginHorizontal: 10,
    borderRadius:3
  },
  thumbIconStyle: {
    width: Normalize(60),
    height: Normalize(60),
    marginHorizontal: 10,
    borderRadius:Normalize(60),
    // resizeMode:"cover"
  },
  h1: {
    fontSize: Normalize(13),
    color: Colors.black,
    fontFamily: 'roboto-bold',
    marginVertical: Normalize(5),
  },

  h2: {
    fontSize: Normalize(11),
    color: Colors.greyText,
    marginRight: Normalize(5),
    marginVertical: Normalize(5),
    fontFamily: 'roboto-regular',
  },
  h3: {
    fontSize: Normalize(11),
    color: Colors.grey,
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(5),
    fontFamily: 'roboto-regular',
  },
  priceText: {
    fontSize: Normalize(11),
    color: Colors.black,
    fontFamily: 'roboto-bold',
    marginVertical: Normalize(5),
  },
});

export default styles;
