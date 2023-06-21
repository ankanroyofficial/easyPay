import React from 'react';
import { StyleSheet } from 'react-native';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import { Colors } from './../../../../constants/colors';
import Normalize from './../../../../helpers/Dimens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  galleryorcamera_icon: {
    height: Normalize(75), width: Normalize(75), borderRadius: Normalize(75) / 2, backgroundColor: Colors.grayf5, marginBottom: Normalize(5), justifyContent: "center", alignItems: "center"
  },
  smallBox: {
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: Colors.secondaryboxBackground,
    borderWidth: Normalize(0.5),
    borderColor: Colors.secondaryBorder,
    margin: Normalize(4),
    borderRadius: Normalize(5),
  },
  smallBoxText: {
    paddingHorizontal: Normalize(2),
    paddingVertical: Normalize(1),
    fontSize: Normalize(10),
    color: Colors.greyText,
    margin: Normalize(3),
  },

  borderwithpadding: {
    padding: Normalize(8),
    borderRadius: 8,
    marginHorizontal: Normalize(15),
    marginBottom: Normalize(8),
    borderColor: Colors.boxBorder,
    borderWidth: Normalize(1),
    backgroundColor: Colors.white,
  },
  borderwithpaddingForeditpage: {
    padding: Normalize(8),
    borderRadius: 8,
    marginHorizontal: Normalize(15),
    marginBottom: Normalize(8),
    borderColor: Colors.boxBorder,
    borderWidth: Normalize(1)
  },
  newBoxTitle: {
    fontFamily: fontfmliy.bold,
    color: Colors.greyText,
    fontSize: Normalize(14),
    paddingBottom: Normalize(3)
  },
  h1: {
    fontSize: Normalize(14),
    fontFamily: 'roboto-medium',
    // color: "#38393e",
    color: Colors.primary,
    marginTop: Normalize(1),
  },
  h2: {
    fontSize: Normalize(11),
    fontFamily: 'roboto-regular',
    color: '#636468',
    marginTop: Normalize(5),
  },
  h3: {
    fontSize: Normalize(11),
    fontFamily: 'roboto-regular',
    color: '#636468',
    lineHeight: Normalize(14),
    marginTop: Normalize(2),
  },
  reviewh3: {
    fontSize: 12,
    fontFamily: 'roboto-regular',
    color: '#636468',
    lineHeight: Normalize(14),
    marginTop: Normalize(5),
  },
  h4: {
    fontSize: Normalize(14),
    fontFamily: 'roboto-regular',
    color: Colors.greyText,
    marginVertical: Normalize(2),
  },
  coverPicContainer: {
    width: '100%',
    height: Normalize(150)
  },
  coverPic: {
    width: '100%',
    height: "100%",

  },
  profilePicContainer: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    width: Normalize(96),
    height: Normalize(96),
    borderRadius: Normalize(50),
    position: 'absolute',
    bottom: '-20%',
    alignSelf: 'center',
  },
  avatar: {
    width: Normalize(90),
    height: Normalize(90),
  },
  nameAddContainer: {
    alignItems: 'center',
    marginTop: '14%',
  },
  nameText: {
    fontSize: Normalize(14),
    fontFamily: 'roboto-medium',
    color: Colors.black,
  },
  addressText: {
    fontSize: Normalize(11),
    fontFamily: 'roboto-regular',
    color: Colors.greyText,
    textAlign: "center"
  },
  addressText2: {
    fontSize: Normalize(12),
    marginTop: Normalize(5),
    fontFamily: 'roboto-medium',
    color: Colors.green2,
  },
  customTab: {
    width: '100%',
    height: Normalize(36),
    alignSelf: 'center',
    justifyContent: "space-between"
  },
  tab1Style: {
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Normalize(6),
  },
  tab2Style: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: Normalize(6),
    borderBottomRightRadius: Normalize(6),
  },
  tabText: {
    fontSize: Normalize(11),
    fontFamily: 'roboto-regular',
  },
  reviewText: {
    fontSize: Normalize(11),
    fontFamily: 'roboto-regular',
    color: Colors.grey,
    textAlign: "center",
    width: Normalize(230),
    alignSelf: 'center',
    marginVertical: Normalize(10),
  },
  aboutSection: {
    paddingHorizontal: Normalize(15),
    marginVertical: Normalize(5),
  },
  aboutSection_new: {
    padding: Normalize(10),
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: Normalize(2),
    marginBottom: Normalize(10)
  },
  iconStyle: {
    width: Normalize(60),
    height: Normalize(60),
    marginTop: Normalize(10),
  },

  lineStyle: {
    borderWidth: 0.6,
    borderColor: Colors.lightGrey,
    height: 1,
    marginVertical: Normalize(20),

  },
  lineStyle2: {
    borderWidth: 0.2,
    borderColor: Colors.lightGrey,
    height: 1,
    marginVertical: Normalize(1),
  },

  lineStyle22: {
    borderWidth: 0.2,
    borderColor: Colors.lightGrey,
    height: .5,
  },

  reviewView: {
    backgroundColor: '#ffffff',
    marginVertical: Normalize(10),
  },
  h11: {
    fontSize: Normalize(14),
    fontFamily: 'roboto-medium',
    // color: "#38393e",
    color: Colors.primary,
    marginLeft: Normalize(15),
    marginTop: Normalize(15),
  },
  customTab2: {
    width: Normalize(180),
    height: Normalize(35),
    marginLeft: Normalize(15),
    marginTop: Normalize(15),
    justifyContent: 'space-between',

  },
  tab1Style2: {
    // width: '40%',
    paddingHorizontal: "3%",
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 4,
    // backgroundColor:"red"
  },
  tab2Style2: {
    // width: '40%',
    paddingHorizontal: "3%",
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 4,
    // backgroundColor:"blue"

  },

  tabText2: {
    fontSize: Normalize(11),
    fontFamily: 'roboto-bold',
    color: Colors.black
  },
});

export default styles;
