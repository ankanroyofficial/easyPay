import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../../constants/colors';
import Normalize from '../../../../helpers/Dimens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  input_icon: {
    height: Normalize(18), width: Normalize(18), opacity: 0.6
  },
  inputStyle: {
    width: '90%',
    alignSelf: 'center',
    borderWidth: 0.4,
    borderColor: Colors.greyText,
    borderRadius: 4,
    marginVertical: Normalize(10),
    height: Normalize(40),
    fontSize: Normalize(10),
    fontFamily: 'roboto-regular',
    color: '#000000',
  },
  forgotpassBtn: {
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
    marginTop: Normalize(15),
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
    marginRight: Normalize(8),
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
  arrowViewOpen: { height: Normalize(20), width: Normalize(20) },
  arrowViewClose: { height:  Normalize(12), width: Normalize(8) }
});

export default styles;
