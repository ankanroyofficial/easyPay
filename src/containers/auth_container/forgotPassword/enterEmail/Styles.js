import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../../constants/colors';


const styles = StyleSheet.create({
  container: {
  flex:1,
    backgroundColor: Colors.white,
  },
  inputStyle: {
    width: '85%',
    alignSelf: 'center',
    borderWidth: Normalize(1),
    borderColor: Colors.primary,
    borderRadius: 4,
    paddingLeft: Normalize(15),
    paddingRight: Normalize(10),
    marginVertical: Normalize(10),
    height: Normalize(40),
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
    marginVertical: Normalize(5),
    width: '85%',
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
    width: Normalize(20),
    height: Normalize(20),
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
    // marginTop: '10%',
    // marginBottom: 70
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
});

export default styles;
