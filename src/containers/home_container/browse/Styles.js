import React from 'react';
import { StyleSheet } from 'react-native';
import Normalize from './../../../helpers/Dimens';
import { Colors } from './../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  bannerContainer: {
    backgroundColor: '#546277',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: Normalize(110),
    marginTop: Normalize(1),
    width:"100%",
  },
  bannerBody: {
    width: '72%',
    paddingHorizontal: Normalize(5),
    justifyContent: "center",
    paddingLeft:Normalize(15)
  },

  bannerHeading: {
    color: Colors.white,
    fontSize: Normalize(15),
    fontFamily: 'roboto-medium',
  },
  bannerDesc: {
    color: Colors.white,
    marginVertical: Normalize(8),
    fontSize: Normalize(11),
    fontFamily: 'roboto-regular',
  },
  bannerLearnMore: {
    color: Colors.white,
    fontSize: Normalize(13),
    fontFamily: 'roboto-bold',
  },
  bannerImage: {
    height: "100%",
    width: '28%',
  },
  bannerImageStyle: {
    width: Normalize(60),
    height: Normalize(65),
  },
  taskHeadingText: {
    fontSize: Normalize(13),
    color: Colors.black,
    fontWeight: 'bold',
    marginHorizontal: Normalize(15),
    marginTop: Normalize(10),
  },
  taskCard: {
    // width: '100%',
    // height: Normalize(120),
    // // marginBottom: Normalize(1.5),
    // flexDirection: 'row',
    // backgroundColor: Colors.white,

    // borderBottomWidth:Normalize(1.5),
    // borderBottomColor:Colors.primary,


    width: '98.5%',
    height: Normalize(120),
    // marginBottom: Normalize(1.5),
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: Normalize(1.5),
    borderBottomColor: Colors.primary,
    borderTopWidth: 0,
    borderColor: Colors.lightGrey,
    borderWidth: Normalize(1),
    borderRadius: 2,
    overflow: "hidden",
    alignSelf: "center"







  },
  leftLine: {
    width: '2%',
    backgroundColor: '#4DD637',
  },
  cardBody: {
    width: '68%',
    padding: Normalize(10),
    justifyContent: 'center',
  },
  thumbContainer: {
    width: '33%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Normalize(10)
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    width: Normalize(15),
    height: Normalize(15),
    marginHorizontal: Normalize(5),
  },
  dotIconStyle: {
    width: Normalize(5),
    height: Normalize(5),
    marginHorizontal: 10,
  },
  thumbIconStyle: {
    width: Normalize(60),
    height: Normalize(60),
    marginHorizontal: 10,
    borderRadius: Normalize(30)
  },
  h1: {
    fontSize: Normalize(12),
    color: Colors.primary,
    fontFamily: 'roboto-bold',
    marginVertical: Normalize(5),
  },

  h2: {
    fontSize: Normalize(11),
    color: Colors.greyText,
    marginVertical: Normalize(5),
    fontFamily: 'roboto-regular',
    marginRight: Normalize(5),
  },
  h3: {
    fontSize: Normalize(11),
    color: Colors.green2,
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
