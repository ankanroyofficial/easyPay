import { Col } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { borderRadius } from 'styled-system';
import { Colors } from '../../../../constants/colors';
import Normalize from '../../../../helpers/Dimens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  h5: {
    fontSize: Normalize(13),
    color: Colors.greyText,
    marginHorizontal: Normalize(10),
    fontFamily: 'Outfit-Regular',
  },
  datePickerStyle: {
    alignSelf: 'center',
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  cont: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Normalize(1),
    borderColor: Colors.primary,
    width: Normalize(150),
    height: Normalize(40),
    marginVertical: Normalize(5),
  },
  h6: {
    fontSize: Normalize(14),
    color: Colors.primary,
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(20),
    fontFamily: 'Outfit-Regular',
  },
  uncheckContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    width: Normalize(150),
    height: Normalize(40),
    marginVertical: Normalize(5),
  },
  h7: {
    fontSize: Normalize(14),
    color: Colors.white,
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(20),
    fontFamily: 'Outfit-Regular',
  },
  containerdownload: {
    width: '90%',
    paddingVertical: Normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Normalize(15),
    alignSelf: 'center',
    backgroundColor: '#F2F6FE',
    borderColor: Colors.grey,
    borderRadius: 0,
  },
  text1: {
    fontSize: Normalize(10),
    color: '#818181',
    fontFamily: 'Outfit-Regular',
  },
  text2: {
    fontSize: Normalize(12),
    marginVertical: Normalize(7),
    alignSelf: 'center',
    fontFamily: 'Outfit-Regular',
    color: '#818181'
  },
  text3: {
    textAlign: 'center',
    color: Colors.white,
    fontFamily: 'Outfit-SemiBold',
    fontSize: Normalize(13),
  },
  containerAssigned: {
    width: '99%',
    alignSelf:"center",
    elevation:Normalize(2),
    paddingTop: Normalize(5),
    marginBottom: Normalize(8),
    backgroundColor:Colors.white,
    borderRadius:Normalize(8)

  },
  text4: {
    fontSize: Normalize(12),
    color: '#21232e',
    fontFamily: 'Outfit-Medium',
    marginVertical: Normalize(5)
  },
  text5: {
    fontSize: Normalize(13),
    marginVertical: Normalize(7),
    alignSelf: 'center',
    fontFamily: 'Outfit-Regular',
    color: '#818181'
  },
  text6: {
    paddingHorizontal: Normalize(40),
    textAlign: 'center',
    color: Colors.white,
    backgroundColor: Colors.secondary,
    fontFamily: 'Outfit-SemiBold',
    fontSize: Normalize(13),
    padding: Normalize(7),
    marginBottom: Normalize(10),
    alignSelf: 'center',
    borderRadius: 20,
  },
/////////////////////////////
arrowButton: {
  height: "100%", width: Normalize(27), backgroundColor: "#f5f5f5", padding: Normalize(2), borderRadius: 10, elevation: 0.8, justifyContent: "center", alignItems: "center"
},
imageButton: {
  width: "85%", height: "85%", resizeMode: "contain"
},
h0: {
  fontSize: Normalize(12),
  color: Colors.greyText,
  fontFamily: 'Outfit-SemiBold',
},

});

export default styles;
