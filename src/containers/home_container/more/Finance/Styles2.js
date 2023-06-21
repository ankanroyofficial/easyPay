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
  inputStyle2: {
    width: '90%',
    alignSelf: 'center',
    height:40,
    paddingRight: Normalize(10),
    marginVertical: 0,
    fontSize: Normalize(12),
    fontFamily: 'roboto-regular',
    color: '#000000'
  },
  inputStyle: {
    width: '90%',
    alignSelf: 'center',
    height:50,
    borderWidth: Normalize(1),
    borderColor: Colors.primary,
    borderRadius: 4,
    paddingHorizontal: Normalize(15),
    marginVertical: 0,
    fontSize: Normalize(12),
    fontFamily: 'roboto-regular',
    color: '#000000'
  },
  submit: {
    width: '90%',
    backgroundColor:Colors.secondary,
    textAlign:'center',
    color:'#ffffff',
    fontSize:15,
    padding:Normalize(10),
    alignSelf: 'center',
    fontFamily:'roboto-medium',
    borderRadius:25,
    
    
  },
  textheading: {
    fontSize:15,
    fontFamily:'roboto-medium',
    width:'90%',
    alignSelf:'center',
    color:'#38393e',
    marginBottom:10
  },
  headingservice: {
    fontSize:16,
    fontFamily:'roboto-bold',
    width:'70%',
    color:'#38393e',
    marginBottom:10
  },
  textcategory22: {
    fontSize:12,
    fontFamily:'roboto-regular',
    color: '#818181',
    lineHeight:23

  },
});

export default styles;
