import { Col } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { borderRadius } from 'styled-system';
import { Colors } from '../../../../constants/colors';
import Normalize from '../../../../helpers/Dimens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
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
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  container2: {
    // height: Normalize(340),
    backgroundColor: "#f9fafc",
    paddingTop: Normalize(10),
  },
  h1: {
    fontSize: Normalize(13),
    color: Colors.black,
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(11),
    fontFamily: 'roboto-bold',
    lineHeight: 25,
    textAlign: "justify"
  },

  h2: {
    lineHeight: 25,
    fontSize: Normalize(11),
    color: Colors.greyText,
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(11),
    fontFamily: 'roboto-regular',
    textAlign: "justify"
  },
  h3: {

    fontSize: Normalize(13),
    color: Colors.greyText,
    marginVertical: Normalize(5),
    // marginHorizontal: Normalize(25),
    marginLeft: Normalize(25),
    fontFamily: 'roboto-medium',
  },
  h33: {
    fontSize: Normalize(13),
    color: Colors.greyText,
    marginVertical: Normalize(5),
    // marginHorizontal: Normalize(25),
    fontFamily: 'roboto-medium',
    marginLeft: Normalize(-2),
  },
  reverseh3: {
    fontSize: Normalize(10),
    color: Colors.greyText,
    // marginVertical: Normalize(5),
    fontWeight: 'bold',
    marginHorizontal: Normalize(3),
    // marginLeft: Normalize(25),
    textAlignVertical: "center",
    textAlign: "center"

  },
  h4: {
    fontSize: Normalize(13),
    color: Colors.greyText,
    marginVertical: Normalize(5),
    fontWeight: 'bold',
    marginHorizontal: Normalize(4),
  },
  h5: {
    fontSize: Normalize(11),
    color: Colors.greyText,
    marginHorizontal: Normalize(5),
    marginVertical: Normalize(2.5),
    textAlign: 'center',
    fontFamily: 'roboto-regular',
    alignSelf: 'center'
  },
  h6: {
    fontSize: Normalize(14),
    color: Colors.black,
    marginVertical: Normalize(15),
    marginHorizontal: Normalize(2),
    fontFamily: 'roboto-bold',
  },
  h7: {
    fontSize: Normalize(12),
    color: Colors.greyText,
    // marginVertical: Normalize(5),
    marginHorizontal: Normalize(10),
    flexWrap: 'wrap',
    fontFamily: 'roboto-regular',
  },
  h8: {
    fontSize: Normalize(10),
    color: Colors.greyText,
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(10),
    flexWrap: 'wrap',
    fontFamily: 'roboto-medium',
    textAlign: "center"
  },
  h9: {
    fontSize: Normalize(13),
    color: Colors.greyText,
    marginVertical: Normalize(10),
    marginHorizontal: Normalize(8),
    fontFamily: 'roboto-bold',
  },
  h10: {
    fontSize: Normalize(12),
    color: Colors.black,
    marginTop: Normalize(10),
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(10),
    fontFamily: 'roboto-bold',
  },
  h11: {
    fontSize: Normalize(11),
    color: Colors.greyText,
    marginHorizontal: Normalize(10),
    fontFamily: 'roboto-regular',
  },
  textContainer: {
    flexDirection: 'row',
    marginLeft: Normalize(10),
    marginBottom: Normalize(5),
    justifyContent: 'flex-start',
  },
  postTaskContainer: {
    marginTop: '5%',
  },

  icon: {
    marginVertical: Normalize(5),
  },
  card: {
    width: Normalize(200),
    height: Normalize(195),
    borderRadius: Normalize(6),
    backgroundColor: Colors.white,
    marginHorizontal: Normalize(6),
    marginBottom: Normalize(20),
    marginTop: Normalize(20),
    elevation:Normalize(3),
  },
  cardView: {
    marginVertical: Normalize(5),
    borderTopLeftRadius: Normalize(6),
    borderTopRightRadius: Normalize(6),
    marginHorizontal: Normalize(5),
    backgroundColor: Colors.primary,
    width: Normalize(190),
    height: Normalize(120),
    overflow: 'hidden',
  },
  cardImage: {
    height: '100%',
    width: '100%',
  },
  cardContainer: {
    width: Normalize(120),
    height: Normalize(30),
    backgroundColor: Colors.shade,
    borderTopRightRadius: Normalize(12),
    borderBottomRightRadius: Normalize(12),
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(5),
    flexDirection: 'row',
  },
  reversecardContainer: {
    width: Normalize(130),
    height: Normalize(30),
    backgroundColor: Colors.shade,
    borderTopLeftRadius: Normalize(10),
    borderBottomLeftRadius: Normalize(10),
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(5),
    flexDirection: 'row',
  },
  taskImage: {
    width: Normalize(40),
    height: Normalize(40),
    borderRadius: Normalize(100),
    zIndex: 1,
    position: 'absolute',
    left: '-5%',
    overflow: 'hidden',
  },
  cleanImage: {
    width: Normalize(80),
    height: Normalize(80),
    borderRadius: Normalize(100),
  },
  image: {
    width: Normalize(30),
    height: Normalize(30),
    marginVertical: Normalize(10),
    marginHorizontal: Normalize(10),
  },
  cardContainerView: {
    marginLeft: Normalize(10),
    marginTop: Normalize(5),
  },
  optionContainer: {
    marginVertical: Normalize(5),
    alignItems: 'center',
    width: `${100 / 3}%`,
  },
  taskRow: {
    marginVertical: Normalize(5),
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-evenly',
  },
  taskRow1: {
    marginVertical: Normalize(5),
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  iconImage: {
    width: Normalize(50),
    height: Normalize(50),
    borderRadius: Normalize(100),
  },
  bottomContainer: {
    marginHorizontal: Normalize(10),
    marginVertical: Normalize(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  reversebottomContainer: {
    marginVertical: Normalize(5),
    marginRight: Normalize(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomcard: {

    width: Normalize(220),
    height: Normalize(180),
    borderRadius: Normalize(6),
    backgroundColor: Colors.white,
    marginHorizontal: Normalize(6),
    marginBottom: Normalize(10),
    marginTop: Normalize(10),
    elevation:Normalize(3),

  },
  bottomcardView: {
    width: Normalize(220),
    height: Normalize(120),
    borderTopLeftRadius: Normalize(6),
    borderTopRightRadius: Normalize(6),
    overflow: 'hidden',
  },
  bottomcardImage: {
    width: '100%',
    height: '100%',
  },

  //review

  h1: {
    fontSize: Normalize(14),
    fontFamily: 'roboto-medium',
    color: "#38393e",
    marginTop: Normalize(8),
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
    lineHeight: 25,
    marginTop: Normalize(5),
  },
  reviewh3: {
    fontSize: 12,
    fontFamily: 'roboto-regular',
    color: '#636468',
    lineHeight: 22,
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
    marginTop: Normalize(5),
    fontFamily: 'roboto-regular',
    color: Colors.greyText,
    textAlign: "center"
  },
  addressText2: {
    fontSize: Normalize(12),
    marginTop: Normalize(5),
    fontFamily: 'roboto-regular',
    color: "gray",
  },
  customTab: {
    width: '75%',
    height: Normalize(35),
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: Normalize(1),
    borderColor: Colors.primary,
    borderRadius: Normalize(6),
  },
  tab1Style: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: Normalize(6),
    borderBottomLeftRadius: Normalize(6),
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
    marginVertical: Normalize(10),
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
    color: "#38393e",
    marginLeft: Normalize(15),
    marginTop: Normalize(15),
  },
  customTab2: {
    width: Normalize(180),
    height: Normalize(35),
    marginLeft: Normalize(15),
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  tab1Style2: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 4,
  },
  tab2Style2: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 4,

  },

  tabText2: {
    fontSize: Normalize(11),
    fontFamily: 'roboto-bold',
    color: Colors.black
  },

  //Withdraw money

  inputStyle: {
    width: '90%',
    alignSelf: 'center',
    borderWidth: Normalize(1),
    borderColor: Colors.primary,
    borderRadius: 4,
    paddingLeft: Normalize(15),
    paddingRight: Normalize(10),
    marginVertical: Normalize(10),
    height: Normalize(50),
    fontSize: Normalize(12),
    fontFamily: 'roboto-regular',
    color: '#000000',
  },
  forgotpassBtn: {
    // alignSelf: 'flex-end',
    marginHorizontal: '5%',
    marginVertical: Normalize(10),
  },
  forgotpassBtnText: {
    fontSize: Normalize(12),
    color: Colors.primary,
    textDecorationLine: 'underline',
    fontFamily: 'roboto-regular',
  },
  signInBtn: {
    marginVertical: Normalize(20),
    width: '90%',
    alignSelf: 'center',
  },
  seperator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '85%',
    marginVertical: Normalize(20),
  },
  lineStyle: {
    width: `${100 / 3.5}%`,
    borderWidth: 0.6,
    borderColor: Colors.lightGrey,
  },
  seperatorText: {
    fontSize: Normalize(11),
    fontStyle: 'italic',
    color: Colors.grey,
    textAlign: 'center',
    fontFamily: 'roboto-regular',
  },
  faceboookBtn: {
    backgroundColor: Colors.facebook,
    width: '85%',
    borderRadius: 20,
    alignSelf: 'center',
  },
  iconStyle: {
    margin: 20,
    width: Normalize(30),
    height: Normalize(30),
  },
  googleBtn: {
    backgroundColor: Colors.white,
    borderWidth: Normalize(1),
    borderColor: Colors.grey,
    width: '85%',
    alignSelf: 'center',
  },
  googleBtnText: {
    color: '#444',
  },
  signUpBtnContainer: {
    width: '85%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    marginBottom: 70
  },
  signUpText: {
    textAlign: 'center',
    fontSize: Normalize(12),
    color: Colors.greyText,
    fontFamily: 'roboto-regular',
  },
  signUpBtnText: {
    fontSize: Normalize(12),
    color: Colors.primary,
    textDecorationLine: 'underline',
    marginLeft: 10,
    padding: 5,
    fontFamily: 'roboto-medium',
  },

  // create dispute
  h5: {
    fontSize: Normalize(13),
    color: Colors.greyText,
    marginVertical: Normalize(10),
    marginHorizontal: Normalize(12),
    fontFamily: 'roboto-medium',
  },
  multiiInput: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.6,
    borderColor: Colors.grey,
    borderRadius: 4,
    width: '90%',
    alignSelf: 'center',
    height: Normalize(130),
    backgroundColor: '#EFF3F4',
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(10),
  },
  iconStyle: {
    height: Normalize(50),
    width: Normalize(50),
  },
  h3: {
    fontSize: Normalize(13),
    color: Colors.greyText,
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(10),
  },

  arrowButton: {
    height: "100%", width: Normalize(27), backgroundColor: "#f5f5f5", padding: Normalize(2), borderRadius: 10, elevation: 0.8, justifyContent: "center", alignItems: "center"
  },
  imageButton: {
    width: "85%", height: "85%", resizeMode: "contain"
  },
  h0: {
    fontSize: Normalize(12),
    color: Colors.greyText,
    fontFamily: 'roboto-bold',
  },

});
export default styles;
