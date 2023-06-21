import { Col } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import { Colors } from './../../../../constants/colors';
import Normalize from './../../../../helpers/Dimens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
  },
  h1: {
    fontSize: Normalize(12),
    color: "#38393e",
    // marginVertical: Normalize(5),
    marginVertical: Normalize(1),
  },
  h2: {
    fontSize: Normalize(13),
    color: "#bfc0c3",
    marginBottom: 10,
  },
  h2A: {
    fontSize: Normalize(13),
    color: "#bfc0c3",
    // marginBottom: 10,
  },
  h3: {
    fontSize: Normalize(11),
    color: '#636468',
    lineHeight: 20,
    fontFamily: fontfmliy.regular,

  },
  hn: {
    fontSize: Normalize(13), color: Colors.primary,
    fontFamily: fontfmliy.bold
  },
  hn_pr: {
    fontSize: Normalize(13), color: Colors.primary,
    fontFamily: fontfmliy.regular
  },
  h4: {
    fontSize: Normalize(13),
    fontFamily: fontfmliy.regular,
    color: 'black',
    marginVertical: Normalize(2),
    lineHeight: Normalize(7)
    // fontWeight:"800"
  },
  h5: {
    color: "#bfc0c3",
    marginVertical: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Normalize(1),
    borderColor: "#ebedf2",
    backgroundColor: '#f6f8fd',
    borderRadius: 6,
    marginVertical: Normalize(10),
    height: Normalize(63),
  },
  iconContainer: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
  },
  iconStyle: {
    width: Normalize(50),
    height: Normalize(50),
    resizeMode: "contain"
  },
  bodyContainer: {
    width: '75%',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: Normalize(5),
  },
  cardHeadingText: {
    fontSize: Normalize(14),
    color: "#5f647f",
  },
  cardOfferText: {
    fontSize: Normalize(12),

    color: "#8c8d97",
    marginVertical: Normalize(2),
    // fontWeight:"800"
  },
  cardDescText: {
    fontSize: Normalize(12),
    color: "#5f647f",
  },
  ratingHeadingView: {
    flexDirection: 'row',
    alignItems: 'center',



  },
  correctIconView: {
    height: Normalize(18),
    width: Normalize(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Normalize(10),
  },
  correctIcon: {
    height: Normalize(15),
    width: Normalize(15),
    borderRadius: 50,
  },
  indicator: {
    height: Normalize(14),
    backgroundColor: Colors.shade,
    borderWidth: 0.5,
    borderColor: "#E7E8E9",
    backgroundColor: "#E7Ebfb",
    borderRadius: 7,
    overflow: "hidden",

  },
  indicatorTexts: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quesText: {
    fontSize: Normalize(13),
    fontFamily: fontfmliy.regular,
    color: Colors.primary,
    marginHorizontal: Normalize(5),
    marginVertical: Normalize(10),
    // fontWeight:"800"
  },
  lineStyle: {
    // borderWidth: 0.6,
    backgroundColor: Colors.lightGrey,
    height: 1,
    marginVertical: Normalize(8),
  },
  riyals: {},
  benifitDescView: {
    paddingHorizontal: Normalize(12),
    paddingTop: Normalize(0),
    // flexWrap: 'wrap',
  },
  iconrial: {
    height: 20, width: 20, marginRight: 5, opacity: .4
  },
  iconrial1: {
    height: 20, width: 20, marginTop: 2, marginHorizontal: Normalize(5)
  }
});

export default styles;
