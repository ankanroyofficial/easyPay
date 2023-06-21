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
  h1B: {
    fontSize: Normalize(12),
    color: Colors.greyText,
    fontFamily: fontfmliy.bold,
  },
  hc: {
    fontSize: Normalize(13),
    color: Colors.greyText,
    fontFamily: fontfmliy.bold,
  },
  container2: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingVertical: Normalize(10),
  },
  mainView: {
    flex: 1,
    // justifyContent: 'space-between',
    paddingTop: Normalize(10),
  },
  bodyView: {
    marginHorizontal: Normalize(15),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Normalize(10),
  },
  input: {
    borderWidth: Normalize(1),
    height: Normalize(45),
    borderColor: Colors.lightGrey,
    borderRadius: 6,
    fontFamily: fontfmliy.bold,
    color: '#000000',
    paddingHorizontal: Normalize(10),
  },
  addBtn: {
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: Normalize(10),
  },
  addBtnText: {
    fontSize: Normalize(13),
    fontFamily: fontfmliy.bold,
    color: Colors.primary,
  },
  skillsContainer: {
    marginTop: Normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Normalize(1),
    borderColor: Colors.lightGrey,
    borderRadius: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: Normalize(10),
    paddingVertical: Normalize(3),
    marginRight: Normalize(10),
    marginBottom: Normalize(10),
  },
  skillChipRtl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Normalize(1),
    borderColor: Colors.lightGrey,
    borderRadius: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: Normalize(10),
    paddingVertical: Normalize(3),
    marginLeft: Normalize(10),
    marginBottom: Normalize(10),
  },
  crossIcon: {
    marginLeft: Normalize(10),
  },
  crossIconRtl: {
    marginRight: Normalize(10),
  },
  saveBtn: {
    height: Normalize(40),
    marginHorizontal: Normalize(15),
    marginBottom: 40,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  subContainer: {
    justifyContent: 'space-evenly',
    margin: Normalize(10),
  },
  h1: {
    fontSize: Normalize(12),
    color: Colors.grey,
    marginVertical: Normalize(10),
    marginHorizontal: Normalize(5),
    fontFamily: fontfmliy.regular,
  },
  h2: {
    fontSize: Normalize(12),
    color: Colors.green2,
    textAlign: 'center',
    fontFamily: fontfmliy.regular,
  },
  h3: {
    fontSize: Normalize(13),
    color: Colors.greyText,
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(10),
  },
  h5: {
    fontSize: Normalize(13),
    color: Colors.primary,
    marginTop: Normalize(10),
    fontFamily: fontfmliy.regular,
  },
  h6: {
    fontSize: Normalize(14),
    color: Colors.primary,
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(20),
    fontFamily: fontfmliy.regular,
  },
  h7: {
    fontSize: Normalize(14),
    color: Colors.white,
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(20),
    fontFamily: fontfmliy.regular,
  },
  datePickerStyle: {
    height: "100%",
    width: "100%", justifyContent: "center"

  },
  dateInput: {
    borderRadius: 4,
    height: Normalize(45),
    paddingHorizontal: Normalize(10),
  },
  dateIcon: {
    position: 'absolute',
    left: 0,
    top: "20%",
    marginLeft: Normalize(10),
    height: Normalize(20),
    width: Normalize(20),
  },
  RTldateIcon: {
    position: 'absolute',
    right: 0,
    top: "20%",
    marginRight: Normalize(10),
    height: Normalize(20),
    width: Normalize(20),
  },
  textContainer: {
    width: Normalize(180),
    height: Normalize(30),
    borderRadius: Normalize(15),
    borderWidth: Normalize(1),
    flex: 1,
    borderColor: Colors.green2,
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(5),
    padding: Normalize(0),
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  mainPage: {
    // height: windowHeight,
    flex: 1
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Normalize(1),
    borderColor: Colors.grey,
    borderRadius: 4,
    height: Normalize(42),
    marginVertical: Normalize(10),
    marginHorizontal: Normalize(10),
    paddingHorizontal: Normalize(10),
  },
  iconstyle: {
    // color: Colors.greyText
  },
  timeText: {
    fontSize: Normalize(13),
    color: Colors.grey,
    fontFamily: fontfmliy.regular,

  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.6,
    borderColor: Colors.primary,
    width: Normalize(150),
    height: Normalize(40),
    marginVertical: Normalize(5),

  },
  uncheckContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.6,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    width: Normalize(150),
    height: Normalize(40),
    marginVertical: Normalize(5),

  },
  cont: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnstyle: {
    height: Normalize(40),
    marginTop: Normalize(60),
    position: 'absolute',
    width: '92%',
    alignSelf: 'center',
    bottom: '12%',
  },
  dateSmallBox: {
    height: "100%",
    width: "48%",
    borderColor: Colors.borderColor,
    borderRadius: Normalize(10),
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding:Normalize(8)
  },
  twoButtonview: {
    alignSelf: "center",
    flexDirection: 'row',
    borderWidth: 0.7,
    borderColor: Colors.primary,
    width: Normalize(300),
    height: Normalize(40),
    marginVertical: Normalize(5),
    borderRadius: 4,
  },
  O_P_Buttontext: {
    fontSize: Normalize(14),
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(20),
    fontFamily: fontfmliy.regular,
  },
  multiiInput: {
    borderWidth: 0.6,
    borderColor: Colors.grey,
    borderRadius: 4,
    height: Normalize(120),
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(10),
    paddingHorizontal: Normalize(10),
    fontFamily: fontfmliy.regular,
    textAlignVertical: 'top',
  },
  smallTxt: {
    fontSize: Normalize(11),
    fontFamily: fontfmliy.regular,
    color: '#818181',
    lineHeight: Normalize(14),
  }
});

export default styles;
